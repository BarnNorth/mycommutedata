import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { usePaywall } from '@/contexts/PaywallContext';
import Paywall from '@/components/Paywall';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const { hasLifetimeAccess, trialExpired, trialDaysRemaining, loading: subscriptionLoading } = useSubscription();
  const { paywallDismissed, showPaywall, dismissPaywall, closePaywall } = usePaywall();

  if (loading || subscriptionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Show paywall if trial expired and no lifetime access
  const shouldShowPaywall = trialExpired && !hasLifetimeAccess;
  
  // Show initial paywall (can be dismissed) or triggered paywall (from restricted actions)
  if (shouldShowPaywall && (!paywallDismissed || showPaywall)) {
    return (
      <>
        {children}
        <Paywall 
          trialDaysRemaining={trialDaysRemaining} 
          onClose={showPaywall ? closePaywall : dismissPaywall}
          canClose={true}
        />
      </>
    );
  }

  return <>{children}</>;
}
