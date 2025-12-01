'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import ScrollAnimation from '@/components/ScrollAnimation'
import Link from 'next/link'
import { useState } from 'react'

export default function CompanyProfilePage() {
  const { locale, t } = useLanguage()
  const [activeValue, setActiveValue] = useState('I')

  // Get translations
  const companyProfile = t.companyProfile

  // Core Values Images Mapping
  const coreValueImages = {
    I: '/images/company-profile/core-values/innovation.jpg',
    M: '/images/company-profile/core-values/measurable-value.jpg',
    P: '/images/company-profile/core-values/practical-simple.jpg',
    A: '/images/company-profile/core-values/accountability-accuracy.jpg',
    C: '/images/company-profile/core-values/customer-centric.jpg',
    T: '/images/company-profile/core-values/trust-security.jpg',
  }

  // Core Values Data from translations
  const coreValues = companyProfile?.coreValues?.values || {
    I: { title: '', subtitle: '', description: '' },
    M: { title: '', subtitle: '', description: '' },
    P: { title: '', subtitle: '', description: '' },
    A: { title: '', subtitle: '', description: '' },
    C: { title: '', subtitle: '', description: '' },
    T: { title: '', subtitle: '', description: '' },
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Clean White Background */}
      <section className="relative pt-24 lg:pt-32 pb-12 lg:pb-16 bg-gradient-to-br from-[#0498da]/5 via-white to-[#71bf44]/5 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#0498da]/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#71bf44]/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-[#0498da]/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <ScrollAnimation direction="fade" delay={0} duration={800}>
              <div className="text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0498da]/10 rounded-full mb-6">
                  <div className="w-2 h-2 bg-[#0498da] rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-[#0498da]">
                    {companyProfile?.hero.badge || 'Tentang Kami'}
                  </span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold text-gray-900 mb-6 leading-tight">
                  {companyProfile?.hero.title || 'Profil'}{' '}
                  <span className="bg-gradient-to-r from-[#0498da] to-[#71bf44] bg-clip-text text-transparent">
                    {companyProfile?.hero.titleHighlight || 'Perusahaan'}
                  </span>
                </h1>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* About Section - 2 Columns */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column - Image */}
              <ScrollAnimation direction="left" delay={200} duration={600}>
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="/images/company-profile/about-us.jpg"
                    alt={companyProfile?.about.title || 'Sekilas Tentang Kami'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </ScrollAnimation>

              {/* Right Column - Text */}
              <ScrollAnimation direction="right" delay={300} duration={600}>
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-5">
                    {companyProfile?.about.title || 'Sekilas Tentang Kami'}
                  </h2>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <p className="text-sm lg:text-base text-justify">
                      {companyProfile?.about.description1 || ''}
                    </p>
                    <p className="text-sm lg:text-base text-justify">
                      {companyProfile?.about.description2 || ''}
                    </p>
                    <p className="text-sm lg:text-base text-justify">
                      {companyProfile?.about.description3 || ''}
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#0498da]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#71bf44]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left - Text */}
              <ScrollAnimation direction="left" delay={200} duration={600}>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0498da]/10 rounded-full mb-4">
                    <span className="text-xs font-semibold text-[#0498da]">
                      {companyProfile?.vision.badge || 'VISI KAMI'}
                    </span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-display font-bold italic text-gray-900 mb-5">
                    {companyProfile?.vision.title || 'VISI'}
                  </h2>
                  <p className="text-base lg:text-lg text-gray-700 leading-relaxed font-light text-justify">
                    {companyProfile?.vision.description || ''}
                  </p>
                </div>
              </ScrollAnimation>

              {/* Right - Image */}
              <ScrollAnimation direction="right" delay={300} duration={600}>
                <div className="relative w-full aspect-[4/5]">
                  <Image
                    src="/images/company-profile/vision.jpg"
                    alt={companyProfile?.vision.title || 'Visi'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 lg:py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#71bf44]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#0498da]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left - Image */}
              <ScrollAnimation direction="left" delay={200} duration={600}>
                <div className="relative w-full aspect-[4/5]">
                  <Image
                    src="/images/company-profile/mission.jpg"
                    alt={companyProfile?.mission.title || 'Misi'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </ScrollAnimation>

              {/* Right - Text */}
              <ScrollAnimation direction="right" delay={300} duration={600}>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#71bf44]/10 rounded-full mb-4">
                    <span className="text-xs font-semibold text-[#71bf44]">
                      {companyProfile?.mission.badge || 'MISI KAMI'}
                    </span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-display font-bold italic text-gray-900 mb-5">
                    {companyProfile?.mission.title || 'MISI'}
                  </h2>
                  <div className="space-y-3">
                    {companyProfile?.mission.items?.map((item, index) => (
                      <p key={index} className="text-base lg:text-lg text-gray-700 leading-relaxed font-light text-justify">
                        • {item}
                      </p>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section - Enhanced */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-[#0498da]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-[#71bf44]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#0498da]/3 to-[#71bf44]/3 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <ScrollAnimation direction="fade" delay={0} duration={800}>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0498da]/10 to-[#71bf44]/10 rounded-full mb-6 shadow-lg">
                  <div className="w-2 h-2 bg-[#0498da] rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    {companyProfile?.coreValues.badge || 'NILAI INTI PERUSAHAAN'}
                  </span>
                  <div className="w-2 h-2 bg-[#71bf44] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
                <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-black mb-0 relative inline-block">
                  <span className="relative z-10 text-gray-900 px-8">
                    {companyProfile?.coreValues.impact || 'IMPACT'}
                  </span>
                  <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-gray-300 to-transparent -translate-y-1/2 -z-0"></div>
                </h2>
              </div>
            </ScrollAnimation>

            {/* Navigation Tabs - Compact */}
            <ScrollAnimation direction="fade" delay={100} duration={800}>
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                {['I', 'M', 'P', 'A', 'C', 'T'].map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setActiveValue(letter)}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${
                      activeValue === letter
                        ? 'bg-[#0498da] text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </ScrollAnimation>

            {/* Content Area - Enhanced */}
            <ScrollAnimation direction="fade" delay={200} duration={800}>
              <div className="relative bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-100 overflow-hidden">
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#0498da]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#71bf44]/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start relative z-10">
                  {/* Left - Text */}
                  <div className="relative min-h-[350px]">
                    {/* Large Background Letter - Enhanced with gradient */}
                    <div className="absolute -top-12 -left-12 text-[220px] lg:text-[280px] font-black select-none pointer-events-none leading-none opacity-20 bg-clip-text text-transparent bg-gradient-to-br from-[#0498da] to-[#71bf44]">
                      {activeValue}
                    </div>
                    <div className="relative z-10 pt-8">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0498da]/10 to-[#71bf44]/10 rounded-lg mb-4">
                        <div className="w-1.5 h-1.5 bg-[#0498da] rounded-full"></div>
                        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          {activeValue} {companyProfile?.coreValues.fromImpact || 'dari IMPACT'}
                        </span>
                      </div>
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-gray-900 mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                        {coreValues[activeValue as keyof typeof coreValues].title}
                      </h3>
                      <h4 className="text-2xl sm:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0498da] to-[#71bf44]">
                        {coreValues[activeValue as keyof typeof coreValues].subtitle}
                      </h4>
                      <div className="w-20 h-1 bg-gradient-to-r from-[#0498da] to-[#71bf44] rounded-full mb-6"></div>
                      <p className="text-base lg:text-lg text-gray-700 leading-relaxed font-light text-justify">
                        {coreValues[activeValue as keyof typeof coreValues].description}
                      </p>
                    </div>
                  </div>

                  {/* Right - Image with Unique Frame */}
                  <div className="relative w-full">
                    {/* Modern frame with multiple layers */}
                    <div className="relative w-full aspect-[4/5]">
                      {/* Outer glow effect */}
                      <div className="absolute -inset-4 bg-gradient-to-br from-[#0498da]/20 via-[#71bf44]/20 to-[#0498da]/20 rounded-3xl blur-xl opacity-50"></div>
                      
                      {/* Decorative frame layers */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0498da]/10 via-white to-[#71bf44]/10 rounded-3xl transform rotate-3"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/50 to-white rounded-3xl transform -rotate-2"></div>
                      
                      {/* Main image container */}
                      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-white border-4 border-white">
                        <Image
                          src={coreValueImages[activeValue as keyof typeof coreValueImages]}
                          alt={coreValues[activeValue as keyof typeof coreValues].title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </main>
  )
}

