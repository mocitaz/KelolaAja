'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import ScrollAnimation from '@/components/ScrollAnimation'
import Image from 'next/image'
import Link from 'next/link'

export default function IndustriesPage() {
  const { t } = useLanguage()

  const industries = [
    {
      title: t.navDropdown.industries.fnb,
      description: 'Untuk restoran, kafe, dan bisnis kuliner',
      image: '/images/industry-fnb.jpg',
      href: '/industries/fnb',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: t.navDropdown.industries.contractor,
      description: 'Manajemen proyek konstruksi terintegrasi',
      image: '/images/industry-contractor.jpg',
      href: '/industries/contractor',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: t.navDropdown.industries.manufacturing,
      description: 'Produksi dan inventory management',
      image: '/images/industry-manufacturing.jpg',
      href: '/industries/manufaktur',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      title: t.navDropdown.industries.retail,
      description: 'Untuk toko retail dan e-commerce',
      image: '/images/industry-retail.jpg',
      href: '/industries/retail',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 lg:pt-40 pb-12 lg:pb-16 bg-gradient-to-b from-primary-50 via-white to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimation direction="fade" delay={0} duration={600}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
                Industri yang Kami Layani
              </h1>
              <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                KelolaAja hadir dengan solusi ERP yang disesuaikan untuk berbagai industri. Dari restoran hingga manufaktur, kami membantu bisnis Anda tumbuh lebih efisien.
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {industries.map((industry, index) => (
                <ScrollAnimation
                  key={index}
                  direction="up"
                  delay={index * 100}
                  duration={600}
                >
                  <Link
                    href={industry.href}
                    className="group block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all duration-300 h-full"
                  >
                    {/* Image */}
                    <div className="relative w-full aspect-video bg-gray-50 overflow-hidden">
                      <Image
                        src={industry.image}
                        alt={industry.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          if (target.parentElement) {
                            target.parentElement.className += ' bg-gradient-to-br from-primary-100 to-secondary-100'
                          }
                        }}
                      />
                      {/* Icon Overlay */}
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {industry.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                        {industry.title}
                      </h3>
                      <p className="text-sm lg:text-base text-gray-600 leading-relaxed mb-4">
                        {industry.description}
                      </p>
                      <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                        <span>Pelajari Selengkapnya</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

