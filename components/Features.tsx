'use client'

import Image from 'next/image'

interface Feature {
  title: string
  description: string
  icon?: string
  id?: string
}

interface FeaturesProps {
  features: Feature[]
}

// Feature categories for dropdown
const featureCategories = [
  {
    id: 'features-finance',
    title: 'Keuangan dan Akuntansi',
    description: 'Sistem keuangan lengkap untuk mengelola arus kas, pembukuan, laporan keuangan, dan analisis finansial bisnis Anda.',
    icon: '💰',
  },
  {
    id: 'features-project',
    title: 'Manajement Proyek',
    description: 'Kelola proyek dengan efisien, track progress, assign tugas, dan monitor timeline dengan tools yang powerful.',
    icon: '📊',
  },
  {
    id: 'features-manufacturing',
    title: 'Fitur Manufaktur',
    description: 'Sistem manufaktur terintegrasi untuk mengelola produksi, quality control, dan supply chain management.',
    icon: '🏭',
  },
  {
    id: 'features-sales',
    title: 'Pembelian dan Penjualan',
    description: 'Kelola proses pembelian dan penjualan dari mulai quotation, purchase order, hingga invoice dengan mudah.',
    icon: '🛒',
  },
  {
    id: 'features-inventory',
    title: 'Produk dan Inventory',
    description: 'Manajemen inventory yang cerdas dengan tracking real-time, stock alert, dan optimasi stok otomatis.',
    icon: '📦',
  },
]

export default function Features({ features }: FeaturesProps) {
  // Combine default features with category features
  const allFeatures = [...featureCategories, ...features]

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
            Fitur Unggulan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan berbagai fitur yang akan membantu bisnis Anda berkembang
          </p>
        </div>

        {/* Image Section - 16:9 Aspect Ratio */}
        <div className="mb-16 max-w-6xl mx-auto">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/features.jpg"
              alt="Fitur Unggulan KelolaAja"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1200px"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                if (target.parentElement) {
                  target.parentElement.className += ' bg-gradient-to-br from-primary-100 to-secondary-100'
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allFeatures.map((feature, index) => (
            <div
              key={feature.id || index}
              id={feature.id}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2 scroll-mt-20 border border-gray-100 hover:border-primary-200"
            >
              <div className="text-5xl mb-4">{feature.icon || '✨'}</div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

