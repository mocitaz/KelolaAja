'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { createWhatsAppLink } from '@/lib/whatsapp'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function AboutKelolaAja() {
  const { t } = useLanguage()
  const whatsappLink = createWhatsAppLink()

  return (
    <div className="h-full">
      {/* Main Card */}
      <ScrollAnimation direction="up" delay={0} duration={600}>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-full flex flex-col">
          {/* Header with Gradient Background */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-500 px-5 lg:px-8 py-5 lg:py-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white mb-1">
              {t.aboutKelolaAja?.title || 'Apa Itu KelolaAja?'}
            </h2>
            <p className="text-primary-50 text-xs lg:text-sm">
              {t.aboutKelolaAja?.subtitle || 'Software ERP Akuntansi Terdepan untuk Bisnis Indonesia'}
            </p>
          </div>

          {/* Content Section */}
          <div className="px-5 lg:px-8 py-5 lg:py-6 flex-1">
            {/* Main Description */}
            <div className="mb-5">
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base mb-4">
                {t.aboutKelolaAja?.description || 'KelolaAja software ERP Akuntansi, didirikan pada 2024 untuk menjawab tantangan perusahaan dalam mengelola sistem manajemen secara efisien. Dengan solusi software bisnis KelolaAja hadir untuk memenuhi kebutuhan berbagai industri. Dirancang khusus untuk kemudahan penggunaannya dan disesuaikan dengan kebutuhan perusahaan Indonesia.'}
              </p>

              {/* Highlight Box */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border-l-4 border-primary-500 rounded-r-lg p-4">
                <div className="flex items-start gap-2.5">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-800 leading-relaxed text-sm lg:text-base font-semibold">
                    {t.aboutKelolaAja?.highlight || 'KelolaAja merupakan software ERP pertama yang menawarkan keunggulan pendampingan laporan keuangan sampai dengan laporan perpajakan.'}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="border-t border-gray-200 pt-5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-center sm:text-left">
                  <p className="text-gray-600 text-xs lg:text-sm mb-0.5">
                    {t.aboutKelolaAja?.question || 'Ada pertanyaan?'}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {t.aboutKelolaAja?.contactVia || 'Kontak kami via WhatsApp'}
                  </p>
                </div>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 lg:px-6 py-2.5 lg:py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-105 text-sm lg:text-base whitespace-nowrap"
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  {t.aboutKelolaAja?.ctaText || 'Coba Gratis Sekarang'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  )
}


