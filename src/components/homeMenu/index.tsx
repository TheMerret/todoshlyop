'use client';

import { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MoreVertical } from 'lucide-react';
import Link from 'next/link';

const workspaces = [
  {
    id: 1,
    name: 'Персональные',
    description: 'Main development workspace',
    href: '/personal',
  },
  {
    id: 2,
    name: 'Мои группы',
    description: 'Workspace for Q4 marketing initiatives',
    href: '/groups',
  },
  {
    id: 3,
    name: 'Аналитика',
    description: 'Employee management and onboarding',
    href: '/analytics',
  },
];

export const HomeMenu: FC = function () {
  return (
    <div className="flex flex-wrap gap-4">
      {workspaces.map((workspace) => (
        <Link href={workspace.href} key={workspace.id} className="w-80">
          <Card className="h-full transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                {workspace.name}
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="focus:outline-none"
                  onClick={(e) => e.preventDefault()} // Prevent triggering the Link
                >
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <CardDescription>{workspace.description}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
