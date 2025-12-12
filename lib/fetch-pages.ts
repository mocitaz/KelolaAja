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
        cache: 'no-store', // Always fetch fresh data
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
        cache: 'no-store', // Always fetch fresh data
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
        cache: 'no-store',
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
export async function fetchAllIndustries(
  locale: string = 'id'
): Promise<IndustryData[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/industries?locale=${locale}`,
      {
        method: 'GET',
        headers: {
          'Accept-Language': locale,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
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
