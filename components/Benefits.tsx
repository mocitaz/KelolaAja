'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import ScrollAnimation from '@/components/ScrollAnimation'
import AnimatedCounter from '@/components/AnimatedCounter'

export default function Benefits() {
  const { t } = useLanguage()

  const stats = [
    { label: t.benefits?.stats?.reduceErrors || 'Kurangi kesalahan hingga 90%', value: '90%' },
    { label: t.benefits?.stats?.cutManualProcess || 'Pangkas Proses Manual 80%', value: '80%' },
    { label: t.benefits?.stats?.accessReports || 'Akses Laporan Real-time 100%', value: '100%' },
    { label: t.benefits?.stats?.customerSupport || 'Kepuasan Customer Support 100%', value: '100%' },
  ]

  const features = [
    {
      title: t.benefits?.features?.realtimeReports?.title || 'Laporan Real-Time',
      description: t.benefits?.features?.realtimeReports?.description || 'Semua laporan, penjualan, biaya, stok, hingga HR dalam satu software. Analisis lengkap tersedia kapan saja, membuat pengambilan keputusan bisnis lebih cepat.',
      icon: (
        <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: t.benefits?.features?.businessControl?.title || 'Kontrol Bisnis Jadi Mudah',
      description: t.benefits?.features?.businessControl?.description || 'KelolaAja seluruh proses bisnis dalam satu dashboard. Berikan persetujuan, otorisasi, hingga audit untuk berbagai departemen, sesuai dengan kebutuhan.',
      icon: (
        <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: t.benefits?.features?.autoRecording?.title || 'Pencatatan Jadi Otomatis',
      description: t.benefits?.features?.autoRecording?.description || 'Kurangi waktu pembukuan hingga 95% jadi lebih mudah. Laporan otomatis dan tepat waktu, memungkinkan Anda fokus pada analisis.',
      icon: (
        <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: t.benefits?.features?.easyImplementation?.title || 'Implementasi Mudah',
      description: t.benefits?.features?.easyImplementation?.description || 'Mencapai tingkat keberhasilan lebih dari 95% dalam implementasi. Dapatkan perencanaan, pelaksanaan, dan layanan terbaik untuk bisnis Anda.',
      icon: (
        <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-10 lg:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <ScrollAnimation direction="fade" delay={0} duration={500}>
          <div className="text-center mb-8 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              {t.benefits?.title || 'KelolaAja Bisnis Jadi Lebih Mudah'}
            </h2>
          </div>
        </ScrollAnimation>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-10 lg:mb-12">
            {stats.map((stat, index) => (
              <ScrollAnimation
                key={index}
                direction="up"
                delay={index * 100}
                duration={500}
              >
                <div className="bg-white rounded-lg p-3 lg:p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all duration-300 group h-full flex flex-col">
                  <div className="flex items-start gap-2 flex-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="text-xl lg:text-2xl font-bold text-primary-600 mb-0.5 group-hover:scale-110 transition-transform duration-300">
                        <AnimatedCounter value={stat.value} duration={2000} />
                      </div>
                      <p className="text-xs lg:text-sm text-gray-600 leading-tight flex-1">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <ScrollAnimation
              key={index}
              direction="up"
              delay={index * 150}
              duration={600}
            >
              <div className="group bg-white rounded-xl p-4 lg:p-6 shadow-md border border-gray-100 hover:shadow-lg hover:border-primary-300 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-3 lg:gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                      {feature.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}

