'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon, BuildingOfficeIcon, GlobeAltIcon, EyeIcon } from '@heroicons/react/24/outline';
import { apiFetch } from '@/lib/api-config';

interface Partner {
  partnerId: number;
  partnerName: string;
  logoUrl: string;
  websiteUrl: string | null;
  displayOrder: number;
  isActive: boolean;
  translations?: any[];
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [previewPartner, setPreviewPartner] = useState<Partner | null>(null);

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
      const response = await apiFetch(`/api/v1/partners/admin/${partnerId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchPartners();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredPartners = partners.filter(p =>
    (p.partnerName?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partners</h1>
          <p className="text-gray-600 mt-1">Manage your trusted partners and sponsors</p>
        </div>
        <button
          onClick={() => { setEditingPartner(null); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90 transition shadow-md"
        >
          <PlusIcon className="w-5 h-5" />
          Add Partner
        </button>
      </div>

      {/* Search & Stats */}
      <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search partners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-4 text-sm text-gray-600">
          <span>Total: <strong className="text-gray-900">{partners.length}</strong></span>
          <span>•</span>
          <span>Active: <strong className="text-[#71bf44]">{partners.filter(p => p.isActive).length}</strong></span>
          <span>•</span>
          <span>Inactive: <strong className="text-gray-500">{partners.filter(p => !p.isActive).length}</strong></span>
        </div>
      </div>

      {/* Partners Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#039edb]"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      ) : filteredPartners.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <BuildingOfficeIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">No partners found</p>
          <p className="text-gray-400 text-sm mt-1">Add your first partner to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPartners.map((partner) => (
            <div
              key={partner.partnerId}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Logo Section */}
              <div className="relative h-32 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 border-b">
                <div className="relative w-full h-full">
                  <Image
                    src={partner.logoUrl}
                    alt={partner.partnerName}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    partner.isActive
                      ? 'bg-gradient-to-r from-[#71bf44]/10 to-[#5a9936]/10 text-[#71bf44] border border-[#71bf44]/30'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {partner.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 truncate" title={partner.partnerName}>
                  {partner.partnerName}
                </h3>
                
                {partner.translations && partner.translations[0]?.displayName && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                    {partner.translations[0].displayName}
                  </p>
                )}

                {partner.translations && partner.translations[0]?.description && (
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                    {partner.translations[0].description}
                  </p>
                )}

                {/* Website Link */}
                {partner.websiteUrl && (
                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#039edb] hover:text-[#71bf44] transition mb-3"
                  >
                    <GlobeAltIcon className="w-4 h-4" />
                    Visit Website
                  </a>
                )}

                {/* Display Order */}
                <div className="mb-3 pb-3 border-b border-gray-100">
                  <span className="text-xs text-gray-500">Display Order: <strong className="text-gray-700">{partner.displayOrder}</strong></span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setPreviewPartner(partner)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                    title="Preview"
                  >
                    <EyeIcon className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    onClick={() => { setEditingPartner(partner); setShowModal(true); }}
                    className="p-2 text-[#039edb] hover:bg-[#039edb]/10 rounded-lg transition"
                    title="Edit"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(partner.partnerId)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit/Create Modal */}
      {showModal && (
        <PartnerModal
          partner={editingPartner}
          onClose={() => { setShowModal(false); setEditingPartner(null); }}
          onSave={() => { setShowModal(false); fetchPartners(); }}
        />
      )}

      {/* Preview Modal */}
      {previewPartner && (
        <PreviewModal
          partner={previewPartner}
          onClose={() => setPreviewPartner(null)}
        />
      )}
    </div>
  );
}

function PartnerModal({ partner, onClose, onSave }: any) {
  const [formData, setFormData] = useState({
    partnerName: partner?.partnerName || '',
    logoUrl: partner?.logoUrl || '',
    websiteUrl: partner?.websiteUrl || '',
    displayOrder: partner?.displayOrder || 1,
    isActive: partner?.isActive ?? true,
    translations: partner?.translations || [
      { locale: 'id', displayName: '', description: '' },
      { locale: 'en', displayName: '', description: '' },
    ],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = partner
        ? `/api/v1/partners/admin/${partner.partnerId}`
        : '/api/v1/partners/admin';
      
      const response = await apiFetch(endpoint, {
        method: partner ? 'PUT' : 'POST',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSave();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full my-8">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-xl">
          <h2 className="text-xl font-bold text-gray-900">
            {partner ? 'Edit Partner' : 'Add New Partner'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <BuildingOfficeIcon className="w-5 h-5 text-[#039edb]" />
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partner Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.partnerName}
                  onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                  placeholder="Company Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo URL *
              </label>
              <input
                type="url"
                required
                value={formData.logoUrl}
                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                placeholder="https://example.com/logo.png"
              />
              {formData.logoUrl && (
                <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                  <p className="text-xs text-gray-600 mb-2">Preview:</p>
                  <div className="relative h-20 w-full">
                    <Image
                      src={formData.logoUrl}
                      alt="Logo preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                placeholder="https://example.com"
              />
            </div>
          </div>

          {/* Translations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <GlobeAltIcon className="w-5 h-5 text-[#039edb]" />
              Translations
            </h3>

            {formData.translations.map((trans: any, idx: number) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#039edb]/10 to-[#71bf44]/10 text-[#039edb] rounded-full text-sm font-medium">
                    {trans.locale.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={trans.displayName}
                      onChange={(e) => {
                        const newTrans = [...formData.translations];
                        newTrans[idx].displayName = e.target.value;
                        setFormData({ ...formData, translations: newTrans });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                      placeholder={`Display name in ${trans.locale.toUpperCase()}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={trans.description}
                      onChange={(e) => {
                        const newTrans = [...formData.translations];
                        newTrans[idx].description = e.target.value;
                        setFormData({ ...formData, translations: newTrans });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#039edb] focus:border-transparent"
                      rows={2}
                      placeholder={`Description in ${trans.locale.toUpperCase()}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Status */}
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

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-lg hover:opacity-90 transition font-medium shadow-md disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                `${partner ? 'Update' : 'Create'} Partner`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PreviewModal({ partner, onClose }: { partner: Partner; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Partner Preview</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Logo */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 border">
            <div className="relative h-32 w-full">
              <Image
                src={partner.logoUrl}
                alt={partner.partnerName}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Partner Name</p>
              <p className="font-semibold text-gray-900">{partner.partnerName}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                partner.isActive
                  ? 'bg-gradient-to-r from-[#71bf44]/10 to-[#5a9936]/10 text-[#71bf44] border border-[#71bf44]/30'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {partner.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Display Order</p>
              <p className="font-semibold text-gray-900">{partner.displayOrder}</p>
            </div>

            {partner.websiteUrl && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Website</p>
                <a
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#039edb] hover:text-[#71bf44] font-medium text-sm flex items-center gap-1"
                >
                  <GlobeAltIcon className="w-4 h-4" />
                  Visit
                </a>
              </div>
            )}
          </div>

          {/* Translations */}
          {partner.translations && partner.translations.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Translations</h3>
              {partner.translations.map((trans: any, idx: number) => (
                <div key={idx} className="border rounded-lg p-4">
                  <span className="px-2 py-1 bg-[#039edb]/10 text-[#039edb] rounded text-xs font-medium">
                    {trans.locale?.toUpperCase()}
                  </span>
                  {trans.displayName && (
                    <p className="mt-2 font-medium text-gray-900">{trans.displayName}</p>
                  )}
                  {trans.description && (
                    <p className="mt-1 text-sm text-gray-600">{trans.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t px-6 py-4">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
