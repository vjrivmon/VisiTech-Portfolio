# Frontend Implementation Plan - ViSiTech Portfolio

**Document Version**: 1.0.0
**Created**: 2025-10-01
**Agent**: FRONTEND-PLANNER
**Status**: READY FOR EXECUTION

---

## Executive Summary

This document provides a comprehensive frontend implementation plan for Vicente Rivas Monferrer's developer portfolio. The plan covers all components, pages, styling strategies, and state management needed to build a high-performance Next.js 14 application with shadcn/ui, Tailwind CSS, and TypeScript.

**Key Technologies**:
- Next.js 14.2.x with App Router
- TypeScript 5.3.x (strict mode)
- Tailwind CSS 3.4.x
- shadcn/ui (Radix UI primitives)
- Framer Motion 11.x
- TanStack Query 5.x
- Zustand 4.5.x

---

## 1. Component Inventory

### 1.1 Page Components (App Router)

| Path | Component | Type | Description |
|------|-----------|------|-------------|
| `/app/page.tsx` | HomePage | Server | Landing page with hero, featured projects, timeline |
| `/app/projects/page.tsx` | ProjectsPage | Server | Searchable, filterable project grid |
| `/app/projects/[slug]/page.tsx` | ProjectDetailPage | Server | Full project showcase with README |
| `/app/about/page.tsx` | AboutPage | Server | Extended bio, skills, education, achievements |
| `/app/not-found.tsx` | NotFoundPage | Server | Custom 404 page |
| `/app/error.tsx` | ErrorPage | Client | Error boundary with retry |
| `/app/loading.tsx` | LoadingPage | Server | Global loading skeleton |

### 1.2 Layout Components

| Component | Location | Type | Purpose |
|-----------|----------|------|---------|
| `RootLayout` | `/app/layout.tsx` | Server | Root HTML structure, providers, fonts |
| `Header` | `/components/layout/Header.tsx` | Server | Main navigation header |
| `Navigation` | `/components/layout/Navigation.tsx` | Server | Desktop navigation menu |
| `MobileNav` | `/components/layout/MobileNav.tsx` | Client | Mobile hamburger menu |
| `Footer` | `/components/layout/Footer.tsx` | Server | Footer with links, social |
| `ThemeToggle` | `/components/layout/ThemeToggle.tsx` | Client | Dark mode switcher |
| `ScrollToTop` | `/components/layout/ScrollToTop.tsx` | Client | Scroll to top button |

### 1.3 Homepage Components

| Component | Location | Type | Features |
|-----------|----------|------|----------|
| `Hero` | `/components/home/Hero.tsx` | Client | Animated title, typewriter, CTA buttons |
| `FeaturedProjects` | `/components/home/FeaturedProjects.tsx` | Server | Top 3-6 projects grid |
| `TechStack` | `/components/home/TechStack.tsx` | Client | Animated tech categories with icons |
| `Timeline` | `/components/home/Timeline.tsx` | Client | Career/education timeline with animations |
| `Achievements` | `/components/home/Achievements.tsx` | Server | Awards and hackathon wins |
| `CallToAction` | `/components/home/CallToAction.tsx` | Server | Contact section with form |

### 1.4 Projects Components

| Component | Location | Type | Features |
|-----------|----------|------|----------|
| `ProjectCard` | `/components/projects/ProjectCard.tsx` | Server | Project preview card with hover effects |
| `ProjectGrid` | `/components/projects/ProjectGrid.tsx` | Server | Responsive grid layout |
| `ProjectFilters` | `/components/projects/ProjectFilters.tsx` | Client | Category, tech, date filters |
| `ProjectSearch` | `/components/projects/ProjectSearch.tsx` | Client | Real-time search with debounce |
| `ProjectDetail` | `/components/projects/ProjectDetail.tsx` | Server | Full project view |
| `ProjectStats` | `/components/projects/ProjectStats.tsx` | Server | GitHub stats (stars, forks, etc.) |
| `TechBadge` | `/components/projects/TechBadge.tsx` | Server | Technology badge with icon |
| `ReadmeViewer` | `/components/projects/ReadmeViewer.tsx` | Server | Markdown renderer with syntax highlighting |

### 1.5 About Page Components

| Component | Location | Type | Features |
|-----------|----------|------|----------|
| `Biography` | `/components/about/Biography.tsx` | Server | Extended bio section |
| `Skills` | `/components/about/Skills.tsx` | Client | Interactive skills matrix |
| `Education` | `/components/about/Education.tsx` | Server | Education timeline |
| `Languages` | `/components/about/Languages.tsx` | Server | Language proficiency bars |
| `Interests` | `/components/about/Interests.tsx` | Server | Personal interests section |

### 1.6 Shared Components

| Component | Location | Type | Features |
|-----------|----------|------|----------|
| `AnimatedSection` | `/components/shared/AnimatedSection.tsx` | Client | Intersection-based scroll animations |
| `GradientText` | `/components/shared/GradientText.tsx` | Server | Gradient text styling |
| `ParallaxImage` | `/components/shared/ParallaxImage.tsx` | Client | Parallax scroll effect |
| `TypeWriter` | `/components/shared/TypeWriter.tsx` | Client | Typewriter text effect |
| `LoadingSpinner` | `/components/shared/LoadingSpinner.tsx` | Server | Loading indicator |
| `ErrorBoundary` | `/components/shared/ErrorBoundary.tsx` | Client | Error handling wrapper |
| `SEO` | `/components/shared/SEO.tsx` | Server | SEO metadata component |

### 1.7 Provider Components

| Component | Location | Type | Purpose |
|-----------|----------|------|---------|
| `ThemeProvider` | `/components/providers/ThemeProvider.tsx` | Client | next-themes dark mode |
| `QueryProvider` | `/components/providers/QueryProvider.tsx` | Client | TanStack Query setup |
| `AnalyticsProvider` | `/components/providers/AnalyticsProvider.tsx` | Client | Vercel Analytics |

