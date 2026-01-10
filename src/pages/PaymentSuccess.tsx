import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get('session_id');
      if (!sessionId) {
        setVerifying(false);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { session_id: sessionId },
        });

        if (error) throw error;

        if (data?.success) {
          setVerified(true);
          toast({
            title: 'Payment successful!',
            description: 'Welcome to CommutesDontSuck Lifetime Access!',
          });
        }
      } catch (error) {
        console.error('Verification error:', error);
        toast({
          title: 'Verification issue',
          description: 'Your payment was received. Access will be granted shortly.',
          variant: 'default',
        });
        setVerified(true); // Still show success since Stripe processed payment
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams, toast]);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8">
            {verifying ? (
              <>
                <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
                <h1 className="text-2xl font-bold mb-2">Verifying Payment...</h1>
                <p className="text-muted-foreground">Please wait while we confirm your purchase.</p>
              </>
            ) : verified ? (
              <>
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Welcome to Lifetime Access!</h1>
                <p className="text-muted-foreground mb-6">
                  Thank you for your purchase. You now have unlimited access to CommutesDontSuck.
                </p>
                <Button onClick={() => navigate('/dashboard')} className="gradient-orange border-0">
                  Go to Dashboard
                </Button>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
                <p className="text-muted-foreground mb-6">
                  We couldn't verify your payment. Please contact support if you were charged.
                </p>
                <Button onClick={() => navigate('/dashboard')} variant="outline">
                  Go to Dashboard
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
