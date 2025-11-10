'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { createWhatsAppLink } from '@/lib/whatsapp'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function AboutKelolaAja() {
  const { t } = useLanguage()
  const whatsappLink = createWhatsAppLink()

  return (
    <div className="h-full">
      <ScrollAnimation direction="right" delay={0} duration={600}>
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-2">
            {t.aboutKelolaAja?.title || 'Apa Itu KelolaAja?'}
          </h2>
          <p className="text-base lg:text-lg text-gray-600 mb-4">
            {t.aboutKelolaAja?.subtitle || 'Software ERP Akuntansi Terdepan untuk Bisnis Indonesia'}
          </p>
          <div className="space-y-3 text-sm lg:text-base text-gray-700 leading-relaxed text-justify">
            <p>
              {t.aboutKelolaAja?.description || 'KelolaAja software ERP Akuntansi, didirikan pada 2024 untuk menjawab tantangan perusahaan dalam mengelola sistem manajemen secara efisien. Dengan solusi software bisnis KelolaAja hadir untuk memenuhi kebutuhan berbagai industri.'}
            </p>
            <p>
              {t.aboutKelolaAja?.highlight || 'Dirancang khusus untuk kemudahan penggunaannya dan disesuaikan dengan kebutuhan perusahaan Indonesia. KelolaAja merupakan software ERP pertama yang menawarkan keunggulan pendampingan laporan keuangan sampai dengan laporan perpajakan.'}
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-6">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
            >
              <span>{t.aboutKelolaAja?.ctaText || 'Coba Gratis Sekarang'}</span>
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


