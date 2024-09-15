import { FunctionComponent } from 'react';
import Link from 'next/link';
import { ProfileMenu } from '@/components/profileMenu';

export const MainNavbar: FunctionComponent = () => {
  return (
    <div className="p-5 border-b-2">
      <nav className="flex flex-row justify-between">
        <Link href="/home">
          <span className="text-3xl font-semibold">Тудушлёп</span>
        </Link>
        <ProfileMenu></ProfileMenu>
      </nav>
    </div>
  );
};
