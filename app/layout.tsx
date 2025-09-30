import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/shared/ScrollToTop';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: {
    default: 'Vicente Rivas Monferrer - Developer Portfolio',
    template: '%s | Vicente Rivas',
  },
  description: 'Backend Developer, Software Developer & Scrum Master. Grado en Tecnologías Interactivas, UPV. Especializado en AI, Robotics, IoT y DevOps.',
  keywords: [
    'Vicente Rivas Monferrer',
    'Backend Developer',
    'Software Developer',
    'Scrum Master',
    'UPV',
    'Portfolio',
    'AI',
    'Robotics',
    'IoT',
    'DevOps',
    'ROS2',
    'Valencia',
    'España',
  ],
  authors: [{ name: 'Vicente Rivas Monferrer' }],
  creator: 'Vicente Rivas Monferrer',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://vicentrivas.dev',
    title: 'Vicente Rivas Monferrer - Developer Portfolio',
    description: 'Backend Developer, Software Developer & Scrum Master. Grado en Tecnologías Interactivas, UPV.',
    siteName: 'Vicente Rivas Portfolio',
    images: [
      {
        url: '/og-images/default.png',
        width: 1200,
        height: 630,
        alt: 'Vicente Rivas Monferrer - Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vicente Rivas Monferrer - Developer Portfolio',
    description: 'Backend Developer, Software Developer & Scrum Master',
    images: ['/og-images/default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>

          <ScrollToTop />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}