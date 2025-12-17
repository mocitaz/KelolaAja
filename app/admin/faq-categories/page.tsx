'use client';

import { useEffect, useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, FolderIcon } from '@heroicons/react/24/outline';
import { apiFetch } from '@/lib/api-config';
import PageHeader from '@/components/admin/PageHeader';
import AdminCard from '@/components/admin/AdminCard';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';

interface FAQCategory {
  categoryId: number;
  name: string;
  description?: string;
  displayOrder: number;
  createdAt: string;
  faqCount?: number;
}

export default function FAQCategoriesPage() {
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<FAQCategory | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await apiFetch('/api/v1/admin/faq-categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure? This will also affect related FAQs.')) return;
    try {
      await apiFetch(`/api/v1/admin/faq-categories/${id}`, {
        method: 'DELETE',
      });
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const columns = [
    {
      header: 'Name',
      render: (category: FAQCategory) => (
        <span className="text-sm font-medium text-gray-900">{category.name}</span>
      ),
    },
    {
      header: 'Description',
      render: (category: FAQCategory) => (
        <span className="text-xs text-gray-600">{category.description || '-'}</span>
      ),
    },
    {
      header: 'FAQs',
      render: (category: FAQCategory) => (
        <span className="text-xs text-gray-600">{category.faqCount || 0}</span>
      ),
    },
    {
      header: 'Order',
      render: (category: FAQCategory) => (
        <span className="text-xs text-gray-600">{category.displayOrder}</span>
      ),
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (category: FAQCategory) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => {
              setEditingCategory(category);
              setShowModal(true);
            }}
            className="p-1.5 text-[#039edb] hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(category.categoryId)}
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
        title="FAQ Categories"
        description="Manage FAQ categories and groupings"
        action={{
          label: 'Add Category',
          onClick: () => {
            setEditingCategory(null);
            setShowModal(true);
          },
        }}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Total Categories</p>
            <p className="text-xl font-bold text-gray-900">{categories.length}</p>
          </div>
        </AdminCard>
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Total FAQs</p>
            <p className="text-xl font-bold text-[#039edb]">
              {categories.reduce((sum, cat) => sum + (cat.faqCount || 0), 0)}
            </p>
          </div>
        </AdminCard>
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={categories}
        loading={loading}
        emptyMessage="No FAQ categories found. Click 'Add Category' to create one."
      />

      {/* Modal */}
      {showModal && (
        <FAQCategoryModal
          category={editingCategory}
          onClose={() => {
            setShowModal(false);
            setEditingCategory(null);
          }}
          onSave={() => {
            setShowModal(false);
            fetchCategories();
          }}
        />
      )}
    </div>
  );
}

function FAQCategoryModal({
  category,
  onClose,
  onSave,
}: {
  category: FAQCategory | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    categoryCode: category?.categoryId ? `CAT-${category.categoryId}` : '', // Just default fallback
    displayOrder: category?.displayOrder || 0,
    translations: [
      { locale: 'id', categoryName: category?.name || '' },
      { locale: 'en', categoryName: '' }
    ]
  });

  // Initialize code correctly if editing
  useEffect(() => {
    if (category) {
      // Since listing doesn't return code, we might need to fetch detailed or just allow user to set it?
      // Wait, getAllCategories in Service DOES return categoryCode.
      // We need to update interface FAQCategory to include categoryCode first.
      // For now, let's assume category has categoryCode if we updated the Fetch, but interface says no.
      // Let's rely on user inputting it or auto-generating for new.
      setFormData({
        categoryCode: (category as any).categoryCode || '', // casting to any as interface might be old
        displayOrder: category.displayOrder,
        translations: [
          { locale: 'id', categoryName: category.name },
          { locale: 'en', categoryName: '' }
        ]
      });
    }
  }, [category]);

  // Auto-generate code for new categories
  const handleNameChange = (val: string) => {
    const newTranslations = [...formData.translations];
    newTranslations[0] = { ...newTranslations[0], categoryName: val };

    // Only auto-gen code if new
    let newCode = formData.categoryCode;
    if (!category) {
      newCode = val.toUpperCase().replace(/[^A-Z0-9]/g, '_');
    }

    setFormData({
      ...formData,
      translations: newTranslations,
      categoryCode: newCode
    });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = category
        ? `/api/v1/admin/faq-categories/${category.categoryId}`
        : '/api/v1/admin/faq-categories';

      const translationsMap: Record<string, any> = {};
      formData.translations.forEach(t => {
        translationsMap[t.locale] = { categoryName: t.categoryName };
      });

      const submitData = {
        categoryCode: formData.categoryCode,
        displayOrder: formData.displayOrder,
        isActive: true, // Defaulting to true as modal didn't have toggle before? Schema supports it.
        translations: translationsMap
      };

      const response = await apiFetch(endpoint, {
        method: category ? 'PUT' : 'POST',
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onSave();
      } else {
        setError(data.message || 'Failed to save category');
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
      title={category ? 'Edit FAQ Category' : 'Add New FAQ Category'}
      size="md"
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
            <label className="block text-xs font-semibold text-gray-700 mb-1">Category Code</label>
            <input
              type="text"
              required
              value={formData.categoryCode}
              onChange={(e) => setFormData({ ...formData, categoryCode: e.target.value.toUpperCase() })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb] bg-gray-50 uppercase"
              placeholder="e.g. BILLING"
            />
          </div>

          {/* Translations */}
          <div className="space-y-2 pt-2 border-t border-gray-200">
            <label className="block text-xs font-semibold text-gray-700 mb-2">Name (Translatable)</label>
            {formData.translations.map((trans, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 text-xs font-bold rounded text-white ${trans.locale === 'id' ? 'bg-red-500' : 'bg-blue-500'}`}>
                    {trans.locale.toUpperCase()}
                  </span>
                </div>
                <input
                  type="text"
                  required={trans.locale === 'id'}
                  value={trans.categoryName}
                  onChange={(e) => {
                    if (idx === 0) { // ID
                      handleNameChange(e.target.value);
                    } else {
                      const newTranslations = [...formData.translations];
                      newTranslations[idx] = { ...trans, categoryName: e.target.value };
                      setFormData({ ...formData, translations: newTranslations });
                    }
                  }}
                  placeholder={`Name in ${trans.locale}`}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Display Order</label>
            <input
              type="number"
              required
              min="0"
              value={formData.displayOrder}
              onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
            />
          </div>
        </div>
      </form>
    </AdminModal>
  );
}
