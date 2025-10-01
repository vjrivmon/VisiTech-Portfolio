"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Home,
  FolderOpen,
  User,
  Github,
  Linkedin,
  Mail
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface MobileNavigationProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/projects', label: 'Projects', icon: FolderOpen },
  { href: '/about', label: 'About', icon: User },
];

const socialLinks = [
  { href: 'https://github.com/vjrivmon', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/vicente-rivas-monferrer', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:vicenterivasmonferrer12@gmail.com', icon: Mail, label: 'Email' },
];

export default function MobileNavigation({ isOpen, onOpenChange }: MobileNavigationProps) {
  const pathname = usePathname();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onOpenChange(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onOpenChange]);

  const drawerVariants = {
    closed: { x: '100%' },
    open: { x: 0 }
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/50 md:hidden"
            onClick={() => onOpenChange(false)}
          />

          {/* Drawer */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={drawerVariants}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-[280px] bg-background border-l md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <span className="text-lg font-semibold">Menu</span>
                <button
                  onClick={() => onOpenChange(false)}
                  className="p-2 rounded-md hover:bg-accent"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4">
                <ul className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => onOpenChange(false)}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                          'hover:bg-accent hover:text-accent-foreground',
                          pathname === item.href && 'bg-accent font-medium'
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Social Links */}
              <div className="p-4 border-t">
                <p className="text-sm text-muted-foreground mb-3">Connect</p>
                <div className="flex gap-2">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="p-2 rounded-md hover:bg-accent transition-colors"
                      aria-label={link.label}
                    >
                      <link.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}