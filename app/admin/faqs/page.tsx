'use client';

import { useEffect, useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { apiFetch } from '@/lib/api-config';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<number | 'all'>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    categoryId: 0,
    displayOrder: 0,
    isActive: true,
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = editingFAQ
        ? `/api/v1/admin/faqs/${editingFAQ.faqId}`
        : '/api/v1/admin/faqs';
      
      const response = await apiFetch(endpoint, {
        method: editingFAQ ? 'PUT' : 'POST',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchFAQs();
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    
    try {
      const response = await apiFetch(`/api/v1/admin/faqs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchFAQs();
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      categoryId: 0,
      displayOrder: 0,
      isActive: true,
    });
    setEditingFAQ(null);
  };

  const openEditModal = (faq: FAQ) => {
    setEditingFAQ(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      categoryId: faq.categoryId,
      displayOrder: faq.displayOrder,
      isActive: faq.isActive,
    });
    setShowModal(true);
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = 
      (faq.question?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (faq.answer?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || faq.categoryId === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Group FAQs by category
  const groupedFAQs = filteredFAQs.reduce((acc, faq) => {
    const categoryName = faq.category?.name || 'Uncategorized';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAQs</h1>
          <p className="text-gray-600 mt-1">Manage frequently asked questions</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90 transition shadow-md"
        >
          <PlusIcon className="w-5 h-5" />
          Add FAQ
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.categoryId} value={cat.categoryId}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-sm text-gray-600">
          <span>Total: <strong className="text-gray-900">{faqs.length}</strong></span>
          <span>•</span>
          <span>Active: <strong className="text-[#71bf44]">{faqs.filter(f => f.isActive).length}</strong></span>
          <span>•</span>
          <span>Inactive: <strong className="text-gray-500">{faqs.filter(f => !f.isActive).length}</strong></span>
        </div>
      </div>

      {/* FAQs List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#039edb]"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      ) : Object.keys(groupedFAQs).length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500">No FAQs found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedFAQs).map(([categoryName, categoryFAQs]) => (
            <div key={categoryName} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-[#039edb]/5 to-[#71bf44]/5 px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">{categoryName}</h2>
                <p className="text-sm text-gray-600">{categoryFAQs.length} question{categoryFAQs.length !== 1 ? 's' : ''}</p>
              </div>

              {/* FAQs */}
              <div className="divide-y">
                {categoryFAQs.map((faq) => (
                  <div key={faq.faqId} className="hover:bg-gray-50 transition">
                    {/* Question Row */}
                    <div className="px-6 py-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <button
                            onClick={() => setExpandedFAQ(expandedFAQ === faq.faqId ? null : faq.faqId)}
                            className="flex items-start gap-3 text-left w-full group"
                          >
                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-[#039edb]/10 to-[#71bf44]/10 text-[#039edb] group-hover:from-[#039edb]/20 group-hover:to-[#71bf44]/20 transition">
                              Q
                            </span>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 group-hover:text-[#039edb] transition">
                                {faq.question}
                              </p>
                              <div className="flex items-center gap-3 mt-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  faq.isActive
                                    ? 'bg-gradient-to-r from-[#71bf44]/10 to-[#5a9936]/10 text-[#71bf44] border border-[#71bf44]/30'
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {faq.isActive ? 'Active' : 'Inactive'}
                                </span>
                                <span className="text-xs text-gray-500">Order: {faq.displayOrder}</span>
                              </div>
                            </div>
                            {expandedFAQ === faq.faqId ? (
                              <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                            )}
                          </button>

                          {/* Answer (Expanded) */}
                          {expandedFAQ === faq.faqId && (
                            <div className="mt-4 ml-11 p-4 bg-gray-50 rounded-lg border-l-4 border-[#039edb]">
                              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Answer</span>
                              <p className="text-gray-700 whitespace-pre-line">{faq.answer}</p>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => openEditModal(faq)}
                            className="p-2 text-[#039edb] hover:bg-[#039edb]/10 rounded-lg transition"
                            title="Edit"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(faq.faqId)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}
              </h2>
              <button
                onClick={() => { setShowModal(false); resetForm(); }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question *</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                  placeholder="Enter the question..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Answer *</label>
                <textarea
                  required
                  rows={6}
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                  placeholder="Enter the answer..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                  >
                    <option value="">Select category...</option>
                    {categories.map(cat => (
                      <option key={cat.categoryId} value={cat.categoryId}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                  />
                </div>
              </div>

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

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90 transition font-medium shadow-md"
                >
                  {editingFAQ ? 'Update' : 'Create'} FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
