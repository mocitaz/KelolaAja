'use client'

import Image from 'next/image'

interface AboutProps {
  content: {
    title: string
    description: string
    image?: string
  }
}

export default function About({ content }: AboutProps) {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
            {content.image ? (
              <Image
                src={content.image}
                alt={content.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-secondary-400 to-primary-500 flex items-center justify-center">
                <div className="text-6xl">💼</div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900">
              {content.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {content.description}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-gray-700">Profesional & Terpercaya</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-gray-700">Pengalaman Bertahun-tahun</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-gray-700">Dukungan 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

