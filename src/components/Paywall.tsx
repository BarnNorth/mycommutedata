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

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment');

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Error',
        description: 'Failed to start checkout. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const hoursRemaining = Math.floor(trialDaysRemaining * 24);
  const minutesRemaining = Math.floor((trialDaysRemaining * 24 - hoursRemaining) * 60);

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="max-w-lg w-full shadow-2xl border-2 relative">
        {canClose && onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 h-8 w-8 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        )}
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Your 24-Hour Trial Has Ended</CardTitle>
          <CardDescription className="text-base mt-2">
            Unlock lifetime access to CommutesDontSuck for just $9.99 — one payment, forever yours.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {canClose && (
            <p className="text-sm text-center text-muted-foreground bg-muted/50 rounded-lg p-3">
              You can still view your historical data, but adding or editing routes requires a paid account.
            </p>
          )}
          <div className="bg-muted rounded-lg p-4 space-y-3">
            <h4 className="font-semibold">Lifetime Access includes:</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Unlimited route tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Real-time traffic duration monitoring</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Historical commute data & insights</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>All future updates included</span>
              </li>
            </ul>
          </div>

          <div className="text-center space-y-4">
            <div>
              <Badge variant="secondary" className="text-lg px-4 py-1">
                One-time payment
              </Badge>
            </div>
            <div className="text-4xl font-bold">$9.99</div>
            <p className="text-sm text-muted-foreground">
              Pay once, use forever. No subscriptions.
            </p>
          </div>

          <Button 
            onClick={handlePurchase} 
            disabled={loading}
            className="w-full gradient-orange border-0 text-lg py-6"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Opening checkout...
              </>
            ) : (
              'Get Lifetime Access'
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Secure payment powered by Stripe. 30-day money-back guarantee.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
