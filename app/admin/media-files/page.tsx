'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PhotoIcon, DocumentIcon, VideoCameraIcon, MagnifyingGlassIcon, PlusIcon, TrashIcon, PencilIcon, ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { apiFetch } from '@/lib/api-config';

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
  const [searchTerm, setSearchTerm] = useState('');
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
      const response: any = await apiFetch('/media-files/admin', {
        method: 'GET',
      });
      setMediaFiles(response.data || []);
    } catch (error) {
      console.error('Error fetching media files:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response: any = await apiFetch('/media-files/admin/stats', {
        method: 'GET',
      });
      setStats(response.data || null);
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
      const token = localStorage.getItem('accessToken');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
      
      const response = await fetch(`${baseUrl}/media-files/admin/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataObj,
      });
      
      if (!response.ok) throw new Error('Upload failed');
      setShowUploadModal(false);
      setUploadFile(null);
      setFormData({
        fileType: 'image',
        altText: '',
        caption: ''
      });
      fetchMediaFiles();
      fetchStats();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      await apiFetch(`/media-files/admin/${selectedFile.mediaFileId}`, {
        method: 'PUT',
        body: JSON.stringify(editData),
      });
      setShowEditModal(false);
      setSelectedFile(null);
      fetchMediaFiles();
    } catch (error) {
      console.error('Error updating file:', error);
      alert('Failed to update file');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      await apiFetch(`/media-files/admin/${id}`, {
        method: 'DELETE',
      });
      fetchMediaFiles();
      fetchStats();
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Failed to delete file');
    }
  };

  const openEditModal = (file: MediaFile) => {
    setSelectedFile(file);
    setEditData({
      fileName: file.fileName,
      altText: file.altText || '',
      caption: file.caption || ''
    });
    setShowEditModal(true);
  };

  const openPreviewModal = (file: MediaFile) => {
    setSelectedFile(file);
    setShowPreviewModal(true);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
      case 'icon':
        return <PhotoIcon className="w-6 h-6" />;
      case 'video':
        return <VideoCameraIcon className="w-6 h-6" />;
      case 'document':
        return <DocumentIcon className="w-6 h-6" />;
      default:
        return <DocumentIcon className="w-6 h-6" />;
    }
  };

  const filteredFiles = mediaFiles.filter((file) => {
    const matchesSearch = file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (file.altText && file.altText.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || file.fileType === selectedType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#039edb] to-[#71bf44] bg-clip-text text-transparent">
          Media Files
        </h1>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <ArrowUpTrayIcon className="w-5 h-5" />
          Upload File
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Files</p>
              <p className="text-2xl font-bold text-gray-800">{stats?.totalFiles || 0}</p>
            </div>
            <DocumentIcon className="w-10 h-10 text-[#039edb]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Images</p>
              <p className="text-2xl font-bold text-gray-800">{stats?.byType.image || 0}</p>
            </div>
            <PhotoIcon className="w-10 h-10 text-[#71bf44]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Icons</p>
              <p className="text-2xl font-bold text-gray-800">{stats?.byType.icon || 0}</p>
            </div>
            <PhotoIcon className="w-10 h-10 text-[#039edb]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Documents</p>
              <p className="text-2xl font-bold text-gray-800">{stats?.byType.document || 0}</p>
            </div>
            <DocumentIcon className="w-10 h-10 text-[#71bf44]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Videos</p>
              <p className="text-2xl font-bold text-gray-800">{stats?.byType.video || 0}</p>
            </div>
            <VideoCameraIcon className="w-10 h-10 text-[#039edb]" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by filename or alt text..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
            />
          </div>

          {/* File Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
          >
            <option value="all">All File Types</option>
            <option value="image">Images</option>
            <option value="icon">Icons</option>
            <option value="document">Documents</option>
            <option value="video">Videos</option>
          </select>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFiles.map((file) => (
          <div key={file.mediaFileId} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            {/* Preview */}
            <div 
              className="relative h-48 bg-gray-100 flex items-center justify-center cursor-pointer"
              onClick={() => openPreviewModal(file)}
            >
              {(file.fileType === 'image' || file.fileType === 'icon') ? (
                <Image
                  src={file.fileUrl}
                  alt={file.altText || file.fileName}
                  width={200}
                  height={200}
                  className="max-h-full max-w-full object-contain"
                  unoptimized
                />
              ) : (
                <div className="text-gray-400">
                  {getFileIcon(file.fileType)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 truncate mb-1" title={file.fileName}>
                {file.fileName}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {formatFileSize(file.fileSize)} • {file.fileType}
              </p>
              {file.altText && (
                <p className="text-xs text-gray-500 mb-3 truncate" title={file.altText}>
                  {file.altText}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => openPreviewModal(file)}
                  className="flex-1 px-3 py-1.5 text-sm bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded hover:opacity-90"
                >
                  View
                </button>
                <button
                  onClick={() => openEditModal(file)}
                  className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(file.mediaFileId)}
                  className="px-3 py-1.5 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <DocumentIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No media files found</p>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold bg-gradient-to-r from-[#039edb] to-[#71bf44] bg-clip-text text-transparent">
                Upload File
              </h2>
              <button onClick={() => setShowUploadModal(false)} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleUpload}>
              {/* File Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose File *
                </label>
                <input
                  type="file"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                  required
                />
                {uploadFile && (
                  <p className="text-sm text-gray-600 mt-1">
                    Selected: {uploadFile.name} ({formatFileSize(uploadFile.size)})
                  </p>
                )}
              </div>

              {/* File Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  File Type *
                </label>
                <select
                  value={formData.fileType}
                  onChange={(e) => setFormData({ ...formData, fileType: e.target.value as MediaFile['fileType'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                  required
                >
                  <option value="image">Image</option>
                  <option value="icon">Icon</option>
                  <option value="document">Document</option>
                  <option value="video">Video</option>
                </select>
              </div>

              {/* Alt Text */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={formData.altText}
                  onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                  placeholder="Alternative text for accessibility"
                />
              </div>

              {/* Caption */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caption
                </label>
                <textarea
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                  rows={3}
                  placeholder="File description or caption"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold bg-gradient-to-r from-[#039edb] to-[#71bf44] bg-clip-text text-transparent">
                Edit File Metadata
              </h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleEdit}>
              {/* File Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  File Name
                </label>
                <input
                  type="text"
                  value={editData.fileName}
                  onChange={(e) => setEditData({ ...editData, fileName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                />
              </div>

              {/* Alt Text */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={editData.altText}
                  onChange={(e) => setEditData({ ...editData, altText: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                />
              </div>

              {/* Caption */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caption
                </label>
                <textarea
                  value={editData.caption}
                  onChange={(e) => setEditData({ ...editData, caption: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50" onClick={() => setShowPreviewModal(false)}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold bg-gradient-to-r from-[#039edb] to-[#71bf44] bg-clip-text text-transparent">
                  {selectedFile.fileName}
                </h2>
                <button onClick={() => setShowPreviewModal(false)} className="text-gray-500 hover:text-gray-700">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Preview */}
              <div className="mb-4 bg-gray-100 rounded-lg p-4 flex items-center justify-center min-h-[300px]">
                {(selectedFile.fileType === 'image' || selectedFile.fileType === 'icon') ? (
                  <Image
                    src={selectedFile.fileUrl}
                    alt={selectedFile.altText || selectedFile.fileName}
                    width={800}
                    height={400}
                    className="max-h-[400px] max-w-full object-contain"
                    unoptimized
                  />
                ) : selectedFile.fileType === 'video' ? (
                  <video controls className="max-h-[400px] max-w-full">
                    <source src={selectedFile.fileUrl} type={selectedFile.mimeType} />
                  </video>
                ) : (
                  <div className="text-center text-gray-500">
                    {getFileIcon(selectedFile.fileType)}
                    <p className="mt-2">Preview not available</p>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">File Type</p>
                  <p className="font-medium capitalize">{selectedFile.fileType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">File Size</p>
                  <p className="font-medium">{formatFileSize(selectedFile.fileSize)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">MIME Type</p>
                  <p className="font-medium">{selectedFile.mimeType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Uploaded</p>
                  <p className="font-medium">{new Date(selectedFile.createdAt).toLocaleDateString()}</p>
                </div>
                {selectedFile.altText && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Alt Text</p>
                    <p className="font-medium">{selectedFile.altText}</p>
                  </div>
                )}
                {selectedFile.caption && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Caption</p>
                    <p className="font-medium">{selectedFile.caption}</p>
                  </div>
                )}
                {selectedFile.uploadedBy && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Uploaded By</p>
                    <p className="font-medium">{selectedFile.uploadedBy.fullName}</p>
                  </div>
                )}
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">File URL</p>
                  <a
                    href={selectedFile.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#039edb] hover:underline break-all"
                  >
                    {selectedFile.fileUrl}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
