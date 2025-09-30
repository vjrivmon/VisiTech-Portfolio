# Backend API Architecture Design - ViSiTech Portfolio

**Document Version**: 1.0.0
**Created**: 2025-10-01
**Author**: Backend Planner Agent
**Project**: ViSiTech Portfolio - Vicente Rivas Monferrer

---

## Executive Summary

This document defines the complete backend architecture for the ViSiTech portfolio, focusing on GitHub API integration, data processing pipelines, caching strategies, and API routes. The architecture prioritizes performance through multi-level caching, reliability through comprehensive error handling, and maintainability through clean TypeScript interfaces.

The system is designed to automatically fetch, process, and serve data from 33+ GitHub repositories, with intelligent classification, featured project detection, and real-time updates through webhooks.

---

## 1. GitHub API Client Architecture

### 1.1 Core Client Design

```typescript
// lib/github/client.ts

class GitHubClient {
  private token: string
  private baseURL: string = 'https://api.github.com'
  private username: string = 'vjrivmon'
  private rateLimiter: RateLimiter
  private cache: CacheManager

  constructor() {
    this.token = process.env.GITHUB_TOKEN!
    this.rateLimiter = new RateLimiter(5000, 3600000) // 5000 req/hour
    this.cache = new CacheManager()
  }

  // Core API methods
  async getRepositories(options?: FetchOptions): Promise<Repository[]>
  async getRepository(name: string): Promise<Repository>
  async getReadme(repo: string): Promise<string>
  async getLanguages(repo: string): Promise<Languages>
  async getCommits(repo: string, limit?: number): Promise<Commit[]>
  async getContributors(repo: string): Promise<Contributor[]>
  async getTopics(repo: string): Promise<string[]>
  async getRateLimit(): Promise<RateLimit>
}
```

### 1.2 Authentication Strategy

```typescript
// Authentication Configuration
interface AuthConfig {
  token: string // Personal Access Token from GITHUB_TOKEN env
  headers: {
    'Authorization': 'Bearer ${token}'
    'Accept': 'application/vnd.github.v3+json'
    'X-GitHub-Api-Version': '2022-11-28'
  }
}

// Token validation on startup
async function validateToken(): Promise<boolean> {
  try {
    const response = await fetch('/user', { headers })
    return response.status === 200
  } catch {
    throw new Error('Invalid GITHUB_TOKEN')
  }
}
```

### 1.3 Rate Limiting Implementation

```typescript
// lib/github/rate-limiter.ts

class RateLimiter {
  private requests: number[] = []
  private limit: number
  private window: number // milliseconds

  constructor(limit: number, window: number) {
    this.limit = limit
    this.window = window
  }

  async checkLimit(): Promise<boolean> {
    const now = Date.now()
    // Remove requests outside window
    this.requests = this.requests.filter(t => t > now - this.window)

    if (this.requests.length >= this.limit) {
      const resetTime = this.requests[0] + this.window
      const waitTime = resetTime - now

      // Implement exponential backoff
      await this.backoff(waitTime)
      return false
    }

    this.requests.push(now)
    return true
  }

  private async backoff(baseWait: number): Promise<void> {
    const jitter = Math.random() * 1000
    const waitTime = Math.min(baseWait + jitter, 60000) // Max 1 minute
    await new Promise(resolve => setTimeout(resolve, waitTime))
  }
}
```

### 1.4 API Endpoints Mapping

| Endpoint | Method | Purpose | Cache TTL |
|----------|--------|---------|-----------|
| `/users/vjrivmon/repos` | GET | List all repositories | 1 hour |
| `/repos/vjrivmon/{repo}` | GET | Get repository details | 1 hour |
| `/repos/vjrivmon/{repo}/readme` | GET | Get README content | 24 hours |
| `/repos/vjrivmon/{repo}/languages` | GET | Get language statistics | 1 week |
| `/repos/vjrivmon/{repo}/commits` | GET | Get recent commits | 30 minutes |
| `/repos/vjrivmon/{repo}/contributors` | GET | Get contributors | 1 day |
| `/repos/vjrivmon/{repo}/topics` | GET | Get repository topics | 1 day |
| `/rate_limit` | GET | Check rate limit status | Real-time |

---

## 2. Type Definitions

### 2.1 GitHub API Types

```typescript
// lib/types/github.ts

// Raw GitHub API response types
interface GitHubRepository {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: GitHubOwner
  html_url: string
  description: string | null
  fork: boolean
  created_at: string
  updated_at: string
  pushed_at: string
  homepage: string | null
  size: number
  stargazers_count: number
  watchers_count: number
  language: string | null
  has_issues: boolean
  has_projects: boolean
  has_downloads: boolean
  has_wiki: boolean
  has_pages: boolean
  forks_count: number
  archived: boolean
  disabled: boolean
  open_issues_count: number
  license: GitHubLicense | null
  topics: string[]
  visibility: string
  default_branch: string
}

interface GitHubOwner {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  type: string
  site_admin: boolean
}

interface GitHubLicense {
  key: string
  name: string
  spdx_id: string
  url: string | null
  node_id: string
}

interface GitHubReadme {
  type: string
  encoding: string
  size: number
  name: string
  path: string
  content: string // base64 encoded
  sha: string
  url: string
  git_url: string
  html_url: string
  download_url: string
}

interface GitHubLanguages {
  [language: string]: number // bytes of code
}

interface GitHubCommit {
  sha: string
  node_id: string
  commit: {
    author: {
      name: string
      email: string
      date: string
    }
    committer: {
      name: string
      email: string
      date: string
    }
    message: string
    tree: { sha: string; url: string }
    url: string
    comment_count: number
    verification: {
      verified: boolean
      reason: string
      signature: string | null
      payload: string | null
    }
  }
  url: string
  html_url: string
  author: GitHubOwner | null
  committer: GitHubOwner | null
  parents: Array<{ sha: string; url: string; html_url: string }>
}

interface GitHubContributor {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  type: string
  site_admin: boolean
  contributions: number
}
```

