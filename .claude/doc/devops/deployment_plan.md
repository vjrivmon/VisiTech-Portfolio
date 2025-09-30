# DevOps Deployment Plan - ViSiTech Portfolio

**Project**: visitech-portfolio
**Framework**: Next.js 14 (App Router)
**Deployment Platform**: Vercel
**Version**: 1.0.0
**Created**: 2025-10-01
**Author**: DevOps Planner Agent

---

## Table of Contents

1. [Vercel Configuration](#1-vercel-configuration)
2. [Environment Variables](#2-environment-variables)
3. [GitHub Actions Workflows](#3-github-actions-workflows)
4. [Security Headers](#4-security-headers)
5. [Performance Optimizations](#5-performance-optimizations)
6. [Custom Domain Setup](#6-custom-domain-setup)
7. [Monitoring & Analytics](#7-monitoring--analytics)
8. [Webhook Integration](#8-webhook-integration)
9. [Rollback Procedures](#9-rollback-procedures)
10. [Deployment Checklist](#10-deployment-checklist)

---

## 1. Vercel Configuration

### 1.1 vercel.json

Create `/vercel.json` in the project root:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-DNS-Prefetch-Control",
          "value": "on"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    },
    {
      "source": "/api/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "s-maxage=3600, stale-while-revalidate"
        }
      ]
    },
    {
      "source": "/:path*.(jpg|jpeg|png|webp|avif|gif|svg)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ],
  "rewrites": []
}
```

### 1.2 Project Settings (Vercel Dashboard)

Navigate to **Project Settings** in Vercel Dashboard:

| Setting | Value | Description |
|---------|-------|-------------|
| **Framework Preset** | Next.js | Auto-detected |
| **Build Command** | `npm run build` | Next.js production build |
| **Output Directory** | `.next` | Default Next.js output |
| **Install Command** | `npm install` | Install dependencies |
| **Development Command** | `npm run dev` | Local development |
| **Root Directory** | `./` | Project root |
| **Node.js Version** | 18.x | LTS version |

### 1.3 Build & Development Settings

**Build Settings**:
- Include source files in deployment: No
- Automatically expose System Environment Variables: Yes
- Git LFS: Disabled (not needed)

**Function Settings**:
- Maximum duration: 10 seconds
- Regions: Washington, D.C., USA (iad1)
- Memory allocation: 1024 MB

---

## 2. Environment Variables

### 2.1 Required Environment Variables

#### Production Environment (.env.production)

```bash
# GitHub API Integration
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_USERNAME=vjrivmon

# Application Configuration
NEXT_PUBLIC_SITE_URL=https://vicentrivas.dev
NEXT_PUBLIC_SITE_NAME=Vicente Rivas Portfolio

# ISR Revalidation
REVALIDATE_SECRET=your-secure-random-string-here

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=auto

# Optional: Error Tracking
SENTRY_DSN=https://xxxx@sentry.io/xxxxx
SENTRY_AUTH_TOKEN=xxxxx

# Optional: Contact Form (if implemented)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=vicenterivasmonferrer12@gmail.com
SMTP_PASS=app-specific-password

# Optional: Database (Vercel KV for view counts)
KV_REST_API_URL=https://xxx.kv.vercel-storage.com
KV_REST_API_TOKEN=xxxxx
```

#### Development Environment (.env.local)

```bash
# GitHub API Integration
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_USERNAME=vjrivmon

# Application Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Vicente Rivas Portfolio [DEV]

# ISR Revalidation
REVALIDATE_SECRET=local_development_secret

# Development-only variables
NEXT_PUBLIC_SHOW_DEBUG=true
```

### 2.2 Vercel Dashboard Setup

**Steps to configure in Vercel**:

1. Go to **Project Settings** → **Environment Variables**
2. Add each variable with appropriate scope:
   - `Production`: Production deployments
   - `Preview`: Preview deployments (PRs)
   - `Development`: Local development (synced via `vercel env pull`)

**Security Considerations**:
- Never commit `.env.local` or `.env.production` to Git
- Use `.env.example` as template
- Rotate secrets regularly
- Use Vercel's encrypted storage

### 2.3 GitHub Token Permissions

Create GitHub Personal Access Token with:
- **Scope**: `public_repo` (read-only access to public repositories)
- **Expiration**: 90 days (recommended)
- **Regeneration**: Set calendar reminder

---

## 3. GitHub Actions Workflows

### 3.1 CI Pipeline - .github/workflows/ci.yml

```yaml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    name: Lint & Format Check
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Check formatting
        run: npm run format:check

  typecheck:
    name: TypeScript Type Check
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run type check
        run: npm run type-check

  build:
    name: Build Application
    runs-on: ubuntu-latest
    needs: [lint, typecheck]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Next.js app
        run: npm run build
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GITHUB_USERNAME: vjrivmon

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: .next
          retention-days: 7

  test:
    name: Run Tests
    runs-on: ubuntu-latest
    needs: [lint, typecheck]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test
        if: hashFiles('**/*.test.ts', '**/*.test.tsx') != ''

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        if: hashFiles('coverage/**') != ''
        with:
          files: ./coverage/coverage-final.json
```

### 3.2 Lighthouse CI - .github/workflows/lighthouse.yml

```yaml
name: Lighthouse CI

on:
  deployment_status:

jobs:
  lighthouse:
    name: Lighthouse Audit
    runs-on: ubuntu-latest
    if: github.event.deployment_status.state == 'success'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Wait for deployment
        run: sleep 30

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            ${{ github.event.deployment_status.target_url }}
            ${{ github.event.deployment_status.target_url }}/projects
            ${{ github.event.deployment_status.target_url }}/about
          uploadArtifacts: true
          temporaryPublicStorage: true
          budgetPath: .github/lighthouse/budget.json
          configPath: .github/lighthouse/lighthouserc.json

      - name: Check Lighthouse scores
        run: |
          if [ $(cat lhci_reports/manifest.json | jq -r '.[0].summary.performance') -lt 0.90 ]; then
            echo "Performance score below 90!"
            exit 1
          fi

          if [ $(cat lhci_reports/manifest.json | jq -r '.[0].summary.accessibility') -lt 0.95 ]; then
            echo "Accessibility score below 95!"
            exit 1
          fi

      - name: Comment PR
        uses: actions/github-script@v7
        if: github.event_name == 'pull_request'
        with:
          script: |
            const fs = require('fs');
            const results = JSON.parse(fs.readFileSync('lhci_reports/manifest.json'));
            const summary = results[0].summary;

            const comment = `## Lighthouse CI Results 🚦

            | Metric | Score |
            |--------|-------|
            | Performance | ${(summary.performance * 100).toFixed(0)}% |
            | Accessibility | ${(summary.accessibility * 100).toFixed(0)}% |
            | Best Practices | ${(summary['best-practices'] * 100).toFixed(0)}% |
            | SEO | ${(summary.seo * 100).toFixed(0)}% |

            [View full report](${results[0].url})`;

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
```

### 3.3 Lighthouse Configuration Files

**.github/lighthouse/lighthouserc.json**:

```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "settings": {
        "preset": "desktop",
        "throttling": {
          "rttMs": 40,
          "throughputKbps": 10240,
          "cpuSlowdownMultiplier": 1
        }
      }
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.95}],
        "first-contentful-paint": ["error", {"maxNumericValue": 1500}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}],
        "total-blocking-time": ["error", {"maxNumericValue": 300}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

**.github/lighthouse/budget.json**:

```json
{
  "resourceSizes": [
    {
      "resourceType": "script",
      "budget": 250
    },
    {
      "resourceType": "stylesheet",
      "budget": 50
    },
    {
      "resourceType": "image",
      "budget": 200
    },
    {
      "resourceType": "font",
      "budget": 100
    },
    {
      "resourceType": "total",
      "budget": 600
    }
  ],
  "resourceCounts": [
    {
      "resourceType": "third-party",
      "budget": 10
    }
  ],
  "timings": [
    {
      "metric": "first-contentful-paint",
      "budget": 1500
    },
    {
      "metric": "interactive",
      "budget": 3500
    }
  ]
}
```

### 3.4 Scheduled Revalidation - .github/workflows/revalidate.yml

```yaml
name: Daily Content Revalidation

on:
  schedule:
    # Run daily at 2 AM UTC
    - cron: '0 2 * * *'
  workflow_dispatch: # Allow manual trigger

jobs:
  revalidate:
    name: Trigger ISR Revalidation
    runs-on: ubuntu-latest

    steps:
      - name: Trigger revalidate endpoint
        run: |
          curl -X POST https://vicentrivas.dev/api/revalidate \
            -H "Content-Type: application/json" \
            -d '{"secret": "${{ secrets.REVALIDATE_SECRET }}"}'

      - name: Notify on failure
        if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: 'Daily revalidation failed',
              body: 'The scheduled ISR revalidation failed. Please check the workflow logs.',
              labels: ['bug', 'automated']
            });
```

---

## 4. Security Headers

### 4.1 Next.js Configuration (next.config.mjs)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'raw.githubusercontent.com',
      'github.com',
      'opengraph.githubassets.com',
      'avatars.githubusercontent.com'
    ],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // SWC minification
  swcMinify: true,

  // React strict mode
  reactStrictMode: true,

  // Power by header
  poweredByHeader: false,

  // Compression
  compress: true,

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: blob: https://raw.githubusercontent.com https://github.com https://avatars.githubusercontent.com https://opengraph.githubassets.com;
              font-src 'self' data:;
              connect-src 'self' https://api.github.com https://vitals.vercel-insights.com;
              frame-ancestors 'self';
              base-uri 'self';
              form-action 'self';
            `.replace(/\s{2,}/g, ' ').trim()
          }
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Bundle analyzer (development only)
  webpack: (config, { isServer }) => {
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: isServer
            ? '../analyze/server.html'
            : './analyze/client.html',
          openAnalyzer: false,
        })
      );
    }
    return config;
  },
};

export default nextConfig;
```

### 4.2 CORS Configuration for API Routes

**app/api/revalidate/route.ts**:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const ALLOWED_ORIGINS = [
  'https://n8n.yourdomain.com', // N8N instance
  'https://vicentrivas.dev',
];

export async function POST(request: NextRequest) {
  // CORS check
  const origin = request.headers.get('origin');
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json(
      { error: 'Origin not allowed' },
      { status: 403 }
    );
  }

  // Secret validation
  const body = await request.json();
  if (body.secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: 'Invalid secret' },
      { status: 401 }
    );
  }

  // Revalidate paths
  try {
    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/about');

    return NextResponse.json(
      { revalidated: true, now: Date.now() },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': origin || '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');

  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
```

---

## 5. Performance Optimizations

### 5.1 Font Loading Strategy

**app/layout.tsx**:

```typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

### 5.2 Image Optimization

**components/OptimizedImage.tsx**:

```typescript
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export default function OptimizedImage({
  src,
  alt,
  priority = false,
  className,
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={630}
      priority={priority}
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,..." // Generate blur placeholder
      className={className}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
```

### 5.3 Dynamic Imports

**app/projects/page.tsx**:

```typescript
import dynamic from 'next/dynamic';

// Lazy load heavy components
const ProjectFilters = dynamic(() => import('@/components/projects/ProjectFilters'), {
  loading: () => <FiltersSkeleton />,
  ssr: false, // Client-side only if needed
});

const ProjectGrid = dynamic(() => import('@/components/projects/ProjectGrid'), {
  loading: () => <GridSkeleton />,
});
```

### 5.4 Caching Strategy

**lib/github/client.ts**:

```typescript
export async function fetchRepositories() {
  const response = await fetch('https://api.github.com/users/vjrivmon/repos', {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    next: {
      revalidate: 3600, // Revalidate every hour
      tags: ['repositories'],
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }

  return response.json();
}
```

### 5.5 Bundle Size Monitoring

**package.json scripts**:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "analyze": "ANALYZE=true npm run build",
    "test": "vitest",
    "test:e2e": "playwright test"
  }
}
```

---

## 6. Custom Domain Setup

### 6.1 DNS Configuration

**Domain Provider Settings** (e.g., Namecheap, GoDaddy, Cloudflare):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 3600 |
| AAAA | @ | 2606:50c0:8000::153 | 3600 |
| CNAME | www | cname.vercel-dns.com | 3600 |

### 6.2 Vercel Domain Configuration

**Steps**:

1. Go to **Project Settings** → **Domains**
2. Add domain: `vicentrivas.dev`
3. Add www subdomain: `www.vicentrivas.dev`
4. Wait for DNS propagation (up to 48 hours, usually < 1 hour)
5. Verify SSL certificate is issued

### 6.3 Domain Redirects

**Redirect Rules** (configured in Vercel):

- `www.vicentrivas.dev` → `vicentrivas.dev` (301 permanent)
- `http://vicentrivas.dev` → `https://vicentrivas.dev` (automatic)

### 6.4 SSL/TLS Configuration

**Automatic Configuration**:
- Vercel auto-provisions SSL certificates via Let's Encrypt
- Certificates auto-renew 30 days before expiration
- HTTPS enforced by default
- HTTP/2 and HTTP/3 enabled

---

## 7. Monitoring & Analytics

### 7.1 Vercel Analytics Setup

**Installation**:

```bash
npm install @vercel/analytics @vercel/speed-insights
```

**app/layout.tsx**:

```typescript
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### 7.2 Core Web Vitals Tracking

**Metrics to Monitor**:

| Metric | Target | Critical Threshold |
|--------|--------|-------------------|
| Largest Contentful Paint (LCP) | < 2.0s | < 2.5s |
| First Input Delay (FID) | < 50ms | < 100ms |
| Cumulative Layout Shift (CLS) | < 0.05 | < 0.1 |
| First Contentful Paint (FCP) | < 1.2s | < 1.5s |
| Time to First Byte (TTFB) | < 600ms | < 800ms |
| Interaction to Next Paint (INP) | < 200ms | < 500ms |

### 7.3 Error Tracking (Optional: Sentry)

**Installation**:

```bash
npm install @sentry/nextjs
```

**sentry.client.config.ts**:

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
```

### 7.4 Performance Alerts

**Vercel Dashboard Configuration**:

1. Navigate to **Project Settings** → **Speed Insights**
2. Set performance budget alerts:
   - Alert when performance score drops below 90
   - Alert when LCP exceeds 2.5s
   - Alert when CLS exceeds 0.1

---

## 8. Webhook Integration

### 8.1 ISR Revalidation Endpoint

**app/api/revalidate/route.ts**:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate secret
    if (body.secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Revalidate specific path or tag
    if (body.path) {
      revalidatePath(body.path);
    }

    if (body.tag) {
      revalidateTag(body.tag);
    }

    // Default: revalidate all project pages
    if (!body.path && !body.tag) {
      revalidatePath('/');
      revalidatePath('/projects');
      revalidatePath('/about');
      revalidateTag('repositories');
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      path: body.path,
      tag: body.tag,
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
}
```

### 8.2 N8N Webhook Configuration

**Webhook URL**: `https://vicentrivas.dev/api/revalidate`

**Request Format**:

```json
{
  "secret": "your-revalidate-secret",
  "path": "/projects/aidguide_04",
  "tag": "repositories"
}
```

**Trigger Events**:
- GitHub repository push
- GitHub repository updated
- GitHub release created
- Manual trigger

### 8.3 GitHub Webhook (Alternative)

**app/api/webhook/github/route.ts**:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import crypto from 'crypto';

function verifySignature(payload: string, signature: string): boolean {
  const hmac = crypto.createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET!);
  const digest = `sha256=${hmac.update(payload).digest('hex')}`;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-hub-signature-256');
    const payload = await request.text();

    // Verify webhook signature
    if (!signature || !verifySignature(payload, signature)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const event = JSON.parse(payload);

    // Handle push events
    if (event.action === 'push') {
      revalidateTag('repositories');
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
```

---

## 9. Rollback Procedures

### 9.1 Instant Rollback (Vercel Dashboard)

**Steps**:

1. Navigate to **Deployments** in Vercel Dashboard
2. Locate the last stable deployment
3. Click the three-dot menu → **Promote to Production**
4. Confirm the promotion
5. **Result**: Instant rollback (< 30 seconds)

**When to Use**:
- Critical production bug detected
- Performance degradation
- Build breaks production

### 9.2 Git-Based Rollback

**Commands**:

```bash
# Identify the commit to revert to
git log --oneline

# Option 1: Revert specific commit
git revert <commit-hash>
git push origin main

# Option 2: Reset to specific commit (use with caution)
git reset --hard <commit-hash>
git push origin main --force

# Option 3: Create fix on new branch
git checkout -b hotfix/revert-issue
git revert <commit-hash>
git push origin hotfix/revert-issue
# Then merge via PR
```

### 9.3 Environment Variable Rollback

**Steps**:

1. Go to **Project Settings** → **Environment Variables**
2. Click on variable history
3. Revert to previous value
4. Trigger new deployment or wait for auto-redeploy

### 9.4 Monitoring After Rollback

**Checklist**:

- [ ] Verify homepage loads
- [ ] Check /projects page
- [ ] Test API routes
- [ ] Monitor error rates in Sentry
- [ ] Check Core Web Vitals
- [ ] Verify analytics tracking
- [ ] Test on mobile devices
- [ ] Confirm SEO meta tags

---

## 10. Deployment Checklist

### 10.1 Pre-Deployment Checklist

**Initial Setup**:

- [ ] Create Vercel account
- [ ] Link GitHub repository
- [ ] Configure Vercel project settings
- [ ] Set up custom domain (if applicable)
- [ ] Enable Vercel Analytics
- [ ] Install Vercel CLI: `npm i -g vercel`

**Environment Variables**:

- [ ] Add `GITHUB_TOKEN` to Vercel
- [ ] Add `GITHUB_USERNAME` to Vercel
- [ ] Add `REVALIDATE_SECRET` to Vercel
- [ ] Add `NEXT_PUBLIC_SITE_URL` to Vercel
- [ ] Test environment variables locally with `vercel env pull`

**Repository Setup**:

- [ ] Create `.env.example` template
- [ ] Add `.env.local` to `.gitignore`
- [ ] Configure branch protection rules
- [ ] Set up GitHub Actions secrets
- [ ] Create workflow files in `.github/workflows/`

### 10.2 Deployment Validation

**Automated Checks** (CI/CD):

- [ ] ESLint passes
- [ ] TypeScript type check passes
- [ ] Build completes successfully
- [ ] Unit tests pass (if implemented)
- [ ] Lighthouse CI passes (Performance > 90, A11y > 95)

**Manual Checks**:

- [ ] Homepage loads correctly
- [ ] Projects page displays repositories
- [ ] Project detail pages render
- [ ] About page loads
- [ ] Contact form works (if implemented)
- [ ] Dark mode toggle functions
- [ ] Mobile responsive design
- [ ] Images load optimized formats (WebP/AVIF)

### 10.3 Post-Deployment Checklist

**Functionality**:

- [ ] All pages accessible
- [ ] API routes functional
- [ ] GitHub data fetching works
- [ ] ISR revalidation endpoint works
- [ ] N8N webhook integration tested
- [ ] Error pages (404, 500) display correctly

**Performance**:

- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Verify bundle size < 300KB
- [ ] Test loading speed on 3G
- [ ] Confirm CDN caching headers

**SEO & Analytics**:

- [ ] Meta tags present on all pages
- [ ] Open Graph images working
- [ ] Sitemap accessible at /sitemap.xml
- [ ] robots.txt configured
- [ ] Vercel Analytics tracking
- [ ] Google Search Console submitted

**Security**:

- [ ] HTTPS enforced
- [ ] Security headers present
- [ ] CSP configured correctly
- [ ] No console errors in production
- [ ] API routes protected
- [ ] Secrets not exposed in client

### 10.4 Monitoring Setup

**Week 1 Post-Launch**:

- [ ] Monitor error rates daily
- [ ] Check Core Web Vitals
- [ ] Review Vercel Analytics
- [ ] Test on different devices
- [ ] Collect user feedback

**Ongoing**:

- [ ] Weekly performance reviews
- [ ] Monthly dependency updates
- [ ] Quarterly security audits
- [ ] Monitor GitHub token expiration
- [ ] Review and rotate secrets

---

## 11. Deployment Strategy

### 11.1 Branch Strategy

```
main (production)
  ├── develop (preview)
  └── feature/* (preview)
```

**Branch Rules**:

| Branch | Environment | Auto-Deploy | Protection |
|--------|-------------|-------------|------------|
| `main` | Production | Yes | Required PR reviews, status checks |
| `develop` | Preview | Yes | Optional reviews |
| `feature/*` | Preview | Yes | None |

### 11.2 Deployment Flow

```mermaid
graph LR
    A[Push to Branch] --> B{Branch Type?}
    B -->|main| C[Production Deploy]
    B -->|develop| D[Preview Deploy]
    B -->|feature/*| E[Preview Deploy]

    C --> F[Run Tests]
    D --> F
    E --> F

    F --> G{Tests Pass?}
    G -->|Yes| H[Build & Deploy]
    G -->|No| I[Fail & Notify]

    H --> J[Post-Deploy Checks]
    J --> K{Checks Pass?}
    K -->|Yes| L[Success]
    K -->|No| M[Rollback]
```

### 11.3 Preview Deployments

**Features**:
- Unique URL per PR: `https://visitech-portfolio-<hash>.vercel.app`
- Automatic HTTPS
- Production-like environment
- Deleted after PR merge
- Comment on PR with deployment URL

**Configuration**:
- Enabled by default in Vercel
- No additional setup required
- Uses same environment variables as production (configurable)

### 11.4 Production Deployment Triggers

**Automatic**:
- Push to `main` branch
- Merge PR to `main`

**Manual**:
- Vercel Dashboard → **Deployments** → **Deploy**
- Vercel CLI: `vercel --prod`

---

## 12. Performance Targets Summary

| Metric | Target | Critical | Measurement |
|--------|--------|----------|-------------|
| **Lighthouse Performance** | > 95 | > 90 | Lighthouse CI |
| **Lighthouse Accessibility** | > 98 | > 95 | Lighthouse CI |
| **Lighthouse SEO** | 100 | > 95 | Lighthouse CI |
| **First Contentful Paint** | < 1.2s | < 1.5s | Web Vitals |
| **Largest Contentful Paint** | < 2.0s | < 2.5s | Web Vitals |
| **Time to Interactive** | < 3.0s | < 3.5s | Web Vitals |
| **Cumulative Layout Shift** | < 0.05 | < 0.1 | Web Vitals |
| **First Input Delay** | < 50ms | < 100ms | Web Vitals |
| **Bundle Size (gzipped)** | < 250KB | < 300KB | Webpack Analyzer |
| **Build Time (first)** | < 10 min | < 15 min | Vercel Logs |
| **Build Time (cached)** | < 3 min | < 5 min | Vercel Logs |

---

## 13. Troubleshooting Guide

### 13.1 Build Failures

**Issue**: Build fails with TypeScript errors

**Solution**:
```bash
# Run type check locally
npm run type-check

# Fix errors and commit
git add .
git commit -m "fix: TypeScript errors"
git push
```

**Issue**: Build fails with missing environment variables

**Solution**:
1. Check Vercel Dashboard → Environment Variables
2. Ensure all required variables are set
3. Redeploy from dashboard

### 13.2 Deployment Issues

**Issue**: Deployment is stuck

**Solution**:
1. Cancel deployment in Vercel Dashboard
2. Check GitHub Actions status
3. Retry deployment
4. Contact Vercel support if persists

**Issue**: Preview deployment not created

**Solution**:
1. Check Vercel GitHub integration
2. Ensure PR is from same repository (not fork)
3. Check deployment logs for errors

### 13.3 Performance Degradation

**Issue**: Lighthouse score drops below 90

**Solution**:
1. Run local Lighthouse audit
2. Check bundle size: `npm run analyze`
3. Review recent changes
4. Optimize images and lazy load components
5. Rollback if necessary

---

## 14. Maintenance Schedule

### Daily
- Monitor error rates
- Check deployment status
- Review Core Web Vitals

### Weekly
- Review Vercel Analytics
- Check GitHub API rate limits
- Test API endpoints
- Review security alerts

### Monthly
- Update dependencies
- Review and rotate secrets
- Audit bundle size
- Performance optimization review
- Backup configuration

### Quarterly
- Security audit
- Dependency major version updates
- Infrastructure review
- Performance testing
- Disaster recovery drill

---

## Conclusion

This deployment plan provides a comprehensive DevOps strategy for the ViSiTech Portfolio project. Key highlights:

1. **Zero-Downtime Deployments**: Vercel's edge network ensures seamless updates
2. **Automated CI/CD**: GitHub Actions handle testing, building, and quality checks
3. **Performance-First**: Lighthouse CI enforces performance budgets
4. **Security Hardened**: CSP, security headers, and CORS protection
5. **Monitoring**: Vercel Analytics and optional Sentry integration
6. **Scalability**: ISR with webhook revalidation for fresh content
7. **Developer Experience**: Preview deployments, automated workflows

The system is designed to achieve:
- **Lighthouse Performance > 90**
- **Lighthouse Accessibility > 95**
- **Build Time < 10 min (first), < 3 min (cached)**
- **Zero-downtime deployments**

---

**Document Version**: 1.0.0
**Last Updated**: 2025-10-01
**Next Review**: 2025-11-01
**Owner**: DevOps Team
