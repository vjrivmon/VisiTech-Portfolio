"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ThemeToggleProps {
  variant?: 'icon' | 'switch' | 'dropdown';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function EnhancedThemeToggle({
  variant = 'icon',
  showLabel = false,
  size = 'md'
}: ThemeToggleProps) {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const buttonSizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5'
  };

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    exit: { scale: 0, rotate: 180 }
  };

  if (!mounted) {
    // Skeleton while loading
    return (
      <div
        className={cn(
          "rounded-md bg-muted animate-pulse",
          buttonSizeClasses[size]
        )}
        style={{ width: size === 'sm' ? 28 : size === 'md' ? 36 : 44 }}
      />
    );
  }

  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleThemeChange}
        className={cn(
          "relative rounded-md hover:bg-accent transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          buttonSizeClasses[size]
        )}
        aria-label={`Current theme: ${theme}. Click to change`}
      >
        <motion.div
          key={currentTheme}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={iconVariants}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        >
          {currentTheme === 'dark' ? (
            <Moon className={sizeClasses[size]} />
          ) : currentTheme === 'light' ? (
            <Sun className={sizeClasses[size]} />
          ) : (
            <Monitor className={sizeClasses[size]} />
          )}
        </motion.div>

        {showLabel && (
          <span className="ml-2 text-sm capitalize">{theme}</span>
        )}
      </button>
    );
  }

  if (variant === 'switch') {
    return (
      <div className="flex items-center gap-2">
        <Sun className={cn(sizeClasses[size], "text-muted-foreground")} />
        <button
          role="switch"
          aria-checked={currentTheme === 'dark'}
          onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
          className={cn(
            "relative inline-flex h-6 w-11 items-center rounded-full",
            "bg-muted transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            currentTheme === 'dark' && "bg-primary"
          )}
        >
          <motion.span
            layout
            className="inline-block h-4 w-4 transform rounded-full bg-background shadow-lg"
            animate={{ x: currentTheme === 'dark' ? 24 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
        <Moon className={cn(sizeClasses[size], "text-muted-foreground")} />
      </div>
    );
  }

  // Dropdown variant
  return (
    <div className="relative">
      <button
        onClick={() => {/* Toggle dropdown */}}
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-2",
          "hover:bg-accent transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        {currentTheme === 'dark' ? (
          <Moon className={sizeClasses[size]} />
        ) : currentTheme === 'light' ? (
          <Sun className={sizeClasses[size]} />
        ) : (
          <Monitor className={sizeClasses[size]} />
        )}
        <span className="text-sm capitalize">{theme}</span>
      </button>

      {/* Dropdown menu would go here */}
    </div>
  );
}