### 2.2 Portfolio Domain Types

```typescript
// lib/types/portfolio.ts

// Processed domain types
export interface Project {
  // Basic Info
  id: string // GitHub repo name as slug
  name: string
  displayName: string // Formatted name
  description: string | null
  url: string // GitHub URL
  homepage: string | null // Live demo URL

  // Classification
  category: ProjectCategory
  featured: boolean
  status: ProjectStatus
  visibility: 'public' | 'private'

  // Technical Details
  primaryLanguage: string | null
  languages: Language[]
  techStack: Technology[]
  topics: string[]

  // Content
  readme: string | null // HTML processed
  readmeRaw: string | null // Original markdown
  screenshots: string[]

  // Metrics
  stars: number
  forks: number
  openIssues: number
  size: number // KB

  // Activity
  createdAt: Date
  updatedAt: Date
  lastCommit: Date | null
  commits: number
  contributors: Contributor[]

  // Computed Fields
  activityLevel: 'active' | 'maintained' | 'dormant' | 'archived'
  completeness: number // 0-100 percentage
  popularity: number // Calculated score
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
  | 'other'          // Uncategorized

export type ProjectStatus =
  | 'active'         // Currently being developed
  | 'completed'      // Finished project
  | 'paused'         // Temporarily on hold
  | 'archived'       // No longer maintained

export interface Language {
  name: string
  percentage: number
  bytes: number
  color: string // GitHub language color
}

export interface Technology {
  name: string
  category: 'language' | 'framework' | 'tool' | 'database' | 'cloud'
  icon?: string // Icon URL or component name
}

export interface Contributor {
  username: string
  avatarUrl: string
  profileUrl: string
  contributions: number
  role?: string // Owner, Collaborator, Contributor
}

export interface ProjectMetadata {
  totalProjects: number
  publicProjects: number
  featuredProjects: number
  activeProjects: number

  categoryCounts: Record<ProjectCategory, number>
  languageCounts: Record<string, number>
  topTechnologies: Technology[]

  totalStars: number
  totalForks: number
  totalContributors: number

  lastUpdated: Date
  lastFetch: Date
}
```

### 2.3 API Response Types

```typescript
// lib/types/api.ts

// API route response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: ApiError
  metadata?: ResponseMetadata
}

export interface ApiError {
  code: string
  message: string
  details?: unknown
  timestamp: Date
}

export interface ResponseMetadata {
  timestamp: Date
  cached: boolean
  cacheAge?: number // seconds
  rateLimit?: {
    limit: number
    remaining: number
    reset: Date
  }
}

export interface PaginatedResponse<T> {
  items: T[]
  pagination: {
    page: number
    limit: number
    total: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface ProjectsQueryParams {
  category?: ProjectCategory
  featured?: boolean
  status?: ProjectStatus
  language?: string
  search?: string
  sort?: 'stars' | 'updated' | 'created' | 'name'
  order?: 'asc' | 'desc'
  page?: number
  limit?: number
}
```

---

## 3. Data Processing Pipeline

### 3.1 Data Transformation Functions

```typescript
// lib/github/transforms.ts

// Main transformation pipeline
export async function transformRepository(
  raw: GitHubRepository,
  readme?: string,
  languages?: GitHubLanguages,
  commits?: GitHubCommit[]
): Promise<Project> {
  const processedReadme = readme ? await parseReadme(readme) : null
  const techStack = extractTechStack(raw, languages, readme)
  const category = classifyProject(raw, techStack)
  const featured = calculateFeatured(raw, category)
  const status = determineStatus(raw, commits)
  const activityLevel = calculateActivityLevel(raw, commits)

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
    topics: raw.topics,

    readme: processedReadme?.html || null,
    readmeRaw: processedReadme?.raw || null,
    screenshots: extractScreenshots(processedReadme?.raw),

    stars: raw.stargazers_count,
    forks: raw.forks_count,
    openIssues: raw.open_issues_count,
    size: raw.size,

    createdAt: new Date(raw.created_at),
    updatedAt: new Date(raw.updated_at),
    lastCommit: commits?.[0] ? new Date(commits[0].commit.author.date) : null,
    commits: commits?.length || 0,
    contributors: [], // Populated separately

    activityLevel,
    completeness: calculateCompleteness(raw, readme),
    popularity: calculatePopularity(raw)
  }
}
```

### 3.2 Classification Logic

```typescript
// lib/github/classifier.ts

export function classifyProject(
  repo: GitHubRepository,
  techStack: Technology[]
): ProjectCategory {
  const name = repo.name.toLowerCase()
  const topics = repo.topics.map(t => t.toLowerCase())
  const description = (repo.description || '').toLowerCase()

  // Priority classification rules
  const classificationRules: Array<[ProjectCategory, string[]]> = [
    // AI/Robotics
    ['ai-robotics', ['aidguide', 'neurospot', 'aura', 'ros', 'ros2', 'ai', 'ml',
                     'machine-learning', 'deep-learning', 'robotics', 'computer-vision',
                     'neural', 'tensorflow', 'pytorch', 'opencv', 'gazebo']],

    // IoT
    ['iot', ['ecocity', 'polihuerto', 'iot', 'arduino', 'raspberry', 'sensor',
             'mqtt', 'embedded', 'hardware', 'esp32', 'esp8266']],

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
             'web', 'website', 'frontend', 'backend', 'fullstack', 'api']],

    // Tools
    ['tools', ['cli', 'tool', 'utility', 'library', 'package', 'plugin',
               'extension', 'helper']],

    // Academic
    ['academic', ['sprint0', 'assignment', 'homework', 'course', 'university',
                  'upv', 'cdio', 'practice', 'lab']]
  ]

  // Check each rule in priority order
  for (const [category, keywords] of classificationRules) {
    const matches = keywords.filter(keyword =>
      name.includes(keyword) ||
      topics.includes(keyword) ||
      description.includes(keyword) ||
      techStack.some(tech => tech.name.toLowerCase().includes(keyword))
    )

    if (matches.length > 0) {
      return category
    }
  }

  // Check for experimental/portfolio projects
  if (name.includes('portfolio') || name.includes('test') ||
      name.includes('experiment') || name.includes('demo')) {
    return 'experimental'
  }

  return 'other'
}
```