---

## 2. shadcn/ui Component Selection

### 2.1 Required shadcn/ui Components

Run these installation commands in sequence:

```bash
# Navigation components
npx shadcn-ui@latest add navigation-menu
npx shadcn-ui@latest add sheet          # Mobile nav drawer

# Display components
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add tabs

# Feedback components
npx shadcn-ui@latest add tooltip
npx shadcn-ui@latest add skeleton
npx shadcn-ui@latest add alert

# Interactive components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add select
npx shadcn-ui@latest add dropdown-menu

# Layout helpers
npx shadcn-ui@latest add scroll-area
npx shadcn-ui@latest add dialog

# Form components (for contact)
npx shadcn-ui@latest add form
npx shadcn-ui@latest add label
```

### 2.2 Component Usage Map

| shadcn Component | Used In | Purpose |
|------------------|---------|---------|
| `Button` | All CTAs, forms, navigation | Primary interactive element |
| `Card` | ProjectCard, Timeline items | Content containers |
| `Badge` | TechBadge, project tags | Labels and tags |
| `Avatar` | Header, About page | Profile image |
| `Navigation Menu` | Header desktop nav | Main navigation |
| `Sheet` | Mobile navigation | Slide-out mobile menu |
| `Tooltip` | Tech icons, buttons | Contextual help |
| `Skeleton` | Loading states | Content placeholders |
| `Tabs` | Projects filters | Categorization |
| `Input` | Search, contact form | Text inputs |
| `Textarea` | Contact form | Message input |
| `Select` | Filter dropdowns | Selection controls |
| `Dropdown Menu` | User menu, actions | Action menus |
| `Scroll Area` | Long content sections | Scrollable containers |
| `Dialog` | Modals, confirmations | Overlays |
| `Form` | Contact form | Form validation |
| `Separator` | Section dividers | Visual separation |
| `Alert` | Form feedback, errors | User notifications |

---

## 3. Page Structure Planning

### 3.1 Homepage (`/app/page.tsx`)

```typescript
// /app/page.tsx
import { Hero } from '@/components/home/Hero';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { TechStack } from '@/components/home/TechStack';
import { Timeline } from '@/components/home/Timeline';
import { Achievements } from '@/components/home/Achievements';
import { CallToAction } from '@/components/home/CallToAction';
import { getRepositories } from '@/lib/github/queries';

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  const repositories = await getRepositories();
  const featuredProjects = repositories
    .filter(repo => repo.featured)
    .slice(0, 6);

  return (
    <>
      {/* Hero Section - Above the fold */}
      <Hero />

      {/* Featured Projects - 3 cards on desktop, 1 on mobile */}
      <FeaturedProjects projects={featuredProjects} />

      {/* Tech Stack - Categorized with icons */}
      <TechStack />

      {/* Timeline - Career & education progression */}
      <Timeline />

      {/* Achievements - Awards & hackathons */}
      <Achievements />

      {/* CTA - Contact form */}
      <CallToAction />
    </>
  );
}
```

**Layout Structure**:
```
HomePage
├── Hero (Viewport height, centered)
│   ├── Animated Title: "Vicente Rivas Monferrer"
│   ├── TypeWriter: "Backend Developer | Scrum Master | AI Enthusiast"
│   ├── Bio snippet (2-3 lines)
│   ├── CTA Buttons: [View Projects] [Contact Me] [Download Resume]
│   └── Scroll Indicator (animated arrow)
│
├── FeaturedProjects (Container max-w-7xl)
│   ├── Section Header: "Featured Projects"
│   ├── Grid: 3 columns (lg), 2 (md), 1 (sm)
│   │   ├── ProjectCard (aidguide_04)
│   │   ├── ProjectCard (NeuroSpot)
│   │   └── ProjectCard (Osyris-Web)
│   └── View All Link → /projects
│
├── TechStack (Container max-w-7xl)
│   ├── Section Header: "Tech Stack"
│   ├── Categories
│   │   ├── Languages (Python, TypeScript, C++, Java)
│   │   ├── Frameworks (React, Next.js, ROS2, Unity)
│   │   ├── DevOps (Docker, Git, GitHub Actions, AWS)
│   │   └── Tools (VSCode, Figma, Blender)
│   └── Skill Progress Bars (optional)
│
├── Timeline (Container max-w-5xl)
│   ├── Section Header: "Journey"
│   └── Timeline Items (alternating left/right on desktop)
│       ├── 2025: AidGuide + Bootcamp DevOps
│       ├── 2024: VIMYP + Hackathons
│       ├── 2023: ECOCITY + Web Projects
│       └── 2022: Started Grado TI
│
├── Achievements (Container max-w-7xl)
│   ├── Section Header: "Achievements"
│   └── Grid: 3 cards
│       ├── Telefónica Champion (2025)
│       ├── Hackathon eMobility (2023)
│       └── Campus Salud Gandía (2023)
│
└── CallToAction (Full width, bg accent)
    ├── Heading: "Let's Build Something Together"
    ├── Contact Form (name, email, message)
    └── Social Links (GitHub, LinkedIn, Email)
```

**Metadata**:
```typescript
export const metadata: Metadata = {
  title: 'Vicente Rivas - Backend Developer & Scrum Master',
  description: 'Portfolio of Vicente Rivas Monferrer - Backend Developer, Scrum Master specializing in ROS2, AI, IoT. Student at UPV Valencia.',
  openGraph: {
    images: ['/og-home.jpg'],
  },
};
```

---

### 3.2 Projects Page (`/app/projects/page.tsx`)

