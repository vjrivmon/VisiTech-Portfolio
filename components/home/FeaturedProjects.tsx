import { getFeaturedProjects } from '@/lib/github/fetchers';
import ProjectCard from '@/components/projects/ProjectCard';
import Link from 'next/link';

export default async function FeaturedProjects() {
  const projects = await getFeaturedProjects();

  return (
    <section className="section bg-muted/30">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my latest work in AI, Robotics, IoT, and Web Development.
            Each project showcases different skills and technologies.
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            View All Projects
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}