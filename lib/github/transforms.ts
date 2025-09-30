import {
  GitHubRepository,
  GitHubLanguages,
  GitHubCommit,
} from '@/lib/types/github';
import {
  Project,
  ProjectCategory,
  ProjectStatus,
  Language,
  Technology,
  FEATURED_PROJECTS,
} from '@/lib/types/portfolio';

// Main transformation pipeline
export async function transformRepository(
  raw: GitHubRepository,
  readme?: string | null,
  languages?: GitHubLanguages | null,
  commits?: GitHubCommit[]
): Promise<Project> {
  const techStack = extractTechStack(raw, languages, readme);
  const category = classifyProject(raw, techStack);
  const featured = calculateFeatured(raw, category);
  const status = determineStatus(raw, commits);
  const activityLevel = calculateActivityLevel(raw, commits);

  return {
    id: raw.name,
    name: raw.name,
    displayName: formatProjectName(raw.name),
    description: raw.description,
    url: raw.html_url,
    homepage: raw.homepage,

    category,
    featured,
    status,
    visibility: raw.private ? 'private' : 'public',

    primaryLanguage: raw.language,
    languages: processLanguages(languages),
    techStack,
    topics: raw.topics || [],

    readme: readme || null,
    readmeRaw: readme || null,
    screenshots: extractScreenshots(readme),

    stars: raw.stargazers_count,
    forks: raw.forks_count,
    openIssues: raw.open_issues_count,
    size: raw.size,

    createdAt: new Date(raw.created_at),
    updatedAt: new Date(raw.updated_at),
    lastCommit: commits?.[0] ? new Date(commits[0].commit.author.date) : null,
    commits: commits?.length || 0,
    contributors: [], // Will be populated separately

    activityLevel,
    completeness: calculateCompleteness(raw, readme),
    popularity: calculatePopularity(raw),
  };
}

export function classifyProject(
  repo: GitHubRepository,
  techStack: Technology[]
): ProjectCategory {
  const name = repo.name.toLowerCase();
  const topics = (repo.topics || []).map(t => t.toLowerCase());
  const description = (repo.description || '').toLowerCase();

  // Priority classification rules
  const classificationRules: Array<[ProjectCategory, string[]]> = [
    // AI/Robotics
    ['ai-robotics', ['aidguide', 'neurospot', 'aura', 'ros', 'ros2', 'ai', 'ml',
                     'machine-learning', 'deep-learning', 'robotics', 'computer-vision',
                     'neural', 'tensorflow', 'pytorch', 'opencv', 'gazebo']],

    // IoT
    ['iot', ['ecocity', 'polihuerto', 'iot', 'arduino', 'raspberry', 'sensor',
             'mqtt', 'embedded', 'hardware', 'esp32', 'esp8266', 'farola']],

    // Games
    ['games', ['poligames', 'unity', 'game', 'gaming', 'unreal', '3d',
               'blender', 'godot', 'pygame']],

    // Mobile
    ['mobile', ['android', 'ios', 'flutter', 'react-native', 'kotlin',
                'swift', 'mobile', 'app']],

    // SaaS
    ['saas', ['saas', 'subscription', 'platform', 'service', 'api',
              'multi-tenant', 'b2b', 'dashboard']],

    // DevOps
    ['devops', ['docker', 'kubernetes', 'ci-cd', 'terraform', 'ansible',
                'jenkins', 'github-actions', 'aws', 'cloud', 'infrastructure']],

    // Web (should be checked after more specific categories)
    ['web', ['react', 'vue', 'angular', 'next', 'nuxt', 'svelte',
             'web', 'website', 'frontend', 'backend', 'fullstack', 'api',
             'osyris', 'sustainability']],

    // Tools
    ['tools', ['cli', 'tool', 'utility', 'library', 'package', 'plugin',
               'extension', 'helper', 'pdf_reader']],

    // Academic
    ['academic', ['sprint0', 'assignment', 'homework', 'course', 'university',
                  'upv', 'cdio', 'practice', 'lab']],
  ];

  // Check each rule in priority order
  for (const [category, keywords] of classificationRules) {
    const matches = keywords.filter(keyword =>
      name.includes(keyword) ||
      topics.includes(keyword) ||
      description.includes(keyword) ||
      techStack.some(tech => tech.name.toLowerCase().includes(keyword))
    );

    if (matches.length > 0) {
      return category;
    }
  }

  // Check for experimental/portfolio projects
  if (name.includes('portfolio') || name.includes('test') ||
      name.includes('experiment') || name.includes('demo')) {
    return 'experimental';
  }

  return 'other';
}

export function calculateFeatured(
  repo: GitHubRepository,
  category: ProjectCategory
): boolean {
  const name = repo.name.toLowerCase();

  // Check if it's in the featured list
  if (FEATURED_PROJECTS.some(featured => name.includes(featured.toLowerCase()))) {
    return true;
  }

  // Auto-feature based on criteria
  const daysSinceUpdate =
    (Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24);

  const priorityCategories: ProjectCategory[] = ['ai-robotics', 'iot', 'saas'];

  const meetsAutoCriteria =
    repo.stargazers_count >= 5 &&
    daysSinceUpdate <= 90 &&
    repo.description !== null &&
    repo.size >= 100 &&
    priorityCategories.includes(category);

  return meetsAutoCriteria;
}

