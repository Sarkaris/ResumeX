'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wand2, Menu, X } from 'lucide-react';
import { ThemeToggleButton } from './ThemeToggleButton';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils'; // clsx wrapper (or use clsx directly)

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
          {/* Logo – always visible */}
          <Link href="/" className="flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-blue-600" />
            <span className="hidden font-bold sm:inline">ResumeX</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-foreground/90',
                  pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions – always visible */}
          <div className="flex items-center gap-2">
            <ThemeToggleButton />
            {/* Mobile Hamburger */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            {/* Desktop CTA */}
            <Button asChild className="hidden md:inline-flex">
              <Link href="/analyze">
                Analyze Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ===== Mobile Drawer ===== */}
      <div
        className={cn(
          'fixed inset-0 z-50 md:hidden',
          open ? 'block' : 'hidden'
        )}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
        {/* Sheet */}
        <div className="absolute right-0 top-0 h-full w-full max-w-xs bg-background shadow-2xl">
          <div className="flex h-16 items-center justify-between px-4">
            <span className="font-bold">Menu</span>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex flex-col gap-4 px-4 pt-4 text-lg font-medium">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 transition-colors',
                  pathname === link.href
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
                style={{ animation: `slideIn 0.3s ease forwards`, animationDelay: `${i * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="mt-auto p-4">
            <Button asChild className="w-full" onClick={() => setOpen(false)}>
              <Link href="/analyze">
                Analyze Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* ===== Animations ===== */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}