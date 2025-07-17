import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from '../keys';
import {
  loadUserImageUsersMediaPost,
  removeUserImageUsersMediaDelete,
} from './users';
import { BodyLoadUserImageUsersMediaPost } from '../api.schemas';
import { AxiosRequestConfig } from 'axios';
import { withAuthToken } from '../auth/utils';

export const useWhoami = withAuthToken(function useWhoami(
  options?: AxiosRequestConfig
) {
  return useQuery({ ...queryKeys.users.whoami(options) });
});

export function useUser(userId: number) {
  return useQuery(queryKeys.users.user(userId));
}

export function useUserImage(userId: number) {
  return useQuery(queryKeys.users.userImage(userId));
}

export function useLoadUserImage(userId: number) {
  return useMutation({
    mutationKey: queryKeys.users.userImage(userId).queryKey,
    mutationFn: (data: BodyLoadUserImageUsersMediaPost) =>
      loadUserImageUsersMediaPost(data),
  });
}

export function useRemoveUserImage(userId: number) {
  return useMutation({
    mutationKey: queryKeys.users.userImage(userId).queryKey,
    mutationFn: () => removeUserImageUsersMediaDelete(),
  });
}
