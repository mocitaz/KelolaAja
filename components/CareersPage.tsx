'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function CareersPage() {
  const { locale } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    resume: null as File | null,
    photo: null as File | null,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const title = locale === 'id' ? 'Bergabung dengan Tim Kami' : 'Join Our Team'
  const description = locale === 'id'
    ? 'Kami mencari talenta berbakat untuk bergabung dalam perjalanan inovasi KelolaAja. Dapatkan kesempatan untuk bekerja di lingkungan yang dinamis dan berkembang.'
    : 'We are looking for talented individuals to join KelolaAja\'s innovation journey. Get the opportunity to work in a dynamic and growing environment.'

  const benefits = locale === 'id'
    ? ['Kompensasi Kompetitif', 'Fleksibilitas Waktu Kerja', 'Program Pelatihan Berkala', 'Kesempatan Berkarir Global']
    : ['Competitive Compensation', 'Flexible Working Hours', 'Regular Training Programs', 'Global Career Opportunities']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'resume' | 'photo') => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, [field]: file }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = locale === 'id' ? 'Nama wajib diisi' : 'Name is required'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = locale === 'id' ? 'Nomor telepon wajib diisi' : 'Phone number is required'
    }
    if (!formData.address.trim()) {
      newErrors.address = locale === 'id' ? 'Alamat wajib diisi' : 'Address is required'
    }
    if (!formData.resume) {
      newErrors.resume = locale === 'id' ? 'Resume/CV wajib diupload' : 'Resume/CV is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    // TODO: Implement form submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert(locale === 'id' ? 'Form berhasil dikirim!' : 'Form submitted successfully!')
      setFormData({
        name: '',
        phone: '',
        address: '',
        resume: null,
        photo: null,
      })
    }, 1000)
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section - Compact & Modern */}
      <section className="relative pt-16 lg:pt-20 pb-8 lg:pb-10 bg-gradient-to-br from-[#0498da]/5 via-white to-[#71bf44]/5 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#0498da]/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#71bf44]/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollAnimation direction="fade" delay={0} duration={800}>
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0498da]/10 rounded-full mb-3">
                <div className="w-1.5 h-1.5 bg-[#0498da] rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-[#0498da]">
                  {locale === 'id' ? 'Karir di KelolaAja' : 'Careers at KelolaAja'}
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-gray-900 mb-3 leading-tight">
                {locale === 'id' ? (
                  <>
                    Bangun Karir Bersama{' '}
                    <span className="bg-gradient-to-r from-[#0498da] to-[#71bf44] bg-clip-text text-transparent">
                      KelolaAja
                    </span>
                  </>
                ) : (
                  <>
                    Build Your Career with{' '}
                    <span className="bg-gradient-to-r from-[#0498da] to-[#71bf44] bg-clip-text text-transparent">
                      KelolaAja
                    </span>
                  </>
                )}
              </h1>
              <p className="text-sm lg:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {locale === 'id'
                  ? 'Bergabunglah dengan tim inovatif yang membentuk masa depan teknologi ERP di Indonesia. Di KelolaAja, setiap talenta memiliki kesempatan untuk berkembang, berinovasi, dan memberikan dampak nyata bagi bisnis Indonesia.'
                  : 'Join an innovative team shaping the future of ERP technology in Indonesia. At KelolaAja, every talent has the opportunity to grow, innovate, and make a real impact on Indonesian businesses.'}
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Benefits Section - Compact & Modern */}
      <section className="py-6 lg:py-8 bg-white relative border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <ScrollAnimation direction="up" delay={100} duration={600}>
              <div className="text-center mb-5">
                <h2 className="text-lg lg:text-xl font-display font-bold text-gray-900 mb-2">
                  {locale === 'id' ? 'Mengapa Bergabung dengan Kami?' : 'Why Join Us?'}
                </h2>
                <p className="text-gray-600 text-xs lg:text-sm max-w-2xl mx-auto leading-relaxed">
                  {locale === 'id'
                    ? 'Kami mencari individu yang passionate tentang teknologi dan inovasi. Di KelolaAja, setiap kontribusi Anda dihargai, setiap ide didengar, dan setiap pencapaian dirayakan.'
                    : 'We are looking for individuals passionate about technology and innovation. At KelolaAja, every contribution is valued, every idea is heard, and every achievement is celebrated.'}
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={150} duration={600}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 lg:gap-3">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3.5 border border-gray-200 hover:border-[#0498da]/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#0498da]/10 to-[#71bf44]/10 rounded-lg flex items-center justify-center mb-2.5 group-hover:scale-110 group-hover:from-[#0498da]/20 group-hover:to-[#71bf44]/20 transition-all duration-300">
                        <svg className="w-5 h-5 text-[#0498da]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xs font-semibold text-gray-900 group-hover:text-[#0498da] transition-colors leading-tight">
                        {benefit}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Main Content - 2 Column Layout */}
      <section className="py-6 lg:py-8 bg-gradient-to-b from-gray-50 via-white to-white relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Left: Benefits Card - Sticky */}
              <div className="lg:col-span-1">
                <ScrollAnimation direction="right" delay={100} duration={600}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 sticky top-24 hover:shadow-xl transition-shadow duration-300">
                    <div className="mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0498da] to-[#71bf44] rounded-xl flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {locale === 'id' ? 'Keuntungan Bergabung' : 'Why Join Us'}
                      </h2>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {locale === 'id'
                          ? 'Dapatkan pengalaman kerja terbaik di industri teknologi'
                          : 'Get the best work experience in the technology industry'}
                      </p>
                    </div>
                    <div className="space-y-3">
                      {benefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#0498da]/10 to-[#71bf44]/10 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-[#0498da]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                              {benefit}
                            </h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollAnimation>
              </div>

              {/* Right: Application Form */}
              <div className="lg:col-span-2">
                <ScrollAnimation direction="left" delay={150} duration={600}>
                  <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#0498da] to-[#71bf44] rounded-xl flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-xl lg:text-2xl font-display font-bold text-gray-900">
                            {locale === 'id' ? 'Formulir Aplikasi' : 'Application Form'}
                          </h2>
                          <p className="text-sm text-gray-600 mt-1">
                            {locale === 'id'
                              ? 'Lengkapi data diri Anda untuk melamar posisi di KelolaAja'
                              : 'Complete your information to apply for a position at KelolaAja'}
                          </p>
                        </div>
                      </div>
                      <div className="h-1 w-20 bg-gradient-to-r from-[#0498da] to-[#71bf44] rounded-full"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                          {locale === 'id' ? 'Nama Lengkap' : 'Full Name'} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 01 8 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={locale === 'id' ? 'Masukkan nama lengkap' : 'Enter your full name'}
                            className={`w-full pl-12 pr-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0498da] focus:border-[#0498da] transition-all ${
                              errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                            }`}
                          />
                        </div>
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                          {locale === 'id' ? 'Nomor Telepon' : 'Phone Number'} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={locale === 'id' ? '08xxxxxxxxxx' : '08xxxxxxxxxx'}
                            className={`w-full pl-12 pr-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0498da] focus:border-[#0498da] transition-all ${
                              errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                            }`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Address */}
                      <div>
                        <label htmlFor="address" className="block text-sm font-semibold text-gray-900 mb-2">
                          {locale === 'id' ? 'Alamat Lengkap' : 'Full Address'} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute top-3 left-4 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows={3}
                            placeholder={locale === 'id' ? 'Masukkan alamat lengkap' : 'Enter your full address'}
                            className={`w-full pl-12 pr-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0498da] focus:border-[#0498da] transition-all resize-none ${
                              errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                            }`}
                          />
                        </div>
                        {errors.address && (
                          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {errors.address}
                          </p>
                        )}
                      </div>

                      {/* Resume/CV Upload */}
                      <div>
                        <label htmlFor="resume" className="block text-sm font-semibold text-gray-900 mb-2">
                          {locale === 'id' ? 'Upload Resume/CV' : 'Upload Resume/CV'} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            id="resume"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleFileChange(e, 'resume')}
                            className="hidden"
                          />
                          <label
                            htmlFor="resume"
                            className={`flex items-center justify-between w-full px-4 py-3.5 text-sm border-2 border-dashed rounded-xl cursor-pointer transition-all group ${
                              errors.resume
                                ? 'border-red-500 bg-red-50 hover:bg-red-100'
                                : formData.resume
                                ? 'border-green-500 bg-green-50 hover:bg-green-100'
                                : 'border-gray-300 bg-gray-50 hover:border-[#0498da] hover:bg-[#0498da]/5'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                errors.resume
                                  ? 'bg-red-100'
                                  : formData.resume
                                  ? 'bg-green-100'
                                  : 'bg-gray-200 group-hover:bg-[#0498da]/10'
                              }`}>
                                <svg className={`w-5 h-5 ${
                                  errors.resume
                                    ? 'text-red-600'
                                    : formData.resume
                                    ? 'text-green-600'
                                    : 'text-gray-500 group-hover:text-[#0498da]'
                                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                              </div>
                              <span className={`font-medium ${
                                errors.resume
                                  ? 'text-red-700'
                                  : formData.resume
                                  ? 'text-green-700'
                                  : 'text-gray-700'
                              }`}>
                                {formData.resume
                                  ? formData.resume.name
                                  : locale === 'id'
                                  ? 'Pilih file Resume/CV (PDF, DOC, DOCX)'
                                  : 'Choose Resume/CV file (PDF, DOC, DOCX)'}
                              </span>
                            </div>
                            <svg className={`w-5 h-5 ${
                              errors.resume
                                ? 'text-red-500'
                                : formData.resume
                                ? 'text-green-500'
                                : 'text-gray-400 group-hover:text-[#0498da]'
                            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </label>
                        </div>
                        {errors.resume && (
                          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {errors.resume}
                          </p>
                        )}
                        {formData.resume && !errors.resume && (
                          <p className="mt-1.5 text-xs text-green-600 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {locale === 'id' ? 'File berhasil diupload' : 'File uploaded successfully'}
                          </p>
                        )}
                      </div>

                      {/* Photo Upload */}
                      <div>
                        <label htmlFor="photo" className="block text-sm font-semibold text-gray-900 mb-2">
                          {locale === 'id' ? 'Upload Foto' : 'Upload Photo'} <span className="text-gray-500 text-xs font-normal">({locale === 'id' ? 'Opsional' : 'Optional'})</span>
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            id="photo"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, 'photo')}
                            className="hidden"
                          />
                          <label
                            htmlFor="photo"
                            className={`flex items-center justify-between w-full px-4 py-3.5 text-sm border-2 border-dashed rounded-xl cursor-pointer transition-all group ${
                              formData.photo
                                ? 'border-green-500 bg-green-50 hover:bg-green-100'
                                : 'border-gray-300 bg-gray-50 hover:border-[#0498da] hover:bg-[#0498da]/5'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                formData.photo
                                  ? 'bg-green-100'
                                  : 'bg-gray-200 group-hover:bg-[#0498da]/10'
                              }`}>
                                <svg className={`w-5 h-5 ${
                                  formData.photo
                                    ? 'text-green-600'
                                    : 'text-gray-500 group-hover:text-[#0498da]'
                                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <span className={`font-medium ${
                                formData.photo
                                  ? 'text-green-700'
                                  : 'text-gray-700'
                              }`}>
                                {formData.photo
                                  ? formData.photo.name
                                  : locale === 'id'
                                  ? 'Pilih file Foto (JPG, PNG)'
                                  : 'Choose Photo file (JPG, PNG)'}
                              </span>
                            </div>
                            <svg className={`w-5 h-5 ${
                              formData.photo
                                ? 'text-green-500'
                                : 'text-gray-400 group-hover:text-[#0498da]'
                            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </label>
                        </div>
                        {formData.photo && (
                          <p className="mt-1.5 text-xs text-green-600 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {locale === 'id' ? 'File berhasil diupload' : 'File uploaded successfully'}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full group relative px-6 py-3.5 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[#0498da] to-[#71bf44] hover:from-[#0388c2] hover:to-[#5fa836]"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                          <span className="relative flex items-center justify-center gap-2">
                            {isSubmitting ? (
                              <>
                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {locale === 'id' ? 'Mengirim...' : 'Submitting...'}
                              </>
                            ) : (
                              <>
                                {locale === 'id' ? 'Kirim Aplikasi' : 'Submit Application'}
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </>
                            )}
                          </span>
                        </button>
                        <p className="mt-3 text-xs text-gray-500 text-center">
                          {locale === 'id'
                            ? 'Dengan mengirim formulir ini, Anda menyetujui kebijakan privasi kami'
                            : 'By submitting this form, you agree to our privacy policy'}
                        </p>
                      </div>
                    </form>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

