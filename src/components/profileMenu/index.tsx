'use client';

import { FC } from 'react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/store';

export const ProfileMenu: FC = function () {
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  function logoutCallback() {
    logout();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={'/profile'} legacyBehavior>
          <DropdownMenuItem>Профиль</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        {isLoggedIn ? (
          <DropdownMenuItem onClick={logoutCallback}>Выйти</DropdownMenuItem>
        ) : (
          <Link href={'/login'} legacyBehavior>
            <DropdownMenuItem>Войти</DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
