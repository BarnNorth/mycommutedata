import { ReactNode, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { usePaywall } from '@/contexts/PaywallContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LayoutDashboard, Settings, LogOut, Plus, Crown, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import Footer from './Footer';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { signOut, user } = useAuth();
  const { isSubscribed, subscriptionEnd, trialStartedAt, trialExpired, trialDaysRemaining, loading: subscriptionLoading } = useSubscription();
  const { triggerPaywall } = usePaywall();
  const location = useLocation();
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  const handleAddRouteClick = (e: React.MouseEvent) => {
    if (trialExpired && !isSubscribed) {
      e.preventDefault();
      triggerPaywall();
    }
  };

  // Update countdown timer every second
  useEffect(() => {
    if (isSubscribed || !trialStartedAt || trialExpired) return;

    const updateTimer = () => {
      const now = new Date();
      const trialEndDate = new Date(trialStartedAt);
      trialEndDate.setDate(trialEndDate.getDate() + 1);
      
      const msRemaining = trialEndDate.getTime() - now.getTime();
      
      if (msRemaining <= 0) {
        setTimeRemaining('Expired');
        return;
      }

      const hours = Math.floor(msRemaining / (1000 * 60 * 60));
      const minutes = Math.floor((msRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((msRemaining % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isSubscribed, trialStartedAt, trialExpired]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl gradient-orange flex items-center justify-center text-lg shadow-orange">
                🚗
              </div>
              <span className="font-bold text-lg hidden sm:block">CommutesDontSuck</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant={location.pathname === item.href ? 'secondary' : 'ghost'}
                    size="sm"
                    className="gap-2"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {/* Member Status */}
            {!subscriptionLoading && (
              isSubscribed ? (
                <Badge variant="secondary" className="gap-1.5 bg-primary/10 text-primary border-primary/20">
                  <Crown className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Pro</span>
                </Badge>
              ) : trialExpired ? (
                <Badge variant="outline" className="gap-1.5 border-destructive/30 text-destructive">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Trial Expired</span>
                </Badge>
              ) : trialStartedAt ? (
                <Badge variant="outline" className="gap-1.5 border-orange-500/30 text-orange-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Trial:</span> {timeRemaining}
                </Badge>
              ) : null
            )}
            <Link to="/routes/new" onClick={handleAddRouteClick}>
              <Button size="sm" className="gap-2 gradient-orange border-0">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Route</span>
              </Button>
            </Link>
            <div className="hidden sm:block text-sm text-muted-foreground">
              {user?.email}
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <nav className="md:hidden border-b border-border bg-card">
        <div className="container mx-auto px-4 py-2 flex gap-2">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} className="flex-1">
              <Button
                variant={location.pathname === item.href ? 'secondary' : 'ghost'}
                size="sm"
                className={cn('w-full gap-2', location.pathname === item.href && 'bg-secondary')}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8 flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
