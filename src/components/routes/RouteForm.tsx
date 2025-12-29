import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, Plus, X } from 'lucide-react';
import { z } from 'zod';

const routeSchema = z.object({
  name: z.string().min(1, 'Route name is required').max(100),
  origin_address: z.string().min(1, 'Origin address is required').max(500),
  destination_address: z.string().min(1, 'Destination address is required').max(500),
  check_times: z.array(z.string()).min(1, 'Add at least one check time'),
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

export interface RouteFormData {
  name: string;
  origin_address: string;
  destination_address: string;
  check_times: string[];
  check_days: number[];
}

interface RouteFormProps {
  initialData?: RouteFormData;
  onSubmit: (data: RouteFormData) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
  loadingLabel: string;
}

export default function RouteForm({ initialData, onSubmit, onCancel, submitLabel, loadingLabel }: RouteFormProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<RouteFormData>({
    name: '',
    origin_address: '',
    destination_address: '',
    check_times: ['08:00'],
    check_days: [1, 2, 3, 4, 5],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleDayToggle = (day: number) => {
    setFormData(prev => ({
      ...prev,
      check_days: prev.check_days.includes(day)
        ? prev.check_days.filter(d => d !== day)
        : [...prev.check_days, day],
    }));
  };

  const addCheckTime = () => {
    setFormData(prev => ({
      ...prev,
      check_times: [...prev.check_times, '08:00'],
    }));
  };

  const removeCheckTime = (index: number) => {
    if (formData.check_times.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      check_times: prev.check_times.filter((_, i) => i !== index),
    }));
  };

  const updateCheckTime = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      check_times: prev.check_times.map((t, i) => i === index ? value : t),
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
      await onSubmit({
        name: formData.name.trim(),
        origin_address: formData.origin_address.trim(),
        destination_address: formData.destination_address.trim(),
        check_times: formData.check_times,
        check_days: formData.check_days,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      {/* Check Times */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Check Times
        </Label>
        <div className="space-y-2">
          {formData.check_times.map((time, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                type="time"
                value={time}
                onChange={(e) => updateCheckTime(index, e.target.value)}
                className="w-40"
              />
              {formData.check_times.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-muted-foreground hover:text-destructive"
                  onClick={() => removeCheckTime(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={addCheckTime}
        >
          <Plus className="w-4 h-4" />
          Add Time
        </Button>
        {errors.check_times && <p className="text-sm text-destructive">{errors.check_times}</p>}
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
          {loading ? loadingLabel : submitLabel}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
