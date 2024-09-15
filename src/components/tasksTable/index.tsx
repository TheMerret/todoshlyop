'use client';

import { FC, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

export interface Task {
  id: number;
  title: string;
  description?: string;
  task_status: 'planning' | 'done' | 'rejected';
  task_importance: number;
  reminder?: string;
  attendant: string;
  xp?: number;
}

interface TasksTableProps {
  tasks: Task[];
  checkCallback?: (taskId: Task['id'], state: boolean) => void;
}

export const TasksTable: FC<TasksTableProps> = function ({
  tasks,
  checkCallback,
}) {
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const toggleTaskSelection = (taskId: number) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const isTaskSelected = (taskId: number) => selectedTasks.includes(taskId);

  return (
    <div className="container rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Задача</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Ответственный</TableHead>
            <TableHead></TableHead>
            <TableHead>Приоритет</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <Checkbox
                  checked={isTaskSelected(task.id)}
                  onCheckedChange={(state) => {
                    toggleTaskSelection(task.id);
                    checkCallback?.(task.id, Boolean(state.valueOf()));
                  }}
                />
              </TableCell>
              <TableCell>{task.id}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    task.task_status === 'done' ? 'secondary' : 'destructive'
                  }
                >
                  {task.task_status}
                </Badge>
              </TableCell>
              <TableCell>{task.attendant}</TableCell>
              <TableCell>{task.reminder ?? ''}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    task.task_importance === 3
                      ? 'destructive'
                      : task.task_importance === 2
                        ? 'outline'
                        : 'secondary'
                  }
                >
                  {task.task_importance}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
