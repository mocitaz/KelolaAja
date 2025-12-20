'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import ScrollAnimation from '@/components/ScrollAnimation'
import { useState, useEffect } from 'react'
import { fetchPublicData, API_ENDPOINTS } from '@/lib/api-config'

interface Industry {
  industryId: number
  industryCode: string
  slug: string
  iconName?: string
  displayOrder: number
  isActive: boolean
  translations?: {
    locale: string
    title: string
    description: string
  }[]
}

interface IndustriesProps {
  data?: Industry[]
}

export default function Industries({ data }: IndustriesProps) {
  const { t, locale } = useLanguage()
  const [industries, setIndustries] = useState<Industry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (data && data.length > 0) {
      setIndustries(data.filter((ind: Industry) => ind.isActive))
      setLoading(false)
    } else {
      fetchIndustries()
    }
  }, [data])

  const fetchIndustries = async () => {
    if (data && data.length > 0) return

    const result = await fetchPublicData<Industry[]>(
      API_ENDPOINTS.PUBLIC.INDUSTRIES.LIST
    )

    if (result.success && Array.isArray(result.data)) {
      setIndustries(result.data.filter((ind: Industry) => ind.isActive))
    } else {
      setIndustries([])
    }

    setLoading(false)
  }

  const getIndustryContent = (industry: Industry) => {
    const translation = industry.translations?.find(t => t.locale === locale)
    return {
      title: translation?.title || industry.slug,
      description: translation?.description || '',
      icon: industry.iconName || '🏢'
    }
  }

  // Fallback industries
  const defaultIndustries = [
    {
      title: 'Food & Beverage',
      description: 'Solusi lengkap untuk mengelola restoran, kafe, dan bisnis kuliner Anda. Kelola menu, pesanan, inventory, dan laporan keuangan dengan mudah.',
      icon: '🍽️',
    },
    {
      title: 'Kontraktor',
      description: 'Sistem manajemen proyek konstruksi yang terintegrasi. Kelola proyek, material, tenaga kerja, dan progress dengan efisien.',
      icon: '🏗️',
    },
    {
      title: 'Manufaktur',
      description: 'Sistem manufaktur terintegrasi untuk mengelola produksi, quality control, supply chain, dan inventory management.',
      icon: '🏭',
    },
    {
      title: 'Retail',
      description: 'Solusi lengkap untuk mengelola toko retail dan e-commerce. Kelola produk, penjualan, inventory, dan customer dengan mudah.',
      icon: '🛍️',
    },
  ]

  const displayIndustries = industries.length > 0
    ? industries.map(ind => getIndustryContent(ind))
    : defaultIndustries

  return (
    <section id="industries" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation direction="fade" delay={0} duration={600}>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
              {t.industries?.title || 'Industri yang Kami Layani'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.industries?.subtitle || 'Solusi terbaik untuk berbagai industri dan kebutuhan bisnis Anda'}
            </p>
          </div>
        </ScrollAnimation>

        {/* Image Section - 16:9 Aspect Ratio */}
        <ScrollAnimation direction="up" delay={0} duration={600}>
          <div className="mb-16 max-w-6xl mx-auto">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/home/industries.jpg"
                alt="Industri yang Kami Layani"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1200px"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  if (target.parentElement) {
                    target.parentElement.className += ' bg-gradient-to-br from-primary-100 to-secondary-100'
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10"></div>
            </div>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayIndustries.map((industry, index) => (
            <ScrollAnimation
              key={index}
              direction="up"
              delay={index * 100}
              duration={500}
            >
              <div
                className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-xl hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2 border border-primary-100 hover:border-primary-300 scroll-mt-20 h-full flex flex-col"
              >
                <div className="text-5xl mb-4 text-center lg:text-left">{industry.icon}</div>
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-3 text-center lg:text-left">
                  {industry.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center lg:text-left flex-1">
                  {industry.description}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}

