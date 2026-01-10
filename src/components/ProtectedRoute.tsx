import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import Paywall from '@/components/Paywall';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const { hasLifetimeAccess, trialExpired, trialDaysRemaining, loading: subscriptionLoading } = useSubscription();

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
  if (trialExpired && !hasLifetimeAccess) {
    return (
      <>
        {children}
        <Paywall trialDaysRemaining={trialDaysRemaining} />
      </>
    );
  }

  return <>{children}</>;
}
