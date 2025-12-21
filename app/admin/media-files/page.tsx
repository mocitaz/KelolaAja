'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PhotoIcon, DocumentIcon, VideoCameraIcon, ArrowUpTrayIcon, TrashIcon, PencilIcon, EyeIcon } from '@heroicons/react/24/outline';
import { apiFetch, API_ENDPOINTS, API_BASE_URL } from '@/lib/api-config';
import PageHeader from '@/components/admin/PageHeader';
import AdminCard from '@/components/admin/AdminCard';
import AdminModal from '@/components/admin/AdminModal';
import SearchBar from '@/components/admin/SearchBar';

interface MediaFile {
  mediaFileId: number;
  fileName: string;
  filePath: string;
  fileUrl: string;
  fileType: 'image' | 'icon' | 'document' | 'video';
  mimeType: string;
  fileSize: number;
  altText?: string;
  caption?: string;
  uploadedBy?: {
    userId: number;
    fullName: string;
  };
  createdAt: string;
}

interface Stats {
  totalFiles: number;
  totalSize: string;
  byType: {
    image: number;
    icon: number;
    document: number;
    video: number;
  };
}

export default function MediaFilesPage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fileType: 'image' as MediaFile['fileType'],
    altText: '',
    caption: ''
  });
  const [editData, setEditData] = useState({
    fileName: '',
    altText: '',
    caption: ''
  });

  useEffect(() => {
    fetchMediaFiles();
    fetchStats();
  }, []);

  const fetchMediaFiles = async () => {
    try {
      // Add pagination params that backend expects
      const response = await apiFetch(`${API_ENDPOINTS.ADMIN.MEDIA_FILES.LIST}?page=1&limit=100`);
      const data = await response.json();

      // Log response for debugging
      console.log('Media Files Response:', data);

      if (data.success) {
        // Transform data to match interface and generate full URLs
        const transformData = (data.data || []).map((file: any) => ({
          ...file,
          mediaFileId: file.fileId, // Map backend ID to frontend ID
          fileUrl: file.storageUrl || `${API_BASE_URL}/uploads${file.filePath.startsWith('/') ? '' : '/'}${file.filePath}`
        }));
        setMediaFiles(transformData);
      } else {
        console.error('Media Files API Error:', data.message);
        setMediaFiles([]);
      }
    } catch (error) {
      console.error('Error fetching media files:', error);
      setMediaFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await apiFetch(API_ENDPOINTS.ADMIN.MEDIA_FILES.STATS);
      const data = await response.json();
      if (data.success) {
        setStats(data.data || null);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    const formDataObj = new FormData();
    formDataObj.append('file', uploadFile);
    formDataObj.append('fileType', formData.fileType);
    if (formData.altText) formDataObj.append('altText', formData.altText);
    if (formData.caption) formDataObj.append('caption', formData.caption);

    try {
      const response = await apiFetch(API_ENDPOINTS.ADMIN.MEDIA_FILES.UPLOAD, {
        method: 'POST',
        body: formDataObj,
      });

      if (response.ok) {
        setShowUploadModal(false);
        setUploadFile(null);
        setFormData({ fileType: 'image', altText: '', caption: '' });
        fetchMediaFiles();
        fetchStats();
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDelete = async (fileId: number) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    try {
      await apiFetch(API_ENDPOINTS.ADMIN.MEDIA_FILES.DELETE(fileId), {
        method: 'DELETE',
      });
      fetchMediaFiles();
      fetchStats();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'image':
      case 'icon':
        return <PhotoIcon className="h-12 w-12" />;
      case 'document':
        return <DocumentIcon className="h-12 w-12" />;
      case 'video':
        return <VideoCameraIcon className="h-12 w-12" />;
      default:
        return <DocumentIcon className="h-12 w-12" />;
    }
  };

  const filteredFiles = mediaFiles.filter(file => {
    if (!search && selectedType === 'all') return true;

    const matchesSearch = !search || (
      (file.fileName && file.fileName.toLowerCase().includes(search.toLowerCase())) ||
      (file.altText && file.altText.toLowerCase().includes(search.toLowerCase()))
    );

    const matchesType = selectedType === 'all' || file.fileType === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4">
      <PageHeader
        title="Media Files"
        description="Manage uploaded media files and assets"
        action={{
          label: 'Upload File',
          onClick: () => setShowUploadModal(true),
          icon: <ArrowUpTrayIcon className="h-4 w-4" />,
        }}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Total</p>
            <p className="text-xl font-bold text-gray-900">{stats?.totalFiles || 0}</p>
          </div>
        </AdminCard>
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Images</p>
            <p className="text-xl font-bold text-[#039edb]">{stats?.byType?.image || 0}</p>
          </div>
        </AdminCard>
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Icons</p>
            <p className="text-xl font-bold text-[#71bf44]">{stats?.byType?.icon || 0}</p>
          </div>
        </AdminCard>
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Documents</p>
            <p className="text-xl font-bold text-gray-900">{stats?.byType?.document || 0}</p>
          </div>
        </AdminCard>
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Videos</p>
            <p className="text-xl font-bold text-gray-900">{stats?.byType?.video || 0}</p>
          </div>
        </AdminCard>
      </div>

      {/* Filters */}
      <AdminCard compact>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by filename or alt text..."
          />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb] bg-white"
          >
            <option value="all">All File Types</option>
            <option value="image">Images</option>
            <option value="icon">Icons</option>
            <option value="document">Documents</option>
            <option value="video">Videos</option>
          </select>
        </div>
      </AdminCard>

      {/* Media Grid */}
      {loading ? (
        <AdminCard>
          <div className="py-12 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#039edb]"></div>
            <p className="mt-2 text-xs text-gray-500">Loading...</p>
          </div>
        </AdminCard>
      ) : filteredFiles.length === 0 ? (
        <AdminCard>
          <div className="py-12 text-center">
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2 text-sm text-gray-500">No media files found</p>
          </div>
        </AdminCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredFiles.map((file) => (
            <AdminCard key={file.mediaFileId} compact>
              <div className="space-y-3">
                {/* Preview */}
                <div
                  className="relative h-32 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden border border-gray-200"
                  onClick={() => {
                    setSelectedFile(file);
                    setShowPreviewModal(true);
                  }}
                >
                  {(file.fileType === 'image' || file.fileType === 'icon') ? (
                    <Image
                      src={file.fileUrl}
                      alt={file.altText || file.fileName}
                      fill
                      className="object-contain p-2"
                      unoptimized
                    />
                  ) : (
                    <div className="text-gray-400">
                      {getFileIcon(file.fileType)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-900 truncate mb-1" title={file.fileName}>
                    {file.fileName}
                  </h3>
                  <p className="text-xs text-gray-600 mb-1">
                    {formatFileSize(file.fileSize)} • {file.fileType}
                  </p>
                  {file.altText && (
                    <p className="text-xs text-gray-500 truncate" title={file.altText}>
                      {file.altText}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-1.5 pt-2 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setSelectedFile(file);
                      setShowPreviewModal(true);
                    }}
                    className="flex-1 px-2.5 py-1.5 text-xs font-semibold bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90 transition"
                  >
                    <EyeIcon className="h-3.5 w-3.5 inline mr-1" />
                    View
                  </button>
                  <button
                    onClick={() => {
                      setSelectedFile(file);
                      setEditData({
                        fileName: file.fileName,
                        altText: file.altText || '',
                        caption: file.caption || '',
                      });
                      setShowEditModal(true);
                    }}
                    className="px-2.5 py-1.5 text-[#039edb] border border-[#039edb] rounded-lg hover:bg-[#039edb] hover:text-white transition-colors"
                    title="Edit"
                  >
                    <PencilIcon className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(file.mediaFileId)}
                    className="px-2.5 py-1.5 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <TrashIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <AdminModal
          isOpen={true}
          onClose={() => {
            setShowUploadModal(false);
            setUploadFile(null);
            setFormData({ fileType: 'image', altText: '', caption: '' });
          }}
          title="Upload Media File"
          size="md"
          footer={
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadFile(null);
                  setFormData({ fileType: 'image', altText: '', caption: '' });
                }}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={!uploadFile}
                className="px-4 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-[#039edb] to-[#71bf44] rounded-lg hover:opacity-90 disabled:opacity-50 transition shadow-sm"
              >
                Upload
              </button>
            </div>
          }
        >
          <form onSubmit={handleUpload} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">File</label>
              <input
                type="file"
                required
                onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">File Type</label>
              <select
                value={formData.fileType}
                onChange={(e) => setFormData({ ...formData, fileType: e.target.value as MediaFile['fileType'] })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb] bg-white"
              >
                <option value="image">Image</option>
                <option value="icon">Icon</option>
                <option value="document">Document</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Alt Text</label>
              <input
                type="text"
                value={formData.altText}
                onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                placeholder="Alternative text for image"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Caption</label>
              <textarea
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                placeholder="Optional caption"
              />
            </div>
          </form>
        </AdminModal>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedFile && (
        <AdminModal
          isOpen={true}
          onClose={() => {
            setShowEditModal(false);
            setSelectedFile(null);
          }}
          title="Edit Media File"
          size="md"
          footer={
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedFile(null);
                }}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await apiFetch(API_ENDPOINTS.ADMIN.MEDIA_FILES.UPDATE(selectedFile.mediaFileId), {
                      method: 'PUT',
                      body: JSON.stringify({
                        altText: editData.altText,
                        caption: editData.caption,
                      }),
                    });
                    setShowEditModal(false);
                    setSelectedFile(null);
                    fetchMediaFiles();
                  } catch (error) {
                    console.error('Error updating file:', error);
                  }
                }}
                className="px-4 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-[#039edb] to-[#71bf44] rounded-lg hover:opacity-90 transition shadow-sm"
              >
                Save
              </button>
            </div>
          }
        >
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">File Name</label>
              <input
                type="text"
                value={editData.fileName}
                disabled
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Alt Text</label>
              <input
                type="text"
                value={editData.altText}
                onChange={(e) => setEditData({ ...editData, altText: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Caption</label>
              <textarea
                value={editData.caption}
                onChange={(e) => setEditData({ ...editData, caption: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              />
            </div>
          </div>
        </AdminModal>
      )}

      {/* Preview Modal */}
      {showPreviewModal && selectedFile && (
        <AdminModal
          isOpen={true}
          onClose={() => {
            setShowPreviewModal(false);
            setSelectedFile(null);
          }}
          title="Media File Preview"
          size="lg"
          footer={
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowPreviewModal(false);
                  setSelectedFile(null);
                }}
                className="px-4 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-[#039edb] to-[#71bf44] rounded-lg hover:opacity-90 transition shadow-sm"
              >
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              {(selectedFile.fileType === 'image' || selectedFile.fileType === 'icon') ? (
                <Image
                  src={selectedFile.fileUrl}
                  alt={selectedFile.altText || selectedFile.fileName}
                  fill
                  className="object-contain p-4"
                  unoptimized
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  {getFileIcon(selectedFile.fileType)}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-semibold text-gray-700">File Name:</span>
                <p className="text-gray-600 mt-1">{selectedFile.fileName}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">File Type:</span>
                <p className="text-gray-600 mt-1 capitalize">{selectedFile.fileType}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">File Size:</span>
                <p className="text-gray-600 mt-1">{formatFileSize(selectedFile.fileSize)}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">MIME Type:</span>
                <p className="text-gray-600 mt-1">{selectedFile.mimeType}</p>
              </div>
              {selectedFile.altText && (
                <div>
                  <span className="font-semibold text-gray-700">Alt Text:</span>
                  <p className="text-gray-600 mt-1">{selectedFile.altText}</p>
                </div>
              )}
              {selectedFile.caption && (
                <div>
                  <span className="font-semibold text-gray-700">Caption:</span>
                  <p className="text-gray-600 mt-1">{selectedFile.caption}</p>
                </div>
              )}
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
}
