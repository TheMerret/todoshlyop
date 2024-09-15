import AnalyticsDashboard from '@/components/analyticsDashboard';
import { Separator } from '@/components/ui/separator';

export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Analytics</h1>
      <Separator className="my-4"></Separator>
      <AnalyticsDashboard />
    </div>
  );
}
