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
  status: 'all' | 'active' | 'completed' | 'paused' | 'archived';
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
      project.techStack?.forEach(tech => techs.add(tech.name));
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
        { name: 'displayName', weight: 0.4 },
        { name: 'description', weight: 0.3 },
        { name: 'techStack.name', weight: 0.2 },
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
        project.techStack?.some(tech =>
          filters.technologies.includes(tech.name)
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
          comparison = a.displayName.localeCompare(b.displayName);
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
                      {category.replace('-', ' ')}
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
                  {(['all', 'active', 'completed', 'paused', 'archived'] as const).map(status => (
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
              label={`Category: ${cat.replace('-', ' ')}`}
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