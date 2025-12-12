'use client'

import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrollAnimation from '@/components/ScrollAnimation'
import { fetchPublicData, API_ENDPOINTS, API_BASE_URL } from '@/lib/api-config'

interface ApiResponse {
  success?: boolean
  message?: string
  error?: string
  errors?: Record<string, string | string[]> | string
  data?: any
  raw?: string
}

interface JobPosting {
  jobId: number
  jobCode: string
  slug: string
  department: string
  jobType: string
  jobLevel: string
  workLocation: string
  city: string
  country: string
  salaryMin?: number
  salaryMax?: number
  salaryCurrency?: string
  salaryPeriod?: string
  showSalary: boolean
  positions: number
  viewCount: number
  applicationCount: number
  isFeatured?: boolean
  publishedAt?: string
  translations?: Array<{
    locale: string
    title: string
    shortDescription: string
    description?: string
  }>
}

interface JobApplicationFormData {
  jobId: number
  applicantName: string
  applicantEmail: string
  applicantPhone: string
  currentCompany?: string
  currentPosition?: string
  yearsOfExperience?: number
  expectedSalary?: number
  salaryCurrency: string
  availableFrom?: string
  coverLetter?: string
  portfolioUrl?: string
  linkedinUrl?: string
  githubUrl?: string
  referralSource?: string
  cv: File | null
}

