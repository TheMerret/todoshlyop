import { MainNavbar } from '@/components/mainNavbar';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-3">
      <header>
        <MainNavbar />
      </header>
      <main>
        <div className="p-5">{children}</div>
      </main>
    </div>
  );
}
