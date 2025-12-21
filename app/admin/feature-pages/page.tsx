'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusIcon, PencilIcon, TrashIcon, DocumentTextIcon, ListBulletIcon } from '@heroicons/react/24/outline';
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
  heroTitle: string;
  heroDescription: string;
}

interface FeaturePage {
  pageId: number;
  pageSlug: string;
  displayOrder: number;
  iconName: string;
  isActive: boolean;
  translations?: Translation[] | Record<string, any>;
}

export default function FeaturePagesPage() {
  const router = useRouter();
  const [pages, setPages] = useState<FeaturePage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState<FeaturePage | null>(null);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await apiFetch('/api/v1/feature-pages/admin/all');
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        // Map backend response to handle different field names
        const mapped = data.data.map((page: any) => {
          // Handle translations - convert object to array if needed
          let translations = page.translations;
          if (translations && !Array.isArray(translations)) {
            translations = Object.entries(translations).map(([locale, trans]: [string, any]) => ({
              locale,
              title: trans.heroTitle || trans.title || '',
              description: trans.description || '',
              heroTitle: trans.heroTitle || '',
              heroDescription: trans.heroDescription || ''
            }));
          }

          return {
            ...page,
            pageSlug: page.slug || page.pageCode || page.pageSlug || '',
            iconName: page.iconName || '',
            translations: translations || []
          };
        });
        setPages(mapped);
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (pageId: number) => {
    if (!confirm('Are you sure you want to delete this feature page?')) return;
    try {
      await apiFetch(`/api/v1/feature-pages/admin/${pageId}`, {
        method: 'DELETE',
      });
      fetchPages();
    } catch (error) {
      console.error('Error deleting page:', error);
    }
  };

  const getPageContent = (page: FeaturePage, locale: string) => {
    let content: { title: string } | undefined;

    if (Array.isArray(page.translations)) {
      const found = page.translations.find(t => t.locale === locale);
      if (found) content = { title: found.title };
    } else if (page.translations && typeof page.translations === 'object') {
      // @ts-ignore
      const trans = page.translations[locale];
      if (trans) {
        content = { title: trans.title || '' };
      }
    }

    if (!content) return { title: '' };
    return content;
  };

  const filteredPages = pages.filter((page) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    const matchesSlug = page.pageSlug?.toLowerCase().includes(searchLower);
    const matchesIcon = page.iconName?.toLowerCase().includes(searchLower);

    let matchesTrans = false;
    const idContent = getPageContent(page, 'id');
    const enContent = getPageContent(page, 'en');
    matchesTrans = idContent.title.toLowerCase().includes(searchLower) ||
      enContent.title.toLowerCase().includes(searchLower);

    return matchesSlug || matchesIcon || matchesTrans;
  });

  const activeCount = pages.filter(p => p.isActive).length;
  const inactiveCount = pages.filter(p => !p.isActive).length;

  const columns = [
    {
      header: 'Slug',
      render: (page: FeaturePage) => (
        <span className="text-xs font-mono text-gray-600">{page.pageSlug}</span>
      ),
    },
    {
      header: 'Title',
      render: (page: FeaturePage) => {
        const idContent = getPageContent(page, 'id');
        return (
          <span className="text-sm font-medium text-gray-900">{idContent.title || '-'}</span>
        );
      },
    },
    {
      header: 'Icon',
      render: (page: FeaturePage) => (
        <span className="text-xs text-gray-600">{page.iconName || '-'}</span>
      ),
    },
    {
      header: 'Order',
      render: (page: FeaturePage) => (
        <span className="text-xs text-gray-600">{page.displayOrder}</span>
      ),
    },
    {
      header: 'Status',
      render: (page: FeaturePage) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${page.isActive
          ? 'bg-green-50 text-green-700 border border-green-200'
          : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
          {page.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (page: FeaturePage) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => router.push(`/admin/feature-pages/${page.pageId}/items`)}
            className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            title="Items"
          >
            <ListBulletIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setEditingPage(page);
              setShowModal(true);
            }}
            className="p-1.5 text-[#039edb] hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(page.pageId)}
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
        title="Feature Pages"
        description="Manage feature detail pages and their content"
        action={{
          label: 'Add Page',
          onClick: () => {
            setEditingPage(null);
            setShowModal(true);
          },
        }}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Total</p>
            <p className="text-xl font-bold text-gray-900">{pages.length}</p>
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
          placeholder="Search by slug, icon, or title..."
        />
      </AdminCard>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={filteredPages}
        loading={loading}
        emptyMessage="No feature pages found. Click 'Add Page' to create one."
      />

      {/* Modal */}
      {showModal && (
        <FeaturePageModal
          page={editingPage}
          onClose={() => {
            setShowModal(false);
            setEditingPage(null);
          }}
          onSave={() => {
            setShowModal(false);
            fetchPages();
          }}
        />
      )}
    </div>
  );
}

