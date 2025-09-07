'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wand2 } from 'lucide-react';
import { ThemeToggleButton } from './ThemeToggleButton';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/#features' },
    { label: 'How it works', href: '/how-it-works' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-blue-600" />
          <span className="hidden font-bold sm:inline">JobMatch AI</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-foreground/90 ${
                pathname === link.href ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggleButton />
          <Button asChild>
            <Link href="/analyze">
              Analyze Resume
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}