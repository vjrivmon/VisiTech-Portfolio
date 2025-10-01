import { Metadata } from 'next';
import Script from 'next/script';
import ProjectsClient from './ProjectsClient';
import { getAllProjects } from '@/lib/data/projects';

export const metadata: Metadata = {
  title: 'Proyectos - Vicente Rivas Monferrer',
  description: 'Explora mi portfolio de proyectos: aplicaciones web, herramientas de AI, sistemas IoT, robótica con ROS2, y más. Proyectos open source en GitHub con tecnologías modernas.',
  keywords: [
    'Proyectos Vicente Rivas',
    'Portfolio Proyectos',
    'Open Source Projects',
    'GitHub Projects',
    'AI Projects',
    'IoT Projects',
    'Robotics Projects',
    'Web Development Projects',
    'Full Stack Projects',
    'Backend Projects',
    'Python Projects',
    'TypeScript Projects',
    'ROS2 Projects',
    'Valencia Developer Projects',
  ],
  openGraph: {
    title: 'Proyectos | Vicente Rivas Portfolio',
    description: 'Explora mi portfolio de proyectos: AI, IoT, Robotics, Web Development y más. Todos mis proyectos open source.',
    url: 'https://vicentrivas.dev/projects',
    type: 'website',
    images: [
      {
        url: '/og-images/projects.png',
        width: 1200,
        height: 630,
        alt: 'Vicente Rivas - Proyectos Portfolio',
      },
    ],
    siteName: 'Vicente Rivas Portfolio',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proyectos - Vicente Rivas',
    description: 'Portfolio de proyectos: AI, IoT, Robotics, Web Development. Open source en GitHub.',
    images: ['/og-images/projects.png'],
    creator: '@vicentrivas',
  },
  alternates: {
    canonical: 'https://vicentrivas.dev/projects',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Proyectos de Vicente Rivas',
    description: 'Colección de proyectos de desarrollo de software de Vicente Rivas Monferrer',
    url: 'https://vicentrivas.dev/projects',
    author: {
      '@type': 'Person',
      name: 'Vicente Rivas Monferrer',
      url: 'https://vicentrivas.dev',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareSourceCode',
          name: project.displayName,
          description: project.description,
          url: project.url,
          programmingLanguage: project.languages.map(l => l.name),
          dateCreated: project.createdAt,
          dateModified: project.updatedAt,
          author: {
            '@type': 'Person',
            name: 'Vicente Rivas Monferrer',
          },
          interactionStatistic: [
            {
              '@type': 'InteractionCounter',
              interactionType: 'https://schema.org/LikeAction',
              userInteractionCount: project.stars,
            },
            {
              '@type': 'InteractionCounter',
              interactionType: 'https://schema.org/ShareAction',
              userInteractionCount: project.forks,
            },
          ],
        },
      })),
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Vicente Rivas Portfolio',
      url: 'https://vicentrivas.dev',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://vicentrivas.dev',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Proyectos',
        item: 'https://vicentrivas.dev/projects',
      },
    ],
  };

  return (
    <>
      <Script
        id="json-ld-projects"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="json-ld-breadcrumb-projects"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProjectsClient projects={projects} />
    </>
  );
}