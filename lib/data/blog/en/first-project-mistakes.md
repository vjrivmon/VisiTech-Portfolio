---
title: "Mistakes you should make in your first project (and why they will save you later)"
slug: "first-project-mistakes"
excerpt: "Nobody is born knowing. Early mistakes teach more than any tutorial. Discover which mistakes to make (and learn from) in your first project to become a better developer."
date: "2025-03-03"
author: "Vicente García"
tags: ["Beginners", "Learning", "Best Practices", "Development"]
readingTime: "11 min"
featured: true
language: "en"
---

# Mistakes you should make in your first project (and why they will save you later)

I remember my first "real" project: a web app to manage inventory. It was a disaster:

- **No tests**: "Tests are for big companies"
- **Variables named `x`, `data`, `temp`**: "I know what it means"
- **Everything in a 2000-line file**: "It's easier to find things"
- **Commits like** `fix`, `update`, `asdf`: "Only I see it"

Three months later, I tried to add a new feature. I spent **4 days** understanding my own code.

**That was the day I learned more than in an entire bootcamp.**

## Why early mistakes are your best teacher

Tutorials teach you **what to do**. Mistakes teach you **why it matters**.

When you break production because you don't have tests, you don't forget that pain. When you spend hours debugging a function called `processData()`, you learn to name clearly.

**The golden rule**: If you haven't suffered the consequences of a mistake, you don't really understand why the solution is important.

## Mistake #1: Ignoring tests

### The mistake

When starting out, tests seem unnecessary:

```javascript
// My first endpoint
app.post('/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.json(user);
});
```

"It works, why test?"

### The reality

As moldstud.com reports:

> "Only 45% of developers regularly write tests."

**The result?** Production bugs, constant regressions, fear of refactoring.

### What you'll learn

After your third production bug:

1. **Tests are living documentation**: They explain how the code should work
2. **Refactor with confidence**: You change code without fear of breaking everything
3. **Catch bugs early**: A test fails on your machine, not in production

### The lesson applied

```javascript
// With tests
describe('POST /users', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Alice', email: 'alice@example.com' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should reject invalid emails', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Bob', email: 'not-an-email' });

    expect(response.status).toBe(400);
  });
});
```

**Investment**: 10 minutes writing tests.
**Return**: Hours saved in debugging.

## Mistake #2: Unreadable code

### The mistake

Skimping on readability to "save time":

```javascript
function p(d) {
  let r = [];
  for(let i=0;i<d.length;i++) {
    if(d[i].s === 'active') r.push(d[i]);
  }
  return r;
}
```

"I know what it does, why more?"

### The reality

As moldstud.com notes:

> "Developers spend 41% of their time reading others' code (or their own from months ago)."

**Translation**: If you write unreadable code, you'll be the one who suffers most.

### What you'll learn

When you return to that code 3 months later:

1. **Names matter**: Variables, functions, classes should explain their purpose
2. **Less is more**: Simple code > "clever" code
3. **Comments for 'why', not 'what'**: Code explains what it does; comments, why it does it that way

As moldstud.com documents:

> "Clear names, useful comments, and linter usage increase team productivity."

### The lesson applied

```javascript
// Readable
function filterActiveProducts(products) {
  return products.filter(product => product.status === 'active');
}

// Usage
const activeProducts = filterActiveProducts(inventory);
```

**Advantages**:
- Reads like natural language
- Needs no comments
- Another developer (or you in 6 months) understands it instantly

## Mistake #3: Not planning before coding

### The mistake

Jumping straight to writing code without design:

```javascript
// Day 1: Backend in Node
// Day 3: Switch to Python because "it's better for ML"
// Day 5: Back to Node because "I can't integrate the frontend"
```

### The reality

As moldstud.com reports:

> "Agile methodologies and task breakdown increase productivity by 28%."

**Without planning**:
- You constantly redo work
- You don't know when you'll finish
- The final code is a Frankenstein of ad-hoc decisions

### What you'll learn

After rewriting your project 3 times:

1. **Define requirements first**: What should the application do?
2. **Design the architecture**: What components, how do they communicate
3. **Divide into tasks**: Small, estimable, prioritizable
4. **Iterate**: Build, test, review, repeat

