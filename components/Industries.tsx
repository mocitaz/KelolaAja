'use client'

import Image from 'next/image'

interface Industry {
  name: string
  description: string
  icon?: string
  id?: string
}

interface IndustriesProps {
  industries?: Industry[]
}

const defaultIndustries: Industry[] = [
  {
    name: 'Food & Beverage',
    description: 'Solusi lengkap untuk mengelola restoran, kafe, dan bisnis kuliner Anda. Kelola menu, pesanan, inventory, dan laporan keuangan dengan mudah.',
    icon: '🍽️',
    id: 'industry-fnb',
  },
  {
    name: 'Kontraktor',
    description: 'Sistem manajemen proyek konstruksi yang terintegrasi. Kelola proyek, material, tenaga kerja, dan progress dengan efisien.',
    icon: '🏗️',
    id: 'industry-contractor',
  },
  {
    name: 'Manufaktur',
    description: 'Sistem manufaktur terintegrasi untuk mengelola produksi, quality control, supply chain, dan inventory management.',
    icon: '🏭',
    id: 'industry-manufacturing',
  },
  {
    name: 'Retail',
    description: 'Solusi lengkap untuk mengelola toko retail dan e-commerce. Kelola produk, penjualan, inventory, dan customer dengan mudah.',
    icon: '🛍️',
    id: 'industry-retail',
  },
]

export default function Industries({ industries = defaultIndustries }: IndustriesProps) {
  return (
    <section id="industries" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
            Industri yang Kami Layani
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Solusi terbaik untuk berbagai industri dan kebutuhan bisnis Anda
          </p>
        </div>

        {/* Image Section - 16:9 Aspect Ratio */}
        <div className="mb-16 max-w-6xl mx-auto">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/industries.jpg"
              alt="Industri yang Kami Layani"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry, index) => (
                <div
                  key={industry.id || index}
                  id={industry.id}
                  className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-xl hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2 border border-primary-100 hover:border-primary-300 scroll-mt-20"
                >
              <div className="text-5xl mb-4">{industry.icon || '🏢'}</div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                {industry.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

