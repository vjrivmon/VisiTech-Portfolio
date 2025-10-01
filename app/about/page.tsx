"use client";

import { motion } from 'framer-motion';
import { GradientHeading } from '@/components/react-bits/gradient-heading';
import { AnimatedCard } from '@/components/react-bits/animated-card';
import { FloatingBadge } from '@/components/react-bits/floating-badge';
import { Code2, Briefcase, Award, Globe2, Download, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Timeline from '@/components/about/Timeline';

export default function AboutPage() {
  const { t, locale } = useLanguage();
  const skills = [
    { name: 'Python', level: 90, color: '#3776AB' },
    { name: 'TypeScript', level: 85, color: '#3178C6' },
    { name: 'React', level: 80, color: '#61DAFB' },
    { name: 'Next.js', level: 75, color: '#000000' },
    { name: 'Node.js', level: 85, color: '#339933' },
    { name: 'Docker', level: 75, color: '#2496ED' },
    { name: 'ROS2', level: 70, color: '#22314E' },
    { name: 'AWS', level: 65, color: '#FF9900' },
  ];

  const education = [
    {
      degree: locale === 'es' ? 'Grado en Tecnologías Interactivas' : 'Interactive Technologies Degree',
      institution: 'UPV Campus de Gandía',
      period: locale === 'es' ? '2022 - Presente' : '2022 - Present',
      status: 'In Progress',
      icon: '🎓'
    },
    {
      degree: 'Bootcamp DevOps',
      institution: 'Código Facilito',
      period: '2024 - 2025',
      status: 'In Progress',
      icon: '⚙️'
    },
    {
      degree: locale === 'es' ? 'Grado en Videojuegos' : 'Video Game Development Degree',
      institution: 'Florida Universitaria',
      period: '2020 - 2022',
      status: 'Completed',
      icon: '🎮'
    },
  ];

  const achievements = [
    {
      title: locale === 'es' ? 'Campeón Telefónica' : 'Telefónica Champion',
      subtitle: locale === 'es' ? 'Líderes Digitales Universitarios' : 'University Digital Leaders',
      date: locale === 'es' ? 'Abril 2025' : 'April 2025',
      icon: '🏆',
      color: '#FFD700'
    },
    {
      title: 'Hackathon eMobility',
      subtitle: locale === 'es' ? 'Soluciones de movilidad urbana' : 'Urban mobility solutions',
      date: locale === 'es' ? 'Sept 2023' : 'Sept 2023',
      icon: '🚗',
      color: '#4CAF50'
    },
    {
      title: locale === 'es' ? 'Campus Salud Gandía' : 'Gandía Health Campus',
      subtitle: locale === 'es' ? 'Innovación en salud digital' : 'Digital health innovation',
      date: locale === 'es' ? 'Abril 2023' : 'April 2023',
      icon: '⚕️',
      color: '#2196F3'
    },
  ];

  const languages = [
    { name: locale === 'es' ? 'Español' : 'Spanish', level: t.about.native, flag: '🇪🇸' },
    { name: locale === 'es' ? 'Valenciano' : 'Valencian', level: t.about.native, flag: '🇪🇸' },
    { name: locale === 'es' ? 'Inglés' : 'English', level: 'B2', flag: '🇬🇧' },
    { name: locale === 'es' ? 'Francés' : 'French', level: 'B1', flag: '🇫🇷' },
  ];

  return (
    <div className="min-h-screen">
      <section className="section">
        <div className="section-container max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <GradientHeading as="h1" className="text-5xl sm:text-6xl mb-6">
              {t.about.title}
            </GradientHeading>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              {t.about.subtitle}
            </motion.p>
          </div>

          {/* Quick Bio */}
          <AnimatedCard className="mb-16" gradient>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">{t.about.inSummary}</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.about.summary.split('IA, Robótica con ROS2, IoT')[0]}
                <strong className="text-foreground">
                  {locale === 'es' ? 'IA, Robótica con ROS2, IoT' : 'AI, Robotics with ROS2, IoT'}
                </strong>
                {t.about.summary.split('IoT')[1]?.split('AidGuide')[0]}
                <strong className="text-foreground">AidGuide</strong>
                {t.about.summary.split('AidGuide')[1]}
              </p>
            </div>
          </AnimatedCard>

          {/* Skills */}
          <div className="mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Code2 className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold text-center">{t.about.techStack}</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <FloatingBadge color={skill.color} delay={index * 0.05}>
                    <span className="font-bold">{skill.name}</span>
                    <span className="ml-2 opacity-70">{skill.level}%</span>
                  </FloatingBadge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education & Achievements in 2 columns */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Education */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-3xl">🎓</span>
                {t.about.training}
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <AnimatedCard key={index} delay={index * 0.1}>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{edu.icon}</span>
                          <h3 className="font-bold text-sm">{edu.degree}</h3>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          edu.status === 'Completed'
                            ? 'bg-green-500/20 text-green-600'
                            : 'bg-blue-500/20 text-blue-600'
                        }`}>
                          {edu.status === 'Completed' ? t.about.completed : t.about.inProgress}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {edu.period}
                      </p>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                {t.about.achievements}
              </h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <AnimatedCard key={index} delay={index * 0.1}>
                    <div className="p-5">
                      <div className="flex items-start gap-3 mb-2">
                        <motion.span
                          className="text-3xl"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                          {achievement.icon}
                        </motion.span>
                        <div className="flex-1">
                          <h3 className="font-bold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.subtitle}</p>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {achievement.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="mb-16">
            <Timeline />
          </div>

          {/* Languages */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
              <Globe2 className="h-6 w-6 text-primary" />
              {t.about.languages}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {languages.map((lang, index) => (
                <AnimatedCard key={index} delay={index * 0.1} className="min-w-[140px]">
                  <div className="p-4 text-center">
                    <h3 className="font-bold">{lang.name}</h3>
                    <p className="text-sm text-primary font-semibold">{lang.level}</p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>

          {/* CTA - Download CV */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <a
              href="/cv/Vicente_Rivas_CV.pdf"
              download
              className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold rounded-2xl bg-gradient-to-r from-primary to-accent text-white hover:shadow-2xl hover:scale-105 transition-all"
            >
              <Download className="h-5 w-5" />
              {t.about.downloadFullCV}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}