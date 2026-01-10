import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Clock, CheckCircle, Loader2, X } from 'lucide-react';

interface PaywallProps {
  trialDaysRemaining?: number;
  onClose?: () => void;
  canClose?: boolean;
}

export default function Paywall({ trialDaysRemaining = 0, onClose, canClose = true }: PaywallProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) throw sessionError;
      if (!session?.access_token) {
        throw new Error('No active session. Please sign in again and retry.');
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to start checkout. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <Card className="max-w-lg w-full shadow-2xl border-2 relative my-2 sm:my-auto">
        {canClose && onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-7 w-7 sm:h-8 sm:w-8 rounded-full z-10"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        )}
        <CardHeader className="text-center pb-2 pt-4 sm:pt-6 px-4 sm:px-6">
          <div className="mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          </div>
          <CardTitle className="text-xl sm:text-2xl">Your 24-Hour Trial Has Ended</CardTitle>
          <CardDescription className="text-sm sm:text-base mt-2">
            Subscribe to CommutesDontSuck Pro for just $14.99/month to continue tracking your commutes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
          {canClose && (
            <p className="text-xs sm:text-sm text-center text-muted-foreground bg-muted/50 rounded-lg p-2 sm:p-3">
              You can still view your historical data, but adding or editing routes requires an active subscription.
            </p>
          )}
          <div className="bg-muted rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
            <h4 className="font-semibold text-sm sm:text-base">Pro Subscription includes:</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Unlimited route tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Real-time traffic duration monitoring</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Historical commute data & insights</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Cancel anytime</span>
              </li>
            </ul>
          </div>

          <div className="text-center space-y-2 sm:space-y-4">
            <div>
              <Badge variant="secondary" className="text-base sm:text-lg px-3 sm:px-4 py-0.5 sm:py-1">
                Monthly subscription
              </Badge>
            </div>
            <div className="text-3xl sm:text-4xl font-bold">$14.99<span className="text-lg text-muted-foreground">/month</span></div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Cancel anytime. No long-term commitment.
            </p>
          </div>

          <Button 
            onClick={handleSubscribe} 
            disabled={loading}
            className="w-full gradient-orange border-0 text-base sm:text-lg py-5 sm:py-6"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                Opening checkout...
              </>
            ) : (
              'Subscribe Now'
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Secure payment powered by Stripe.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
