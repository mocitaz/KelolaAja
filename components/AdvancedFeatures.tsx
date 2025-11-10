'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function AdvancedFeatures() {
  const { t } = useLanguage()
  
  const featuresData = t.advancedFeatures?.features || [
    {
      title: 'Keuangan & Akuntansi',
      description: 'Buat laporan keuangan seperti laba rugi, neraca, dan arus kas secara real-time. Pemantauan buku besar, serta utang dan piutang, menjadi lebih sederhana. Dapatkan laporan kinerja perusahaan yang selalu terkini dan menyeluruh.',
    },
    {
      title: 'Manufaktur',
      description: 'KelolaAja proses manufaktur dengan mudah, hitung Harga Pokok Penjualan produk secara otomatis. Rencanakan produksi, Bill of Material, serta hitung biaya bahan baku dan overhead produksi pabrik secara otomatis dengan modul manufaktur.',
    },
    {
      title: 'Manajement Proyek',
      description: 'KelolaAja dirancang untuk semua jenis & skala bisnis. Sekalipun Anda tidak memahami secara mendalam, Anda akan dengan mudah beradaptasi dengan KelolaAja. Selain itu, tim kelolaAja akan selalu membantu sampai Anda bisa.',
    },
    {
      title: 'Pembelian & Penjualan',
      description: 'Proses jual-beli yang lebih fleksibel, bisa pilih jual putus atau konsinyasi. Dilengkapi fitur DP dan diskon bertingkat. Pantau pengiriman barang, buat tagihan, hingga dengan mudah dalam satu software.',
    },
    {
      title: 'Produk & Inventory',
      description: 'KelolaAja produk dan inventory dengan efisien, mulai dari pengadaan hingga pengiriman. Pantau stok secara real-time, atur harga, dan optimalkan alur distribusi menggunakan satu platform.',
    },
    {
      title: 'HR & Payroll',
      description: 'KelolaAja HR dan payroll dengan mudah, mulai dari pengelolaan data karyawan, absensi, hingga perhitungan gaji. Semua proses otomatis, akurat, dan dapat diakses kapan saja, memudahkan manajemen SDM di perusahaan Anda.',
    },
  ]
  
  const images = [
    '/images/feature-finance.jpg',
    '/images/feature-manufacturing.jpg',
    '/images/feature-project.jpg',
    '/images/feature-sales.jpg',
    '/images/feature-inventory.jpg',
    '/images/feature-hr.jpg',
  ]
  
  const links = [
    '/features/finance',
    '/features/manufacturing',
    '/features/project',
    '/features/sales',
    '/features/inventory',
    '/features/hr',
  ]
  
  const icons = [
    <svg key="finance" className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    <svg key="manufacturing" className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>,
    <svg key="project" className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>,
    <svg key="sales" className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>,
    <svg key="inventory" className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>,
    <svg key="hr" className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>,
  ]
  
  const features = featuresData.map((feature, index) => ({
    ...feature,
    image: images[index],
    icon: icons[index],
    link: links[index],
  }))

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features Grid - 2x3 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <ScrollAnimation
              key={index}
              direction="up"
              delay={index * 100}
              duration={500}
              className="flex"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-300 group flex flex-col w-full" style={{ minHeight: '540px' }}>
                {/* Image - Rounded corners match container, no gap */}
                <div className="relative w-full aspect-video bg-gradient-to-br from-primary-50 to-secondary-50 flex-shrink-0">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 400px"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                </div>

                {/* Content Section with padding */}
                <div className="p-5 lg:p-6 flex flex-col flex-1">

                  {/* Icon - Smaller, above title with animation */}
                  <div className="mb-3 flex justify-center flex-shrink-0">
                    <div className="text-primary-600 group-hover:text-primary-700 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      {feature.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 text-left">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2.5 group-hover:text-primary-600 transition-colors duration-300 flex-shrink-0 min-h-[56px] flex items-center">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 text-sm lg:text-base flex-1 min-h-[96px]" style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {feature.description}
                    </p>
                    <a
                      href={feature.link}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm lg:text-base inline-flex items-center gap-2 transition-colors duration-300 group/link w-fit flex-shrink-0 mt-auto"
                    >
                      {t.advancedFeatures?.learnMore || 'Pelajari Selengkapnya'}
                      <svg 
                        className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
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

