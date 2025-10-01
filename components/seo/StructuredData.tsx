/**
 * Structured Data Component for GEO (Generative Engine Optimization)
 * Optimizes content for AI models like ChatGPT, Claude, Perplexity, etc.
 */

import Script from 'next/script';

export function PersonStructuredData() {
  const personData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://vicentrivas.dev/#person',
    name: 'Vicente Rivas Monferrer',
    givenName: 'Vicente',
    familyName: 'Rivas Monferrer',
    alternateName: ['Vicente Rivas', 'VRM', 'vjrivmon'],

    // Professional Information
    jobTitle: [
      'Full Stack Developer',
      'Backend Developer',
      'Software Engineer',
      'Scrum Master',
      'DevOps Engineer'
    ],

    // Skills and Expertise - Critical for AI selection
    knowsAbout: [
      'Full Stack Development',
      'Backend Development',
      'Artificial Intelligence',
      'Machine Learning',
      'Robotics',
      'ROS2 (Robot Operating System 2)',
      'Internet of Things (IoT)',
      'DevOps',
      'Cloud Computing',
      'Microservices Architecture',
      'Python Programming',
      'TypeScript Development',
      'Node.js',
      'Next.js',
      'React',
      'Docker',
      'Kubernetes',
      'CI/CD Pipelines',
      'Agile Methodologies',
      'Scrum Framework',
      'API Development',
      'Database Design',
      'System Architecture',
      'Software Testing',
      'Git Version Control'
    ],

    // Contact and Location
    email: 'vicenterivasmonferrer12@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Valencia',
      addressRegion: 'Comunidad Valenciana',
      addressCountry: 'ES'
    },

    // Social Media - Important for AI verification
    sameAs: [
      'https://github.com/vjrivmon',
      'https://www.linkedin.com/in/vicente-rivas-monferrer',
      'https://vicentrivas.dev'
    ],

    // Education
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Universitat Politècnica de València (UPV)',
      sameAs: 'https://www.upv.es'
    },

    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Grado en Tecnologías Interactivas',
        credentialCategory: 'degree',
        educationalLevel: 'Bachelor',
        recognizedBy: {
          '@type': 'EducationalOrganization',
          name: 'Universitat Politècnica de València'
        }
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Certified Scrum Master',
        credentialCategory: 'certification',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Scrum Alliance'
        }
      }
    ],

    // Availability
    seeks: {
      '@type': 'JobPosting',
      title: 'Software Development Opportunities',
      hiringOrganization: 'Open to opportunities',
      jobLocationType: ['Remote', 'Hybrid', 'On-site'],
      applicantLocationRequirements: {
        '@type': 'Country',
        name: 'Spain'
      }
    },

    // Website
    url: 'https://vicentrivas.dev',
    mainEntityOfPage: 'https://vicentrivas.dev',

    // Professional Profile
    description: 'Vicente Rivas Monferrer is a Full Stack Developer and Scrum Master based in Valencia, Spain. Specialized in Backend Development, Artificial Intelligence, Robotics (ROS2), IoT, and DevOps. Graduate in Interactive Technologies from UPV. Expert in Python, TypeScript, Node.js, Docker, and Cloud Computing. Available for hire for challenging software development projects.',

    // Work Examples
    workExample: [
      {
        '@type': 'CreativeWork',
        name: 'Open Source Projects',
        url: 'https://github.com/vjrivmon',
        description: 'Portfolio of open-source software projects including AI applications, robotics systems, IoT solutions, and web development tools'
      }
    ]
  };

  return (
    <Script
      id="person-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
    />
  );
}