```typescript
// /app/projects/page.tsx
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { ProjectSearch } from '@/components/projects/ProjectSearch';
import { getRepositories } from '@/lib/github/queries';

export const revalidate = 3600;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { category?: string; tech?: string; search?: string };
}) {
  const repositories = await getRepositories();

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Page Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">All Projects</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore my collection of {repositories.length} projects spanning robotics,
          AI, IoT, web development, and more.
        </p>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <ProjectSearch />
        <ProjectFilters />
      </div>

      {/* Project Grid */}
      <ProjectGrid
        repositories={repositories}
        filters={searchParams}
      />
    </div>
  );
}
```

**Layout Structure**:
```
ProjectsPage
├── Page Header
│   ├── Title: "All Projects"
│   ├── Subtitle: Project count + description
│   └── Breadcrumb: Home > Projects
│
├── Controls Bar (Sticky on scroll)
│   ├── ProjectSearch (Input with icon, debounced)
│   └── ProjectFilters
│       ├── Category Tabs: All | Robotics | Web | IoT | AI | Games
│       ├── Tech Dropdown: Filter by technology
│       ├── Sort Dropdown: Recent | Stars | Name
│       └── View Toggle: Grid | List
│
└── ProjectGrid (Responsive)
    ├── Grid: 3 columns (lg), 2 (md), 1 (sm)
    └── ProjectCard (x33)
        ├── Thumbnail (screenshot or generated)
        ├── Title + Description
        ├── Tech Badges (max 5, +more)
        ├── Stats (Stars, Forks, Language)
        ├── Last Updated date
        └── Hover: View Details button
```

**Client State Management**:
```typescript
// Client component for filters
'use client';

export function ProjectFilters() {
  const [category, setCategory] = useState('all');
  const [tech, setTech] = useState<string[]>([]);
  const [sort, setSort] = useState('recent');
  const router = useRouter();

  const handleFilterChange = () => {
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (tech.length > 0) params.set('tech', tech.join(','));
    if (sort !== 'recent') params.set('sort', sort);

    router.push(`/projects?${params.toString()}`);
  };

  return (
    // Filter UI
  );
}
```

---

### 3.3 Project Detail Page (`/app/projects/[slug]/page.tsx`)

```typescript
// /app/projects/[slug]/page.tsx
import { getRepository, getReadme, getLanguages } from '@/lib/github/queries';
import { ProjectDetail } from '@/components/projects/ProjectDetail';
import { ReadmeViewer } from '@/components/projects/ReadmeViewer';
import { ProjectStats } from '@/components/projects/ProjectStats';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export async function generateStaticParams() {
  const repos = await getRepositories();
  return repos.map(repo => ({ slug: repo.name }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [repository, readme, languages] = await Promise.all([
    getRepository(params.slug),
    getReadme(params.slug),
    getLanguages(params.slug),
  ]);

  if (!repository) return notFound();

  return (
    <article className="container mx-auto px-4 py-16">
      {/* Project Hero */}
      <ProjectDetail repository={repository} languages={languages} />

      {/* README Content */}
      <section className="max-w-4xl mx-auto mt-12">
        <ReadmeViewer content={readme} />
      </section>

      {/* GitHub Stats */}
      <aside className="max-w-4xl mx-auto mt-12">
        <ProjectStats repository={repository} />
      </aside>

      {/* Related Projects */}
      <section className="mt-16">
        <h2>Related Projects</h2>
        {/* Show 3 projects with similar tags */}
      </section>
    </article>
  );
}
```

**Layout Structure**:
```
ProjectDetailPage
├── Breadcrumb: Home > Projects > [Project Name]
│
├── Project Hero
│   ├── Title + Status Badge (Active/Completed)
│   ├── Description (full)
│   ├── Metadata Row
│   │   ├── Role (Scrum Master/Developer)
│   │   ├── Period (Start - End)
│   │   └── Team Size (if applicable)
│   ├── Tech Stack (Large badges)
│   ├── CTA Buttons
│   │   ├── View on GitHub (primary)
│   │   ├── Live Demo (if available)
│   │   └── Share (dropdown)
│   └── Hero Image/Video/Screenshot
│
├── Tab Navigation (Sticky)
│   ├── Overview (default)
│   ├── README
│   ├── Statistics
│   └── Activity (optional)
│
├── Overview Tab
│   ├── Key Features (bulleted list)
│   ├── Challenges & Solutions
│   ├── Impact Statement
│   └── Learnings
│
├── README Tab (Parsed Markdown)
│   ├── Rendered with syntax highlighting
│   ├── Table of contents (auto-generated)
│   ├── Images optimized
│   └── Links open in new tab
│
├── Statistics Tab
│   ├── GitHub Stats (stars, forks, watchers, issues)
│   ├── Language Breakdown (donut chart)
│   ├── Commit Activity (graph)
│   ├── Contributors (if multiple)
│   └── Repository Size
│
└── Related Projects (Grid of 3 cards)
```

**Props Interface**:
```typescript
interface ProjectDetailProps {
  repository: Repository;
  languages: LanguageStats;
}

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  open_issues_count: number;
  license: License | null;
  // Custom fields
  category?: string;
  featured?: boolean;
  role?: string;
  period?: string;
  team_size?: number;
  status?: 'active' | 'completed' | 'archived';
}
```

---

### 3.4 About Page (`/app/about/page.tsx`)

```typescript
// /app/about/page.tsx
import { Biography } from '@/components/about/Biography';
import { Skills } from '@/components/about/Skills';
import { Education } from '@/components/about/Education';
import { Languages } from '@/components/about/Languages';
import { Interests } from '@/components/about/Interests';

export const metadata: Metadata = {
  title: 'About | Vicente Rivas',
  description: 'Learn more about Vicente Rivas Monferrer - Backend Developer, Scrum Master, and Interactive Technologies student.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <header className="max-w-4xl mx-auto mb-16 text-center">
        <Avatar className="w-32 h-32 mx-auto mb-6">
          <AvatarImage src="https://github.com/vjrivmon.png" alt="Vicente" />
        </Avatar>
        <h1 className="text-4xl font-bold mb-4">Vicente Rivas Monferrer</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Backend Developer | Scrum Master | AI Enthusiast
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" asChild>
            <a href="/resume.pdf" download>Download Resume</a>
          </Button>
          <Button asChild>
            <a href="#contact">Get in Touch</a>
          </Button>
        </div>
      </header>

      {/* Extended Bio */}
      <Biography />

      {/* Skills Matrix */}
      <Skills />

      {/* Education Timeline */}
      <Education />

      {/* Language Proficiency */}
      <Languages />

      {/* Personal Interests */}
      <Interests />
    </div>
  );
}
```

