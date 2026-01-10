import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface SubscriptionStatus {
  isSubscribed: boolean;
  subscriptionEnd: Date | null;
  trialStartedAt: Date | null;
  trialExpired: boolean;
  trialDaysRemaining: number;
  loading: boolean;
  refreshSubscription: () => Promise<void>;
}

export function useSubscription(): SubscriptionStatus {
  const { user } = useAuth();
  const [status, setStatus] = useState<SubscriptionStatus>({
    isSubscribed: false,
    subscriptionEnd: null,
    trialStartedAt: null,
    trialExpired: false,
    trialDaysRemaining: 1,
    loading: true,
    refreshSubscription: async () => {},
  });

  const checkSubscription = useCallback(async () => {
    if (!user) return;

    try {
      // First check Stripe subscription status
      const { data: stripeData, error: stripeError } = await supabase.functions.invoke('check-subscription');

      if (stripeError) {
        console.error('Error checking subscription:', stripeError);
      }

      if (stripeData?.subscribed) {
        // User has active subscription
        setStatus(prev => ({
          ...prev,
          isSubscribed: true,
          subscriptionEnd: stripeData.subscription_end ? new Date(stripeData.subscription_end) : null,
          trialExpired: false,
          trialDaysRemaining: 0,
          loading: false,
        }));
        return;
      }

      // Check trial status from user_settings
      const { data, error } = await supabase
        .from('user_settings')
        .select('trial_started_at')
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

        setStatus(prev => ({
          ...prev,
          isSubscribed: false,
          subscriptionEnd: null,
          trialStartedAt,
          trialExpired: trialStartedAt ? trialExpired : false,
          trialDaysRemaining,
          loading: false,
        }));
      } else {
        // No settings yet, user hasn't created a route
        setStatus(prev => ({
          ...prev,
          isSubscribed: false,
          subscriptionEnd: null,
          trialStartedAt: null,
          trialExpired: false,
          trialDaysRemaining: 1,
          loading: false,
        }));
      }
    } catch (error) {
      console.error('Error fetching subscription status:', error);
      setStatus(prev => ({ ...prev, loading: false }));
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      setStatus(prev => ({ ...prev, loading: false }));
      return;
    }

    checkSubscription();

    // Refresh subscription status every minute
    const interval = setInterval(checkSubscription, 60000);

    return () => clearInterval(interval);
  }, [user, checkSubscription]);

  return {
    ...status,
    refreshSubscription: checkSubscription,
  };
}
