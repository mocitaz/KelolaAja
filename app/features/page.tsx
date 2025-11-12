'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollAnimation from '@/components/ScrollAnimation'
import Image from 'next/image'
import { createWhatsAppLink } from '@/lib/whatsapp'

export default function FeaturesPage() {
  const whatsappLink = createWhatsAppLink()

  const features = [
    {
      title: 'Keuangan & Akuntansi',
      description: 'Buat laporan keuangan seperti laba rugi, neraca, dan arus kas secara real-time. Pemantauan buku besar, serta utang dan piutang, menjadi lebih sederhana. Dapatkan laporan kinerja perusahaan yang selalu terkini dan menyeluruh.',
      image: '/images/finance/feature-finance.jpg',
      link: '/features/finance',
      shortDesc: 'Sistem keuangan lengkap untuk arus kas, pembukuan, dan laporan',
    },
    {
      title: 'Manufaktur',
      description: 'KelolaAja proses manufaktur dengan mudah, hitung Harga Pokok Penjualan produk secara otomatis. Rencanakan produksi, Bill of Material, serta hitung biaya bahan baku dan overhead produksi pabrik secara otomatis dengan modul manufaktur.',
      image: '/images/manufacturing/feature-manufacturing.jpg',
      link: '/features/manufacturing',
      shortDesc: 'Sistem manufaktur terintegrasi untuk produksi dan supply chain',
    },
    {
      title: 'Manajement Proyek',
      description: 'KelolaAja dirancang untuk semua jenis & skala bisnis. Sekalipun Anda tidak memahami secara mendalam, Anda akan dengan mudah beradaptasi dengan KelolaAja. Selain itu, tim kelolaAja akan selalu membantu sampai Anda bisa.',
      image: '/images/project/feature-project.jpg',
      link: '/features/project',
      shortDesc: 'Kelola proyek, track progress, dan monitor timeline',
    },
    {
      title: 'Pembelian & Penjualan',
      description: 'Proses jual-beli yang lebih fleksibel, bisa pilih jual putus atau konsinyasi. Dilengkapi fitur DP dan diskon bertingkat. Pantau pengiriman barang, buat tagihan, hingga dengan mudah dalam satu software.',
      image: '/images/sales/feature-sales.jpg',
      link: '/features/sales',
      shortDesc: 'Proses pembelian dan penjualan dari quotation hingga invoice',
    },
    {
      title: 'Produk & Inventory',
      description: 'KelolaAja produk dan inventory dengan efisien, mulai dari pengadaan hingga pengiriman. Pantau stok secara real-time, atur harga, dan optimalkan alur distribusi menggunakan satu platform.',
      image: '/images/inventory/feature-inventory.jpg',
      link: '/features/inventory',
      shortDesc: 'Manajemen inventory dengan tracking real-time',
    },
    {
      title: 'HR & Payroll',
      description: 'KelolaAja HR dan payroll dengan mudah, mulai dari pengelolaan data karyawan, absensi, hingga perhitungan gaji. Semua proses otomatis, akurat, dan dapat diakses kapan saja, memudahkan manajemen SDM di perusahaan Anda.',
      image: '/images/hr/feature-hr.jpg',
      link: '/features/hr',
      shortDesc: 'Kelola HR dan payroll dengan mudah dan otomatis',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 lg:pt-40 pb-12 lg:pb-16 bg-gradient-to-b from-primary-50 via-white to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimation direction="fade" delay={0} duration={600}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
                Fitur KelolaAja
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Solusi ERP lengkap untuk mengelola seluruh aspek bisnis Anda dalam satu platform terintegrasi
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <ScrollAnimation
                  key={index}
                  direction="up"
                  delay={index * 100}
                  duration={500}
                  className="flex"
                >
                  <a
                    href={feature.link}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary-300 group flex flex-col w-full h-full"
                  >
                    {/* Image - 16:9 aspect ratio */}
                    <div className="relative w-full aspect-video bg-gradient-to-br from-primary-50 to-secondary-50 flex-shrink-0">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex flex-col flex-1">
                      {/* Content */}
                      <div className="flex flex-col flex-1 text-left">
                        <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-3 text-sm lg:text-base flex-1">
                          {feature.shortDesc}
                        </p>
                        <div className="text-primary-600 hover:text-primary-700 font-medium text-sm lg:text-base inline-flex items-center gap-1.5 transition-colors duration-300 group/link w-fit flex-shrink-0 mt-auto">
                          Pelajari Selengkapnya
                          <svg 
                            className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>
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
                    Siap Mengoptimalkan Bisnis Anda?
                  </h2>
                  <p className="text-base lg:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                    Temukan solusi ERP yang tepat untuk kebutuhan bisnis Anda. Hubungi kami untuk konsultasi gratis.
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

      {/* About and FAQ Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-white to-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Left: About KelolaAja */}
            <div>
              <ScrollAnimation direction="right" delay={0} duration={600}>
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-2">
                    Apa Itu KelolaAja?
                  </h2>
                  <p className="text-base lg:text-lg text-gray-600 mb-4">
                    Software ERP Akuntansi Terdepan untuk Bisnis Indonesia
                  </p>
                  <div className="space-y-3 text-sm lg:text-base text-gray-700 leading-relaxed text-justify">
                    <p>
                      KelolaAja software ERP Akuntansi, didirikan pada 2024 untuk menjawab tantangan perusahaan dalam mengelola sistem manajemen secara efisien. Dengan solusi software bisnis KelolaAja hadir untuk memenuhi kebutuhan berbagai industri. Dirancang khusus untuk kemudahan penggunaannya dan disesuaikan dengan kebutuhan perusahaan Indonesia.
                    </p>
                    <p>
                      KelolaAja merupakan software ERP pertama yang menawarkan keunggulan pendampingan laporan keuangan sampai dengan laporan perpajakan.
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
            </div>
            
            {/* Right: FAQ Section */}
            <div>
              <ScrollAnimation direction="left" delay={200} duration={600}>
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
                    Pertanyaan Umum
                  </h2>
                  <p className="text-sm lg:text-base text-gray-600 mb-4">
                    Temukan jawaban atas pertanyaan umum tentang KelolaAja
                  </p>
                  <div className="space-y-3">
                    {[
                      {
                        question: 'Apakah ada pelatihan untuk menggunakan KelolaAja?',
                        answer: 'Ada, pelatihan baik secara online maupun langsung, termasuk tutorial, webinar, dan dukungan teknis, agar tim Anda dapat memanfaatkan software tersebut secara optimal.',
                      },
                      {
                        question: 'Apa yang dibutuhkan untuk menggunakan KelolaAja?',
                        answer: 'Tidak ada. Anda hanya memerlukan komputer beserta koneksi internet.',
                      },
                      {
                        question: 'Apa manfaat software ERP akuntansi untuk bisnis?',
                        answer: 'Akuntansi ERP KelolaAja mampu menghemat waktu pekerjaan perusahaan. Selain itu sistem akuntansi ini juga mampu menghindarkan perusahaan Anda dari kesalahan atau kekeliruan dalam perhitungan akuntansi, membuat laporan bisnis pun menjadi lebih aman, cepat dan mudah.',
                      },
                      {
                        question: 'Apakah Aman Menggunakan KelolaAja?',
                        answer: 'KelolaAja bertanggung jawab secara serius atas keamanan yang diperoleh pelanggan. Selain itu, keunggulan dari software, sistem, dan data menjadi prioritas utama kami. Keamanan juga menjadi kunci dari penawaran yang kami berikan. Untuk itu semua informasi yang Anda berikan telah ter-encrypt dan terjaga dengan teknologi dan keamanan yang terkemuka.',
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <details className="group">
                          <summary className="px-4 py-3 cursor-pointer list-none flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200">
                            <span className="font-semibold text-sm text-gray-900 pr-4">
                              {index + 1}. {item.question}
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
                              {item.answer}
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

      <Footer />
    </main>
  )
}