### The lesson applied

**Before coding**:

```
Project: Todo App

Requirements:
- Create, edit, delete tasks
- Mark as completed
- Filter by status

Architecture:
- Frontend: React
- Backend: Node + Express
- DB: PostgreSQL
- Auth: JWT

Tasks:
1. Initial setup (repo, dependencies)
2. Data model (DB schema)
3. API endpoints (CRUD)
4. Frontend (components)
5. Frontend-backend integration
6. Tests
7. Deploy
```

**Result**: You finish in 2 weeks instead of 2 months with 5 restarts.

## Mistake #4: Not asking for help

### The mistake

Getting blocked for 8 hours on a problem before asking:

"I don't want to bother..."
"I should be able to solve it myself..."
"They'll judge me..."

### The reality

As moldstud.com emphasizes:

> "Curiosity and mentorship accelerate learning and prevent stagnation."

**Hard data**:
- A senior can solve in 5 minutes what takes you 5 hours
- Asking good questions is a professional skill
- The best developers collaborate constantly

### What you'll learn

After losing days on already-solved problems:

1. **Asking is brave**: Recognizing what you don't know is strength
2. **How to ask good questions**: Context, what you've tried, specific error
3. **Document the solution**: So others (and you) don't repeat the problem

### The lesson applied

**Effective question**:

```
# ❌ Bad
"It doesn't work, help"

# ✅ Good
**Problem**: My API returns 500 when creating users

**Context**:
- Node 18, Express 4.18
- Endpoint: POST /users
- Database: PostgreSQL

**What I've tried**:
1. Verify DB is running (✓)
2. Validate request body (looks correct)
3. Check logs (screenshot attached)

**Error**:
```
Error: insert into "users" ... - null value in column "email" violates not-null constraint
```

**Question**: How do I validate that email exists before inserting?
```

**Typical response**: 2 minutes and a link to validation documentation.

## Mistake #5: Forgetting version control (Git)

### The mistake

Using Git as a "backup folder":

```bash
git add .
git commit -m "changes"
git push
```

Or worse: `final_project_v2_FINAL_DEFINITIVE_NOW_YES.zip`

### The reality

As moldstud.com documents:

> "Repositories with concise commit messages have 30% fewer conflicts and facilitate collaboration."

**Without proper Git**:
- You don't know what changed and when
- You can't return to a stable version
- Merges are nightmares
- Collaboration is impossible

### What you'll learn

After losing a day's work due to a giant commit:

1. **Small, frequent commits**: Each commit is a logical unit
2. **Descriptive messages**: "Fix login bug" > "update"
3. **Branches**: Never work directly on `main`
4. **Pull Requests**: Code review before merging

### The lesson applied

```bash
# ❌ Bad
git commit -m "fix"

# ✅ Good
git commit -m "Fix: validate email format in user registration

- Add regex validation for email field
- Return 400 if email is invalid
- Add test case for invalid emails

Closes #42"
```

**Advantages**:
- Another developer understands the change without seeing the code
- You can search commits by topic (`git log --grep="email"`)
- Easy to `git revert` if something fails

## Mistake #6: Too many frameworks and libraries

### The mistake

Installing everything that sounds interesting:

```bash
npm install react vue angular express fastify koa
  lodash underscore ramda moment dayjs date-fns
  axios fetch node-fetch request superagent got
```

"Just in case I need it later..."

### The reality

**Consequences**:
- Giant bundle size (3 MB for a "Hello World")
- Version conflicts
- You don't understand how anything works
- Impossible maintenance (20 libraries with breaking changes)

### What you'll learn

After your first `npm audit` with 47 vulnerabilities:

1. **Understand fundamentals**: Learn JavaScript before React
2. **Use the bare minimum**: You can do a lot with little
3. **Read documentation**: Often, the library already does what you need
4. **Evaluate before installing**: Size, maintenance, native alternatives

### The lesson applied

**Before**:
```javascript
// Install lodash just for this
import _ from 'lodash';
const unique = _.uniq([1, 2, 2, 3]);
```

