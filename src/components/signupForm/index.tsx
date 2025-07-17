'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useRegister } from '@/queries/auth/hooks';
import { isAxiosError } from 'axios';
import {
  HTTPRegisterValidationError,
} from '@/queries/api.schemas';

interface SignUpFormData {
  email: string;
  username: string;
  password: string;
  repeat_password: string;
}

export function SignUpForm() {
  // P%ssword1234
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormData>();
  const router = useRouter();
  const mutation = useRegister();
  const onSubmit = (data: SignUpFormData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        // Handle successful login
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
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Зарегистрировать</CardTitle>
          <CardDescription>Введите данные для регистрации</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Никнейм</Label>
              <Input
                {...register('username')}
                id="username"
                placeholder="Robinson"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register('email')}
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Пароль</Label>
              <Input {...register('password')} id="password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="repeat_password">Повторите пароль</Label>
              <Input
                {...register('repeat_password')}
                id="repeat_password"
                type="password"
              />
            </div>
            <Button type="submit" className="w-full">
              Создать аккаунт
            </Button>
            {errors.root?.serverError?.message !== undefined && (
              <p className="text-rose-600">
                {errors.root.serverError.message}
              </p>
            )}
          </div>
          <div className="mt-4 text-center text-sm">
            Уже есть аккаунт?{' '}
            <Link href="/login" className="underline">
              Войти
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
