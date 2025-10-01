import { Project, Technology } from '@/lib/types/portfolio';

// Mock technology stacks
const techStacks = {
  reactApp: [
    { name: 'React', category: 'framework' as const, icon: '⚛️' },
    { name: 'TypeScript', category: 'language' as const, icon: '📘' },
    { name: 'Tailwind CSS', category: 'framework' as const, icon: '🎨' },
    { name: 'Next.js', category: 'framework' as const, icon: '▲' },
    { name: 'Vercel', category: 'cloud' as const, icon: '🚀' }
  ] as Technology[],
  nodeApi: [
    { name: 'Node.js', category: 'framework' as const, icon: '🟢' },
    { name: 'Express', category: 'framework' as const, icon: '🚂' },
    { name: 'PostgreSQL', category: 'database' as const, icon: '🐘' },
    { name: 'Docker', category: 'cloud' as const, icon: '🐋' },
    { name: 'AWS', category: 'cloud' as const, icon: '☁️' }
  ] as Technology[],
  pythonML: [
    { name: 'Python', category: 'language' as const, icon: '🐍' },
    { name: 'TensorFlow', category: 'framework' as const, icon: '🧠' },
    { name: 'NumPy', category: 'tool' as const, icon: '🔢' },
    { name: 'Pandas', category: 'tool' as const, icon: '🐼' },
    { name: 'Jupyter', category: 'tool' as const, icon: '📊' }
  ] as Technology[],
  devOps: [
    { name: 'Kubernetes', category: 'cloud' as const, icon: '☸️' },
    { name: 'Terraform', category: 'tool' as const, icon: '🏗️' },
    { name: 'GitHub Actions', category: 'tool' as const, icon: '🔄' },
    { name: 'Prometheus', category: 'tool' as const, icon: '📈' },
    { name: 'Grafana', category: 'tool' as const, icon: '📊' }
  ] as Technology[]
} satisfies Record<string, Technology[]>;

