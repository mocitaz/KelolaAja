/**
 * API Configuration
 * Centralized API URL management for easy switching between environments
 */

// Backend API Base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    LOGOUT: "/api/v1/auth/logout",
    ME: "/api/v1/auth/me",
    REFRESH: "/api/v1/auth/refresh"
  },

  // Users
  USERS: {
    LIST: "/api/v1/users",
    CREATE: "/api/v1/users",
    UPDATE: (id: number) => `/api/v1/users/${id}`,
    DELETE: (id: number) => `/api/v1/users/${id}`,
    DETAIL: (id: number) => `/api/v1/users/${id}`
  },

  // Public Endpoints (Frontend)
  PUBLIC: {
    // Pricing Plans
    PRICING_PLANS: {
      LIST: "/api/v1/pricing-plans",
      DETAIL: (id: number) => `/api/v1/pricing-plans/${id}`,
      PLAN_FEATURES: (planId: number) => `/api/v1/pricing-plans/${planId}/features`
    },

    // Features
    FEATURES: {
      LIST: "/api/v1/features",
      DETAIL: (id: number) => `/api/v1/features/${id}`
    },

    // Partners
    PARTNERS: {
      LIST: "/api/v1/partners"
    },

    // Testimonials
    TESTIMONIALS: {
      LIST: "/api/v1/testimonials",
      DETAIL: (id: number) => `/api/v1/testimonials/${id}`
    },

    // FAQs
    FAQS: {
      LIST: "/api/v1/faqs",
      DETAIL: (id: number) => `/api/v1/faqs/${id}`,
      BY_CATEGORY: "/api/v1/faqs/by-category",
      CATEGORIES: "/api/v1/faqs/categories"
    },

    // Benefit Stats
    BENEFIT_STATS: {
      LIST: "/api/v1/benefit-stats"
    },

    // Process Steps
    PROCESS_STEPS: {
      LIST: "/api/v1/process-steps"
    },

    // ERP Benefits
    ERP_BENEFITS: {
      LIST: "/api/v1/erp-benefits"
    },

    // About Cards
    ABOUT_CARDS: {
      LIST: "/api/v1/about-cards"
    },

    // Advanced Features
    ADVANCED_FEATURES: {
      LIST: "/api/v1/advanced-features"
    },

    // KelolaAja Features
    KELOLAAJA_FEATURES: {
      LIST: "/api/v1/kelolaaja-features"
    },

    // Industries
    INDUSTRIES: {
      LIST: "/api/v1/industries",
      DETAIL: (id: number) => `/api/v1/industries/${id}`,
      BY_SLUG: (slug: string) => `/api/v1/industries/${slug}`
    },

    // Feature Pages
    FEATURE_PAGES: {
      LIST: "/api/v1/feature-pages",
      BY_SLUG: (slug: string) => `/api/v1/feature-pages/${slug}`
    },

    // Site Config
    SITE_CONFIG: {
      LIST: "/api/v1/site-config",
      BY_KEY: (key: string) => `/api/v1/site-config/key/${key}`
    },

    // Job Postings
    JOB_POSTINGS: {
      LIST: "/api/v1/jobs/public",
      DETAIL: (id: number) => `/api/v1/jobs/public/${id}`,
      BY_SLUG: (slug: string) => `/api/v1/jobs/public/slug/${slug}`
    },

    // Job Applications
    JOB_APPLICATIONS: {
      APPLY: "/api/v1/job-applications/apply"
    },

    // Contact Submissions
    CONTACT_SUBMISSIONS: {
      SUBMIT: "/api/v1/contact-submissions"
    },

    // Detail Feature Sections
    DETAIL_FEATURE_SECTIONS: {
      LIST: "/api/v1/detail-feature-sections"
    },

    // Content Sections
    CONTENT_SECTIONS: {
      LIST: "/api/v1/content-sections",
      BY_KEY: (key: string) => `/api/v1/content-sections/key/${key}`
    },

    // Analytics (Public - for tracking)
    ANALYTICS: {
      TRACK_VISITOR: "/api/v1/analytics/visitors",
      TRACK_PAGE_VIEW: "/api/v1/analytics/page-views"
    }
  },

  // Admin Endpoints
  ADMIN: {
    // Pricing Plans
    PRICING_PLANS: {
      LIST: "/api/v1/pricing-plans/admin/all",
      CREATE: "/api/v1/pricing-plans/admin",
      UPDATE: (id: number) => `/api/v1/pricing-plans/admin/${id}`,
      DELETE: (id: number) => `/api/v1/pricing-plans/admin/${id}`,
      ADD_FEATURE: (planId: number) => `/api/v1/pricing-plans/admin/${planId}/features`,
      BULK_ADD_FEATURES: (planId: number) => `/api/v1/pricing-plans/admin/${planId}/features/bulk`,
      UPDATE_FEATURE: (planId: number, featureId: number) => `/api/v1/pricing-plans/admin/${planId}/features/${featureId}`,
      DELETE_FEATURE: (planId: number, featureId: number) => `/api/v1/pricing-plans/admin/${planId}/features/${featureId}`
    },

    // Features
    FEATURES: {
      LIST: "/api/v1/features/admin/all",
      CATEGORIES: "/api/v1/features/admin/categories",
      CREATE: "/api/v1/features/admin",
      UPDATE: (id: number) => `/api/v1/features/admin/${id}`,
      DELETE: (id: number) => `/api/v1/features/admin/${id}`
    },

    // Partners
    PARTNERS: {
      LIST: "/api/v1/partners/admin/all",
      CREATE: "/api/v1/partners/admin",
      UPDATE: (id: number) => `/api/v1/partners/admin/${id}`,
      DELETE: (id: number) => `/api/v1/partners/admin/${id}`
    },

    // Testimonials
    TESTIMONIALS: {
      LIST: "/api/v1/admin/testimonials",
      CREATE: "/api/v1/admin/testimonials",
      UPDATE: (id: number) => `/api/v1/admin/testimonials/${id}`,
      DELETE: (id: number) => `/api/v1/admin/testimonials/${id}`
    },

    // Media Files
    MEDIA_FILES: {
      LIST: "/api/v1/media-files/admin",
      UPLOAD: "/api/v1/media-files/admin/upload",
      UPDATE: (id: number) => `/api/v1/media-files/admin/${id}`,
      DELETE: (id: number) => `/api/v1/media-files/admin/${id}`,
      STATS: "/api/v1/media-files/admin/stats"
    },

    // Site Configuration
    SITE_CONFIG: {
      LIST: "/api/v1/site-config/admin",
      CREATE: "/api/v1/site-config/admin",
      UPDATE: (id: number) => `/api/v1/site-config/admin/${id}`,
      UPDATE_BY_KEY: (key: string) => `/api/v1/site-config/admin/key/${key}`,
      DELETE: (id: number) => `/api/v1/site-config/admin/${id}`,
      BULK_UPDATE: "/api/v1/site-config/admin/bulk-update"
    },

    // Contact Submissions
    CONTACTS: {
      LIST: "/api/v1/admin/contact-submissions",
      DETAIL: (id: number) => `/api/v1/admin/contact-submissions/${id}`,
      UPDATE: (id: number) => `/api/v1/admin/contact-submissions/${id}`,
      ASSIGN: (id: number) => `/api/v1/admin/contact-submissions/${id}/assign`,
      MARK_READ: (id: number) => `/api/v1/admin/contact-submissions/${id}/read`,
      DELETE: (id: number) => `/api/v1/admin/contact-submissions/${id}`,
      STATS: "/api/v1/admin/contact-submissions/stats"
    },

    // Analytics
    ANALYTICS: {
      OVERVIEW: "/api/v1/analytics/admin/overview",
      VISITORS: {
        LIST: "/api/v1/analytics/admin/visitors",
        DETAIL: (id: number) => `/api/v1/analytics/admin/visitors/${id}`
      },
      PAGE_VIEWS: {
        LIST: "/api/v1/analytics/admin/page-views"
      },
      STATS: "/api/v1/analytics/admin/stats"
    },

    // Audit Logs
    AUDIT_LOGS: {
      LIST: "/api/v1/admin/audit-logs",
      BY_ENTITY: (entityType: string, entityId: number) => `/api/v1/admin/audit-logs/entity/${entityType}/${entityId}`,
      BY_USER: (userId: number) => `/api/v1/admin/audit-logs/user/${userId}`,
      STATS: "/api/v1/admin/audit-logs/stats",
      CREATE: "/api/v1/admin/audit-logs"
    },

    // Detail Feature Sections
    DETAIL_FEATURE_SECTIONS: {
      LIST: "/api/v1/detail-feature-sections/admin",
      CREATE: "/api/v1/detail-feature-sections/admin",
      UPDATE: (id: number) => `/api/v1/detail-feature-sections/admin/${id}`,
      DELETE: (id: number) => `/api/v1/detail-feature-sections/admin/${id}`
    },

    // Content Sections
    CONTENT_SECTIONS: {
      LIST: "/api/v1/content-sections/admin",
      CREATE: "/api/v1/content-sections/admin",
      UPDATE: (id: number) => `/api/v1/content-sections/admin/${id}`,
      DELETE: (id: number) => `/api/v1/content-sections/admin/${id}`
    },

    // Benefit Stats
    BENEFIT_STATS: {
      LIST: "/api/v1/benefit-stats/admin",
      CREATE: "/api/v1/benefit-stats/admin",
      UPDATE: (id: number) => `/api/v1/benefit-stats/admin/${id}`,
      DELETE: (id: number) => `/api/v1/benefit-stats/admin/${id}`
    },

    // Process Steps
    PROCESS_STEPS: {
      LIST: "/api/v1/process-steps/admin",
      CREATE: "/api/v1/process-steps/admin",
      UPDATE: (id: number) => `/api/v1/process-steps/admin/${id}`,
      DELETE: (id: number) => `/api/v1/process-steps/admin/${id}`
    },

    // ERP Benefits
    ERP_BENEFITS: {
      LIST: "/api/v1/erp-benefits/admin",
      CREATE: "/api/v1/erp-benefits/admin",
      UPDATE: (id: number) => `/api/v1/erp-benefits/admin/${id}`,
      DELETE: (id: number) => `/api/v1/erp-benefits/admin/${id}`
    },

    // About Cards
    ABOUT_CARDS: {
      LIST: "/api/v1/about-cards/admin",
      CREATE: "/api/v1/about-cards/admin",
      UPDATE: (id: number) => `/api/v1/about-cards/admin/${id}`,
      DELETE: (id: number) => `/api/v1/about-cards/admin/${id}`
    },

    // Advanced Features
    ADVANCED_FEATURES: {
      LIST: "/api/v1/advanced-features/admin",
      CREATE: "/api/v1/advanced-features/admin",
      UPDATE: (id: number) => `/api/v1/advanced-features/admin/${id}`,
      DELETE: (id: number) => `/api/v1/advanced-features/admin/${id}`
    },

    // KelolaAja Features
    KELOLAAJA_FEATURES: {
      LIST: "/api/v1/kelolaaja-features/admin",
      CREATE: "/api/v1/kelolaaja-features/admin",
      UPDATE: (id: number) => `/api/v1/kelolaaja-features/admin/${id}`,
      DELETE: (id: number) => `/api/v1/kelolaaja-features/admin/${id}`
    },

    // Industries
    INDUSTRIES: {
      LIST: "/api/v1/industries/admin/all",
      DETAIL: (id: number) => `/api/v1/industries/admin/${id}`,
      CREATE: "/api/v1/industries/admin",
      UPDATE: (id: number) => `/api/v1/industries/admin/${id}`,
      DELETE: (id: number) => `/api/v1/industries/admin/${id}`,
      PROBLEMS: {
        LIST: (industryId: number) => `/api/v1/industries/admin/${industryId}/problems`,
        CREATE: (industryId: number) => `/api/v1/industries/admin/${industryId}/problems`,
        UPDATE: (problemId: number) => `/api/v1/industries/admin/problems/${problemId}`,
        DELETE: (problemId: number) => `/api/v1/industries/admin/problems/${problemId}`
      },
      SOLUTIONS: {
        LIST: (industryId: number) => `/api/v1/industries/admin/${industryId}/solutions`,
        CREATE: (industryId: number) => `/api/v1/industries/admin/${industryId}/solutions`,
        UPDATE: (solutionId: number) => `/api/v1/industries/admin/solutions/${solutionId}`,
        DELETE: (solutionId: number) => `/api/v1/industries/admin/solutions/${solutionId}`
      },
      MEDIA: {
        LIST: (industryId: number) => `/api/v1/industries/admin/${industryId}/media`,
        CREATE: (industryId: number) => `/api/v1/industries/admin/${industryId}/media`,
        UPDATE: (mediaId: number) => `/api/v1/industries/admin/media/${mediaId}`,
        DELETE: (mediaId: number) => `/api/v1/industries/admin/media/${mediaId}`
      }
    },

    // Feature Pages
    FEATURE_PAGES: {
      LIST: "/api/v1/feature-pages/admin/all",
      DETAIL: (id: number) => `/api/v1/feature-pages/admin/${id}`,
      CREATE: "/api/v1/feature-pages/admin",
      UPDATE: (id: number) => `/api/v1/feature-pages/admin/${id}`,
      DELETE: (id: number) => `/api/v1/feature-pages/admin/${id}`,
      ITEMS: {
        LIST: (pageId: number) => `/api/v1/feature-pages/admin/${pageId}/items`,
        CREATE: (pageId: number) => `/api/v1/feature-pages/admin/${pageId}/items`,
        UPDATE: (itemId: number) => `/api/v1/feature-pages/admin/items/${itemId}`,
        DELETE: (itemId: number) => `/api/v1/feature-pages/admin/items/${itemId}`
      }
    },

    // Job Postings
    JOB_POSTINGS: {
      LIST: "/api/v1/jobs/admin",
      STATS: "/api/v1/jobs/admin/stats",
      DETAIL: (id: number) => `/api/v1/jobs/admin/${id}`,
      CREATE: "/api/v1/jobs/admin",
      UPDATE: (id: number) => `/api/v1/jobs/admin/${id}`,
      DELETE: (id: number) => `/api/v1/jobs/admin/${id}`
    },

    // Job Applications
    JOB_APPLICATIONS: {
      LIST: "/api/v1/job-applications/admin",
      STATS: "/api/v1/job-applications/admin/stats",
      BY_JOB: (jobId: number) => `/api/v1/job-applications/admin/job/${jobId}`,
      DETAIL: (id: number) => `/api/v1/job-applications/admin/${id}`,
      UPDATE: (id: number) => `/api/v1/job-applications/admin/${id}`,
      DELETE: (id: number) => `/api/v1/job-applications/admin/${id}`
    },

    // FAQs
    FAQS: {
      LIST: "/api/v1/admin/faqs",
      CREATE: "/api/v1/admin/faqs",
      UPDATE: (id: number) => `/api/v1/admin/faqs/${id}`,
      DELETE: (id: number) => `/api/v1/admin/faqs/${id}`
    },

    // FAQ Categories
    FAQ_CATEGORIES: {
      LIST: "/api/v1/admin/faq-categories",
      CREATE: "/api/v1/admin/faq-categories",
      UPDATE: (id: number) => `/api/v1/admin/faq-categories/${id}`,
      DELETE: (id: number) => `/api/v1/admin/faq-categories/${id}`
    }
  }
} as const;

