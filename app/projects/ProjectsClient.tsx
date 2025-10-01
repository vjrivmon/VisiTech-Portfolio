"use client";

import FilteredProjectsPage from '@/components/projects/FilteredProjectsPage';
import { type Project } from '@/lib/types/portfolio';
import { useLanguage } from '@/contexts/LanguageContext';
import { GradientHeading } from '@/components/react-bits/gradient-heading';

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <section className="section">
        <div className="section-container">
          <div className="text-center mb-12">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl font-bold mb-4">
              {t.projects.title}
            </GradientHeading>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.projects.subtitle}
            </p>
          </div>
          <FilteredProjectsPage projects={projects} />
        </div>
      </section>
    </div>
  );
}