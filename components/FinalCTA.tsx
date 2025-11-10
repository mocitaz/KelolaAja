'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { createWhatsAppLink } from '@/lib/whatsapp'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function FinalCTA() {
  const { t } = useLanguage()
  const whatsappLink = createWhatsAppLink()

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary-500 rounded-full blur-3xl"></div>
      </div>

      {/* Separator Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary-300 to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Card Container */}
          <ScrollAnimation direction="up" delay={0} duration={600}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Content */}
              <div className="px-6 lg:px-10 py-8 lg:py-10 text-center">
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-6 lg:mb-8">
                  {t.finalCTA?.title || 'KelolaAja Keuangan Bisnismu Agar Mudah!!!'}
                </h2>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* Coba Gratis Sekarang Button */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 lg:px-8 py-3 lg:py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-105 text-sm lg:text-base w-full sm:w-auto justify-center"
                >
                  <svg
                    className="w-4 h-4 lg:w-5 lg:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  {t.finalCTA?.tryFree || 'Coba Gratis Sekarang'}
                </a>

                {/* Divider */}
                <div className="hidden sm:block w-px h-8 bg-gray-300"></div>

                {/* Jadwalkan Demo Button */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 lg:px-8 py-3 lg:py-3.5 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-105 text-sm lg:text-base w-full sm:w-auto justify-center"
                >
                  <svg
                    className="w-4 h-4 lg:w-5 lg:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {t.finalCTA?.scheduleDemo || 'Jadwalkan Demo'}
                </a>
              </div>
            </div>
          </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}


