import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/shared/ScrollToTop';
import {
  PersonStructuredData,
  ProfessionalServiceStructuredData,
  WebsiteStructuredData,
  FAQStructuredData
} from '@/components/seo/StructuredData';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://vicentrivas.dev'),
  title: {
    default: 'Vicente Rivas Monferrer - Full Stack Developer & Scrum Master | Portfolio',
    template: '%s | Vicente Rivas - Developer Portfolio',
  },
  description: 'Vicente Rivas Monferrer - Full Stack Developer and Scrum Master based in Valencia, Spain. Expert in Backend Development, Artificial Intelligence, Robotics (ROS2), IoT, and DevOps. Bachelor\'s degree in Interactive Technologies from UPV. Proficient in Python, TypeScript, Node.js, Docker, and Cloud Computing. Available for hire.',
  keywords: [
    'Vicente Rivas Monferrer',
    'Full Stack Developer',
    'Backend Developer',
    'Software Developer',
    'Scrum Master',
    'UPV Valencia',
    'Tecnologías Interactivas',
    'Portfolio Desarrollador',
    'Artificial Intelligence AI',
    'Machine Learning ML',
    'Robotics ROS2',
    'Internet of Things IoT',
    'DevOps Engineer',
    'Cloud Computing',
    'Python Developer',
    'TypeScript Developer',
    'Node.js Expert',
    'Docker Kubernetes',
    'Valencia España Spain',
    'Software Engineer',
    'Web Development',
    'API Development',
    'Microservices Architecture',
  ],
  authors: [{ name: 'Vicente Rivas Monferrer', url: 'https://vicentrivas.dev' }],
  creator: 'Vicente Rivas Monferrer',
  publisher: 'Vicente Rivas Monferrer',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: ['en_US'],
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://vicentrivas.dev',
    title: 'Vicente Rivas Monferrer - Full Stack Developer & Scrum Master',
    description: 'Portfolio profesional de Vicente Rivas. Full Stack Developer especializado en Backend, AI, Robotics, IoT y DevOps. Grado en Tecnologías Interactivas por la UPV.',
    siteName: 'Vicente Rivas - Developer Portfolio',
    images: [
      {
        url: '/og-images/default.png',
        width: 1200,
        height: 630,
        alt: 'Vicente Rivas Monferrer - Full Stack Developer Portfolio',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vicente Rivas - Full Stack Developer & Scrum Master',
    description: 'Portfolio profesional. Especializado en Backend, AI, Robotics, IoT y DevOps. Grado en Tecnologías Interactivas UPV.',
    creator: '@vicentrivas',
    images: ['/og-images/default.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* GEO/AEO Optimization - Structured Data for AI Models */}
        <PersonStructuredData />
        <ProfessionalServiceStructuredData />
        <WebsiteStructuredData />
        <FAQStructuredData />
      </head>
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
          <LanguageProvider>
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
          </LanguageProvider>
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}