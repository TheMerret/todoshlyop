'use client';

import { FC } from 'react';
import { Task, TasksTable } from '../tasksTable';
import axios from 'axios';
import { useAuthStore } from '@/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface PersonalTasksResponse {
  body: {
    detail?: string;
    content: {
      tasks: { results: Task[] };
    };
  };
}

async function getTasks(token: string): Promise<PersonalTasksResponse> {
  const response = await axios.get('http://25.59.7.150:8000/tasks?page=1', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

async function checkTask(
  { taskId, state }: { taskId: number; state: boolean },
  token: string
): Promise<PersonalTasksResponse> {
  const response = await axios.put(
    `http://25.59.7.150:8000/tasks/${taskId}?task_status=${
      state ? 'done' : 'open'
    }&title=tmp`,
    undefined,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
}

export const PersonalTasksTable: FC = function () {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);
  const query = useQuery({
    queryFn: () => (token ? getTasks(token) : null),
    queryKey: ['tasks'],
  });
  const mutation = useMutation({
    mutationFn: (data: { taskId: number; state: boolean }) =>
      checkTask(data, token ?? ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: () => {
      // Handle error case
    },
  });
  const checkCallback = (data: { taskId: number; state: boolean }) => {
    mutation.mutate(data);
  };

  return (
    <TasksTable
      tasks={query.data?.body.content.tasks.results ?? []}
      checkCallback={(taskId, state) => checkCallback({ taskId, state })}
    ></TasksTable>
  );
};
