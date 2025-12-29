import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MapPin, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import RouteForm, { RouteFormData } from '@/components/routes/RouteForm';

export default function AddRoute() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: RouteFormData) => {
    try {
      const { error } = await supabase
        .from('routes')
        .insert({
          user_id: user?.id,
          name: data.name,
          origin_address: data.origin_address,
          destination_address: data.destination_address,
          check_time: data.check_times,
          check_days: data.check_days,
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
            <RouteForm
              onSubmit={handleSubmit}
              onCancel={() => navigate('/dashboard')}
              submitLabel="Create Route"
              loadingLabel="Creating..."
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