export const mockProjects: Project[] = [
  {
    id: 'visitech-portfolio',
    name: 'visitech-portfolio',
    displayName: 'Personal Portfolio',
    description: 'A modern, responsive portfolio website built with Next.js 14 and TypeScript. Features dark mode, internationalization, and dynamic project showcase from GitHub.',
    url: 'https://github.com/vjrivmon/visitech-portfolio',
    homepage: 'https://visitech.dev',
    category: 'web' as const,
    featured: true,
    visibility: 'public',
    status: 'active',

    techStack: techStacks.reactApp,
    languages: [
      { name: 'TypeScript', percentage: 65, bytes: 0, color: '#3178c6' },
      { name: 'CSS', percentage: 20, bytes: 0, color: '#563d7c' },
      { name: 'JavaScript', percentage: 10, bytes: 0, color: '#f1e05a' },
      { name: 'HTML', percentage: 5, bytes: 0, color: '#e34c26' }
    ],
    primaryLanguage: 'TypeScript',

    topics: ['portfolio', 'nextjs', 'react', 'typescript', 'tailwindcss'],

    readme: null,
    readmeRaw: null,
    screenshots: [],

    stars: 12,
    forks: 3,
    openIssues: 0,
    size: 0,

    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-28'),
    lastCommit: new Date('2024-01-28'),
    commits: 0,
    contributors: [],

    activityLevel: 'active',
    completeness: 90,
    popularity: 85
  },

  {
    id: 'cloud-infrastructure',
    name: 'cloud-infrastructure',
    displayName: 'Cloud Infrastructure Automation',
    description: 'Terraform modules and Kubernetes configurations for multi-cloud infrastructure deployment. Includes CI/CD pipelines and monitoring setup.',
    url: 'https://github.com/vjrivmon/cloud-infrastructure',
    homepage: 'https://docs.example.com/cloud-infra',
    category: 'devops' as const,
    featured: true,
    visibility: 'public',
    status: 'active',

    techStack: techStacks.devOps,
    languages: [
      { name: 'HCL', percentage: 45, bytes: 0, color: '#844FBA' },
      { name: 'YAML', percentage: 30, bytes: 0, color: '#cb171e' },
      { name: 'Shell', percentage: 15, bytes: 0, color: '#89e051' },
      { name: 'Python', percentage: 10, bytes: 0, color: '#3572A5' }
    ],
    primaryLanguage: 'HCL',

    topics: ['terraform', 'kubernetes', 'aws', 'devops', 'infrastructure'],

    readme: null,
    readmeRaw: null,
    screenshots: [],

    stars: 45,
    forks: 12,
    openIssues: 2,
    size: 0,

    createdAt: new Date('2023-10-01'),
    updatedAt: new Date('2024-01-20'),
    lastCommit: new Date('2024-01-20'),
    commits: 0,
    contributors: [],

    activityLevel: 'active',
    completeness: 95,
    popularity: 78
  },

  {
    id: 'ml-prediction-engine',
    name: 'ml-prediction-engine',
    displayName: 'ML Prediction Engine',
    description: 'Machine learning pipeline for real-time predictions. Features data preprocessing, model training, and REST API for inference.',
    url: 'https://github.com/vjrivmon/ml-prediction-engine',
    homepage: 'https://ml-demo.example.com',
    category: 'ai-robotics' as const,
    featured: true,
    visibility: 'public',
    status: 'active',

    techStack: techStacks.pythonML,
    languages: [
      { name: 'Python', percentage: 75, bytes: 0, color: '#3572A5' },
      { name: 'Jupyter Notebook', percentage: 15, bytes: 0, color: '#DA5B0B' },
      { name: 'Dockerfile', percentage: 5, bytes: 0, color: '#384d54' },
      { name: 'Shell', percentage: 5, bytes: 0, color: '#89e051' }
    ],
    primaryLanguage: 'Python',

    topics: ['machine-learning', 'python', 'tensorflow', 'api', 'docker'],

    readme: null,
    readmeRaw: null,
    screenshots: [],

    stars: 67,
    forks: 23,
    openIssues: 5,
    size: 0,

    createdAt: new Date('2023-11-15'),
    updatedAt: new Date('2024-01-25'),
    lastCommit: new Date('2024-01-25'),
    commits: 0,
    contributors: [],

    activityLevel: 'active',
    completeness: 88,
    popularity: 82
  },

  {
    id: 'e-commerce-platform',
    name: 'e-commerce-platform',
    displayName: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with React frontend and Node.js backend. Includes payment processing, inventory management, and admin dashboard.',
    url: 'https://github.com/vjrivmon/e-commerce-platform',
    homepage: 'https://shop.example.com',
    category: 'web' as const,
    featured: false,
    visibility: 'public',
    status: 'active',

    techStack: techStacks.nodeApi,
    languages: [
      { name: 'JavaScript', percentage: 60, bytes: 0, color: '#f1e05a' },
      { name: 'TypeScript', percentage: 30, bytes: 0, color: '#3178c6' },
      { name: 'CSS', percentage: 10, bytes: 0, color: '#563d7c' }
    ],
    primaryLanguage: 'JavaScript',

    topics: ['ecommerce', 'nodejs', 'react', 'postgresql', 'stripe'],

    readme: null,
    readmeRaw: null,
    screenshots: [],

    stars: 89,
    forks: 34,
    openIssues: 8,
    size: 0,

    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2024-01-22'),
    lastCommit: new Date('2024-01-22'),
    commits: 0,
    contributors: [],

    activityLevel: 'active',
    completeness: 92,
    popularity: 88
  },

  {
    id: 'mobile-task-manager',
    name: 'mobile-task-manager',
    displayName: 'Mobile Task Manager',
    description: 'Cross-platform mobile app built with React Native. Features task management, reminders, and team collaboration.',
    url: 'https://github.com/vjrivmon/mobile-task-manager',
    homepage: 'https://play.google.com/store/apps/example',
    category: 'mobile' as const,
    featured: false,
    visibility: 'public',
    status: 'active',

    techStack: [
      { name: 'React Native', category: 'framework' as const, icon: '📱' },
      { name: 'TypeScript', category: 'language' as const, icon: '📘' },
      { name: 'Redux', category: 'framework' as const, icon: '🔄' },
      { name: 'Firebase', category: 'framework' as const, icon: '🔥' },
      { name: 'Expo', category: 'tool' as const, icon: '📦' }
    ],
    languages: [
      { name: 'TypeScript', percentage: 70, bytes: 0, color: '#3178c6' },
      { name: 'JavaScript', percentage: 20, bytes: 0, color: '#f1e05a' },
      { name: 'Java', percentage: 5, bytes: 0, color: '#b07219' },
      { name: 'Swift', percentage: 5, bytes: 0, color: '#FA7343' }
    ],
    primaryLanguage: 'TypeScript',

    topics: ['react-native', 'mobile', 'typescript', 'firebase', 'expo'],

    readme: null,
    readmeRaw: null,
    screenshots: [],

    stars: 56,
    forks: 18,
    openIssues: 3,
    size: 0,

    createdAt: new Date('2023-11-01'),
    updatedAt: new Date('2024-01-18'),
    lastCommit: new Date('2024-01-18'),
    commits: 0,
    contributors: [],

    activityLevel: 'active',
    completeness: 85,
    popularity: 75
  },

  {
    id: 'data-analytics-dashboard',
    name: 'data-analytics-dashboard',
    displayName: 'Data Analytics Dashboard',
    description: 'Real-time analytics dashboard with data visualization. Built with D3.js and supports multiple data sources.',
    url: 'https://github.com/vjrivmon/data-analytics-dashboard',
    homepage: 'https://analytics-demo.example.com',
    category: 'tools' as const,
    featured: false,
    visibility: 'public',
    status: 'active',

    techStack: [
      { name: 'React', category: 'framework' as const, icon: '⚛️' },
      { name: 'D3.js', category: 'tool' as const, icon: '📊' },
      { name: 'Node.js', category: 'framework' as const, icon: '🟢' },
      { name: 'MongoDB', category: 'database' as const, icon: '🍃' },
      { name: 'Redis', category: 'database' as const, icon: '🔴' }
    ],
    languages: [
      { name: 'JavaScript', percentage: 55, bytes: 0, color: '#f1e05a' },
      { name: 'TypeScript', percentage: 35, bytes: 0, color: '#3178c6' },
      { name: 'CSS', percentage: 10, bytes: 0, color: '#563d7c' }
    ],
    primaryLanguage: 'JavaScript',

    topics: ['analytics', 'dashboard', 'd3js', 'visualization', 'react'],

    readme: null,
    readmeRaw: null,
    screenshots: [],

    stars: 72,
    forks: 28,
    openIssues: 4,
    size: 0,

    createdAt: new Date('2023-10-15'),
    updatedAt: new Date('2024-01-24'),
    lastCommit: new Date('2024-01-24'),
    commits: 0,
    contributors: [],

    activityLevel: 'active',
    completeness: 87,
    popularity: 79
  }
];

// Export a function to get all projects
export function getMockProjects(): Project[] {
  return mockProjects;
}

// Export a function to get featured projects
export function getFeaturedMockProjects(): Project[] {
  return mockProjects.filter(p => p.featured);
}

// Export a function to get project by ID
export function getMockProjectById(id: string): Project | undefined {
  return mockProjects.find(p => p.id === id);
}