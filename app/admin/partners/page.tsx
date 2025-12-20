'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PlusIcon, PencilIcon, TrashIcon, BuildingOfficeIcon, GlobeAltIcon, EyeIcon } from '@heroicons/react/24/outline';
import { apiFetch, API_ENDPOINTS } from '@/lib/api-config';
import PageHeader from '@/components/admin/PageHeader';
import AdminCard from '@/components/admin/AdminCard';
import AdminModal from '@/components/admin/AdminModal';
import SearchBar from '@/components/admin/SearchBar';
import ImageUpload from '@/components/admin/ImageUpload';

interface Translation {
  locale: string;
  description: string;
}

interface Partner {
  partnerId: number;
  partnerName: string;
  logoUrl: string;
  websiteUrl: string | null;
  displayOrder: number;
  isActive: boolean;
  translations?: Translation[] | Record<string, any>;
  logoFileId?: number | null;
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await apiFetch('/api/v1/partners/admin/all');
      const data = await response.json();
      if (data.success) {
        setPartners(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (partnerId: number) => {
    if (!confirm('Are you sure you want to delete this partner?')) return;
    try {
      await apiFetch(`/api/v1/partners/admin/${partnerId}`, {
        method: 'DELETE',
      });
      fetchPartners();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getPartnerContent = (partner: Partner, locale: string) => {
    let content: { description: string } | undefined;

    if (Array.isArray(partner.translations)) {
      const found = partner.translations.find(t => t.locale === locale);
      if (found) content = found;
    } else if (partner.translations && typeof partner.translations === 'object') {
      // @ts-ignore
      const trans = partner.translations[locale];
      if (trans) {
        content = { description: trans.description || '' };
      }
    }

    if (!content) return { description: '' };
    return content;
  };

  const filteredPartners = partners.filter(p => {
    const searchLower = search.toLowerCase();
    const matchesName = (p.partnerName?.toLowerCase() || '').includes(searchLower);

    let matchesDesc = false;
    if (searchLower) {
      const idContent = getPartnerContent(p, 'id');
      const enContent = getPartnerContent(p, 'en');
      matchesDesc = idContent.description.toLowerCase().includes(searchLower) ||
        enContent.description.toLowerCase().includes(searchLower);
    }

    return matchesName || matchesDesc;
  });

  const activeCount = partners.filter(p => p.isActive).length;
  const inactiveCount = partners.filter(p => !p.isActive).length;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Partners"
        description="Manage your trusted partners and sponsors"
        action={{
          label: 'Add Partner',
          onClick: () => {
            setEditingPartner(null);
            setShowModal(true);
          },
        }}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Total Partners</p>
            <p className="text-xl font-bold text-gray-900">{partners.length}</p>
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
          placeholder="Search partners by name or description..."
        />
      </AdminCard>

      {/* Partners Grid */}
      {loading ? (
        <AdminCard>
          <div className="py-12 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#039edb]"></div>
            <p className="mt-2 text-xs text-gray-500">Loading...</p>
          </div>
        </AdminCard>
      ) : filteredPartners.length === 0 ? (
        <AdminCard>
          <div className="py-12 text-center">
            <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2 text-sm text-gray-500">No partners found</p>
          </div>
        </AdminCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredPartners.map((partner) => {
            return (
              <AdminCard key={partner.partnerId} compact>
                <div className="space-y-3">
                  {/* Logo */}
                  <div className="relative h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                    {partner.logoUrl ? (
                      <Image
                        src={partner.logoUrl}
                        alt={partner.partnerName}
                        fill
                        className="object-contain p-2"
                      />
                    ) : (
                      <BuildingOfficeIcon className="h-10 w-10 text-gray-400" />
                    )}
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 truncate mb-1">{partner.partnerName}</h3>
                    {partner.websiteUrl && (
                      <a
                        href={partner.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-[#039edb] hover:underline"
                      >
                        <GlobeAltIcon className="h-3.5 w-3.5" />
                        Visit Website
                      </a>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                    <span>Order: {partner.displayOrder}</span>
                    <span className={`px-2 py-0.5 rounded-md font-semibold ${partner.isActive
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                      {partner.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1.5 pt-2">
                    <button
                      onClick={() => {
                        setEditingPartner(partner);
                        setShowModal(true);
                      }}
                      className="flex-1 px-2.5 py-1.5 text-xs font-semibold text-[#039edb] border border-[#039edb] rounded-lg hover:bg-[#039edb] hover:text-white transition-colors"
                    >
                      <PencilIcon className="h-3.5 w-3.5 inline mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(partner.partnerId)}
                      className="px-2.5 py-1.5 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <TrashIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </AdminCard>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <PartnerModal
          partner={editingPartner}
          onClose={() => {
            setShowModal(false);
            setEditingPartner(null);
          }}
          onSave={() => {
            setShowModal(false);
            fetchPartners();
          }}
        />
      )}
    </div>
  );
}

function PartnerModal({
  partner,
  onClose,
  onSave,
}: {
  partner: Partner | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    partnerName: partner?.partnerName || '',
    logoUrl: partner?.logoUrl || '',
    websiteUrl: partner?.websiteUrl || '',
    displayOrder: partner?.displayOrder || 0,
    isActive: partner?.isActive ?? true,
    logoFileId: partner?.logoFileId || null,
    translations: [
      { locale: 'id', description: '' },
      { locale: 'en', description: '' },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (partner) {
      // Helper to extract content correctly
      const getTrans = (locale: string) => {
        if (Array.isArray(partner.translations)) {
          const found = partner.translations.find(t => t.locale === locale);
          return found ? { description: found.description } : null;
        } else if (partner.translations && typeof partner.translations === 'object') {
          // @ts-ignore
          const trans = partner.translations[locale];
          if (trans) return { description: trans.description || '' };
        }
        // Fallback for flat structure if absolutely necessary, but preferred to be clean
        return null;
      };

      const idTrans = getTrans('id');
      const enTrans = getTrans('en');

      setFormData({
        partnerName: partner.partnerName,
        logoUrl: partner.logoUrl,
        websiteUrl: partner.websiteUrl || '',
        displayOrder: partner.displayOrder,
        isActive: partner.isActive,
        logoFileId: partner.logoFileId || null,
        translations: [
          { locale: 'id', description: idTrans?.description || '' },
          { locale: 'en', description: enTrans?.description || '' }
        ]
      });
    }
  }, [partner]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = partner
        ? `/api/v1/partners/admin/${partner.partnerId}`
        : '/api/v1/partners/admin';

      // Transform translations to object map
      const translationsMap: Record<string, any> = {};
      formData.translations.forEach((t: any) => {
        translationsMap[t.locale] = {
          description: t.description
        };
      });

      const submitData = {
        partnerName: formData.partnerName,
        websiteUrl: formData.websiteUrl,
        displayOrder: formData.displayOrder,
        isActive: formData.isActive,
        translations: translationsMap,
        logoFileId: formData.logoFileId,
      };

      const response = await apiFetch(endpoint, {
        method: partner ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onSave();
      } else {
        setError(data.message || 'Failed to save partner');
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
      title={partner ? 'Edit Partner' : 'Add New Partner'}
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
            <label className="block text-xs font-semibold text-gray-700 mb-1">Partner Name</label>
            <input
              type="text"
              required
              value={formData.partnerName}
              onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
            />
          </div>

          <div>
            <ImageUpload
              label="Partner Logo"
              currentImage={formData.logoUrl}
              onUploadComplete={(fileId, filePath) => {
                setFormData(prev => ({
                  ...prev,
                  logoFileId: fileId,
                  logoUrl: filePath
                }));
              }}
              onRemove={() => {
                setFormData(prev => ({
                  ...prev,
                  logoFileId: null,
                  logoUrl: ''
                }));
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Website URL</label>
            <input
              type="url"
              value={formData.websiteUrl || ''}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              placeholder="https://example.com"
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

          {/* Translations */}
          <div className="space-y-2 pt-2 border-t border-gray-200">
            <label className="block text-xs font-semibold text-gray-700 mb-2">Description (Translatable)</label>
            {formData.translations.map((trans: any, idx: number) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 text-xs font-bold rounded text-white ${trans.locale === 'id' ? 'bg-red-500' : 'bg-blue-500'}`}>
                    {trans.locale.toUpperCase()}
                  </span>
                </div>
                <textarea
                  placeholder="Description"
                  value={trans.description}
                  onChange={(e) => {
                    const newTranslations = [...formData.translations] as any[];
                    newTranslations[idx] = { ...trans, description: e.target.value };
                    setFormData({ ...formData, translations: newTranslations });
                  }}
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                />
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
            <label htmlFor="isActive" className="text-xs text-gray-700">Active Partner</label>
          </div>
        </div>
      </form>
    </AdminModal>
  );
}
