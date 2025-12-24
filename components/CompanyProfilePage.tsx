'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import ScrollAnimation from '@/components/ScrollAnimation'
import Link from 'next/link'
import { useState, useEffect, useMemo } from 'react'
import { fetchPublicData, API_ENDPOINTS } from '@/lib/api-config'

interface AboutCard {
  cardId: number
  displayOrder: number
  cardLink: string | null
  title: string
  description: string
  image: string | null
}

interface ContentSection {
  sectionId?: number
  sectionKey: string
  sectionType?: string
  translations?: {
    [key: string]: {
      title: string
      subtitle: string
      description: string
    }
  }
  // Public API might return flattened fields if locale is handled on backend
  title?: string
  subtitle?: string | null
  description?: string | null
  content?: string | null
  additionalData?: any
  displayOrder?: number
  isActive?: boolean
  media?: any[]
}

export default function CompanyProfilePage() {
  const { locale, t } = useLanguage()
  const [activeValue, setActiveValue] = useState('I')
  const [activeAgile, setActiveAgile] = useState('A')
  const [aboutCards, setAboutCards] = useState<AboutCard[]>([])
  const [contentSections, setContentSections] = useState<ContentSection[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPageData()
  }, [locale])

  const fetchPageData = async () => {
    setIsLoading(true)
    console.log('[CompanyProfile] Fetching page data...');

    try {
      // Fetch cards (single request)
      const cardsResponse = await fetchPublicData<AboutCard[]>(
        `${API_ENDPOINTS.PUBLIC.ABOUT_CARDS.LIST}?locale=${locale}`,
        { cache: 'no-store' }
      );

      console.log('[CompanyProfile] Cards API Response:', cardsResponse);
      if (cardsResponse.success && Array.isArray(cardsResponse.data)) {
        setAboutCards(cardsResponse.data)
      }

      // Fetch content sections
      // Backend NOW supports multi-language with translations object: { id: {...}, en: {...} }
      console.log('[CompanyProfile] Fetching content sections from API...');
      const sectionsResponse = await fetchPublicData<any>(
        API_ENDPOINTS.PUBLIC.CONTENT_SECTIONS.LIST,
        { cache: 'no-store' }
      );

      let fetchedSections: ContentSection[] = [];
      let fetchSuccess = false;

      if (sectionsResponse.success && sectionsResponse.data) {
        const responseData = sectionsResponse.data;
        console.log('[CompanyProfile] API Response received');

        // Handle various response structures
        let rawSections: any[] = [];
        if (Array.isArray(responseData)) {
          rawSections = responseData;
        } else if (responseData.data && Array.isArray(responseData.data)) {
          rawSections = responseData.data;
        }

        // Process sections - backend now returns translations object
        if (rawSections.length > 0) {
          console.log('[CompanyProfile] Processing sections for locale:', locale);
          console.log('[CompanyProfile] Sample section structure:', JSON.stringify(rawSections[0], null, 2));

          fetchedSections = rawSections.map(section => {
            // Backend returns translations object: { id: {...}, en: {...} }
            if (section.translations && typeof section.translations === 'object') {
              const localeData = section.translations[locale];
              if (localeData) {
                console.log(`[CompanyProfile] Using translations[${locale}] for ${section.sectionKey}`);
                return {
                  ...section,
                  title: localeData.title,
                  subtitle: localeData.subtitle,
                  description: localeData.description,
                  content: localeData.content || localeData.description
                };
              } else {
                console.warn(`[CompanyProfile] No translation for locale ${locale} in ${section.sectionKey}, using fallback`);
              }
            }
            // Fallback: return as-is if no translations object
            return section;
          });

          fetchSuccess = fetchedSections.length > 0;
          console.log(`[CompanyProfile] Successfully processed ${fetchedSections.length} sections`);
        }
      } else {
        console.error('[CompanyProfile] Failed to fetch sections', sectionsResponse.error);
      }

      // Fallback to Mock Data only if API completely fails
      if (!fetchSuccess || fetchedSections.length === 0) {
        console.warn('[CompanyProfile] ⚠️ API failed - using fallback mock data from translations context');
        fetchedSections = [
          // AGILE MOCK DATA from translations
          {
            sectionKey: 'company_profile_agile_A',
            sectionType: 'agile_value',
            title: companyProfile?.agileValues?.values?.A?.title || 'Add Value',
            subtitle: companyProfile?.agileValues?.values?.A?.subtitle || 'Menciptakan Nilai Tambah',
            content: companyProfile?.agileValues?.values?.A?.description || 'Kami selalu memberikan nilai tambah bagi para mitra bisnis, lingkungan sekitar dan masyarakat',
            displayOrder: 1,
            isActive: true
          },
          {
            sectionKey: 'company_profile_agile_G',
            sectionType: 'agile_value',
            title: companyProfile?.agileValues?.values?.G?.title || 'Grateful & Prosperous',
            subtitle: companyProfile?.agileValues?.values?.G?.subtitle || 'Bersyukur & Sejahtera',
            content: companyProfile?.agileValues?.values?.G?.description || 'Kami selalu bersyukur atas segala hal yang kami terima',
            displayOrder: 2,
            isActive: true
          },
          {
            sectionKey: 'company_profile_agile_I',
            sectionType: 'agile_value',
            title: companyProfile?.agileValues?.values?.I?.title || 'Integrity & Commitment',
            subtitle: companyProfile?.agileValues?.values?.I?.subtitle || 'Amanah & Berkomitmen',
            content: companyProfile?.agileValues?.values?.I?.description || 'Kami adalah pribadi-pribadi yang amanah, bertanggung jawab dan berdisiplin tinggi',
            displayOrder: 3,
            isActive: true
          },
          {
            sectionKey: 'company_profile_agile_L',
            sectionType: 'agile_value',
            title: companyProfile?.agileValues?.values?.L?.title || 'Learn, Growth & Fun',
            subtitle: companyProfile?.agileValues?.values?.L?.subtitle || 'Senantiasa Belajar, Mengembangkan Diri & Menuntaskan Tugas dengan Riang Gembira',
            content: companyProfile?.agileValues?.values?.L?.description || 'Segala kejadian yang kami alami adalah pelajaran bagi kami untuk menjadi pribadi yang senantiasa melakukan perbaikan',
            displayOrder: 4,
            isActive: true
          },
          {
            sectionKey: 'company_profile_agile_E',
            sectionType: 'agile_value',
            title: companyProfile?.agileValues?.values?.E?.title || 'Enthusiast & High Performance',
            subtitle: companyProfile?.agileValues?.values?.E?.subtitle || 'Bersemangat & Kinerja Tinggi',
            content: companyProfile?.agileValues?.values?.E?.description || 'Kami selalu bersemangat dan aktif memancarkan energi positif dalam setiap kesempatan',
            displayOrder: 5,
            isActive: true
          },
          // IMPACT MOCK DATA from translations
          {
            sectionKey: 'company_profile_impact_I',
            sectionType: 'impact_value',
            title: companyProfile?.coreValues?.values?.I?.title || 'Innovation',
            subtitle: companyProfile?.coreValues?.values?.I?.subtitle || 'Inovasi Berkelanjutan',
            content: companyProfile?.coreValues?.values?.I?.description || 'Kami terus mengembangkan KelolaAja agar selalu relevan, modern, dan mampu menjawab kebutuhan bisnis yang terus berubah',
            displayOrder: 1,
            isActive: true
          },
          {
            sectionKey: 'company_profile_impact_M',
            sectionType: 'impact_value',
            title: companyProfile?.coreValues?.values?.M?.title || 'Measurable Value',
            subtitle: companyProfile?.coreValues?.values?.M?.subtitle || 'Nilai yang Dapat Diukur',
            content: companyProfile?.coreValues?.values?.M?.description || 'Setiap fitur yang kami bangun harus memberikan dampak nyata bagi pengguna',
            displayOrder: 2,
            isActive: true
          },
          {
            sectionKey: 'company_profile_impact_P',
            sectionType: 'impact_value',
            title: companyProfile?.coreValues?.values?.P?.title || 'Practical & Simple',
            subtitle: companyProfile?.coreValues?.values?.P?.subtitle || 'Praktis dan Sederhana',
            content: companyProfile?.coreValues?.values?.P?.description || 'KelolaAja dirancang agar mudah digunakan oleh siapa pun, tanpa perlu pengalaman teknis ERP',
            displayOrder: 3,
            isActive: true
          },
          {
            sectionKey: 'company_profile_impact_A',
            sectionType: 'impact_value',
            title: companyProfile?.coreValues?.values?.A?.title || 'Accountability & Accuracy',
            subtitle: companyProfile?.coreValues?.values?.A?.subtitle || 'Akuntabilitas dan Akurasi Data',
            content: companyProfile?.coreValues?.values?.A?.description || 'Kami menjaga integritas data sebagai prioritas utama',
            displayOrder: 4,
            isActive: true
          },
          {
            sectionKey: 'company_profile_impact_C',
            sectionType: 'impact_value',
            title: companyProfile?.coreValues?.values?.C?.title || 'Customer-Centric',
            subtitle: companyProfile?.coreValues?.values?.C?.subtitle || 'Berfokus pada Pengguna',
            content: companyProfile?.coreValues?.values?.C?.description || 'Seluruh pengembangan KelolaAja didesain berdasarkan kebutuhan nyata bisnis di Indonesia',
            displayOrder: 5,
            isActive: true
          },
          {
            sectionKey: 'company_profile_impact_T',
            sectionType: 'impact_value',
            title: companyProfile?.coreValues?.values?.T?.title || 'Trust & Security',
            subtitle: companyProfile?.coreValues?.values?.T?.subtitle || 'Kepercayaan dan Keamanan',
            content: companyProfile?.coreValues?.values?.T?.description || 'Kami membangun KelolaAja dengan standar keamanan modern untuk melindungi data pengguna',
            displayOrder: 6,
            isActive: true
          }
        ];
      }

      console.log(`[CompanyProfile] Successfully fetched/mocked ${fetchedSections.length} sections`);
      setContentSections(fetchedSections);

    } catch (error) {
      console.error('[CompanyProfile] Error fetching data:', error);
    }

    setIsLoading(false)
  }

  // Get translations
  const companyProfile = t.companyProfile

  // Get Vision and Mission from About Cards API with fallback to translations
  const visionData = useMemo(() => {
    // Find card by cardId: 1 for Vision
    const card = aboutCards.find(c => c.cardId === 1)
    return {
      title: card?.title || companyProfile?.vision.title || 'VISI',
      description: card?.description || companyProfile?.vision.description || ''
    }
  }, [aboutCards, companyProfile])

  const missionData = useMemo(() => {
    // Find card by cardId: 2 for Mission
    const card = aboutCards.find(c => c.cardId === 2)
    return {
      title: card?.title || companyProfile?.mission.title || 'MISI',
      description: card?.description || companyProfile?.mission.items?.join('\n• ') || ''
    }
  }, [aboutCards, companyProfile])

  // AGILE Values Data from API with fallback to translations
  const agileValues = useMemo(() => {
    const letters = ['A', 'G', 'I', 'L', 'E'];
    const values: Record<string, { title: string; subtitle: string; description: string }> = {};

    letters.forEach(letter => {
      const sectionKey = `company_profile_agile_${letter}`;
      const section = contentSections.find(s => s.sectionKey === sectionKey);

      console.log(`[CompanyProfile] Matching AGILE letter ${letter} with key ${sectionKey}:`, section ? 'FOUND' : 'NOT FOUND');

      if (letter === 'A') {
        console.log('[CompanyProfile] DEBUG AGILE A - Full section:', JSON.stringify(section, null, 2));
        console.log('[CompanyProfile] Current locale:', locale);
        console.log('[CompanyProfile] Section has translations?', !!section?.translations);
        console.log('[CompanyProfile] Section title:', section?.title);
        console.log('[CompanyProfile] Section subtitle:', section?.subtitle);
        console.log('[CompanyProfile] Section description:', section?.description);
        console.log('[CompanyProfile] Section content:', section?.content);
      }

      // Check if we have dynamic data. 
      // Prioritize explicit translations object if available
      if (section?.translations?.[locale]) {
        console.log(`[CompanyProfile] AGILE ${letter}: Using translations[${locale}]`);
        values[letter] = {
          title: section.translations[locale].title,
          subtitle: section.translations[locale].subtitle,
          description: section.translations[locale].description
        };
      }
      // If the public API returns localized flat fields (backend handled localization):
      else if (section?.title) {
        console.log(`[CompanyProfile] AGILE ${letter}: Using flat fields (title: ${section.title})`);
        values[letter] = {
          title: section.title,
          subtitle: section.subtitle || '',
          description: section.description || section.content || ''
        };
      }
      // Fallback to static translations
      else {
        console.log(`[CompanyProfile] AGILE ${letter}: Using fallback from translations context`);
        values[letter] = companyProfile?.agileValues?.values?.[letter as keyof typeof companyProfile.agileValues.values] || {
          title: '', subtitle: '', description: ''
        };
      }
    });
    return values;
  }, [contentSections, companyProfile, locale]);

  // Core Values Images Mapping
  const coreValueImages = {
    I: '/images/company-profile/core-values/innovation.jpg',
    M: '/images/company-profile/core-values/measurable-value.jpg',
    P: '/images/company-profile/core-values/practical-simple.jpg',
    A: '/images/company-profile/core-values/accountability-accuracy.jpg',
    C: '/images/company-profile/core-values/customer-centric.jpg',
    T: '/images/company-profile/core-values/trust-security.jpg',
  }

  // Core Values (IMPACT) Data from API with fallback to translations
  const coreValues = useMemo(() => {
    const letters = ['I', 'M', 'P', 'A', 'C', 'T'];
    const values: Record<string, { title: string; subtitle: string; description: string }> = {};

    letters.forEach(letter => {
      const sectionKey = `company_profile_impact_${letter}`;
      const section = contentSections.find(s => s.sectionKey === sectionKey);

      console.log(`[CompanyProfile] Matching IMPACT letter ${letter} with key ${sectionKey}:`, section ? 'FOUND' : 'NOT FOUND');

      if (section?.translations?.[locale]) {
        values[letter] = {
          title: section.translations[locale].title,
          subtitle: section.translations[locale].subtitle,
          description: section.translations[locale].description
        };
      }
      else if (section?.title) {
        values[letter] = {
          title: section.title,
          subtitle: section.subtitle || '',
          description: section.description || section.content || ''
        };
      }
      else {
        values[letter] = companyProfile?.coreValues?.values?.[letter as keyof typeof companyProfile.coreValues.values] || {
          title: '', subtitle: '', description: ''
        };
      }
    });

    return values;
  }, [contentSections, companyProfile, locale]);

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
              <ScrollAnimation direction="left" delay={200} duration={600}>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0498da]/10 rounded-full mb-4">
                    <span className="text-xs font-semibold text-[#0498da]">
                      {companyProfile?.vision.badge || 'VISI KAMI'}
                    </span>
                  </div>
                  {isLoading ? (
                    <div className="animate-pulse space-y-4">
                      <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-4xl sm:text-5xl font-display font-bold italic text-gray-900 mb-5">
                        {visionData.title}
                      </h2>
                      <p className="text-base lg:text-lg text-gray-700 leading-relaxed font-light text-justify">
                        {visionData.description}
                      </p>
                    </>
                  )}
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
            </div >
          </div >
        </div >
      </section >

      {/* Mission Section */}
      < section className="py-12 lg:py-16 bg-white relative overflow-hidden" >
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
                  {isLoading ? (
                    <div className="animate-pulse space-y-4">
                      <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-4xl sm:text-5xl font-display font-bold italic text-gray-900 mb-5">
                        {missionData.title}
                      </h2>
                      <div className="space-y-3">
                        {missionData.description.split('\n').filter((line: string) => line.trim()).map((item: string, index: number) => (
                          <p key={index} className="text-base lg:text-lg text-gray-700 leading-relaxed font-light text-justify">
                            {item.startsWith('•') ? item : `• ${item}`}
                          </p>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section >

      {/* AGILE Core Values Section - Ultra Modern & Compact */}
      < section className="py-12 lg:py-16 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden" >
        {/* Animated Background */}
        < div className="absolute inset-0 overflow-hidden pointer-events-none" >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#0498da]/8 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#71bf44]/8 to-transparent rounded-full blur-3xl"></div>
        </div >

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
                    className={`relative px-5 py-2.5 rounded-full font-black text-sm transition-all duration-300 transform hover:scale-105 ${activeAgile === letter
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
      </section >

      {/* Our IMPACT Section - Ultra Modern & Compact */}
      < section className="py-12 lg:py-16 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden" >
        {/* Animated Background */}
        < div className="absolute inset-0 overflow-hidden pointer-events-none" >
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#0498da]/8 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#71bf44]/8 to-transparent rounded-full blur-3xl"></div>
        </div >

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Compact Header */}
            <ScrollAnimation direction="fade" delay={0} duration={600}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full mb-4 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-[#0498da] rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.15em]">
                    {companyProfile?.coreValues.badge || 'Our IMPACT'}
                  </span>
                  <div className="w-1.5 h-1.5 bg-[#71bf44] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black mb-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  {companyProfile?.coreValues.impact || 'Our IMPACT'}
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
                    className={`relative px-5 py-2.5 rounded-full font-black text-sm transition-all duration-300 transform hover:scale-105 ${activeValue === letter
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
                          {activeValue} {companyProfile?.coreValues.fromImpact || 'dari Our IMPACT'}
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
      </section >
    </main >
  )
}

