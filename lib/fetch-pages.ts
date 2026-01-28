/**
 * Utility functions untuk fetch feature pages dan industry pages
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://kelolaaja-be-production.up.railway.app'

interface FeaturePageItem {
  itemId: number
  displayOrder: number
  iconName: string
  title: string
  description: string
}

interface FeaturePageData {
  pageId: number
  pageSlug: string
  displayOrder: number
  iconName: string
  isActive: boolean
  title: string
  description: string
  heroTitle: string
  heroDescription: string
  items?: FeaturePageItem[]
}

interface IndustryProblem {
  problemId: number
  displayOrder: number
  iconName: string
  title: string
  description: string
}

interface IndustrySolution {
  solutionId: number
  displayOrder: number
  iconName: string
  title: string
  description: string
}

interface IndustryMedia {
  mediaId: number
  displayOrder: number
  mediaType: string
  mediaFile: {
    mediaFileId: number
    fileUrl: string
    altText: string | null
  }
  caption: string | null
}

interface IndustryData {
  industryId: number
  industrySlug: string
  displayOrder: number
  iconName: string
  isActive: boolean
  name: string
  description: string
  heroTitle: string
  heroDescription: string
  problems?: IndustryProblem[]
  solutions?: IndustrySolution[]
  media?: IndustryMedia[]
}

/**
 * Fetch feature page data by slug
 * @param slug - Page slug (e.g., 'finance', 'hr', 'inventory')
 * @param locale - Language locale ('id' or 'en')
 * @returns Feature page data or null if failed
 */
export async function fetchFeaturePage(
  slug: string,
  locale: string = 'id'
): Promise<FeaturePageData | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/feature-pages/${slug}?locale=${locale}`,
      {
        method: 'GET',
        headers: {
          'Accept-Language': locale,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 }, // Always fetch fresh data
      }
    )

    if (!response.ok) {
      console.error(`Failed to fetch feature page ${slug}:`, response.statusText)
      return null
    }

    const result = await response.json()

    if (result.success && result.data) {
      return result.data
    }

    return null
  } catch (error) {
    console.error(`Error fetching feature page ${slug}:`, error)
    return null
  }
}

/**
 * Fetch industry data by slug
 * @param slug - Industry slug (e.g., 'retail', 'manufacturing', 'contractor')
 * @param locale - Language locale ('id' or 'en')
 * @returns Industry data or null if failed
 */
export async function fetchIndustry(
  slug: string,
  locale: string = 'id'
): Promise<IndustryData | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/industries/${slug}?locale=${locale}`,
      {
        method: 'GET',
        headers: {
          'Accept-Language': locale,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 }, // Always fetch fresh data
      }
    )

    if (!response.ok) {
      console.error(`Failed to fetch industry ${slug}:`, response.statusText)
      return null
    }

    const result = await response.json()

    if (result.success && result.data) {
      return result.data
    }

    return null
  } catch (error) {
    console.error(`Error fetching industry ${slug}:`, error)
    return null
  }
}

/**
 * Fetch all feature pages
 * @param locale - Language locale ('id' or 'en')
 * @returns Array of feature pages or empty array if failed
 */