// Frontend API Routes (Next.js proxy)
export const FRONTEND_API = {
  PROXY: "/api/proxy",
  AUTH_LOGIN: "/api/auth/login"
} as const;

/**
 * Helper function to build proxy URL
 * @param endpoint - Backend API endpoint
 * @returns Proxied URL for frontend to call
 */
export function getProxyUrl(endpoint: string): string {
  return `${FRONTEND_API.PROXY}?endpoint=${encodeURIComponent(endpoint)}`;
}

/**
 * Helper function to get authorization headers
 * @returns Authorization header object
 */
export function getAuthHeaders(): HeadersInit {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Fetch wrapper with automatic proxy and auth
 * @param endpoint - API endpoint
 * @param options - Fetch options
 * @returns Promise with response
 */
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const url = getProxyUrl(endpoint);
  
  // Don't set Content-Type for FormData (file uploads)
  const isFormData = options.body instanceof FormData;
  const headers: HeadersInit = {
    ...getAuthHeaders(),
    ...options.headers
  };
  
  // Set Content-Type only if not FormData and not already set
  if (!isFormData && !(headers instanceof Headers) && !Array.isArray(headers)) {
    const headersObj = headers as Record<string, string>;
    if (!headersObj['Content-Type']) {
      headersObj['Content-Type'] = 'application/json';
    }
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  return response;
}

/**
 * Public API fetch helper (no auth required)
 * Fetches data from public endpoints with timeout and error handling
 * @param endpoint - Public API endpoint (e.g., API_ENDPOINTS.PUBLIC.FAQS.LIST)
 * @param options - Fetch options
 * @param timeout - Timeout in milliseconds (default: 5000)
 * @returns Promise with response data or null on error
 */
export async function fetchPublicData<T = any>(
  endpoint: string,
  options: RequestInit = {},
  timeout: number = 5000
): Promise<{ success: boolean; data: T | null; error?: string }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const baseUrl = API_BASE_URL;
    const url = `${baseUrl}${endpoint}`;

    // Don't set Content-Type for FormData (file uploads)
    const isFormData = options.body instanceof FormData;
    const headers: HeadersInit = { ...options.headers };
    
    // Set Content-Type only if not FormData and not already set
    if (!isFormData && !(headers instanceof Headers) && !Array.isArray(headers)) {
      const headersObj = headers as Record<string, string>;
      if (!headersObj['Content-Type']) {
        headersObj['Content-Type'] = 'application/json';
      }
    }

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      success: true,
      data: data.success ? data.data : data
    };
  } catch (error: any) {
    // Silently fail - only log in development
    if (process.env.NODE_ENV === "development" && error.name !== "AbortError") {
      console.error(`Error fetching ${endpoint}:`, error);
    }

    return {
      success: false,
      data: null,
      error: error.name === "AbortError" ? "Request timeout" : error.message
    };
  }
}