### 3.3 Featured Project Detection

```typescript
// lib/github/featured.ts

export function calculateFeatured(
  repo: GitHubRepository,
  category: ProjectCategory
): boolean {
  const name = repo.name.toLowerCase()

  // Explicitly featured projects (from requirements)
  const featuredNames = [
    'aidguide_04',      // Active robotics project
    'neurospot',        // AI/Health TDAH detection
    'aura-backend',     // Voice-guided app for blind
    'vimyp',            // Environmental project
    'poligames',        // Game development
    'ecocity',          // IoT smart city
    'osyris-web',       // Recent web project
    'sustainability-web' // Recent React project
  ]

  if (featuredNames.some(featured => name.includes(featured))) {
    return true
  }

  // Auto-feature based on criteria
  const autoFeatureCriteria = {
    minStars: 5,
    recentActivity: 90, // days
    hasReadme: true,
    hasDescription: true,
    minSize: 100, // KB
    priorityCategories: ['ai-robotics', 'iot', 'saas'] as ProjectCategory[]
  }

  const daysSinceUpdate =
    (Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24)

  const meetsAutoCriteria =
    repo.stargazers_count >= autoFeatureCriteria.minStars &&
    daysSinceUpdate <= autoFeatureCriteria.recentActivity &&
    repo.description !== null &&
    repo.size >= autoFeatureCriteria.minSize &&
    autoFeatureCriteria.priorityCategories.includes(category)

  return meetsAutoCriteria
}
```

### 3.4 Tech Stack Extraction

```typescript
// lib/github/tech-extractor.ts

export function extractTechStack(
  repo: GitHubRepository,
  languages?: GitHubLanguages,
  readme?: string
): Technology[] {
  const techs = new Set<Technology>()

  // Extract from languages
  if (languages) {
    Object.keys(languages).forEach(lang => {
      techs.add({
        name: lang,
        category: 'language',
        icon: getLanguageIcon(lang)
      })
    })
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
    // Add more mappings...
  }

  repo.topics.forEach(topic => {
    if (topicMapping[topic.toLowerCase()]) {
      techs.add(topicMapping[topic.toLowerCase()])
    }
  })

  // Extract from README
  if (readme) {
    const techPatterns = [
      /built with ([^.]+)/gi,
      /tech(?:nologies|stack): ([^.]+)/gi,
      /using ([^.]+)/gi,
      /powered by ([^.]+)/gi
    ]

    techPatterns.forEach(pattern => {
      const matches = readme.matchAll(pattern)
      for (const match of matches) {
        // Parse and add technologies from matches
        const techList = match[1].split(/[,&]/).map(t => t.trim())
        techList.forEach(tech => {
          if (tech && tech.length < 30) { // Sanity check
            techs.add({
              name: tech,
              category: categorizeTech(tech)
            })
          }
        })
      }
    })
  }

  return Array.from(techs)
}
```

### 3.5 README Processing

```typescript
// lib/github/readme-processor.ts

import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import prism from 'remark-prism'

export async function parseReadme(
  content: string,
  repoUrl: string
): Promise<{ html: string; raw: string }> {
  // Decode base64 if needed
  const decoded = isBase64(content)
    ? Buffer.from(content, 'base64').toString('utf-8')
    : content

  // Fix relative URLs
  const withFixedUrls = fixRelativeUrls(decoded, repoUrl)

  // Process markdown to HTML
  const processed = await remark()
    .use(gfm) // GitHub Flavored Markdown
    .use(prism) // Syntax highlighting
    .use(html, { sanitize: false }) // Convert to HTML
    .process(withFixedUrls)

  return {
    html: processed.toString(),
    raw: decoded
  }
}

function fixRelativeUrls(markdown: string, repoUrl: string): string {
  // Fix image URLs
  const imagePattern = /!\[([^\]]*)\]\((?!http)([^)]+)\)/g
  const fixedImages = markdown.replace(imagePattern, (match, alt, path) => {
    const absoluteUrl = `https://raw.githubusercontent.com/vjrivmon/${repoUrl}/main/${path}`
    return `![${alt}](${absoluteUrl})`
  })

  // Fix link URLs
  const linkPattern = /\[([^\]]+)\]\((?!http)([^)]+)\)/g
  const fixedLinks = fixedImages.replace(linkPattern, (match, text, path) => {
    if (path.startsWith('#')) return match // Keep anchor links
    const absoluteUrl = `${repoUrl}/blob/main/${path}`
    return `[${text}](${absoluteUrl})`
  })

  return fixedLinks
}
```

---

## 4. API Routes Design

### 4.1 Revalidation Webhook

```typescript
// app/api/revalidate/route.ts

/*
Purpose: Webhook endpoint for N8N automation
Method: POST
Auth: Secret token validation
*/

Request Body:
{
  "secret": "string",
  "paths"?: string[], // Optional specific paths
  "repository"?: string // Optional specific repo
}

