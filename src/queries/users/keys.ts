import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  getUserImageUsersMediaUserIdGet,
  getUserUsersUserIdGet,
  whoamiUsersWhoamiGet,
} from './users';
import { AxiosRequestConfig } from 'axios';

export const users = createQueryKeys('users', {
  whoami: (options?: AxiosRequestConfig) => ({
    queryKey: ['session'],
    queryFn: () => whoamiUsersWhoamiGet(options),
  }),
  user: (userId: number) => ({
    queryKey: ['session', userId],
    queryFn: () => getUserUsersUserIdGet(userId),
  }),
  userImage: (userId: number) => ({
    queryKey: ['session', userId, 'session-image'],
    queryFn: () => getUserImageUsersMediaUserIdGet(userId),
  }),
});
