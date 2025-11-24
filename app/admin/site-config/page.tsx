'use client';

import { useState, useEffect } from 'react';
import { Cog6ToothIcon, PlusIcon, TrashIcon, PencilIcon, EyeIcon } from '@heroicons/react/24/outline';
import { apiFetch, API_ENDPOINTS } from '@/lib/api-config';
import PageHeader from '@/components/admin/PageHeader';
import AdminCard from '@/components/admin/AdminCard';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import SearchBar from '@/components/admin/SearchBar';

interface SiteConfig {
  configId: number;
  configKey: string;
  configValue: string;
  valueType: 'string' | 'number' | 'boolean' | 'json';
  category: string;
  isPublic: boolean;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function SiteConfigPage() {
  const [configs, setConfigs] = useState<SiteConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<SiteConfig | null>(null);
  const [formData, setFormData] = useState({
    configKey: '',
    configValue: '',
    valueType: 'string' as SiteConfig['valueType'],
    category: 'general',
    isPublic: true,
    description: ''
  });

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    try {
      const response = await apiFetch(API_ENDPOINTS.SITE_CONFIG.LIST);
      const data = await response.json();
      if (data.success) {
        setConfigs(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching configs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiFetch(API_ENDPOINTS.SITE_CONFIG.CREATE, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setShowAddModal(false);
      resetForm();
      fetchConfigs();
    } catch (error) {
      console.error('Error creating config:', error);
      alert('Failed to create config');
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConfig) return;

    try {
      await apiFetch(API_ENDPOINTS.SITE_CONFIG.UPDATE(selectedConfig.configId), {
        method: 'PUT',
        body: JSON.stringify({
          configValue: formData.configValue,
          isPublic: formData.isPublic,
          description: formData.description
        }),
      });
      setShowEditModal(false);
      setSelectedConfig(null);
      resetForm();
      fetchConfigs();
    } catch (error) {
      console.error('Error updating config:', error);
      alert('Failed to update config');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this configuration?')) return;

    try {
      await apiFetch(API_ENDPOINTS.SITE_CONFIG.DELETE(id), {
        method: 'DELETE',
      });
      fetchConfigs();
    } catch (error) {
      console.error('Error deleting config:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      configKey: '',
      configValue: '',
      valueType: 'string',
      category: 'general',
      isPublic: true,
      description: ''
    });
  };

  const categories = Array.from(new Set(configs.map(c => c.category)));

  const filteredConfigs = configs.filter(config => {
    const matchesSearch = config.configKey.toLowerCase().includes(search.toLowerCase()) ||
      (config.description && config.description.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || config.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalConfigs = configs.length;
  const publicConfigs = configs.filter(c => c.isPublic).length;
  const privateConfigs = configs.filter(c => !c.isPublic).length;

  const columns = [
    {
      header: 'Key',
      render: (config: SiteConfig) => (
        <div>
          <div className="text-xs font-mono font-semibold text-gray-900">{config.configKey}</div>
          {config.description && (
            <div className="text-xs text-gray-500 mt-0.5">{config.description}</div>
          )}
        </div>
      ),
    },
    {
      header: 'Value',
      render: (config: SiteConfig) => (
        <div className="max-w-xs">
          {config.valueType === 'json' ? (
            <code className="text-xs text-gray-600 truncate block">{config.configValue.substring(0, 50)}...</code>
          ) : config.valueType === 'boolean' ? (
            <span className={`text-xs font-semibold ${config.configValue === 'true' ? 'text-green-600' : 'text-red-600'}`}>
              {config.configValue}
            </span>
          ) : (
            <span className="text-xs text-gray-700 truncate block">{config.configValue}</span>
          )}
        </div>
      ),
    },
    {
      header: 'Type',
      render: (config: SiteConfig) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200">
          {config.valueType}
        </span>
      ),
    },
    {
      header: 'Category',
      render: (config: SiteConfig) => (
        <span className="text-xs text-gray-600 capitalize">{config.category.replace('_', ' ')}</span>
      ),
    },
    {
      header: 'Visibility',
      render: (config: SiteConfig) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${
          config.isPublic
            ? 'bg-gradient-to-r from-[#039edb]/10 to-[#71bf44]/10 text-[#039edb] border border-[#039edb]/20'
            : 'bg-gray-50 text-gray-700 border border-gray-200'
        }`}>
          {config.isPublic ? 'Public' : 'Private'}
        </span>
      ),
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (config: SiteConfig) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => {
              setSelectedConfig(config);
              setShowPreviewModal(true);
            }}
            className="p-1.5 text-[#039edb] hover:bg-blue-50 rounded-lg transition-colors"
            title="View"
          >
            <EyeIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setSelectedConfig(config);
              setFormData({
                configKey: config.configKey,
                configValue: config.configValue,
                valueType: config.valueType,
                category: config.category,
                isPublic: config.isPublic,
                description: config.description || '',
              });
              setShowEditModal(true);
            }}
            className="p-1.5 text-[#039edb] hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(config.configId)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
      </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Site Configuration"
        description="Manage site-wide configuration settings"
        action={{
          label: 'Add Config',
          onClick: () => {
            resetForm();
            setShowAddModal(true);
          },
        }}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Total</p>
            <p className="text-xl font-bold text-gray-900">{totalConfigs}</p>
          </div>
        </AdminCard>
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Public</p>
            <p className="text-xl font-bold text-[#039edb]">{publicConfigs}</p>
          </div>
        </AdminCard>
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Private</p>
            <p className="text-xl font-bold text-gray-700">{privateConfigs}</p>
          </div>
        </AdminCard>
      </div>

      {/* Filters */}
      <AdminCard compact>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <SearchBar
            value={search}
            onChange={setSearch}
              placeholder="Search by key or description..."
            />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb] bg-white"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </AdminCard>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={filteredConfigs}
        loading={loading}
        emptyMessage="No configurations found. Click 'Add Config' to create one."
      />

      {/* Add Modal */}
      {showAddModal && (
        <AdminModal
          isOpen={true}
          onClose={() => {
            setShowAddModal(false);
            resetForm();
          }}
          title="Add New Configuration"
          size="md"
          footer={
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAdd}
                className="px-4 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-[#039edb] to-[#71bf44] rounded-lg hover:opacity-90 transition shadow-sm"
              >
                Create
              </button>
            </div>
          }
        >
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
                <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Config Key</label>
                  <input
                    type="text"
                  required
                    value={formData.configKey}
                    onChange={(e) => setFormData({ ...formData, configKey: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                  placeholder="config.key.name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Config Value</label>
                <input
                  type="text"
                    required
                  value={formData.configValue}
                  onChange={(e) => setFormData({ ...formData, configValue: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                  />
                </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Value Type</label>
                  <select
                    value={formData.valueType}
                    onChange={(e) => setFormData({ ...formData, valueType: e.target.value as SiteConfig['valueType'] })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb] bg-white"
                  >
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="json">JSON</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                    placeholder="general"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                  placeholder="Optional description"
                />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                  className="h-4 w-4 text-[#039edb] focus:ring-[#039edb] border-gray-300 rounded"
                />
                <label htmlFor="isPublic" className="text-xs text-gray-700">Public (accessible via API)</label>
              </div>
              </div>
            </form>
        </AdminModal>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedConfig && (
        <AdminModal
          isOpen={true}
          onClose={() => {
            setShowEditModal(false);
            setSelectedConfig(null);
          }}
          title="Edit Configuration"
          size="md"
          footer={
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedConfig(null);
                }}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleEdit}
                className="px-4 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-[#039edb] to-[#71bf44] rounded-lg hover:opacity-90 transition shadow-sm"
              >
                Save
              </button>
            </div>
          }
        >
          <form onSubmit={handleEdit} className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Config Key</label>
                <input
                  type="text"
                  value={formData.configKey}
                  disabled
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Config Value</label>
                {formData.valueType === 'json' ? (
                  <textarea
                    value={formData.configValue}
                    onChange={(e) => setFormData({ ...formData, configValue: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb] font-mono"
                  />
                ) : (
                  <input
                    type={formData.valueType === 'number' ? 'number' : 'text'}
                    required
                    value={formData.configValue}
                    onChange={(e) => setFormData({ ...formData, configValue: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                  />
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isPublicEdit"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                  className="h-4 w-4 text-[#039edb] focus:ring-[#039edb] border-gray-300 rounded"
                />
                <label htmlFor="isPublicEdit" className="text-xs text-gray-700">Public (accessible via API)</label>
              </div>
              </div>
            </form>
        </AdminModal>
      )}

      {/* Preview Modal */}
      {showPreviewModal && selectedConfig && (
        <AdminModal
          isOpen={true}
          onClose={() => {
            setShowPreviewModal(false);
            setSelectedConfig(null);
          }}
          title="Configuration Details"
          size="md"
          footer={
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowPreviewModal(false);
                  setSelectedConfig(null);
                }}
                className="px-4 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-[#039edb] to-[#71bf44] rounded-lg hover:opacity-90 transition shadow-sm"
              >
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-3">
              <div>
              <span className="text-xs font-semibold text-gray-700">Key:</span>
              <p className="text-xs font-mono text-gray-900 mt-1">{selectedConfig.configKey}</p>
              </div>
              <div>
              <span className="text-xs font-semibold text-gray-700">Value:</span>
              <div className="mt-1 p-2 bg-gray-50 rounded-lg border border-gray-200">
                {selectedConfig.valueType === 'json' ? (
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap">{selectedConfig.configValue}</pre>
                ) : (
                  <p className="text-xs text-gray-700">{selectedConfig.configValue}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                <span className="font-semibold text-gray-700">Type:</span>
                <p className="text-gray-600 mt-1">{selectedConfig.valueType}</p>
                </div>
                <div>
                <span className="font-semibold text-gray-700">Category:</span>
                <p className="text-gray-600 mt-1 capitalize">{selectedConfig.category.replace('_', ' ')}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Visibility:</span>
                <p className="text-gray-600 mt-1">{selectedConfig.isPublic ? 'Public' : 'Private'}</p>
              </div>
            </div>
              {selectedConfig.description && (
                <div>
                <span className="text-xs font-semibold text-gray-700">Description:</span>
                <p className="text-xs text-gray-600 mt-1">{selectedConfig.description}</p>
                </div>
              )}
          </div>
        </AdminModal>
      )}
    </div>
  );
}
