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
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MoreVertical, Plus } from 'lucide-react';
import Link from 'next/link';

const workspaces = [
  {
    id: 1,
    name: 'Группа 1',
    description: 'Задача 1',
  },
  {
    id: 2,
    name: 'Группа 2',
    description: (
      <>
        <p>задача 1</p>
        <p>задача 2</p>
      </>
    ),
  },
  {
    id: 3,
    name: 'Группа 3',
    description: 'Задача 3',
  },
];

export const GroupsMenu: FC = function () {
  return (
    <div className="flex flex-wrap gap-4">
      {workspaces.map((workspace) => (
        <Link
          href={`groups/${workspace.id}`}
          key={workspace.id}
          className="w-80"
        >
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
            <CardContent>{workspace.description}</CardContent>
          </Card>
        </Link>
      ))}
      <Card className="w-80 flex items-center justify-center cursor-pointer transition-all hover:shadow-md">
        <Plus className="h-12 w-12 text-muted-foreground" />
      </Card>
    </div>
  );
};
