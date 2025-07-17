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
import { useRouter } from 'next/navigation';
import { useCreateTask } from '@/queries/tasks/hooks';
import { TaskForm as TaskFormSchema } from '@/queries/api.schemas';


export const TaskForm: FC = function () {
  const { register, handleSubmit, setValue, watch } = useForm<TaskFormSchema>();
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
  const router = useRouter();
  const mutation = useCreateTask();
  const onSubmit = (data: TaskFormSchema) => {
    mutation.mutate(data, {
      onSuccess: () => {
        router.push('/personal');
      }
    });
  };
  return (
    <form
      className="max-w-4xl mx-auto p-6 space-y-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-2">
        <Input
          {...register('title')}
          className="text-3xl font-bold"
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        {isDescriptionEditing ? (
          <Textarea
            {...register('description')}
            rows={10}
          />
        ) : (
          <div className="prose max-w-none" onClick={() => setIsDescriptionEditing(true)}>
            <ReactMarkdown>{watch('description')}</ReactMarkdown>
          </div>
        )}
        <Button type="button" onClick={() => setIsDescriptionEditing(!isDescriptionEditing)}>
          {isDescriptionEditing ? 'Save' : 'Edit'}
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Assignee</Label>
        <Combobox
          {...register('attendant_id')}
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
