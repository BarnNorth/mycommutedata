import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { MapPin, Clock, ArrowRight, Pencil, Trash2, Copy, GripVertical } from 'lucide-react';
import { format } from 'date-fns';

interface Route {
  id: string;
  name: string;
  origin_address: string;
  destination_address: string;
  check_time: string[];
  check_days: number[];
  is_active: boolean;
}

interface DraggableRouteCardProps {
  route: Route;
  onToggle: (routeId: string, isActive: boolean) => void;
  onEdit: (route: Route) => void;
  onDelete: (route: Route) => void;
  onDuplicate: (route: Route) => void;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return format(date, 'h:mm a');
};

const formatTimes = (times: string[]) => {
  if (times.length <= 2) {
    return times.map(formatTime).join(', ');
  }
  return `${formatTime(times[0])} +${times.length - 1} more`;
};

const getDaysLabel = (days: number[]) => {
  if (days.length === 7) return 'Every day';
  if (JSON.stringify([...days].sort()) === JSON.stringify([1, 2, 3, 4, 5])) return 'Weekdays';
  if (JSON.stringify([...days].sort()) === JSON.stringify([0, 6])) return 'Weekends';
  return days.map(d => DAYS[d]).join(', ');
};

export default function DraggableRouteCard({
  route,
  onToggle,
  onEdit,
  onDelete,
  onDuplicate,
}: DraggableRouteCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: route.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`shadow-card hover:shadow-soft transition-shadow ${isDragging ? 'ring-2 ring-primary' : ''}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start gap-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-muted-foreground hover:text-foreground touch-none"
            aria-label="Drag to reorder"
          >
            <GripVertical className="w-4 h-4" />
          </button>
          <CardTitle className="text-lg flex-1">{route.name}</CardTitle>
        </div>
        <div className="flex items-center gap-1 pt-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onDuplicate(route)}
            title="Duplicate route"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit(route)}
            title="Edit route"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => onDelete(route)}
            title="Delete route"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <div className="ml-auto">
            <Switch
              checked={route.is_active}
              onCheckedChange={(checked) => onToggle(route.id, checked)}
            />
          </div>
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
          <span>{formatTimes(route.check_time)}</span>
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
  );
}