function FeaturePageModal({
  page,
  onClose,
  onSave,
}: {
  page: FeaturePage | null;
  onClose: () => void;
  onSave: () => void;
}) {
  // Helper to extract translations safely
  function routerTranslations(featPage: FeaturePage | null) {
    if (!featPage) {
      return [
        { locale: 'id', title: '', description: '', heroTitle: '', heroDescription: '' },
        { locale: 'en', title: '', description: '', heroTitle: '', heroDescription: '' },
      ];
    }

    const getTrans = (locale: string) => {
      if (Array.isArray(featPage.translations)) {
        const found = featPage.translations.find(t => t.locale === locale);
        return found ? { ...found } : null;
      } else if (featPage.translations && typeof featPage.translations === 'object') {
        // @ts-ignore
        const trans = featPage.translations[locale];
        if (trans) {
          return {
            title: trans.title || '',
            description: trans.description || '',
            heroTitle: trans.heroTitle || '',
            heroDescription: trans.heroDescription || ''
          };
        }
      }
      return null;
    };

    const idTrans = getTrans('id');
    const enTrans = getTrans('en');

    return [
      {
        locale: 'id',
        title: idTrans?.title || '',
        description: idTrans?.description || '',
        heroTitle: idTrans?.heroTitle || '',
        heroDescription: idTrans?.heroDescription || ''
      },
      {
        locale: 'en',
        title: enTrans?.title || '',
        description: enTrans?.description || '',
        heroTitle: enTrans?.heroTitle || '',
        heroDescription: enTrans?.heroDescription || ''
      },
    ];
  }

  const [formData, setFormData] = useState({
    pageSlug: page?.pageSlug || '',
    iconName: page?.iconName || '',
    displayOrder: page?.displayOrder || 0,
    isActive: page?.isActive ?? true,
    translations: routerTranslations(page),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (page) {
      setFormData({
        pageSlug: page.pageSlug,
        iconName: page.iconName,
        displayOrder: page.displayOrder,
        isActive: page.isActive,
        translations: routerTranslations(page),
      });
    }
  }, [page]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = page
        ? `/api/v1/feature-pages/admin/${page.pageId}`
        : '/api/v1/feature-pages/admin';

      // Transform translations array to object map
      const translationsMap: Record<string, any> = {};
      formData.translations.forEach((t: Translation) => {
        translationsMap[t.locale] = {
          title: t.title,
          description: t.description,
          heroTitle: t.heroTitle,
          heroDescription: t.heroDescription
        };
      });

      const submitData = {
        pageSlug: formData.pageSlug,
        iconName: formData.iconName,
        displayOrder: formData.displayOrder,
        isActive: formData.isActive,
        translations: translationsMap,
      };

      const response = await apiFetch(endpoint, {
        method: page ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onSave();
      } else {
        setError(data.message || 'Failed to save page');
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
      title={page ? 'Edit Feature Page' : 'Add New Feature Page'}
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
              <label className="block text-xs font-semibold text-gray-700 mb-1">Page Slug</label>
              <input
                type="text"
                required
                value={formData.pageSlug}
                onChange={(e) => setFormData({ ...formData, pageSlug: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                placeholder="feature-slug"
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
            {(formData.translations as Translation[]).map((trans, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 text-xs font-bold rounded text-white ${trans.locale === 'id' ? 'bg-red-500' : 'bg-blue-500'}`}>
                    {trans.locale.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <input
                    type="text"
                    placeholder="Title"
                    value={trans.title}
                    onChange={(e) => {
                      const newTranslations = [...(formData.translations as Translation[])];
                      newTranslations[idx] = { ...trans, title: e.target.value };
                      setFormData({ ...formData, translations: newTranslations });
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                  />
                  <input
                    type="text"
                    placeholder="Hero Title"
                    value={trans.heroTitle}
                    onChange={(e) => {
                      const newTranslations = [...(formData.translations as Translation[])];
                      newTranslations[idx] = { ...trans, heroTitle: e.target.value };
                      setFormData({ ...formData, translations: newTranslations });
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                  />
                  <textarea
                    placeholder="Description"
                    value={trans.description}
                    onChange={(e) => {
                      const newTranslations = [...(formData.translations as Translation[])];
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
                      const newTranslations = [...(formData.translations as Translation[])];
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
