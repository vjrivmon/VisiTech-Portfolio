# Component Specifications - Portfolio Improvements

**Document Version**: 1.0.0
**Created Date**: 2025-10-01
**Purpose**: Detailed technical specifications for new and modified components

---

## Critical Components (Phase 1)

### 1. MobileNavigation Component

**File**: `/components/layout/MobileNavigation.tsx`

```typescript
"use client";

import { useState, useEffect } from 'react';
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
```

**Usage in Header.tsx**:
```typescript
import MobileNavigation from './MobileNavigation';
import { Menu } from 'lucide-react';

// In Header component
<>
  <button
    onClick={() => setIsOpen(true)}
    className="md:hidden p-2 rounded-md hover:bg-accent"
    aria-label="Open menu"
  >
    <Menu className="h-6 w-6" />
  </button>

  <MobileNavigation
    isOpen={isOpen}
    onOpenChange={setIsOpen}
  />
</>
```

---

### 2. Enhanced Theme Toggle Component

**File**: `/components/layout/EnhancedThemeToggle.tsx`

```typescript
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
```

---

### 3. Project Filter System

**File**: `/components/projects/ProjectFilter.tsx`

```typescript
"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { cn } from '@/lib/utils/cn';
import { Project } from '@/lib/types/portfolio';

interface ProjectFilterProps {
  projects: Project[];
  onFilteredProjectsChange: (filtered: Project[]) => void;
}

interface FilterState {
  search: string;
  categories: string[];
  technologies: string[];
  status: 'all' | 'active' | 'completed' | 'archived';
  sortBy: 'date' | 'stars' | 'name' | 'updated';
  sortOrder: 'asc' | 'desc';
}

const initialFilterState: FilterState = {
  search: '',
  categories: [],
  technologies: [],
  status: 'all',
  sortBy: 'date',
  sortOrder: 'desc'
};

export default function ProjectFilter({
  projects,
  onFilteredProjectsChange
}: ProjectFilterProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Extract unique categories and technologies
  const { categories, technologies } = useMemo(() => {
    const cats = new Set<string>();
    const techs = new Set<string>();

    projects.forEach(project => {
      if (project.category) cats.add(project.category);
      project.technologies?.forEach(tech => techs.add(tech));
    });

    return {
      categories: Array.from(cats).sort(),
      technologies: Array.from(techs).sort()
    };
  }, [projects]);

  // Setup Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(projects, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'description', weight: 0.3 },
        { name: 'technologies', weight: 0.2 },
        { name: 'category', weight: 0.1 }
      ],
      threshold: 0.4,
      includeScore: true
    });
  }, [projects]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters.search]);

  // Apply all filters
  const applyFilters = useCallback(() => {
    let filtered = [...projects];

    // Search filter
    if (debouncedSearch) {
      const searchResults = fuse.search(debouncedSearch);
      filtered = searchResults.map(result => result.item);
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(project =>
        filters.categories.includes(project.category || '')
      );
    }

    // Technology filter
    if (filters.technologies.length > 0) {
      filtered = filtered.filter(project =>
        project.technologies?.some(tech =>
          filters.technologies.includes(tech)
        )
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(project =>
        project.status === filters.status
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case 'date':
          comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          break;
        case 'updated':
          comparison = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
          break;
        case 'stars':
          comparison = (b.stars || 0) - (a.stars || 0);
          break;
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
      }

      return filters.sortOrder === 'asc' ? -comparison : comparison;
    });

    onFilteredProjectsChange(filtered);
  }, [
    projects,
    debouncedSearch,
    filters,
    fuse,
    onFilteredProjectsChange
  ]);

  // Apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (
    key: 'categories' | 'technologies',
    value: string
  ) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value]
    }));
  };

  const clearFilters = () => {
    setFilters(initialFilterState);
  };

  const activeFilterCount =
    filters.categories.length +
    filters.technologies.length +
    (filters.status !== 'all' ? 1 : 0) +
    (filters.search ? 1 : 0);

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          placeholder="Search projects..."
          className={cn(
            "w-full pl-10 pr-10 py-2 rounded-lg border bg-background",
            "focus:outline-none focus:ring-2 focus:ring-ring",
            "placeholder:text-muted-foreground"
          )}
        />
        {filters.search && (
          <button
            onClick={() => updateFilter('search', '')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter Toggle & Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg border",
            "hover:bg-accent transition-colors",
            activeFilterCount > 0 && "border-primary bg-primary/10"
          )}
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isFilterOpen && "rotate-180"
            )}
          />
        </button>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value as any)}
            className="px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="date">Date Created</option>
            <option value="updated">Last Updated</option>
            <option value="stars">Stars</option>
            <option value="name">Name</option>
          </select>

          <button
            onClick={() => updateFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-2 rounded-lg border hover:bg-accent transition-colors"
            aria-label={`Sort ${filters.sortOrder === 'asc' ? 'descending' : 'ascending'}`}
          >
            {filters.sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Expandable Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 rounded-lg border bg-card space-y-4">
              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => toggleArrayFilter('categories', category)}
                      className={cn(
                        "px-3 py-1 text-sm rounded-full border transition-colors",
                        filters.categories.includes(category)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "hover:bg-accent"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technology Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.slice(0, 20).map(tech => (
                    <button
                      key={tech}
                      onClick={() => toggleArrayFilter('technologies', tech)}
                      className={cn(
                        "px-3 py-1 text-sm rounded-full border transition-colors",
                        filters.technologies.includes(tech)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "hover:bg-accent"
                      )}
                    >
                      {tech}
                    </button>
                  ))}
                  {technologies.length > 20 && (
                    <span className="px-3 py-1 text-sm text-muted-foreground">
                      +{technologies.length - 20} more
                    </span>
                  )}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2">Status</h3>
                <div className="flex gap-2">
                  {(['all', 'active', 'completed', 'archived'] as const).map(status => (
                    <button
                      key={status}
                      onClick={() => updateFilter('status', status)}
                      className={cn(
                        "px-3 py-1 text-sm rounded-full border transition-colors capitalize",
                        filters.status === status
                          ? "bg-primary text-primary-foreground border-primary"
                          : "hover:bg-accent"
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filter Tags */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <FilterTag
              label={`Search: ${filters.search}`}
              onRemove={() => updateFilter('search', '')}
            />
          )}
          {filters.categories.map(cat => (
            <FilterTag
              key={cat}
              label={`Category: ${cat}`}
              onRemove={() => toggleArrayFilter('categories', cat)}
            />
          ))}
          {filters.technologies.map(tech => (
            <FilterTag
              key={tech}
              label={`Tech: ${tech}`}
              onRemove={() => toggleArrayFilter('technologies', tech)}
            />
          ))}
          {filters.status !== 'all' && (
            <FilterTag
              label={`Status: ${filters.status}`}
              onRemove={() => updateFilter('status', 'all')}
            />
          )}
        </div>
      )}
    </div>
  );
}

// Filter Tag Component
function FilterTag({
  label,
  onRemove
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-secondary"
    >
      {label}
      <button
        onClick={onRemove}
        className="ml-1 p-0.5 hover:bg-accent rounded-full"
        aria-label={`Remove ${label} filter`}
      >
        <X className="h-3 w-3" />
      </button>
    </motion.span>
  );
}
```

