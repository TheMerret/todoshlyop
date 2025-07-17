import { mergeQueryKeys } from '@lukemorales/query-key-factory';
import { users } from './users/keys';
import { tasks } from './tasks/keys';

export const queryKeys = mergeQueryKeys(users, tasks);
