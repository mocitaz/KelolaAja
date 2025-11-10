'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { createWhatsAppLink } from '@/lib/whatsapp'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function PricingSection() {
  const { t } = useLanguage()
  const whatsappLink = createWhatsAppLink()

  const pricingData = t.pricing || {
    title: 'Semua Fitur Hebat KelolaAja',
    subtitle: 'Hanya 200ribuan/bulan',
    description: 'Dari pembuatan faktur, pembelian, pengelolaan inventaris, manajemen aset tetap, hingga laporan keuangan dan analisis bisnis, semuanya tersedia dalam satu platform.',
    plans: [],
  }

  const getBadgeColorClass = (color: string) => {
    switch (color) {
      case 'orange':
        return 'bg-orange-500'
      case 'blue':
        return 'bg-primary-600'
      case 'green':
        return 'bg-secondary-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <section className="pt-32 lg:pt-40 pb-12 lg:pb-20 bg-gradient-to-b from-primary-50 via-white to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16 max-w-4xl mx-auto">
          <ScrollAnimation direction="fade" delay={0} duration={600}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-3 lg:mb-4">
              {pricingData.title}
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 lg:mb-5">
              {pricingData.subtitle}
            </p>
            <p className="text-sm lg:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {pricingData.description}
            </p>
          </ScrollAnimation>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {pricingData.plans.map((plan, index) => (
            <ScrollAnimation
              key={index}
              direction="up"
              delay={index * 150}
              duration={600}
              className="flex"
            >
              <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 hover:shadow-2xl hover:border-primary-400 hover:-translate-y-2 transition-all duration-300 flex flex-col w-full group overflow-hidden relative">
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                
                {/* Badge with Gradient Effect */}
                <div className={`relative ${getBadgeColorClass(plan.badgeColor)} text-white px-5 lg:px-6 py-4 lg:py-4.5 overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                  <span className="relative font-bold text-base lg:text-lg uppercase tracking-wider">
                    {plan.name}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8 flex flex-col flex-1 relative z-10">
                  {/* Price Section with Icon */}
                  <div className="mb-5 pb-5 border-b-2 border-gray-100">
                    <div className="flex items-baseline gap-2 mb-2">
                      <div className="text-4xl lg:text-5xl font-bold text-gray-900">
                        {plan.price}
                      </div>
                    </div>
                    <div className="text-xs lg:text-sm text-gray-500 font-medium">
                      {plan.pricePeriod}
                    </div>
                    {/* User Range Badge */}
                    <div className="mt-4 inline-flex items-center px-3 py-1.5 bg-primary-50 rounded-full border border-primary-200">
                      <svg
                        className="w-4 h-4 text-primary-600 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="text-xs lg:text-sm font-semibold text-primary-700">
                        {plan.userRange}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3.5 lg:space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start group/feature">
                        <div className="flex-shrink-0 w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-secondary-100 group-hover/feature:bg-secondary-200 flex items-center justify-center mr-3 mt-0.5 transition-colors duration-200">
                          <svg
                            className="w-3 h-3 lg:w-4 lg:h-4 text-secondary-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-sm lg:text-base text-gray-700 leading-relaxed group-hover/feature:text-gray-900 transition-colors duration-200">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button with Enhanced Styling */}
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center justify-center gap-2.5 px-6 lg:px-8 py-3.5 lg:py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 text-sm lg:text-base w-full mt-auto overflow-hidden group/btn"
                  >
                    {/* Button Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                    <svg
                      className="w-5 h-5 lg:w-6 lg:h-6 relative z-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span className="relative z-10">{plan.ctaText}</span>
                  </a>
                </div>

                {/* Decorative Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}