Response:
{
  "revalidated": true,
  "timestamp": "2025-10-01T10:00:00Z",
  "paths": ["/", "/projects", "/projects/[slug]"],
  "message": "Cache successfully revalidated"
}

Error Responses:
- 401: Invalid secret token
- 400: Bad request format
- 500: Revalidation failed
```

### 4.2 Projects API

```typescript
// app/api/projects/route.ts

/*
Purpose: Fetch projects with filtering and pagination
Method: GET
Caching: Static at build, ISR every hour
*/

Query Parameters:
- category?: ProjectCategory
- featured?: boolean
- status?: ProjectStatus
- language?: string
- search?: string
- sort?: 'stars' | 'updated' | 'created' | 'name'
- order?: 'asc' | 'desc'
- page?: number (default: 1)
- limit?: number (default: 12, max: 50)

Response:
{
  "success": true,
  "data": {
    "items": Project[],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 33,
      "hasNext": true,
      "hasPrev": false
    }
  },
  "metadata": {
    "timestamp": "2025-10-01T10:00:00Z",
    "cached": true,
    "cacheAge": 1800
  }
}
```

### 4.3 Single Project API

```typescript
// app/api/projects/[slug]/route.ts

/*
Purpose: Get single project with full details
Method: GET
Caching: Static at build, ISR every hour
*/

Path Parameters:
- slug: string (repository name)

Response:
{
  "success": true,
  "data": Project, // Full project with README
  "metadata": {
    "timestamp": "2025-10-01T10:00:00Z",
    "cached": true,
    "cacheAge": 900
  }
}

Error Responses:
- 404: Project not found
- 500: Internal server error
```

### 4.4 Project Statistics API

```typescript
// app/api/stats/route.ts

/*
Purpose: Get portfolio statistics
Method: GET
Caching: Static at build, ISR every hour
*/

Response:
{
  "success": true,
  "data": {
    "totalProjects": 33,
    "publicProjects": 33,
    "featuredProjects": 8,
    "activeProjects": 12,

    "categoryBreakdown": {
      "ai-robotics": 5,
      "iot": 4,
      "web": 8,
      "games": 2,
      // ...
    },

    "languageBreakdown": {
      "TypeScript": 12,
      "Python": 8,
      "JavaScript": 6,
      // ...
    },

    "metrics": {
      "totalStars": 45,
      "totalForks": 12,
      "avgProjectAge": 180, // days
      "recentlyUpdated": 8 // last 30 days
    },

    "timeline": {
      "firstProject": "2022-09-01",
      "latestProject": "2025-09-30",
      "mostActiveMonth": "2025-06"
    }
  }
}
```

---

## 5. Caching Strategy

### 5.1 Multi-Level Cache Architecture

```typescript
// lib/cache/strategy.ts

interface CacheLayer {
  name: string
  type: 'memory' | 'disk' | 'cdn' | 'database'
  ttl: number // seconds
  priority: number // 1 = highest
}

const cacheLayers: CacheLayer[] = [
  {
    name: 'In-Memory Cache',
    type: 'memory',
    ttl: 300, // 5 minutes
    priority: 1
  },
  {
    name: 'Next.js Cache',
    type: 'disk',
    ttl: 3600, // 1 hour
    priority: 2
  },
  {
    name: 'Vercel Edge Cache',
    type: 'cdn',
    ttl: 86400, // 24 hours
    priority: 3
  },
  {
    name: 'Redis Cache (Optional)',
    type: 'database',
    ttl: 604800, // 1 week
    priority: 4
  }
]
```

### 5.2 Cache Keys Strategy

```typescript
// lib/cache/keys.ts

export function generateCacheKey(
  type: 'repo' | 'repos' | 'readme' | 'languages' | 'stats',
  identifier?: string,
  params?: Record<string, unknown>
): string {
  const base = `github:${type}`

  if (identifier) {
    const key = `${base}:${identifier}`
    if (params && Object.keys(params).length > 0) {
      const paramStr = JSON.stringify(params, Object.keys(params).sort())
      const hash = createHash('md5').update(paramStr).digest('hex')
      return `${key}:${hash}`
    }
    return key
  }

  return base
}

// Cache key examples
const examples = {
  allRepos: 'github:repos',
  singleRepo: 'github:repo:aidguide_04',
  filteredRepos: 'github:repos:a3f4b2c1', // Hash of query params
  readme: 'github:readme:neurospot',
  languages: 'github:languages:osyris-web',
  stats: 'github:stats'
}
```

### 5.3 ISR Configuration

```typescript
// next.config.mjs excerpt

const config = {
  // Incremental Static Regeneration
  isr: {
    // Default revalidation period
    defaultRevalidate: 3600, // 1 hour

    // Path-specific revalidation
    paths: {
      '/': 3600,              // Homepage: 1 hour
      '/projects': 3600,      // Projects list: 1 hour
      '/projects/[slug]': 7200, // Project detail: 2 hours
      '/about': 86400,        // About: 24 hours
      '/api/projects': 1800,  // API: 30 minutes
    }
  }
}
```

### 5.4 Cache Invalidation

```typescript
// lib/cache/invalidation.ts

export class CacheInvalidator {
  // Manual invalidation via webhook
  async invalidateByWebhook(secret: string, paths?: string[]): Promise<void> {
    if (!this.validateSecret(secret)) {
      throw new Error('Invalid webhook secret')
    }

    const pathsToInvalidate = paths || [
      '/',
      '/projects',
      '/projects/[slug]',
      '/api/projects',
      '/api/stats'
    ]

    for (const path of pathsToInvalidate) {
      await revalidatePath(path)
    }
  }

