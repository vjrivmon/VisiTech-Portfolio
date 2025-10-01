import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectDetailClient from './ProjectDetailClient';
import { getProjectBySlug, getAllProjects } from '@/lib/data/projects';
import Script from 'next/script';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: 'Proyecto no encontrado',
      description: 'El proyecto que buscas no existe en el portfolio.',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vicentrivas.dev';
  const projectUrl = `${siteUrl}/projects/${params.slug}`;

  return {
    title: `${project.displayName} - ${project.category.replace('-', ' ').toUpperCase()}`,
    description: project.description || `${project.displayName}: Proyecto de ${project.category.replace('-', ' ')} desarrollado con ${project.languages.slice(0, 3).map(l => l.name).join(', ')}. ${project.stars} estrellas en GitHub.`,
    keywords: [
      project.displayName,
      ...project.techStack.map(t => t.name),
      ...project.languages.map(l => l.name),
      project.category,
      'Vicente Rivas Monferrer',
      'Portfolio',
      'Proyecto',
      'GitHub',
      'Open Source',
    ],
    authors: [{ name: 'Vicente Rivas Monferrer', url: 'https://vicentrivas.dev' }],
    creator: 'Vicente Rivas Monferrer',
    publisher: 'Vicente Rivas Monferrer',
    openGraph: {
      title: `${project.displayName} | Vicente Rivas Portfolio`,
      description: project.description || `${project.displayName} - Proyecto de desarrollo`,
      url: projectUrl,
      type: 'article',
      publishedTime: project.createdAt.toISOString(),
      modifiedTime: project.updatedAt.toISOString(),
      authors: ['Vicente Rivas Monferrer'],
      tags: [...project.techStack.map(t => t.name), project.category],
      images: [
        {
          url: project.screenshots?.[0] || '/og-images/project-default.png',
          width: 1200,
          height: 630,
          alt: `${project.displayName} - Preview`,
        },
      ],
      siteName: 'Vicente Rivas Portfolio',
      locale: 'es_ES',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.displayName} - ${project.category}`,
      description: project.description || `${project.displayName} - Proyecto de desarrollo`,
      images: [project.screenshots?.[0] || '/og-images/project-default.png'],
      creator: '@vicentrivas',
    },
    alternates: {
      canonical: projectUrl,
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  };
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.id, // Using id as slug since Project doesn't have slug field
  }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // Structured data para SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.displayName,
    description: project.description || `${project.displayName} - Proyecto de desarrollo`,
    url: project.url,
    dateCreated: project.createdAt.toISOString(),
    dateModified: project.updatedAt.toISOString(),
    programmingLanguage: project.languages.map(lang => ({
      '@type': 'ComputerLanguage',
      name: lang.name,
    })),
    author: {
      '@type': 'Person',
      name: 'Vicente Rivas Monferrer',
      url: 'https://vicentrivas.dev',
    },
    keywords: project.techStack.map(t => t.name).join(', '),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: project.stars,
      reviewCount: project.stars,
      bestRating: 5,
      worstRating: 1,
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
      {
        '@type': 'ListItem',
        position: 3,
        name: project.displayName,
        item: `https://vicentrivas.dev/projects/${params.slug}`,
      },
    ],
  };

  return (
    <>
      <Script
        id="json-ld-project"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="json-ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProjectDetailClient project={project} />
    </>
  );
}