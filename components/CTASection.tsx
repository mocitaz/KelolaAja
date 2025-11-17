'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { createWhatsAppLink } from '@/lib/whatsapp'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function CTASection() {
  const { t } = useLanguage()
  const whatsappLink = createWhatsAppLink()

  const content = {
    paragraph1: t.ctaSection?.paragraph1 || 'Lupakan pencatatan manual yang rumit. Dengan KelolaAja, laporan keuangan real-time, mulai dari transaksi hingga inventori, semuanya terpusat dalam satu platform yang praktis.',
    paragraph2: t.ctaSection?.paragraph2 || 'Pantau arus kas, kirim invoice, dan KelolaAja pembelian dengan mudah, sehingga saat ini Anda bisa lebih fokus mengembangkan bisnis daripada mengurusi administrasi.',
    ctaText: t.ctaSection?.ctaText || 'Coba Gratis Sekarang',
  }

  const features = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: 'Laporan Real-Time'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: 'Pantau Arus Kas'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      text: 'Invoice Otomatis'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      text: 'Platform Terpusat'
    }
  ]

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <ScrollAnimation direction="up" delay={0} duration={600}>
            <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-xl overflow-hidden">
              {/* Content */}
              <div className="p-8 lg:p-12">
                <div className="space-y-6 mb-8">
                  <p className="text-lg lg:text-xl font-bold text-gray-900 leading-relaxed text-center">
                    {content.paragraph1}
                  </p>
                  <p className="text-base lg:text-lg text-gray-700 leading-relaxed text-center">
                    {content.paragraph2}
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50/50 transition-all duration-200"
                    >
                      <div className="text-primary-600">
                        {feature.icon}
                      </div>
                      <p className="text-xs lg:text-sm font-medium text-gray-700 text-center">
                        {feature.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="flex justify-center">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-8 py-4 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
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
                    <span>{content.ctaText}</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className="h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500"></div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}

