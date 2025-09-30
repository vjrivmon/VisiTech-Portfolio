import { getGitHubRepos } from '@/lib/github/fetchers';
import ProjectCard from '@/components/projects/ProjectCard';

export const metadata = {
  title: 'Projects',
  description: 'Explore all my projects including AI, Robotics, IoT, Web Development, and more.',
};

export default async function ProjectsPage() {
  const projects = await getGitHubRepos();

  return (
    <div className="min-h-screen">
      <section className="section">
        <div className="section-container">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              All Projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete collection of my work across different technologies and domains.
              From AI and robotics to web development and IoT solutions.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="text-center p-4 rounded-lg border bg-card">
              <div className="text-2xl font-bold">{projects.length}</div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </div>
            <div className="text-center p-4 rounded-lg border bg-card">
              <div className="text-2xl font-bold">
                {projects.filter(p => p.featured).length}
              </div>
              <div className="text-sm text-muted-foreground">Featured</div>
            </div>
            <div className="text-center p-4 rounded-lg border bg-card">
              <div className="text-2xl font-bold">
                {projects.filter(p => p.status === 'active').length}
              </div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
            <div className="text-center p-4 rounded-lg border bg-card">
              <div className="text-2xl font-bold">
                {projects.reduce((sum, p) => sum + p.stars, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Stars</div>
            </div>
          </div>

          {/* Projects Grid */}
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}