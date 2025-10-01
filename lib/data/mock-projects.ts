import { Project, Technology } from '@/lib/types/portfolio';

// Mock technology stacks
const techStacks: Record<string, Technology[]> = {
  reactApp: [
    { name: 'React', category: 'framework', icon: '⚛️' },
    { name: 'TypeScript', category: 'language', icon: '📘' },
    { name: 'Tailwind CSS', category: 'framework', icon: '🎨' },
    { name: 'Next.js', category: 'framework', icon: '▲' },
    { name: 'Vercel', category: 'cloud', icon: '🚀' }
  ],
  nodeApi: [
    { name: 'Node.js', category: 'framework', icon: '🟢' },
    { name: 'Express', category: 'framework', icon: '🚂' },
    { name: 'PostgreSQL', category: 'database', icon: '🐘' },
    { name: 'Docker', category: 'cloud', icon: '🐋' },
    { name: 'AWS', category: 'cloud', icon: '☁️' }
  ],
  pythonML: [
    { name: 'Python', category: 'language', icon: '🐍' },
    { name: 'TensorFlow', category: 'framework', icon: '🧠' },
    { name: 'NumPy', category: 'tool', icon: '🔢' },
    { name: 'Pandas', category: 'tool', icon: '🐼' },
    { name: 'Jupyter', category: 'tools', icon: '📊' }
  ],
  devOps: [
    { name: 'Kubernetes', category: 'cloud', icon: '☸️' },
    { name: 'Terraform', category: 'infrastructure', icon: '🏗️' },
    { name: 'GitHub Actions', category: 'ci/cd', icon: '🔄' },
    { name: 'Prometheus', category: 'monitoring', icon: '📈' },
    { name: 'Grafana', category: 'monitoring', icon: '📊' }
  ]
};

