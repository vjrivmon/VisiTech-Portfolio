import { getProjectBySlug, getGitHubRepos } from '@/lib/github/fetchers';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const projects = await getGitHubRepos();
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};

  return {
    title: project.displayName,
    description: project.description || `View details about ${project.displayName}`,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <section className="section">
        <div className="section-container">
          {/* Back button */}
          <Link
            href="/projects"
            className="inline-flex items-center mb-8 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Projects
          </Link>

          {/* Project header */}
          <div className="mb-12">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">{project.displayName}</h1>
                {project.description && (
                  <p className="text-lg text-muted-foreground">{project.description}</p>
                )}
              </div>
              {project.featured && (
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                  Featured
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
              </a>
              {project.homepage && (
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-lg border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Project details grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Technologies */}
              <div className="p-6 rounded-lg border bg-card">
                <h2 className="text-xl font-semibold mb-4">Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {project.languages.map((lang) => (
                    <span
                      key={lang.name}
                      className="px-3 py-1 text-sm rounded-full bg-muted"
                      style={{
                        backgroundColor: `${lang.color}20`,
                        color: lang.color,
                        borderColor: lang.color,
                        borderWidth: '1px',
                      }}
                    >
                      {lang.name} ({lang.percentage}%)
                    </span>
                  ))}
                </div>
              </div>

              {/* README */}
              {project.readme && (
                <div className="p-6 rounded-lg border bg-card">
                  <h2 className="text-xl font-semibold mb-4">README</h2>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap break-words">
                      {project.readme}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project info */}
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="font-semibold mb-4">Project Info</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm text-muted-foreground">Category</dt>
                    <dd className="text-sm font-medium capitalize">
                      {project.category.replace('-', ' ')}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Status</dt>
                    <dd className="text-sm font-medium capitalize">{project.status}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Created</dt>
                    <dd className="text-sm font-medium">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Last Updated</dt>
                    <dd className="text-sm font-medium">
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Stats */}
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="font-semibold mb-4">Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{project.stars}</div>
                    <div className="text-xs text-muted-foreground">Stars</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{project.forks}</div>
                    <div className="text-xs text-muted-foreground">Forks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{project.openIssues}</div>
                    <div className="text-xs text-muted-foreground">Issues</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{project.size}</div>
                    <div className="text-xs text-muted-foreground">Size (KB)</div>
                  </div>
                </div>
              </div>

              {/* Contributors */}
              {project.contributors.length > 0 && (
                <div className="p-6 rounded-lg border bg-card">
                  <h3 className="font-semibold mb-4">Contributors</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.contributors.slice(0, 5).map((contributor) => (
                      <a
                        key={contributor.username}
                        href={contributor.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-3 py-1 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <img
                          src={contributor.avatarUrl}
                          alt={contributor.username}
                          className="h-5 w-5 rounded-full"
                        />
                        <span className="text-sm">{contributor.username}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}