export async function fetchAllFeaturePages(
  locale: string = 'id'
): Promise<FeaturePageData[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/feature-pages?locale=${locale}`,
      {
        method: 'GET',
        headers: {
          'Accept-Language': locale,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 },
      }
    )

    if (!response.ok) {
      console.error('Failed to fetch feature pages:', response.statusText)
      return []
    }

    const result = await response.json()

    if (result.success && result.data && Array.isArray(result.data)) {
      return result.data
    }

    return []
  } catch (error) {
    console.error('Error fetching feature pages:', error)
    return []
  }
}

/**
 * Fetch all industries
 * @param locale - Language locale ('id' or 'en')
 * @returns Array of industries or empty array if failed
 */
// ... existing imports

/**
 * Fetch all testimonials
 */
export async function fetchTestimonials(locale: string = 'id'): Promise<any[]> {
  try {
    console.log('[Server fetchTestimonials] Fetching from:', `${API_BASE_URL}/api/v1/testimonials`);
    const response = await fetch(`${API_BASE_URL}/api/v1/testimonials`, { next: { revalidate: 60 } });
    const result = await response.json();
    console.log('[Server fetchTestimonials] Response success:', result.success);

    if (result.success && Array.isArray(result.data)) {
      // Map API field names to component field names
      const mapped = result.data.map((t: any) => {
        // Extract localized content
        const translations = t.translations || {};
        const localizedData = translations[locale] || translations['id'] || {};
        const quote = localizedData.quote || t.quote || "";

        return {
          testimonialId: t.testimonialId,
          personName: t.name,           // API: name -> Component: personName
          position: t.title,             // API: title -> Component: position
          company: t.company,
          testimonialText: quote,        // Default resolved text (fallback)
          translations: t.translations,  // Pass full translations to client
          rating: t.rating,
          imageUrl: t.photo,             // API: photo -> Component: imageUrl
          isActive: t.isFeatured !== false, // Use isFeatured as isActive
          displayOrder: t.displayOrder
        };
      });
      console.log('[Server fetchTestimonials] Mapped testimonials:', mapped.length);
      return mapped;
    }

    console.log('[Server fetchTestimonials] No data, returning empty array');
    return [];
  } catch (error) {
    console.error('[Server fetchTestimonials] Error:', error);
    return [];
  }
}

/**
 * Fetch all partners
 */
export async function fetchPartners(): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/partners`, { next: { revalidate: 60 } });
    const result = await response.json();
    return result.success && Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    console.error('Error fetching partners:', error);
    return [];
  }
}

/**
 * Fetch all KelolaAja features
 */
export async function fetchKelolaAjaFeatures(): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/kelolaaja-features`, { next: { revalidate: 60 } });
    const result = await response.json();
    return result.success && Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    console.error('Error fetching KelolaAja features:', error);
    return [];
  }
}

/**
 * Fetch all process steps
 */
export async function fetchProcessSteps(): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/process-steps`, { next: { revalidate: 60 } });
    const result = await response.json();
    return result.success && Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    console.error('Error fetching process steps:', error);
    return [];
  }
}

/**
 * Fetch all ERP benefits
 */
export async function fetchERPBenefits(): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/erp-benefits`, { next: { revalidate: 60 } });
    const result = await response.json();
    return result.success && Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    console.error('Error fetching ERP benefits:', error);
    return [];
  }
}

/**
 * Fetch benefit stats
 */
export async function fetchBenefitStats(): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/benefit-stats`, { next: { revalidate: 60 } });
    const result = await response.json();
    return result.success && Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    console.error('Error fetching benefit stats:', error);
    return [];
  }
}

/**
 * Fetch advanced features
 */
export async function fetchAdvancedFeatures(): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/advanced-features`, { next: { revalidate: 60 } });
    const result = await response.json();
    return result.success && Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    console.error('Error fetching advanced features:', error);
    return [];
  }
}

/**
 * Fetch industries list for landing page (simpler structure)
 */
export async function fetchIndustriesList(): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/industries`, { next: { revalidate: 60 } });
    const result = await response.json();
    return result.success && Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    console.error('Error fetching industries list:', error);
    return [];
  }
}

export async function fetchAllIndustries(
  locale: string = 'id'
): Promise<IndustryData[]> {
  // ... existing implementation

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/industries?locale=${locale}`,
      {
        method: 'GET',
        headers: {
          'Accept-Language': locale,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 },
      }
    )

    if (!response.ok) {
      console.error('Failed to fetch industries:', response.statusText)
      return []
    }

    const result = await response.json()

    if (result.success && result.data && Array.isArray(result.data)) {
      return result.data
    }

    return []
  } catch (error) {
    console.error('Error fetching industries:', error)
    return []
  }
}

// Export types for use in components
export type {
  FeaturePageData,
  FeaturePageItem,
  IndustryData,
  IndustryProblem,
  IndustrySolution,
  IndustryMedia,
}
