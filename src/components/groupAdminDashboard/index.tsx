import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { FC } from 'react';

const users = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    tasks: 5,
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    tasks: 3,
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    tasks: 7,
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 4,
    name: 'Diana Ross',
    email: 'diana@example.com',
    tasks: 2,
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 5,
    name: 'Ethan Hunt',
    email: 'ethan@example.com',
    tasks: 6,
    avatar: '/placeholder.svg?height=40&width=40',
  },
];

export const GroupAdminDashboard: FC = function () {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="space-y-1">
          <h4 className="text-lg font-medium leading-none">Информация</h4>
        </div>
        <Separator className="my-4" />
        <div>
          <div className="flex flex-row justify-between w-80">
            <span className="text-sm font-semibold">Админ</span>
            <span className="text-sm text-muted-foreground">A</span>
          </div>
          <div className="flex flex-row justify-between w-80">
            <span className="text-sm font-semibold">
              Количество участников
            </span>
            <span className="text-sm text-muted-foreground">15</span>
          </div>
        </div>
      </div>
      <div>
        <div className="space-y-1">
          <h4 className="text-lg font-medium leading-none">Участники</h4>
        </div>
        <Separator className="my-4" />
        <div className="w-80 bg-white rounded-lg overflow-hidden">
          <ul className="">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex items-center justify-between py-4 px-1 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 text-sm font-semibold text-gray-500">
                  {user.tasks} tasks
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
