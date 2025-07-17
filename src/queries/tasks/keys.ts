import { createQueryKeys } from '@lukemorales/query-key-factory';
import { AxiosRequestConfig } from 'axios';
import { getPersonalTasksTasksGet } from './tasks';
import { GetPersonalTasksTasksGetParams } from '../api.schemas';

export const tasks = createQueryKeys('tasks', {
  personal: (
    params: GetPersonalTasksTasksGetParams,
    options?: AxiosRequestConfig
  ) => ({
    queryKey: ['session', 'tasks', params.page],
    queryFn: () => getPersonalTasksTasksGet(params, options),
  }),
});
