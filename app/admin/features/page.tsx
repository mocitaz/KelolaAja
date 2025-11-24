'use client';

import { useEffect, useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon, EyeIcon } from '@heroicons/react/24/outline';

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
  const [showModal, setShowModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [previewFeature, setPreviewFeature] = useState<Feature | null>(null);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8080/api/v1/features/admin/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      const token = localStorage.getItem('accessToken');
      await fetch(`http://localhost:8080/api/v1/features/admin/${featureId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFeatures();
    } catch (error) {
      console.error('Error deleting feature:', error);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#039edb] to-[#71bf44] bg-clip-text text-transparent">
          Features Management
        </h1>
        <button
          onClick={() => { setEditingFeature(null); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90 transition"
        >
          <PlusIcon className="h-5 w-5" />
          Add Feature
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Features</p>
              <p className="text-2xl font-bold text-gray-800">{features.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-800">{features.filter(f => f.isActive).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-gray-800">{features.filter(f => !f.isActive).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#039edb] mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : features.length === 0 ? (
          <div className="col-span-3 text-center py-12 bg-white rounded-lg shadow-md">
            <PlusIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No features found</p>
          </div>
        ) : (
          features.map((feature) => (
            <div key={feature.featureId} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-[#039edb] to-[#71bf44] p-4 text-white">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{feature.featureName}</h3>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-white/20 backdrop-blur-sm capitalize">
                      {feature.category}
                    </span>
                  </div>
                  {feature.isActive ? (
                    <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg"></div>
                  ) : (
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                {feature.translations && feature.translations.length > 0 && (
                  <div className="mb-4">
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold">ID</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-800">
                          {feature.translations.find(t => t.locale === 'id')?.title || '-'}
                        </p>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2 pl-7">
                        {feature.translations.find(t => t.locale === 'id')?.description || '-'}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold">EN</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-800">
                          {feature.translations.find(t => t.locale === 'en')?.title || '-'}
                        </p>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2 pl-7">
                        {feature.translations.find(t => t.locale === 'en')?.description || '-'}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pt-3 border-t">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    {feature.iconName || 'No icon'}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                    Order: {feature.displayOrder}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => { setPreviewFeature(feature); setShowPreviewModal(true); }}
                    className="flex-1 px-3 py-2 text-sm bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => { setEditingFeature(feature); setShowModal(true); }}
                    className="px-3 py-2 text-sm border-2 border-[#039edb] text-[#039edb] rounded-lg hover:bg-[#039edb] hover:text-white transition-colors"
                    title="Edit"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(feature.featureId)}
                    className="px-3 py-2 text-sm border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                    title="Delete"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <FeatureModal feature={editingFeature} onClose={() => { setShowModal(false); setEditingFeature(null); }} onSave={() => { setShowModal(false); fetchFeatures(); }} />
      )}

      {showPreviewModal && previewFeature && (
        <PreviewModal feature={previewFeature} onClose={() => { setShowPreviewModal(false); setPreviewFeature(null); }} />
      )}
    </div>
  );
}

function PreviewModal({ feature, onClose }: { feature: Feature; onClose: () => void; }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-[#039edb] to-[#71bf44] bg-clip-text text-transparent">
            Feature Details
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Feature Name</p>
              <p className="font-semibold">{feature.featureName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Category</p>
              <p className="font-semibold capitalize">{feature.category}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Icon Name</p>
              <p className="font-semibold">{feature.iconName || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Display Order</p>
              <p className="font-semibold">{feature.displayOrder}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600">Status</p>
            <div className="mt-1">
              {feature.isActive ? (
                <span className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white">
                  Active
                </span>
              ) : (
                <span className="px-3 py-1 text-sm rounded-full bg-gray-400 text-white">
                  Inactive
                </span>
              )}
            </div>
          </div>

          {feature.translations && feature.translations.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-2">Translations</p>
              <div className="space-y-3">
                {feature.translations.map((trans, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <div className="flex items-center mb-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold text-xs ${
                        trans.locale === 'id' ? 'bg-red-500' : 'bg-blue-500'
                      }`}>
                        {trans.locale.toUpperCase()}
                      </div>
                      <span className="ml-2 font-medium text-sm">{trans.locale === 'id' ? 'Indonesian' : 'English'}</span>
                    </div>
                    <p className="font-medium mb-1">{trans.title}</p>
                    <p className="text-sm text-gray-600">{trans.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FeatureModal({ feature, onClose, onSave }: { feature: Feature | null; onClose: () => void; onSave: () => void; }) {
  const [formData, setFormData] = useState({
    featureName: feature?.featureName || '',
    category: feature?.category || 'core',
    iconName: feature?.iconName || '',
    displayOrder: feature?.displayOrder || 1,
    isActive: feature?.isActive ?? true,
    translations: feature?.translations || [
      { locale: 'id', title: '', description: '' },
      { locale: 'en', title: '', description: '' },
    ],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('accessToken');
      const url = feature
        ? `http://localhost:8080/api/v1/features/admin/${feature.featureId}`
        : 'http://localhost:8080/api/v1/features/admin';

      await fetch(url, {
        method: feature ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      onSave();
    } catch (error) {
      console.error('Error saving feature:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4">
          <h3 className="text-xl font-bold bg-gradient-to-r from-[#039edb] to-[#71bf44] bg-clip-text text-transparent">
            {feature ? 'Edit Feature' : 'Add New Feature'}
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Basic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feature Name *
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={formData.featureName} 
                    onChange={(e) => setFormData({ ...formData, featureName: e.target.value })} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                    placeholder="e.g., Inventory Management"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    required 
                    value={formData.category} 
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                  >
                    <option value="core">Core</option>
                    <option value="advanced">Advanced</option>
                    <option value="premium">Premium</option>
                    <option value="integration">Integration</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon Name
                  </label>
                  <input 
                    type="text" 
                    value={formData.iconName} 
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                    placeholder="e.g., ChartBarIcon"
                  />
                  <p className="mt-1 text-xs text-gray-500">Heroicons icon name</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Order *
                  </label>
                  <input 
                    type="number" 
                    min="1"
                    required
                    value={formData.displayOrder} 
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-gray-500">Lower numbers appear first</p>
                </div>
              </div>

              <div className="mt-4">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={formData.isActive} 
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} 
                    className="h-4 w-4 rounded border-gray-300 text-[#039edb] focus:ring-[#039edb]"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Active (visible on website)</span>
                </label>
              </div>
            </div>

            {/* Translations */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Translations</h4>
              <div className="space-y-4">
                {formData.translations.map((trans, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center mb-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                        trans.locale === 'id' ? 'bg-gradient-to-r from-red-500 to-white' : 'bg-gradient-to-r from-blue-500 to-red-500'
                      }`}>
                        {trans.locale.toUpperCase()}
                      </div>
                      <span className="ml-2 font-semibold text-gray-700">
                        {trans.locale === 'id' ? 'Bahasa Indonesia' : 'English'}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title *
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder={trans.locale === 'id' ? 'Judul Fitur' : 'Feature Title'} 
                          value={trans.title} 
                          onChange={(e) => {
                            const newTrans = [...formData.translations];
                            newTrans[idx].title = e.target.value;
                            setFormData({ ...formData, translations: newTrans });
                          }} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description *
                        </label>
                        <textarea 
                          required
                          placeholder={trans.locale === 'id' ? 'Deskripsi fitur...' : 'Feature description...'} 
                          value={trans.description} 
                          onChange={(e) => {
                            const newTrans = [...formData.translations];
                            newTrans[idx].description = e.target.value;
                            setFormData({ ...formData, translations: newTrans });
                          }} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent bg-white" 
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="px-6 py-2 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition min-w-[100px]"
            >
              {loading ? 'Saving...' : feature ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