**Layout Structure**:
```
AboutPage
├── Hero
│   ├── Large Avatar (circular)
│   ├── Name + Title
│   ├── Short Description
│   └── Actions: [Download Resume] [Contact]
│
├── Biography Section (max-w-4xl)
│   ├── Section Title: "About Me"
│   ├── Extended Bio (3-4 paragraphs)
│   │   ├── Current Focus (AidGuide, DevOps Bootcamp)
│   │   ├── Background (Student at UPV Gandía)
│   │   ├── Passion (Technology, leadership, AI)
│   │   └── Motto: "If the plan doesn't work..."
│   └── Quick Stats Grid (2x2)
│       ├── 33+ Projects
│       ├── 3 Hackathon Wins
│       ├── 5 Languages (coding)
│       └── 4 Languages (spoken)
│
├── Skills Section (max-w-6xl)
│   ├── Section Title: "Technical Skills"
│   ├── Skill Categories (Tabs)
│   │   ├── Languages Tab
│   │   │   └── Grid of language cards with proficiency
│   │   ├── Frameworks Tab
│   │   │   └── Framework cards with experience level
│   │   ├── DevOps Tab
│   │   │   └── Tool cards
│   │   └── Soft Skills Tab
│   │       └── Skill badges
│   └── Interactive: Hover for details, click for projects using that skill
│
├── Education Section (max-w-4xl)
│   ├── Section Title: "Education"
│   └── Timeline (vertical)
│       ├── Grado Tecnologías Interactivas (UPV, 2022-Present)
│       ├── Bootcamp DevOps (Código Facilito, 2024-2025)
│       └── Grado Videojuegos (Florida, 2020-2022)
│
├── Languages Section (max-w-4xl)
│   ├── Section Title: "Languages"
│   └── Progress Bars
│       ├── Español (Native) - 100%
│       ├── Valenciano (Native) - 100%
│       ├── English (B2) - 75%
│       └── Français (B1) - 60%
│
└── Interests Section (max-w-6xl)
    ├── Section Title: "Beyond Code"
    └── Interest Cards (Grid 2x2)
        ├── Robotics & AI
        ├── Team Leadership
        ├── Problem Solving
        └── Continuous Learning
```

---

## 4. Component Hierarchy Map

### 4.1 Full Component Tree

```
RootLayout (/app/layout.tsx) [Server]
├── <html> with suppressHydrationWarning
├── <head> with metadata
└── <body> with font classes
    ├── ThemeProvider [Client]
    ├── QueryProvider [Client]
    └── AnalyticsProvider [Client]
        ├── Header [Server]
        │   ├── Container
        │   ├── Logo [Server]
        │   ├── Navigation [Server] (Desktop)
        │   │   └── NavigationMenu (shadcn)
        │   ├── ThemeToggle [Client]
        │   └── MobileNav [Client]
        │       └── Sheet (shadcn)
        │
        ├── main (children)
        │   └── [Page Content]
        │
        ├── Footer [Server]
        │   ├── Container
        │   ├── SocialLinks [Server]
        │   ├── QuickLinks [Server]
        │   └── Copyright [Server]
        │
        └── ScrollToTop [Client]
```

### 4.2 Homepage Detailed Hierarchy

```
HomePage [Server]
│
├── Hero [Client]
│   ├── AnimatedSection wrapper
│   ├── Container
│   ├── AnimatedTitle [Client]
│   │   └── Framer Motion variants
│   ├── TypeWriter [Client]
│   │   └── Text animation hook
│   ├── Bio snippet
│   │   └── GradientText [Server]
│   ├── CTAButtons
│   │   ├── Button (shadcn) → /projects
│   │   ├── Button (shadcn) → #contact
│   │   └── Button variant="outline" → /resume.pdf
│   └── ScrollIndicator [Client]
│       └── Animated chevron
│
├── FeaturedProjects [Server]
│   ├── SectionHeader
│   │   ├── Title: "Featured Projects"
│   │   └── Subtitle
│   ├── ProjectGrid [Server]
│   │   └── ProjectCard [Server] (x3-6)
│   │       ├── Card (shadcn)
│   │       ├── CardHeader
│   │       │   ├── Thumbnail (Next Image)
│   │       │   └── Status Badge
│   │       ├── CardContent
│   │       │   ├── Title
│   │       │   ├── Description (truncated)
│   │       │   └── TechBadges
│   │       │       └── Badge (shadcn) (x5)
│   │       └── CardFooter
│   │           ├── ProjectStats (stars, forks)
│   │           └── View Details link
│   └── ViewAllLink
│       └── Button variant="ghost" → /projects
│
├── TechStack [Client]
│   ├── SectionHeader
│   ├── AnimatedSection wrapper
│   └── TechCategories
│       ├── Tabs (shadcn)
│       │   ├── TabsList
│       │   │   ├── TabsTrigger: Languages
│       │   │   ├── TabsTrigger: Frameworks
│       │   │   ├── TabsTrigger: DevOps
│       │   │   └── TabsTrigger: Tools
│       │   └── TabsContent (for each)
│       │       └── TechGrid
│       │           └── TechIcon [Client] (x8-12)
│       │               ├── Icon from Lucide
│       │               ├── Label
│       │               └── Tooltip (shadcn)
│       └── SkillBars (optional)
│           └── Progress bars with Framer Motion
│
├── Timeline [Client]
│   ├── SectionHeader
│   ├── AnimatedSection wrapper
│   └── TimelineItems
│       └── TimelineItem [Client] (x4-6)
│           ├── Card (shadcn)
│           ├── Year Badge
│           ├── Title
│           ├── Description
│           ├── Icon
│           └── Framer Motion reveal on scroll
│
├── Achievements [Server]
│   ├── SectionHeader
│   └── AchievementGrid
│       └── AchievementCard [Server] (x3)
│           ├── Card (shadcn)
│           ├── Trophy Icon
│           ├── Title
│           ├── Date
│           ├── Description
│           └── Badge for category
│
└── CallToAction [Server]
    ├── Container (full-width accent bg)
    ├── Heading
    ├── Subtitle
    ├── ContactForm [Client]
    │   ├── Form (react-hook-form + zod)
    │   ├── FormField: Name
    │   │   ├── FormLabel
    │   │   ├── FormControl
    │   │   │   └── Input (shadcn)
    │   │   └── FormMessage
    │   ├── FormField: Email
    │   ├── FormField: Message
    │   │   └── Textarea (shadcn)
    │   └── Button type="submit"
    │       └── Loading spinner on submit
    └── SocialLinks
        └── Social buttons (GitHub, LinkedIn, Email)
```

