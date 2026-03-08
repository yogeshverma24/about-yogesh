'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  FileText,
  BarChart3,
  Settings,
} from 'lucide-react';

const vendorNav = [
  { href: '/vendor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/vendor/products', label: 'Products', icon: Package },
  { href: '/vendor/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/vendor/rfq', label: 'RFQ Inbox', icon: FileText },
  { href: '/vendor/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/vendor/settings', label: 'Settings', icon: Settings },
];

export function VendorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 shrink-0 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Link href="/vendor/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#2563eb] flex items-center justify-center text-white font-bold">
            B
          </div>
          <span className="font-bold">Vendor Panel</span>
        </Link>
      </div>
      <nav className="p-2 flex-1">
        {vendorNav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                active
                  ? 'bg-[#eff6ff] text-[#2563eb] font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-[#2563eb]"
        >
          ← Back to Marketplace
        </Link>
      </div>
    </aside>
  );
}
