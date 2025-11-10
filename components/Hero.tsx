'use client'

import { createWhatsAppLink } from '@/lib/whatsapp'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrollAnimation from '@/components/ScrollAnimation'

interface HeroProps {
  content?: {
    title?: string
    subtitle?: string
    description?: string
    ctaText?: string
    image?: string
  }
}

export default function Hero({ content }: HeroProps) {
  const { t } = useLanguage()
  const whatsappLink = createWhatsAppLink()

  // Use translations if content not provided
  const heroContent = {
    title: content?.title || t.hero.title,
    subtitle: content?.subtitle || t.hero.subtitle,
    description: content?.description || t.hero.description,
    ctaText: content?.ctaText || t.hero.ctaText,
    image: content?.image,
  }

  return (
    <section id="home" className="relative bg-gradient-to-br from-white via-primary-50/20 to-secondary-50/20 text-gray-900 pt-32 lg:pt-36 pb-12 lg:pb-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <ScrollAnimation direction="right" delay={0} duration={700}>
            <div className="text-center lg:text-left space-y-5 lg:space-y-6">
              <div className="space-y-3 lg:space-y-4">
                <div className="inline-block">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs lg:text-sm font-semibold mb-4 animate-fade-in">
                    <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                    Software ERP Terpercaya
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold leading-tight">
                  <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 bg-clip-text text-transparent animate-gradient">
                    {heroContent.title}
                  </span>
                  <br />
                  <span className="text-gray-900">
                    {heroContent.subtitle}
                  </span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {heroContent.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary-500/40 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                  <span className="relative flex items-center gap-2">
                    {heroContent.ctaText}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </a>
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-xl shadow-lg border-2 border-gray-200 hover:border-primary-300 transform transition-all duration-300 hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    {t.hero.demoButton}
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </ScrollAnimation>

          {/* Image - Enhanced with animations */}
          <ScrollAnimation direction="left" delay={200} duration={700}>
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
                {heroContent.image ? (
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-2xl"></div>
                    <Image
                      src={heroContent.image}
                      alt={heroContent.title}
                      width={600}
                      height={600}
                      className="object-cover w-full h-auto relative z-10"
                      priority
                    />
                    {/* Glow effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-2xl blur-2xl -z-10 animate-pulse"></div>
                  </div>
                ) : (
                  <div className="relative w-full aspect-square bg-gradient-to-br from-primary-100 via-primary-50 to-secondary-100 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-500">
                    <div className="text-7xl animate-bounce">🚀</div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-2xl"></div>
                  </div>
                )}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
