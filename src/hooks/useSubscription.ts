import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface SubscriptionStatus {
  hasLifetimeAccess: boolean;
  trialStartedAt: Date | null;
  trialExpired: boolean;
  trialDaysRemaining: number;
  loading: boolean;
}

export function useSubscription(): SubscriptionStatus {
  const { user } = useAuth();
  const [status, setStatus] = useState<SubscriptionStatus>({
    hasLifetimeAccess: false,
    trialStartedAt: null,
    trialExpired: false,
    trialDaysRemaining: 1,
    loading: true,
  });

  useEffect(() => {
    if (!user) {
      setStatus(prev => ({ ...prev, loading: false }));
      return;
    }

    const fetchSubscriptionStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('user_settings')
          .select('has_lifetime_access, trial_started_at')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          const trialStartedAt = data.trial_started_at ? new Date(data.trial_started_at) : null;
          let trialExpired = false;
          let trialDaysRemaining = 1;

          if (trialStartedAt) {
            const now = new Date();
            const trialEndDate = new Date(trialStartedAt);
            trialEndDate.setDate(trialEndDate.getDate() + 1); // 1 day trial
            
            trialExpired = now > trialEndDate;
            
            if (!trialExpired) {
              const msRemaining = trialEndDate.getTime() - now.getTime();
              const hoursRemaining = msRemaining / (1000 * 60 * 60);
              trialDaysRemaining = Math.max(0, hoursRemaining / 24);
            } else {
              trialDaysRemaining = 0;
            }
          }

          setStatus({
            hasLifetimeAccess: data.has_lifetime_access || false,
            trialStartedAt,
            trialExpired: trialStartedAt ? trialExpired : false,
            trialDaysRemaining,
            loading: false,
          });
        } else {
          // No settings yet, user hasn't created a route
          setStatus({
            hasLifetimeAccess: false,
            trialStartedAt: null,
            trialExpired: false,
            trialDaysRemaining: 1,
            loading: false,
          });
        }
      } catch (error) {
        console.error('Error fetching subscription status:', error);
        setStatus(prev => ({ ...prev, loading: false }));
      }
    };

    fetchSubscriptionStatus();
  }, [user]);

  return status;
}
