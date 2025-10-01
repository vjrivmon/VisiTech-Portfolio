export interface BlogPost {
  id: string;
  slug: string;
  title: {
    es: string;
    en: string;
  };
  subtitle: {
    es: string;
    en: string;
  };
  excerpt: {
    es: string;
    en: string;
  };
  content: {
    es: string;
    en: string;
  };
  date: string;
  readTime: number; // minutos
  category: 'devops' | 'ai' | 'architecture' | 'automation' | 'backend' | 'mindfulness' | 'learning';
  tags: string[];
  featured: boolean;
  image?: string;
}

export interface BlogCategory {
  id: string;
  name: {
    es: string;
    en: string;
  };
  color: string;
}