### 4.3 Projects Page Hierarchy

```
ProjectsPage [Server]
│
├── PageHeader
│   ├── Title
│   ├── Subtitle (with project count)
│   └── Breadcrumb
│
├── Controls (Sticky container)
│   ├── ProjectSearch [Client]
│   │   ├── Input (shadcn) with search icon
│   │   ├── useDebounce hook (300ms)
│   │   └── Clear button (when active)
│   │
│   └── ProjectFilters [Client]
│       ├── CategoryTabs [Client]
│       │   └── Tabs (shadcn)
│       │       ├── All
│       │       ├── Robotics
│       │       ├── Web
│       │       ├── IoT
│       │       ├── AI
│       │       └── Games
│       │
│       ├── TechFilter [Client]
│       │   └── Select (shadcn) multiselect
│       │
│       ├── SortDropdown [Client]
│       │   └── Select (shadcn)
│       │       ├── Recent
│       │       ├── Stars
│       │       ├── Name
│       │       └── Updated
│       │
│       └── ViewToggle [Client]
│           ├── Button: Grid view
│           └── Button: List view
│
└── ProjectGrid [Server]
    ├── Results count
    ├── Grid container (responsive)
    │   └── ProjectCard [Server] (x1-33)
    │       └── [Same as FeaturedProjects]
    │
    └── EmptyState (if no results)
        ├── Icon
        ├── Message
        └── Clear filters button
```

---

## 5. Styling & Responsive Design

### 5.1 Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-up': 'fade-up 0.5s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
```

### 5.2 Global CSS Variables

```css
/* /app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }

  html {
    scroll-behavior: smooth;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-secondary;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-primary/50 rounded-lg;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-primary;
  }
}

@layer utilities {
  /* Gradient text */
  .gradient-text {
    @apply bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent;
  }

  /* Glass morphism */
  .glass {
    @apply bg-background/80 backdrop-blur-md border border-border/50;
  }

  /* Container queries support */
  .container-xs {
    @apply max-w-screen-xs;
  }

  /* Focus visible styles */
  .focus-ring {
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2;
  }
}
```

### 5.3 Responsive Breakpoints

| Breakpoint | Width | Usage | Example |
|------------|-------|-------|---------|
| `xs` (default) | < 640px | Mobile portrait | 1 column grids, stacked layout |
| `sm` | >= 640px | Mobile landscape | 2 column grids, horizontal nav possible |
| `md` | >= 768px | Tablet | 2-3 column grids, show filters inline |
| `lg` | >= 1024px | Desktop | 3-4 column grids, full navigation |
| `xl` | >= 1280px | Large desktop | Max 4 columns, wider containers |
| `2xl` | >= 1536px | Ultra-wide | Container max-width 1400px |

**Mobile-First Examples**:

```tsx
// Grid responsiveness
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {projects.map(project => <ProjectCard key={project.id} {...project} />)}
</div>

// Typography scaling
<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
  Vicente Rivas Monferrer
</h1>

// Spacing adaptation
<section className="px-4 py-8 md:px-6 md:py-12 lg:px-8 lg:py-16">

// Conditional visibility
<div className="hidden lg:flex">Desktop Navigation</div>
<div className="lg:hidden">Mobile Menu Button</div>

// Flexible layouts
<div className="flex flex-col lg:flex-row gap-8">
  <aside className="lg:w-1/4">Sidebar</aside>
  <main className="lg:w-3/4">Content</main>
</div>
```

### 5.4 Dark Mode Implementation

```tsx
// /components/providers/ThemeProvider.tsx
'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

```tsx
// /components/layout/ThemeToggle.tsx
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

**Usage in RootLayout**:
```tsx
// /app/layout.tsx
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 5.5 Animation Strategy with Framer Motion

