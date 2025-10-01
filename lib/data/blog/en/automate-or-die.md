---
title: "Automate or die: lessons I learned trying to deploy my first REST API"
slug: "automate-or-die"
excerpt: "When you try to manually deploy your first REST API and a copy-paste error breaks production on a Saturday night. The moral: without automation, every deployment is Russian roulette."
date: "2025-02-10"
author: "Vicente García"
tags: ["DevOps", "CI/CD", "Automation", "REST API"]
readingTime: "8 min"
featured: true
language: "en"
---

# Automate or die: lessons I learned trying to deploy my first REST API

It was a Saturday night. My first REST API was ready for production. Or so I thought.

## The manual deployment disaster

My plan was simple: SSH into the server, update the code, restart Nginx, and celebrate with a beer. But reality was different:

1. **First SSH connection**: I updated system packages. All good.
2. **Git pull**: Downloaded the latest code. Perfect.
3. **Nginx configuration**: Copy-pasted the configuration from my notes... and that's where the disaster began.

A simple copy-paste error in the Nginx configuration file broke the entire server. My API stopped responding. The main website too. And to top it off, I had forgotten to backup the previous configuration.

**The worst part**: It was Saturday night and I was the only one with server access.

## What went wrong?

In retrospect, everything:

- **Manual Nginx configuration**: No version control, no prior validation.
- **Environment variables**: I forgot to configure them in production. My API couldn't connect to the database.
- **No CI/CD tests**: Never tested deployment in a staging environment.
- **Impossible rollback**: I had no quick way to return to the previous version.
- **No monitoring**: I didn't know what had failed until I started manually reviewing logs.

I spent 4 hours debugging errors that an automated pipeline would have caught in minutes.

## Lesson 1: Automation is consistency

An automated pipeline removes the human factor from deployment. As cortex.io says:

> "Automation makes software consistent, reliable, and efficient."

Without automation:
- Every deployment is different
- Errors repeat themselves
- Documentation becomes obsolete
- Fear of deploying becomes culture

With automation:
- Every deployment follows the same steps
- Errors are caught early
- The process is documented in code
- Deploying becomes boring (and that's good)

## Lesson 2: Components of a CI/CD pipeline

A solid pipeline includes:

### 1. Version control
- **Git**: Everything in the repository, including infrastructure configuration
- **Branching strategy**: main/staging/development
- **Pull requests**: Code review before merging

### 2. Build server
- **GitHub Actions / GitLab CI / Jenkins**: Runs tests automatically
- **Docker**: Builds consistent images
- **Dependency cache**: Speeds up builds

### 3. Automated tests
- **Unit tests**: Validate business logic
- **Integration tests**: Verify components work together
- **E2E tests**: Simulate complete user flow

### 4. Automated deployments
- **Staging first**: Deploy to a test environment
- **Automatic validation**: Health checks, smoke tests
- **Production**: Only if staging passes all validations

## Lesson 3: Reduce human error

Humans make mistakes. I'm living proof:

- **Forgetting .env files in Docker**: My container started, but without configuration.
- **Environment variables in production**: DATABASE_URL pointed to localhost (which didn't exist in the container).
- **Accidentally deleting the main branch**: Thank God for git reflog.

Automation doesn't eliminate all errors, but it does eliminate the most common ones:

- **Configuration validation**: The pipeline verifies necessary variables exist
- **Smoke tests**: Basic HTTP requests to confirm the service responds
- **Automatic rollback**: If something fails, return to the previous version without manual intervention

## Lesson 4: Feature flags and safe rollbacks

Not all deployments go well. That's why you need:

### Feature flags
Deploy new code, but deactivated:

```javascript
if (featureFlags.newCheckoutFlow) {
  return newCheckout();
} else {
  return legacyCheckout();
}
```

**Advantages**:
- Deploy without activating functionality
- You can do A/B testing
- Deactivate features without redeploying

### Quick rollbacks
If something fails in production:

```bash
# With Docker tags
docker pull myapi:v1.2.3-previous
docker-compose up -d

# With Kubernetes
kubectl rollout undo deployment/myapi
```

## Lesson 5: Monitoring and continuous feedback

Deploying is not the end. You need to know if something fails:

### Centralized logs
- **ELK Stack / Loki**: Aggregates logs from all services
- **Structured logging**: JSON for efficient searches

### Metrics
- **Prometheus + Grafana**: CPU, memory, latency, error rate
- **Alerts**: Notifications when something's wrong

### Tracing
- **Jaeger / Tempo**: Traces requests across microservices

My Saturday night error would have been detected in **30 seconds** with proper monitoring.

## Humor and reality: war stories

### The cat typing on the keyboard

My first deployment was so chaotic that my roommate asked: "Is your cat writing the commands?"

I didn't have a cat. Just anxiety.

### The phantom .env file

I uploaded my code to Docker. The container started. The API responded... with error 500.

**Reason**: I forgot to copy the `.env` file to the container. My API was looking for variables that didn't exist.

**Current solution**: Variables injected from GitHub Secrets.

### The disappearing main branch

I executed `git branch -D main` thinking I was in my local test repository.

I was in the production repository.

**Salvation**: `git reflog` + 20 minutes of panic.

## Recommended tools

### CI/CD
- **GitHub Actions**: Integrated with GitHub, easy to configure
- **GitLab CI**: Complete, includes container registry
- **Jenkins**: Flexible, requires more configuration

### Infrastructure
- **Docker**: Reproducible containers
- **Kubernetes**: Orchestration for multiple services
- **Terraform**: Infrastructure as code

### Continuous delivery (GitOps)
- **ArgoCD**: Automatically deploys from Git
- **Flux**: Similar to ArgoCD, lighter

### Observability
- **Grafana**: Metrics dashboards
- **Prometheus**: Metrics collection
- **Loki**: Aggregated logs

## My current pipeline

After learning (the hard way), this is my standard pipeline:

```yaml
# .github/workflows/deploy.yml
name: Deploy API

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker image
        run: docker build -t myapi:${{ github.sha }} .
      - name: Push to registry
        run: docker push myapi:${{ github.sha }}

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to staging
        run: |
          kubectl set image deployment/myapi \
            myapi=myapi:${{ github.sha }} \
            -n staging

  smoke-test:
    needs: deploy-staging
    runs-on: ubuntu-latest
    steps:
      - name: Health check
        run: curl -f https://staging.myapi.com/health

  deploy-production:
    needs: smoke-test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: |
          kubectl set image deployment/myapi \
            myapi=myapi:${{ github.sha }} \
            -n production
```

**Result**:
- Automatic tests
- Reproducible build
- Staging before production
- Smoke tests
- Easy rollback with `kubectl rollout undo`

## Conclusion: automate or suffer the consequences

If there's something I learned from my Saturday night disaster, it's this:

**Every minute you invest in automation saves you hours of debugging in production.**

You don't need a perfect system from day 1. Start simple:

1. Automated tests in CI
2. Deployment to staging
3. Automatic health checks
4. Basic monitoring

Over time, add:
- Feature flags
- Automatic rollbacks
- A/B testing
- Complete observability

And above all: **never, ever, do manual deployments on a Saturday night.**

---

**Have you had your own deployment disaster? What tools do you use to automate? Tell me in the comments.**
