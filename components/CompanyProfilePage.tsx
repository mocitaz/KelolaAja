'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import ScrollAnimation from '@/components/ScrollAnimation'
import Link from 'next/link'
import { useState } from 'react'

export default function CompanyProfilePage() {
  const { locale, t } = useLanguage()
  const [activeValue, setActiveValue] = useState('I')
  const [activeAgile, setActiveAgile] = useState('A')

  // Get translations
  const companyProfile = t.companyProfile

  // AGILE Values Data from translations
  const agileValues = companyProfile?.agileValues?.values || {
    A: { title: '', subtitle: '', description: '' },
    G: { title: '', subtitle: '', description: '' },
    I: { title: '', subtitle: '', description: '' },
    L: { title: '', subtitle: '', description: '' },
    E: { title: '', subtitle: '', description: '' },
  }

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

      {/* AGILE Core Values Section - Ultra Modern & Compact */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#0498da]/8 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#71bf44]/8 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Compact Header */}
            <ScrollAnimation direction="fade" delay={0} duration={600}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full mb-4 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-[#0498da] rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.15em]">
                    {companyProfile?.agileValues.badge || 'Core Values'}
                  </span>
                  <div className="w-1.5 h-1.5 bg-[#71bf44] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black mb-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  {companyProfile?.agileValues.title || 'AGILE'}
                </h2>
                {companyProfile?.agileValues.subtitle && (
                  <p className="text-sm sm:text-base text-gray-500 italic font-light">
                    {companyProfile.agileValues.subtitle}
                  </p>
                )}
              </div>
            </ScrollAnimation>

            {/* Compact Navigation Pills */}
            <ScrollAnimation direction="fade" delay={100} duration={600}>
              <div className="flex flex-wrap justify-center gap-1.5 mb-8">
                {['A', 'G', 'I', 'L', 'E'].map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setActiveAgile(letter)}
                    className={`relative px-5 py-2.5 rounded-full font-black text-sm transition-all duration-300 transform hover:scale-105 ${
                      activeAgile === letter
                        ? 'bg-gradient-to-r from-[#0498da] to-[#71bf44] text-white shadow-lg shadow-[#0498da]/30 scale-105'
                        : 'bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-50 border border-gray-200/50 shadow-sm'
                    }`}
                  >
                    {letter}
                    {activeAgile === letter && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0498da] to-[#71bf44] opacity-20 animate-ping"></div>
                    )}
                  </button>
                ))}
              </div>
            </ScrollAnimation>

            {/* Compact Content Card */}
            <ScrollAnimation direction="fade" delay={200} duration={600}>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-100/50 overflow-hidden group hover:shadow-2xl transition-all duration-500">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0498da]/5 via-transparent to-[#71bf44]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Large letter background */}
                <div className="absolute -top-8 -right-8 text-[180px] lg:text-[220px] font-black select-none pointer-events-none leading-none opacity-[0.03] text-gray-900">
                  {activeAgile}
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#0498da] to-[#71bf44] rounded-full"></div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      {activeAgile} {locale === 'id' ? 'dari AGILE' : 'from AGILE'}
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-gray-900 mb-2 leading-tight">
                    {agileValues[activeAgile as keyof typeof agileValues].title}
                  </h3>
                  <h4 className="text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-[#0498da] to-[#71bf44] bg-clip-text text-transparent">
                    {agileValues[activeAgile as keyof typeof agileValues].subtitle}
                  </h4>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-[#0498da] to-[#71bf44] rounded-full mb-4"></div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {agileValues[activeAgile as keyof typeof agileValues].description}
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Our Philosophy Section - Ultra Modern & Compact */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#0498da]/8 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#71bf44]/8 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Compact Header */}
            <ScrollAnimation direction="fade" delay={0} duration={600}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full mb-4 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-[#0498da] rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.15em]">
                    {companyProfile?.coreValues.badge || 'Our Philosophy'}
                  </span>
                  <div className="w-1.5 h-1.5 bg-[#71bf44] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black mb-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  {companyProfile?.coreValues.impact || 'Our Philosophy'}
                </h2>
              </div>
            </ScrollAnimation>

            {/* Compact Navigation Pills */}
            <ScrollAnimation direction="fade" delay={100} duration={600}>
              <div className="flex flex-wrap justify-center gap-1.5 mb-8">
                {['I', 'M', 'P', 'A', 'C', 'T'].map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setActiveValue(letter)}
                    className={`relative px-5 py-2.5 rounded-full font-black text-sm transition-all duration-300 transform hover:scale-105 ${
                      activeValue === letter
                        ? 'bg-gradient-to-r from-[#0498da] to-[#71bf44] text-white shadow-lg shadow-[#0498da]/30 scale-105'
                        : 'bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-50 border border-gray-200/50 shadow-sm'
                    }`}
                  >
                    {letter}
                    {activeValue === letter && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0498da] to-[#71bf44] opacity-20 animate-ping"></div>
                    )}
                  </button>
                ))}
              </div>
            </ScrollAnimation>

            {/* Compact Content Card with Image */}
            <ScrollAnimation direction="fade" delay={200} duration={600}>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-100/50 overflow-hidden group hover:shadow-2xl transition-all duration-500">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0498da]/5 via-transparent to-[#71bf44]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 relative z-10">
                  {/* Left - Text Content */}
                  <div className="relative">
                    {/* Large letter background */}
                    <div className="absolute -top-6 -left-6 text-[140px] lg:text-[180px] font-black select-none pointer-events-none leading-none opacity-[0.03] text-gray-900">
                      {activeValue}
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-6 bg-gradient-to-b from-[#0498da] to-[#71bf44] rounded-full"></div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                          {activeValue} {companyProfile?.coreValues.fromImpact || 'dari Our Philosophy'}
                        </span>
                      </div>
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-gray-900 mb-2 leading-tight">
                        {coreValues[activeValue as keyof typeof coreValues].title}
                      </h3>
                      <h4 className="text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-[#0498da] to-[#71bf44] bg-clip-text text-transparent">
                        {coreValues[activeValue as keyof typeof coreValues].subtitle}
                      </h4>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-[#0498da] to-[#71bf44] rounded-full mb-4"></div>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {coreValues[activeValue as keyof typeof coreValues].description}
                      </p>
                    </div>
                  </div>

                  {/* Right - Image */}
                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0498da]/10 to-[#71bf44]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <Image
                      src={coreValueImages[activeValue as keyof typeof coreValueImages]}
                      alt={coreValues[activeValue as keyof typeof coreValues].title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
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