```tsx
// /components/shared/AnimatedSection.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  delay = 0
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Animation Presets**:
```typescript
// /lib/utils/animations.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3 },
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
```

---

## 6. Client vs Server Components

### 6.1 Server Components (Default)

**Use Server Components for**:
- Static content
- Data fetching
- SEO-critical content
- Performance-sensitive areas

**Examples**:
- All page components (`page.tsx` files)
- Layout components (Header, Footer)
- ProjectCard, ProjectDetail
- Biography, Education sections
- SEO metadata components

### 6.2 Client Components ("use client")

**Use Client Components for**:
- Interactivity (clicks, hovers, inputs)
- Browser APIs (localStorage, window)
- State management (useState, useContext)
- Effects (useEffect)
- Event handlers
- Third-party libraries requiring browser APIs

**Required Client Components**:

| Component | Reason |
|-----------|--------|
| `ThemeProvider` | Uses localStorage, useEffect |
| `ThemeToggle` | onClick handlers, useTheme hook |
| `MobileNav` | State for open/closed, onClick |
| `Hero` | Framer Motion animations |
| `TypeWriter` | useEffect for animation |
| `AnimatedSection` | Intersection Observer, Framer Motion |
| `TechStack` | Hover effects, animations |
| `Timeline` | Scroll-based animations |
| `ProjectSearch` | Input state, onChange handlers |
| `ProjectFilters` | Filter state, onChange handlers |
| `ContactForm` | Form state, validation, submission |
| `ScrollToTop` | Scroll position tracking, onClick |
| `Skills` | Interactive hover states |

**Optimization Pattern**:
```tsx
// BAD: Making entire page client component
'use client';
export default function ProjectsPage() {
  // ...
}

// GOOD: Isolate interactivity to small components
// /app/projects/page.tsx (Server Component)
export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <ProjectFilters /> {/* Client Component */}
      <ProjectGrid projects={projects} /> {/* Server Component */}
    </div>
  );
}

// /components/projects/ProjectFilters.tsx (Client Component)
'use client';
export function ProjectFilters() {
  const [filters, setFilters] = useState({});
  // Interactive logic here
}
```

### 6.3 Client/Server Boundary Rules

1. **Server Components can import Client Components** ✅
2. **Client Components CANNOT import Server Components** ❌
3. **Pass Server Components as children to Client Components** ✅

```tsx
// WRONG
'use client';
import ServerComponent from './ServerComponent'; // Error!

// CORRECT
'use client';
export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <div onClick={...}>{children}</div>;
}

// Then in Server Component
<ClientWrapper>
  <ServerComponent />
</ClientWrapper>
```

---

## 7. State Management Plan

### 7.1 State Management Strategy

| State Type | Solution | Usage |
|------------|----------|-------|
| **Server State** | TanStack Query | GitHub API data, cached fetches |
| **Client State** | React useState | Component-local state (modals, forms) |
| **Global Client State** | Zustand | Theme, user preferences, filters |
| **URL State** | searchParams | Filters, pagination, sorting |
| **Form State** | React Hook Form | Contact form, complex inputs |

### 7.2 TanStack Query Setup

```tsx
// /components/providers/QueryProvider.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

**Custom Hook Example**:
```tsx
// /lib/hooks/useGitHub.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { getRepositories, getRepository } from '@/lib/github/queries';

export function useRepositories() {
  return useQuery({
    queryKey: ['repositories'],
    queryFn: getRepositories,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
}

export function useRepository(slug: string) {
  return useQuery({
    queryKey: ['repository', slug],
    queryFn: () => getRepository(slug),
    enabled: !!slug,
  });
}
```

### 7.3 Zustand Store (Optional for Phase 1)

```tsx
// /lib/store/useStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // Filter preferences
  projectFilters: {
    category: string;
    tech: string[];
    sort: string;
  };
  setProjectFilters: (filters: Partial<AppState['projectFilters']>) => void;

  // View preferences
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      projectFilters: {
        category: 'all',
        tech: [],
        sort: 'recent',
      },
      setProjectFilters: (filters) =>
        set((state) => ({
          projectFilters: { ...state.projectFilters, ...filters },
        })),

      viewMode: 'grid',
      setViewMode: (mode) => set({ viewMode: mode }),
    }),
    {
      name: 'visitech-storage',
    }
  )
);
```

### 7.4 Form State with React Hook Form

```tsx
// /components/home/CallToAction.tsx (ContactForm part)
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(data: ContactFormValues) {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to send message');

      toast.success('Message sent successfully!');
      form.reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your message..."
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Form>
  );
}
```

---

## 8. Props & Types for Key Components

### 8.1 TypeScript Interfaces

```typescript
// /lib/types/project.ts
export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  open_issues_count: number;
  license: License | null;
  visibility: 'public' | 'private';
  default_branch: string;

  // Custom enriched fields
  category?: ProjectCategory;
  featured?: boolean;
  role?: string;
  period?: string;
  team_size?: number;
  status?: 'active' | 'completed' | 'archived';
  thumbnail?: string;
  demo_url?: string;
}

export interface License {
  key: string;
  name: string;
  spdx_id: string;
  url: string | null;
}

export type ProjectCategory =
  | 'robotics'
  | 'ai'
  | 'web'
  | 'iot'
  | 'games'
  | 'tools'
  | 'academic';

export interface LanguageStats {
  [language: string]: number;
}

export interface ProjectFilters {
  category?: ProjectCategory | 'all';
  tech?: string[];
  sort?: 'recent' | 'stars' | 'name' | 'updated';
  search?: string;
}
```

### 8.2 Component Props

```typescript
// ProjectCard Props
interface ProjectCardProps {
  repository: Repository;
  priority?: boolean; // For image loading priority
  showStats?: boolean;
}

// ProjectGrid Props
interface ProjectGridProps {
  repositories: Repository[];
  filters?: ProjectFilters;
  viewMode?: 'grid' | 'list';
}

// ProjectFilters Props
interface ProjectFiltersProps {
  onFilterChange: (filters: ProjectFilters) => void;
  initialFilters?: ProjectFilters;
}

// ProjectDetail Props
interface ProjectDetailProps {
  repository: Repository;
  languages: LanguageStats;
  relatedProjects?: Repository[];
}

// ReadmeViewer Props
interface ReadmeViewerProps {
  content: string;
  className?: string;
}

// TechBadge Props
interface TechBadgeProps {
  tech: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  variant?: 'default' | 'outline' | 'secondary';
}

// AnimatedSection Props
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

// Timeline Props
interface TimelineProps {
  items: TimelineItem[];
}

interface TimelineItem {
  id: string;
  year: number;
  title: string;
  description: string;
  category: 'education' | 'project' | 'achievement';
  icon?: React.ReactNode;
}

// Skills Props
interface SkillsProps {
  categories: SkillCategory[];
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  level: number; // 0-100
  projects?: number; // Number of projects using this skill
  icon?: React.ReactNode;
}
```

