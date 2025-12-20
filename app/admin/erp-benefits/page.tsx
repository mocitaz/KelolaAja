'use client';

import { useEffect, useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { apiFetch } from '@/lib/api-config';
import PageHeader from '@/components/admin/PageHeader';
import AdminCard from '@/components/admin/AdminCard';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import SearchBar from '@/components/admin/SearchBar';

interface Translation {
  locale: string;
  title: string;
  description: string;
}

interface ERPBenefit {
  benefitId: number;
  iconName: string;
  displayOrder: number;
  isActive: boolean;
  translations?: Translation[] | Record<string, any>;
}

export default function ERPBenefitsPage() {
  const [benefits, setBenefits] = useState<ERPBenefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState<ERPBenefit | null>(null);

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchBenefits = async () => {
    try {
      const response = await apiFetch('/api/v1/erp-benefits/admin');
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setBenefits(data.data);
      }
    } catch (error) {
      console.error('Error fetching benefits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (benefitId: number) => {
    if (!confirm('Are you sure you want to delete this benefit?')) return;
    try {
      await apiFetch(`/api/v1/erp-benefits/admin/${benefitId}`, {
        method: 'DELETE',
      });
      fetchBenefits();
    } catch (error) {
      console.error('Error deleting benefit:', error);
    }
  };

  // Helper function to get translation content safely
  const getBenefitContent = (benefit: ERPBenefit, locale: string) => {
    let content: { title: string; description: string } | undefined;

    if (Array.isArray(benefit.translations)) {
      const found = benefit.translations.find(t => t.locale === locale);
      if (found) content = found;
    } else if (benefit.translations && typeof benefit.translations === 'object') {
      // @ts-ignore
      const trans = benefit.translations[locale];
      if (trans) {
        content = {
          title: trans.title || '',
          description: trans.description || ''
        };
      }
    }

    if (!content) return { title: '', description: '' };
    return content;
  };

  const filteredBenefits = benefits.filter(
    (benefit) => {
      if (!search) return true;
      const searchLower = search.toLowerCase();

      const idContent = getBenefitContent(benefit, 'id');
      const enContent = getBenefitContent(benefit, 'en');
      const matchesTrans = idContent.title.toLowerCase().includes(searchLower) ||
        enContent.title.toLowerCase().includes(searchLower);

      return matchesTrans;
    }
  );

  const activeCount = benefits.filter(b => b.isActive).length;
  const inactiveCount = benefits.filter(b => !b.isActive).length;

  const columns = [
    {
      header: 'Title',
      render: (benefit: ERPBenefit) => {
        const idContent = getBenefitContent(benefit, 'id');
        return (
          <span className="text-sm font-medium text-gray-900">{idContent.title || '-'}</span>
        );
      },
    },
    {
      header: 'Icon',
      render: (benefit: ERPBenefit) => (
        <span className="text-xs text-gray-600">{benefit.iconName || '-'}</span>
      ),
    },
    {
      header: 'Order',
      render: (benefit: ERPBenefit) => (
        <span className="text-xs text-gray-600">{benefit.displayOrder}</span>
      ),
    },
    {
      header: 'Status',
      render: (benefit: ERPBenefit) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${benefit.isActive
          ? 'bg-green-50 text-green-700 border border-green-200'
          : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
          {benefit.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (benefit: ERPBenefit) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => {
              setEditingBenefit(benefit);
              setShowModal(true);
            }}
            className="p-1.5 text-[#039edb] hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(benefit.benefitId)}
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
        title="ERP Benefits"
        description="Manage ERP benefits displayed on homepage"
        action={{
          label: 'Add Benefit',
          onClick: () => {
            setEditingBenefit(null);
            setShowModal(true);
          },
        }}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Total</p>
            <p className="text-xl font-bold text-gray-900">{benefits.length}</p>
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
          placeholder="Search by icon or title..."
        />
      </AdminCard>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={filteredBenefits}
        loading={loading}
        emptyMessage="No ERP benefits found. Click 'Add Benefit' to create one."
      />

      {/* Modal */}
      {showModal && (
        <ERPBenefitModal
          benefit={editingBenefit}
          onClose={() => {
            setShowModal(false);
            setEditingBenefit(null);
          }}
          onSave={() => {
            setShowModal(false);
            fetchBenefits();
          }}
        />
      )}
    </div>
  );
}

function ERPBenefitModal({
  benefit,
  onClose,
  onSave,
}: {
  benefit: ERPBenefit | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    iconName: benefit?.iconName || '',
    displayOrder: benefit?.displayOrder || 0,
    isActive: benefit?.isActive ?? true,
    translations: [
      { locale: 'id', title: '', description: '' },
      { locale: 'en', title: '', description: '' },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (benefit) {
      // Helper to extract content correctly
      const getTrans = (locale: string) => {
        if (Array.isArray(benefit.translations)) {
          const found = benefit.translations.find(t => t.locale === locale);
          return found ? { title: found.title, description: found.description } : null;
        } else if (benefit.translations && typeof benefit.translations === 'object') {
          // @ts-ignore
          const trans = benefit.translations[locale];
          if (trans) return { title: trans.title || '', description: trans.description || '' };
        }
        return null;
      };

      const idTrans = getTrans('id');
      const enTrans = getTrans('en');

      setFormData({
        iconName: benefit.iconName,
        displayOrder: benefit.displayOrder,
        isActive: benefit.isActive,
        translations: [
          { locale: 'id', title: idTrans?.title || '', description: idTrans?.description || '' },
          { locale: 'en', title: enTrans?.title || '', description: enTrans?.description || '' },
        ],
      });
    }
  }, [benefit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = benefit
        ? `/api/v1/erp-benefits/admin/${benefit.benefitId}`
        : '/api/v1/erp-benefits/admin';

      // Transform translations to object map
      const translationsMap: Record<string, any> = {};
      formData.translations.forEach((t: any) => {
        translationsMap[t.locale] = {
          title: t.title,
          description: t.description
        };
      });

      const submitData = {
        iconName: formData.iconName,
        displayOrder: formData.displayOrder,
        isActive: formData.isActive,
        translations: translationsMap,
      };

      const response = await apiFetch(endpoint, {
        method: benefit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onSave();
      } else {
        setError(data.message || 'Failed to save benefit');
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
      title={benefit ? 'Edit ERP Benefit' : 'Add New ERP Benefit'}
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
            <label htmlFor="isActive" className="text-xs text-gray-700">Active</label>
          </div>
        </div>
      </form>
    </AdminModal>
  );
}
