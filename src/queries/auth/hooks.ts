import { useMutation } from '@tanstack/react-query';
import {
  BodyLoginAuthLoginPost,
  RegisterForm,
  ResetPasswordAuthResetPasswordPostParams,
} from '../api.schemas';
import {
  loginAuthLoginPost,
  registerAuthRegisterPost,
  resetPasswordAuthResetPasswordPost,
  updateTokenAuthUpdateTokenPost,
} from './auth';

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterForm) => registerAuthRegisterPost(data),
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (data: BodyLoginAuthLoginPost) => loginAuthLoginPost(data),
  });
}

export function useUpdateToken() {
  return useMutation({
    mutationFn: () => updateTokenAuthUpdateTokenPost(),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordAuthResetPasswordPostParams) =>
      resetPasswordAuthResetPasswordPost(data),
  });
}
