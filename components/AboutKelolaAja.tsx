'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { createWhatsAppLink } from '@/lib/whatsapp'
import ScrollAnimation from '@/components/ScrollAnimation'
import { useEffect, useState } from 'react'

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
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
      const response = await fetch(`${baseUrl}/api/v1/about-cards`)
      const data = await response.json()
      
      if (data.success && Array.isArray(data.data)) {
        setAboutCards(data.data.filter((card: AboutCard) => card.isActive))
      }
    } catch (error) {
      console.error('Error fetching about cards:', error)
      setAboutCards([])
    } finally {
      setLoading(false)
    }
  }

  const getCardContent = (cardKey: string) => {
    const card = aboutCards.find(c => c.cardKey === cardKey)
    if (!card) return null
    
    const translation = card.translations?.find(t => t.locale === locale)
    return translation?.content || ''
  }

  const title = getCardContent('title') || t.aboutKelolaAja?.title || 'Apa Itu KelolaAja?'
  const subtitle = getCardContent('subtitle') || t.aboutKelolaAja?.subtitle || 'Software ERP Akuntansi Terdepan untuk Bisnis Indonesia'
  const description = getCardContent('description') || t.aboutKelolaAja?.description || 'KelolaAja software ERP Akuntansi, didirikan pada 2024 untuk menjawab tantangan perusahaan dalam mengelola sistem manajemen secara efisien. Dengan solusi software bisnis KelolaAja hadir untuk memenuhi kebutuhan berbagai industri.'
  const highlight = getCardContent('highlight') || t.aboutKelolaAja?.highlight || 'Dirancang khusus untuk kemudahan penggunaannya dan disesuaikan dengan kebutuhan perusahaan Indonesia. KelolaAja merupakan software ERP pertama yang menawarkan keunggulan pendampingan laporan keuangan sampai dengan laporan perpajakan.'
  const ctaText = getCardContent('cta') || t.aboutKelolaAja?.ctaText || 'Coba Gratis Sekarang'

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0498da]"></div>
      </div>
    )
  }

  return (
    <div className="h-full">
      <ScrollAnimation direction="right" delay={0} duration={600}>
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-base lg:text-lg text-gray-600 mb-4">
            {subtitle}
          </p>
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


