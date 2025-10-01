"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description?: string;
  type: 'education' | 'work' | 'achievement' | 'project';
  current?: boolean;
}

export default function Timeline() {
  const { t, locale } = useLanguage();

  const timelineItems: TimelineItem[] = [
    {
      year: '2025',
      title: locale === 'es' ? 'Campeón Telefónica' : 'Telefónica Champion',
      subtitle: locale === 'es' ? 'Líderes Digitales Universitarios' : 'University Digital Leaders',
      type: 'achievement',
      description: locale === 'es'
        ? 'Primer puesto en competición nacional de innovación tecnológica'
        : 'First place in national technology innovation competition'
    },
    {
      year: '2024-2025',
      title: 'DevOps Bootcamp',
      subtitle: 'Código Facilito',
      type: 'education',
      current: true,
      description: locale === 'es'
        ? 'Especialización en CI/CD, Docker, Kubernetes, AWS'
        : 'Specialization in CI/CD, Docker, Kubernetes, AWS'
    },
    {
      year: '2024',
      title: 'AidGuide',
      subtitle: locale === 'es' ? 'Sistema Robótico con IA' : 'AI Robotic System',
      type: 'project',
      description: locale === 'es'
        ? 'Líder del proyecto de robótica para asistencia a personas con discapacidad visual'
        : 'Project leader for robotics assistance system for visually impaired people'
    },
    {
      year: '2023',
      title: 'Hackathon eMobility Valencia',
      subtitle: locale === 'es' ? 'Soluciones de movilidad urbana' : 'Urban mobility solutions',
      type: 'achievement',
      description: locale === 'es'
        ? 'Participación en hackathon de movilidad sostenible'
        : 'Participation in sustainable mobility hackathon'
    },
    {
      year: '2022-2025',
      title: locale === 'es' ? 'Grado en Tecnologías Interactivas' : 'Interactive Technologies Degree',
      subtitle: 'UPV Campus de Gandía',
      type: 'education',
      current: true,
      description: locale === 'es'
        ? 'Especialización en IA, IoT y desarrollo de software'
        : 'Specialization in AI, IoT and software development'
    },
    {
      year: '2022',
      title: 'PoliGames',
      subtitle: locale === 'es' ? 'Líder de equipo' : 'Team Leader',
      type: 'project',
      description: locale === 'es'
        ? 'Lideré equipo en desarrollo de videojuego Unity para competición universitaria'
        : 'Led team in Unity game development for university competition'
    },
    {
      year: '2020-2022',
      title: locale === 'es' ? 'Grado en Videojuegos' : 'Game Development Degree',
      subtitle: 'Florida Universitaria',
      type: 'education',
      description: locale === 'es'
        ? 'Fundamentos de programación y desarrollo de videojuegos'
        : 'Programming fundamentals and game development'
    }
  ];

  const getColor = (type: TimelineItem['type']) => {
    switch (type) {
      case 'education':
        return 'bg-blue-500';
      case 'work':
        return 'bg-green-500';
      case 'achievement':
        return 'bg-yellow-500';
      case 'project':
        return 'bg-purple-500';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">
        {t.timeline.title}
      </h2>

      <div className="space-y-1">
        {timelineItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="group hover:bg-muted/30 rounded-lg p-4 transition-colors">
              <div className="flex gap-8 items-start">
                {/* Year */}
                <div className="min-w-[90px] text-right">
                  <span className="text-xs font-medium text-muted-foreground">
                    {item.year}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 relative">
                  {/* Connecting line */}
                  {index !== timelineItems.length - 1 && (
                    <div className="absolute -bottom-5 left-0 w-px h-[calc(100%+1.25rem)] bg-border/50" />
                  )}

                  <div className="flex items-start gap-3">
                    {/* Small dot */}
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${getColor(item.type)}`} />

                    <div className="flex-1">
                      <h3 className="font-medium text-sm text-foreground leading-tight">
                        {item.title}
                        {item.current && (
                          <span className="ml-2 text-xs text-primary">
                            • {t.timeline.inProgress}
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.subtitle}
                      </p>
                      {item.description && (
                        <p className="text-xs text-muted-foreground/70 mt-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}