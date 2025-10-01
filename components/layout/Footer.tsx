'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowUpRight, MapPin, Briefcase } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/vjrivmon',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/vicente-rivas-monferrer',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'mailto:vicenterivasmonferrer12@gmail.com',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t.nav.home, href: '/', internal: true },
    { name: t.nav.projects, href: '/projects', internal: true },
    { name: t.nav.about, href: '/about', internal: true },
    { name: t.footer.contact || 'Contact', href: '/contact', internal: true },
  ];

  const projectCategories = [
    { name: t.categories['ai-robotics'], href: '/projects?category=ai-robotics', internal: true },
    { name: t.categories.iot, href: '/projects?category=iot', internal: true },
    { name: t.categories.web, href: '/projects?category=web', internal: true },
    { name: t.categories.games, href: '/projects?category=games', internal: true },
  ];

  const resources = [
    { name: 'GitHub', href: 'https://github.com/vjrivmon', internal: false },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/vicente-rivas-monferrer', internal: false },
    { name: t.footer.resume, href: '/vicente-rivas-cv.pdf', internal: false },
    { name: 'Blog', href: '/blog', internal: true },
  ];

  return (
    <footer className="relative mt-auto" role="contentinfo">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="bg-gradient-to-b from-background to-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main footer content - More spacing */}
          <div className="py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-16">

              {/* Brand & Info Section - Pegado a la izquierda */}
              <div className="lg:max-w-md">
                <div className="space-y-8">
                  {/* Logo - Larger and more prominent */}
                  <Link href="/" className="inline-block group focus:outline-none focus:ring-2 focus:ring-primary rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-lg" />
                        <div className="relative bg-gradient-to-br from-primary to-primary/80 text-white font-bold text-2xl px-4 py-3 rounded-lg shadow-lg">
                          VRM
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">Vicente Rivas Monferrer</h3>
                        <p className="text-sm text-muted-foreground mt-1">{t.footer.tagline}</p>
                      </div>
                    </div>
                  </Link>

                  {/* Info badges - Better spacing */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-3 py-2 rounded-md">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span>Valencia, Spain</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-3 py-2 rounded-md">
                      <Briefcase className="h-4 w-4 flex-shrink-0" />
                      <span>Available for hire</span>
                    </div>
                  </div>

                  {/* Quote - More prominent */}
                  <blockquote className="border-l-3 border-primary/30 pl-5 py-2 italic text-sm text-muted-foreground leading-relaxed">
                    {t.footer.quote}
                  </blockquote>

                  {/* Social links - Larger hit targets for accessibility */}
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <Link
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-muted/30 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label={`Visit ${social.name} profile`}
                      >
                        {social.icon}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Links Grid - Pegado a la derecha */}
              <div className="w-full lg:w-auto">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-16 gap-y-10 lg:gap-x-24">
                  {/* Quick Links */}
                  <nav aria-labelledby="footer-nav">
                    <h4 id="footer-nav" className="font-semibold text-base uppercase tracking-wider mb-6 text-foreground">
                      {t.footer.navigation}
                    </h4>
                    <ul className="space-y-4">
                      {quickLinks.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="group inline-flex items-center gap-2 text-base text-muted-foreground hover:text-primary transition-colors py-1 focus:outline-none focus:text-primary"
                          >
                            <span className="group-hover:translate-x-1 transition-transform">
                              {link.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  {/* Categories */}
                  <nav aria-labelledby="footer-categories">
                    <h4 id="footer-categories" className="font-semibold text-base uppercase tracking-wider mb-6 text-foreground">
                      {t.footer.categories}
                    </h4>
                    <ul className="space-y-4">
                      {projectCategories.map((category) => (
                        <li key={category.name}>
                          <Link
                            href={category.href}
                            className="group inline-flex items-center gap-2 text-base text-muted-foreground hover:text-primary transition-colors py-1 focus:outline-none focus:text-primary"
                          >
                            <span className="group-hover:translate-x-1 transition-transform">
                              {category.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  {/* Resources */}
                  <nav aria-labelledby="footer-resources">
                    <h4 id="footer-resources" className="font-semibold text-base uppercase tracking-wider mb-6 text-foreground">
                      {t.footer.resources}
                    </h4>
                    <ul className="space-y-4">
                      {resources.map((resource) => (
                        <li key={resource.name}>
                          <Link
                            href={resource.href}
                            className="group inline-flex items-center gap-2 text-base text-muted-foreground hover:text-primary transition-colors py-1 focus:outline-none focus:text-primary"
                            target={!resource.internal ? '_blank' : undefined}
                            rel={!resource.internal ? 'noopener noreferrer' : undefined}
                          >
                            <span className="group-hover:translate-x-1 transition-transform">
                              {resource.name}
                            </span>
                            {!resource.internal && (
                              <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar - More padding */}
          <div className="border-t border-border/40 py-8">
            <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start gap-6">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Vicente Rivas Monferrer. {t.footer.rights}
              </p>

              {/* Legal links with better spacing */}
              <nav aria-label="Legal links">
                <ul className="flex items-center gap-8 text-sm">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-muted-foreground hover:text-primary transition-colors py-2 px-1 focus:outline-none focus:text-primary"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-muted-foreground hover:text-primary transition-colors py-2 px-1 focus:outline-none focus:text-primary"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sitemap.xml"
                      className="text-muted-foreground hover:text-primary transition-colors py-2 px-1 focus:outline-none focus:text-primary"
                    >
                      Sitemap
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}