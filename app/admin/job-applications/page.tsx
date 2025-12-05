'use client';

import { useEffect, useState, useCallback } from 'react';
import { DocumentTextIcon, EnvelopeIcon, PhoneIcon, CalendarIcon, BuildingOfficeIcon, StarIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { apiFetch, API_ENDPOINTS } from '@/lib/api-config';
import PageHeader from '@/components/admin/PageHeader';
import AdminCard from '@/components/admin/AdminCard';
import AdminModal from '@/components/admin/AdminModal';
import Pagination from '@/components/admin/Pagination';

interface JobApplication {
  applicationId: number;
  jobId: number;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  currentCompany?: string;
  currentPosition?: string;
  yearsOfExperience?: number;
  expectedSalary?: number;
  salaryCurrency?: string;
  availableFrom?: string;
  coverLetter?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  referralSource?: string;
  status: 'Pending' | 'Reviewed' | 'Shortlisted' | 'Interview' | 'Offered' | 'Rejected' | 'Accepted';
  rating?: number;
  adminNotes?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  reviewedAt?: string;
  cvFile?: {
    fileId: number;
    fileName: string;
    filePath: string;
    storageUrl?: string;
  };
  job?: {
    jobId: number;
    jobCode: string;
    translations?: Array<{
      locale: string;
      title: string;
    }>;
  };
}

const STATUS_COLORS: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Reviewed: 'bg-blue-100 text-blue-800 border-blue-200',
  Shortlisted: 'bg-purple-100 text-purple-800 border-purple-200',
  Interview: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  Offered: 'bg-green-100 text-green-800 border-green-200',
  Rejected: 'bg-red-100 text-red-800 border-red-200',
  Accepted: 'bg-emerald-100 text-emerald-800 border-emerald-200',
};

