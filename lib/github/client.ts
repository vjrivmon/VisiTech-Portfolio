import {
  GitHubRepository,
  GitHubReadme,
  GitHubLanguages,
  GitHubCommit,
  GitHubContributor
} from '@/lib/types/github';

interface FetchOptions {
  cache?: RequestCache;
  revalidate?: number;
}

class GitHubClient {
  private token: string;
  private baseURL: string = 'https://api.github.com';
  private username: string = 'vjrivmon';

  constructor() {
    this.token = process.env.GITHUB_TOKEN || '';
    if (!this.token) {
      console.warn('GITHUB_TOKEN not found in environment variables');
    }
  }

  private getHeaders(): HeadersInit {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Accept': 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
  }

  async getRepositories(options?: FetchOptions): Promise<GitHubRepository[]> {
    try {
      const response = await fetch(
        `${this.baseURL}/users/${this.username}/repos?per_page=100&sort=updated`,
        {
          headers: this.getHeaders(),
          cache: options?.cache || 'default',
          next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.status}`);
      }

      const repos: GitHubRepository[] = await response.json();

      // Filter out forks and archived repos
      return repos.filter(repo => !repo.fork && !repo.archived);
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw error;
    }
  }

  async getRepository(name: string): Promise<GitHubRepository | null> {
    try {
      const response = await fetch(
        `${this.baseURL}/repos/${this.username}/${name}`,
        {
          headers: this.getHeaders(),
          next: { revalidate: 3600 }, // 1 hour
        }
      );

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch repository: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Error fetching repository ${name}:`, error);
      return null;
    }
  }

  async getReadme(repo: string): Promise<string | null> {
    try {
      const response = await fetch(
        `${this.baseURL}/repos/${this.username}/${repo}/readme`,
        {
          headers: this.getHeaders(),
          next: { revalidate: 86400 }, // 24 hours
        }
      );

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch README: ${response.status}`);
      }

      const data: GitHubReadme = await response.json();

      // Decode base64 content
      if (data.content) {
        return Buffer.from(data.content, 'base64').toString('utf-8');
      }

      return null;
    } catch (error) {
      console.error(`Error fetching README for ${repo}:`, error);
      return null;
    }
  }

  async getLanguages(repo: string): Promise<GitHubLanguages | null> {
    try {
      const response = await fetch(
        `${this.baseURL}/repos/${this.username}/${repo}/languages`,
        {
          headers: this.getHeaders(),
          next: { revalidate: 604800 }, // 1 week
        }
      );

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch languages: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Error fetching languages for ${repo}:`, error);
      return null;
    }
  }

  async getCommits(repo: string, limit: number = 10): Promise<GitHubCommit[]> {
    try {
      const response = await fetch(
        `${this.baseURL}/repos/${this.username}/${repo}/commits?per_page=${limit}`,
        {
          headers: this.getHeaders(),
          next: { revalidate: 1800 }, // 30 minutes
        }
      );

      if (response.status === 404) {
        return [];
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch commits: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Error fetching commits for ${repo}:`, error);
      return [];
    }
  }

  async getContributors(repo: string): Promise<GitHubContributor[]> {
    try {
      const response = await fetch(
        `${this.baseURL}/repos/${this.username}/${repo}/contributors`,
        {
          headers: this.getHeaders(),
          next: { revalidate: 86400 }, // 24 hours
        }
      );

      if (response.status === 404) {
        return [];
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch contributors: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Error fetching contributors for ${repo}:`, error);
      return [];
    }
  }

  async getTopics(repo: string): Promise<string[]> {
    try {
      const response = await fetch(
        `${this.baseURL}/repos/${this.username}/${repo}/topics`,
        {
          headers: {
            ...this.getHeaders(),
            'Accept': 'application/vnd.github.mercy-preview+json',
          },
          next: { revalidate: 86400 }, // 24 hours
        }
      );

      if (response.status === 404) {
        return [];
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch topics: ${response.status}`);
      }

      const data = await response.json();
      return data.names || [];
    } catch (error) {
      console.error(`Error fetching topics for ${repo}:`, error);
      return [];
    }
  }

  async getRateLimit(): Promise<{
    limit: number;
    remaining: number;
    reset: Date;
  }> {
    try {
      const response = await fetch(
        `${this.baseURL}/rate_limit`,
        {
          headers: this.getHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch rate limit: ${response.status}`);
      }

      const data = await response.json();
      return {
        limit: data.rate.limit,
        remaining: data.rate.remaining,
        reset: new Date(data.rate.reset * 1000),
      };
    } catch (error) {
      console.error('Error fetching rate limit:', error);
      return {
        limit: 0,
        remaining: 0,
        reset: new Date(),
      };
    }
  }
}

// Export singleton instance
export const githubClient = new GitHubClient();