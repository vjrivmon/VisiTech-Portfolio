import { githubClient } from './client';
import { transformRepository } from './transforms';
import { Project, ProjectCategory, FEATURED_PROJECTS } from '@/lib/types/portfolio';

export async function getGitHubRepos(): Promise<Project[]> {
  try {
    // Fetch all repositories
    const repos = await githubClient.getRepositories({
      cache: 'default',
      revalidate: 3600, // 1 hour
    });

    // Transform to projects in parallel
    const projects = await Promise.all(
      repos.map(async (repo) => {
        const [readme, languages] = await Promise.all([
          githubClient.getReadme(repo.name).catch(() => null),
          githubClient.getLanguages(repo.name).catch(() => null),
        ]);

        return transformRepository(repo, readme, languages);
      })
    );

    // Sort by update date
    projects.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    return projects;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const repo = await githubClient.getRepository(slug);

    if (!repo) {
      return null;
    }

    // Fetch additional data in parallel
    const [readme, languages, commits, contributors] = await Promise.all([
      githubClient.getReadme(slug).catch(() => null),
      githubClient.getLanguages(slug).catch(() => null),
      githubClient.getCommits(slug, 10).catch(() => []),
      githubClient.getContributors(slug).catch(() => []),
    ]);

    // Transform to project
    const project = await transformRepository(repo, readme, languages, commits);

    // Add contributors
    project.contributors = contributors.map(c => ({
      username: c.login,
      avatarUrl: c.avatar_url,
      profileUrl: c.html_url,
      contributions: c.contributions,
      role: c.login === 'vjrivmon' ? 'Owner' : 'Contributor',
    }));

    return project;
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error);
    return null;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const allProjects = await getGitHubRepos();

  // Filter featured projects
  let featured = allProjects.filter(p => p.featured);

  // Ensure minimum featured count
  if (featured.length < 6) {
    // Add top projects by popularity if needed
    const nonFeatured = allProjects
      .filter(p => !p.featured)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 6 - featured.length);

    featured.push(...nonFeatured);
  }

  // Sort by custom priority
  const priorityOrder = FEATURED_PROJECTS;

  featured.sort((a, b) => {
    const aIndex = priorityOrder.findIndex(name => a.id.toLowerCase().includes(name.toLowerCase()));
    const bIndex = priorityOrder.findIndex(name => b.id.toLowerCase().includes(name.toLowerCase()));

    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    return b.stars - a.stars;
  });

  return featured.slice(0, 6);
}

export async function getProjectsByCategory(category: ProjectCategory): Promise<Project[]> {
  const allProjects = await getGitHubRepos();
  return allProjects.filter(p => p.category === category);
}

export async function searchProjects(query: string): Promise<Project[]> {
  const allProjects = await getGitHubRepos();
  const searchTerm = query.toLowerCase();

  return allProjects.filter(p => {
    const nameMatch = p.name.toLowerCase().includes(searchTerm);
    const displayNameMatch = p.displayName.toLowerCase().includes(searchTerm);
    const descriptionMatch = p.description?.toLowerCase().includes(searchTerm) || false;
    const topicMatch = p.topics.some(t => t.toLowerCase().includes(searchTerm));
    const techMatch = p.techStack.some(t => t.name.toLowerCase().includes(searchTerm));
    const languageMatch = p.languages.some(l => l.name.toLowerCase().includes(searchTerm));

    return nameMatch || displayNameMatch || descriptionMatch || topicMatch || techMatch || languageMatch;
  });
}

export async function getProjectStats() {
  const projects = await getGitHubRepos();

  const stats = {
    totalProjects: projects.length,
    publicProjects: projects.filter(p => p.visibility === 'public').length,
    featuredProjects: projects.filter(p => p.featured).length,
    activeProjects: projects.filter(p => p.status === 'active').length,

    categoryBreakdown: {} as Record<string, number>,
    languageBreakdown: {} as Record<string, number>,

    metrics: {
      totalStars: projects.reduce((sum, p) => sum + p.stars, 0),
      totalForks: projects.reduce((sum, p) => sum + p.forks, 0),
      avgProjectAge: 0,
      recentlyUpdated: projects.filter(p => {
        const daysSince = (Date.now() - p.updatedAt.getTime()) / (1000 * 60 * 60 * 24);
        return daysSince <= 30;
      }).length,
    },

    timeline: {
      firstProject: projects[projects.length - 1]?.createdAt.toISOString() || '',
      latestProject: projects[0]?.createdAt.toISOString() || '',
      mostActiveMonth: '', // Would need more complex calculation
    },
  };

  // Calculate category breakdown
  projects.forEach(p => {
    stats.categoryBreakdown[p.category] = (stats.categoryBreakdown[p.category] || 0) + 1;
  });

  // Calculate language breakdown
  projects.forEach(p => {
    if (p.primaryLanguage) {
      stats.languageBreakdown[p.primaryLanguage] = (stats.languageBreakdown[p.primaryLanguage] || 0) + 1;
    }
  });

  // Calculate average project age
  const totalAge = projects.reduce((sum, p) => {
    const age = (Date.now() - p.createdAt.getTime()) / (1000 * 60 * 60 * 24);
    return sum + age;
  }, 0);
  stats.metrics.avgProjectAge = Math.round(totalAge / projects.length);

  return stats;
}