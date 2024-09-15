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
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useAuthStore } from '@/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SERVER_IP } from '@/app/config';

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
}

async function loginRequest(data: LoginFormData): Promise<LoginResponse> {
  const params = new URLSearchParams();
  params.append('username', data.username);
  params.append('password', data.password);
  const response = await axios.post(`${SERVER_IP}/auth/login?`, params);
  return response.data;
}

export function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const [, setError] = useState('');
  const setToken = useAuthStore((state) => state.setToken); // Zustand setter
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      // Handle successful login
      setToken(data.access_token);
      router.push('/home');
    },
    onError: () => {
      // Handle error case
      setError('Invalid login credentials');
    },
  });
  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
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
            <Label htmlFor="username">Email</Label>
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
