'use client';

import { useState, useEffect } from 'react';
import { Cog6ToothIcon, MagnifyingGlassIcon, PlusIcon, TrashIcon, PencilIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { apiFetch } from '@/lib/api-config';

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
  const [searchTerm, setSearchTerm] = useState('');
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
      const response: any = await apiFetch('/site-config/admin', {
        method: 'GET',
      });
      setConfigs(response.data || []);
    } catch (error) {
      console.error('Error fetching configs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiFetch('/site-config/admin', {
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
      await apiFetch(`/site-config/admin/${selectedConfig.configId}`, {
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
      await apiFetch(`/site-config/admin/${id}`, {
        method: 'DELETE',
      });
      fetchConfigs();
    } catch (error) {
      console.error('Error deleting config:', error);
      alert('Failed to delete config');
    }
  };

  const openEditModal = (config: SiteConfig) => {
    setSelectedConfig(config);
    setFormData({
      configKey: config.configKey,
      configValue: config.configValue,
      valueType: config.valueType,
      category: config.category,
      isPublic: config.isPublic,
      description: config.description || ''
    });
    setShowEditModal(true);
  };

  const openPreviewModal = (config: SiteConfig) => {
    setSelectedConfig(config);
    setShowPreviewModal(true);
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

  const filteredConfigs = configs.filter((config) => {
    const matchesSearch = config.configKey.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (config.description && config.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || config.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalConfigs = configs.length;
  const publicConfigs = configs.filter(c => c.isPublic).length;
  const privateConfigs = configs.filter(c => !c.isPublic).length;

  const renderValueInput = () => {
    switch (formData.valueType) {
      case 'boolean':
        return (
          <select
            value={formData.configValue}
            onChange={(e) => setFormData({ ...formData, configValue: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
            required
          >
            <option value="">Select value</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        );
      case 'number':
        return (
          <input
            type="number"
            value={formData.configValue}
            onChange={(e) => setFormData({ ...formData, configValue: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
            required
          />
        );
      case 'json':
        return (
          <textarea
            value={formData.configValue}
            onChange={(e) => setFormData({ ...formData, configValue: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent font-mono text-sm"
            rows={6}
            placeholder='{"key": "value"}'
            required
          />
        );
      default:
        return (
          <input
            type="text"
            value={formData.configValue}
            onChange={(e) => setFormData({ ...formData, configValue: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
            required
          />
        );
    }
  };

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
          Site Configuration
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <PlusIcon className="w-5 h-5" />
          Add Config
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Configs</p>
              <p className="text-2xl font-bold text-gray-800">{totalConfigs}</p>
            </div>
            <Cog6ToothIcon className="w-10 h-10 text-[#039edb]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Public</p>
              <p className="text-2xl font-bold text-gray-800">{publicConfigs}</p>
            </div>
            <div className="w-3 h-3 bg-gradient-to-r from-[#039edb] to-[#71bf44] rounded-full"></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Private</p>
              <p className="text-2xl font-bold text-gray-800">{privateConfigs}</p>
            </div>
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
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
              placeholder="Search by key or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Configs Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Key</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Value</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Visibility</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredConfigs.map((config) => (
                <tr key={config.configId} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-mono text-sm text-gray-800">{config.configKey}</div>
                    {config.description && (
                      <div className="text-xs text-gray-500 mt-1">{config.description}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-800 max-w-xs truncate">
                      {config.valueType === 'json' ? (
                        <code className="text-xs">{config.configValue.substring(0, 50)}...</code>
                      ) : config.valueType === 'boolean' ? (
                        <span className={config.configValue === 'true' ? 'text-green-600' : 'text-red-600'}>
                          {config.configValue}
                        </span>
                      ) : (
                        config.configValue
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                      {config.valueType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm capitalize text-gray-700">
                      {config.category.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {config.isPublic ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white">
                        Public
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-400 text-white">
                        Private
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openPreviewModal(config)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => openEditModal(config)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                        title="Edit"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(config.configId)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredConfigs.length === 0 && (
            <div className="text-center py-12">
              <Cog6ToothIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No configurations found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold bg-gradient-to-r from-[#039edb] to-[#71bf44] bg-clip-text text-transparent">
                Add New Configuration
              </h2>
              <button onClick={() => { setShowAddModal(false); resetForm(); }} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAdd}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Config Key */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Config Key *
                  </label>
                  <input
                    type="text"
                    value={formData.configKey}
                    onChange={(e) => setFormData({ ...formData, configKey: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent font-mono"
                    placeholder="contact_email"
                    required
                  />
                </div>

                {/* Value Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Value Type *
                  </label>
                  <select
                    value={formData.valueType}
                    onChange={(e) => setFormData({ ...formData, valueType: e.target.value as SiteConfig['valueType'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                    required
                  >
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="json">JSON</option>
                  </select>
                </div>
              </div>

              {/* Config Value */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Config Value *
                </label>
                {renderValueInput()}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                    placeholder="general"
                    required
                  />
                </div>

                {/* Is Public */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visibility *
                  </label>
                  <select
                    value={formData.isPublic ? 'true' : 'false'}
                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.value === 'true' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                  >
                    <option value="true">Public</option>
                    <option value="false">Private</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                  rows={3}
                  placeholder="Description of this configuration..."
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); resetForm(); }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90"
                >
                  Add Config
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold bg-gradient-to-r from-[#039edb] to-[#71bf44] bg-clip-text text-transparent">
                Edit Configuration
              </h2>
              <button onClick={() => { setShowEditModal(false); resetForm(); }} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleEdit}>
              {/* Config Key (Read-only) */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Config Key
                </label>
                <input
                  type="text"
                  value={formData.configKey}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono"
                  disabled
                />
              </div>

              {/* Config Value */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Config Value *
                </label>
                {renderValueInput()}
              </div>

              {/* Is Public */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visibility *
                </label>
                <select
                  value={formData.isPublic ? 'true' : 'false'}
                  onChange={(e) => setFormData({ ...formData, isPublic: e.target.value === 'true' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                >
                  <option value="true">Public</option>
                  <option value="false">Private</option>
                </select>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); resetForm(); }}
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
      {showPreviewModal && selectedConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold bg-gradient-to-r from-[#039edb] to-[#71bf44] bg-clip-text text-transparent">
                Configuration Details
              </h2>
              <button onClick={() => setShowPreviewModal(false)} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Config Key</p>
                <p className="font-mono text-lg font-semibold text-gray-800">{selectedConfig.configKey}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Config Value</p>
                {selectedConfig.valueType === 'json' ? (
                  <pre className="mt-1 p-3 bg-gray-50 rounded-lg overflow-x-auto font-mono text-sm">
                    {JSON.stringify(JSON.parse(selectedConfig.configValue), null, 2)}
                  </pre>
                ) : (
                  <p className="text-lg font-semibold text-gray-800">{selectedConfig.configValue}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Value Type</p>
                  <p className="font-medium capitalize">{selectedConfig.valueType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-medium capitalize">{selectedConfig.category.replace('_', ' ')}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Visibility</p>
                <div className="mt-1">
                  {selectedConfig.isPublic ? (
                    <span className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white">
                      Public
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-sm rounded-full bg-gray-400 text-white">
                      Private
                    </span>
                  )}
                </div>
              </div>

              {selectedConfig.description && (
                <div>
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="text-gray-800">{selectedConfig.description}</p>
                </div>
              )}

              {selectedConfig.createdAt && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Created At</p>
                    <p className="text-sm text-gray-800">
                      {new Date(selectedConfig.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {selectedConfig.updatedAt && (
                    <div>
                      <p className="text-sm text-gray-600">Updated At</p>
                      <p className="text-sm text-gray-800">
                        {new Date(selectedConfig.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
