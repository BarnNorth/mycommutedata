import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Download, Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { format, parseISO, startOfDay } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { logger } from '@/lib/logger';

interface Route {
  id: string;
  name: string;
  origin_address: string;
  destination_address: string;
}

interface CommuteLog {
  id: string;
  checked_at: string;
  duration_minutes: number;
  duration_in_traffic_minutes: number;
  day_of_week: string;
}

interface GroupedLogs {
  [date: string]: CommuteLog[];
}

export default function RouteHistory() {
  const { routeId } = useParams();
  const { toast } = useToast();
  const [route, setRoute] = useState<Route | null>(null);
  const [logs, setLogs] = useState<CommuteLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (routeId) {
      fetchData();
    }
  }, [routeId]);

  const fetchData = async () => {
    try {
      // Fetch route details
      const { data: routeData, error: routeError } = await supabase
        .from('routes')
        .select('*')
        .eq('id', routeId)
        .single();

      if (routeError) throw routeError;
      setRoute(routeData);

      // Fetch commute logs
      const { data: logsData, error: logsError } = await supabase
        .from('commute_logs')
        .select('*')
        .eq('route_id', routeId)
        .order('checked_at', { ascending: true });

      if (logsError) throw logsError;
      setLogs(logsData || []);
    } catch (error) {
      logger.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load route history.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    if (logs.length === 0) return null;
    
    const durations = logs.map(l => l.duration_in_traffic_minutes);
    const avg = Math.round(durations.reduce((a, b) => a + b, 0) / durations.length);
    const min = Math.min(...durations);
    const max = Math.max(...durations);
    
    return { avg, min, max };
  };

  const getChartData = () => {
    return logs.map(log => ({
      date: format(parseISO(log.checked_at), 'MMM d'),
      duration: log.duration_minutes,
      withTraffic: log.duration_in_traffic_minutes,
    }));
  };

  const groupLogsByDay = (): GroupedLogs => {
    const grouped: GroupedLogs = {};
    logs.slice().reverse().forEach(log => {
      const date = format(parseISO(log.checked_at), 'yyyy-MM-dd');
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(log);
    });
    return grouped;
  };

  const exportCSV = () => {
    const headers = ['Date', 'Time', 'Day', 'Duration (min)', 'With Traffic (min)'];
    const rows = logs.map(log => [
      format(parseISO(log.checked_at), 'yyyy-MM-dd'),
      format(parseISO(log.checked_at), 'HH:mm'),
      log.day_of_week,
      log.duration_minutes,
      log.duration_in_traffic_minutes,
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${route?.name || 'route'}-commute-history.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = calculateStats();
  const chartData = getChartData();
  const groupedLogs = groupLogsByDay();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!route) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Route not found</p>
          <Link to="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-2 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold">{route.name}</h1>
            <p className="text-muted-foreground text-sm">
              {route.origin_address} → {route.destination_address}
            </p>
          </div>
          <Button variant="outline" onClick={exportCSV} className="gap-2" disabled={logs.length === 0}>
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        {logs.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Clock className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No data yet</h3>
              <p className="text-muted-foreground">
                Commute times will appear here once tracking begins.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Stats */}
            {stats && (
              <div className="grid grid-cols-3 gap-4">
                <Card className="shadow-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Minus className="w-4 h-4" />
                      <span className="text-sm">Average</span>
                    </div>
                    <p className="text-3xl font-bold">{stats.avg} <span className="text-lg font-normal text-muted-foreground">min</span></p>
                  </CardContent>
                </Card>
                <Card className="shadow-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-success mb-1">
                      <TrendingDown className="w-4 h-4" />
                      <span className="text-sm">Best</span>
                    </div>
                    <p className="text-3xl font-bold">{stats.min} <span className="text-lg font-normal text-muted-foreground">min</span></p>
                  </CardContent>
                </Card>
                <Card className="shadow-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-destructive mb-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">Worst</span>
                    </div>
                    <p className="text-3xl font-bold">{stats.max} <span className="text-lg font-normal text-muted-foreground">min</span></p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Chart */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Commute Duration Over Time</CardTitle>
                <CardDescription>Compare base duration vs traffic conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="date" 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12}
                        tickFormatter={(value) => `${value}m`}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        formatter={(value: number) => [`${value} min`, '']}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="duration" 
                        stroke="hsl(var(--muted-foreground))" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--muted-foreground))' }}
                        name="Base Duration"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="withTraffic" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--primary))' }}
                        name="With Traffic"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Grouped Results */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Results by Day</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(groupedLogs).map(([date, dayLogs]) => (
                  <div key={date}>
                    <h4 className="font-medium mb-3">
                      {format(parseISO(date), 'EEEE, MMMM d, yyyy')}
                    </h4>
                    <div className="space-y-2">
                      {dayLogs.map(log => (
                        <div 
                          key={log.id} 
                          className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">
                              {format(parseISO(log.checked_at), 'h:mm a')}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">
                              {log.duration_minutes} min base
                            </span>
                            <Badge variant={log.duration_in_traffic_minutes > log.duration_minutes * 1.2 ? 'destructive' : 'secondary'}>
                              {log.duration_in_traffic_minutes} min with traffic
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
