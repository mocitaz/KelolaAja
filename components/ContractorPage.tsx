'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { createWhatsAppLink } from '@/lib/whatsapp'
import ScrollAnimation from '@/components/ScrollAnimation'
import Image from 'next/image'
import Partners from '@/components/Partners'

export default function ContractorPage() {
  const { t } = useLanguage()
  const whatsappLink = createWhatsAppLink()

  const introText = 'KelolaAja setiap proyek dengan lebih efisien dan optimalkan keuntungan bisnis Anda menggunakan software ERP KelolaAja. Dirancang khusus untuk memenuhi kebutuhan semua jenis usaha kontraktor di Indonesia, KelolaAja memudahkan pengelolaan keuangan dan operasional Proyek Anda.'

  const title = 'Apakah Masalah Ini Sering Menghambat Bisnis Kontraktor Anda?'
  const description = 'Seringkali, jumlah proyek yang Anda tangani tidak berbanding lurus dengan keuntungan yang diperoleh. Ini terutama terjadi jika sistem pencatatan akuntansi untuk kontraktor Anda tidak terstruktur dengan baik atau tidak sesuai dengan standar yang seharusnya.'

  const problems = [
    {
      title: 'Kesalahan penghitungan aset tetap dapat merusak akurasi.',
      description: 'Dalam bisnis konstruksi, terdapat banyak aset tetap yang harus di KelolaAja. Jika penyusutan dari setiap aset ini tidak dihitung dengan tepat, data keuangan Anda akan menjadi tidak akurat dan mengganggu perencanaan serta pengambilan keputusan bisnis.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-5m-6 5v-5m6 5h-6m6-10h-6m6 0v5m-6-5v5M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2zM9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      title: 'Biaya operasional dapat mengganggu kesehatan keuangan bisnis.',
      description: 'Biaya operasional dalam bisnis kontraktor merupakan pengeluaran penting yang perlu Anda pantau dengan cermat, karena dapat langsung mempengaruhi keuntungan perusahaan.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: 'Kesulitan menghitung laba per proyek menghambat analisis keuangan.',
      description: 'Apakah Anda yakin setiap proyek yang Anda KelolaAja menguntungkan? Tanpa data keuangan yang akurat, bisnis Anda berjalan hanya berdasarkan perkiraan.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side - Content */}
              <ScrollAnimation direction="right" delay={0} duration={600}>
                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
                    Kontraktor
                  </h1>
                  <p className="text-base lg:text-lg text-gray-700 leading-relaxed text-justify mb-6">
                    {introText}
                  </p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-105"
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
                    <span>Hubungi Kami</span>
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
                  </a>
                </div>
              </ScrollAnimation>

              {/* Right Side - Image */}
              <ScrollAnimation direction="left" delay={200} duration={600}>
                <div className="relative w-full aspect-square lg:aspect-[4/3] overflow-hidden group">
                  <Image
                    src="/images/industries/contractor/kontraktor.png"
                    alt="Kontraktor"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      if (target.parentElement) {
                        target.parentElement.className += ' bg-gradient-to-br from-primary-100 to-secondary-100'
                      }
                    }}
                  />
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-12 lg:py-20 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <ScrollAnimation direction="up" delay={0} duration={600}>
              <div className="text-center mb-12 lg:mb-16">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
                  {title}
                </h1>
                <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {description}
                </p>
              </div>
            </ScrollAnimation>

            {/* Problems Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
              {problems.map((problem, index) => (
                <ScrollAnimation key={index} direction="up" delay={index * 100} duration={600}>
                  <div className="bg-white rounded-xl border-2 border-gray-200 hover:border-primary-500 p-6 transition-all duration-300 hover:shadow-xl overflow-hidden flex flex-col h-full group relative">
                    {/* Gradient Accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Icon */}
                    <div className="mb-4 text-primary-600 flex-shrink-0">
                      {problem.icon}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow">
                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                        {problem.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {problem.description}
                      </p>
                    </div>

                    {/* Hover Effect Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-primary-50/0 group-hover:from-primary-50/30 group-hover:to-primary-50/30 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <ScrollAnimation direction="fade" delay={0} duration={500}>
              <div className="text-center mb-12 lg:mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                  Bagaimana KelolaAja Mendukung Bisnis Kontraktor Anda?
                </h2>
              </div>
            </ScrollAnimation>

            {/* Benefits Grid - 2 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
              {[
                {
                  title: 'KelolaAja aja multi proyek dengan satu Klik',
                  description: 'Bisnis kontraktor membutuhkan pengelolaan proyek yang efisien. Dengan KelolaAja, Anda dapat dengan mudah mengelola banyak proyek sekaligus, memantau anggaran, dan menjadikan manajemen proyek Anda lebih terstruktur dan terorganisir.',
                  image: '/images/industries/contractor/contractor-multi-project.jpg',
                },
                {
                  title: 'Perhitungan aset tetap otomatis dan akurat',
                  description: 'Berhenti menghitung nilai aset tetap secara manual. Dengan KelolaAja, penyusutan setiap aset dihitung otomatis dan jurnal penyesuaian tersedia setiap bulan tanpa perlu usaha tambahan.',
                  image: '/images/industries/contractor/contractor-fixed-asset.jpg',
                },
                {
                  title: 'Catat seluruh biaya operasional dengan mudah',
                  description: 'Dengan KelolaAja, Anda dapat dengan mudah mencatat dan mengelola biaya kapan saja dan di mana saja, memastikan efisiensi yang lebih baik, mengurangi pemborosan, dan meningkatkan profitabilitas proyek Anda.',
                  image: '/images/industries/contractor/contractor-operational-cost.jpg',
                },
                {
                  title: 'Real-time, di mana saja dan kapan saja',
                  description: 'Tidak ada lagi pemborosan yang terjadi dalam usaha kontraktor Anda, karena Anda bisa dengan mudah memantau setiap pos pengeluaran dan mendapatkan laporan dengan detail.',
                  image: '/images/industries/contractor/contractor-realtime.jpg',
                }
              ].map((benefit, index) => (
                <ScrollAnimation
                  key={index}
                  direction="up"
                  delay={index * 100}
                  duration={500}
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary-200 transition-all duration-300 group flex flex-col h-full">
                    {/* Image */}
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
        </div>
      </section>

      {/* Partners Section */}
      <Partners />

      {/* CTA Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation direction="up" delay={0} duration={600}>
              <div className="text-center">
                <div className="inline-block bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 lg:p-10 border-2 border-primary-200">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    Siap Mengatasi Masalah Bisnis Kontraktor Anda?
                  </h2>
                  <p className="text-base lg:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                    KelolaAja hadir dengan solusi lengkap untuk mengelola keuangan, inventory, dan operasional bisnis kontraktor Anda secara otomatis dan efisien.
                  </p>
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
                    <span>Konsultasi Gratis Sekarang</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* About KelolaAja & FAQ Section */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Left Side - About KelolaAja */}
              <ScrollAnimation direction="right" delay={0} duration={600}>
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
                    Apa Itu KelolaAja?
                  </h2>
                  <div className="space-y-3 text-sm lg:text-base text-gray-700 leading-relaxed text-justify">
                    <p>
                      KelolaAja software ERP Akuntansi, didirikan pada 2024 untuk menjawab tantangan perusahaan dalam mengelola sistem manajemen secara efisien. Dengan solusi software bisnis KelolaAja hadir untuk memenuhi kebutuhan berbagai industri.
                    </p>
                    <p>
                      Dirancang khusus untuk kemudahan penggunaannya dan disesuaikan dengan kebutuhan perusahaan Indonesia. KelolaAja merupakan software ERP pertama yang menawarkan keunggulan pendampingan laporan keuangan sampai dengan laporan perpajakan.
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-6">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
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
                      <span>Coba Gratis Sekarang</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </ScrollAnimation>

              {/* Right Side - FAQ */}
              <ScrollAnimation direction="left" delay={200} duration={600}>
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
                    Pertanyaan Umum
                  </h2>
                  <div className="space-y-3">
                    {[
                      {
                        question: 'Apakah ada pelatihan untuk menggunakan KelolaAja?',
                        answer: 'Ya, KelolaAja menyediakan pelatihan gratis untuk semua pengguna. Tim kami akan membantu Anda memahami cara menggunakan software dengan mudah dan efektif.',
                      },
                      {
                        question: 'Apa yang dibutuhkan untuk menggunakan KelolaAja?',
                        answer: 'Untuk menggunakan KelolaAja, Anda hanya membutuhkan koneksi internet dan perangkat (laptop, tablet, atau smartphone). Software ini berbasis cloud sehingga dapat diakses kapan saja dan di mana saja.',
                      },
                      {
                        question: 'Apa manfaat software ERP akuntansi untuk bisnis?',
                        answer: 'Software ERP akuntansi membantu bisnis mengelola keuangan, inventory, dan operasional secara terintegrasi. Dengan KelolaAja, Anda dapat meningkatkan efisiensi, mengurangi kesalahan manual, dan membuat keputusan bisnis yang lebih tepat dengan laporan real-time.',
                      },
                      {
                        question: 'Apakah Aman Menggunakan KelolaAja?',
                        answer: 'Ya, KelolaAja menggunakan teknologi keamanan terdepan untuk melindungi data bisnis Anda. Semua data dienkripsi dan disimpan dengan aman. Kami juga memiliki backup rutin untuk memastikan data Anda selalu terlindungi.',
                      }
                    ].map((faq, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <details className="group">
                          <summary className="px-4 py-3 cursor-pointer list-none flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200">
                            <span className="font-semibold text-sm text-gray-900 pr-4">
                              {faq.question}
                            </span>
                            <svg
                              className="w-4 h-4 text-gray-500 flex-shrink-0 transform transition-transform duration-200 group-open:rotate-180"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </summary>
                          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                            <p className="text-xs text-gray-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </details>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

