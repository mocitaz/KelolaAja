'use client'

import Image from 'next/image'

interface PricingPlan {
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  ctaText: string
  popular?: boolean
}

interface PricingProps {
  plans?: PricingPlan[]
}

const defaultPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: 'Rp 299.000',
    period: '/bulan',
    description: 'Untuk bisnis kecil yang baru memulai',
    features: [
      'Hingga 5 pengguna',
      '10 GB penyimpanan',
      'Dukungan email',
      'Fitur dasar',
      'Update berkala',
    ],
    ctaText: 'Mulai Gratis',
  },
  {
    name: 'Professional',
    price: 'Rp 799.000',
    period: '/bulan',
    description: 'Untuk bisnis yang sedang berkembang',
    features: [
      'Hingga 25 pengguna',
      '100 GB penyimpanan',
      'Dukungan prioritas',
      'Semua fitur',
      'Update real-time',
      'Integrasi API',
    ],
    ctaText: 'Mulai Sekarang',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Untuk perusahaan besar',
    features: [
      'Pengguna unlimited',
      'Penyimpanan unlimited',
      'Dukungan 24/7',
      'Semua fitur premium',
      'Custom development',
      'Dedicated support',
      'SLA guarantee',
    ],
    ctaText: 'Hubungi Sales',
  },
]

export default function Pricing({ plans = defaultPlans }: PricingProps) {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
            Paket Harga
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda
          </p>
        </div>

        {/* Image Section - 16:9 Aspect Ratio */}
        <div className="mb-16 max-w-6xl mx-auto">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/pricing.jpg"
              alt="Paket Harga KelolaAja"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? 'border-2 border-primary-500 relative ring-2 ring-primary-200'
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Paling Populer
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-secondary-500 mr-3 mt-0.5 flex-shrink-0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 shadow-lg'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.ctaText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

