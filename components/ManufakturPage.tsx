'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { createWhatsAppLink } from '@/lib/whatsapp'
import ScrollAnimation from '@/components/ScrollAnimation'
import Image from 'next/image'

export default function ManufakturPage() {
  const { t } = useLanguage()
  const whatsappLink = createWhatsAppLink()

  const introText = 'Setiap tahapan mulai dari perencanaan hingga penyelesaian produksi dapat dilakukan secara lebih efisien. Proses pengambilan keputusan menjadi lebih cepat, memungkinkan Anda untuk merespons tantangan dengan lebih sigap, sekaligus meningkatkan produktivitas dan kualitas di setiap langkah produksi bisnis Anda.'

  const title = 'Ingin tahu bagaimana software KelolaAja bisa menyederhanakan seluruh proses bisnis manufaktur Anda?'
  const description = 'Seringkali, volume produksi yang Anda jalankan tidak sebanding dengan margin keuntungan yang dihasilkan. Hal ini bisa terjadi jika sistem pengelolaan biaya dan pencatatan akuntansi di pabrik Anda kurang terstruktur atau tidak mengikuti standar yang tepat, mengakibatkan pemborosan dan inefisiensi dalam proses produksi.'

  const problems = [
    {
      title: 'Proses konversi bahan baku menjadi produk akhir.',
      description: 'Proses produksi membutuhkan sistem pencatatan yang akurat untuk mengubah bahan baku menjadi produk jadi. Tanpa pencatatan dan perhitungan yang tepat, Anda akan kesulitan menghitung Harga Pokok Produksi (HPP) secara efektif.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      title: 'Perhitungan penyusutan aset.',
      description: 'Bisnis manufaktur umumnya memiliki berbagai aset yang perlu dihitung penyusutannya dengan teliti, karena hal ini berdampak langsung pada akurasi laporan keuangan perusahaan.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2zM9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: 'Pengelolaan biaya overhead yang kompleks.',
      description: 'Biaya overhead pabrik dalam industri manufaktur memiliki dampak signifikan terhadap keputusan bisnis yang diambil pemilik perusahaan. Oleh karena itu, pencatatan biaya ini sangat krusial untuk memastikan keakuratan analisis dan pengambilan keputusan yang tepat.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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
                    Manufaktur
                  </h1>
                  <p className="text-base lg:text-lg text-gray-700 leading-relaxed text-justify mb-6">
                    {introText}
                  </p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-105"
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
                    src="/images/manu.png"
                    alt="Manufaktur"
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
                  Bagaimana KelolaAja Mendukung Bisnis Manufaktur Anda?
                </h2>
              </div>
            </ScrollAnimation>

            {/* Benefits Grid - 3 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {[
                {
                  title: 'KelolaAja aja multi proyek dengan satu Klik',
                  description: 'Bisnis kontraktor membutuhkan pengelolaan proyek yang efisien. Dengan KelolaAja, Anda dapat dengan mudah mengelola banyak proyek sekaligus, memantau anggaran, dan menjadikan manajemen proyek Anda lebih terstruktur dan terorganisir.',
                  image: '/images/manufacturing-multi-project.jpg',
                },
                {
                  title: 'Perhitungan aset tetap otomatis dan akurat',
                  description: 'Berhenti menghitung nilai aset tetap secara manual. Dengan KelolaAja, penyusutan setiap aset dihitung otomatis dan jurnal penyesuaian tersedia setiap bulan tanpa perlu usaha tambahan.',
                  image: '/images/manufacturing-fixed-asset.jpg',
                },
                {
                  title: 'Catat seluruh biaya operasional dengan mudah',
                  description: 'Dengan KelolaAja, Anda dapat dengan mudah mencatat dan mengelola biaya kapan saja dan di mana saja, memastikan efisiensi yang lebih baik, mengurangi pemborosan, dan meningkatkan profitabilitas proyek Anda.',
                  image: '/images/manufacturing-operational-cost.jpg',
                },
                {
                  title: 'Real-time, di mana saja dan kapan saja',
                  description: 'Tidak ada lagi pemborosan yang terjadi dalam usaha restoran Anda, karena Anda bisa dengan mudah memantau setiap pos pengeluaran dan mendapatkan laporan dengan detail.',
                  image: '/images/manufacturing-realtime.jpg',
                },
                {
                  title: 'KelolaAja Purchasing Anti Ribet',
                  description: 'Dari pencatatan detail pembelian hingga pembuatan faktur otomatis, ditambah dengan akses mudah ke informasi dan statistik pembelian, KelolaAja menyederhanakan seluruh proses purchasing Anda dengan lebih efisien.',
                  image: '/images/manufacturing-purchasing.jpg',
                },
                {
                  title: 'Laporan diakses hitungan detik',
                  description: 'Pantau dan buat laporan keuangan dengan mudah, hanya dalam satu klik, untuk mengambil keputusan bisnis lebih cepat. Dapatkan juga grafik operasional bisnis yang jelas dan mudah dipahami, membantu Anda menganalisis kinerja secara efektif.',
                  image: '/images/manufacturing-reports.jpg',
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
      <section className="py-8 lg:py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Title */}
            <ScrollAnimation direction="fade" delay={0} duration={500}>
              <div className="text-center mb-8 lg:mb-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
                  Mitra kami
                </h2>
              </div>
            </ScrollAnimation>

            {/* Partners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center justify-items-center">
              {[
                {
                  name: 'Sri',
                  image: '/images/sri.png',
                },
                {
                  name: 'Sriendo Foods',
                  image: '/images/sriendofoods.png',
                },
                {
                  name: 'Aura Food',
                  image: '/images/aurafood.png',
                }
              ].map((partner, index) => (
                <ScrollAnimation
                  key={index}
                  direction="up"
                  delay={index * 100}
                  duration={500}
                >
                  <div className="flex items-center justify-center group">
                    <Image
                      src={partner.image}
                      alt={partner.name}
                      width={150}
                      height={96}
                      className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 max-w-[150px] w-full h-auto"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation direction="up" delay={0} duration={600}>
              <div className="text-center">
                <div className="inline-block bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 lg:p-10 border-2 border-primary-200">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    Siap Mengatasi Masalah Bisnis Manufaktur Anda?
                  </h2>
                  <p className="text-base lg:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                    KelolaAja hadir dengan solusi lengkap untuk mengelola keuangan, inventory, dan operasional bisnis manufaktur Anda secara otomatis dan efisien.
                  </p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
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
                      className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
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

