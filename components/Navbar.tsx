'use client'

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Locale } from '@/lib/i18n/translations'
import Image from 'next/image'

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isFeaturesDropdownOpen, setIsFeaturesDropdownOpen] = useState(false)
  const [isIndustriesDropdownOpen, setIsIndustriesDropdownOpen] = useState(false)
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [activeFeaturesCategory, setActiveFeaturesCategory] = useState(0)
  const [activeIndustriesCategory, setActiveIndustriesCategory] = useState(0)
  const [activeCompanyCategory, setActiveCompanyCategory] = useState(0)
  const featuresDropdownRef = useRef<HTMLDivElement>(null)
  const industriesDropdownRef = useRef<HTMLDivElement>(null)
  const companyDropdownRef = useRef<HTMLDivElement>(null)
  const languageDropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside - only for mobile
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleClickOutside = (event: MouseEvent) => {
      // Only handle on mobile
      if (window.innerWidth >= 768) {
        return
      }

      const target = event.target as HTMLElement
      
      // Skip if clicking on dropdown button
      if (target.closest('button')) {
        return
      }
      
      // Check each dropdown
      if (isFeaturesDropdownOpen && featuresDropdownRef.current && !featuresDropdownRef.current.contains(target)) {
        setIsFeaturesDropdownOpen(false)
      }
      if (isIndustriesDropdownOpen && industriesDropdownRef.current && !industriesDropdownRef.current.contains(target)) {
        setIsIndustriesDropdownOpen(false)
      }
      if (isCompanyDropdownOpen && companyDropdownRef.current && !companyDropdownRef.current.contains(target)) {
        setIsCompanyDropdownOpen(false)
      }
      if (isLanguageDropdownOpen && languageDropdownRef.current && !languageDropdownRef.current.contains(target)) {
        setIsLanguageDropdownOpen(false)
      }
    }

    // Only add listener on client side and for mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      document.addEventListener('click', handleClickOutside, true)
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('click', handleClickOutside, true)
      }
    }
  }, [isFeaturesDropdownOpen, isIndustriesDropdownOpen, isCompanyDropdownOpen, isLanguageDropdownOpen])

  // Features data with categories
  const featuresCategories = [
    {
      label: locale === 'id' ? 'Utama' : 'Main',
      items: [
        { label: t.navDropdown.features.finance, href: '/features/finance', description: locale === 'id' ? 'Sistem keuangan lengkap untuk arus kas, pembukuan, dan laporan' : 'Complete financial system for cash flow, bookkeeping, and reports' },
        { label: t.navDropdown.features.project, href: '/features/project', description: locale === 'id' ? 'Kelola proyek, track progress, dan monitor timeline' : 'Manage projects, track progress, and monitor timeline' },
        { label: t.navDropdown.features.manufacturing, href: '/features/manufacturing', description: locale === 'id' ? 'Sistem manufaktur terintegrasi untuk produksi dan supply chain' : 'Integrated manufacturing system for production and supply chain' },
        { label: t.navDropdown.features.sales, href: '/features/sales', description: locale === 'id' ? 'Proses pembelian dan penjualan dari quotation hingga invoice' : 'Purchase and sales process from quotation to invoice' },
        { label: t.navDropdown.features.inventory, href: '/features/inventory', description: locale === 'id' ? 'Manajemen inventory dengan tracking real-time' : 'Inventory management with real-time tracking' },
      ],
    },
  ]

  // Industries data with categories
  const industriesCategories = [
    {
      label: locale === 'id' ? 'Layanan' : 'Services',
      items: [
        { label: t.navDropdown.industries.fnb, href: '/industries/fnb', description: locale === 'id' ? 'Untuk restoran, kafe, dan bisnis kuliner' : 'For restaurants, cafes, and culinary businesses' },
        { label: t.navDropdown.industries.contractor, href: '/industries/contractor', description: locale === 'id' ? 'Manajemen proyek konstruksi terintegrasi' : 'Integrated construction project management' },
        { label: t.navDropdown.industries.manufacturing, href: '/industries/manufaktur', description: locale === 'id' ? 'Produksi dan inventory management' : 'Production and inventory management' },
        { label: t.navDropdown.industries.retail, href: '/industries/retail', description: locale === 'id' ? 'Untuk toko retail dan e-commerce' : 'For retail stores and e-commerce' },
      ],
    },
  ]

  // Company data with categories
  const companyCategories = [
    {
      label: locale === 'id' ? 'Informasi' : 'Information',
      items: [
        { label: t.navDropdown.company.about, href: '/company', description: locale === 'id' ? 'Tentang KelolaAja dan tim kami' : 'About KelolaAja and our team' },
        { label: t.navDropdown.company.contact, href: '/contact', description: locale === 'id' ? 'Hubungi kami untuk informasi dan dukungan' : 'Contact us for information and support' },
      ],
    },
  ]

  const toggleLanguage = (newLocale: Locale) => {
    setLocale(newLocale)
    setIsLanguageDropdownOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* Main Navigation Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-14 lg:h-16">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center transition-opacity duration-200 hover:opacity-80 z-10"
            >
              <Image
                src="/images/logo.png"
                alt="KelolaAja"
                width={140}
                height={40}
                className="h-7 lg:h-8 w-auto"
                priority
              />
            </a>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-5 lg:gap-6">
              {/* Features Dropdown */}
              <div 
                className="relative" 
                ref={featuresDropdownRef}
                onMouseEnter={() => {
                  if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                    setIsFeaturesDropdownOpen(true)
                    setIsIndustriesDropdownOpen(false)
                    setIsCompanyDropdownOpen(false)
                  }
                }}
                onMouseLeave={() => {
                  // Don't close on mouse leave from button, let dropdown handle it
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsFeaturesDropdownOpen(prev => !prev)
                    setIsIndustriesDropdownOpen(false)
                    setIsCompanyDropdownOpen(false)
                  }}
                  className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                    isFeaturesDropdownOpen
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  <span>{t.nav.features}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isFeaturesDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu - 2 Column Layout */}
                {isFeaturesDropdownOpen && (
                  <div 
                    className="absolute left-1/2 top-full mt-1 w-[800px] max-w-[calc(100vw-3rem)] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                    style={{ 
                      transform: 'translateX(-50%)',
                    }}
                    onMouseEnter={() => {
                      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                        setIsFeaturesDropdownOpen(true)
                      }
                    }}
                    onMouseLeave={() => {
                      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                        setTimeout(() => setIsFeaturesDropdownOpen(false), 200)
                      }
                    }}
                  >
                    <div className="flex">
                      {/* Left Sidebar */}
                      <div className="w-44 bg-gray-50 border-r border-gray-200 flex flex-col">
                        <div className="p-3 border-b border-gray-200">
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            FITUR
                          </h3>
                        </div>
                        <div className="flex-1 py-1">
                          {featuresCategories.map((category, index) => (
                            <button
                              key={index}
                              onClick={() => setActiveFeaturesCategory(index)}
                              onMouseEnter={() => setActiveFeaturesCategory(index)}
                              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors rounded-r-lg ${
                                activeFeaturesCategory === index
                                  ? 'bg-white text-primary-600 border-r-2 border-primary-600 shadow-sm'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {category.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Right Content Area - Grid Layout */}
                      <div className="flex-1 p-4 flex flex-col">
                        <div className="grid grid-cols-2 gap-2.5 flex-1">
                          {featuresCategories[activeFeaturesCategory].items.map((item, index) => (
                            <a
                              key={index}
                              href={item.href}
                              onClick={(e) => {
                                e.stopPropagation()
                                setIsFeaturesDropdownOpen(false)
                              }}
                              className="block p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group border border-transparent hover:border-gray-200 cursor-pointer"
                            >
                              <h4 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                                {item.label}
                              </h4>
                              <p className="text-xs text-gray-600 leading-snug line-clamp-2">
                                {item.description}
                              </p>
                            </a>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-200">
                          <a
                            href="/features"
                            className="text-xs text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1 group/link"
                          >
                            {locale === 'id' ? 'Lihat semua fitur' : 'View all features'}
                            <svg className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Industries Dropdown */}
              <div 
                className="relative" 
                ref={industriesDropdownRef}
                onMouseEnter={() => {
                  if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                    setIsIndustriesDropdownOpen(true)
                    setIsFeaturesDropdownOpen(false)
                    setIsCompanyDropdownOpen(false)
                  }
                }}
                onMouseLeave={() => {
                  // Don't close on mouse leave from button, let dropdown handle it
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsIndustriesDropdownOpen(prev => !prev)
                    setIsFeaturesDropdownOpen(false)
                    setIsCompanyDropdownOpen(false)
                  }}
                  className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                    isIndustriesDropdownOpen
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  <span>{t.nav.industries}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isIndustriesDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu - 2 Column Layout */}
                {isIndustriesDropdownOpen && (
                  <div 
                    className="absolute left-1/2 top-full mt-1 w-[720px] max-w-[calc(100vw-3rem)] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                    style={{ 
                      transform: 'translateX(-50%)',
                    }}
                    onMouseEnter={() => {
                      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                        setIsIndustriesDropdownOpen(true)
                      }
                    }}
                    onMouseLeave={() => {
                      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                        setTimeout(() => setIsIndustriesDropdownOpen(false), 200)
                      }
                    }}
                  >
                    <div className="flex">
                      {/* Left Sidebar */}
                      <div className="w-44 bg-gray-50 border-r border-gray-200 flex flex-col">
                        <div className="p-3 border-b border-gray-200">
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            INDUSTRI
                          </h3>
                        </div>
                        <div className="flex-1 py-1">
                          {industriesCategories.map((category, index) => (
                            <button
                              key={index}
                              onClick={() => setActiveIndustriesCategory(index)}
                              onMouseEnter={() => setActiveIndustriesCategory(index)}
                              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors rounded-r-lg ${
                                activeIndustriesCategory === index
                                  ? 'bg-white text-primary-600 border-r-2 border-primary-600 shadow-sm'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {category.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Right Content Area - Grid Layout */}
                      <div className="flex-1 p-4 flex flex-col">
                        <div className="grid grid-cols-2 gap-2.5 flex-1">
                          {industriesCategories[activeIndustriesCategory].items.map((item, index) => (
                            <a
                              key={index}
                              href={item.href}
                              onClick={(e) => {
                                e.stopPropagation()
                                setIsIndustriesDropdownOpen(false)
                              }}
                              className="block p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group border border-transparent hover:border-gray-200 cursor-pointer"
                            >
                              <h4 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                                {item.label}
                              </h4>
                              <p className="text-xs text-gray-600 leading-snug line-clamp-2">
                                {item.description}
                              </p>
                            </a>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-200">
                          <a
                            href="/industries"
                            className="text-xs text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1 group/link"
                          >
                            {locale === 'id' ? 'Lihat semua industri' : 'View all industries'}
                            <svg className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing Link */}
              <a
                href="/pricing"
                className="px-4 py-1.5 text-sm text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                {t.nav.pricing}
              </a>

              {/* Company Dropdown */}
              <div 
                className="relative" 
                ref={companyDropdownRef}
                onMouseEnter={() => {
                  if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                    setIsCompanyDropdownOpen(true)
                    setIsFeaturesDropdownOpen(false)
                    setIsIndustriesDropdownOpen(false)
                  }
                }}
                onMouseLeave={() => {
                  // Don't close on mouse leave from button, let dropdown handle it
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsCompanyDropdownOpen(prev => !prev)
                    setIsFeaturesDropdownOpen(false)
                    setIsIndustriesDropdownOpen(false)
                  }}
                  className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                    isCompanyDropdownOpen
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  <span>{t.nav.company}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isCompanyDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu - 2 Column Layout */}
                {isCompanyDropdownOpen && (
                  <div 
                    className="absolute left-1/2 top-full mt-1 w-[600px] max-w-[calc(100vw-3rem)] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                    style={{ 
                      transform: 'translateX(-50%)',
                    }}
                    onMouseEnter={() => {
                      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                        setIsCompanyDropdownOpen(true)
                      }
                    }}
                    onMouseLeave={() => {
                      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                        setTimeout(() => setIsCompanyDropdownOpen(false), 200)
                      }
                    }}
                  >
                    <div className="flex">
                      {/* Left Sidebar */}
                      <div className="w-44 bg-gray-50 border-r border-gray-200 flex flex-col">
                        <div className="p-3 border-b border-gray-200">
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            PERUSAHAAN
                          </h3>
                        </div>
                        <div className="flex-1 py-1">
                          {companyCategories.map((category, index) => (
                            <button
                              key={index}
                              onClick={() => setActiveCompanyCategory(index)}
                              onMouseEnter={() => setActiveCompanyCategory(index)}
                              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors rounded-r-lg ${
                                activeCompanyCategory === index
                                  ? 'bg-white text-primary-600 border-r-2 border-primary-600 shadow-sm'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {category.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Right Content Area - Grid Layout */}
                      <div className="flex-1 p-4 flex flex-col">
                        <div className="grid grid-cols-2 gap-2.5 flex-1">
                          {companyCategories[activeCompanyCategory].items.map((item, index) => (
                            <a
                              key={index}
                              href={item.href}
                              onClick={(e) => {
                                e.stopPropagation()
                                setIsCompanyDropdownOpen(false)
                              }}
                              className="block p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group border border-transparent hover:border-gray-200 cursor-pointer"
                            >
                              <h4 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                                {item.label}
                              </h4>
                              <p className="text-xs text-gray-600 leading-snug line-clamp-2">
                                {item.description}
                              </p>
                            </a>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-200">
                          <a
                            href="/contact"
                            className="text-xs text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1 group/link"
                          >
                            {locale === 'id' ? 'Hubungi kami' : 'Contact us'}
                            <svg className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              </div>
            </nav>

            {/* Right Side - Language Selector & CTA Button */}
            <div className="hidden lg:flex items-center gap-4 z-10">
              {/* Language Selector */}
              <div className="relative" ref={languageDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  onBlur={() => {
                    setTimeout(() => setIsLanguageDropdownOpen(false), 200)
                  }}
                  className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-primary-300 hover:text-primary-600 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5"
                >
                  <span className="text-sm">{locale === 'id' ? '🇮🇩' : '🇬🇧'}</span>
                  <span>{locale.toUpperCase()}</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isLanguageDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Language Dropdown */}
                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-36 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                    <button
                      onClick={() => toggleLanguage('id')}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                        locale === 'id'
                          ? 'bg-primary-50 text-primary-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">🇮🇩</span>
                      <span>Indonesia</span>
                    </button>
                    <button
                      onClick={() => toggleLanguage('en')}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                        locale === 'en'
                          ? 'bg-primary-50 text-primary-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">🇬🇧</span>
                      <span>English</span>
                    </button>
                  </div>
                )}
              </div>

              {/* CTA Button - Enhanced */}
              <a
                href="/contact"
                className="group relative px-5 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-xl transform hover:scale-105 overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {t.nav.contact}
                </span>
              </a>
            </div>

            {/* Mobile Menu Button & Language Selector */}
            <div className="lg:hidden flex items-center gap-3 z-10">
              {/* Mobile Language Selector Button */}
              <div className="relative" ref={languageDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                >
                  <span className="text-sm">{locale === 'id' ? '🇮🇩' : '🇬🇧'}</span>
                  <span className="text-xs">{locale.toUpperCase()}</span>
                </button>
                
                {/* Language Dropdown */}
                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                    <button
                      onClick={() => toggleLanguage('id')}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                        locale === 'id'
                          ? 'bg-primary-50 text-primary-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">🇮🇩</span>
                      <span>ID</span>
                    </button>
                    <button
                      onClick={() => toggleLanguage('en')}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                        locale === 'en'
                          ? 'bg-primary-50 text-primary-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">🇬🇧</span>
                      <span>EN</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col space-y-1">
              {/* Features Dropdown Mobile */}
              <div>
                <button
                  onClick={() => {
                    setIsFeaturesDropdownOpen(!isFeaturesDropdownOpen)
                    setIsIndustriesDropdownOpen(false)
                    setIsCompanyDropdownOpen(false)
                  }}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                >
                  <span>{t.nav.features}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isFeaturesDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isFeaturesDropdownOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {featuresCategories[0].items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          setIsFeaturesDropdownOpen(false)
                          setIsMobileMenuOpen(false)
                        }}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Industries Dropdown Mobile */}
              <div>
                <button
                  onClick={() => {
                    setIsIndustriesDropdownOpen(!isIndustriesDropdownOpen)
                    setIsFeaturesDropdownOpen(false)
                    setIsCompanyDropdownOpen(false)
                  }}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                >
                  <span>{t.nav.industries}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isIndustriesDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isIndustriesDropdownOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {industriesCategories[0].items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          setIsIndustriesDropdownOpen(false)
                          setIsMobileMenuOpen(false)
                        }}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Pricing Link */}
              <a
                href="/pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
              >
                {t.nav.pricing}
              </a>

              {/* Company Dropdown Mobile */}
              <div>
                <button
                  onClick={() => {
                    setIsCompanyDropdownOpen(!isCompanyDropdownOpen)
                    setIsFeaturesDropdownOpen(false)
                    setIsIndustriesDropdownOpen(false)
                  }}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                >
                  <span>{t.nav.company}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isCompanyDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isCompanyDropdownOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {companyCategories[0].items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          setIsCompanyDropdownOpen(false)
                          setIsMobileMenuOpen(false)
                        }}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA Button Mobile - Enhanced */}
              <a
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 group relative px-4 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white text-sm font-semibold rounded-lg text-center transition-all duration-200 shadow-md hover:shadow-xl transform hover:scale-105 overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative flex items-center justify-center gap-1.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {t.nav.contact}
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
