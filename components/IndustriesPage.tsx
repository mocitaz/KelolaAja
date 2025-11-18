'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import ScrollAnimation from '@/components/ScrollAnimation'
import Image from 'next/image'
import Link from 'next/link'

export default function IndustriesPage() {
  const { t, locale } = useLanguage()
  
  const industries = [
    {
      title: t.navDropdown.industries.fnb,
      description: locale === 'id' ? 'Untuk restoran, kafe, dan bisnis kuliner' : 'For restaurants, cafes, and culinary businesses',
      image: '/images/industries/fnb/industry-fnb.jpg',
      href: '/industries/fnb',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: t.navDropdown.industries.contractor,
      description: locale === 'id' ? 'Manajemen proyek konstruksi terintegrasi' : 'Integrated construction project management',
      image: '/images/industries/contractor/industry-contractor.jpg',
      href: '/industries/contractor',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: t.navDropdown.industries.manufacturing,
      description: locale === 'id' ? 'Produksi dan inventory management' : 'Production and inventory management',
      image: '/images/industries/manufacturing/industry-manufacturing.jpg',
      href: '/industries/manufaktur',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      title: t.navDropdown.industries.retail,
      description: locale === 'id' ? 'Untuk toko retail dan e-commerce' : 'For retail stores and e-commerce',
      image: '/images/industries/retail/industry-retail.jpg',
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
      <section className="pt-32 lg:pt-40 pb-16 lg:pb-20 bg-gradient-to-br from-white via-primary-50/30 to-secondary-50/20 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-100/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <ScrollAnimation direction="fade" delay={0} duration={600}>
              <div className="inline-block mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                  <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                  {t.industriesPage?.hero?.badge || 'Solusi ERP untuk Semua Industri'}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-gray-900 mb-6 leading-tight">
                {t.industriesPage?.hero?.title || 'Industri yang Kami Layani'}
              </h1>
              <p className="text-base lg:text-lg xl:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                {t.industriesPage?.hero?.subtitle || 'KelolaAja hadir dengan solusi ERP yang disesuaikan untuk berbagai industri. Dari restoran hingga manufaktur, kami membantu bisnis Anda tumbuh lebih efisien dan profesional.'}
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-12 lg:py-20 bg-white relative">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white pointer-events-none"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                    className="group block bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 hover:shadow-2xl hover:border-primary-300 transition-all duration-500 h-full transform hover:-translate-y-2"
                  >
                    {/* Image Container with Gradient Overlay */}
                    <div className="relative w-full aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden">
                      <Image
                        src={industry.image}
                        alt={industry.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Icon Badge */}
                      <div className="absolute top-5 right-5 w-14 h-14 rounded-2xl bg-white/95 backdrop-blur-md flex items-center justify-center text-primary-600 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border-2 border-white/50">
                        {industry.icon}
                      </div>

                      {/* Title Overlay on Hover */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {industry.title}
                        </h3>
                        <p className="text-white/90 text-sm leading-relaxed">
                          {industry.description}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 lg:p-8 bg-white">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                        {industry.title}
                      </h3>
                      <p className="text-sm lg:text-base text-gray-600 leading-relaxed mb-6">
                        {industry.description}
                      </p>
                      <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                        <span>{t.industriesPage?.learnMore || 'Pelajari Selengkapnya'}</span>
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Hover Accent Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
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

