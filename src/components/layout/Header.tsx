'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useTheme } from 'next-themes';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const dynamicTextColor = scrolled 
    ? "text-white" 
    : (isDark ? "text-white" : "text-black");

  return (
    <div className="fixed top-0 w-full z-50 flex justify-center px-4 sm:px-6 py-5 pointer-events-none">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'w-full max-w-7xl h-14 sm:h-16 flex items-center justify-between px-4 sm:px-8 transition-all duration-500 pointer-events-auto rounded-full border',
          scrolled 
            ? 'backdrop-blur-2xl bg-black/80 dark:bg-slate-950/80 border-white/10 shadow-2xl' 
            : 'bg-transparent border-transparent shadow-none'
        )}
      >
        <div className="flex-1">
          <Link href="/" className="group flex items-center gap-2 text-xl font-black tracking-tighter">
            <span className={cn("transition-colors duration-300", dynamicTextColor)}>
              Portfolio
            </span>
          </Link>
        </div>

        <nav className="hidden lg:flex flex-1 justify-center items-center gap-2">
          <LayoutGroup>
            {navLinks.map((link) => {
              const active = pathname === link.href;
              const hoverPill = scrolled ? "bg-white/10" : (isDark ? "bg-white/20" : "bg-black/10");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-5 py-2 text-sm font-bold tracking-tight transition-all duration-300 rounded-full group',
                    active 
                      ? 'text-purple-400' 
                      : cn("transition-colors duration-300 hover:text-white", dynamicTextColor)
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  {active && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-purple-500/20 rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {!active && (
                    <div className={cn(
                      "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 -z-10 shadow-sm",
                      hoverPill
                    )} />
                  )}
                </Link>
              );
            })}
          </LayoutGroup>
        </nav>

        <div className="flex-1 flex items-center justify-end gap-2 sm:gap-4">
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={cn(
              "p-2.5 rounded-full transition-all duration-300",
              scrolled ? "hover:bg-white/10 text-white" : (isDark ? "hover:bg-white/10 text-yellow-400" : "hover:bg-black/5 text-black")
            )}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            href="/contact"
            className={cn(
              "group hidden lg:inline-flex items-center gap-2 px-6 py-2.5 text-xs font-black uppercase tracking-widest rounded-full transition-all active:scale-95 shadow-lg",
              scrolled 
                ? "bg-white text-black hover:bg-gray-200" 
                : (isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-neutral-800")
            )}
          >
            Hire Me
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <button
            className={cn("lg:hidden p-2 rounded-xl transition-colors", dynamicTextColor)}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 pointer-events-auto lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="fixed top-24 left-6 right-6 lg:hidden pointer-events-auto z-50"
            >
              <div className="rounded-[2rem] backdrop-blur-3xl bg-slate-900 border border-white/10 shadow-2xl p-6">
                <nav className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'px-6 py-4 rounded-2xl text-lg font-bold transition-all',
                        pathname === link.href 
                          ? 'bg-purple-600 text-white shadow-lg' 
                          : 'text-gray-300 hover:bg-white/5'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="mt-4 px-6 py-5 rounded-2xl text-lg font-black text-center uppercase tracking-widest bg-white text-black hover:bg-gray-100 transition-all"
                  >
                    Start Project
                  </Link>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}