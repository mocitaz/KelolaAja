'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { createWhatsAppLink } from '@/lib/whatsapp'
import ScrollAnimation from '@/components/ScrollAnimation'
import { useEffect, useState } from 'react'
import { fetchPublicData, API_ENDPOINTS } from '@/lib/api-config'

interface AboutCard {
  cardId: number
  cardKey: string
  displayOrder: number
  isActive: boolean
  translations?: {
    locale: string
    title: string
    content: string
  }[]
}

export default function AboutKelolaAja() {
  const { t, locale } = useLanguage()
  const whatsappLink = createWhatsAppLink()
  const [aboutCards, setAboutCards] = useState<AboutCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAboutCards()
  }, [])

  const fetchAboutCards = async () => {
    console.log('[AboutKelolaAja] Fetching about cards...');
    const result = await fetchPublicData<AboutCard[]>(
      API_ENDPOINTS.PUBLIC.ABOUT_CARDS.LIST
    )

    console.log('[AboutKelolaAja] API Response:', result);
    if (result.success && Array.isArray(result.data)) {
      console.log('[AboutKelolaAja] Raw data:', result.data);
      const activeCards = result.data.filter((card: AboutCard) => card.isActive);
      console.log('[AboutKelolaAja] Active cards:', activeCards);
      setAboutCards(activeCards)
    } else {
      console.log('[AboutKelolaAja] No data, using fallback');
      setAboutCards([])
    }

    setLoading(false)
  }

  const getCardContent = (cardKey: string) => {
    const card = aboutCards.find(c => c.cardKey === cardKey)
    if (!card) return null

    const translation = card.translations?.find(t => t.locale === locale)
    return translation?.content || ''
  }

  const title = getCardContent('title') || t.aboutKelolaAja?.title || 'Apa Itu KelolaAja?'
  const subtitle = getCardContent('subtitle') || t.aboutKelolaAja?.subtitle || ''
  const description = getCardContent('description') || t.aboutKelolaAja?.description || 'KelolaAja adalah software ERP terintegrasi yang dikembangkan khusus untuk menjawab kebutuhan small to growing businesses di Indonesia. Dirancang untuk menyederhanakan proses manajemen keuangan, pembukuan, pelaporan, hingga operasional bisnis lainnya secara menyeluruh, KelolaAja memungkinkan perusahaan untuk mengelola dan memantau aktivitas bisnis secara real-time, dari mana saja, dengan efisiensi tinggi dan akurasi yang konsisten.'
  const highlight = getCardContent('highlight') || t.aboutKelolaAja?.highlight || 'Meski dioptimalkan untuk bisnis yang sedang tumbuh, KelolaAja dibangun dengan standar dan kapabilitas enterprise-class. Ini memastikan bahwa perusahaan skala besar sekalipun tetap dapat mengandalkan KelolaAja dalam memenuhi kompleksitas kebutuhan internal mereka.'
  const ctaText = getCardContent('cta') || t.aboutKelolaAja?.ctaText || 'Coba Gratis Sekarang'

  // Don't show loading spinner - directly use fallback data from translations

  return (
    <div className="h-full">
      <ScrollAnimation direction="right" delay={0} duration={600}>
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base lg:text-lg text-gray-600 mb-4">
              {subtitle}
            </p>
          )}
          <div className="space-y-3 text-sm lg:text-base text-gray-700 leading-relaxed text-justify">
            <p>
              {description}
            </p>
            <p>
              {highlight}
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-6">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: '#0498da',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0388c2'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0498da'
              }}
            >
              <span>{ctaText}</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  )
}


