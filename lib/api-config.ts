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

  // Pricing Plans
  PRICING_PLANS: {
    LIST: "/api/v1/admin/pricing-plans",
    CREATE: "/api/v1/admin/pricing-plans",
    UPDATE: (id: number) => `/api/v1/admin/pricing-plans/${id}`,
    DELETE: (id: number) => `/api/v1/admin/pricing-plans/${id}`
  },

  // Features
  FEATURES: {
    LIST: "/api/v1/admin/features",
    CREATE: "/api/v1/admin/features",
    UPDATE: (id: number) => `/api/v1/admin/features/${id}`,
    DELETE: (id: number) => `/api/v1/admin/features/${id}`
  },

  // Partners
  PARTNERS: {
    LIST: "/api/v1/admin/partners",
    CREATE: "/api/v1/admin/partners",
    UPDATE: (id: number) => `/api/v1/admin/partners/${id}`,
    DELETE: (id: number) => `/api/v1/admin/partners/${id}`
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
    MARK_READ: (id: number) => `/api/v1/admin/contact-submissions/${id}/read`,
    DELETE: (id: number) => `/api/v1/admin/contact-submissions/${id}`
  },

  // Analytics
  ANALYTICS: {
    OVERVIEW: "/api/v1/analytics/overview",
    VISITORS: "/api/v1/analytics/visitors"
  },

  // Audit Logs
  AUDIT_LOGS: {
    LIST: "/api/v1/admin/audit-logs"
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
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
    ...options.headers
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  return response;
}
