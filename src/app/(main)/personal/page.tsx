import { PersonalTasksTable } from '@/components/personalTasksTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function PersonalTasks() {
  return (
    <div className="flex flex-col gap-y-6">
      <PersonalTasksTable />
      <div>
        <Button asChild>
          <Link href={'/tasks/create'}>
            <Plus className="mr-2 h-4 w-4" /> Создать задачу
          </Link>
        </Button>
      </div>
    </div>
  );
}
