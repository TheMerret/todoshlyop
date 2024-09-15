import { TasksTable } from '@/components/tasksTable';

export default function PersonalTasks() {
  return (
    <div className="flex flex-col gap-y-6">
      <TasksTable />
    </div>
  );
}
