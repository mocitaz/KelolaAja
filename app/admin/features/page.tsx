'use client';

import { useEffect, useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { apiFetch, API_ENDPOINTS } from '@/lib/api-config';
import PageHeader from '@/components/admin/PageHeader';
import AdminCard from '@/components/admin/AdminCard';
import AdminModal from '@/components/admin/AdminModal';
import SearchBar from '@/components/admin/SearchBar';

interface Translation {
  locale: string;
  title: string;
  description: string;
}

interface Feature {
  featureId: number;
  featureName: string;
  category: string;
  iconName: string;
  displayOrder: number;
  isActive: boolean;
  translations?: Translation[];
}

export default function FeaturesPage() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [previewFeature, setPreviewFeature] = useState<Feature | null>(null);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const response = await apiFetch('/api/v1/features/admin/all');
      const data = await response.json();
      if (data.success) {
        setFeatures(data.data);
      }
    } catch (error) {
      console.error('Error fetching features:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (featureId: number) => {
    if (!confirm('Are you sure you want to delete this feature?')) return;
    
    try {
      await apiFetch(`/api/v1/features/admin/${featureId}`, {
        method: 'DELETE',
      });
      fetchFeatures();
    } catch (error) {
      console.error('Error deleting feature:', error);
    }
  };

  const filteredFeatures = features.filter(f =>
    f.featureName?.toLowerCase().includes(search.toLowerCase()) ||
    f.category?.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = features.filter(f => f.isActive).length;
  const inactiveCount = features.filter(f => !f.isActive).length;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Features Management"
        description="Manage website features and their translations"
        action={{
          label: 'Add Feature',
          onClick: () => {
            setEditingFeature(null);
            setShowModal(true);
          },
        }}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Total Features</p>
            <p className="text-xl font-bold text-gray-900">{features.length}</p>
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
          placeholder="Search features by name or category..."
        />
      </AdminCard>

      {/* Features Grid */}
      {loading ? (
        <AdminCard>
          <div className="py-12 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#039edb]"></div>
            <p className="mt-2 text-xs text-gray-500">Loading...</p>
          </div>
        </AdminCard>
      ) : filteredFeatures.length === 0 ? (
        <AdminCard>
          <div className="py-12 text-center">
            <SparklesIcon className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2 text-sm text-gray-500">No features found</p>
          </div>
        </AdminCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredFeatures.map((feature) => (
            <AdminCard key={feature.featureId} compact>
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 truncate">{feature.featureName}</h3>
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded-md bg-gradient-to-r from-[#039edb]/10 to-[#71bf44]/10 text-[#039edb] border border-[#039edb]/20 capitalize">
                      {feature.category}
                    </span>
                  </div>
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${feature.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                </div>

                {/* Translations */}
                {feature.translations && feature.translations.length > 0 && (
                  <div className="space-y-2 text-xs">
                    {feature.translations.map((trans, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded text-white ${trans.locale === 'id' ? 'bg-red-500' : 'bg-blue-500'}`}>
                            {trans.locale.toUpperCase()}
                          </span>
                          <span className="font-semibold text-gray-900 truncate">{trans.title}</span>
                        </div>
                        <p className="text-gray-600 line-clamp-2 text-xs leading-relaxed">{trans.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                  <span>Icon: {feature.iconName || 'None'}</span>
                  <span>Order: {feature.displayOrder}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-1.5 pt-2">
                  <button
                    onClick={() => {
                      setPreviewFeature(feature);
                      setShowPreviewModal(true);
                    }}
                    className="flex-1 px-2.5 py-1.5 text-xs font-semibold bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <EyeIcon className="h-3.5 w-3.5 inline mr-1" />
                    View
                  </button>
                  <button
                    onClick={() => {
                      setEditingFeature(feature);
                      setShowModal(true);
                    }}
                    className="px-2.5 py-1.5 text-[#039edb] border border-[#039edb] rounded-lg hover:bg-[#039edb] hover:text-white transition-colors"
                    title="Edit"
                  >
                    <PencilIcon className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(feature.featureId)}
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

      {/* Modals */}
      {showModal && (
        <FeatureModal
          feature={editingFeature}
          onClose={() => {
            setShowModal(false);
            setEditingFeature(null);
          }}
          onSave={() => {
            setShowModal(false);
            fetchFeatures();
          }}
        />
      )}

      {showPreviewModal && previewFeature && (
        <PreviewModal
          feature={previewFeature}
          onClose={() => {
            setShowPreviewModal(false);
            setPreviewFeature(null);
          }}
        />
      )}
    </div>
  );
}

function FeatureModal({
  feature,
  onClose,
  onSave,
}: {
  feature: Feature | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    featureName: feature?.featureName || '',
    category: feature?.category || '',
    iconName: feature?.iconName || '',
    displayOrder: feature?.displayOrder || 0,
    isActive: feature?.isActive ?? true,
    translations: feature?.translations || [
      { locale: 'id', title: '', description: '' },
      { locale: 'en', title: '', description: '' },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (feature) {
      setFormData({
        featureName: feature.featureName,
        category: feature.category,
        iconName: feature.iconName,
        displayOrder: feature.displayOrder,
        isActive: feature.isActive,
        translations: feature.translations || [
          { locale: 'id', title: '', description: '' },
          { locale: 'en', title: '', description: '' },
        ],
      });
    }
  }, [feature]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = feature
        ? `/api/v1/features/admin/${feature.featureId}`
        : '/api/v1/features/admin';

      const response = await apiFetch(endpoint, {
        method: feature ? 'PUT' : 'POST',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onSave();
      } else {
        setError(data.message || 'Failed to save feature');
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
      title={feature ? 'Edit Feature' : 'Add New Feature'}
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
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Feature Name</label>
            <input
              type="text"
              required
              value={formData.featureName}
              onChange={(e) => setFormData({ ...formData, featureName: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              />
            </div>
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
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Icon Name</label>
            <input
              type="text"
              value={formData.iconName}
              onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              placeholder="e.g., ChartBarIcon"
            />
          </div>

          {/* Translations */}
          <div className="space-y-2 pt-2 border-t border-gray-200">
            <label className="block text-xs font-semibold text-gray-700 mb-2">Translations</label>
            {formData.translations.map((trans, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 text-xs font-bold rounded text-white ${trans.locale === 'id' ? 'bg-red-500' : 'bg-blue-500'}`}>
                    {trans.locale.toUpperCase()}
                  </span>
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Title"
                    value={trans.title}
                    onChange={(e) => {
                      const newTranslations = [...formData.translations];
                      newTranslations[idx] = { ...trans, title: e.target.value };
                      setFormData({ ...formData, translations: newTranslations });
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                  />
                  <textarea
                    placeholder="Description"
                    value={trans.description}
                    onChange={(e) => {
                      const newTranslations = [...formData.translations];
                      newTranslations[idx] = { ...trans, description: e.target.value };
                      setFormData({ ...formData, translations: newTranslations });
                    }}
                    rows={2}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 text-[#039edb] focus:ring-[#039edb] border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="text-xs text-gray-700">Active Feature</label>
          </div>
        </div>
      </form>
    </AdminModal>
  );
}

function PreviewModal({ feature, onClose }: { feature: Feature; onClose: () => void }) {
  return (
    <AdminModal
      isOpen={true}
      onClose={onClose}
      title="Feature Details"
      size="lg"
      footer={
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-[#039edb] to-[#71bf44] rounded-lg hover:opacity-90 transition shadow-sm"
          >
            Close
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{feature.featureName}</h3>
          <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded-md bg-gradient-to-r from-[#039edb]/10 to-[#71bf44]/10 text-[#039edb] border border-[#039edb]/20 capitalize">
            {feature.category}
          </span>
        </div>

        {feature.translations && feature.translations.length > 0 && (
          <div className="space-y-3">
            {feature.translations.map((trans, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 text-xs font-bold rounded text-white ${trans.locale === 'id' ? 'bg-red-500' : 'bg-blue-500'}`}>
                    {trans.locale.toUpperCase()}
                  </span>
                  <span className="font-semibold text-gray-900">{trans.title}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{trans.description}</p>
              </div>
            ))}
          </div>
        )}

        <div className="pt-3 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
            <div>
              <span className="font-medium">Icon:</span> {feature.iconName || 'None'}
            </div>
            <div>
              <span className="font-medium">Order:</span> {feature.displayOrder}
            </div>
            <div>
              <span className="font-medium">Status:</span>{' '}
              <span className={feature.isActive ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                {feature.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminModal>
  );
}
