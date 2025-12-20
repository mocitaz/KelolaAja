'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { ArrowUpTrayIcon, XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { apiFetch } from '@/lib/api-config';

interface ImageUploadProps {
  label?: string;
  currentImage?: string;
  onUploadComplete: (fileId: number, filePath: string) => void;
  onRemove?: () => void;
  className?: string;
}

export default function ImageUpload({
  label = 'Upload Image',
  currentImage,
  onUploadComplete,
  onRemove,
  className = '',
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setError('');
    setLoading(true);

    // Create local preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    try {
      const formData = new FormData();
      formData.append('file', file);
      // Optional: Add folder/prefix if needed by backend, assuming 'partners' for now as generic default
      // formData.append('folder', 'uploads'); 

      const response = await apiFetch('/api/v1/media-files/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // Backend returns: { success: true, data: { fileId: 123, filePath: '...', ... } }
        onUploadComplete(data.data.fileId, data.data.filePath);
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (err: any) {
      setError(err.message || 'Error uploading image');
      setPreview(currentImage || null); // Revert to old image on error
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="block text-xs font-semibold text-gray-700">{label}</label>}
      
      <div className="relative">
        {preview ? (
          <div className="relative h-32 w-full bg-gray-50 rounded-lg border border-gray-200 overflow-hidden group">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain p-2"
            />
            
            {/* Overlay actions */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 bg-white text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                title="Change Image"
              >
                <ArrowUpTrayIcon className="h-4 w-4" />
              </button>
              {onRemove && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-1.5 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors"
                  title="Remove Image"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition-all group"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#039edb]"></div>
            ) : (
              <>
                <PhotoIcon className="h-8 w-8 text-gray-400 group-hover:text-gray-500 mb-2" />
                <span className="text-xs text-gray-500 font-medium">Click to upload image</span>
                <span className="text-[10px] text-gray-400 mt-1">PNG, JPG up to 5MB</span>
              </>
            )}
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {error && (
        <p className="text-[10px] text-red-600 animate-pulse">{error}</p>
      )}
    </div>
  );
}
