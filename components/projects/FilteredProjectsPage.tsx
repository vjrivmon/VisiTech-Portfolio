"use client";

import EnhancedProjectCard from '@/components/projects/EnhancedProjectCard';
import { Project } from '@/lib/types/portfolio';

interface FilteredProjectsPageProps {
  projects: Project[];
}

export default function FilteredProjectsPage({ projects }: FilteredProjectsPageProps) {
  // Solo mostrar proyectos destacados
  const featuredProjects = projects.filter(p => p.featured);

  return (
    <>
      {/* Projects Grid */}
      {featuredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <EnhancedProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-card">
          <p className="text-muted-foreground">No hay proyectos destacados disponibles</p>
        </div>
      )}
    </>
  );
}