---

## Implementation Instructions

### Step 1: Install Dependencies

```bash
# Required packages
npm install fuse.js @radix-ui/react-dialog
npm install -D @types/fuse.js

# Verify existing packages
# framer-motion - already installed
# lucide-react - already installed
# next-themes - already installed
```

### Step 2: Update Header Component

Replace the mobile menu button section in `/components/layout/Header.tsx`:

```typescript
// Import at top
import MobileNavigation from './MobileNavigation';
import EnhancedThemeToggle from './EnhancedThemeToggle';
import { Menu } from 'lucide-react';

// Replace ThemeToggle import with EnhancedThemeToggle
// Replace the mobile menu button and dropdown with:

{/* Right side actions */}
<div className="ml-auto flex items-center space-x-4">
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

{/* Add Mobile Navigation Component */}
<MobileNavigation
  isOpen={isOpen}
  onOpenChange={setIsOpen}
/>

{/* Remove the existing mobile menu dropdown */}
```

### Step 3: Update Projects Page

Transform `/app/projects/page.tsx` to client component with filters:

```typescript
"use client";

import { useState } from 'react';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectFilter from '@/components/projects/ProjectFilter';
import ProjectGridSkeleton from '@/components/projects/ProjectGridSkeleton';
import { Project } from '@/lib/types/portfolio';

interface ProjectsPageProps {
  initialProjects: Project[];
}

export default function ProjectsPage({ initialProjects }: ProjectsPageProps) {
  const [filteredProjects, setFilteredProjects] = useState(initialProjects);

  return (
    <div className="min-h-screen">
      <section className="section">
        <div className="section-container">
          {/* Header content */}

          {/* Add Filter Component */}
          <ProjectFilter
            projects={initialProjects}
            onFilteredProjectsChange={setFilteredProjects}
          />

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState message="No projects match your filters" />
          )}
        </div>
      </section>
    </div>
  );
}
```

---

## Testing Checklist

### Mobile Navigation
- [ ] Opens smoothly with animation
- [ ] Closes on outside click
- [ ] Closes on Escape key
- [ ] Body scroll locked when open
- [ ] All navigation links work
- [ ] Social links open in new tab
- [ ] Focus management correct
- [ ] Accessible with screen reader

### Theme Toggle
- [ ] Icons render correctly
- [ ] Smooth transition between themes
- [ ] System theme detection works
- [ ] Theme persists on reload
- [ ] No flash of incorrect theme
- [ ] Accessible labels present

### Project Filter
- [ ] Search works with debouncing
- [ ] Categories filter correctly
- [ ] Technologies filter correctly
- [ ] Status filter works
- [ ] Sort functionality works
- [ ] Clear filters works
- [ ] Filter tags display correctly
- [ ] No performance issues with many projects
- [ ] Responsive on mobile

---

## Performance Considerations

1. **Mobile Navigation**
   - Use CSS transform for better performance
   - Lazy load social icons if needed
   - Minimize re-renders with React.memo

2. **Theme Toggle**
   - Prevent flash with proper SSR handling
   - Use CSS variables for instant theme switching
   - Minimize JavaScript execution

3. **Project Filter**
   - Debounce search input (300ms)
   - Memoize expensive computations
   - Virtual scrolling for large lists
   - Lazy load filter options

---

## Accessibility Requirements

1. **WCAG 2.1 AA Compliance**
   - Focus indicators visible
   - Keyboard navigation complete
   - ARIA labels present
   - Screen reader compatible

2. **Mobile Navigation**
   - Focus trap when open
   - Escape key to close
   - Announce state changes

3. **Theme Toggle**
   - Clear indication of current theme
   - Keyboard accessible
   - Screen reader announces changes

4. **Filter System**
   - Form controls properly labeled
   - Filter state announced
   - Clear visual feedback

---

**Document Complete**
Ready for implementation by the executor.