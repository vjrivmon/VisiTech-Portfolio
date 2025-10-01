import { Project } from '@/lib/types/portfolio';
import {
  getGitHubRepos,
  getProjectBySlug as getGitHubProjectBySlug,
  getFeaturedProjects as getGitHubFeaturedProjects
} from '@/lib/github/fetchers';

// Export function to get a project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return getGitHubProjectBySlug(slug);
}

// Export function to get all projects
export async function getAllProjects(): Promise<Project[]> {
  return getGitHubRepos();
}

// Export function to get featured projects
export async function getFeaturedProjects(): Promise<Project[]> {
  return getGitHubFeaturedProjects();
}

// Export function to get projects by category
export async function getProjectsByCategory(category: string): Promise<Project[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter(p => p.category === category);
}