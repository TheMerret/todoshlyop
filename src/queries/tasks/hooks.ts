import { AxiosRequestConfig } from 'axios';
import { withAuthToken } from '../auth/utils';
import { useMutation } from '@tanstack/react-query';
import {
  CreateTaskTasksCreateTaskPostParams,
  TaskForm,
} from '../api.schemas';
import { queryKeys } from '../keys';
import { createTaskTasksCreateTaskPost } from './tasks';

export const useCreateTask = withAuthToken(function useInner(
  params?: CreateTaskTasksCreateTaskPostParams,
  options?: AxiosRequestConfig
) {
  return useMutation({
    mutationKey: queryKeys.tasks._def,
    mutationFn: (form: TaskForm) => createTaskTasksCreateTaskPost(form, params, options),
  });
});
