import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Settings as SettingsIcon, Globe, Loader2, CreditCard, ExternalLink } from 'lucide-react';
import { logger } from '@/lib/logger';

const TIMEZONES = [
  { value: 'America/Los_Angeles', label: 'Pacific Time (Los Angeles)' },
  { value: 'America/Denver', label: 'Mountain Time (Denver)' },
  { value: 'America/Chicago', label: 'Central Time (Chicago)' },
  { value: 'America/New_York', label: 'Eastern Time (New York)' },
  { value: 'America/Anchorage', label: 'Alaska Time' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Paris', label: 'Paris (CET)' },
  { value: 'Europe/Berlin', label: 'Berlin (CET)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
  { value: 'Asia/Singapore', label: 'Singapore (SGT)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST)' },
];

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { isSubscribed, subscriptionEnd, cancelAtPeriodEnd } = useSubscription();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [managingSubscription, setManagingSubscription] = useState(false);
  const [timezone, setTimezone] = useState('America/Los_Angeles');
  const [hasExistingSettings, setHasExistingSettings] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSettings();
    }
  }, [user]);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setTimezone(data.timezone || 'America/Los_Angeles');
        setHasExistingSettings(true);
      }
    } catch (error) {
      logger.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      if (hasExistingSettings) {
        const { error } = await supabase
          .from('user_settings')
          .update({ timezone })
          .eq('user_id', user?.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('user_settings')
          .insert({
            user_id: user?.id,
            timezone,
          });

        if (error) throw error;
        setHasExistingSettings(true);
      }

      toast({
        title: 'Settings saved',
        description: 'Your timezone has been updated.',
      });
    } catch (error) {
      logger.error('Error saving settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <SettingsIcon className="w-6 h-6" />
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your account preferences.
          </p>
        </div>

        {/* Timezone */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="w-5 h-5 text-primary" />
              Timezone
            </CardTitle>
            <CardDescription>
              Used for scheduling route checks at the correct time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="timezone">Your Timezone</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {TIMEZONES.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Management */}
        {isSubscribed && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CreditCard className="w-5 h-5 text-primary" />
                Subscription
              </CardTitle>
              <CardDescription>
                Manage your Pro subscription, update payment methods, or cancel.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">CommutesDontSuck Pro</p>
                  <p className="text-sm text-muted-foreground">
                    {cancelAtPeriodEnd && subscriptionEnd
                      ? `Cancelled - Access until ${subscriptionEnd.toLocaleDateString()}`
                      : subscriptionEnd 
                        ? `Renews on ${subscriptionEnd.toLocaleDateString()}`
                        : 'Active subscription'
                    }
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  cancelAtPeriodEnd 
                    ? 'bg-amber-500/20 text-amber-400' 
                    : 'bg-green-500/20 text-green-400'
                }`}>
                  {cancelAtPeriodEnd ? 'Cancelled' : 'Active'}
                </span>
              </div>
              <Button 
                variant="outline" 
                onClick={async () => {
                  setManagingSubscription(true);
                  try {
                    const { data, error } = await supabase.functions.invoke('customer-portal');
                    if (error) throw error;
                    if (data?.url) {
                      window.open(data.url, '_blank');
                    }
                  } catch (error) {
                    logger.error('Error opening customer portal:', error);
                    toast({
                      title: 'Error',
                      description: 'Failed to open subscription management. Please try again.',
                      variant: 'destructive',
                    });
                  } finally {
                    setManagingSubscription(false);
                  }
                }}
                disabled={managingSubscription}
                className="w-full"
              >
                {managingSubscription ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Opening...
                  </>
                ) : (
                  <>
                    Manage Subscription
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Save Button */}
        <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto gradient-orange border-0">
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Settings'
          )}
        </Button>
      </div>
    </DashboardLayout>
  );
}
