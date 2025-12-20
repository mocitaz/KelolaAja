'use client';

import { useEffect, useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import { apiFetch, API_ENDPOINTS } from '@/lib/api-config';
import PageHeader from '@/components/admin/PageHeader';
import AdminCard from '@/components/admin/AdminCard';
import AdminModal from '@/components/admin/AdminModal';
import SearchBar from '@/components/admin/SearchBar';

interface JobPostingTranslation {
  locale: string;
  title: string;
  shortDescription: string;
  description: string;
  qualifications?: string;
  additionalInfo?: string;
}

interface JobRequirement {
  locale: string;
  requirement: string;
  isRequired: boolean;
  displayOrder: number;
}

interface JobResponsibility {
  locale: string;
  responsibility: string;
  displayOrder: number;
}

interface JobBenefit {
  locale: string;
  benefit: string;
  description?: string;
  iconName?: string;
  displayOrder: number;
}

interface JobPosting {
  jobId: number;
  jobCode: string;
  slug: string;
  department: string;
  jobType: string;
  jobLevel: string;
  workLocation: string;
  city: string;
  country: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  salaryPeriod?: string;
  showSalary: boolean;
  positions: number;
  experienceYears?: number;
  applicationDeadline?: string;
  isActive: boolean;
  isFeatured: boolean;
  publishedAt?: string;
  viewCount: number;
  applicationCount: number;
  translations?: JobPostingTranslation[] | Record<string, any>;
  requirements?: JobRequirement[];
  responsibilities?: JobResponsibility[];
  benefits?: JobBenefit[];
  createdAt?: string;
  updatedAt?: string;
}

export default function JobPostingsPage() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
  const [stats, setStats] = useState({ total: 0, active: 0, pending: 0 });

  useEffect(() => {
    fetchJobPostings();
    fetchStats();
  }, []);

  const fetchJobPostings = async () => {
    try {
      const response = await apiFetch(API_ENDPOINTS.ADMIN.JOB_POSTINGS.LIST);
      const data = await response.json();
      if (data.success) {
        setJobPostings(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching job postings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await apiFetch(API_ENDPOINTS.ADMIN.JOB_POSTINGS.STATS);
      const data = await response.json();
      if (data.success) {
        setStats({
          total: data.data.totalJobs || 0,
          active: data.data.activeJobs || 0,
          pending: data.data.pendingApplications || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleDelete = async (jobId: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus lowongan ini?')) return;

    try {
      await apiFetch(API_ENDPOINTS.ADMIN.JOB_POSTINGS.DELETE(jobId), {
        method: 'DELETE',
      });
      fetchJobPostings();
      fetchStats();
    } catch (error) {
      console.error('Error deleting job posting:', error);
      alert('Gagal menghapus lowongan. Silakan coba lagi.');
    }
  };

  const getJobContent = (job: JobPosting, locale: string = 'id') => {
    let content: JobPostingTranslation | undefined;

    if (Array.isArray(job.translations)) {
      content = job.translations.find(t => t.locale === locale);
      if (!content && job.translations.length > 0) content = job.translations[0];
    } else if (job.translations && typeof job.translations === 'object') {
      // @ts-ignore
      const trans = job.translations[locale];
      if (trans) {
        content = {
          locale,
          title: trans.title || '',
          shortDescription: trans.shortDescription || '',
          description: trans.description || '',
          qualifications: trans.qualifications,
          additionalInfo: trans.additionalInfo
        };
      } else {
        // Fallback to first key if specific locale not found
        const keys = Object.keys(job.translations);
        if (keys.length > 0) {
          // @ts-ignore
          const first = job.translations[keys[0]];
          content = {
            locale: keys[0],
            title: first.title || '',
            shortDescription: first.shortDescription || '',
            description: first.description || '',
            qualifications: first.qualifications,
            additionalInfo: first.additionalInfo
          };
        }
      }
    }

    return content;
  };

  const filteredJobs = jobPostings.filter(job => {
    const searchLower = search.toLowerCase();
    const idContent = getJobContent(job, 'id');
    const enContent = getJobContent(job, 'en');

    return (
      job.jobCode?.toLowerCase().includes(searchLower) ||
      job.department?.toLowerCase().includes(searchLower) ||
      idContent?.title?.toLowerCase().includes(searchLower) ||
      enContent?.title?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-4">
      <PageHeader
        title="Job Postings Management"
        description="Kelola lowongan pekerjaan dan postingan karir"
        action={{
          label: 'Tambah Lowongan',
          onClick: () => {
            setEditingJob(null);
            setShowModal(true);
          },
        }}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Total Lowongan</p>
            <p className="text-xl font-bold text-gray-900">{stats.total}</p>
          </div>
        </AdminCard>
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Aktif</p>
            <p className="text-xl font-bold text-green-600">{stats.active}</p>
          </div>
        </AdminCard>
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Aplikasi Pending</p>
            <p className="text-xl font-bold text-orange-600">{stats.pending}</p>
          </div>
        </AdminCard>
      </div>

      {/* Search */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Cari berdasarkan kode, departemen, atau judul..."
      />

      {/* Job Postings List */}
      {loading ? (
        <AdminCard compact>
          <div className="p-6 text-center">
            <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-[#039edb]"></div>
            <p className="mt-2 text-xs text-gray-500">Loading...</p>
          </div>
        </AdminCard>
      ) : filteredJobs.length === 0 ? (
        <AdminCard compact>
          <div className="p-6 text-center">
            <BriefcaseIcon className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-2 text-xs text-gray-500">Tidak ada lowongan pekerjaan</p>
          </div>
        </AdminCard>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredJobs.map((job) => {
            const translation = getJobContent(job, 'id');
            return (
              <AdminCard key={job.jobId} compact>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {translation?.title || job.jobCode}
                      </h3>
                      {job.isFeatured && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-gradient-to-r from-[#039edb]/10 to-[#71bf44]/10 text-[#039edb] border border-[#039edb]/20">
                          Featured
                        </span>
                      )}
                      {!job.isActive && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-600">
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                      {translation?.shortDescription || job.department}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                      <span className="bg-gray-100 px-2 py-0.5 rounded">{job.department}</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded">{job.jobType}</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded">{job.jobLevel}</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded">{job.workLocation}</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded">{job.city}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span>👁️ {job.viewCount || 0} views</span>
                      <span>📝 {job.applicationCount || 0} aplikasi</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => {
                        setEditingJob(job);
                        setShowModal(true);
                      }}
                      className="p-1.5 text-gray-600 hover:text-[#039edb] hover:bg-[#039edb]/10 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(job.jobId)}
                      className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </AdminCard>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <JobPostingModal
          job={editingJob}
          onClose={() => {
            setShowModal(false);
            setEditingJob(null);
          }}
          onSave={() => {
            setShowModal(false);
            setEditingJob(null);
            fetchJobPostings();
            fetchStats();
          }}
        />
      )}
    </div>
  );
}

function JobPostingModal({
  job,
  onClose,
  onSave,
}: {
  job: JobPosting | null;
  onClose: () => void;
  onSave: () => void;
}) {
  // Helper to extract translations safely
  function routerTranslations(j: JobPosting | null) {
    if (!j) {
      return [
        { locale: 'id', title: '', shortDescription: '', description: '', qualifications: '', additionalInfo: '' },
        { locale: 'en', title: '', shortDescription: '', description: '', qualifications: '', additionalInfo: '' },
      ];
    }

    const getTrans = (locale: string) => {
      if (Array.isArray(j.translations)) {
        const found = j.translations.find(t => t.locale === locale);
        return found ? { ...found } : null;
      } else if (j.translations && typeof j.translations === 'object') {
        // @ts-ignore
        const trans = j.translations[locale];
        if (trans) {
          return {
            title: trans.title || '',
            shortDescription: trans.shortDescription || '',
            description: trans.description || '',
            qualifications: trans.qualifications || '',
            additionalInfo: trans.additionalInfo || ''
          };
        }
      }
      return null;
    };

    const idTrans = getTrans('id');
    const enTrans = getTrans('en');

    return [
      {
        locale: 'id',
        title: idTrans?.title || '',
        shortDescription: idTrans?.shortDescription || '',
        description: idTrans?.description || '',
        qualifications: idTrans?.qualifications || '',
        additionalInfo: idTrans?.additionalInfo || ''
      },
      {
        locale: 'en',
        title: enTrans?.title || '',
        shortDescription: enTrans?.shortDescription || '',
        description: enTrans?.description || '',
        qualifications: enTrans?.qualifications || '',
        additionalInfo: enTrans?.additionalInfo || ''
      },
    ];
  }
  const [formData, setFormData] = useState({
    jobCode: job?.jobCode || '',
    slug: job?.slug || '',
    department: job?.department || '',
    jobType: job?.jobType || 'FullTime',
    jobLevel: job?.jobLevel || 'MidLevel',
    workLocation: job?.workLocation || 'OnSite',
    city: job?.city || '',
    country: job?.country || 'Indonesia',
    salaryMin: job?.salaryMin || undefined,
    salaryMax: job?.salaryMax || undefined,
    salaryCurrency: job?.salaryCurrency || 'IDR',
    salaryPeriod: job?.salaryPeriod || 'monthly',
    showSalary: job?.showSalary ?? false,
    positions: job?.positions || 1,
    experienceYears: job?.experienceYears || undefined,
    applicationDeadline: job?.applicationDeadline ? new Date(job.applicationDeadline).toISOString().slice(0, 16) : '',
    isActive: job?.isActive ?? true,
    isFeatured: job?.isFeatured ?? false,
    publishedAt: job?.publishedAt ? new Date(job.publishedAt).toISOString().slice(0, 16) : '',
    translations: routerTranslations(job) as JobPostingTranslation[],
    requirements: job?.requirements || [],
    responsibilities: job?.responsibilities || [],
    benefits: job?.benefits || [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Transform translations array to object map
    const translationsMap: Record<string, any> = {};
    formData.translations.forEach((t: JobPostingTranslation) => {
      translationsMap[t.locale] = {
        title: t.title,
        shortDescription: t.shortDescription,
        description: t.description,
        qualifications: t.qualifications,
        additionalInfo: t.additionalInfo
      };
    });

    try {
      const submitData = {
        ...formData,
        translations: translationsMap,
        applicationDeadline: formData.applicationDeadline ? new Date(formData.applicationDeadline).toISOString() : undefined,
        publishedAt: formData.publishedAt ? new Date(formData.publishedAt).toISOString() : undefined,
      };

      const endpoint = job
        ? API_ENDPOINTS.ADMIN.JOB_POSTINGS.UPDATE(job.jobId)
        : API_ENDPOINTS.ADMIN.JOB_POSTINGS.CREATE;

      const response = await apiFetch(endpoint, {
        method: job ? 'PUT' : 'POST',
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onSave();
      } else {
        setError(data.message || 'Gagal menyimpan lowongan');
      }
    } catch (error) {
      console.error('Error saving job posting:', error);
      setError('Network error. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [
        ...formData.requirements,
        { locale: 'id', requirement: '', isRequired: true, displayOrder: formData.requirements.length + 1 },
      ],
    });
  };

  const addResponsibility = () => {
    setFormData({
      ...formData,
      responsibilities: [
        ...formData.responsibilities,
        { locale: 'id', responsibility: '', displayOrder: formData.responsibilities.length + 1 },
      ],
    });
  };

  const addBenefit = () => {
    setFormData({
      ...formData,
      benefits: [
        ...formData.benefits,
        { locale: 'id', benefit: '', description: '', iconName: '', displayOrder: formData.benefits.length + 1 },
      ],
    });
  };

  return (
    <AdminModal
      isOpen={true}
      onClose={onClose}
      title={job ? 'Edit Job Posting' : 'Tambah Job Posting'}
      size="xl"
      footer={
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-[#039edb] to-[#71bf44] rounded-lg hover:opacity-90 disabled:opacity-50 transition shadow-sm"
          >
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        {error && (
          <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}

        {/* Basic Info */}
        <div className="space-y-3 border-b border-gray-200 pb-3">
          <h3 className="text-sm font-semibold text-gray-900">Informasi Dasar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Job Code *</label>
              <input
                type="text"
                required
                value={formData.jobCode}
                onChange={(e) => setFormData({ ...formData, jobCode: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                placeholder="DEV-001"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                placeholder="senior-backend-developer"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Department *</label>
              <input
                type="text"
                required
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                placeholder="Engineering"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Job Type *</label>
              <select
                required
                value={formData.jobType}
                onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              >
                <option value="FullTime">Full Time</option>
                <option value="PartTime">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Job Level *</label>
              <select
                required
                value={formData.jobLevel}
                onChange={(e) => setFormData({ ...formData, jobLevel: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              >
                <option value="Junior">Junior</option>
                <option value="MidLevel">Mid Level</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
                <option value="Executive">Executive</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Work Location *</label>
              <select
                required
                value={formData.workLocation}
                onChange={(e) => setFormData({ ...formData, workLocation: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              >
                <option value="OnSite">On Site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">City *</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                placeholder="Jakarta"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Country *</label>
              <input
                type="text"
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                placeholder="Indonesia"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Positions *</label>
              <input
                type="number"
                required
                min="1"
                value={formData.positions}
                onChange={(e) => setFormData({ ...formData, positions: parseInt(e.target.value) })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Experience Years</label>
              <input
                type="number"
                min="0"
                value={formData.experienceYears || ''}
                onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value ? parseInt(e.target.value) : undefined })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              />
            </div>
          </div>
        </div>

        {/* Salary */}
        <div className="space-y-3 border-b border-gray-200 pb-3">
          <h3 className="text-sm font-semibold text-gray-900">Informasi Gaji</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Min Salary</label>
              <input
                type="number"
                value={formData.salaryMin || ''}
                onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value ? parseInt(e.target.value) : undefined })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Max Salary</label>
              <input
                type="number"
                value={formData.salaryMax || ''}
                onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value ? parseInt(e.target.value) : undefined })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Currency</label>
              <select
                value={formData.salaryCurrency}
                onChange={(e) => setFormData({ ...formData, salaryCurrency: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              >
                <option value="IDR">IDR</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Period</label>
              <select
                value={formData.salaryPeriod}
                onChange={(e) => setFormData({ ...formData, salaryPeriod: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showSalary"
              checked={formData.showSalary}
              onChange={(e) => setFormData({ ...formData, showSalary: e.target.checked })}
              className="h-4 w-4 text-[#039edb] focus:ring-[#039edb] border-gray-300 rounded"
            />
            <label htmlFor="showSalary" className="text-xs text-gray-700">Tampilkan Gaji</label>
          </div>
        </div>

        {/* Status & Dates */}
        <div className="space-y-3 border-b border-gray-200 pb-3">
          <h3 className="text-sm font-semibold text-gray-900">Status & Tanggal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Application Deadline</label>
              <input
                type="datetime-local"
                value={formData.applicationDeadline}
                onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Published At</label>
              <input
                type="datetime-local"
                value={formData.publishedAt}
                onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 text-[#039edb] focus:ring-[#039edb] border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="text-xs text-gray-700">Aktif</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="h-4 w-4 text-[#039edb] focus:ring-[#039edb] border-gray-300 rounded"
              />
              <label htmlFor="isFeatured" className="text-xs text-gray-700">Featured</label>
            </div>
          </div>
        </div>

        {/* Translations */}
        <div className="space-y-3 border-b border-gray-200 pb-3">
          <h3 className="text-sm font-semibold text-gray-900">Translations</h3>
          {(formData.translations as JobPostingTranslation[]).map((trans, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 text-xs font-bold rounded text-white ${trans.locale === 'id' ? 'bg-red-500' : 'bg-blue-500'}`}>
                  {trans.locale.toUpperCase()}
                </span>
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Title *"
                  required
                  value={trans.title}
                  onChange={(e) => {
                    const newTranslations = [...(formData.translations as JobPostingTranslation[])];
                    newTranslations[idx] = { ...trans, title: e.target.value };
                    setFormData({ ...formData, translations: newTranslations });
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                />
                <textarea
                  placeholder="Short Description *"
                  required
                  value={trans.shortDescription}
                  onChange={(e) => {
                    const newTranslations = [...(formData.translations as JobPostingTranslation[])];
                    newTranslations[idx] = { ...trans, shortDescription: e.target.value };
                    setFormData({ ...formData, translations: newTranslations });
                  }}
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                />
                <textarea
                  placeholder="Description *"
                  required
                  value={trans.description}
                  onChange={(e) => {
                    const newTranslations = [...(formData.translations as JobPostingTranslation[])];
                    newTranslations[idx] = { ...trans, description: e.target.value };
                    setFormData({ ...formData, translations: newTranslations });
                  }}
                  rows={4}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                />
                <textarea
                  placeholder="Qualifications"
                  value={trans.qualifications || ''}
                  onChange={(e) => {
                    const newTranslations = [...(formData.translations as JobPostingTranslation[])];
                    newTranslations[idx] = { ...trans, qualifications: e.target.value };
                    setFormData({ ...formData, translations: newTranslations });
                  }}
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                />
                <textarea
                  placeholder="Additional Info"
                  value={trans.additionalInfo || ''}
                  onChange={(e) => {
                    const newTranslations = [...(formData.translations as JobPostingTranslation[])];
                    newTranslations[idx] = { ...trans, additionalInfo: e.target.value };
                    setFormData({ ...formData, translations: newTranslations });
                  }}
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Requirements */}
        <div className="space-y-3 border-b border-gray-200 pb-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Requirements</h3>
            <button
              type="button"
              onClick={addRequirement}
              className="px-2 py-1 text-xs font-medium text-[#039edb] hover:bg-[#039edb]/10 rounded-lg transition-colors"
            >
              + Tambah
            </button>
          </div>
          {formData.requirements.map((req, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="flex items-start gap-2">
                <input
                  type="text"
                  placeholder="Requirement"
                  value={req.requirement}
                  onChange={(e) => {
                    const newRequirements = [...formData.requirements];
                    newRequirements[idx] = { ...req, requirement: e.target.value };
                    setFormData({ ...formData, requirements: newRequirements });
                  }}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newRequirements = formData.requirements.filter((_, i) => i !== idx);
                    setFormData({ ...formData, requirements: newRequirements });
                  }}
                  className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Responsibilities */}
        <div className="space-y-3 border-b border-gray-200 pb-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Responsibilities</h3>
            <button
              type="button"
              onClick={addResponsibility}
              className="px-2 py-1 text-xs font-medium text-[#039edb] hover:bg-[#039edb]/10 rounded-lg transition-colors"
            >
              + Tambah
            </button>
          </div>
          {formData.responsibilities.map((resp, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="flex items-start gap-2">
                <input
                  type="text"
                  placeholder="Responsibility"
                  value={resp.responsibility}
                  onChange={(e) => {
                    const newResponsibilities = [...formData.responsibilities];
                    newResponsibilities[idx] = { ...resp, responsibility: e.target.value };
                    setFormData({ ...formData, responsibilities: newResponsibilities });
                  }}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newResponsibilities = formData.responsibilities.filter((_, i) => i !== idx);
                    setFormData({ ...formData, responsibilities: newResponsibilities });
                  }}
                  className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Benefits</h3>
            <button
              type="button"
              onClick={addBenefit}
              className="px-2 py-1 text-xs font-medium text-[#039edb] hover:bg-[#039edb]/10 rounded-lg transition-colors"
            >
              + Tambah
            </button>
          </div>
          {formData.benefits.map((benefit, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Benefit"
                  value={benefit.benefit}
                  onChange={(e) => {
                    const newBenefits = [...formData.benefits];
                    newBenefits[idx] = { ...benefit, benefit: e.target.value };
                    setFormData({ ...formData, benefits: newBenefits });
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={benefit.description || ''}
                  onChange={(e) => {
                    const newBenefits = [...formData.benefits];
                    newBenefits[idx] = { ...benefit, description: e.target.value };
                    setFormData({ ...formData, benefits: newBenefits });
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                />
                <div className="flex items-start gap-2">
                  <input
                    type="text"
                    placeholder="Icon Name"
                    value={benefit.iconName || ''}
                    onChange={(e) => {
                      const newBenefits = [...formData.benefits];
                      newBenefits[idx] = { ...benefit, iconName: e.target.value };
                      setFormData({ ...formData, benefits: newBenefits });
                    }}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newBenefits = formData.benefits.filter((_, i) => i !== idx);
                      setFormData({ ...formData, benefits: newBenefits });
                    }}
                    className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </form>
    </AdminModal>
  );
}