export const mockProjects: Project[] = [
  {
    id: 'visitech-portfolio',
    name: 'visitech-portfolio',
    displayName: 'Personal Portfolio',
    description: 'A modern, responsive portfolio website built with Next.js 14 and TypeScript. Features dark mode, internationalization, and dynamic project showcase from GitHub.',
    longDescription: `A comprehensive portfolio website showcasing my professional work and technical expertise.

Built with modern web technologies and best practices:
- **Server-side rendering** for optimal performance
- **Responsive design** that works on all devices
- **Dark/Light theme** with system preference detection
- **Multi-language support** (English/Spanish)
- **Dynamic content** fetched from GitHub API
- **Optimized images** and lazy loading
- **Accessibility** features throughout`,
    category: 'web' as const,
    featured: true,
    visibility: 'public',
    status: 'active',
    priority: 1,

    techStack: techStacks.reactApp,
    languages: [
      { name: 'TypeScript', percentage: 65, color: '#3178c6' },
      { name: 'CSS', percentage: 20, color: '#563d7c' },
      { name: 'JavaScript', percentage: 10, color: '#f1e05a' },
      { name: 'HTML', percentage: 5, color: '#e34c26' }
    ],
    primaryLanguage: 'TypeScript',

    topics: ['portfolio', 'nextjs', 'react', 'typescript', 'tailwindcss'],

    repository: {
      url: 'https://github.com/vjrivmon/visitech-portfolio',
      isTemplate: false,
      defaultBranch: 'main'
    },

    links: {
      live: 'https://visitech.dev',
      demo: 'https://visitech.dev'
    },

    metrics: {
      complexity: 'medium',
      maintainability: 'high',
      completeness: 90,
      qualityScore: 88
    },

    team: {
      size: 1,
      role: 'Lead Developer',
      responsibilities: ['Full-stack development', 'UI/UX Design', 'Deployment']
    },

    timeline: {
      duration: '2 weeks',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-29')
    },

    images: ['/api/placeholder/800/600', '/api/placeholder/800/600'],

    stars: 12,
    forks: 3,
    openIssues: 0,
    watchers: 5,

    popularity: 85,

    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-28'),
    pushedAt: new Date('2024-01-28')
  },

  {
    id: 'cloud-infrastructure',
    name: 'cloud-infrastructure',
    displayName: 'Cloud Infrastructure Automation',
    description: 'Terraform modules and Kubernetes configurations for multi-cloud infrastructure deployment. Includes CI/CD pipelines and monitoring setup.',
    longDescription: `Enterprise-grade infrastructure automation solution for multi-cloud deployments.

Key features:
- **Multi-cloud support** (AWS, Azure, GCP)
- **Infrastructure as Code** with Terraform
- **Kubernetes orchestration** for container management
- **Automated CI/CD** with GitHub Actions
- **Comprehensive monitoring** with Prometheus and Grafana
- **Security scanning** and compliance checks
- **Cost optimization** recommendations`,
    category: 'devops' as const,
    featured: true,
    visibility: 'public',
    status: 'active',
    priority: 2,

    techStack: techStacks.devOps,
    languages: [
      { name: 'HCL', percentage: 45, color: '#844FBA' },
      { name: 'YAML', percentage: 30, color: '#cb171e' },
      { name: 'Shell', percentage: 15, color: '#89e051' },
      { name: 'Python', percentage: 10, color: '#3572A5' }
    ],
    primaryLanguage: 'HCL',

    topics: ['terraform', 'kubernetes', 'aws', 'devops', 'infrastructure'],

    repository: {
      url: 'https://github.com/vjrivmon/cloud-infrastructure',
      isTemplate: true,
      defaultBranch: 'main'
    },

    links: {
      documentation: 'https://docs.example.com/cloud-infra'
    },

    metrics: {
      complexity: 'high',
      maintainability: 'high',
      completeness: 95,
      qualityScore: 92
    },

    team: {
      size: 3,
      role: 'DevOps Lead',
      responsibilities: ['Architecture', 'Automation', 'Security']
    },

    timeline: {
      duration: '3 months',
      startDate: new Date('2023-10-01'),
      endDate: new Date('2023-12-31')
    },

    images: ['/api/placeholder/800/600'],

    stars: 45,
    forks: 12,
    openIssues: 2,
    watchers: 18,

    popularity: 78,

    createdAt: new Date('2023-10-01'),
    updatedAt: new Date('2024-01-20'),
    pushedAt: new Date('2024-01-20')
  },

  {
    id: 'ml-prediction-engine',
    name: 'ml-prediction-engine',
    displayName: 'ML Prediction Engine',
    description: 'Machine learning pipeline for real-time predictions. Features data preprocessing, model training, and REST API for inference.',
    longDescription: `Production-ready machine learning system for real-time predictions.

Capabilities:
- **Real-time inference** with sub-second latency
- **Auto-scaling** based on load
- **Model versioning** and A/B testing
- **Data preprocessing** pipeline
- **Feature engineering** automation
- **Model monitoring** and drift detection
- **REST and gRPC APIs** for integration`,
    category: 'ai-robotics' as const,
    featured: true,
    visibility: 'public',
    status: 'active',
    priority: 3,

    techStack: techStacks.pythonML,
    languages: [
      { name: 'Python', percentage: 75, color: '#3572A5' },
      { name: 'Jupyter Notebook', percentage: 15, color: '#DA5B0B' },
      { name: 'Dockerfile', percentage: 5, color: '#384d54' },
      { name: 'Shell', percentage: 5, color: '#89e051' }
    ],
    primaryLanguage: 'Python',

    topics: ['machine-learning', 'python', 'tensorflow', 'api', 'docker'],

    repository: {
      url: 'https://github.com/vjrivmon/ml-prediction-engine',
      isTemplate: false,
      defaultBranch: 'main'
    },

    links: {
      documentation: 'https://ml-docs.example.com',
      demo: 'https://ml-demo.example.com'
    },

    metrics: {
      complexity: 'high',
      maintainability: 'medium',
      completeness: 88,
      qualityScore: 85
    },

    team: {
      size: 2,
      role: 'ML Engineer',
      responsibilities: ['Model Development', 'Pipeline Design', 'API Development']
    },

    timeline: {
      duration: '6 weeks',
      startDate: new Date('2023-11-15'),
      endDate: new Date('2023-12-31')
    },

    images: ['/api/placeholder/800/600'],

    stars: 67,
    forks: 23,
    openIssues: 5,
    watchers: 31,

    popularity: 82,

    createdAt: new Date('2023-11-15'),
    updatedAt: new Date('2024-01-25'),
    pushedAt: new Date('2024-01-25')
  },

  {
    id: 'e-commerce-platform',
    name: 'e-commerce-platform',
    displayName: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with React frontend and Node.js backend. Includes payment processing, inventory management, and admin dashboard.',
    longDescription: `Complete e-commerce platform with modern architecture and features.

Features:
- **Product catalog** with advanced search
- **Shopping cart** and wishlist
- **Secure checkout** with Stripe integration
- **Order management** and tracking
- **Admin dashboard** for inventory control
- **Customer reviews** and ratings
- **Email notifications** and SMS alerts`,
    category: 'web' as const,
    featured: false,
    visibility: 'public',
    status: 'active',
    priority: 4,

    techStack: techStacks.nodeApi,
    languages: [
      { name: 'JavaScript', percentage: 60, color: '#f1e05a' },
      { name: 'TypeScript', percentage: 30, color: '#3178c6' },
      { name: 'CSS', percentage: 10, color: '#563d7c' }
    ],
    primaryLanguage: 'JavaScript',

    topics: ['ecommerce', 'nodejs', 'react', 'postgresql', 'stripe'],

    repository: {
      url: 'https://github.com/vjrivmon/e-commerce-platform',
      isTemplate: false,
      defaultBranch: 'main'
    },

    links: {
      live: 'https://shop.example.com',
      documentation: 'https://docs.shop.example.com'
    },

    metrics: {
      complexity: 'high',
      maintainability: 'high',
      completeness: 92,
      qualityScore: 90
    },

    team: {
      size: 4,
      role: 'Full-Stack Developer',
      responsibilities: ['Backend Development', 'API Design', 'Database Design']
    },

    timeline: {
      duration: '4 months',
      startDate: new Date('2023-09-01'),
      endDate: new Date('2023-12-31')
    },

    images: ['/api/placeholder/800/600'],

    stars: 89,
    forks: 34,
    openIssues: 8,
    watchers: 42,

    popularity: 88,

    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2024-01-22'),
    pushedAt: new Date('2024-01-22')
  },

  {
    id: 'mobile-task-manager',
    name: 'mobile-task-manager',
    displayName: 'Mobile Task Manager',
    description: 'Cross-platform mobile app built with React Native. Features task management, reminders, and team collaboration.',
    longDescription: `Productivity app for managing tasks and team collaboration.

Key features:
- **Task creation** and organization
- **Project management** with milestones
- **Team collaboration** and chat
- **Push notifications** for reminders
- **Offline support** with sync
- **Calendar integration**
- **Time tracking** and reports`,
    category: 'mobile' as const,
    featured: false,
    visibility: 'public',
    status: 'active',
    priority: 5,

    techStack: [
      { name: 'React Native', category: 'mobile', icon: '📱' },
      { name: 'TypeScript', category: 'language', icon: '📘' },
      { name: 'Redux', category: 'state', icon: '🔄' },
      { name: 'Firebase', category: 'framework', icon: '🔥' },
      { name: 'Expo', category: 'tools', icon: '📦' }
    ],
    languages: [
      { name: 'TypeScript', percentage: 70, color: '#3178c6' },
      { name: 'JavaScript', percentage: 20, color: '#f1e05a' },
      { name: 'Java', percentage: 5, color: '#b07219' },
      { name: 'Swift', percentage: 5, color: '#FA7343' }
    ],
    primaryLanguage: 'TypeScript',

    topics: ['react-native', 'mobile', 'typescript', 'firebase', 'expo'],

    repository: {
      url: 'https://github.com/vjrivmon/mobile-task-manager',
      isTemplate: false,
      defaultBranch: 'main'
    },

    links: {
      playStore: 'https://play.google.com/store/apps/example',
      appStore: 'https://apps.apple.com/app/example'
    },

    metrics: {
      complexity: 'medium',
      maintainability: 'high',
      completeness: 85,
      qualityScore: 87
    },

    team: {
      size: 2,
      role: 'Mobile Developer',
      responsibilities: ['App Development', 'UI Design', 'Testing']
    },

    timeline: {
      duration: '2 months',
      startDate: new Date('2023-11-01'),
      endDate: new Date('2023-12-31')
    },

    images: ['/api/placeholder/800/600'],

    stars: 56,
    forks: 18,
    openIssues: 3,
    watchers: 24,

    popularity: 75,

    createdAt: new Date('2023-11-01'),
    updatedAt: new Date('2024-01-18'),
    pushedAt: new Date('2024-01-18')
  },

  {
    id: 'data-analytics-dashboard',
    name: 'data-analytics-dashboard',
    displayName: 'Data Analytics Dashboard',
    description: 'Real-time analytics dashboard with data visualization. Built with D3.js and supports multiple data sources.',
    longDescription: `Comprehensive analytics platform for business intelligence.

Features:
- **Real-time data** processing
- **Interactive visualizations** with D3.js
- **Custom dashboards** and widgets
- **Data export** in multiple formats
- **Scheduled reports** via email
- **Role-based access** control
- **API integration** with various sources`,
    category: 'tools' as const,
    featured: false,
    visibility: 'public',
    status: 'active',
    priority: 6,

    techStack: [
      { name: 'React', category: 'framework', icon: '⚛️' },
      { name: 'D3.js', category: 'visualization', icon: '📊' },
      { name: 'Node.js', category: 'framework', icon: '🟢' },
      { name: 'MongoDB', category: 'database', icon: '🍃' },
      { name: 'Redis', category: 'cache', icon: '🔴' }
    ],
    languages: [
      { name: 'JavaScript', percentage: 55, color: '#f1e05a' },
      { name: 'TypeScript', percentage: 35, color: '#3178c6' },
      { name: 'CSS', percentage: 10, color: '#563d7c' }
    ],
    primaryLanguage: 'JavaScript',

    topics: ['analytics', 'dashboard', 'd3js', 'visualization', 'react'],

    repository: {
      url: 'https://github.com/vjrivmon/data-analytics-dashboard',
      isTemplate: false,
      defaultBranch: 'main'
    },

    links: {
      demo: 'https://analytics-demo.example.com',
      documentation: 'https://docs.analytics.example.com'
    },

    metrics: {
      complexity: 'medium',
      maintainability: 'high',
      completeness: 87,
      qualityScore: 86
    },

    team: {
      size: 3,
      role: 'Frontend Developer',
      responsibilities: ['UI Development', 'Data Visualization', 'Performance Optimization']
    },

    timeline: {
      duration: '10 weeks',
      startDate: new Date('2023-10-15'),
      endDate: new Date('2023-12-24')
    },

    images: ['/api/placeholder/800/600'],

    stars: 72,
    forks: 28,
    openIssues: 4,
    watchers: 35,

    popularity: 79,

    createdAt: new Date('2023-10-15'),
    updatedAt: new Date('2024-01-24'),
    pushedAt: new Date('2024-01-24')
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