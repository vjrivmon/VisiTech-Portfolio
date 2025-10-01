# 🚀 Deployment Guide - ViSiTech Portfolio

## Quick Deploy to Vercel (5 minutes)

### Step 1: Push to GitHub

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name: `visitech-portfolio`
   - Description: "My personal portfolio showcasing projects in AI, Robotics, IoT and Web Development"
   - Public repository
   - DO NOT initialize with README (we already have one)

2. Push your code:
```bash
git remote add origin https://github.com/vjrivmon/visitech-portfolio.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your `visitech-portfolio` repository
4. Configure Project:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: ./
   - Build Command: `yarn build`
   - Output Directory: `.next`

### Step 3: Set Environment Variables

In Vercel dashboard, add these environment variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `GITHUB_TOKEN` | `ghp_xxxxx...` | Your GitHub personal access token |
| `GITHUB_USERNAME` | `vjrivmon` | Your GitHub username |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` | Your site URL |
| `REVALIDATE_SECRET` | `generate-random-32-char-string` | Webhook secret |

### Step 4: Deploy!

Click "Deploy" and wait ~2-3 minutes for the build to complete.

## 🔐 Getting a GitHub Token

1. Go to https://github.com/settings/tokens/new
2. Give it a name: "Portfolio Site"
3. Set expiration: 90 days (or custom)
4. Select scopes:
   - `public_repo` (read access to public repositories)
5. Generate token and copy it
6. Add to Vercel environment variables

## 🌐 Custom Domain (Optional)

### If you have a domain:

1. In Vercel: Project Settings → Domains
2. Add your domain: `vicentrivas.dev`
3. Configure DNS (at your domain provider):

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

## 🔄 Automatic Updates

Your portfolio will automatically update when:
- You push code to GitHub (instant deploy)
- GitHub repos change (ISR every hour)
- Manual trigger via webhook

### Test the webhook:
```bash
curl -X POST https://your-site.vercel.app/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret": "your-revalidate-secret"}'
```

## ✅ Post-Deployment Checklist

- [ ] Site loads at Vercel URL
- [ ] Dark mode toggle works
- [ ] Projects load from GitHub
- [ ] Mobile responsive works
- [ ] All pages accessible
- [ ] No console errors

## 🎉 Success URLs

After deployment, your site will be available at:
- **Vercel URL**: `https://visitech-portfolio.vercel.app`
- **Custom Domain**: `https://vicentrivas.dev` (if configured)

## 📊 Monitor Performance

1. **Vercel Analytics**: Automatically enabled
2. **Speed Insights**: Check Core Web Vitals
3. **Lighthouse**: Run audit in Chrome DevTools

Target scores:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 95

## 🆘 Troubleshooting

### Build fails?
- Check environment variables are set
- Verify GITHUB_TOKEN is valid
- Check build logs in Vercel

### Projects not showing?
- Verify GITHUB_TOKEN has correct permissions
- Check if repos are public
- Try manual revalidation via webhook

### Performance issues?
- Check image sizes (optimize if needed)
- Review bundle size in build output
- Enable caching headers

## 📧 Support

If you need help:
- Email: vicenterivasmonferrer12@gmail.com
- LinkedIn: https://www.linkedin.com/in/vicente-rivas-monferrer

---

**Ready to go live! 🚀** Your portfolio will be accessible worldwide in less than 5 minutes.