  // Selective invalidation by repository
  async invalidateRepository(repoName: string): Promise<void> {
    const paths = [
      `/projects/${repoName}`,
      '/projects', // List might change
      '/', // Featured might change
      '/api/projects',
      `/api/projects/${repoName}`
    ]

    for (const path of paths) {
      await revalidatePath(path)
    }
  }

  // Time-based auto invalidation
  setupAutoInvalidation(): void {
    // ISR handles this automatically based on revalidate values
    // Additional logic for Redis cache cleanup if needed
  }
}
```

---

## 6. Data Fetching Functions

### 6.1 Get All Repositories

```typescript
// lib/github/fetchers.ts

export async function getGitHubRepos(): Promise<Project[]> {
  const cacheKey = generateCacheKey('repos')

  // Try cache first
  const cached = await cache.get(cacheKey)
  if (cached) return cached

  try {
    // Fetch from GitHub
    const client = new GitHubClient()
    const repos = await client.getRepositories()

    // Filter and process
    const filtered = repos.filter(repo =>
      !repo.fork &&
      !repo.archived &&
      repo.visibility === 'public'
    )

    // Transform to projects
    const projects = await Promise.all(
      filtered.map(async (repo) => {
        const [readme, languages] = await Promise.all([
          client.getReadme(repo.name).catch(() => null),
          client.getLanguages(repo.name).catch(() => null)
        ])

        return transformRepository(repo, readme, languages)
      })
    )

    // Sort by update date
    projects.sort((a, b) =>
      b.updatedAt.getTime() - a.updatedAt.getTime()
    )

    // Cache results
    await cache.set(cacheKey, projects, 3600)

    return projects
  } catch (error) {
    // Fallback to stale cache if available
    const stale = await cache.getStale(cacheKey)
    if (stale) return stale

    throw error
  }
}
```

### 6.2 Get Single Project

```typescript
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const cacheKey = generateCacheKey('repo', slug)

  // Try cache first
  const cached = await cache.get(cacheKey)
  if (cached) return cached

  try {
    const client = new GitHubClient()

    // Parallel fetch all data
    const [repo, readme, languages, commits, contributors] = await Promise.all([
      client.getRepository(slug),
      client.getReadme(slug).catch(() => null),
      client.getLanguages(slug).catch(() => null),
      client.getCommits(slug, 10).catch(() => []),
      client.getContributors(slug).catch(() => [])
    ])

    if (!repo) return null

    // Transform to project
    const project = await transformRepository(repo, readme, languages, commits)

    // Add contributors
    project.contributors = contributors.map(c => ({
      username: c.login,
      avatarUrl: c.avatar_url,
      profileUrl: c.html_url,
      contributions: c.contributions,
      role: c.login === 'vjrivmon' ? 'Owner' : 'Contributor'
    }))

    // Cache result
    await cache.set(cacheKey, project, 3600)

    return project
  } catch (error) {
    // Fallback to stale cache
    const stale = await cache.getStale(cacheKey)
    if (stale) return stale

    return null
  }
}
```

### 6.3 Get Featured Projects

```typescript
export async function getFeaturedProjects(): Promise<Project[]> {
  const allProjects = await getGitHubRepos()

  // Filter featured projects
  const featured = allProjects.filter(p => p.featured)

  // Ensure minimum featured count
  if (featured.length < 6) {
    // Add top projects by popularity if needed
    const nonFeatured = allProjects
      .filter(p => !p.featured)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 6 - featured.length)

    featured.push(...nonFeatured)
  }

  // Sort by custom priority
  const priorityOrder = [
    'aidguide_04',
    'neurospot',
    'vimyp',
    'poligames',
    'ecocity',
    'aura-backend'
  ]

  featured.sort((a, b) => {
    const aIndex = priorityOrder.indexOf(a.id)
    const bIndex = priorityOrder.indexOf(b.id)

    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex
    }
    if (aIndex !== -1) return -1
    if (bIndex !== -1) return 1

    return b.stars - a.stars
  })

  return featured.slice(0, 6)
}
```

### 6.4 Get Projects by Category

```typescript
export async function getProjectsByCategory(
  category: ProjectCategory
): Promise<Project[]> {
  const allProjects = await getGitHubRepos()

  return allProjects.filter(p => p.category === category)
}
```

---

## 7. Error Handling

### 7.1 Error Types

```typescript
// lib/errors/types.ts

export class GitHubAPIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public endpoint: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'GitHubAPIError'
  }
}

export class RateLimitError extends GitHubAPIError {
  constructor(
    public resetTime: Date,
    public limit: number,
    public remaining: number
  ) {
    super('GitHub API rate limit exceeded', 429, '/rate_limit')
    this.name = 'RateLimitError'
  }
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public cause?: Error
  ) {
    super(message)
    this.name = 'NetworkError'
  }
}

export class ParseError extends Error {
  constructor(
    message: string,
    public content?: string
  ) {
    super(message)
    this.name = 'ParseError'
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
    public value?: unknown
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}
```

### 7.2 Error Recovery Strategies

```typescript
// lib/errors/recovery.ts

export class ErrorRecovery {
  private retryConfig = {
    maxRetries: 3,
    baseDelay: 1000, // 1 second
    maxDelay: 30000, // 30 seconds
    backoffMultiplier: 2
  }

