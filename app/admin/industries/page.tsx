'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  BriefcaseIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  GlobeAltIcon,
  ListBulletIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import { apiFetch } from '@/lib/api-config';

interface Translation {
  locale: string;
  name: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
}

interface Industry {
  industryId: number;
  industrySlug: string;
  displayOrder: number;
  iconName: string;
  isActive: boolean;
  translations?: Translation[];
}

export default function IndustriesPage() {
  const router = useRouter();
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editingIndustry, setEditingIndustry] = useState<Industry | null>(null);
  const [previewIndustry, setPreviewIndustry] = useState<Industry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const response = await apiFetch('/api/v1/industries/admin/all');
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setIndustries(data.data);
      }
    } catch (error) {
      console.error('Error fetching industries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (industryId: number) => {
    if (!confirm('Are you sure you want to delete this industry?')) return;

    try {
      const response = await apiFetch(`/api/v1/industries/admin/${industryId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchIndustries();
      }
    } catch (error) {
      console.error('Error deleting industry:', error);
    }
  };

  const filteredIndustries = industries.filter(
    (industry) =>
      industry.industrySlug?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      industry.iconName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(industry.translations) && industry.translations.some((t) =>
        t.name?.toLowerCase().includes(searchTerm.toLowerCase())
      ))
  );

  const statsCount = {
    total: industries.length,
    active: industries.filter((i) => i.isActive).length,
    inactive: industries.filter((i) => !i.isActive).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BriefcaseIcon className="w-8 h-8 text-[#039edb]" />
            Industries
          </h1>
          <p className="text-gray-600 mt-2">Manage industry sectors and their dedicated pages</p>
        </div>
        <button
          onClick={() => {
            setEditingIndustry(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90 transition shadow-lg"
        >
          <PlusIcon className="w-5 h-5" />
          Add Industry
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-[#039edb]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Industries</p>
              <p className="text-3xl font-bold text-gray-900">{statsCount.total}</p>
            </div>
            <BriefcaseIcon className="w-12 h-12 text-[#039edb]/20" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-[#71bf44]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Industries</p>
              <p className="text-3xl font-bold text-[#71bf44]">{statsCount.active}</p>
            </div>
            <CheckCircleIcon className="w-12 h-12 text-[#71bf44]/20" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-gray-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Inactive Industries</p>
              <p className="text-3xl font-bold text-gray-600">{statsCount.inactive}</p>
            </div>
            <XCircleIcon className="w-12 h-12 text-gray-400/20" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search industries by slug, name, or icon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
          />
        </div>
      </div>

      {/* Industries Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#039edb]"></div>
        </div>
      ) : filteredIndustries.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <BriefcaseIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm ? 'No industries found' : 'No industries yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? 'Try adjusting your search terms'
              : 'Start by adding your first industry sector'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => {
                setEditingIndustry(null);
                setShowModal(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90 transition"
            >
              <PlusIcon className="w-5 h-5" />
              Add First Industry
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredIndustries.map((industry) => (
            <div
              key={industry.industryId}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#039edb]/30"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#039edb]/5 to-[#71bf44]/5 p-4 border-b">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-mono">
                        {industry.industrySlug}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Icon: {industry.iconName} | Order: {industry.displayOrder}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      industry.isActive
                        ? 'bg-gradient-to-r from-[#71bf44]/10 to-[#5a9936]/10 text-[#71bf44] border border-[#71bf44]/30'
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                    }`}
                  >
                    {industry.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                {industry.translations && industry.translations.length > 0 && (
                  <div className="space-y-2">
                    {industry.translations.slice(0, 2).map((trans, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-3 border">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-[#039edb]/10 text-[#039edb] rounded text-xs font-medium">
                            {trans.locale.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          {trans.name || '-'}
                        </p>
                        {trans.description && (
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {trans.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="border-t p-4 bg-gray-50">
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => router.push(`/admin/industries/${industry.industryId}/problems`)}
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition text-xs font-medium"
                    title="Manage Problems"
                  >
                    <ListBulletIcon className="w-4 h-4" />
                    Problems
                  </button>
                  <button
                    onClick={() => router.push(`/admin/industries/${industry.industryId}/solutions`)}
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition text-xs font-medium"
                    title="Manage Solutions"
                  >
                    <LightBulbIcon className="w-4 h-4" />
                    Solutions
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setPreviewIndustry(industry);
                      setShowPreview(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition text-sm font-medium"
                  >
                    <EyeIcon className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    onClick={() => {
                      setEditingIndustry(industry);
                      setShowModal(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#039edb] text-white rounded-lg hover:bg-[#028dc9] transition text-sm font-medium"
                  >
                    <PencilIcon className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(industry.industryId)}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {showModal && (
        <IndustryModal
          industry={editingIndustry}
          onClose={() => {
            setShowModal(false);
            setEditingIndustry(null);
          }}
          onSave={() => {
            setShowModal(false);
            fetchIndustries();
          }}
        />
      )}

      {showPreview && previewIndustry && (
        <PreviewModal
          industry={previewIndustry}
          onClose={() => {
            setShowPreview(false);
            setPreviewIndustry(null);
          }}
        />
      )}
    </div>
  );
}

function IndustryModal({
  industry,
  onClose,
  onSave,
}: {
  industry: Industry | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    industrySlug: industry?.industrySlug || '',
    iconName: industry?.iconName || '',
    displayOrder: industry?.displayOrder || 1,
    isActive: industry?.isActive ?? true,
    translations: industry?.translations || [
      { locale: 'id', name: '', description: '', heroTitle: '', heroDescription: '' },
      { locale: 'en', name: '', description: '', heroTitle: '', heroDescription: '' },
    ],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = industry
        ? `/api/v1/industries/admin/${industry.industryId}`
        : '/api/v1/industries/admin';

      const response = await apiFetch(endpoint, {
        method: industry ? 'PUT' : 'POST',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSave();
      }
    } catch (error) {
      console.error('Error saving industry:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-xl z-10">
          <h2 className="text-xl font-bold text-gray-900">
            {industry ? 'Edit Industry' : 'Add New Industry'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <BriefcaseIcon className="w-5 h-5 text-[#039edb]" />
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.industrySlug}
                  onChange={(e) => setFormData({ ...formData, industrySlug: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#039edb]"
                  placeholder="retail"
                />
                <p className="mt-1 text-xs text-gray-500">Lowercase, no spaces (e.g., manufacturing)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon Name *</label>
                <input
                  type="text"
                  required
                  value={formData.iconName}
                  onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#039edb]"
                  placeholder="shopping-cart"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                <input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#039edb]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <GlobeAltIcon className="w-5 h-5 text-[#039edb]" />
              Translations
            </h3>
            {formData.translations.map((trans: any, idx: number) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <span className="px-3 py-1 bg-gradient-to-r from-[#039edb]/10 to-[#71bf44]/10 text-[#039edb] rounded-full text-sm font-medium">
                  {trans.locale.toUpperCase()}
                </span>

                <div className="space-y-3 mt-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={trans.name}
                      onChange={(e) => {
                        const newTrans = [...formData.translations];
                        newTrans[idx].name = e.target.value;
                        setFormData({ ...formData, translations: newTrans });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#039edb]"
                      placeholder="Retail & E-commerce"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={trans.description}
                      onChange={(e) => {
                        const newTrans = [...formData.translations];
                        newTrans[idx].description = e.target.value;
                        setFormData({ ...formData, translations: newTrans });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#039edb]"
                      rows={2}
                      placeholder="Short description for cards"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                    <input
                      type="text"
                      value={trans.heroTitle}
                      onChange={(e) => {
                        const newTrans = [...formData.translations];
                        newTrans[idx].heroTitle = e.target.value;
                        setFormData({ ...formData, translations: newTrans });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#039edb]"
                      placeholder="Main title on industry page"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hero Description</label>
                    <textarea
                      value={trans.heroDescription}
                      onChange={(e) => {
                        const newTrans = [...formData.translations];
                        newTrans[idx].heroDescription = e.target.value;
                        setFormData({ ...formData, translations: newTrans });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#039edb]"
                      rows={2}
                      placeholder="Description below hero title"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 text-[#039edb] focus:ring-[#039edb] border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Active (Display on website)
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90 transition font-medium shadow-md disabled:opacity-50"
            >
              {loading ? 'Saving...' : `${industry ? 'Update' : 'Create'} Industry`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PreviewModal({ industry, onClose }: { industry: Industry; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Industry Preview</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Slug</p>
              <p className="font-mono text-gray-900">{industry.industrySlug}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Icon</p>
              <p className="font-semibold text-gray-900">{industry.iconName}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Display Order</p>
              <p className="font-semibold text-gray-900">{industry.displayOrder}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                industry.isActive
                  ? 'bg-gradient-to-r from-[#71bf44]/10 to-[#5a9936]/10 text-[#71bf44] border border-[#71bf44]/30'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {industry.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          {industry.translations && industry.translations.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Translations</h3>
              {industry.translations.map((trans: any, idx: number) => (
                <div key={idx} className="border rounded-lg p-4 space-y-3">
                  <span className="px-2 py-1 bg-[#039edb]/10 text-[#039edb] rounded text-xs font-medium">
                    {trans.locale?.toUpperCase()}
                  </span>
                  
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-semibold text-gray-900">{trans.name || '-'}</p>
                  </div>

                  {trans.description && (
                    <div>
                      <p className="text-xs text-gray-500">Description</p>
                      <p className="text-sm text-gray-600">{trans.description}</p>
                    </div>
                  )}

                  {trans.heroTitle && (
                    <div>
                      <p className="text-xs text-gray-500">Hero Title</p>
                      <p className="text-sm font-medium text-gray-900">{trans.heroTitle}</p>
                    </div>
                  )}

                  {trans.heroDescription && (
                    <div>
                      <p className="text-xs text-gray-500">Hero Description</p>
                      <p className="text-sm text-gray-600">{trans.heroDescription}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t px-6 py-4 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