**After**:
```javascript
// Use native functionality
const unique = [...new Set([1, 2, 2, 3])];
```

**Principle**: If you can do it with the standard library, don't install a dependency.

## Mistake #7: Not using Docker (or consistent environments)

### The mistake

"It works on my machine" 🤷‍♂️

### The reality

Your laptop: Node 18, PostgreSQL 14, Ubuntu 22.04
Server: Node 16, PostgreSQL 12, CentOS 7

**Result**: Incompatibilities, bugs that only appear in production.

### What you'll learn

After losing an afternoon debugging environment differences:

1. **Docker guarantees consistency**: Same environment in development, staging, and production
2. **Quick onboarding**: New developers get the project running in 5 minutes
3. **Isolation**: Multiple projects without version conflicts

### The lesson applied

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: dev
```

**Command**:
```bash
docker-compose up
```

**Result**: Project running, regardless of operating system.

## Mistake #8: Not documenting (or documenting poorly)

### The mistake

**Option A**: No README

**Option B**: Giant README that nobody reads

### The reality

A good README is your best introduction:

```markdown
# My Project

## Overview
Brief description (2-3 sentences)

## Quick Start
```bash
npm install
npm run dev
```

## Tech Stack
- Node 18
- React 18
- PostgreSQL 14

## Project Structure
```
/src
  /api       # Backend endpoints
  /components # React components
  /utils     # Helper functions
```

## Environment Variables
```
DATABASE_URL=postgresql://localhost/mydb
JWT_SECRET=your-secret
```

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md)
```

**Goal**: Anyone (including you in 6 months) can get the project running in <5 minutes.

## How to leverage these mistakes

### 1. Build your "mistake log"

Every time you make an important mistake:

```markdown
# Error Log

## 2025-03-01: Production down due to lack of validation

**What happened**: A user sent `null` as email, system crashed

**Why it happened**: Didn't validate inputs in endpoint

**Solution**: Add validation with Joi

**Learning**: Always validate client inputs

**Prevention**: Integration tests for edge cases
```

### 2. Do code reviews of your old code

Every 3 months, review code you wrote:

- Do you understand it effortlessly?
- What would you change now?
- What have you learned since then?

### 3. Share your mistakes

Write about your fails:
- Personal blog
- Twitter/LinkedIn
- Conversations with other developers

**Double benefit**:
- Consolidate your learning
- Help others avoid the same mistakes

### 4. Seek early feedback

Don't wait to have "perfect code" to ask for review:

- Make small PRs
- Ask for opinions on architecture
- Participate in pair programming

## My broken docker-compose.yml and other stories

### Story #1: The phantom .env file

I built a Docker image. The container started... and crashed.

**Problem**: I forgot to copy `.env` to the container.

**Temp fix**: `docker run -e DATABASE_URL=...` (a nightmare)

**Proper fix**: Inject variables from `docker-compose.yml` or GitHub Secrets.

### Story #2: Git reflog to the rescue

I ran `git reset --hard HEAD~10` thinking I was on a test branch.

I was on `main`.

**Panic**: 10 commits of work lost.

**Salvation**:
```bash
git reflog  # See complete history
git reset --hard abc123  # Return to before disaster
```

**Learning**: `git reflog` is your parachute.

### Story #3: The linter that saved my sanity

My code was inconsistent: tabs here, spaces there, single and double quotes mixed.

**Solution**: ESLint + Prettier

```json
{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

**Result**: Consistent code, no style debates.

## Conclusion: Fail fast, learn faster

The best developers aren't those who never make mistakes. They're those who:

1. **Make mistakes early**: Better to fail in your first project than in a company's production
2. **Reflect on each mistake**: What happened, why, how to prevent it
3. **Document their learnings**: To avoid repeating the same mistakes
4. **Share their fails**: Because helping others consolidates your knowledge

**Your first project will be a disaster. And that's perfect.**

Every bug you don't understand, every painful refactor, every afternoon lost debugging... are investments in your future as a developer.

**The only real mistake is not making any.**

Because if you're not failing, you're not learning.

---

**What was your most epic mistake in your first project? What did you learn? What's the best advice you'd give your past self? Tell me in the comments.**
