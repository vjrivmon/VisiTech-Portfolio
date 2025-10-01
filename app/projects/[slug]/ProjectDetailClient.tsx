"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Star, GitFork, Calendar, Code2, Zap, TrendingUp } from 'lucide-react';
import { AnimatedCard } from '@/components/react-bits/animated-card';
import { Project } from '@/lib/types/portfolio';

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const router = useRouter();

  const categoryConfig: Record<string, { solidColor: string; icon: string; bgColor: string }> = {
    'ai-robotics': { solidColor: 'bg-blue-600', icon: '🤖', bgColor: 'bg-blue-500/10' },
    'iot': { solidColor: 'bg-green-600', icon: '📡', bgColor: 'bg-green-500/10' },
    'web': { solidColor: 'bg-orange-600', icon: '🌐', bgColor: 'bg-orange-500/10' },
    'tools': { solidColor: 'bg-purple-600', icon: '🛠️', bgColor: 'bg-purple-500/10' },
    'saas': { solidColor: 'bg-indigo-600', icon: '☁️', bgColor: 'bg-indigo-500/10' },
    'academic': { solidColor: 'bg-red-600', icon: '🎓', bgColor: 'bg-red-500/10' },
  };

  const config = categoryConfig[project.category] || {
    solidColor: 'bg-gray-700',
    icon: '📦',
    bgColor: 'bg-gray-500/10'
  };

  const getLanguageColor = (color: string) => {
    const colorMap: Record<string, string> = {
      '#f1e05a': '#d4af37',
      '#e34c26': '#ff6b35',
      '#563d7c': '#7952b3',
    };
    return colorMap[color] || color;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={cn(
        "relative py-20 overflow-hidden",
        config.solidColor
      )}>
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="section-container relative z-10">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push('/projects')}
            className="inline-flex items-center gap-2 mb-8 text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Volver a Proyectos</span>
          </motion.button>

          <div className="flex items-start gap-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-7xl drop-shadow-2xl"
            >
              {config.icon}
            </motion.div>

            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  {project.displayName}
                </h1>
                <p className="text-xl text-white/90 mb-6 max-w-2xl leading-relaxed">
                  {project.description || 'Un increíble proyecto que demuestra habilidades técnicas avanzadas'}
                </p>

                <div className="flex flex-wrap gap-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Github className="h-5 w-5" />
                    Ver en GitHub
                  </motion.a>

                  {project.homepage && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white font-bold border-2 border-white/30 hover:bg-white/30 transition-all"
                    >
                      <ExternalLink className="h-5 w-5" />
                      Demo en Vivo
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 border-b bg-card/50">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-3xl font-bold">{project.stars}</span>
              </div>
              <p className="text-sm text-muted-foreground">Estrellas</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <GitFork className="h-5 w-5 text-primary" />
                <span className="text-3xl font-bold">{project.forks}</span>
              </div>
              <p className="text-sm text-muted-foreground">Forks</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-accent" />
                <span className="text-3xl font-bold">{new Date(project.updatedAt).getFullYear()}</span>
              </div>
              <p className="text-sm text-muted-foreground">Actualizado</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="text-3xl font-bold capitalize">{project.status}</span>
              </div>
              <p className="text-sm text-muted-foreground">Estado</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="section-container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Technologies - Main column */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatedCard gradient>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Code2 className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">Stack Tecnológico</h2>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {project.languages.map((lang, index) => {
                      const improvedColor = getLanguageColor(lang.color);
                      return (
                        <motion.div
                          key={lang.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.1, y: -4 }}
                          className="px-5 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                          style={{
                            backgroundColor: `${improvedColor}20`,
                            borderWidth: '2px',
                            borderStyle: 'solid',
                            borderColor: `${improvedColor}60`,
                            color: improvedColor,
                          }}
                        >
                          {lang.name}
                          <span className="ml-2 text-sm opacity-70">({lang.percentage}%)</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard gradient delay={0.2}>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="h-6 w-6 text-accent" />
                    <h2 className="text-2xl font-bold">Detalles del Proyecto</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">Categoría</h3>
                      <p className="text-lg font-bold capitalize">{project.category.replace('-', ' ')}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">Estado</h3>
                      <p className="text-lg font-bold capitalize">{project.status}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">Creado</h3>
                      <p className="text-lg font-bold">{new Date(project.createdAt).toLocaleDateString('es-ES')}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">Actualizado</h3>
                      <p className="text-lg font-bold">{new Date(project.updatedAt).toLocaleDateString('es-ES')}</p>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info Card */}
              <AnimatedCard delay={0.1}>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4">Información</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Visibilidad</span>
                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-600 text-sm font-semibold">
                        {project.visibility}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tamaño</span>
                      <span className="font-bold">{project.size} KB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Issues Abiertas</span>
                      <span className="font-bold">{project.openIssues}</span>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Contributors */}
              {project.contributors.length > 0 && (
                <AnimatedCard delay={0.2}>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-4">Contribuidores</h3>
                    <div className="space-y-3">
                      {project.contributors.slice(0, 3).map((contributor) => (
                        <a
                          key={contributor.username}
                          href={contributor.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-all hover:scale-105"
                        >
                          <img
                            src={contributor.avatarUrl}
                            alt={contributor.username}
                            className="h-10 w-10 rounded-full border-2 border-border"
                          />
                          <div>
                            <p className="font-semibold">{contributor.username}</p>
                            <p className="text-xs text-muted-foreground">
                              {contributor.contributions} contribuciones
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </AnimatedCard>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}