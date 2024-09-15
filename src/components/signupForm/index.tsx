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
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

interface SignUpFormData {
  email: string;
  username: string;
  password: string;
  repeat_password: string;
}

interface SignUpResponse {
  access_token: string;
  token_type: string;
}

async function signUpRequest(data: SignUpFormData): Promise<SignUpResponse> {
  const params = new URLSearchParams();
  params.append('email', data.email);
  params.append('username', data.username);
  params.append('password', data.password);
  params.append('repeat_password', data.repeat_password);
  const response = await axios.post(
    'http://25.59.7.150:8000/auth/register?',
    params
  );
  return response.data;
}

export function SignUpForm() {
  const { register, handleSubmit } = useForm<SignUpFormData>();
  const [, setError] = useState('');
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: signUpRequest,
    onSuccess: () => {
      // Handle successful login
      router.push('/login');
    },
    onError: () => {
      // Handle error case
      setError('Invalid login credentials');
    },
  });
  const onSubmit = (data: SignUpFormData) => {
    mutation.mutate(data);
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