  async withRetry<T>(
    operation: () => Promise<T>,
    options?: Partial<typeof this.retryConfig>
  ): Promise<T> {
    const config = { ...this.retryConfig, ...options }
    let lastError: Error | undefined

    for (let attempt = 0; attempt < config.maxRetries; attempt++) {
      try {
        return await operation()
      } catch (error) {
        lastError = error as Error

        // Don't retry on certain errors
        if (error instanceof ValidationError) throw error
        if (error instanceof RateLimitError) {
          // Wait until reset time
          const waitTime = error.resetTime.getTime() - Date.now()
          await this.delay(Math.min(waitTime, config.maxDelay))
          continue
        }

        // Calculate backoff delay
        const delay = Math.min(
          config.baseDelay * Math.pow(config.backoffMultiplier, attempt),
          config.maxDelay
        )

        await this.delay(delay)
      }
    }

    throw lastError
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async withFallback<T>(
    primary: () => Promise<T>,
    fallback: () => Promise<T> | T
  ): Promise<T> {
    try {
      return await primary()
    } catch (error) {
      console.error('Primary operation failed, using fallback:', error)
      return await fallback()
    }
  }
}
```

### 7.3 Error Logging

```typescript
// lib/errors/logging.ts

export class ErrorLogger {
  log(error: Error, context?: Record<string, unknown>): void {
    const errorInfo = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      ...context
    }

    if (process.env.NODE_ENV === 'production') {
      // Send to monitoring service (Sentry)
      this.sendToSentry(errorInfo)
    } else {
      // Console log in development
      console.error('Error occurred:', errorInfo)
    }
  }

  private sendToSentry(errorInfo: Record<string, unknown>): void {
    // Sentry integration
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(errorInfo)
    }
  }
}
```

---

## 8. Environment Variables

### 8.1 Required Variables

```bash
# .env.local

# GitHub API Configuration
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_USERNAME=vjrivmon

# Webhook Security
REVALIDATE_SECRET=your-secure-webhook-secret-min-32-chars

# Application
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://vicentrivas.dev
```

### 8.2 Optional Variables

```bash
# Optional Configuration

# Custom GitHub API endpoint (for enterprise)
GITHUB_API_URL=https://api.github.com

# Cache Configuration
CACHE_TTL=3600 # Default cache TTL in seconds
CACHE_STALE_TTL=86400 # Stale cache TTL for fallback

# Redis Cache (Optional)
KV_URL=redis://localhost:6379
KV_TOKEN=your-redis-token

# Monitoring
SENTRY_DSN=https://xxxx@sentry.io/xxxx
SENTRY_AUTH_TOKEN=xxxx

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
VERCEL_ANALYTICS_ID=xxxx

# Rate Limiting
RATE_LIMIT_MAX_REQUESTS=5000
RATE_LIMIT_WINDOW_MS=3600000

# N8N Webhook
N8N_WEBHOOK_URL=https://n8n.yourdomain.com/webhook/xxx
```

### 8.3 Environment Validation

```typescript
// lib/config/env.ts

import { z } from 'zod'

const envSchema = z.object({
  // Required
  GITHUB_TOKEN: z.string().min(1),
  GITHUB_USERNAME: z.string().min(1),
  REVALIDATE_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'production', 'test']),

  // Optional
  GITHUB_API_URL: z.string().url().optional(),
  CACHE_TTL: z.string().transform(Number).optional(),
  KV_URL: z.string().url().optional(),
  SENTRY_DSN: z.string().url().optional(),
})

export function validateEnv() {
  try {
    const env = envSchema.parse(process.env)
    return env
  } catch (error) {
    console.error('Invalid environment variables:', error)
    throw new Error('Environment validation failed')
  }
}

// Validate on startup
export const env = validateEnv()
```

---

## 9. Testing Strategy

### 9.1 Unit Tests

```typescript
// tests/unit/github-client.test.ts

describe('GitHubClient', () => {
  let client: GitHubClient

  beforeEach(() => {
    client = new GitHubClient()
  })

  describe('getRepositories', () => {
    it('should fetch all repositories', async () => {
      const repos = await client.getRepositories()
      expect(repos).toBeInstanceOf(Array)
      expect(repos.length).toBeGreaterThan(0)
    })

    it('should handle rate limiting', async () => {
      // Mock rate limit response
      fetchMock.mockResponseOnce('', { status: 429 })

      await expect(client.getRepositories()).rejects.toThrow(RateLimitError)
    })

    it('should use cache when available', async () => {
      // First call - hits API
      const repos1 = await client.getRepositories()

      // Second call - should use cache
      const repos2 = await client.getRepositories()

      expect(repos1).toEqual(repos2)
      expect(fetchMock).toHaveBeenCalledTimes(1)
    })
  })
})
```

### 9.2 Integration Tests

```typescript
// tests/integration/api-routes.test.ts

describe('API Routes', () => {
  describe('GET /api/projects', () => {
    it('should return paginated projects', async () => {
      const res = await fetch('/api/projects?limit=10')
      const data = await res.json()

      expect(res.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data.items).toHaveLength(10)
      expect(data.data.pagination).toBeDefined()
    })

    it('should filter by category', async () => {
      const res = await fetch('/api/projects?category=ai-robotics')
      const data = await res.json()

      expect(data.data.items.every(p => p.category === 'ai-robotics')).toBe(true)
    })
  })

  describe('POST /api/revalidate', () => {
    it('should revalidate cache with valid secret', async () => {
      const res = await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: process.env.REVALIDATE_SECRET })
      })

      expect(res.status).toBe(200)
      const data = await res.json()
      expect(data.revalidated).toBe(true)
    })

    it('should reject invalid secret', async () => {
      const res = await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: 'invalid' })
      })

      expect(res.status).toBe(401)
    })
  })
})
```

### 9.3 Performance Tests

```typescript
// tests/performance/api-performance.test.ts

