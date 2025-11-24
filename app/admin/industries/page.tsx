'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusIcon, PencilIcon, TrashIcon, BriefcaseIcon, ListBulletIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { apiFetch } from '@/lib/api-config';
import PageHeader from '@/components/admin/PageHeader';
import AdminCard from '@/components/admin/AdminCard';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import SearchBar from '@/components/admin/SearchBar';

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
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingIndustry, setEditingIndustry] = useState<Industry | null>(null);

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
      await apiFetch(`/api/v1/industries/admin/${industryId}`, {
        method: 'DELETE',
      });
      fetchIndustries();
    } catch (error) {
      console.error('Error deleting industry:', error);
    }
  };

  const filteredIndustries = industries.filter(
    (industry) =>
      industry.industrySlug?.toLowerCase().includes(search.toLowerCase()) ||
      industry.iconName?.toLowerCase().includes(search.toLowerCase()) ||
      (Array.isArray(industry.translations) && industry.translations.some((t) =>
        t.name?.toLowerCase().includes(search.toLowerCase())
      ))
  );

  const activeCount = industries.filter(i => i.isActive).length;
  const inactiveCount = industries.filter(i => !i.isActive).length;

  const columns = [
    {
      header: 'Slug',
      render: (industry: Industry) => (
        <span className="text-xs font-mono text-gray-600">{industry.industrySlug}</span>
      ),
    },
    {
      header: 'Name',
      render: (industry: Industry) => {
        const idTrans = industry.translations?.find(t => t.locale === 'id');
        return (
          <span className="text-sm font-medium text-gray-900">{idTrans?.name || '-'}</span>
        );
      },
    },
    {
      header: 'Icon',
      render: (industry: Industry) => (
        <span className="text-xs text-gray-600">{industry.iconName || '-'}</span>
      ),
    },
    {
      header: 'Order',
      render: (industry: Industry) => (
        <span className="text-xs text-gray-600">{industry.displayOrder}</span>
      ),
    },
    {
      header: 'Status',
      render: (industry: Industry) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${
          industry.isActive
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {industry.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (industry: Industry) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => router.push(`/admin/industries/${industry.industryId}/problems`)}
            className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
            title="Problems"
          >
            <ListBulletIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => router.push(`/admin/industries/${industry.industryId}/solutions`)}
            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Solutions"
          >
            <LightBulbIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setEditingIndustry(industry);
              setShowModal(true);
            }}
            className="p-1.5 text-[#039edb] hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(industry.industryId)}
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
        title="Industries"
        description="Manage industry solutions and their content"
        action={{
          label: 'Add Industry',
          onClick: () => {
            setEditingIndustry(null);
            setShowModal(true);
          },
        }}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Total</p>
            <p className="text-xl font-bold text-gray-900">{industries.length}</p>
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
          placeholder="Search by slug, icon, or name..."
        />
      </AdminCard>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={filteredIndustries}
        loading={loading}
        emptyMessage="No industries found. Click 'Add Industry' to create one."
      />

      {/* Modal */}
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
    displayOrder: industry?.displayOrder || 0,
    isActive: industry?.isActive ?? true,
    translations: industry?.translations || [
      { locale: 'id', name: '', description: '', heroTitle: '', heroDescription: '' },
      { locale: 'en', name: '', description: '', heroTitle: '', heroDescription: '' },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (industry) {
      setFormData({
        industrySlug: industry.industrySlug,
        iconName: industry.iconName,
        displayOrder: industry.displayOrder,
        isActive: industry.isActive,
        translations: industry.translations || [
          { locale: 'id', name: '', description: '', heroTitle: '', heroDescription: '' },
          { locale: 'en', name: '', description: '', heroTitle: '', heroDescription: '' },
        ],
      });
    }
  }, [industry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = industry
        ? `/api/v1/industries/admin/${industry.industryId}`
        : '/api/v1/industries/admin';

      const response = await apiFetch(endpoint, {
        method: industry ? 'PUT' : 'POST',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onSave();
      } else {
        setError(data.message || 'Failed to save industry');
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
      title={industry ? 'Edit Industry' : 'Add New Industry'}
      size="xl"
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
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                required
                value={formData.industrySlug}
                onChange={(e) => setFormData({ ...formData, industrySlug: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                placeholder="industry-slug"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Icon Name</label>
              <input
                type="text"
                value={formData.iconName}
                onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
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
                <div className="grid grid-cols-1 gap-2">
                  <input
                    type="text"
                    placeholder="Name"
                    value={trans.name}
                    onChange={(e) => {
                      const newTranslations = [...formData.translations];
                      newTranslations[idx] = { ...trans, name: e.target.value };
                      setFormData({ ...formData, translations: newTranslations });
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                  />
                  <input
                    type="text"
                    placeholder="Hero Title"
                    value={trans.heroTitle}
                    onChange={(e) => {
                      const newTranslations = [...formData.translations];
                      newTranslations[idx] = { ...trans, heroTitle: e.target.value };
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
                  <textarea
                    placeholder="Hero Description"
                    value={trans.heroDescription}
                    onChange={(e) => {
                      const newTranslations = [...formData.translations];
                      newTranslations[idx] = { ...trans, heroDescription: e.target.value };
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
            <label htmlFor="isActive" className="text-xs text-gray-700">Active</label>
          </div>
        </div>
      </form>
    </AdminModal>
  );
}
