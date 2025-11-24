'use client';

import { useEffect, useState } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { apiFetch } from '@/lib/api-config';

interface Translation {
  locale: string;
  label: string;
  description: string;
}

interface BenefitStat {
  statId: number;
  statKey: string;
  value: string;
  displayOrder: number;
  iconName: string;
  isActive: boolean;
  translations?: Translation[];
}

export default function BenefitStatsPage() {
  const [stats, setStats] = useState<BenefitStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editingStat, setEditingStat] = useState<BenefitStat | null>(null);
  const [previewStat, setPreviewStat] = useState<BenefitStat | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await apiFetch('/api/v1/benefit-stats/admin');
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (statId: number) => {
    if (!confirm('Are you sure you want to delete this stat?')) return;

    try {
      const response = await apiFetch(`/api/v1/benefit-stats/admin/${statId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchStats();
      }
    } catch (error) {
      console.error('Error deleting stat:', error);
    }
  };

  const filteredStats = stats.filter(
    (stat) =>
      stat.statKey?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stat.value?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(stat.translations) && stat.translations.some((t) =>
        t.label?.toLowerCase().includes(searchTerm.toLowerCase())
      ))
  );

  const statsCount = {
    total: stats.length,
    active: stats.filter((s) => s.isActive).length,
    inactive: stats.filter((s) => !s.isActive).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ChartBarIcon className="w-8 h-8 text-[#039edb]" />
            Benefit Statistics
          </h1>
          <p className="text-gray-600 mt-2">Manage homepage benefit statistics and counters</p>
        </div>
        <button
          onClick={() => {
            setEditingStat(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90 transition shadow-lg"
        >
          <PlusIcon className="w-5 h-5" />
          Add Stat
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-[#039edb]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Stats</p>
              <p className="text-3xl font-bold text-gray-900">{statsCount.total}</p>
            </div>
            <ChartBarIcon className="w-12 h-12 text-[#039edb]/20" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-[#71bf44]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Stats</p>
              <p className="text-3xl font-bold text-[#71bf44]">{statsCount.active}</p>
            </div>
            <CheckCircleIcon className="w-12 h-12 text-[#71bf44]/20" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-gray-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Inactive Stats</p>
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
            placeholder="Search stats by key, value, or label..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#039edb]"></div>
        </div>
      ) : filteredStats.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <ChartBarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm ? 'No stats found' : 'No benefit stats yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? 'Try adjusting your search terms'
              : 'Start by adding your first benefit statistic'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => {
                setEditingStat(null);
                setShowModal(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90 transition"
            >
              <PlusIcon className="w-5 h-5" />
              Add First Stat
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredStats.map((stat) => (
            <div
              key={stat.statId}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#039edb]/30"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#039edb]/5 to-[#71bf44]/5 p-4 border-b">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">Key: {stat.statKey}</p>
                    <h3 className="font-bold text-gray-900 text-2xl">{stat.value}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Icon: {stat.iconName} | Order: {stat.displayOrder}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      stat.isActive
                        ? 'bg-gradient-to-r from-[#71bf44]/10 to-[#5a9936]/10 text-[#71bf44] border border-[#71bf44]/30'
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                    }`}
                  >
                    {stat.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                {stat.translations && stat.translations.length > 0 && (
                  <div className="space-y-2">
                    {stat.translations.slice(0, 2).map((trans, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-3 border">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-[#039edb]/10 text-[#039edb] rounded text-xs font-medium">
                            {trans.locale.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">{trans.label}</p>
                        {trans.description && (
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
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
                    setPreviewStat(stat);
                    setShowPreview(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition text-sm font-medium"
                >
                  <EyeIcon className="w-4 h-4" />
                  Preview
                </button>
                <button
                  onClick={() => {
                    setEditingStat(stat);
                    setShowModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#039edb] text-white rounded-lg hover:bg-[#028dc9] transition text-sm font-medium"
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(stat.statId)}
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
        <StatModal
          stat={editingStat}
          onClose={() => {
            setShowModal(false);
            setEditingStat(null);
          }}
          onSave={() => {
            setShowModal(false);
            fetchStats();
          }}
        />
      )}

      {showPreview && previewStat && (
        <PreviewModal
          stat={previewStat}
          onClose={() => {
            setShowPreview(false);
            setPreviewStat(null);
          }}
        />
      )}
    </div>
  );
}

function StatModal({
  stat,
  onClose,
  onSave,
}: {
  stat: BenefitStat | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    statKey: stat?.statKey || '',
    value: stat?.value || '',
    iconName: stat?.iconName || '',
    displayOrder: stat?.displayOrder || 1,
    isActive: stat?.isActive ?? true,
    translations: stat?.translations || [
      { locale: 'id', label: '', description: '' },
      { locale: 'en', label: '', description: '' },
    ],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = stat
        ? `/api/v1/benefit-stats/admin/${stat.statId}`
        : '/api/v1/benefit-stats/admin';

      const response = await apiFetch(endpoint, {
        method: stat ? 'PUT' : 'POST',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSave();
      }
    } catch (error) {
      console.error('Error saving stat:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full my-8">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-xl">
          <h2 className="text-xl font-bold text-gray-900">
            {stat ? 'Edit Benefit Stat' : 'Add New Benefit Stat'}
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
              <ChartBarIcon className="w-5 h-5 text-[#039edb]" />
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stat Key *
                </label>
                <input
                  type="text"
                  required
                  value={formData.statKey}
                  onChange={(e) => setFormData({ ...formData, statKey: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                  placeholder="e.g., happy_clients"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Value *</label>
                <input
                  type="text"
                  required
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                  placeholder="e.g., 1000+"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.iconName}
                  onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                  placeholder="e.g., users, calendar"
                />
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
            <h3 className="text-lg font-semibold text-gray-900">Translations</h3>

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
                      Label *
                    </label>
                    <input
                      type="text"
                      required
                      value={trans.label}
                      onChange={(e) => {
                        const newTrans = [...formData.translations];
                        newTrans[idx].label = e.target.value;
                        setFormData({ ...formData, translations: newTrans });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                      placeholder={`Label in ${trans.locale.toUpperCase()}`}
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
                      placeholder={`Description in ${trans.locale.toUpperCase()}`}
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
              {loading ? 'Saving...' : `${stat ? 'Update' : 'Create'} Stat`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PreviewModal({ stat, onClose }: { stat: BenefitStat; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Stat Preview</h2>
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
          <div className="text-center bg-gradient-to-r from-[#039edb]/5 to-[#71bf44]/5 rounded-lg p-8">
            <p className="text-5xl font-bold text-[#039edb] mb-2">{stat.value}</p>
            <p className="text-xs text-gray-500">Icon: {stat.iconName}</p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Stat Key</p>
              <p className="font-semibold text-gray-900">{stat.statKey}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <span
                className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                  stat.isActive
                    ? 'bg-gradient-to-r from-[#71bf44]/10 to-[#5a9936]/10 text-[#71bf44] border border-[#71bf44]/30'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {stat.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 col-span-2">
              <p className="text-sm text-gray-600 mb-1">Display Order</p>
              <p className="font-semibold text-gray-900">{stat.displayOrder}</p>
            </div>
          </div>

          {/* Translations */}
          {stat.translations && stat.translations.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Translations</h3>
              {stat.translations.map((trans: any, idx: number) => (
                <div key={idx} className="border rounded-lg p-4">
                  <span className="px-2 py-1 bg-[#039edb]/10 text-[#039edb] rounded text-xs font-medium">
                    {trans.locale?.toUpperCase()}
                  </span>
                  <p className="mt-2 font-medium text-gray-900">{trans.label}</p>
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
