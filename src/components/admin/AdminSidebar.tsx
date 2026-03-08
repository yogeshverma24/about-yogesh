'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Store,
  Package,
  ShoppingBag,
  DollarSign,
  Megaphone,
  BarChart3,
  Settings,
} from 'lucide-react';

const adminNav = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/vendors', label: 'Vendors', icon: Store },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/finance', label: 'Finance', icon: DollarSign },
  { href: '/admin/promotions', label: 'Promotions', icon: Megaphone },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white shrink-0 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#f97316] flex items-center justify-center text-white font-bold">
            A
          </div>
          <span className="font-bold">Admin Panel</span>
        </Link>
      </div>
      <nav className="p-2 flex-1 overflow-auto">
        {adminNav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                active
                  ? 'bg-[#f97316] text-white font-medium'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <Link href="/" className="text-sm text-gray-400 hover:text-white">
          ← Back to Marketplace
        </Link>
      </div>
    </aside>
  );
}
