'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PlusIcon, PencilIcon, TrashIcon, StarIcon } from '@heroicons/react/24/outline';
import { apiFetch, API_ENDPOINTS } from '@/lib/api-config';
import PageHeader from '@/components/admin/PageHeader';
import AdminCard from '@/components/admin/AdminCard';
import AdminModal from '@/components/admin/AdminModal';
import SearchBar from '@/components/admin/SearchBar';

interface Testimonial {
  testimonialId: number;
  name: string;              // Backend field
  title: string;             // Backend field
  company: string;
  quote: string;             // Backend field (from translations)
  rating: number;
  photo?: {                  // Backend field (nested object)
    fileId: number;
    filePath: string;
    altText: string | null;
  };
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  translations?: {           // Backend field (for multi-language)
    id?: { quote: string };
    en?: { quote: string };
    [key: string]: any;
  };
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await apiFetch('/api/v1/admin/testimonials');
      const data = await response.json();
      if (data.success) {
        // Map backend response to match interface
        const mapped = data.data.map((t: any) => ({
          ...t,
          quote: t.translations?.id?.quote || t.translations?.en?.quote || '',
          photo: t.photo || null,
          translations: t.translations // Explicitly preserve translations
        }));
        setTestimonials(mapped);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      await apiFetch(`/api/v1/admin/testimonials/${id}`, {
        method: 'DELETE',
      });
      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const filteredTestimonials = testimonials.filter(t =>
    t.name?.toLowerCase().includes(search.toLowerCase()) ||
    t.company?.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = testimonials.filter(t => t.isActive).length;
  const inactiveCount = testimonials.filter(t => !t.isActive).length;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Testimonials"
        description="Manage customer testimonials and reviews"
        action={{
          label: 'Add Testimonial',
          onClick: () => {
            setEditingTestimonial(null);
            setShowModal(true);
          },
        }}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Total</p>
            <p className="text-xl font-bold text-gray-900">{testimonials.length}</p>
          </div>
        </AdminCard>
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Active</p>
            <p className="text-xl font-bold text-green-600">{activeCount}</p>
          </div>
        </AdminCard>
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Inactive</p>
            <p className="text-xl font-bold text-red-600">{inactiveCount}</p>
          </div>
        </AdminCard>
      </div>

      {/* Search */}
      <AdminCard compact>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by name or company..."
        />
      </AdminCard>

      {/* Testimonials Grid */}
      {loading ? (
        <AdminCard>
          <div className="py-12 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#039edb]"></div>
            <p className="mt-2 text-xs text-gray-500">Loading...</p>
          </div>
        </AdminCard>
      ) : filteredTestimonials.length === 0 ? (
        <AdminCard>
          <div className="py-12 text-center">
            <StarIcon className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2 text-sm text-gray-500">No testimonials found</p>
          </div>
        </AdminCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredTestimonials.map((testimonial) => (
            <AdminCard key={testimonial.testimonialId} compact>
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className="relative h-12 w-12 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200">
                    {testimonial.photo?.filePath ? (
                      <Image
                        src={testimonial.photo.filePath}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#039edb] to-[#71bf44]">
                        <span className="text-white text-sm font-bold">
                          {testimonial.name?.charAt(0)?.toUpperCase() || '?'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 truncate">{testimonial.name}</h3>
                    <p className="text-xs text-gray-600 truncate">{testimonial.title}</p>
                    <p className="text-xs text-gray-500 truncate">{testimonial.company}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                        }`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({testimonial.rating})</span>
                </div>

                {/* Testimonial Text */}
                <p className="text-xs text-gray-700 line-clamp-3 leading-relaxed">
                  {testimonial.quote}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                  <span>Order: {testimonial.displayOrder}</span>
                  <span className={`px-2 py-0.5 rounded-md font-semibold ${testimonial.isActive
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                    {testimonial.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-1.5 pt-2">
                  <button
                    onClick={() => {
                      setEditingTestimonial(testimonial);
                      setShowModal(true);
                    }}
                    className="flex-1 px-2.5 py-1.5 text-xs font-semibold text-[#039edb] border border-[#039edb] rounded-lg hover:bg-[#039edb] hover:text-white transition-colors"
                  >
                    <PencilIcon className="h-3.5 w-3.5 inline mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.testimonialId)}
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

      {/* Modal */}
      {showModal && (
        <TestimonialModal
          testimonial={editingTestimonial}
          onClose={() => {
            setShowModal(false);
            setEditingTestimonial(null);
          }}
          onSave={() => {
            setShowModal(false);
            fetchTestimonials();
          }}
        />
      )}
    </div>
  );
}

function TestimonialModal({
  testimonial,
  onClose,
  onSave,
}: {
  testimonial: Testimonial | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    name: testimonial?.name || '',
    title: testimonial?.title || '',
    company: testimonial?.company || '',
    rating: testimonial?.rating || 5,
    photoFilePath: testimonial?.photo?.filePath || '',
    isActive: testimonial?.isActive ?? true,
    displayOrder: testimonial?.displayOrder || 0,
    translations: [
      { locale: 'id', quote: testimonial?.translations?.id?.quote || testimonial?.quote || '' },
      { locale: 'en', quote: testimonial?.translations?.en?.quote || '' },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name,
        title: testimonial.title,
        company: testimonial.company,
        rating: testimonial.rating,
        photoFilePath: testimonial.photo?.filePath || '',
        isActive: testimonial.isActive,
        displayOrder: testimonial.displayOrder,
        translations: [
          { locale: 'id', quote: testimonial.translations?.id?.quote || testimonial.quote || '' },
          { locale: 'en', quote: testimonial.translations?.en?.quote || '' }
        ]
      });
    }
  }, [testimonial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = testimonial
        ? `/api/v1/admin/testimonials/${testimonial.testimonialId}`
        : '/api/v1/admin/testimonials';

      // Transform translations map
      const translationsMap: Record<string, any> = {};
      formData.translations.forEach((t) => {
        translationsMap[t.locale] = { quote: t.quote };
      });

      const submitData = {
        name: formData.name,
        title: formData.title,
        company: formData.company,
        rating: formData.rating,
        displayOrder: formData.displayOrder,
        isActive: formData.isActive,
        translations: translationsMap,
        // photoFileId: null // We don't support image upload yet, and URL string is not accepted by backend
      };

      const response = await apiFetch(endpoint, {
        method: testimonial ? 'PUT' : 'POST',
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onSave();
      } else {
        setError(data.message || 'Failed to save testimonial');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminModal
      isOpen={true}
      onClose={onClose}
      title={testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
      size="lg"
      footer={
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-[#039edb] to-[#71bf44] rounded-lg hover:opacity-90 disabled:opacity-50 transition shadow-sm"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        {error && (
          <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Person Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Title (Position)</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Company</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating })}
                  className={`p-1 rounded transition-colors ${rating <= formData.rating
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                    }`}
                >
                  <StarIcon className="h-5 w-5 fill-current" />
                </button>
              ))}
              <span className="text-xs text-gray-500 ml-2">({formData.rating}/5)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Photo URL (Display Only)</label>
            <input
              type="url"
              value={formData.photoFilePath}
              onChange={(e) => setFormData({ ...formData, photoFilePath: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              placeholder="https://example.com/photo.jpg"
              disabled
            />
            <p className="mt-1 text-xs text-gray-500">Note: Photo upload via Media Files is not yet implemented</p>
            {formData.photoFilePath && (
              <div className="mt-2 relative h-20 w-20 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                <Image
                  src={formData.photoFilePath}
                  alt="Preview"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Translations */}
          <div className="space-y-2 pt-2 border-t border-gray-200">
            <label className="block text-xs font-semibold text-gray-700 mb-2">Quote (Translatable)</label>
            {formData.translations.map((trans, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 text-xs font-bold rounded text-white ${trans.locale === 'id' ? 'bg-red-500' : 'bg-blue-500'}`}>
                    {trans.locale.toUpperCase()}
                  </span>
                </div>
                <textarea
                  required={trans.locale === 'id'}
                  value={trans.quote}
                  onChange={(e) => {
                    const newTranslations = [...formData.translations];
                    newTranslations[idx] = { ...trans, quote: e.target.value };
                    setFormData({ ...formData, translations: newTranslations });
                  }}
                  rows={4}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                  placeholder={`Quote in ${trans.locale.toUpperCase()}`}
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Display Order</label>
              <input
                type="number"
                required
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              />
            </div>
            <div className="flex items-end">
              <div className="flex items-center gap-2 w-full">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4 text-[#039edb] focus:ring-[#039edb] border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="text-xs text-gray-700">Active</label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </AdminModal>
  );
}
