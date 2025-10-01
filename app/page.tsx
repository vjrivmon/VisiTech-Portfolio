import { Metadata } from 'next';
import Script from 'next/script';
import Hero from '@/components/home/Hero';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import TechStack from '@/components/home/TechStack';
import CallToAction from '@/components/home/CallToAction';

export const metadata: Metadata = {
  title: 'Vicente Rivas Monferrer - Full Stack Developer & Scrum Master | Portfolio',
  description: 'Portfolio profesional de Vicente Rivas Monferrer. Full Stack Developer especializado en Backend, AI, Robotics, IoT y DevOps. Grado en Tecnologías Interactivas por la UPV. Scrum Master certificado.',
  keywords: [
    'Vicente Rivas Monferrer',
    'Full Stack Developer Valencia',
    'Backend Developer España',
    'Scrum Master Valencia',
    'UPV Tecnologías Interactivas',
    'AI Developer',
    'Robotics Engineer',
    'IoT Developer',
    'DevOps Engineer',
    'Portfolio Desarrollador',
  ],
  alternates: {
    canonical: 'https://vicentrivas.dev',
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'Vicente Rivas Monferrer',
      alternateName: 'Vicente Rivas',
      url: 'https://vicentrivas.dev',
      image: 'https://vicentrivas.dev/profile-image.jpg',
      sameAs: [
        'https://github.com/vicentrivas',
        'https://linkedin.com/in/vicentrivas',
        'https://twitter.com/vicentrivas',
      ],
      jobTitle: ['Full Stack Developer', 'Backend Developer', 'Scrum Master'],
      worksFor: {
        '@type': 'Organization',
        name: 'Freelance',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Universidad Politécnica de Valencia (UPV)',
        sameAs: 'https://www.upv.es',
      },
      knowsAbout: [
        'Software Development',
        'Backend Development',
        'Artificial Intelligence',
        'Machine Learning',
        'Robotics',
        'ROS2',
        'Internet of Things (IoT)',
        'DevOps',
        'Cloud Computing',
        'Python',
        'TypeScript',
        'Node.js',
        'Docker',
        'Kubernetes',
        'Scrum',
        'Agile Methodologies',
      ],
      nationality: {
        '@type': 'Country',
        name: 'España',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Valencia',
        addressCountry: 'ES',
      },
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Vicente Rivas Portfolio',
    alternateName: 'Vicente Rivas Developer Portfolio',
    url: 'https://vicentrivas.dev',
    author: {
      '@type': 'Person',
      name: 'Vicente Rivas Monferrer',
    },
    description: 'Portfolio profesional de Vicente Rivas Monferrer, Full Stack Developer especializado en Backend, AI, Robotics, IoT y DevOps.',
    inLanguage: ['es-ES', 'en-US'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://vicentrivas.dev/projects?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <Script
        id="json-ld-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="json-ld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Hero />
      <FeaturedProjects />
      <TechStack />
      <CallToAction />
    </>
  );
}