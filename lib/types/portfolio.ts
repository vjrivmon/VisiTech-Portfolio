// Portfolio domain types
export interface Project {
  // Basic Info
  id: string; // GitHub repo name as slug
  name: string;
  displayName: string; // Formatted name
  description: string | null;
  url: string; // GitHub URL
  homepage: string | null; // Live demo URL

  // Classification
  category: ProjectCategory;
  featured: boolean;
  status: ProjectStatus;
  visibility: 'public' | 'private';

  // Technical Details
  primaryLanguage: string | null;
  languages: Language[];
  techStack: Technology[];
  topics: string[];

  // Content
  readme: string | null; // HTML processed
  readmeRaw: string | null; // Original markdown
  screenshots: string[];

  // Metrics
  stars: number;
  forks: number;
  openIssues: number;
  size: number; // KB

  // Activity
  createdAt: Date;
  updatedAt: Date;
  lastCommit: Date | null;
  commits: number;
  contributors: Contributor[];

  // Computed Fields
  activityLevel: 'active' | 'maintained' | 'dormant' | 'archived';
  completeness: number; // 0-100 percentage
  popularity: number; // Calculated score
}

export type ProjectCategory =
  | 'ai-robotics'    // AI, ML, Robotics, Computer Vision
  | 'iot'            // Internet of Things, Hardware, Sensors
  | 'games'          // Game Development, Unity, 3D
  | 'web'            // Web Applications, Full-stack
  | 'mobile'         // Mobile Apps, Android, iOS
  | 'devops'         // DevOps, CI/CD, Infrastructure
  | 'saas'           // Software as a Service
  | 'tools'          // Developer Tools, Libraries
  | 'academic'       // University Projects, Assignments
  | 'experimental'   // Experiments, Prototypes
  | 'other';         // Uncategorized

export type ProjectStatus =
  | 'active'         // Currently being developed
  | 'completed'      // Finished project
  | 'paused'         // Temporarily on hold
  | 'archived';      // No longer maintained

export interface Language {
  name: string;
  percentage: number;
  bytes: number;
  color: string; // GitHub language color
}

export interface Technology {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'database' | 'cloud';
  icon?: string; // Icon URL or component name
}

export interface Contributor {
  username: string;
  avatarUrl: string;
  profileUrl: string;
  contributions: number;
  role?: string; // Owner, Collaborator, Contributor
}

export interface ProjectMetadata {
  totalProjects: number;
  publicProjects: number;
  featuredProjects: number;
  activeProjects: number;

  categoryCounts: Record<ProjectCategory, number>;
  languageCounts: Record<string, number>;
  topTechnologies: Technology[];

  totalStars: number;
  totalForks: number;
  totalContributors: number;

  lastUpdated: Date;
  lastFetch: Date;
}

// Featured projects configuration
export const FEATURED_PROJECTS = [
  'aidguide_04',      // Active robotics project
  'neurospot',        // AI/Health TDAH detection
  'aura-backend',     // Voice-guided app for blind
  'vimyp',            // Environmental project
  'poligames',        // Game development
  'ecocity',          // IoT smart city
  'osyris-web',       // Recent web project
  'sustainability-web' // Recent React project
];

// Skills and Technologies
export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'language' | 'framework' | 'tool' | 'soft';
  projects?: number; // Number of projects using this skill
  icon?: string;
}

export interface TimelineItem {
  id: string;
  year: number;
  title: string;
  description: string;
  category: 'education' | 'project' | 'achievement' | 'work';
  icon?: string;
  link?: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  icon?: string;
  link?: string;
}