import Link from 'next/link';
import { Project } from '@/lib/types/portfolio';
import { cn } from '@/lib/utils/cn';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const categoryColors: Record<string, string> = {
    'ai-robotics': 'bg-blue-500/10 text-blue-500',
    'iot': 'bg-green-500/10 text-green-500',
    'games': 'bg-purple-500/10 text-purple-500',
    'web': 'bg-orange-500/10 text-orange-500',
    'mobile': 'bg-pink-500/10 text-pink-500',
    'devops': 'bg-gray-500/10 text-gray-500',
    'saas': 'bg-indigo-500/10 text-indigo-500',
    'tools': 'bg-yellow-500/10 text-yellow-500',
    'academic': 'bg-red-500/10 text-red-500',
    'experimental': 'bg-cyan-500/10 text-cyan-500',
    'other': 'bg-gray-500/10 text-gray-500',
  };

  return (
    <div className="project-card group">
      <Link
        href={`/projects/${project.id}`}
        className="block p-6 h-full"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold line-clamp-1">
              {project.displayName}
            </h3>
            {project.featured && (
              <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                Featured
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
            {project.description || 'No description available'}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.languages.slice(0, 3).map((lang) => (
              <span
                key={lang.name}
                className="px-2 py-1 text-xs font-medium rounded-full bg-muted"
              >
                {lang.name}
              </span>
            ))}
            {project.languages.length > 3 && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-muted">
                +{project.languages.length - 3}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t">
            {/* Category */}
            <span className={cn(
              "px-2 py-1 text-xs font-medium rounded-full",
              categoryColors[project.category] || categoryColors.other
            )}>
              {project.category.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
            </span>

            {/* Stats */}
            <div className="flex items-center space-x-3 text-muted-foreground">
              {project.stars > 0 && (
                <div className="flex items-center space-x-1">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs">{project.stars}</span>
                </div>
              )}
              {project.forks > 0 && (
                <div className="flex items-center space-x-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                  </svg>
                  <span className="text-xs">{project.forks}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}