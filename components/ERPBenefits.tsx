'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import ScrollAnimation from '@/components/ScrollAnimation'
import { useState } from 'react'
import { createWhatsAppLink } from '@/lib/whatsapp'

export default function ERPBenefits() {
  const { t, locale } = useLanguage()
  const whatsappLink = createWhatsAppLink()
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const benefits = [
    {
      title: t.erpBenefits?.benefits?.purchasing?.title || 'Purchasing',
      description: t.erpBenefits?.benefits?.purchasing?.description || 'Buat purchase order dan faktur dalam satu langkah mudah.',
      image: '/images/home/purchasing.jpg',
    },
    {
      title: t.erpBenefits?.benefits?.multiWarehouse?.title || 'Multi Gudang',
      description: t.erpBenefits?.benefits?.multiWarehouse?.description || 'KelolaAja stok produkmu dibanyak tempat dengan mudah dan pantau stok pergudang secara realtime.',
      image: '/images/home/multi-gudang.jpg',
    },
    {
      title: t.erpBenefits?.benefits?.importExcel?.title || 'Import dari Excel',
      description: t.erpBenefits?.benefits?.importExcel?.description || 'Tidak perlu lagi repot memasukkan data produk dan stok secara manual, cukup ketik di Excel dan unggah. Semua informasi akan otomatis terintegrasi ke dalam sistem KelolaAja.',
      image: '/images/inventory/import-excel.jpg',
    },
  ]

  const toggleExpand = (index: number) => {
    // Jika klik pada item yang sudah expanded, jangan tutup (harus ada minimal 1 yang terbuka)
    if (expandedIndex === index) {
      return
    }
    // Buka item yang diklik
    setExpandedIndex(index)
  }

  const activeIndex = expandedIndex ?? 0
  const activeBenefit = benefits[activeIndex]

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <ScrollAnimation direction="fade" delay={0} duration={500}>
          <div className="text-center mb-8 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900">
              {t.erpBenefits?.title || 'Keuntungan Menggunakan Software ERP KelolaAja'}
            </h2>
          </div>
        </ScrollAnimation>

        {/* Benefits Accordion with Split Layout */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          <div className="space-y-3">
            {benefits.map((benefit, index) => {
              const isExpanded = expandedIndex === index
              return (
                <ScrollAnimation
                  key={index}
                  direction="up"
                  delay={index * 50}
                  duration={500}
                >
                  <div
                    className={`bg-white rounded-lg border-2 transition-all duration-300 overflow-hidden ${
                      isExpanded
                        ? 'border-[#0498da] shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <button
                      onClick={() => toggleExpand(index)}
                      className="w-full px-4 py-3 lg:px-5 lg:py-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                    >
                      <h3 className="text-lg lg:text-xl font-bold text-gray-900">
                        {benefit.title}
                      </h3>
                      <div className="flex-shrink-0 ml-3">
                        {isExpanded ? (
                          <svg
                            className="w-5 h-5 text-[#0498da]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 12H4"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 py-2.5 lg:px-5 lg:py-3 border-t border-gray-100">
                        <p className="text-sm text-gray-700 leading-snug mb-3">
                          {benefit.description}
                        </p>
                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-105"
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
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.375a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                          <span>{locale === 'id' ? 'WhatsApp sekarang' : 'WhatsApp now'}</span>
                        </a>
                      </div>
                    )}
                  </div>
                </ScrollAnimation>
              )
            })}
          </div>

          <div className="relative w-full rounded-lg overflow-hidden" style={{ minHeight: '500px', aspectRatio: '16/9' }}>
            <Image
              key={activeBenefit.image}
              src={activeBenefit.image}
              alt={activeBenefit.title}
              fill
              className="object-contain rounded-lg transition-all duration-300"
              sizes="(max-width: 1024px) 100vw, 50vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                if (target.parentElement) {
                  target.parentElement.style.background = 'linear-gradient(to bottom right, #e6f7fd, #f0f9ec)'
                }
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
