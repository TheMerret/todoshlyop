import { TaskForm } from '@/components/taskForm';

interface TasksParams {
  params: {
    id: number;
  };
}

export default function Task({ params }: TasksParams) {
  params.id;
  return (
    <div className="flex justify-center align-center">
      <TaskForm></TaskForm>
    </div>
  );
}
