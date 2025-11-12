'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function ERPBenefits() {
  const { t } = useLanguage()

  const benefits = [
    {
      title: t.erpBenefits?.benefits?.purchasing?.title || 'Purchasing',
      description: t.erpBenefits?.benefits?.purchasing?.description || 'Buat purchase order dan faktur dalam satu langkah mudah.',
      image: '/images/home/purchasing.jpg',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: t.erpBenefits?.benefits?.multiWarehouse?.title || 'Multi Gudang',
      description: t.erpBenefits?.benefits?.multiWarehouse?.description || 'KelolaAja stok produkmu dibanyak tempat dengan mudah dan pantau stok pergudang secara realtime.',
      image: '/images/home/multi-gudang.jpg',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: t.erpBenefits?.benefits?.importExcel?.title || 'Import dari Excel',
      description: t.erpBenefits?.benefits?.importExcel?.description || 'Tidak perlu lagi repot memasukkan data produk dan stok secara manual, cukup ketik di Excel dan unggah. Semua informasi akan otomatis terintegrasi ke dalam sistem KelolaAja.',
      image: '/images/inventory/import-excel.jpg',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <ScrollAnimation direction="fade" delay={0} duration={500}>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
              Keuntungan Menggunakan Software ERP KelolaAja
            </h2>
          </div>
        </ScrollAnimation>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto items-stretch">
          {benefits.map((benefit, index) => (
            <ScrollAnimation
              key={index}
              direction="up"
              delay={index * 100}
              duration={500}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary-200 transition-all duration-300 group flex flex-col h-full">
                {/* Screenshot */}
                <div className="relative w-full aspect-video bg-gray-50 overflow-hidden flex-shrink-0">
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      if (target.parentElement) {
                        target.parentElement.className += ' bg-gradient-to-br from-primary-100 to-secondary-100'
                      }
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col items-center text-center flex-grow">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-200 group-hover:scale-110 transition-all duration-300 mx-auto">
                      {benefit.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}

