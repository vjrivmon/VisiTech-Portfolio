import { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/data/blog';
import BlogCard from '@/components/blog/BlogCard';

export const metadata: Metadata = {
  title: 'Blog - Vicente Rivas Monferrer',
  description: 'Artículos sobre DevOps, IA, arquitectura de software, automatización y desarrollo backend. Reflexiones técnicas y mejores prácticas de un Full Stack Developer.',
  keywords: [
    'Blog Desarrollo',
    'DevOps Blog',
    'IA y Machine Learning',
    'Arquitectura Software',
    'Docker y Kubernetes',
    'Automatización',
    'Backend Development',
    'Microservicios',
    'Prompt Engineering',
    'Best Practices'
  ],
  openGraph: {
    title: 'Blog | Vicente Rivas Portfolio',
    description: 'Artículos técnicos sobre DevOps, IA, arquitectura de software y desarrollo backend',
    url: 'https://vicentrivas.dev/blog',
    type: 'website',
  },
};

export default async function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen">
      <section className="section">
        <div className="section-container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Reflexiones técnicas, mejores prácticas y lecciones aprendidas en desarrollo de software
            </p>
          </div>

          {/* Featured Posts */}
          {posts.filter(p => p.featured).length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Destacados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts
                  .filter(p => p.featured)
                  .map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                  ))}
              </div>
            </div>
          )}

          {/* All Posts */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Todos los artículos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          </div>

          {/* Empty state si no hay posts */}
          {posts.length === 0 && (
            <div className="text-center py-12 border rounded-lg bg-card">
              <p className="text-muted-foreground">
                Próximamente habrá contenido nuevo. ¡Mantente atento!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