export function extractTechStack(
  repo: GitHubRepository,
  languages?: GitHubLanguages | null,
  _readme?: string | null
): Technology[] {
  const techs = new Set<Technology>();

  // Extract from languages
  if (languages) {
    Object.keys(languages).forEach(lang => {
      techs.add({
        name: lang,
        category: 'language',
      });
    });
  }

  // Extract from topics
  const topicMapping: Record<string, Technology> = {
    'react': { name: 'React', category: 'framework' },
    'nextjs': { name: 'Next.js', category: 'framework' },
    'nodejs': { name: 'Node.js', category: 'framework' },
    'typescript': { name: 'TypeScript', category: 'language' },
    'docker': { name: 'Docker', category: 'tool' },
    'kubernetes': { name: 'Kubernetes', category: 'tool' },
    'aws': { name: 'AWS', category: 'cloud' },
    'mongodb': { name: 'MongoDB', category: 'database' },
    'postgresql': { name: 'PostgreSQL', category: 'database' },
    'ros2': { name: 'ROS 2', category: 'framework' },
    'arduino': { name: 'Arduino', category: 'tool' },
    'unity': { name: 'Unity', category: 'framework' },
  };

  (repo.topics || []).forEach(topic => {
    const mappedTech = topicMapping[topic.toLowerCase()];
    if (mappedTech) {
      techs.add(mappedTech);
    }
  });

  return Array.from(techs);
}

function processLanguages(languages?: GitHubLanguages | null): Language[] {
  if (!languages || Object.keys(languages).length === 0) {
    return [];
  }

  const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

  return Object.entries(languages).map(([name, bytes]) => ({
    name,
    percentage: Math.round((bytes / total) * 100),
    bytes,
    color: getLanguageColor(name),
  }));
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    TypeScript: '#2b7489',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    'C#': '#178600',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Shell: '#89e051',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    Swift: '#FA7343',
    Kotlin: '#A97BFF',
  };

  return colors[language] || '#666666';
}

function formatProjectName(name: string): string {
  // Convert snake_case and kebab-case to Title Case
  return name
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Handle camelCase
    .replace(/\s+/g, ' ')
    .trim();
}

function determineStatus(
  repo: GitHubRepository,
  _commits?: GitHubCommit[]
): ProjectStatus {
  if (repo.archived) {
    return 'archived';
  }

  const daysSinceUpdate =
    (Date.now() - new Date(repo.pushed_at).getTime()) / (1000 * 60 * 60 * 24);

  if (daysSinceUpdate < 30) {
    return 'active';
  }

  if (daysSinceUpdate < 180) {
    return 'paused';
  }

  // Check if project appears complete based on description
  const description = repo.description?.toLowerCase() || '';
  if (description.includes('completed') || description.includes('finished')) {
    return 'completed';
  }

  return daysSinceUpdate > 365 ? 'archived' : 'paused';
}

function calculateActivityLevel(
  repo: GitHubRepository,
  _commits?: GitHubCommit[]
): 'active' | 'maintained' | 'dormant' | 'archived' {
  if (repo.archived) {
    return 'archived';
  }

  const daysSinceUpdate =
    (Date.now() - new Date(repo.pushed_at).getTime()) / (1000 * 60 * 60 * 24);

  if (daysSinceUpdate < 30) {
    return 'active';
  }

  if (daysSinceUpdate < 90) {
    return 'maintained';
  }

  if (daysSinceUpdate < 365) {
    return 'dormant';
  }

  return 'archived';
}

function calculateCompleteness(repo: GitHubRepository, readme?: string | null): number {
  let score = 0;
  const weights = {
    description: 20,
    readme: 30,
    topics: 10,
    homepage: 10,
    license: 10,
    issues: 10,
    size: 10,
  };

  if (repo.description && repo.description.length > 20) score += weights.description;
  if (readme && readme.length > 100) score += weights.readme;
  if (repo.topics && repo.topics.length > 0) score += weights.topics;
  if (repo.homepage) score += weights.homepage;
  if (repo.license) score += weights.license;
  if (repo.has_issues) score += weights.issues;
  if (repo.size > 100) score += weights.size;

  return Math.min(100, score);
}

function calculatePopularity(repo: GitHubRepository): number {
  // Weighted scoring system
  const starWeight = 10;
  const forkWeight = 5;
  const watcherWeight = 3;
  const sizeWeight = 0.01;

  const score =
    repo.stargazers_count * starWeight +
    repo.forks_count * forkWeight +
    repo.watchers_count * watcherWeight +
    Math.min(repo.size * sizeWeight, 100); // Cap size contribution

  return Math.round(score);
}

function extractScreenshots(readme?: string | null): string[] {
  if (!readme) return [];

  const imageRegex = /!\[.*?\]\((.*?)\)/g;
  const screenshots: string[] = [];
  let match;

  while ((match = imageRegex.exec(readme)) !== null) {
    const imageUrl = match[1];
    if (imageUrl && !imageUrl.includes('badge') && !imageUrl.includes('shield')) {
      screenshots.push(imageUrl);
    }
  }

  return screenshots;
}