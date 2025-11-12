'use client'

import Image from 'next/image'
import ScrollAnimation from '@/components/ScrollAnimation'
import { useState } from 'react'

interface Feature {
  title: string
  description: string
  image: string
  link: string
}

interface FeaturesCarouselProps {
  features: Feature[]
  title?: string
}

export default function FeaturesCarousel({ features, title }: FeaturesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const totalSlides = Math.ceil(features.length / 3)
  const maxIndex = totalSlides - 1

  const goToSlide = (index: number) => {
    if (index < 0) {
      setCurrentIndex(maxIndex)
    } else if (index > maxIndex) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(index)
    }
  }

  const nextSlide = () => {
    goToSlide(currentIndex + 1)
  }

  const prevSlide = () => {
    goToSlide(currentIndex - 1)
  }

  // Swipe functionality
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
  }

  return (
    <section className="py-12 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          {title && (
            <ScrollAnimation direction="fade" delay={0} duration={500}>
              <div className="text-center mb-12 lg:mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                  {title}
                </h2>
              </div>
            </ScrollAnimation>
          )}

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Arrows */}
            <div className="flex justify-end items-center mb-4 gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white border border-gray-300 hover:border-primary-500 hover:bg-primary-50 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white border border-gray-300 hover:border-primary-500 hover:bg-primary-50 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="Next slide"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Carousel */}
            <div
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
                  >
                    {features.slice(slideIndex * 3, slideIndex * 3 + 3).map((feature, index) => (
                      <ScrollAnimation
                        key={slideIndex * 3 + index}
                        direction="up"
                        delay={index * 100}
                        duration={500}
                        className="flex"
                      >
                        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary-300 group flex flex-col w-full h-full">
                          {/* Image - 16:9 aspect ratio */}
                          <div className="relative w-full aspect-video bg-gradient-to-br from-primary-50 to-secondary-50 flex-shrink-0">
                            <Image
                              src={feature.image}
                              alt={feature.title}
                              fill
                              className="object-contain group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 33vw"
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
                              <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                                {feature.title}
                              </h3>
                              <p className="text-gray-600 leading-relaxed mb-4 text-sm lg:text-base flex-1">
                                {feature.description}
                              </p>
                              <a
                                href={feature.link}
                                className="text-primary-600 hover:text-primary-700 font-medium text-sm lg:text-base inline-flex items-center gap-1.5 transition-colors duration-300 group/link w-fit flex-shrink-0 mt-auto"
                              >
                                Pelajari Selengkapnya
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
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center items-center gap-2 mt-6">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-primary-600'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