describe('API Performance', () => {
  it('should respond within acceptable time', async () => {
    const start = Date.now()
    await fetch('/api/projects')
    const duration = Date.now() - start

    expect(duration).toBeLessThan(1000) // Less than 1 second
  })

  it('should handle concurrent requests', async () => {
    const requests = Array.from({ length: 10 }, () =>
      fetch('/api/projects')
    )

    const responses = await Promise.all(requests)
    expect(responses.every(r => r.status === 200)).toBe(true)
  })

  it('should use cache effectively', async () => {
    // First request - cache miss
    const start1 = Date.now()
    await fetch('/api/projects')
    const duration1 = Date.now() - start1

    // Second request - cache hit
    const start2 = Date.now()
    await fetch('/api/projects')
    const duration2 = Date.now() - start2

    expect(duration2).toBeLessThan(duration1 / 2) // Much faster with cache
  })
})
```

---

## 10. Security Measures

### 10.1 API Security

```typescript
// lib/security/api-protection.ts

export class APIProtection {
  // Rate limiting per IP
  private rateLimiter = new Map<string, number[]>()

  async checkRateLimit(ip: string): Promise<boolean> {
    const now = Date.now()
    const window = 60000 // 1 minute
    const maxRequests = 60 // 60 requests per minute

    const requests = this.rateLimiter.get(ip) || []
    const recentRequests = requests.filter(t => t > now - window)

    if (recentRequests.length >= maxRequests) {
      return false
    }

    recentRequests.push(now)
    this.rateLimiter.set(ip, recentRequests)

    return true
  }

  // Validate webhook signature
  validateWebhookSignature(
    payload: string,
    signature: string,
    secret: string
  ): boolean {
    const expectedSignature = createHmac('sha256', secret)
      .update(payload)
      .digest('hex')

    return timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )
  }

  // Sanitize user input
  sanitizeInput(input: unknown): unknown {
    if (typeof input === 'string') {
      // Remove potential XSS
      return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
    }

    if (Array.isArray(input)) {
      return input.map(item => this.sanitizeInput(item))
    }

    if (typeof input === 'object' && input !== null) {
      const sanitized: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(input)) {
        sanitized[key] = this.sanitizeInput(value)
      }
      return sanitized
    }

    return input
  }
}
```

### 10.2 Data Security

```typescript
// lib/security/data-protection.ts

export class DataProtection {
  // Never expose sensitive data
  sanitizeGitHubResponse(data: unknown): unknown {
    const sensitive = [
      'node_id',
      'git_url',
      'ssh_url',
      'clone_url',
      'svn_url',
      'keys_url',
      'collaborators_url',
      'teams_url',
      'hooks_url'
    ]

    if (typeof data === 'object' && data !== null) {
      const sanitized = { ...data }
      for (const key of sensitive) {
        delete sanitized[key]
      }
      return sanitized
    }

    return data
  }

  // Validate external URLs
  isValidUrl(url: string): boolean {
    try {
      const parsed = new URL(url)
      const allowedProtocols = ['http:', 'https:']
      const allowedHosts = [
        'github.com',
        'raw.githubusercontent.com',
        'vicentrivas.dev'
      ]

      return allowedProtocols.includes(parsed.protocol) &&
             (allowedHosts.some(host => parsed.host.includes(host)) ||
              parsed.host === 'localhost' && process.env.NODE_ENV === 'development')
    } catch {
      return false
    }
  }

  // XSS prevention for markdown
  sanitizeMarkdown(html: string): string {
    // Use DOMPurify or similar in production
    const dangerous = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi
    ]

    let sanitized = html
    for (const pattern of dangerous) {
      sanitized = sanitized.replace(pattern, '')
    }

    return sanitized
  }
}
```

### 10.3 CORS Configuration

```typescript
// lib/security/cors.ts

export const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self' data:;
    connect-src 'self' https://api.github.com https://vitals.vercel-insights.com;
  `.replace(/\s+/g, ' ').trim()
}
```

---

## 11. Performance Optimizations

### 11.1 Query Optimization

```typescript
// lib/optimizations/queries.ts

export class QueryOptimizer {
  // Batch similar requests
  async batchRequests<T>(
    requests: Array<() => Promise<T>>
  ): Promise<T[]> {
    // Group by similar endpoints
    const batches = this.groupSimilarRequests(requests)

    // Execute batches with concurrency control
    const results: T[] = []
    for (const batch of batches) {
      const batchResults = await Promise.all(
        batch.map(req => req())
      )
      results.push(...batchResults)
    }

    return results
  }

  // Parallel fetching with limit
  async parallelFetch<T>(
    items: string[],
    fetcher: (item: string) => Promise<T>,
    concurrency: number = 5
  ): Promise<T[]> {
    const results: T[] = []

    for (let i = 0; i < items.length; i += concurrency) {
      const batch = items.slice(i, i + concurrency)
      const batchResults = await Promise.all(
        batch.map(item => fetcher(item))
      )
      results.push(...batchResults)
    }

    return results
  }
}
```

### 11.2 Response Compression

```typescript
// lib/optimizations/compression.ts

export function compressResponse(data: unknown): Buffer {
  const json = JSON.stringify(data)

  if (json.length < 1024) {
    // Don't compress small responses
    return Buffer.from(json)
  }

  return gzipSync(json)
}

export function decompressResponse(data: Buffer): unknown {
  try {
    const decompressed = gunzipSync(data)
    return JSON.parse(decompressed.toString())
  } catch {
    // Assume uncompressed
    return JSON.parse(data.toString())
  }
}
```

### 11.3 Lazy Loading

