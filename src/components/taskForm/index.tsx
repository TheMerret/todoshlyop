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

const assignees = [
  { label: 'John Doe', value: 'john' },
  { label: 'Jane Smith', value: 'jane' },
  { label: 'Bob Johnson', value: 'bob' },
];

const statuses = [
  { label: 'Open', value: 'open' },
  { label: 'Done', value: 'done' },
  { label: 'Rejected', value: 'rejected' },
];

const priorities = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

export const TaskForm: FC = function () {
  const [title, setTitle] = useState('Task Title');
  const [description, setDescription] = useState(
    '# Task Description\n\nThis is a markdown description of the task.'
  );
  const [isEditing, setIsEditing] = useState(false);
  const [assignee, setAssignee] = useState(assignees[0]);
  const [reminder, setReminder] = useState<Date>();
  const [status, setStatus] = useState('open');
  const [priority, setPriority] = useState('medium');

  return (
    <form className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-3xl font-bold"
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        {isEditing ? (
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={10}
          />
        ) : (
          <div className="prose max-w-none" onClick={() => setIsEditing(true)}>
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        )}
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Assignee</Label>
        <Combobox
          items={assignees}
          selectedItem={assignee}
          onSelectedItemChange={setAssignee}
        />
      </div>

      <div className="space-y-2">
        <Label>Reminder</Label>
        <Popover>
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
              onSelect={setReminder}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <RadioGroup value={status} onValueChange={setStatus}>
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
        <RadioGroup value={priority} onValueChange={setPriority}>
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
