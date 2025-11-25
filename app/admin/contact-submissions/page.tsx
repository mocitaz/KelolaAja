'use client';

import { useEffect, useState, useCallback } from 'react';
import { EnvelopeIcon, PhoneIcon, BuildingOfficeIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { apiFetch, API_ENDPOINTS } from '@/lib/api-config';
import PageHeader from '@/components/admin/PageHeader';
import AdminCard from '@/components/admin/AdminCard';
import Pagination from '@/components/admin/Pagination';

interface ContactSubmission {
  submissionId: number;
  name: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  message: string;
  source: string;
  isRead: boolean;
  createdAt: string;
}

export default function ContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filterRead, setFilterRead] = useState('');

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(filterRead && { isRead: filterRead }),
      });

      const response = await apiFetch(`${API_ENDPOINTS.CONTACTS.LIST}?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setSubmissions(data.data);
        setTotalPages(data.meta.totalPages);
        setTotalItems(data.meta.total);
      }
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
    } finally {
      setLoading(false);
    }
  }, [page, filterRead]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const markAsRead = async (submissionId: number) => {
    try {
      await apiFetch(API_ENDPOINTS.CONTACTS.MARK_READ(submissionId), {
        method: 'PUT',
      });
      fetchSubmissions();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleSelectSubmission = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    if (!submission.isRead) {
      markAsRead(submission.submissionId);
    }
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Contact Submissions"
        description="Manage contact form submissions"
      />

      {/* Filter */}
      <AdminCard compact>
        <select
          value={filterRead}
          onChange={(e) => setFilterRead(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb] bg-white"
        >
          <option value="">All Submissions</option>
          <option value="false">Unread</option>
          <option value="true">Read</option>
        </select>
      </AdminCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Submissions List */}
        <div className="lg:col-span-1">
          <AdminCard title="Submissions" compact>
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto -mx-4 -mt-4">
              {loading ? (
                <div className="p-6 text-center">
                  <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-[#039edb]"></div>
                  <p className="mt-2 text-xs text-gray-500">Loading...</p>
                </div>
              ) : submissions.length === 0 ? (
                <div className="p-6 text-center">
                  <EnvelopeIcon className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-xs text-gray-500">No submissions</p>
                </div>
              ) : (
                submissions.map((submission) => (
                  <div
                    key={submission.submissionId}
                    onClick={() => handleSelectSubmission(submission)}
                    className={`px-4 py-3 cursor-pointer transition-colors ${
                      selectedSubmission?.submissionId === submission.submissionId
                        ? 'bg-gradient-to-r from-[#039edb]/5 to-[#71bf44]/5 border-l-4 border-[#039edb]'
                        : !submission.isRead
                        ? 'bg-gradient-to-r from-[#039edb]/5 to-[#71bf44]/5'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <div className="text-sm font-medium text-gray-900 truncate flex-1">
                        {submission.name}
                      </div>
                      {!submission.isRead && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-gradient-to-r from-[#039edb]/10 to-[#71bf44]/10 text-[#039edb] border border-[#039edb]/20 flex-shrink-0">
                          New
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-600 truncate">{submission.email}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(submission.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </AdminCard>

          {/* Pagination */}
          {!loading && submissions.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalItems={totalItems}
              itemsPerPage={10}
            />
          )}
        </div>

        {/* Submission Detail */}
        <div className="lg:col-span-2">
          <AdminCard title={selectedSubmission ? 'Submission Details' : 'Select a submission'} compact>
            {selectedSubmission ? (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    {selectedSubmission.name}
                  </h2>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <CalendarIcon className="h-3.5 w-3.5" />
                    {new Date(selectedSubmission.createdAt).toLocaleString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <EnvelopeIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <a href={`mailto:${selectedSubmission.email}`} className="hover:text-[#039edb] truncate">
                      {selectedSubmission.email}
                    </a>
                  </div>
                  {selectedSubmission.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <PhoneIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <a href={`tel:${selectedSubmission.phone}`} className="hover:text-[#039edb]">
                        {selectedSubmission.phone}
                      </a>
                    </div>
                  )}
                  {selectedSubmission.companyName && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <BuildingOfficeIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span>{selectedSubmission.companyName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-gray-700 mb-1.5">Message</h3>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {selectedSubmission.message}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs">
                    <div className="text-gray-500">
                      <span className="font-medium">Source:</span> {selectedSubmission.source}
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-md font-semibold ${
                        selectedSubmission.isRead
                          ? 'bg-gray-100 text-gray-700 border border-gray-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {selectedSubmission.isRead ? 'Read' : 'Unread'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <EnvelopeIcon className="h-12 w-12 text-gray-300 mb-3" />
                <p className="text-sm text-gray-500">Select a submission to view details</p>
              </div>
            )}
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
