"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import EnhancedThemeToggle from './EnhancedThemeToggle';
import LanguageToggle from './LanguageToggle';
import MobileNavigation from './MobileNavigation';
import { Menu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const navItems = [
  { href: '/', labelKey: 'home' as const },
  { href: '/projects', labelKey: 'projects' as const },
  { href: '/blog', labelKey: 'blog' as const },
  { href: '/about', labelKey: 'about' as const },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold gradient-text">VRM</span>
          <span className="hidden sm:inline text-sm text-muted-foreground">
            Vicente Rivas Monferrer
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'nav-link',
                    pathname === item.href && 'active'
                  )}
                >
                  {t.nav[item.labelKey]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side actions */}
        <div className="ml-auto flex items-center space-x-2">
          <LanguageToggle />
          <EnhancedThemeToggle />

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Component */}
      <MobileNavigation
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </header>
  );
}