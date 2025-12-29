import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const routeSchema = z.object({
  name: z.string().min(1, 'Route name is required').max(100),
  origin_address: z.string().min(1, 'Origin address is required').max(500),
  destination_address: z.string().min(1, 'Destination address is required').max(500),
  check_time: z.string().min(1, 'Check time is required'),
  check_days: z.array(z.number()).min(1, 'Select at least one day'),
});

const DAYS = [
  { value: 1, label: 'Mon' },
  { value: 2, label: 'Tue' },
  { value: 3, label: 'Wed' },
  { value: 4, label: 'Thu' },
  { value: 5, label: 'Fri' },
  { value: 6, label: 'Sat' },
  { value: 0, label: 'Sun' },
];

export default function AddRoute() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: '',
    origin_address: '',
    destination_address: '',
    check_time: '08:00',
    check_days: [1, 2, 3, 4, 5], // Weekdays by default
  });

  const handleDayToggle = (day: number) => {
    setFormData(prev => ({
      ...prev,
      check_days: prev.check_days.includes(day)
        ? prev.check_days.filter(d => d !== day)
        : [...prev.check_days, day],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      routeSchema.parse(formData);
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          const path = error.path[0] as string;
          fieldErrors[path] = error.message;
        });
        setErrors(fieldErrors);
        return;
      }
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('routes')
        .insert({
          user_id: user?.id,
          name: formData.name.trim(),
          origin_address: formData.origin_address.trim(),
          destination_address: formData.destination_address.trim(),
          check_time: formData.check_time,
          check_days: formData.check_days,
        });

      if (error) throw error;

      toast({
        title: 'Route created',
        description: 'Your route has been added and will be tracked at the scheduled times.',
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating route:', error);
      toast({
        title: 'Error',
        description: 'Failed to create route. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Add New Route
            </CardTitle>
            <CardDescription>
              Set up a route to track commute times automatically.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Route Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Route Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Morning Commute"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              {/* Origin Address */}
              <div className="space-y-2">
                <Label htmlFor="origin">Origin Address</Label>
                <Input
                  id="origin"
                  placeholder="e.g., 123 Main St, San Francisco, CA"
                  value={formData.origin_address}
                  onChange={(e) => setFormData({ ...formData, origin_address: e.target.value })}
                  className={errors.origin_address ? 'border-destructive' : ''}
                />
                {errors.origin_address && <p className="text-sm text-destructive">{errors.origin_address}</p>}
              </div>

              {/* Destination Address */}
              <div className="space-y-2">
                <Label htmlFor="destination">Destination Address</Label>
                <Input
                  id="destination"
                  placeholder="e.g., 456 Market St, San Francisco, CA"
                  value={formData.destination_address}
                  onChange={(e) => setFormData({ ...formData, destination_address: e.target.value })}
                  className={errors.destination_address ? 'border-destructive' : ''}
                />
                {errors.destination_address && <p className="text-sm text-destructive">{errors.destination_address}</p>}
              </div>

              {/* Check Time */}
              <div className="space-y-2">
                <Label htmlFor="check_time" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Check Time
                </Label>
                <Input
                  id="check_time"
                  type="time"
                  value={formData.check_time}
                  onChange={(e) => setFormData({ ...formData, check_time: e.target.value })}
                  className={`w-40 ${errors.check_time ? 'border-destructive' : ''}`}
                />
                {errors.check_time && <p className="text-sm text-destructive">{errors.check_time}</p>}
              </div>

              {/* Days to Check */}
              <div className="space-y-3">
                <Label>Days to Check</Label>
                <div className="flex flex-wrap gap-3">
                  {DAYS.map((day) => (
                    <label
                      key={day.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={formData.check_days.includes(day.value)}
                        onCheckedChange={() => handleDayToggle(day.value)}
                      />
                      <span className="text-sm">{day.label}</span>
                    </label>
                  ))}
                </div>
                {errors.check_days && <p className="text-sm text-destructive">{errors.check_days}</p>}
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? 'Creating...' : 'Create Route'}
                </Button>
                <Link to="/dashboard">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
