"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Code2, Server, Database, Cloud, Cpu } from 'lucide-react';

export default function TechStack() {
  const { t } = useLanguage();

  const technologies = [
    {
      category: t.techStack.categories.languages,
      icon: <Code2 className="h-5 w-5" />,
      color: 'from-blue-500/10 to-cyan-500/10',
      items: ['Python', 'TypeScript', 'JavaScript', 'C++', 'Java', 'SQL'],
    },
    {
      category: t.techStack.categories.frameworks,
      icon: <Server className="h-5 w-5" />,
      color: 'from-purple-500/10 to-pink-500/10',
      items: ['React', 'Next.js', 'Node.js', 'ROS2', 'Unity', 'Docker'],
    },
    {
      category: t.techStack.categories.databases,
      icon: <Database className="h-5 w-5" />,
      color: 'from-green-500/10 to-emerald-500/10',
      items: ['PostgreSQL', 'MongoDB', 'Firebase', 'MariaDB'],
    },
    {
      category: t.techStack.categories.cloud,
      icon: <Cloud className="h-5 w-5" />,
      color: 'from-orange-500/10 to-amber-500/10',
      items: ['AWS', 'Vercel', 'GitHub Actions', 'Docker Hub'],
    },
    {
      category: t.techStack.categories.hardware,
      icon: <Cpu className="h-5 w-5" />,
      color: 'from-red-500/10 to-rose-500/10',
      items: ['Arduino', 'Raspberry Pi', 'ESP32', 'ROS2'],
    },
  ];

  return (
    <section className="section bg-muted/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.techStack.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.techStack.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group h-full"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-colors h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {tech.icon}
                  </div>
                  <h3 className="font-semibold">{tech.category}</h3>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 flex-1">
                  {tech.items.map((item, itemIndex) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + itemIndex * 0.05 }}
                      viewport={{ once: true }}
                      className="text-sm text-muted-foreground text-center"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}