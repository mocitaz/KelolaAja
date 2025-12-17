'use client';

import { useEffect, useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { apiFetch } from '@/lib/api-config';
import PageHeader from '@/components/admin/PageHeader';
import AdminCard from '@/components/admin/AdminCard';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import SearchBar from '@/components/admin/SearchBar';

interface FAQ {
  faqId: number;
  question: string;
  answer: string;
  categoryId: number;
  category?: {
    categoryId: number;
    name: string;
  };
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
}

interface Category {
  categoryId: number;
  name: string;
}

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<number | 'all'>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);

  useEffect(() => {
    fetchFAQs();
    fetchCategories();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await apiFetch('/api/v1/admin/faqs');
      const data = await response.json();
      if (data.success) {
        setFaqs(data.data);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiFetch('/api/v1/admin/faq-categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await apiFetch(`/api/v1/admin/faqs/${id}`, {
        method: 'DELETE',
      });
      fetchFAQs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question?.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'all' || faq.categoryId === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const activeCount = faqs.filter(f => f.isActive).length;
  const inactiveCount = faqs.filter(f => !f.isActive).length;

  const columns = [
    {
      header: 'Question',
      render: (faq: FAQ) => (
        <div className="max-w-md">
          <span className="text-sm font-medium text-gray-900">{faq.question}</span>
        </div>
      ),
    },
    {
      header: 'Category',
      render: (faq: FAQ) => (
        <span className="text-xs text-gray-600">{faq.category?.name || 'Uncategorized'}</span>
      ),
    },
    {
      header: 'Order',
      render: (faq: FAQ) => (
        <span className="text-xs text-gray-600">{faq.displayOrder}</span>
      ),
    },
    {
      header: 'Status',
      render: (faq: FAQ) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${faq.isActive
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
          {faq.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (faq: FAQ) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => {
              setEditingFAQ(faq);
              setShowModal(true);
            }}
            className="p-1.5 text-[#039edb] hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(faq.faqId)}
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
        title="FAQs"
        description="Manage frequently asked questions"
        action={{
          label: 'Add FAQ',
          onClick: () => {
            setEditingFAQ(null);
            setShowModal(true);
          },
        }}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Total FAQs</p>
            <p className="text-xl font-bold text-gray-900">{faqs.length}</p>
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

      {/* Filters */}
      <AdminCard compact>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by question or answer..."
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb] bg-white"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </AdminCard>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={filteredFAQs}
        loading={loading}
        emptyMessage="No FAQs found. Click 'Add FAQ' to create one."
      />

      {/* Modal */}
      {showModal && (
        <FAQModal
          faq={editingFAQ}
          categories={categories}
          onClose={() => {
            setShowModal(false);
            setEditingFAQ(null);
          }}
          onSave={() => {
            setShowModal(false);
            fetchFAQs();
          }}
        />
      )}
    </div>
  );
}

function FAQModal({
  faq,
  categories,
  onClose,
  onSave,
}: {
  faq: FAQ | null;
  categories: Category[];
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    categoryId: faq?.categoryId || (categories[0]?.categoryId || 0),
    displayOrder: faq?.displayOrder || 0,
    isActive: faq?.isActive ?? true,
    translations: [
      { locale: 'id', question: faq?.question || '', answer: faq?.answer || '' },
      { locale: 'en', question: '', answer: '' },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (faq) {
      setFormData({
        categoryId: faq.categoryId,
        displayOrder: faq.displayOrder,
        isActive: faq.isActive,
        translations: [
          { locale: 'id', question: faq.question || '', answer: faq.answer || '' },
          { locale: 'en', question: '', answer: '' }
        ]
      });
    } else if (categories.length > 0) {
      setFormData(prev => ({
        ...prev,
        categoryId: categories[0].categoryId,
      }));
    }
  }, [faq, categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = faq
        ? `/api/v1/admin/faqs/${faq.faqId}`
        : '/api/v1/admin/faqs';

      // Transform translations map
      const translationsMap: Record<string, any> = {};
      formData.translations.forEach((t) => {
        translationsMap[t.locale] = {
          question: t.question,
          answer: t.answer
        };
      });

      const requestBody = {
        categoryId: formData.categoryId,
        displayOrder: formData.displayOrder,
        isActive: formData.isActive,
        translations: translationsMap
      };

      const response = await apiFetch(endpoint, {
        method: faq ? 'PUT' : 'POST',
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onSave();
      } else {
        setError(data.message || 'Failed to save FAQ');
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
      title={faq ? 'Edit FAQ' : 'Add New FAQ'}
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
              <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb] bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.name}
                  </option>
                ))}
              </select>
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

          {/* Translations */}
          <div className="space-y-2 pt-2 border-t border-gray-200">
            <label className="block text-xs font-semibold text-gray-700 mb-2">Content (Translatable)</label>
            {formData.translations.map((trans, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200 space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 text-xs font-bold rounded text-white ${trans.locale === 'id' ? 'bg-red-500' : 'bg-blue-500'}`}>
                    {trans.locale.toUpperCase()}
                  </span>
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wide mb-1">Question ({trans.locale})</label>
                  <input
                    type="text"
                    required={trans.locale === 'id'}
                    value={trans.question}
                    onChange={(e) => {
                      const newTranslations = [...formData.translations];
                      newTranslations[idx] = { ...trans, question: e.target.value };
                      setFormData({ ...formData, translations: newTranslations });
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wide mb-1">Answer ({trans.locale})</label>
                  <textarea
                    required={trans.locale === 'id'}
                    value={trans.answer}
                    onChange={(e) => {
                      const newTranslations = [...formData.translations];
                      newTranslations[idx] = { ...trans, answer: e.target.value };
                      setFormData({ ...formData, translations: newTranslations });
                    }}
                    rows={3}
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
