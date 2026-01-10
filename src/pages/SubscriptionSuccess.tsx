import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Loader2 } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useSubscription } from '@/hooks/useSubscription';

export default function SubscriptionSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const { refreshSubscription } = useSubscription();

  useEffect(() => {
    const verifySubscription = async () => {
      if (!sessionId) {
        setVerifying(false);
        toast({
          title: 'Error',
          description: 'No session ID found',
          variant: 'destructive',
        });
        return;
      }

      try {
        // Give Stripe a moment to process
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Refresh subscription status
        await refreshSubscription();
        
        setVerified(true);
        toast({
          title: 'Success!',
          description: 'Your subscription is now active.',
        });

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } catch (error) {
        console.error('Verification error:', error);
        toast({
          title: 'Error',
          description: 'Failed to verify subscription. Please refresh the page.',
          variant: 'destructive',
        });
      } finally {
        setVerifying(false);
      }
    };

    verifySubscription();
  }, [sessionId, navigate, toast, refreshSubscription]);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            {verifying ? (
              <>
                <div className="mx-auto mb-4">
                  <Loader2 className="w-16 h-16 text-primary animate-spin" />
                </div>
                <CardTitle>Verifying Subscription...</CardTitle>
                <CardDescription>Please wait while we confirm your subscription.</CardDescription>
              </>
            ) : verified ? (
              <>
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <CardTitle>Welcome to Pro!</CardTitle>
                <CardDescription>
                  Your subscription is now active. You have unlimited access to all features.
                </CardDescription>
              </>
            ) : (
              <>
                <CardTitle>Something went wrong</CardTitle>
                <CardDescription>
                  We couldn't verify your subscription. Please contact support if you were charged.
                </CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent>
            {!verifying && (
              <Button onClick={() => navigate('/dashboard')} className="mt-4">
                Go to Dashboard
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