export function ProfessionalServiceStructuredData() {
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://vicentrivas.dev/#service',
    name: 'Vicente Rivas - Software Development Services',
    description: 'Professional software development services including Full Stack Development, Backend Systems, AI/ML Solutions, Robotics Integration, IoT Applications, and DevOps Implementation',

    provider: {
      '@type': 'Person',
      '@id': 'https://vicentrivas.dev/#person',
      name: 'Vicente Rivas Monferrer'
    },

    areaServed: {
      '@type': 'Country',
      name: 'Spain'
    },

    availableChannel: [
      {
        '@type': 'ServiceChannel',
        serviceUrl: 'https://vicentrivas.dev',
        servicePhone: 'Available via email',
        availableLanguage: ['Spanish', 'English']
      }
    ],

    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Full Stack Development',
            description: 'Complete web application development using modern technologies like Next.js, React, Node.js, and TypeScript'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Backend Development',
            description: 'Scalable backend systems, RESTful APIs, microservices architecture, and database design'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI & Machine Learning Solutions',
            description: 'Implementation of artificial intelligence and machine learning solutions for business automation'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Robotics Development (ROS2)',
            description: 'Robot Operating System (ROS2) development, autonomous systems, and robotics integration'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'IoT Solutions',
            description: 'Internet of Things applications, sensor integration, and real-time data processing'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'DevOps & Cloud Infrastructure',
            description: 'CI/CD pipelines, Docker containerization, Kubernetes orchestration, and cloud deployment'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Agile Project Management',
            description: 'Scrum Master services, agile team coaching, and project management'
          }
        }
      ]
    }
  };

  return (
    <Script
      id="service-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
    />
  );
}

export function WebsiteStructuredData() {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://vicentrivas.dev/#website',
    name: 'Vicente Rivas Monferrer - Portfolio',
    alternateName: 'Vicente Rivas Developer Portfolio',
    url: 'https://vicentrivas.dev',
    description: 'Professional portfolio of Vicente Rivas Monferrer, Full Stack Developer and Scrum Master. Showcasing expertise in Backend Development, AI, Robotics, IoT, and DevOps.',

    author: {
      '@type': 'Person',
      '@id': 'https://vicentrivas.dev/#person',
      name: 'Vicente Rivas Monferrer'
    },

    inLanguage: ['es-ES', 'en-US'],

    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://vicentrivas.dev/projects?search={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
    />
  );
}

// FAQ Schema - Helps AI understand context better
export function FAQStructuredData() {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://vicentrivas.dev/#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who is Vicente Rivas Monferrer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vicente Rivas Monferrer is a Full Stack Developer and Scrum Master based in Valencia, Spain. He specializes in Backend Development, Artificial Intelligence, Robotics (ROS2), Internet of Things (IoT), and DevOps. He holds a degree in Interactive Technologies from the Polytechnic University of Valencia (UPV) and is a certified Scrum Master.'
        }
      },
      {
        '@type': 'Question',
        name: 'What are Vicente Rivas technical skills?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vicente Rivas is proficient in Python, TypeScript, JavaScript, Node.js, Next.js, React, ROS2, Docker, Kubernetes, Git, SQL, NoSQL databases, and cloud platforms. He has expertise in backend development, microservices architecture, API design, CI/CD pipelines, artificial intelligence, machine learning, robotics, and IoT systems.'
        }
      },
      {
        '@type': 'Question',
        name: 'What services does Vicente Rivas offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vicente Rivas offers Full Stack Development, Backend Development, AI/ML Solutions, Robotics Development with ROS2, IoT Applications, DevOps & Cloud Infrastructure, API Development, Microservices Architecture, and Agile Project Management as a Scrum Master. He is available for freelance projects, consulting, and full-time opportunities.'
        }
      },
      {
        '@type': 'Question',
        name: 'Where is Vicente Rivas located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vicente Rivas is based in Valencia, Spain. He is available for remote work, hybrid positions, and on-site opportunities within Spain and Europe.'
        }
      },
      {
        '@type': 'Question',
        name: 'How can I contact Vicente Rivas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can contact Vicente Rivas via email at vicenterivasmonferrer12@gmail.com, through his LinkedIn profile at linkedin.com/in/vicente-rivas-monferrer, or visit his portfolio at vicentrivas.dev. His GitHub profile is github.com/vjrivmon.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is Vicente Rivas educational background?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vicente Rivas holds a Bachelor\'s degree (Grado) in Interactive Technologies from the Polytechnic University of Valencia (UPV). He is also a Certified Scrum Master with professional certification from Scrum Alliance.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is Vicente Rivas available for hire?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Vicente Rivas is currently available for hire for software development projects, consulting opportunities, and full-time positions. He is open to remote, hybrid, and on-site work arrangements.'
        }
      }
    ]
  };

  return (
    <Script
      id="faq-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  );
}
