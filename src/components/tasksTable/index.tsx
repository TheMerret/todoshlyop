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

type Task = {
  id: string;
  title: string;
  status: 'done' | 'reject';
  assignee: string;
  reminderDate: string;
  priority: 'low' | 'medium' | 'high';
};

const mockData: Task[] = [
  {
    id: '001',
    title: 'Complete project proposal',
    status: 'done',
    assignee: 'John Doe',
    reminderDate: '2023-06-15',
    priority: 'high',
  },
  {
    id: '002',
    title: 'Review code changes',
    status: 'reject',
    assignee: 'Jane Smith',
    reminderDate: '2023-06-16',
    priority: 'medium',
  },
  {
    id: '003',
    title: 'Update documentation',
    status: 'done',
    assignee: 'Bob Johnson',
    reminderDate: '2023-06-17',
    priority: 'low',
  },
  {
    id: '004',
    title: 'Prepare presentation',
    status: 'done',
    assignee: 'Alice Brown',
    reminderDate: '2023-06-18',
    priority: 'high',
  },
  {
    id: '005',
    title: 'Fix bug in login module',
    status: 'reject',
    assignee: 'Charlie Wilson',
    reminderDate: '2023-06-19',
    priority: 'medium',
  },
];

export const TasksTable: FC = function () {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const isTaskSelected = (taskId: string) => selectedTasks.includes(taskId);

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
            <TableHead>Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <Checkbox
                  checked={isTaskSelected(task.id)}
                  onCheckedChange={() => toggleTaskSelection(task.id)}
                />
              </TableCell>
              <TableCell>{task.id}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    task.status === 'done' ? 'secondary' : 'destructive'
                  }
                >
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell>{task.assignee}</TableCell>
              <TableCell>{task.reminderDate}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    task.priority === 'high'
                      ? 'destructive'
                      : task.priority === 'medium'
                        ? 'outline'
                        : 'secondary'
                  }
                >
                  {task.priority}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
