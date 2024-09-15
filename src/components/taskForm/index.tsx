'use client';

import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Combobox } from '@/components/ui/combobox';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import { SERVER_IP } from '@/app/config';

const assignees = [
  { label: 'John Doe', value: '1' },
  { label: 'Jane Smith', value: '2' },
  { label: 'Bob Johnson', value: '3' },
];

const statuses = [
  { label: 'Open', value: 'planning' },
  { label: 'Done', value: 'done' },
  { label: 'Rejected', value: 'cancelled' },
] as const;

const priorities = [
  { label: 'Low', value: '1' },
  { label: 'Medium', value: '2' },
  { label: 'High', value: '3' },
];

interface TaskFormData {
  title: string;
  description?: string;
  task_status: 'planning' | 'done' | 'cancelled' | 'running';
  task_importance: string;
  reminder: Date;
  attendant: string;
}

async function createTask(data: TaskFormData, token: string) {
  const params = new URLSearchParams();
  params.append('title', data.title);
  params.append('team_id', 'null');
  params.append('description', data.description ?? '');
  params.append('task_status', data.task_status);
  params.append('task_importance', String(data.task_importance));
  params.append('reminder', data.reminder?.toISOString() ?? '');
  params.append('attendant_id', data.attendant);
  params.append('xp', '10');
  const response = await axios.post(`${SERVER_IP}/tasks/create_task`, params, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export const TaskForm: FC = function () {
  const { register, handleSubmit, setValue } = useForm<TaskFormData>();
  const [title, setTitle] = useState('Task Title');
  const [description, setDescription] = useState(
    '# Task Description\n\nThis is a markdown description of the task.'
  );
  const [isEditing, setIsEditing] = useState(false);
  const [assignee, setAssignee] = useState(assignees[0]);
  const [reminder, setReminder] = useState<Date>(new Date());
  const [status, setStatus] = useState<'planning' | 'done' | 'cancelled'>(
    'planning'
  );
  const [priority, setPriority] = useState('1');
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const mutation = useMutation({
    mutationFn: (data: TaskFormData) => createTask(data, token ?? ''),
    onSuccess: () => {
      // Handle successful login
      router.push('/personal');
    },
    onError: () => {
      // Handle error case
    },
  });
  const onSubmit = (data: TaskFormData) => {
    mutation.mutate(data);
  };
  return (
    <form
      className="max-w-4xl mx-auto p-6 space-y-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-2">
        <Input
          {...register('title')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-3xl font-bold"
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        {isEditing ? (
          <Textarea
            {...register('description')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={10}
          />
        ) : (
          <div className="prose max-w-none" onClick={() => setIsEditing(true)}>
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        )}
        <Button type="button" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Assignee</Label>
        <Combobox
          {...register('attendant', { value: assignee.value })}
          items={assignees}
          selectedItem={assignee}
          onSelectedItemChange={(i) => {
            setAssignee(i), setValue('attendant', i.value);
          }}
        />
      </div>

      <div className="space-y-2">
        <Label>Reminder</Label>
        <Popover {...register('reminder', { value: reminder })}>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {reminder ? format(reminder, 'PPP') : <span>Pick a date</span>}
              <CalendarIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={reminder}
              onSelect={(i) => {
                if (i) {
                  setReminder(i);
                  setValue('reminder', i);
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <RadioGroup
          value={status}
          {...register('task_status')}
          onValueChange={(i: 'planning' | 'done' | 'cancelled') => {
            setStatus(i);
            setValue('task_status', i);
          }}
        >
          {statuses.map((s) => (
            <div key={s.value} className="flex items-center space-x-2">
              <RadioGroupItem value={s.value} id={s.value} />
              <Label htmlFor={s.value}>{s.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Priority</Label>
        <RadioGroup
          {...register('task_importance')}
          value={priority}
          onValueChange={(i) => {
            setPriority(i);
            setValue('task_importance', i);
          }}
        >
          {priorities.map((p) => (
            <div key={p.value} className="flex items-center space-x-2">
              <RadioGroupItem value={p.value} id={p.value} />
              <Label htmlFor={p.value}>{p.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Button type="submit">Готово</Button>
    </form>
  );
};
