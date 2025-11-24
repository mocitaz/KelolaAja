'use client';

import { useEffect, useState } from 'react';
import { EnvelopeIcon, PhoneIcon, BuildingOfficeIcon, CalendarIcon } from '@heroicons/react/24/outline';

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
  const [filterRead, setFilterRead] = useState('');

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '10',
          ...(filterRead && { isRead: filterRead }),
        });

        const response = await fetch(
          `http://localhost:8080/api/v1/admin/contact-submissions?${params}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = await response.json();
        if (data.success) {
          setSubmissions(data.data);
          setTotalPages(data.meta.totalPages);
        }
      } catch (error) {
        console.error('Error fetching submissions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSubmissions();
  }, [page, filterRead]);

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(filterRead && { isRead: filterRead }),
      });

      const response = await fetch(
        `http://localhost:8080/api/v1/admin/contact-submissions?${params}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await response.json();
      if (data.success) {
        setSubmissions(data.data);
        setTotalPages(data.meta.totalPages);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (submissionId: number) => {
    try {
      const token = localStorage.getItem('accessToken');
      await fetch(
        `http://localhost:8080/api/v1/admin/contact-submissions/${submissionId}/read`,
        {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchSubmissions();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Contact Submissions</h1>
        <p className="mt-2 text-gray-600">Manage contact form submissions</p>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <select
          value={filterRead}
          onChange={(e) => setFilterRead(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">All Submissions</option>
          <option value="false">Unread</option>
          <option value="true">Read</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : submissions.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No submissions</div>
            ) : (
              submissions.map((submission) => (
                <div
                  key={submission.submissionId}
                  onClick={() => {
                    setSelectedSubmission(submission);
                    if (!submission.isRead) {
                      markAsRead(submission.submissionId);
                    }
                  }}
                    className={`px-6 py-4 cursor-pointer transition-colors ${
                      selectedSubmission?.submissionId === submission.submissionId
                      ? 'bg-gradient-to-r from-[#039edb]/5 to-[#71bf44]/5 border-l-4 border-[#039edb]'
                      : !submission.isRead
                      ? 'bg-gradient-to-r from-[#039edb]/5 to-[#71bf44]/5'
                      : 'hover:bg-gray-50'
                    }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-gray-900">{submission.name}</div>
                    {!submission.isRead && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gradient-to-r from-[#039edb]/10 to-[#71bf44]/10 text-[#039edb] border border-[#039edb]/30">
                        Unread
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 truncate">{submission.email}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(submission.createdAt).toLocaleDateString('id-ID')}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 border-t border-gray-200 flex justify-between">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Submission Detail */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          {selectedSubmission ? (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedSubmission.name}
                </h2>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {new Date(selectedSubmission.createdAt).toLocaleString('id-ID')}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <EnvelopeIcon className="h-5 w-5 mr-3 text-gray-400" />
                  <a href={`mailto:${selectedSubmission.email}`} className="hover:text-[#039edb]">
                    {selectedSubmission.email}
                  </a>
                </div>
                {selectedSubmission.phone && (
                  <div className="flex items-center text-gray-700">
                    <PhoneIcon className="h-5 w-5 mr-3 text-gray-400" />
                    <a href={`tel:${selectedSubmission.phone}`} className="hover:text-[#039edb]">
                      {selectedSubmission.phone}
                    </a>
                  </div>
                )}
                {selectedSubmission.companyName && (
                  <div className="flex items-center text-gray-700">
                    <BuildingOfficeIcon className="h-5 w-5 mr-3 text-gray-400" />
                    {selectedSubmission.companyName}
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Message</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedSubmission.message}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Source:</span> {selectedSubmission.source}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  <span className="font-medium">Status:</span>{' '}
                  <span
                    className={`px-2 py-0.5 rounded ${
                      selectedSubmission.isRead
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {selectedSubmission.isRead ? 'Read' : 'Unread'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a submission to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
