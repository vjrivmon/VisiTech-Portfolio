"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/lib/types/portfolio';
import { cn } from '@/lib/utils';
import { ExternalLink, Github, Star, GitFork, Calendar, Code2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface EnhancedProjectCardProps {
  project: Project;
  index?: number;
}

export default function EnhancedProjectCard({ project, index = 0 }: EnhancedProjectCardProps) {
  const { t } = useLanguage();

  const categoryConfig: Record<string, { gradient: string; icon: string; bgColor: string }> = {
    'ai-robotics': {
      gradient: 'from-blue-500 via-cyan-500 to-blue-600',
      icon: '🤖',
      bgColor: 'bg-blue-500/10'
    },
    'iot': {
      gradient: 'from-green-500 via-emerald-500 to-green-600',
      icon: '📡',
      bgColor: 'bg-green-500/10'
    },
    'web': {
      gradient: 'from-orange-500 via-amber-500 to-orange-600',
      icon: '🌐',
      bgColor: 'bg-orange-500/10'
    },
    'tools': {
      gradient: 'from-purple-500 via-violet-500 to-purple-600',
      icon: '🛠️',
      bgColor: 'bg-purple-500/10'
    },
    'saas': {
      gradient: 'from-indigo-500 via-blue-500 to-indigo-600',
      icon: '☁️',
      bgColor: 'bg-indigo-500/10'
    },
    'academic': {
      gradient: 'from-red-500 via-pink-500 to-red-600',
      icon: '🎓',
      bgColor: 'bg-red-500/10'
    },
  };

  const config = categoryConfig[project.category] || {
    gradient: 'from-gray-500 via-slate-500 to-gray-600',
    icon: '📦',
    bgColor: 'bg-gray-500/10'
  };

  const getLanguageColor = (color: string) => {
    // Mejora de contraste para colores problemáticos como el amarillo
    const colorMap: Record<string, string> = {
      '#f1e05a': '#d4af37', // JavaScript yellow -> gold
      '#e34c26': '#ff6b35', // HTML -> brighter orange
      '#563d7c': '#7952b3', // CSS -> brighter purple
    };
    return colorMap[color] || color;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="group relative h-full"
    >
      {/* Main card */}
      <div className="relative h-full rounded-lg border border-border bg-card overflow-hidden transition-all duration-300 group-hover:border-primary/30">

        {/* Content */}
        <div className="p-5 flex flex-col h-full">
          {/* Header */}
          <div className="mb-3">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-base font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                {project.displayName}
              </h3>
              {project.featured && (
                <Star className="h-3.5 w-3.5 fill-primary text-primary flex-shrink-0" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {t.categories[project.category]}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground/80 line-clamp-2 mb-4 flex-grow">
            {project.description || 'No description available'}
          </p>

          {/* Tech Stack */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-1.5">
              {project.languages.slice(0, 2).map((lang) => (
                <span
                  key={lang.name}
                  className="px-2 py-0.5 text-xs rounded bg-muted/50 text-muted-foreground"
                >
                  {lang.name}
                </span>
              ))}
              {project.languages.length > 2 && (
                <span className="px-2 py-0.5 text-xs rounded bg-muted/50 text-muted-foreground">
                  +{project.languages.length - 2}
                </span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 mt-auto border-t border-border/50">
            {/* Year only */}
            <span className="text-xs text-muted-foreground">
              {new Date(project.updatedAt).getFullYear()}
            </span>

            {/* Action buttons */}
            <div className="flex items-center gap-1.5">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center p-1.5 rounded hover:bg-muted transition-colors"
                aria-label="View on GitHub"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
              <Link
                href={`/projects/${project.id}`}
                className="flex items-center justify-center p-1.5 rounded hover:bg-muted transition-colors"
                aria-label="View details"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
