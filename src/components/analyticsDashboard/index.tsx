import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AnalyticsDashboard() {
  // Mock data for the activity calendar
  const activityData = [
    { date: '2023-05-01', count: 3 },
    { date: '2023-05-02', count: 5 },
    { date: '2023-05-03', count: 2 },
    { date: '2023-05-04', count: 7 },
    { date: '2023-05-05', count: 4 },
    { date: '2023-05-06', count: 1 },
    { date: '2023-05-07', count: 6 },
  ];

  // Mock data for tasks overview
  const totalTasks = 120;
  const completedTasks = 87;

  const getActivityColor = (count: number) => {
    if (count === 0) return 'bg-gray-100';
    if (count < 3) return 'bg-green-200';
    if (count < 5) return 'bg-green-400';
    return 'bg-green-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Activity Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {activityData.map((day, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-sm ${getActivityColor(day.count)}`}
                title={`${day.date}: ${day.count} activities`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tasks Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-2">{completedTasks}</div>
          <div className="text-sm text-gray-500 mb-4">Tasks completed</div>
          <div className="flex items-center">
            <div className="flex-grow bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 rounded-full h-2"
                style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
              />
            </div>
            <Badge variant="secondary" className="ml-2">
              {Math.round((completedTasks / totalTasks) * 100)}%
            </Badge>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            {completedTasks} out of {totalTasks} tasks
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