---

## 9. Accessibility Checklist

### 9.1 WCAG AA Compliance Requirements

- [ ] **Keyboard Navigation**
  - All interactive elements focusable with Tab
  - Skip to main content link
  - Focus visible indicators (ring)
  - No keyboard traps

- [ ] **Screen Reader Support**
  - Semantic HTML (header, nav, main, article, aside, footer)
  - ARIA labels where needed
  - Alt text for all images
  - Form labels properly associated
  - Live regions for dynamic content

- [ ] **Color Contrast**
  - Minimum 4.5:1 for normal text
  - Minimum 3:1 for large text
  - Sufficient contrast in both light and dark modes
  - Don't rely solely on color for information

- [ ] **Responsive & Zoom**
  - Functional at 200% zoom
  - No horizontal scrolling at mobile sizes
  - Touch targets minimum 44x44px
  - Readable at all viewport sizes

- [ ] **Forms**
  - Clear error messages
  - Inline validation with accessible feedback
  - Required fields marked
  - Labels visible (not just placeholders)

- [ ] **Media**
  - Images have alt text or aria-label
  - Videos have captions (future)
  - No auto-playing media
  - Pauseable animations

### 9.2 Implementation Examples

```tsx
// Skip to main content
// /components/layout/Header.tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground"
>
  Skip to main content
</a>

// Main content landmark
// /app/layout.tsx
<main id="main-content" className="flex-1">
  {children}
</main>

// Accessible button
<Button
  aria-label="Toggle dark mode"
  onClick={toggleTheme}
>
  <Sun className="h-5 w-5" aria-hidden="true" />
</Button>

// Accessible form
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel htmlFor="email">Email</FormLabel>
      <FormControl>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          aria-required="true"
          aria-invalid={!!form.formState.errors.email}
          aria-describedby={
            form.formState.errors.email ? "email-error" : undefined
          }
          {...field}
        />
      </FormControl>
      <FormMessage id="email-error" />
    </FormItem>
  )}
/>

// Screen reader only text
<span className="sr-only">View project details</span>

// Accessible loading state
<Button disabled={isLoading}>
  {isLoading && (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
      <span className="sr-only">Loading...</span>
    </>
  )}
  Submit
</Button>
```

---

## 10. Implementation Priority

### Phase 1: Core Structure (Week 1)

1. **Day 1: Setup & Layout**
   - [ ] Initialize Next.js project with TypeScript
   - [ ] Configure Tailwind CSS
   - [ ] Install shadcn/ui components
   - [ ] Create RootLayout with providers
   - [ ] Build Header, Footer, Navigation
   - [ ] Implement ThemeProvider and ThemeToggle

2. **Day 2: Homepage**
   - [ ] Hero section with animations
   - [ ] FeaturedProjects component
   - [ ] TechStack component
   - [ ] Basic Timeline
   - [ ] CallToAction with form

3. **Day 3: Projects**
   - [ ] GitHub API client setup
   - [ ] Projects listing page
   - [ ] ProjectCard component
   - [ ] ProjectFilters component
   - [ ] ProjectSearch component

4. **Day 4: Project Detail**
   - [ ] Dynamic project detail page
   - [ ] ReadmeViewer with markdown rendering
   - [ ] ProjectStats component
   - [ ] Related projects section

5. **Day 5: About & Polish**
   - [ ] About page components
   - [ ] Skills matrix
   - [ ] Education timeline
   - [ ] Responsive testing
   - [ ] Accessibility audit

6. **Day 6: Performance & SEO**
   - [ ] Image optimization
   - [ ] Metadata for all pages
   - [ ] Sitemap and robots.txt
   - [ ] Lighthouse testing
   - [ ] Loading and error states

7. **Day 7: Deployment**
   - [ ] Environment variables setup
   - [ ] Vercel deployment
   - [ ] Analytics integration
   - [ ] Final testing
   - [ ] Documentation

### Phase 2: Enhancements (Future)

- [ ] Blog section with MDX
- [ ] Project view counters
- [ ] Advanced animations
- [ ] Multilingual support (ES/EN)
- [ ] PWA features
- [ ] Advanced filtering with facets
- [ ] Project comparison tool
- [ ] Interactive resume viewer
- [ ] Testimonials section

---

## 11. File Creation Order

### Step 1: Configuration Files
1. `tailwind.config.ts`
2. `tsconfig.json`
3. `next.config.mjs`
4. `.env.local`
5. `components.json` (shadcn config)

### Step 2: Type Definitions
1. `/lib/types/global.d.ts`
2. `/lib/types/github.ts`
3. `/lib/types/project.ts`
4. `/lib/types/api.ts`

### Step 3: Utilities & Helpers
1. `/lib/utils/cn.ts`
2. `/lib/utils/formatting.ts`
3. `/lib/utils/animations.ts`

### Step 4: shadcn/ui Components
Run all `npx shadcn-ui@latest add` commands

### Step 5: Providers
1. `/components/providers/ThemeProvider.tsx`
2. `/components/providers/QueryProvider.tsx`
3. `/components/providers/AnalyticsProvider.tsx`

### Step 6: Layout Components
1. `/components/layout/Header.tsx`
2. `/components/layout/Navigation.tsx`
3. `/components/layout/MobileNav.tsx`
4. `/components/layout/Footer.tsx`
5. `/components/layout/ThemeToggle.tsx`
6. `/components/layout/ScrollToTop.tsx`