export default function JobApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterJobId, setFilterJobId] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [jobs, setJobs] = useState<Array<{ jobId: number; jobCode: string; title: string }>>([]);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(filterStatus && { status: filterStatus }),
        ...(filterJobId && { jobId: filterJobId }),
      });

      const response = await apiFetch(`${API_ENDPOINTS.ADMIN.JOB_APPLICATIONS.LIST}?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setApplications(data.data || []);
        setTotalPages(data.meta?.totalPages || 1);
        setTotalItems(data.meta?.total || 0);
      }
    } catch (error) {
      console.error('Error fetching job applications:', error);
    } finally {
      setLoading(false);
    }
  }, [page, filterStatus, filterJobId]);

  const fetchJobs = useCallback(async () => {
    try {
      const response = await apiFetch(API_ENDPOINTS.ADMIN.JOB_POSTINGS.LIST);
      const data = await response.json();
      if (data.success) {
        const jobsList = (data.data || []).map((job: any) => ({
          jobId: job.jobId,
          jobCode: job.jobCode,
          title: job.translations?.[0]?.title || job.jobCode,
        }));
        setJobs(jobsList);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
    fetchJobs();
  }, [fetchApplications, fetchJobs]);

  const handleSelectApplication = async (application: JobApplication) => {
    try {
      // Fetch full details
      const response = await apiFetch(API_ENDPOINTS.ADMIN.JOB_APPLICATIONS.DETAIL(application.applicationId));
      const data = await response.json();
      if (data.success) {
        setSelectedApplication(data.data);
      } else {
        setSelectedApplication(application);
      }
    } catch (error) {
      console.error('Error fetching application details:', error);
      setSelectedApplication(application);
    }
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Job Applications"
        description="Kelola aplikasi pekerjaan dari kandidat"
      />

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <AdminCard compact>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb] bg-white"
          >
            <option value="">Semua Status</option>
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview">Interview</option>
            <option value="Offered">Offered</option>
            <option value="Rejected">Rejected</option>
            <option value="Accepted">Accepted</option>
          </select>
        </AdminCard>
        <AdminCard compact>
          <select
            value={filterJobId}
            onChange={(e) => {
              setFilterJobId(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb] bg-white"
          >
            <option value="">Semua Lowongan</option>
            {jobs.map((job) => (
              <option key={job.jobId} value={job.jobId.toString()}>
                {job.jobCode} - {job.title}
              </option>
            ))}
          </select>
        </AdminCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Applications List */}
        <div className="lg:col-span-1">
          <AdminCard title="Applications" compact>
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto -mx-4 -mt-4">
              {loading ? (
                <div className="p-6 text-center">
                  <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-[#039edb]"></div>
                  <p className="mt-2 text-xs text-gray-500">Loading...</p>
                </div>
              ) : applications.length === 0 ? (
                <div className="p-6 text-center">
                  <DocumentTextIcon className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-xs text-gray-500">Tidak ada aplikasi</p>
                </div>
              ) : (
                applications.map((application) => (
                  <div
                    key={application.applicationId}
                    onClick={() => handleSelectApplication(application)}
                    className={`px-4 py-3 cursor-pointer transition-colors ${
                      selectedApplication?.applicationId === application.applicationId
                        ? 'bg-gradient-to-r from-[#039edb]/5 to-[#71bf44]/5 border-l-4 border-[#039edb]'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <div className="text-sm font-medium text-gray-900 truncate flex-1">
                        {application.applicantName}
                      </div>
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold border flex-shrink-0 ${STATUS_COLORS[application.status] || STATUS_COLORS.Pending}`}
                      >
                        {application.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 truncate">{application.applicantEmail}</div>
                    {application.job && (
                      <div className="text-xs text-gray-500 mt-1">
                        {application.job.jobCode} - {application.job.translations?.[0]?.title || 'Job'}
                      </div>
                    )}
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      {application.rating && (
                        <div className="flex items-center gap-1">
                          <StarIconSolid className="h-3 w-3 text-yellow-400" />
                          <span>{application.rating}</span>
                        </div>
                      )}
                      <span>
                        {new Date(application.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </AdminCard>

          {/* Pagination */}
          {!loading && applications.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={totalItems}
              onPageChange={setPage}
            />
          )}
        </div>

        {/* Application Details */}
        <div className="lg:col-span-2">
          {selectedApplication ? (
            <ApplicationDetails
              application={selectedApplication}
              onUpdate={() => {
                fetchApplications();
                handleSelectApplication(selectedApplication);
              }}
            />
          ) : (
            <AdminCard compact>
              <div className="p-6 text-center">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-300" />
                <p className="mt-2 text-sm text-gray-500">Pilih aplikasi untuk melihat detail</p>
              </div>
            </AdminCard>
          )}
        </div>
      </div>
    </div>
  );
}

function ApplicationDetails({
  application,
  onUpdate,
}: {
  application: JobApplication;
  onUpdate: () => void;
}) {
  const [updateForm, setUpdateForm] = useState({
    status: application.status,
    rating: application.rating || undefined,
    adminNotes: application.adminNotes || '',
    rejectionReason: application.rejectionReason || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await apiFetch(API_ENDPOINTS.ADMIN.JOB_APPLICATIONS.UPDATE(application.applicationId), {
        method: 'PUT',
        body: JSON.stringify(updateForm),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onUpdate();
      } else {
        setError(data.message || 'Gagal mengupdate aplikasi');
      }
    } catch (error) {
      console.error('Error updating application:', error);
      setError('Network error. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const formatSalary = (amount?: number, currency?: string) => {
    if (!amount) return '-';
    const formatted = new Intl.NumberFormat('id-ID').format(amount);
    return `${currency || 'IDR'} ${formatted}`;
  };

  return (
    <AdminCard title="Application Details" compact>
      <div className="space-y-4">
        {error && (
          <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}

        {/* Status Update Section */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Update Status</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
              <select
                value={updateForm.status}
                onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value as any })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              >
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview">Interview</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
                <option value="Accepted">Accepted</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Rating (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={updateForm.rating || ''}
                onChange={(e) => setUpdateForm({ ...updateForm, rating: e.target.value ? parseInt(e.target.value) : undefined })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Admin Notes</label>
              <textarea
                value={updateForm.adminNotes}
                onChange={(e) => setUpdateForm({ ...updateForm, adminNotes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                placeholder="Catatan internal..."
              />
            </div>
            {updateForm.status === 'Rejected' && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Alasan Penolakan</label>
                <textarea
                  value={updateForm.rejectionReason}
                  onChange={(e) => setUpdateForm({ ...updateForm, rejectionReason: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                  placeholder="Alasan penolakan..."
                />
              </div>
            )}
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="w-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#039edb] to-[#71bf44] rounded-lg hover:opacity-90 disabled:opacity-50 transition shadow-sm"
            >
              {loading ? 'Menyimpan...' : 'Update Status'}
            </button>
          </div>
        </div>

        {/* Applicant Info */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">Informasi Kandidat</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <EnvelopeIcon className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-gray-900">{application.applicantEmail}</p>
              </div>
            </div>
            {application.applicantPhone && (
              <div className="flex items-start gap-2">
                <PhoneIcon className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{application.applicantPhone}</p>
                </div>
              </div>
            )}
            {application.currentCompany && (
              <div className="flex items-start gap-2">
                <BuildingOfficeIcon className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Current Company</p>
                  <p className="text-sm font-medium text-gray-900">{application.currentCompany}</p>
                </div>
              </div>
            )}
            {application.currentPosition && (
              <div className="flex items-start gap-2">
                <BriefcaseIcon className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Current Position</p>
                  <p className="text-sm font-medium text-gray-900">{application.currentPosition}</p>
                </div>
              </div>
            )}
            {application.yearsOfExperience !== undefined && (
              <div>
                <p className="text-xs text-gray-500">Years of Experience</p>
                <p className="text-sm font-medium text-gray-900">{application.yearsOfExperience} years</p>
              </div>
            )}
            {application.expectedSalary && (
              <div>
                <p className="text-xs text-gray-500">Expected Salary</p>
                <p className="text-sm font-medium text-gray-900">
                  {formatSalary(application.expectedSalary, application.salaryCurrency)}
                </p>
              </div>
            )}
            {application.availableFrom && (
              <div className="flex items-start gap-2">
                <CalendarIcon className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Available From</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(application.availableFrom).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cover Letter */}
        {application.coverLetter && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Cover Letter</h3>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{application.coverLetter}</p>
            </div>
          </div>
        )}

        {/* Links */}
        {(application.portfolioUrl || application.linkedinUrl || application.githubUrl) && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Links</h3>
            <div className="space-y-1">
              {application.portfolioUrl && (
                <a
                  href={application.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-[#039edb] hover:underline"
                >
                  Portfolio
                </a>
              )}
              {application.linkedinUrl && (
                <a
                  href={application.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-[#039edb] hover:underline"
                >
                  LinkedIn
                </a>
              )}
              {application.githubUrl && (
                <a
                  href={application.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-[#039edb] hover:underline"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        )}

        {/* CV File */}
        {application.cvFile && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">CV</h3>
            <a
              href={application.cvFile.storageUrl || `/api/files/${application.cvFile.filePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#039edb] bg-[#039edb]/10 rounded-lg hover:bg-[#039edb]/20 transition-colors"
            >
              <DocumentTextIcon className="h-4 w-4" />
              {application.cvFile.fileName}
            </a>
          </div>
        )}

        {/* Metadata */}
        <div className="pt-3 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-3 text-xs text-gray-500">
            <div>
              <p>Applied At</p>
              <p className="font-medium text-gray-700">
                {new Date(application.createdAt).toLocaleString('id-ID')}
              </p>
            </div>
            {application.reviewedAt && (
              <div>
                <p>Reviewed At</p>
                <p className="font-medium text-gray-700">
                  {new Date(application.reviewedAt).toLocaleString('id-ID')}
                </p>
              </div>
            )}
            {application.referralSource && (
              <div>
                <p>Referral Source</p>
                <p className="font-medium text-gray-700">{application.referralSource}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminCard>
  );
}



