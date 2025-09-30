// API route response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  metadata?: ResponseMetadata;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: Date;
}

export interface ResponseMetadata {
  timestamp: Date;
  cached: boolean;
  cacheAge?: number; // seconds
  rateLimit?: {
    limit: number;
    remaining: number;
    reset: Date;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ProjectsQueryParams {
  category?: string;
  featured?: boolean;
  status?: string;
  language?: string;
  search?: string;
  sort?: 'stars' | 'updated' | 'created' | 'name';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}