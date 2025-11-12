'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import ScrollAnimation from '@/components/ScrollAnimation'

interface Testimonial {
  quote: string
  name: string
  title: string
  company: string
}

export default function Testimonials() {
  const { t } = useLanguage()
  const testimonials: Testimonial[] = t.testimonials?.testimonials || [
    {
      quote: 'Mengguanakan software ERP KelolaAja yang simpel, praktis, dan mudah digunakan, menjadikan pengelolaan lebih cepat dan efisien.',
      name: 'Puji Waluyo',
      title: 'Manager',
      company: 'Sriendo Food Prima',
    },
    {
      quote: 'KelolaAja yang simpel, praktis, dan mudah digunakan, menjadikan pengelolaan lebih cepat dan efisien serta dapat di akses dimana saja.',
      name: 'Angga Yudhitama Putra',
      title: 'CEO',
      company: 'Sriendo Food Prima',
    },
    {
      quote: 'Pengelolaan keuangan yang lebih efisien, laporan real-time, dan pengambilan keputusan yang lebih cepat dan akurat.',
      name: 'Ayu Panduwinata',
      title: 'Manager Finance',
      company: '',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const goToTestimonial = (index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 300)
  }

  // Calculate visible testimonials (2 on desktop, 1 on mobile)
  // For simplicity, we'll always show 2 but hide one on mobile with CSS
  const getVisibleTestimonials = () => {
    const visible: Testimonial[] = []
    // Show current and next testimonial
    visible.push(testimonials[currentIndex])
    visible.push(testimonials[(currentIndex + 1) % testimonials.length])
    return visible
  }

  return (
    <section className="pt-12 lg:pt-16 pb-16 lg:pb-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <ScrollAnimation direction="fade" delay={0} duration={600}>
          <div className="text-center mb-8 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900">
              {t.testimonials?.title || 'Pengalaman Menggunakan KelolaAja'}
            </h2>
          </div>
        </ScrollAnimation>

        {/* Testimonials Carousel */}
        <div className="max-w-6xl mx-auto">
          {/* Testimonials Grid */}
          <div className="relative">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 transition-opacity duration-300 ${
                isAnimating ? 'opacity-50' : 'opacity-100'
              }`}
            >
              {getVisibleTestimonials().map((testimonial, index) => (
                <ScrollAnimation
                  key={`${currentIndex}-${index}`}
                  direction="up"
                  delay={index * 100}
                  duration={500}
                >
                  <div
                    className={`bg-white rounded-xl p-5 lg:p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary-200 group ${
                      index === 1 ? 'hidden lg:block' : ''
                    }`}
                  >
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <svg
                      className="w-6 h-6 text-primary-500 opacity-40"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Quote Text */}
                  <p className="text-gray-700 leading-relaxed text-sm lg:text-base mb-5">
                    {testimonial.quote}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-sm border-2 border-gray-200">
                      <Image
                        src="/images/common/default-profile.png"
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 text-sm lg:text-base truncate">
                        {testimonial.name}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-600 truncate">
                        {testimonial.title}
                        {testimonial.company && `, ${testimonial.company}`}
                      </p>
                    </div>
                  </div>
                </div>
                </ScrollAnimation>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              disabled={isAnimating}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 lg:-translate-x-16 xl:-translate-x-20 w-9 h-9 lg:w-10 lg:h-10 bg-white hover:bg-primary-600 text-gray-700 hover:text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group border border-gray-200 hover:border-primary-600"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5 group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              disabled={isAnimating}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 lg:translate-x-16 xl:translate-x-20 w-9 h-9 lg:w-10 lg:h-10 bg-white hover:bg-primary-600 text-gray-700 hover:text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group border border-gray-200 hover:border-primary-600"
              aria-label="Next testimonial"
            >
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {testimonials.map((_, index) => {
              const isActive = index === currentIndex
              return (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  disabled={isAnimating}
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-primary-600 w-8 h-2'
                      : 'bg-gray-300 hover:bg-gray-400 w-2 h-2'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
