'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isVendor = pathname?.startsWith('/vendor');
  const isAdmin = pathname?.startsWith('/admin');
  const isToday = pathname?.startsWith('/today');

  if (isVendor || isAdmin || isToday) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
