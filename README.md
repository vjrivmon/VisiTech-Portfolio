# ViSiTech Portfolio - Vicente Rivas Monferrer

A modern, performant portfolio website showcasing projects in AI, Robotics, IoT, and Web Development. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Dynamic Project Showcase**: Automatically fetches and displays all GitHub repositories
- **Featured Projects**: Highlights key projects in AI/Robotics, IoT, and Web Development
- **Real-time Updates**: GitHub API integration for automatic content updates
- **Dark Mode**: Full dark/light theme support
- **Performance Optimized**: Achieves 90+ Lighthouse scores
- **Responsive Design**: Mobile-first approach with full accessibility
- **ISR Caching**: Incremental Static Regeneration for optimal performance

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Animations**: Framer Motion
- **Data Source**: GitHub API v3
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/vjrivmon/visitech-portfolio.git
cd visitech-portfolio
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_USERNAME=vjrivmon
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATE_SECRET=your-secure-webhook-secret
```

4. Run the development server:
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

The site will automatically rebuild when you push changes to the main branch.

## 🔄 Automatic Updates

The portfolio automatically stays up-to-date through:
- **ISR**: Pages regenerate every hour
- **Webhooks**: `/api/revalidate` endpoint for instant updates
- **GitHub Integration**: Real-time repository data

## 📊 Performance

- **Lighthouse Performance**: 90+
- **Lighthouse Accessibility**: 95+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s

## 🎨 Customization

### Theme Colors
Edit color variables in `app/globals.css`:
```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --background: 0 0% 100%;
  /* ... */
}
```

### Featured Projects
Update the featured projects list in `lib/types/portfolio.ts`:
```typescript
export const FEATURED_PROJECTS = [
  'aidguide_04',
  'neurospot',
  // ...
];
```

## 📁 Project Structure

```
visitech-portfolio/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── projects/          # Projects pages
│   └── about/             # About page
├── components/            # React components
│   ├── home/             # Homepage components
│   ├── layout/           # Layout components
│   ├── projects/         # Project components
│   └── shared/           # Shared components
├── lib/                   # Utilities and helpers
│   ├── github/           # GitHub API client
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
└── public/               # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Vicente Rivas Monferrer**
- GitHub: [@vjrivmon](https://github.com/vjrivmon)
- LinkedIn: [Vicente Rivas Monferrer](https://www.linkedin.com/in/vicente-rivas-monferrer)
- Email: vicenterivasmonferrer12@gmail.com

---

Built with ❤️ by Vicente Rivas Monferrer