import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/data/blog';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post no encontrado',
    };
  }

  return {
    title: `${post.title.es} | Blog - Vicente Rivas`,
    description: post.excerpt.es,
    keywords: post.tags,
    openGraph: {
      title: post.title.es,
      description: post.excerpt.es,
      type: 'article',
      publishedTime: post.date,
      authors: ['Vicente Rivas Monferrer'],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Por ahora usamos español, más tarde podemos usar el contexto de idioma
  const locale = 'es';
  const title = locale === 'es' ? post.title.es : post.title.en;
  const subtitle = locale === 'es' ? post.subtitle.es : post.subtitle.en;
  const content = locale === 'es' ? post.content.es : post.content.en;

  const formattedDate = new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(post.date));

  return (
    <div className="min-h-screen">
      <article className="section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                {post.category.toUpperCase()}
              </span>
              {post.featured && (
                <span className="text-xs font-medium text-primary">
                  ★ Destacado
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              {subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min de lectura</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-muted/50 text-muted-foreground"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al blog
              </Link>

              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Compartir:</span>
                <div className="flex gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(`https://vicentrivas.dev/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-border hover:bg-accent transition-colors"
                    aria-label="Compartir en Twitter"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://vicentrivas.dev/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-border hover:bg-accent transition-colors"
                    aria-label="Compartir en LinkedIn"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
}
