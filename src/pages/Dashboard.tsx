import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Plus, MapPin, Clock, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface Route {
  id: string;
  name: string;
  origin_address: string;
  destination_address: string;
  check_time: string;
  check_days: number[];
  is_active: boolean;
}

interface CommuteLog {
  id: string;
  checked_at: string;
  duration_minutes: number;
  duration_in_traffic_minutes: number;
  day_of_week: string;
  route: {
    name: string;
  };
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [recentLogs, setRecentLogs] = useState<CommuteLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch routes
      const { data: routesData, error: routesError } = await supabase
        .from('routes')
        .select('*')
        .order('created_at', { ascending: false });

      if (routesError) throw routesError;
      setRoutes(routesData || []);

      // Fetch recent logs
      const { data: logsData, error: logsError } = await supabase
        .from('commute_logs')
        .select(`
          *,
          route:routes(name)
        `)
        .order('checked_at', { ascending: false })
        .limit(10);

      if (logsError) throw logsError;
      setRecentLogs(logsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleRoute = async (routeId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('routes')
        .update({ is_active: isActive })
        .eq('id', routeId);

      if (error) throw error;

      setRoutes(routes.map(r => r.id === routeId ? { ...r, is_active: isActive } : r));
      
      toast({
        title: isActive ? 'Route enabled' : 'Route disabled',
        description: `Tracking has been ${isActive ? 'resumed' : 'paused'} for this route.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update route. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return format(date, 'h:mm a');
  };

  const getDaysLabel = (days: number[]) => {
    if (days.length === 7) return 'Every day';
    if (JSON.stringify(days.sort()) === JSON.stringify([1, 2, 3, 4, 5])) return 'Weekdays';
    if (JSON.stringify(days.sort()) === JSON.stringify([0, 6])) return 'Weekends';
    return days.map(d => DAYS[d]).join(', ');
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
      <div className="space-y-6">
        {/* Routes Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Your Routes</h1>
            <Link to="/routes/new">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Route
              </Button>
            </Link>
          </div>

          {routes.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <MapPin className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No routes yet</h3>
                <p className="text-muted-foreground mb-4">
                  Add your first route to start tracking commute times.
                </p>
                <Link to="/routes/new">
                  <Button>Add Your First Route</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {routes.map((route) => (
                <Card key={route.id} className="shadow-card hover:shadow-soft transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{route.name}</CardTitle>
                      <Switch
                        checked={route.is_active}
                        onCheckedChange={(checked) => toggleRoute(route.id, checked)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="truncate">{route.origin_address}</p>
                        <ArrowRight className="w-3 h-3 text-muted-foreground my-1" />
                        <p className="truncate">{route.destination_address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{formatTime(route.check_time)}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{getDaysLabel(route.check_days)}</span>
                    </div>
                    <div className="pt-2">
                      <Link to={`/routes/${route.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          View History
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Recent Results */}
        {recentLogs.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Recent Results</h2>
            <Card className="shadow-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Duration</TableHead>
                    <TableHead className="text-right">With Traffic</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.route?.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(log.checked_at), 'MMM d, h:mm a')}
                      </TableCell>
                      <TableCell className="text-right">{log.duration_minutes} min</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={log.duration_in_traffic_minutes > log.duration_minutes * 1.2 ? 'destructive' : 'secondary'}>
                          {log.duration_in_traffic_minutes} min
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