export default function CareersPage() {
  const { locale } = useLanguage()
  const [jobs, setJobs] = useState<JobPosting[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [formData, setFormData] = useState<JobApplicationFormData>({
    jobId: 0,
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    currentCompany: '',
    currentPosition: '',
    yearsOfExperience: undefined,
    expectedSalary: undefined,
    salaryCurrency: 'IDR',
    availableFrom: '',
    coverLetter: '',
    portfolioUrl: '',
    linkedinUrl: '',
    githubUrl: '',
    referralSource: 'website',
    cv: null,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const fetchJobPostings = useCallback(async () => {
    setLoading(true)
    try {
      const result = await fetchPublicData<JobPosting[]>(
        `${API_ENDPOINTS.PUBLIC.JOB_POSTINGS.LIST}?locale=${locale}&isActive=true`
      )
      
      if (result.success && Array.isArray(result.data)) {
        setJobs(result.data)
      } else {
        setJobs([])
      }
    } catch (error) {
      console.error('Error fetching job postings:', error)
      setJobs([])
    } finally {
      setLoading(false)
    }
  }, [locale])

  useEffect(() => {
    fetchJobPostings()
  }, [fetchJobPostings])

  const handleOpenApplicationForm = (job: JobPosting) => {
    setSelectedJob(job)
    setFormData({
      ...formData,
      jobId: job.jobId,
    })
    setShowApplicationForm(true)
    setSubmitSuccess(false)
    setErrors({})
  }

  const handleCloseApplicationForm = () => {
    setShowApplicationForm(false)
    setSelectedJob(null)
    setFormData({
      jobId: 0,
      applicantName: '',
      applicantEmail: '',
      applicantPhone: '',
      currentCompany: '',
      currentPosition: '',
      yearsOfExperience: undefined,
      expectedSalary: undefined,
      salaryCurrency: 'IDR',
      availableFrom: '',
      coverLetter: '',
      portfolioUrl: '',
      linkedinUrl: '',
      githubUrl: '',
      referralSource: 'website',
      cv: null,
    })
    setErrors({})
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, cv: file }))
    if (errors.cv) {
      setErrors(prev => ({ ...prev, cv: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!formData.jobId) {
      newErrors.jobId = locale === 'id' ? 'Pilih posisi yang dilamar' : 'Please select a position'
    }
    if (!formData.applicantName.trim()) {
      newErrors.applicantName = locale === 'id' ? 'Nama wajib diisi' : 'Name is required'
    }
    if (!formData.applicantEmail.trim()) {
      newErrors.applicantEmail = locale === 'id' ? 'Email wajib diisi' : 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.applicantEmail)) {
      newErrors.applicantEmail = locale === 'id' ? 'Format email tidak valid' : 'Invalid email format'
    }
    if (!formData.applicantPhone || !formData.applicantPhone.trim()) {
      newErrors.applicantPhone = locale === 'id' ? 'Nomor telepon wajib diisi' : 'Phone number is required'
    }
    if (!formData.cv) {
      newErrors.cv = locale === 'id' ? 'CV wajib diupload' : 'CV is required'
    } else if (formData.cv.size > 10 * 1024 * 1024) {
      newErrors.cv = locale === 'id' ? 'Ukuran file maksimal 10MB' : 'File size maximum 10MB'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      // Validate jobId
      if (!formData.jobId || formData.jobId === 0) {
        setErrors({ submit: locale === 'id' ? 'Pilih posisi yang akan dilamar' : 'Please select a job position' })
        setIsSubmitting(false)
        return
      }

      const formDataToSend = new FormData()
      
      // Required fields
      formDataToSend.append('jobId', formData.jobId.toString())
      formDataToSend.append('applicantName', formData.applicantName.trim())
      formDataToSend.append('applicantEmail', formData.applicantEmail.trim())
      formDataToSend.append('applicantPhone', formData.applicantPhone.trim())
      
      // Optional fields - hanya append jika ada value
      if (formData.currentCompany && formData.currentCompany.trim()) {
        formDataToSend.append('currentCompany', formData.currentCompany.trim())
      }
      if (formData.currentPosition && formData.currentPosition.trim()) {
        formDataToSend.append('currentPosition', formData.currentPosition.trim())
      }
      if (formData.yearsOfExperience !== undefined && formData.yearsOfExperience !== null) {
        formDataToSend.append('yearsOfExperience', formData.yearsOfExperience.toString())
      }
      if (formData.expectedSalary !== undefined && formData.expectedSalary !== null) {
        formDataToSend.append('expectedSalary', formData.expectedSalary.toString())
      }
      if (formData.salaryCurrency && formData.salaryCurrency.trim()) {
        formDataToSend.append('salaryCurrency', formData.salaryCurrency.trim())
      }
      if (formData.availableFrom && formData.availableFrom.trim()) {
        formDataToSend.append('availableFrom', formData.availableFrom.trim())
      }
      if (formData.coverLetter && formData.coverLetter.trim()) {
        formDataToSend.append('coverLetter', formData.coverLetter.trim())
      }
      if (formData.portfolioUrl && formData.portfolioUrl.trim()) {
        formDataToSend.append('portfolioUrl', formData.portfolioUrl.trim())
      }
      if (formData.linkedinUrl && formData.linkedinUrl.trim()) {
        formDataToSend.append('linkedinUrl', formData.linkedinUrl.trim())
      }
      if (formData.githubUrl && formData.githubUrl.trim()) {
        formDataToSend.append('githubUrl', formData.githubUrl.trim())
      }
      if (formData.referralSource && formData.referralSource.trim()) {
        formDataToSend.append('referralSource', formData.referralSource.trim())
      }
      
      // CV file - required
      if (formData.cv) {
        formDataToSend.append('cv', formData.cv, formData.cv.name)
      } else {
        setErrors({ cv: locale === 'id' ? 'CV wajib diupload' : 'CV is required' })
        setIsSubmitting(false)
        return
      }

      // Log form data untuk debugging (tanpa file)
      console.log('Submitting job application:', {
        jobId: formData.jobId,
        applicantName: formData.applicantName,
        applicantEmail: formData.applicantEmail,
        applicantPhone: formData.applicantPhone,
        hasCV: !!formData.cv,
        cvFileName: formData.cv?.name,
        cvFileSize: formData.cv?.size,
      })

      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PUBLIC.JOB_APPLICATIONS.APPLY}`, {
        method: 'POST',
        body: formDataToSend,
      })

      // Log response untuk debugging
      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)

      let result: ApiResponse = {}
      try {
        const text = await response.text()
        console.log('=== RESPONSE RECEIVED ===')
        console.log('Status:', response.status)
        console.log('Status Text:', response.statusText)
        console.log('Response Text (raw):', text)
        
        if (text) {
          try {
            result = JSON.parse(text) as ApiResponse
            console.log('Parsed Response:', JSON.stringify(result, null, 2))
          } catch (parseError) {
            console.error('Error parsing JSON:', parseError)
            console.error('Raw text:', text)
            result = { error: text, raw: text }
          }
        }
        console.log('========================')
      } catch (error) {
        console.error('Error reading response:', error)
        setErrors({ submit: locale === 'id' ? 'Terjadi kesalahan saat memproses response dari server' : 'Error processing server response' })
        setIsSubmitting(false)
        return
      }

      if (!response.ok) {
        // Handle error response - tampilkan detail error dengan jelas
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        
        // Extract error message dari berbagai format response
        if (result.message) {
          errorMessage = result.message
        } else if (result.error) {
          errorMessage = result.error
        } else if (result.errors) {
          // Handle validation errors
          if (typeof result.errors === 'object') {
            const errorArray = Object.entries(result.errors).map(([field, messages]) => {
              if (Array.isArray(messages)) {
                return `${field}: ${messages.join(', ')}`
              }
              return `${field}: ${messages}`
            })
            errorMessage = errorArray.join('; ')
          } else if (typeof result.errors === 'string') {
            errorMessage = result.errors
          }
        }
        
        // Log error dengan detail lengkap
        console.error('=== SUBMISSION ERROR ===')
        console.error('Status:', response.status)
        console.error('Status Text:', response.statusText)
        console.error('Full Response:', JSON.stringify(result, null, 2))
        console.error('Error Message:', errorMessage)
        console.error('=======================')
        
        setErrors({ 
          submit: errorMessage || (locale === 'id' ? 'Gagal mengirim aplikasi. Silakan coba lagi.' : 'Failed to submit application. Please try again.') 
        })
        setIsSubmitting(false)
        return
      }

      if (result.success) {
        setSubmitSuccess(true)
        // Reset form after 3 seconds
        setTimeout(() => {
          handleCloseApplicationForm()
        }, 3000)
        // Refresh job list to update application count
        fetchJobPostings()
      } else {
        const errorMessage = result.message || result.error || 
          (result.errors ? Object.values(result.errors).flat().join(', ') : null) ||
          (locale === 'id' ? 'Gagal mengirim aplikasi' : 'Failed to submit application')
        setErrors({ submit: errorMessage })
      }
    } catch (error: any) {
      console.error('Network error:', error)
      setErrors({ 
        submit: error.message || (locale === 'id' ? 'Terjadi kesalahan saat mengirim aplikasi. Pastikan koneksi internet Anda stabil.' : 'An error occurred while submitting application. Please check your internet connection.') 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getJobTitle = (job: JobPosting) => {
    const translation = job.translations?.find(t => t.locale === locale)
    return translation?.title || `Job ${job.jobCode}`
  }

  const getJobDescription = (job: JobPosting) => {
    const translation = job.translations?.find(t => t.locale === locale)
    return translation?.shortDescription || ''
  }

  const formatSalary = (job: JobPosting) => {
    if (!job.showSalary || !job.salaryMin) return null
    const min = job.salaryMin.toLocaleString('id-ID')
    const max = job.salaryMax ? job.salaryMax.toLocaleString('id-ID') : null
    const currency = job.salaryCurrency || 'IDR'
    const period = job.salaryPeriod === 'monthly' ? '/bulan' : job.salaryPeriod === 'yearly' ? '/tahun' : ''
    
    if (max) {
      return `${currency} ${min} - ${max} ${period}`
    }
    return `${currency} ${min} ${period}`
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-24 pb-6 lg:pb-8 bg-gradient-to-br from-[#0498da]/5 via-white to-[#71bf44]/5 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#0498da]/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#71bf44]/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollAnimation direction="fade" delay={0} duration={800}>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0498da]/10 rounded-full mb-4">
                <div className="w-1.5 h-1.5 bg-[#0498da] rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-[#0498da]">
                  {locale === 'id' ? 'Karir di KelolaAja' : 'Careers at KelolaAja'}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-gray-900 mb-4 leading-tight">
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

      {/* Process Section */}
      <section className="py-6 lg:py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation direction="fade" delay={100} duration={600}>
              <div className="text-center mb-6">
                <h2 className="text-lg lg:text-xl font-display font-bold text-gray-900 mb-2">
                  {locale === 'id' ? 'Proses Rekrutmen' : 'Recruitment Process'}
                </h2>
                <p className="text-xs lg:text-sm text-gray-600">
                  {locale === 'id' ? 'Proses yang sederhana dan transparan' : 'Simple and transparent process'}
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="fade" delay={150} duration={600}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { 
                    step: locale === 'id' ? '1' : '1', 
                    title: locale === 'id' ? 'Kirim Aplikasi' : 'Submit Application',
                    icon: (
                      <svg className="w-6 h-6 text-[#0498da]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )
                  },
                  { 
                    step: locale === 'id' ? '2' : '2', 
                    title: locale === 'id' ? 'Review CV' : 'CV Review',
                    icon: (
                      <svg className="w-6 h-6 text-[#0498da]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )
                  },
                  { 
                    step: locale === 'id' ? '3' : '3', 
                    title: locale === 'id' ? 'Interview' : 'Interview',
                    icon: (
                      <svg className="w-6 h-6 text-[#0498da]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    )
                  },
                  { 
                    step: locale === 'id' ? '4' : '4', 
                    title: locale === 'id' ? 'Onboarding' : 'Onboarding',
                    icon: (
                      <svg className="w-6 h-6 text-[#0498da]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-[#0498da]/50 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-center mb-2 w-10 h-10 mx-auto bg-gradient-to-br from-[#0498da]/10 to-[#71bf44]/10 rounded-lg">
                      {item.icon}
                    </div>
                    <div className="text-xs font-semibold text-[#0498da] mb-1">STEP {item.step}</div>
                    <h3 className="text-xs font-semibold text-gray-900 leading-tight">
                      {item.title}
                    </h3>
                  </div>
                ))}
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Job Postings Section */}
      <section className="py-8 lg:py-10 bg-gradient-to-b from-gray-50 via-white to-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <ScrollAnimation direction="fade" delay={100} duration={600}>
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-display font-bold text-gray-900 mb-2">
                  {locale === 'id' ? 'Lowongan Pekerjaan' : 'Job Openings'}
                </h2>
                <p className="text-sm lg:text-base text-gray-600">
                  {locale === 'id' ? 'Temukan posisi yang sesuai dengan passion dan keahlian Anda' : 'Find the position that matches your passion and skills'}
                </p>
              </div>
            </ScrollAnimation>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0498da]"></div>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600">
                  {locale === 'id' ? 'Tidak ada lowongan yang tersedia saat ini' : 'No job openings available at the moment'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <ScrollAnimation key={job.jobId} direction="fade" delay={100} duration={600}>
                    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#0498da]/50 hover:shadow-lg transition-all duration-300 flex flex-col">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                              {getJobTitle(job)}
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className="px-2 py-1 text-xs font-medium bg-[#0498da]/10 text-[#0498da] rounded-full">
                                {job.department}
                              </span>
                              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                                {job.jobType}
                              </span>
                              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                                {job.workLocation}
                              </span>
                            </div>
                          </div>
                          {job.isFeatured && (
                            <span className="px-2 py-1 text-xs font-semibold bg-gradient-to-r from-[#0498da] to-[#71bf44] text-white rounded-full">
                              {locale === 'id' ? 'Featured' : 'Featured'}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {getJobDescription(job)}
                        </p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{job.city}, {job.country}</span>
                          </div>
                          {formatSalary(job) && (
                            <div className="flex items-center gap-2 text-xs font-semibold text-[#0498da]">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{formatSalary(job)}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{job.applicationCount} {locale === 'id' ? 'pelamar' : 'applicants'}</span>
                            <span>{job.viewCount} {locale === 'id' ? 'dilihat' : 'views'}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenApplicationForm(job)}
                        className="w-full mt-4 px-4 py-2.5 bg-gradient-to-r from-[#0498da] to-[#71bf44] text-white text-sm font-semibold rounded-lg hover:from-[#0388c2] hover:to-[#5fa836] transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                      >
                        {locale === 'id' ? 'Lamar Sekarang' : 'Apply Now'}
                      </button>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      {showApplicationForm && selectedJob && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 lg:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl lg:text-2xl font-display font-bold text-gray-900 mb-1">
                  {locale === 'id' ? 'Formulir Aplikasi' : 'Application Form'}
                </h2>
                <p className="text-sm text-gray-600">
                  {getJobTitle(selectedJob)} - {selectedJob.department}
                </p>
              </div>
              <button
                onClick={handleCloseApplicationForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {submitSuccess ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {locale === 'id' ? 'Aplikasi Berhasil Dikirim!' : 'Application Submitted Successfully!'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'id' 
                    ? 'Terima kasih telah melamar. Tim kami akan menghubungi Anda segera.' 
                    : 'Thank you for applying. Our team will contact you soon.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Applicant Name */}
                <div>
                  <label htmlFor="applicantName" className="block text-sm font-semibold text-gray-900 mb-2">
                    {locale === 'id' ? 'Nama Lengkap' : 'Full Name'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="applicantName"
                    name="applicantName"
                    value={formData.applicantName}
                    onChange={handleChange}
                    placeholder={locale === 'id' ? 'Masukkan nama lengkap' : 'Enter your full name'}
                    className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0498da] focus:border-[#0498da] transition-all ${
                      errors.applicantName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                    }`}
                  />
                  {errors.applicantName && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.applicantName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="applicantEmail" className="block text-sm font-semibold text-gray-900 mb-2">
                    {locale === 'id' ? 'Email' : 'Email'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="applicantEmail"
                    name="applicantEmail"
                    value={formData.applicantEmail}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0498da] focus:border-[#0498da] transition-all ${
                      errors.applicantEmail ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                    }`}
                  />
                  {errors.applicantEmail && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.applicantEmail}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="applicantPhone" className="block text-sm font-semibold text-gray-900 mb-2">
                    {locale === 'id' ? 'Nomor Telepon' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    id="applicantPhone"
                    name="applicantPhone"
                    value={formData.applicantPhone}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0498da] focus:border-[#0498da] transition-all"
                  />
                </div>

                {/* Current Company & Position */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="currentCompany" className="block text-sm font-semibold text-gray-900 mb-2">
                      {locale === 'id' ? 'Perusahaan Saat Ini' : 'Current Company'}
                    </label>
                    <input
                      type="text"
                      id="currentCompany"
                      name="currentCompany"
                      value={formData.currentCompany}
                      onChange={handleChange}
                      placeholder={locale === 'id' ? 'Nama perusahaan' : 'Company name'}
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0498da] focus:border-[#0498da] transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="currentPosition" className="block text-sm font-semibold text-gray-900 mb-2">
                      {locale === 'id' ? 'Posisi Saat Ini' : 'Current Position'}
                    </label>
                    <input
                      type="text"
                      id="currentPosition"
                      name="currentPosition"
                      value={formData.currentPosition}
                      onChange={handleChange}
                      placeholder={locale === 'id' ? 'Jabatan' : 'Position'}
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0498da] focus:border-[#0498da] transition-all"
                    />
                  </div>
                </div>

                {/* Years of Experience & Expected Salary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="yearsOfExperience" className="block text-sm font-semibold text-gray-900 mb-2">
                      {locale === 'id' ? 'Pengalaman (Tahun)' : 'Years of Experience'}
                    </label>
                    <input
                      type="number"
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience || ''}
                      onChange={handleChange}
                      min="0"
                      placeholder="0"
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0498da] focus:border-[#0498da] transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="expectedSalary" className="block text-sm font-semibold text-gray-900 mb-2">
                      {locale === 'id' ? 'Gaji yang Diharapkan' : 'Expected Salary'}
                    </label>
                    <input
                      type="number"
                      id="expectedSalary"
                      name="expectedSalary"
                      value={formData.expectedSalary || ''}
                      onChange={handleChange}
                      min="0"
                      placeholder="0"
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0498da] focus:border-[#0498da] transition-all"
                    />
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-semibold text-gray-900 mb-2">
                    {locale === 'id' ? 'Surat Lamaran' : 'Cover Letter'}
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    rows={4}
                    placeholder={locale === 'id' ? 'Tuliskan surat lamaran Anda...' : 'Write your cover letter...'}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0498da] focus:border-[#0498da] transition-all resize-none"
                  />
                </div>

                {/* Portfolio URLs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="linkedinUrl" className="block text-sm font-semibold text-gray-900 mb-2">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      id="linkedinUrl"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0498da] focus:border-[#0498da] transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="githubUrl" className="block text-sm font-semibold text-gray-900 mb-2">
                      GitHub
                    </label>
                    <input
                      type="url"
                      id="githubUrl"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleChange}
                      placeholder="https://github.com/..."
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0498da] focus:border-[#0498da] transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="portfolioUrl" className="block text-sm font-semibold text-gray-900 mb-2">
                      {locale === 'id' ? 'Portfolio' : 'Portfolio'}
                    </label>
                    <input
                      type="url"
                      id="portfolioUrl"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0498da] focus:border-[#0498da] transition-all"
                    />
                  </div>
                </div>

                {/* CV Upload */}
                <div>
                  <label htmlFor="cv" className="block text-sm font-semibold text-gray-900 mb-2">
                    {locale === 'id' ? 'Upload CV' : 'Upload CV'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="cv"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="cv"
                    className={`flex items-center justify-between w-full px-4 py-3 text-sm border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                      errors.cv
                        ? 'border-red-500 bg-red-50'
                        : formData.cv
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 bg-gray-50 hover:border-[#0498da]'
                    }`}
                  >
                    <span className={`font-medium ${
                      errors.cv ? 'text-red-700' : formData.cv ? 'text-green-700' : 'text-gray-700'
                    }`}>
                      {formData.cv
                        ? formData.cv.name
                        : locale === 'id'
                        ? 'Pilih file CV (PDF, DOC, DOCX) - Max 10MB'
                        : 'Choose CV file (PDF, DOC, DOCX) - Max 10MB'}
                    </span>
                    <svg className={`w-5 h-5 ${
                      errors.cv ? 'text-red-500' : formData.cv ? 'text-green-500' : 'text-gray-400'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </label>
                  {errors.cv && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.cv}</p>
                  )}
                </div>

                {errors.submit && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{errors.submit}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={handleCloseApplicationForm}
                    className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {locale === 'id' ? 'Batal' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#0498da] to-[#71bf44] rounded-lg hover:from-[#0388c2] hover:to-[#5fa836] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting
                      ? (locale === 'id' ? 'Mengirim...' : 'Submitting...')
                      : (locale === 'id' ? 'Kirim Aplikasi' : 'Submit Application')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
