'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLogin } from '@/queries/auth/hooks';
import { AuthResponse, HTTPRegisterValidationError } from '@/queries/api.schemas';
import { queryKeys } from '@/queries/keys';
import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

interface LoginFormData {
  username: string;
  password: string;
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginFormData>();
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useLogin();
  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data, {
      onSuccess: (resp) => {
        // Handle successful login
        queryClient.setQueryData<AuthResponse>(
          queryKeys.users.whoami().queryKey,
          resp
        );

        router.push('/home');
      },
      onError: (error) => {
        if (isAxiosError<HTTPRegisterValidationError>(error)) {
          setError('root.serverError', {
            message: error.response?.data.detail,
          });
        }
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Войти</CardTitle>
          <CardDescription>Введите свои данные для входа</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              {...register('username')}
              id="username"
              type="text"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              {...register('password')}
              type="password"
              required
            />
          </div>
          <div className="mt-4 text-center text-sm">
            Нет аккаунта?{' '}
            <Link href="/signup" className="underline">
              Зарегистрироваться
            </Link>
          </div>
        </CardContent>
        <CardFooter>
          {errors.root?.serverError?.message !== undefined && (
            <p className="text-rose-600">{errors.root.serverError.message}</p>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Входим...' : 'Войти'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
