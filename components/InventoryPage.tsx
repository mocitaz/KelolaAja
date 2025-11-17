'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { createWhatsAppLink } from '@/lib/whatsapp'
import ScrollAnimation from '@/components/ScrollAnimation'
import Image from 'next/image'
import FeaturesCarousel from '@/components/FeaturesCarousel'

export default function InventoryPage() {
  const { t } = useLanguage()
  const whatsappLink = createWhatsAppLink()

  const introText = 'Manajemen inventory dengan tracking real-time. KelolaAja produk dan inventory dengan efisien, mulai dari pengadaan hingga pengiriman dengan optimasi alur distribusi.'

  const title = 'Produk dan Inventory'
  const description = 'Dapatkan kontrol penuh atas manajemen inventory Anda dengan sistem yang lengkap dan terintegrasi. Dari tracking stok hingga laporan inventory real-time, semua tersedia dalam satu platform.'

  const features = [
    {
      title: 'Lacak Produk Paling Laris',
      description: 'Dapatkan pembaruan laporan produk terlaris, total profit yang dihasilkan, dan stok produk yang habis secara real-time. Manfaatkan data ini untuk membuat keputusan yang lebih tepat dalam melakukan reorder dan menetapkan harga produk Anda.',
      image: '/images/inventory/inventory-produk-laris.png',
    },
    {
      title: 'Import dari Excel',
      description: 'Tidak perlu lagi repot memasukkan data produk dan stok secara manual, cukup ketik di Excel dan unggah. Semua informasi akan otomatis terintegrasi ke dalam sistem KelolaAja.',
      image: '/images/inventory/inventory-import-excel.png',
    },
    {
      title: 'Multi Gudang',
      description: 'KelolaAja stok produkmu dibanyak tempat dengan mudah dan pantau stok pergudang secara realtime.',
      image: '/images/inventory/inventory-multi-gudang.png',
    },
    {
      title: 'Laporan Realtime',
      description: 'Akses laporan stok di setiap gudang secara detail dan real-time, tanpa perlu menunggu akhir bulan. Pantau pergerakan stok secara langsung dan pastikan barang selalu terpantau dengan baik.',
      image: '/images/inventory/inventory-laporan-realtime.png',
    },
    {
      title: 'Stok Opname',
      description: 'Proses stok opname jadi lebih praktis! Unduh laporan stok terbaru dalam format Excel, perbarui jumlah stok, dan langsung unggah ke KelolaAja. Cepat dan mudah!',
      image: '/images/inventory/inventory-stok-opname.png',
    },
    {
      title: 'Transfer Gudang',
      description: 'Pindahkan barang antar gudang dengan simpel. Nikmati pencatatan stok yang rapi dan teratur tanpa kerepotan.',
      image: '/images/inventory/inventory-transfer-gudang.png',
    },
    {
      title: 'Pantau Kapan Saja dan Di Mana Saja',
      description: 'Pantau stok kapan saja, tanpa harus ke kantor atau gudang. Cukup buka laporan dari ponsel atau laptop, di mana pun Anda berada.',
      image: '/images/inventory/inventory-pantau-kapan-saja.png',
    }
  ]

  const otherFeatures = [
    {
      title: 'Keuangan & Akuntansi',
      description: 'Buat laporan keuangan seperti laba rugi, neraca, dan arus kas secara real-time. Pemantauan buku besar, serta utang dan piutang, menjadi lebih sederhana. Dapatkan laporan kinerja perusahaan yang selalu terkini dan menyeluruh.',
      image: '/images/finance/feature-finance.jpg',
      link: '/features/finance',
    },
    {
      title: 'Manufaktur',
      description: 'KelolaAja proses manufaktur dengan mudah, hitung Harga Pokok Penjualan produk secara otomatis. Rencanakan produksi, Bill of Material, serta hitung biaya bahan baku dan overhead produksi pabrik secara otomatis dengan modul manufaktur.',
      image: '/images/manufacturing/feature-manufacturing.jpg',
      link: '/features/manufacturing',
    },
    {
      title: 'Manajement Proyek',
      description: 'KelolaAja dirancang untuk semua jenis & skala bisnis. Sekalipun Anda tidak memahami secara mendalam, Anda akan dengan mudah beradaptasi dengan KelolaAja. Selain itu, tim kelolaAja akan selalu membantu sampai Anda bisa.',
      image: '/images/project/feature-project.jpg',
      link: '/features/project',
    },
    {
      title: 'Pembelian & Penjualan',
      description: 'Proses jual-beli yang lebih fleksibel, bisa pilih jual putus atau konsinyasi. Dilengkapi fitur DP dan diskon bertingkat. Pantau pengiriman barang, buat tagihan, hingga dengan mudah dalam satu software.',
      image: '/images/sales/feature-sales.jpg',
      link: '/features/sales',
    },
    {
      title: 'Produk & Inventory',
      description: 'KelolaAja produk dan inventory dengan efisien, mulai dari pengadaan hingga pengiriman. Pantau stok secara real-time, atur harga, dan optimalkan alur distribusi menggunakan satu platform.',
      image: '/images/inventory/feature-inventory.jpg',
      link: '/features/inventory',
    },
    {
      title: 'HR & Payroll',
      description: 'KelolaAja HR dan payroll dengan mudah, mulai dari pengelolaan data karyawan, absensi, hingga perhitungan gaji. Semua proses otomatis, akurat, dan dapat diakses kapan saja, memudahkan manajemen SDM di perusahaan Anda.',
      image: '/images/hr/feature-hr.jpg',
      link: '/features/hr',
    },
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
                    Produk dan Inventory
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
                    src="/images/inventory/inventory.png"
                    alt="Produk dan Inventory"
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

      {/* Software dengan Fitur Section */}
      <section className="py-12 lg:py-20 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side - Image */}
              <ScrollAnimation direction="right" delay={0} duration={600}>
                <div className="relative w-full aspect-[16/10] lg:aspect-[16/9] overflow-hidden group rounded-xl shadow-lg bg-white">
                  <Image
                    src="/images/inventory/inventory2.png"
                    alt="Produk dan Inventory Mudah Digunakan"
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
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

              {/* Right Side - Content */}
              <ScrollAnimation direction="left" delay={200} duration={600}>
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                    Software dengan Fitur
                  </h2>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-primary-600 mb-6">
                    Produk dan Inventory Mudah Digunakan
                  </h3>
                  <p className="text-base lg:text-lg text-gray-700 leading-relaxed text-justify">
                    KelolaAja dirancang khusus untuk kemudahan penggunaan, bahkan bagi mereka yang tidak memiliki latar belakang inventory. Interface yang intuitif dan user-friendly memastikan Anda dapat mengelola produk dan inventory dengan mudah dan efisien.
                  </p>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 lg:py-20 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <ScrollAnimation direction="up" delay={0} duration={600}>
              <div className="text-center mb-12 lg:mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
                  {title}
                </h2>
                <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {description}
                </p>
              </div>
            </ScrollAnimation>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              {features.map((feature, index) => (
                <ScrollAnimation key={index} direction="up" delay={index * 100} duration={600}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary-200 transition-all duration-300 group flex flex-col h-full">
                    {/* Image */}
                    <div className="relative w-full aspect-video bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
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
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Title */}
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <ScrollAnimation direction="up" delay={0} duration={600}>
              <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-xl overflow-hidden">
                {/* Content */}
                <div className="p-8 lg:p-12">
                  <div className="space-y-6 mb-8">
                    <p className="text-lg lg:text-xl font-bold text-gray-900 leading-relaxed text-center">
                      Lupakan pencatatan manual yang rumit. Dengan KelolaAja, laporan keuangan real-time, mulai dari transaksi hingga inventori, semuanya terpusat dalam satu platform yang praktis.
                    </p>
                    <p className="text-base lg:text-lg text-gray-700 leading-relaxed text-center">
                      Pantau arus kas, kirim invoice, dan KelolaAja pembelian dengan mudah, sehingga saat ini Anda bisa lebih fokus mengembangkan bisnis daripada mengurusi administrasi.
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
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
                    ].map((feature, index) => (
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
                      <span>Coba Gratis Sekarang</span>
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

      {/* Other Features Carousel */}
      <FeaturesCarousel 
        features={otherFeatures}
        title="Keuntungan Menggunakan Sistem Inventory KelolaAja"
      />

      {/* CTA Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation direction="up" delay={0} duration={600}>
              <div className="text-center">
                <div className="inline-block bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 lg:p-10 border-2 border-primary-200">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    Siap Mengoptimalkan Manajemen Inventory Anda?
                  </h2>
                  <p className="text-base lg:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                    KelolaAja menyediakan sistem inventory dengan tracking real-time untuk mengelola produk dari pengadaan hingga pengiriman.
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
    </main>
  )
}