```typescript
// lib/optimizations/lazy.ts

export class LazyLoader {
  private cache = new Map<string, Promise<unknown>>()

  async load<T>(
    key: string,
    loader: () => Promise<T>
  ): Promise<T> {
    if (!this.cache.has(key)) {
      this.cache.set(key, loader())
    }

    return this.cache.get(key) as Promise<T>
  }

  preload(keys: string[], loaders: Map<string, () => Promise<unknown>>): void {
    // Preload in background
    keys.forEach(key => {
      const loader = loaders.get(key)
      if (loader && !this.cache.has(key)) {
        this.cache.set(key, loader())
      }
    })
  }
}
```

---

## 12. Monitoring & Analytics

### 12.1 Performance Monitoring

```typescript
// lib/monitoring/performance.ts

export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map()

  async measure<T>(
    name: string,
    operation: () => Promise<T>
  ): Promise<T> {
    const start = performance.now()

    try {
      const result = await operation()
      const duration = performance.now() - start

      this.recordMetric(name, duration)

      return result
    } catch (error) {
      const duration = performance.now() - start
      this.recordMetric(`${name}_error`, duration)
      throw error
    }
  }

  private recordMetric(name: string, value: number): void {
    const metrics = this.metrics.get(name) || []
    metrics.push(value)

    // Keep last 100 measurements
    if (metrics.length > 100) {
      metrics.shift()
    }

    this.metrics.set(name, metrics)

    // Send to analytics
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(name, value)
    }
  }

  getStats(name: string): {
    avg: number
    min: number
    max: number
    p50: number
    p90: number
    p99: number
  } | null {
    const metrics = this.metrics.get(name)
    if (!metrics || metrics.length === 0) return null

    const sorted = [...metrics].sort((a, b) => a - b)

    return {
      avg: metrics.reduce((a, b) => a + b, 0) / metrics.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      p50: sorted[Math.floor(sorted.length * 0.5)],
      p90: sorted[Math.floor(sorted.length * 0.9)],
      p99: sorted[Math.floor(sorted.length * 0.99)]
    }
  }
}
```

### 12.2 Error Tracking

```typescript
// lib/monitoring/errors.ts

export class ErrorTracker {
  private errors: Array<{
    timestamp: Date
    error: Error
    context: Record<string, unknown>
  }> = []

  track(error: Error, context?: Record<string, unknown>): void {
    const errorEntry = {
      timestamp: new Date(),
      error,
      context: context || {}
    }

    this.errors.push(errorEntry)

    // Send to Sentry in production
    if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
      this.sendToSentry(errorEntry)
    }

    // Keep last 100 errors in memory
    if (this.errors.length > 100) {
      this.errors.shift()
    }
  }

  getRecentErrors(limit: number = 10): typeof this.errors {
    return this.errors.slice(-limit)
  }

  getErrorStats(): Record<string, number> {
    const stats: Record<string, number> = {}

    this.errors.forEach(({ error }) => {
      const type = error.name || 'Unknown'
      stats[type] = (stats[type] || 0) + 1
    })

    return stats
  }
}
```

---

## 13. Implementation Checklist

### Phase 1: GitHub Client (2 hours)
- [ ] Set up GitHub API client with authentication
- [ ] Implement rate limiting with exponential backoff
- [ ] Create cache manager with multi-level strategy
- [ ] Implement core API methods (repos, readme, languages)
- [ ] Add error handling and retry logic
- [ ] Write unit tests for client

### Phase 2: Data Processing (1.5 hours)
- [ ] Create TypeScript type definitions
- [ ] Implement repository transformer
- [ ] Build project classifier with rules
- [ ] Create featured project detector
- [ ] Implement README parser with markdown processing
- [ ] Add tech stack extractor
- [ ] Write unit tests for processors

### Phase 3: API Routes (1 hour)
- [ ] Create revalidation webhook endpoint
- [ ] Implement projects list API with filtering
- [ ] Build single project API endpoint
- [ ] Add statistics API endpoint
- [ ] Configure ISR and caching
- [ ] Add security middleware
- [ ] Write integration tests

### Phase 4: Testing & Optimization (1 hour)
- [ ] Run full test suite
- [ ] Performance testing and optimization
- [ ] Security audit
- [ ] Documentation review
- [ ] Environment variable validation
- [ ] Deployment configuration

---

## 14. Summary

This backend architecture provides a robust, scalable foundation for the ViSiTech portfolio:

### Key Achievements:
1. **Comprehensive GitHub Integration** - Full API coverage with intelligent data processing
2. **Multi-Level Caching** - In-memory, disk, CDN, and optional Redis layers
3. **Smart Classification** - Automatic project categorization and featured detection
4. **Performance Optimized** - Parallel fetching, compression, lazy loading
5. **Enterprise Security** - Rate limiting, input sanitization, CORS protection
6. **Error Resilience** - Retry logic, fallbacks, comprehensive error handling
7. **Type Safety** - Full TypeScript coverage with strict types
8. **Monitoring Ready** - Performance metrics, error tracking, analytics

### Technical Highlights:
- **5000 requests/hour** GitHub API rate limit handling
- **< 1 second** API response time target
- **Multi-level caching** with ISR and edge optimization
- **Automatic project classification** across 10+ categories
- **Featured project detection** with smart algorithms
- **README processing** with syntax highlighting
- **Webhook-triggered** cache invalidation
- **Production-ready** error handling and monitoring

### Next Steps:
1. Implement the GitHub client with authentication
2. Build data processing pipeline
3. Create API routes with caching
4. Set up monitoring and analytics
5. Deploy to Vercel with environment configuration

This architecture is designed to scale from MVP to production, handling thousands of requests efficiently while maintaining data freshness through intelligent caching and revalidation strategies.

---

**[01:45:00] [BACKEND-PLANNER] [COMPLETED] Backend API design finished**

**Document Location**: `/home/vicente/RoadToDevOps/visitech_portfolio/.claude/doc/backend/api_design.md`
**Status**: Ready for implementation by executor agent