'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  Squares2X2Icon,
  MagnifyingGlassIcon,
  EyeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import { apiFetch } from '@/lib/api-config';

interface Translation {
  locale: string;
  displayName: string;
  description: string;
}

interface PlanFeature {
  planFeatureId: number;
  planId: number;
  featureName: string;
  displayOrder: number;
  isActive: boolean;
  translations?: Translation[];
}

interface PricingPlan {
  planId: number;
  planName: string;
  price: number;
  billingCycle: string;
}

export default function PricingPlanFeaturesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('planId');

  const [features, setFeatures] = useState<PlanFeature[]>([]);
  const [plan, setPlan] = useState<PricingPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editingFeature, setEditingFeature] = useState<PlanFeature | null>(null);
  const [previewFeature, setPreviewFeature] = useState<PlanFeature | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPlan = async () => {
    try {
      const response = await apiFetch(`/api/v1/pricing-plans/admin/${planId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPlan(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching plan:', error);
    }
  };

  const fetchFeatures = async () => {
    try {
      const response = await apiFetch(`/api/v1/pricing-plans/${planId}/features`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setFeatures(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching features:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (planId) {
      fetchPlan();
      fetchFeatures();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planId]);

  const handleDelete = async (featureId: number) => {
    if (!confirm('Are you sure you want to delete this feature?')) return;

    try {
      const response = await apiFetch(
        `/api/v1/pricing-plans/admin/${planId}/features/${featureId}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        fetchFeatures();
      }
    } catch (error) {
      console.error('Error deleting feature:', error);
    }
  };

  const filteredFeatures = features.filter(
    (feature) =>
      feature.featureName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.translations?.some((t) =>
        t.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const stats = {
    total: features.length,
    active: features.filter((f) => f.isActive).length,
    inactive: features.filter((f) => !f.isActive).length,
  };

  if (!planId) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <XCircleIcon className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Plan ID Required</h2>
        <p className="text-gray-600 mb-6">Please select a pricing plan first</p>
        <button
          onClick={() => router.push('/admin/pricing-plans')}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90 transition"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Go to Pricing Plans
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button
            onClick={() => router.push('/admin/pricing-plans')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#039edb] mb-3 transition"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Pricing Plans
          </button>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Squares2X2Icon className="w-8 h-8 text-[#039edb]" />
            Plan Features
          </h1>
          {plan && (
            <p className="text-gray-600 mt-2">
              Managing features for{' '}
              <span className="font-semibold text-[#039edb]">{plan.planName}</span> -{' '}
              <span className="text-sm">
                Rp {plan.price.toLocaleString('id-ID')}/{plan.billingCycle}
              </span>
            </p>
          )}
        </div>
        <button
          onClick={() => {
            setEditingFeature(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90 transition shadow-lg"
        >
          <PlusIcon className="w-5 h-5" />
          Add Feature
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-[#039edb]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Features</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Squares2X2Icon className="w-12 h-12 text-[#039edb]/20" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-[#71bf44]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Features</p>
              <p className="text-3xl font-bold text-[#71bf44]">{stats.active}</p>
            </div>
            <CheckCircleIcon className="w-12 h-12 text-[#71bf44]/20" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-gray-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Inactive Features</p>
              <p className="text-3xl font-bold text-gray-600">{stats.inactive}</p>
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
            placeholder="Search features by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
          />
        </div>
      </div>

      {/* Features Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#039edb]"></div>
        </div>
      ) : filteredFeatures.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Squares2X2Icon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm ? 'No features found' : 'No features yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? 'Try adjusting your search terms'
              : 'Start by adding your first feature to this pricing plan'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => {
                setEditingFeature(null);
                setShowModal(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90 transition"
            >
              <PlusIcon className="w-5 h-5" />
              Add First Feature
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredFeatures.map((feature) => (
            <div
              key={feature.planFeatureId}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-[#039edb]/30"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#039edb]/5 to-[#71bf44]/5 p-4 border-b">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      {feature.featureName}
                    </h3>
                    <span className="text-xs text-gray-500">Order: {feature.displayOrder}</span>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      feature.isActive
                        ? 'bg-gradient-to-r from-[#71bf44]/10 to-[#5a9936]/10 text-[#71bf44] border border-[#71bf44]/30'
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                    }`}
                  >
                    {feature.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {feature.translations && feature.translations.length > 0 && (
                  <div className="space-y-2">
                    {feature.translations.slice(0, 2).map((trans, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-3 border">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-[#039edb]/10 text-[#039edb] rounded text-xs font-medium">
                            {trans.locale.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {trans.displayName || '-'}
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
              <div className="border-t p-4 bg-gray-50 flex gap-2">
                <button
                  onClick={() => {
                    setPreviewFeature(feature);
                    setShowPreview(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition text-sm font-medium"
                >
                  <EyeIcon className="w-4 h-4" />
                  Preview
                </button>
                <button
                  onClick={() => {
                    setEditingFeature(feature);
                    setShowModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#039edb] text-white rounded-lg hover:bg-[#028dc9] transition text-sm font-medium"
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(feature.planFeatureId)}
                  className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {showModal && (
        <FeatureModal
          feature={editingFeature}
          planId={Number(planId)}
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

      {showPreview && previewFeature && (
        <PreviewModal
          feature={previewFeature}
          onClose={() => {
            setShowPreview(false);
            setPreviewFeature(null);
          }}
        />
      )}
    </div>
  );
}

function FeatureModal({
  feature,
  planId,
  onClose,
  onSave,
}: {
  feature: PlanFeature | null;
  planId: number;
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    featureName: feature?.featureName || '',
    displayOrder: feature?.displayOrder || 1,
    isActive: feature?.isActive ?? true,
    translations: feature?.translations || [
      { locale: 'id', displayName: '', description: '' },
      { locale: 'en', displayName: '', description: '' },
    ],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = feature
        ? `/api/v1/pricing-plans/admin/${planId}/features/${feature.planFeatureId}`
        : `/api/v1/pricing-plans/admin/${planId}/features`;

      const response = await apiFetch(endpoint, {
        method: feature ? 'PUT' : 'POST',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSave();
      }
    } catch (error) {
      console.error('Error saving feature:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full my-8">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-xl">
          <h2 className="text-xl font-bold text-gray-900">
            {feature ? 'Edit Feature' : 'Add New Feature'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Squares2X2Icon className="w-5 h-5 text-[#039edb]" />
              Basic Information
            </h3>

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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                  placeholder="e.g., unlimited_users"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Use lowercase with underscores (e.g., advanced_analytics)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) =>
                    setFormData({ ...formData, displayOrder: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Translations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <DocumentDuplicateIcon className="w-5 h-5 text-[#039edb]" />
              Translations
            </h3>

            {formData.translations.map((trans: any, idx: number) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#039edb]/10 to-[#71bf44]/10 text-[#039edb] rounded-full text-sm font-medium">
                    {trans.locale.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={trans.displayName}
                      onChange={(e) => {
                        const newTrans = [...formData.translations];
                        newTrans[idx].displayName = e.target.value;
                        setFormData({ ...formData, translations: newTrans });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                      placeholder={`Feature name in ${trans.locale.toUpperCase()}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={trans.description}
                      onChange={(e) => {
                        const newTrans = [...formData.translations];
                        newTrans[idx].description = e.target.value;
                        setFormData({ ...formData, translations: newTrans });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                      rows={2}
                      placeholder={`Feature description in ${trans.locale.toUpperCase()}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Status */}
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

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
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
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                `${feature ? 'Update' : 'Create'} Feature`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PreviewModal({ feature, onClose }: { feature: PlanFeature; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Feature Preview</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Feature Name</p>
              <p className="font-semibold text-gray-900">{feature.featureName}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <span
                className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                  feature.isActive
                    ? 'bg-gradient-to-r from-[#71bf44]/10 to-[#5a9936]/10 text-[#71bf44] border border-[#71bf44]/30'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {feature.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 col-span-2">
              <p className="text-sm text-gray-600 mb-1">Display Order</p>
              <p className="font-semibold text-gray-900">{feature.displayOrder}</p>
            </div>
          </div>

          {/* Translations */}
          {feature.translations && feature.translations.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Translations</h3>
              {feature.translations.map((trans: any, idx: number) => (
                <div key={idx} className="border rounded-lg p-4">
                  <span className="px-2 py-1 bg-[#039edb]/10 text-[#039edb] rounded text-xs font-medium">
                    {trans.locale?.toUpperCase()}
                  </span>
                  {trans.displayName && (
                    <p className="mt-2 font-medium text-gray-900">{trans.displayName}</p>
                  )}
                  {trans.description && (
                    <p className="mt-1 text-sm text-gray-600">{trans.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t px-6 py-4">
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
