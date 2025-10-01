"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/types/blog';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

const categoryColors: Record<string, string> = {
  devops: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  ai: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  architecture: 'bg-green-500/10 text-green-600 dark:text-green-400',
  automation: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  backend: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  mindfulness: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  learning: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
};

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const { locale } = useLanguage();

  const title = locale === 'es' ? post.title.es : post.title.en;
  const excerpt = locale === 'es' ? post.excerpt.es : post.excerpt.en;

  const formattedDate = new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(post.date));

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group h-full"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="h-full rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${categoryColors[post.category]}`}>
                {post.category.toUpperCase()}
              </span>
              {post.featured && (
                <span className="text-xs font-medium text-primary">
                  ★ Featured
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{post.readTime} min</span>
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-muted/50 text-muted-foreground"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-1 text-xs rounded bg-muted/50 text-muted-foreground">
                +{post.tags.length - 3}
              </span>
            )}
          </div>

          {/* Read more */}
          <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
            <span>{locale === 'es' ? 'Leer más' : 'Read more'}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
