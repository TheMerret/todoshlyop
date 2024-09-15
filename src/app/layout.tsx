import './globals.css';
import { QueryProvider } from '@/contexts/query-provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <QueryProvider>
        <body>{children}</body>
      </QueryProvider>
    </html>
  );
}
