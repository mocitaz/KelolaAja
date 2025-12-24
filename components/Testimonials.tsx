'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import ScrollAnimation from '@/components/ScrollAnimation'
import { fetchPublicData, API_ENDPOINTS } from '@/lib/api-config'

interface Testimonial {
  testimonialId: number
  personName: string
  position: string
  company: string
  testimonialText: string
  translations?: {
    id?: { quote: string }
    en?: { quote: string }
    [key: string]: any
  }
  rating: number
  imageUrl?: string
  isActive: boolean
  displayOrder: number
}

interface TestimonialsProps {
  data?: Testimonial[]
}

export default function Testimonials({ data }: TestimonialsProps) {
  const { t, locale } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (data && data.length > 0) {
      setTestimonials(data.filter((t: Testimonial) => t.isActive))
      setLoading(false)
    } else {
      fetchTestimonials()
    }
  }, [data])

  const fetchTestimonials = async () => {
    // Only fetch if data prop is not provided
    if (data && data.length > 0) return

    console.log('[Testimonials] Fetching from API...');
    const result = await fetchPublicData<any[]>(
      API_ENDPOINTS.PUBLIC.TESTIMONIALS.LIST
    )

    console.log('[Testimonials] API Response:', result);
    if (result.success && Array.isArray(result.data)) {
      console.log('[Testimonials] Raw data count:', result.data.length);

      // Map API response to Component Interface with fallback for field names
      const activeTestimonials = result.data
        .filter((t: any) => t.isActive)
        .map((t: any) => ({
          testimonialId: t.testimonialId,
          personName: t.personName || t.name,
          position: t.position || t.title,
          company: t.company,
          // Handle various possible field names for the content
          testimonialText: t.testimonialText || t.quote || t.content || t.message || "",
          rating: t.rating || 5,
          imageUrl: t.imageUrl || t.image,
          isActive: t.isActive,
          displayOrder: t.displayOrder || 0
        }));

      console.log('[Testimonials] Active testimonials count:', activeTestimonials.length);
      setTestimonials(activeTestimonials)
    } else {
      console.log('[Testimonials] API failed, using fallback');
      setTestimonials([]) // Will use fallback data
    }

    setLoading(false)
  }

  // Fallback testimonials
  const fallbackTestimonials: Testimonial[] = (t.testimonials?.testimonials || [
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
  ]).map((item: any, index: number) => ({
    testimonialId: index,
    personName: item.name,
    position: item.title,
    company: item.company,
    testimonialText: item.quote,
    rating: 5,
    imageUrl: undefined,
    isActive: true,
    displayOrder: index
  }))

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials
  console.log('[Testimonials] Displaying:', displayTestimonials.length, 'testimonials, using', testimonials.length > 0 ? 'API data' : 'fallback data');

  const nextTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length)
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
    visible.push(displayTestimonials[currentIndex])
    visible.push(displayTestimonials[(currentIndex + 1) % displayTestimonials.length])
    return visible
  }

  // Don't show loading spinner - directly use fallback data
  if (displayTestimonials.length === 0) {
    return null
  }

  if (displayTestimonials.length === 0) {
    return null
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
              className={`grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'
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
                    className={`bg-white rounded-xl p-5 lg:p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary-200 group ${index === 1 ? 'hidden lg:block' : ''
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
                    {/* Quote Text */}
                    <p className="text-gray-700 leading-relaxed text-sm lg:text-base mb-5">
                      {testimonial.translations?.[locale as 'id' | 'en']?.quote || testimonial.testimonialText}
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-sm border-2 border-gray-200">
                        <Image
                          src={testimonial.imageUrl || "/images/common/default-profile.png"}
                          alt={testimonial.personName}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 text-sm lg:text-base truncate">
                          {testimonial.personName}
                        </p>
                        <p className="text-xs lg:text-sm text-gray-600 truncate">
                          {testimonial.position}
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
            {displayTestimonials.map((_, index) => {
              const isActive = index === currentIndex
              return (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  disabled={isAnimating}
                  className={`rounded-full transition-all duration-300 ${isActive
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
