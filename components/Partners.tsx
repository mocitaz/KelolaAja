'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

interface Partner {
  name: string
  image: string
  website?: string
}

interface PartnersProps {
  partners?: Partner[]
  title?: string
  className?: string
}

export default function Partners({ partners, title, className = '' }: PartnersProps) {
  const { locale } = useLanguage()
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Default partners data
  const defaultPartners: Partner[] = [
    {
      name: 'Sri',
      image: '/images/partners/sri.png',
    },
    {
      name: 'Sriendo Foods',
      image: '/images/partners/sriendofoods.png',
    },
    {
      name: 'Aura Food',
      image: '/images/partners/aurafood.png',
    },
    {
      name: 'Damika',
      image: '/images/partners/logo-damika.png',
    },
    {
      name: 'KAS',
      image: '/images/partners/logo-kas.png',
    },
    {
      name: 'MB Furnistore',
      image: '/images/partners/logo-mb-furnistore.jpg',
    },
    {
      name: 'MML',
      image: '/images/partners/logo-mml.jpg',
    },
    {
      name: 'SBS',
      image: '/images/partners/logo-sbs.jpg',
    },
  ]

  const partnersList = partners || defaultPartners
  const sectionTitle = title || (locale === 'id' ? 'Mitra kami' : 'Our Partners')

  // Duplicate partners for seamless infinite scroll
  const duplicatedPartners = [...partnersList, ...partnersList, ...partnersList]

  // Auto-scroll effect
  useEffect(() => {
    if (!scrollContainerRef.current || isPaused) return

    const container = scrollContainerRef.current
    let scrollPosition = 0
    const scrollSpeed = 0.3 // pixels per frame
    // w-20 = 80px, gap-6 = 24px, total = 104px per item
    const itemWidth = 104

    const animate = () => {
      if (isPaused) return

      scrollPosition += scrollSpeed

      // Reset when scrolled through one set
      if (scrollPosition >= itemWidth * partnersList.length) {
        scrollPosition = 0
      }

      container.style.transform = `translateX(-${scrollPosition}px)`
      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isPaused, partnersList.length])

  // Touch/swipe handlers
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setIsPaused(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe || isRightSwipe) {
      // Manual swipe detected, keep paused
      setTimeout(() => setIsPaused(false), 2000)
    } else {
      setIsPaused(false)
    }
  }

  return (
    <section className={`py-6 lg:py-8 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Title - Compact */}
          <div className="text-center mb-4 lg:mb-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-gray-900">
              {sectionTitle}
            </h2>
          </div>

          {/* Carousel Container - Shows 8 items at once */}
          <div
            className="relative overflow-hidden mx-auto"
            style={{
              width: 'calc(8 * 104px)', // 8 items: w-20 (80px) + gap-6 (24px) = 104px each
              maxWidth: '100%',
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

            {/* Scrolling Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 lg:gap-8 items-center"
              style={{
                willChange: 'transform',
                transition: isPaused ? 'transform 0.3s ease-out' : 'none',
                width: 'fit-content',
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <PartnerItem key={`${partner.name}-${index}`} partner={partner} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Partner Item Component - Compact size
function PartnerItem({ partner }: { partner: Partner }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center group">
      {partner.website ? (
        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 hover:scale-110"
        >
          <div className="relative w-20 h-14 lg:w-24 lg:h-16 flex items-center justify-center bg-white rounded-lg p-2 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all duration-300">
            <Image
              src={partner.image}
              alt={partner.name}
              width={80}
              height={50}
              className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 w-full h-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          </div>
        </a>
      ) : (
        <div className="relative w-20 h-14 lg:w-24 lg:h-16 flex items-center justify-center bg-white rounded-lg p-2 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all duration-300 group-hover:scale-110">
          <Image
            src={partner.image}
            alt={partner.name}
            width={80}
            height={50}
            className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 w-full h-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        </div>
      )}
    </div>
  )
}