### Step 7: Root Layout
1. `/app/globals.css`
2. `/app/layout.tsx`
3. `/app/loading.tsx`
4. `/app/error.tsx`
5. `/app/not-found.tsx`

### Step 8: Shared Components
1. `/components/shared/AnimatedSection.tsx`
2. `/components/shared/GradientText.tsx`
3. `/components/shared/TypeWriter.tsx`
4. `/components/shared/LoadingSpinner.tsx`

### Step 9: GitHub Integration
1. `/lib/github/client.ts`
2. `/lib/github/queries.ts`
3. `/lib/github/transforms.ts`

### Step 10: Homepage Components
1. `/components/home/Hero.tsx`
2. `/components/home/FeaturedProjects.tsx`
3. `/components/home/TechStack.tsx`
4. `/components/home/Timeline.tsx`
5. `/components/home/Achievements.tsx`
6. `/components/home/CallToAction.tsx`

### Step 11: Homepage
1. `/app/page.tsx`

### Step 12: Projects Components
1. `/components/projects/TechBadge.tsx`
2. `/components/projects/ProjectCard.tsx`
3. `/components/projects/ProjectGrid.tsx`
4. `/components/projects/ProjectSearch.tsx`
5. `/components/projects/ProjectFilters.tsx`
6. `/components/projects/ProjectStats.tsx`
7. `/components/projects/ReadmeViewer.tsx`
8. `/components/projects/ProjectDetail.tsx`

### Step 13: Projects Pages
1. `/app/projects/page.tsx`
2. `/app/projects/[slug]/page.tsx`
3. `/app/projects/[slug]/loading.tsx`

### Step 14: About Components
1. `/components/about/Biography.tsx`
2. `/components/about/Skills.tsx`
3. `/components/about/Education.tsx`
4. `/components/about/Languages.tsx`
5. `/components/about/Interests.tsx`

### Step 15: About Page
1. `/app/about/page.tsx`

### Step 16: API Routes
1. `/app/api/github/repos/route.ts`
2. `/app/api/github/readme/route.ts`
3. `/app/api/contact/route.ts`
4. `/app/api/revalidate/route.ts`

### Step 17: SEO & Meta
1. `/app/sitemap.ts`
2. `/app/robots.ts`
3. `/app/manifest.ts`

---

## 12. Success Criteria

### Functional Requirements
- [ ] All 33 repositories displayed on projects page
- [ ] Featured projects highlighted on homepage
- [ ] Project detail pages with README rendering
- [ ] Working contact form
- [ ] Dark mode toggle functional
- [ ] Responsive on all screen sizes
- [ ] All navigation working

### Performance Requirements
- [ ] Lighthouse Performance > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Bundle size < 300KB gzipped
- [ ] All images optimized

### Accessibility Requirements
- [ ] Lighthouse Accessibility > 95
- [ ] Keyboard navigation working
- [ ] Screen reader compatible
- [ ] WCAG AA color contrast
- [ ] All interactive elements accessible

### SEO Requirements
- [ ] Lighthouse SEO = 100
- [ ] Meta descriptions for all pages
- [ ] Open Graph images
- [ ] Sitemap generated
- [ ] Structured data implemented

---

## 13. Testing Strategy

### Unit Tests (Vitest)
```bash
# Test utilities
/tests/unit/utils/formatting.test.ts
/tests/unit/utils/animations.test.ts

# Test components
/tests/unit/components/ProjectCard.test.tsx
/tests/unit/components/TechBadge.test.tsx
/tests/unit/components/ContactForm.test.tsx
```

### Integration Tests
```bash
# Test page rendering
/tests/integration/pages/home.test.tsx
/tests/integration/pages/projects.test.tsx

# Test API routes
/tests/integration/api/github.test.ts
/tests/integration/api/contact.test.ts
```

### E2E Tests (Playwright)
```bash
# Critical user flows
/tests/e2e/navigation.spec.ts
/tests/e2e/project-search.spec.ts
/tests/e2e/contact-form.spec.ts
/tests/e2e/dark-mode.spec.ts
```

---

## 14. Quick Reference Commands

```bash
# Project setup
npx create-next-app@latest visitech-portfolio --typescript --tailwind --app
cd visitech-portfolio

# Install dependencies
npm install zustand @tanstack/react-query framer-motion lucide-react
npm install react-hook-form @hookform/resolvers zod
npm install next-themes date-fns
npm install @vercel/analytics @vercel/speed-insights

# Install dev dependencies
npm install -D @types/node @typescript-eslint/eslint-plugin prettier

# shadcn/ui init
npx shadcn-ui@latest init

# Add shadcn components (run all at once)
npx shadcn-ui@latest add button card badge avatar navigation-menu sheet tooltip skeleton alert input textarea select dropdown-menu scroll-area dialog form label separator tabs

# Development
npm run dev

# Build
npm run build

# Lint
npm run lint

# Type check
npx tsc --noEmit

# Test
npm run test
npm run test:e2e

# Deploy to Vercel
vercel --prod
```

---

## Conclusion

This implementation plan provides a complete roadmap for building Vicente Rivas Monferrer's portfolio. The architecture prioritizes:

1. **Performance**: Server Components, static generation, image optimization
2. **Developer Experience**: TypeScript, clear structure, shadcn/ui
3. **User Experience**: Responsive, accessible, fast, beautiful
4. **Maintainability**: Modular components, clear separation of concerns
5. **Scalability**: Ready for future enhancements

**Estimated Implementation Time**: 6-8 hours for MVP (all core features)

**Next Steps**:
1. Review this plan with UI/UX planner for design specifications
2. Begin implementation with EXECUTOR agent
3. Test and iterate
4. Deploy to Vercel

---

**Document Status**: ✅ COMPLETE
**Ready for**: UI/UX Planning & Execution
**Last Updated**: 2025-10-01
