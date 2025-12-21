'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PlusIcon, PencilIcon, TrashIcon, ClipboardDocumentListIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { apiFetch } from '@/lib/api-config';
import PageHeader from '@/components/admin/PageHeader';
import AdminCard from '@/components/admin/AdminCard';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import SearchBar from '@/components/admin/SearchBar';
import ImageUpload from '@/components/admin/ImageUpload';

interface Translation {
  locale: string;
  title: string;
  description: string;
}

interface ProcessStep {
  stepId: number;
  stepCode?: string;
  stepNumber?: number; // Make optional
  displayOrder: number;
  isActive: boolean;
  imageFileId?: number | null;
  imageUrl?: string;
  translations?: Translation[] | Record<string, any>;
}

export default function ProcessStepsPage() {
  const [steps, setSteps] = useState<ProcessStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStep, setEditingStep] = useState<ProcessStep | null>(null);

  useEffect(() => {
    fetchSteps();
  }, []);

  const fetchSteps = async () => {
    try {
      const response = await apiFetch('/api/v1/process-steps/admin');
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setSteps(data.data);
      }
    } catch (error) {
      console.error('Error fetching steps:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (stepId: number) => {
    if (!confirm('Are you sure you want to delete this step?')) return;
    try {
      await apiFetch(`/api/v1/process-steps/admin/${stepId}`, {
        method: 'DELETE',
      });
      fetchSteps();
    } catch (error) {
      console.error('Error deleting step:', error);
    }
  };

  const getStepContent = (step: ProcessStep, locale: string) => {
    let content: { title: string; description: string } | undefined;

    if (Array.isArray(step.translations)) {
      const found = step.translations.find(t => t.locale === locale);
      if (found) content = found;
    } else if (step.translations && typeof step.translations === 'object') {
      // @ts-ignore
      const trans = step.translations[locale];
      if (trans) {
        content = { title: trans.title || '', description: trans.description || '' };
      }
    }

    if (!content) return { title: '', description: '' };
    return content;
  };

  const filteredSteps = steps.filter((step) => {
    const searchLower = search.toLowerCase();
    const matchesNum = (step.stepNumber?.toString() || '').includes(search);

    let matchesTrans = false;
    if (searchLower) {
      const idContent = getStepContent(step, 'id');
      const enContent = getStepContent(step, 'en');
      matchesTrans = idContent.title.toLowerCase().includes(searchLower) ||
        enContent.title.toLowerCase().includes(searchLower);
    }

    return matchesNum || matchesTrans;
  });

  const activeCount = steps.filter(s => s.isActive).length;
  const inactiveCount = steps.filter(s => !s.isActive).length;

  const columns = [
    {
      header: 'Step #',
      render: (step: ProcessStep) => (
        <span className="text-sm font-bold text-[#039edb]">{step.stepNumber || step.displayOrder || '-'}</span>
      ),
    },
    {
      header: 'Image',
      render: (step: ProcessStep) => (
        <div className="relative h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
          {step.imageUrl ? (
            <Image
              src={step.imageUrl}
              alt="Step"
              fill
              className="object-cover"
            />
          ) : (
            <PhotoIcon className="h-5 w-5 text-gray-400" />
          )}
        </div>
      ),
    },
    {
      header: 'Title (ID)',
      render: (step: ProcessStep) => (
        <div className="max-w-xs">
          <span className="block text-sm font-medium text-gray-900 truncate">{getStepContent(step, 'id').title}</span>
          <span className="block text-xs text-gray-500 truncate">{getStepContent(step, 'id').description}</span>
        </div>
      ),
    },
    {
      header: 'Order',
      render: (step: ProcessStep) => (
        <span className="text-xs text-gray-600">{step.displayOrder}</span>
      ),
    },
    {
      header: 'Status',
      render: (step: ProcessStep) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${step.isActive
          ? 'bg-green-50 text-green-700 border border-green-200'
          : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
          {step.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (step: ProcessStep) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => {
              setEditingStep(step);
              setShowModal(true);
            }}
            className="p-1.5 text-[#039edb] hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(step.stepId)}
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
        title="Process Steps"
        description="Manage implementation process steps on homepage"
        action={{
          label: 'Add Step',
          onClick: () => {
            setEditingStep(null);
            setShowModal(true);
          },
        }}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Total</p>
            <p className="text-xl font-bold text-gray-900">{steps.length}</p>
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
          placeholder="Search by step number or title..."
        />
      </AdminCard>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={filteredSteps}
        loading={loading}
        emptyMessage="No process steps found. Click 'Add Step' to create one."
      />

      {/* Modal */}
      {showModal && (
        <ProcessStepModal
          step={editingStep}
          onClose={() => {
            setShowModal(false);
            setEditingStep(null);
          }}
          onSave={() => {
            setShowModal(false);
            fetchSteps();
          }}
        />
      )}
    </div>
  );
}

function ProcessStepModal({
  step,
  onClose,
  onSave,
}: {
  step: ProcessStep | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    stepCode: step?.stepCode || '',
    stepNumber: step?.stepNumber || 1, // stepNumber might be undefined
    displayOrder: step?.displayOrder || 0,
    isActive: step?.isActive ?? true,
    imageFileId: step?.imageFileId || null,
    imageUrl: step?.imageUrl || '',
    translations: [
      { locale: 'id', title: '', description: '' },
      { locale: 'en', title: '', description: '' },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (step) {
      const getTrans = (locale: string) => {
        if (Array.isArray(step.translations)) {
          const found = step.translations.find(t => t.locale === locale);
          return found ? { title: found.title, description: found.description } : null;
        } else if (step.translations && typeof step.translations === 'object') {
          // @ts-ignore
          const trans = step.translations[locale];
          if (trans) return { title: trans.title || '', description: trans.description || '' };
        }
        return null;
      };

      const idTrans = getTrans('id');
      const enTrans = getTrans('en');

      setFormData({
        stepCode: step.stepCode || '',
        stepNumber: step.stepNumber || 1,
        displayOrder: step.displayOrder,
        isActive: step.isActive,
        imageFileId: step.imageFileId || null,
        imageUrl: step.imageUrl || '',
        translations: [
          { locale: 'id', title: idTrans?.title || '', description: idTrans?.description || '' },
          { locale: 'en', title: enTrans?.title || '', description: enTrans?.description || '' },
        ],
      });
    }
  }, [step]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = step
        ? `/api/v1/process-steps/admin/${step.stepId}`
        : '/api/v1/process-steps/admin';

      const translationsMap: Record<string, any> = {};
      formData.translations.forEach(t => {
        translationsMap[t.locale] = {
          title: t.title,
          description: t.description
        };
      });

      const submitData = {
        stepCode: formData.stepCode || formData.translations[0].title.toUpperCase().replace(/\s+/g, '_'),
        stepNumber: formData.stepNumber,
        displayOrder: formData.displayOrder,
        isActive: formData.isActive,
        imageFileId: formData.imageFileId,
        translations: translationsMap
      };

      const response = await apiFetch(endpoint, {
        method: step ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onSave();
      } else {
        setError(data.message || 'Failed to save step');
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
      title={step ? 'Edit Process Step' : 'Add New Process Step'}
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
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Step Code</label>
            <input
              type="text"
              required
              value={formData.stepCode}
              onChange={(e) => setFormData({ ...formData, stepCode: e.target.value.toUpperCase() })}
              placeholder="e.g., ANALYSIS, PLANNING"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
            />
            <p className="text-xs text-gray-500 mt-1">Unique code for this step (auto-generated from title if empty)</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Step Number</label>
              <input
                type="number"
                required
                value={formData.stepNumber}
                onChange={(e) => setFormData({ ...formData, stepNumber: parseInt(e.target.value) })}
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

          <div>
            <ImageUpload
              label="Step Image"
              currentImage={formData.imageUrl}
              onUploadComplete={(fileId, filePath) => {
                setFormData(prev => ({
                  ...prev,
                  imageFileId: fileId,
                  imageUrl: filePath
                }));
              }}
              onRemove={() => {
                setFormData(prev => ({
                  ...prev,
                  imageFileId: null,
                  imageUrl: ''
                }));
              }}
            />
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
                    required={trans.locale === 'id'}
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
