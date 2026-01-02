"use client";

import { useEffect, useState } from "react";
import { apiFetch, API_ENDPOINTS } from "@/lib/api-config";
import PageHeader from "@/components/admin/PageHeader";
import AdminCard from "@/components/admin/AdminCard";

interface ValueTranslation {
  locale: "id" | "en";
  title: string;
  subtitle: string;
  description: string;
}

interface CoreValue {
  letter: string;
  sectionKey: string;
  sectionId?: number;
  translations: {
    id?: ValueTranslation;
    en?: ValueTranslation;
  };
}

const AGILE_LETTERS = ["A", "G", "I", "L", "E"];
const IMPACT_LETTERS = ["I", "M", "P", "A", "C", "T"];

export default function CompanyProfilePage() {
  const [agileValues, setAgileValues] = useState<CoreValue[]>([]);
  const [impactValues, setImpactValues] = useState<CoreValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"agile" | "impact">("agile");
  const [editingValue, setEditingValue] = useState<CoreValue | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<{
    id: { title: string; subtitle: string; description: string };
    en: { title: string; subtitle: string; description: string };
  }>({
    id: { title: "", subtitle: "", description: "" },
    en: { title: "", subtitle: "", description: "" },
  });

  useEffect(() => {
    fetchValues();
  }, []);

  const fetchValues = async () => {
    try {
      setLoading(true);
      // Fetch with high limit to get all sections, or fetch multiple pages
      const response = await apiFetch(
        `${API_ENDPOINTS.ADMIN.CONTENT_SECTIONS.LIST}?page=1&limit=100`
      );
      const data = await response.json();

      // Handle both direct array response and paginated response
      const sections = Array.isArray(data.data)
        ? data.data
        : data.data?.data || [];

      if (sections && Array.isArray(sections)) {
        // Filter AGILE values
        const agile = AGILE_LETTERS.map((letter) => {
          const sectionKey = `company_profile_agile_${letter}`;
          const section = sections.find(
            (s: any) => s.sectionKey === sectionKey
          );

          const translations: any = {
            id: { title: "", subtitle: "", description: "" },
            en: { title: "", subtitle: "", description: "" },
          };

          if (section?.translations) {
            // Backend returns merged translations as object with id and en keys
            if (section.translations.id) {
              translations.id = {
                title: section.translations.id.title || "",
                subtitle: section.translations.id.subtitle || "",
                description: section.translations.id.description || "",
              };
            }
            if (section.translations.en) {
              translations.en = {
                title: section.translations.en.title || "",
                subtitle: section.translations.en.subtitle || "",
                description: section.translations.en.description || "",
              };
            }
          }

          return {
            letter,
            sectionKey,
            translations,
            sectionId: section?.sectionId,
          };
        });

        // Filter IMPACT values
        const impact = IMPACT_LETTERS.map((letter) => {
          const sectionKey = `company_profile_impact_${letter}`;
          const section = sections.find(
            (s: any) => s.sectionKey === sectionKey
          );

          const translations: any = {
            id: { title: "", subtitle: "", description: "" },
            en: { title: "", subtitle: "", description: "" },
          };

          if (section?.translations) {
            // Backend returns merged translations as object with id and en keys
            if (section.translations.id) {
              translations.id = {
                title: section.translations.id.title || "",
                subtitle: section.translations.id.subtitle || "",
                description: section.translations.id.description || "",
              };
            }
            if (section.translations.en) {
              translations.en = {
                title: section.translations.en.title || "",
                subtitle: section.translations.en.subtitle || "",
                description: section.translations.en.description || "",
              };
            }
          }

          return {
            letter,
            sectionKey,
            translations,
            sectionId: section?.sectionId,
          };
        });

        setAgileValues(agile);
        setImpactValues(impact);
      }
    } catch (error) {
      console.error("Error fetching values:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (value: CoreValue) => {
    setEditingValue(value);
    setFormData({
      id: {
        title: value.translations.id?.title || "",
        subtitle: value.translations.id?.subtitle || "",
        description: value.translations.id?.description || "",
      },
      en: {
        title: value.translations.en?.title || "",
        subtitle: value.translations.en?.subtitle || "",
        description: value.translations.en?.description || "",
      },
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!editingValue) return;

    try {
      const sectionKey = editingValue.sectionKey;

      // Use sectionId from editingValue if available, otherwise fetch from API
      let sectionId = editingValue.sectionId;

      if (!sectionId) {
        // Get current sections to find existing sectionId
        const listResponse = await apiFetch(
          API_ENDPOINTS.ADMIN.CONTENT_SECTIONS.LIST
        );
        const listData = await listResponse.json();
        const existing =
          listData.success && Array.isArray(listData.data)
            ? listData.data.find((s: any) => s.sectionKey === sectionKey)
            : null;
        sectionId = existing?.sectionId;
      }

      const payload = {
        sectionType: "company_profile",
        sectionKey,
        pageLocation: "about",
        displayOrder:
          activeTab === "agile"
            ? AGILE_LETTERS.indexOf(editingValue.letter)
            : IMPACT_LETTERS.indexOf(editingValue.letter),
        isActive: true,
        translations: [
          {
            locale: "id",
            title: formData.id.title,
            subtitle: formData.id.subtitle,
            description: formData.id.description,
          },
          {
            locale: "en",
            title: formData.en.title,
            subtitle: formData.en.subtitle,
            description: formData.en.description,
          },
        ],
      };

      console.log(
        "[CompanyProfile] Saving payload:",
        JSON.stringify(payload, null, 2)
      );
      console.log(
        "[CompanyProfile] Sending request to:",
        sectionId
          ? API_ENDPOINTS.ADMIN.CONTENT_SECTIONS.UPDATE(sectionId)
          : API_ENDPOINTS.ADMIN.CONTENT_SECTIONS.CREATE
      );

      let response;
      if (sectionId) {
        // Update existing - only send fields that can be updated
        const updatePayload = {
          pageLocation: payload.pageLocation,
          displayOrder: payload.displayOrder,
          isActive: payload.isActive,
          translations: payload.translations,
        };
        console.log(
          "[CompanyProfile] Update payload:",
          JSON.stringify(updatePayload, null, 2)
        );

        response = await apiFetch(
          API_ENDPOINTS.ADMIN.CONTENT_SECTIONS.UPDATE(sectionId),
          {
            method: "PUT",
            body: JSON.stringify(updatePayload),
          }
        );
      } else {
        // Create new
        response = await apiFetch(API_ENDPOINTS.ADMIN.CONTENT_SECTIONS.CREATE, {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      console.log("[CompanyProfile] Response status:", response.status);
      const result = await response.json();
      console.log("[CompanyProfile] Response data:", result);

      if (result.success) {
        setShowModal(false);
        setEditingValue(null);
        fetchValues();
      } else {
        console.error("[CompanyProfile] Save failed:", result.message);
        alert(result.message || "Error saving value. Please try again.");
      }
    } catch (error) {
      console.error("Error saving value:", error);
      alert("Error saving value. Please try again.");
    }
  };

  const currentValues = activeTab === "agile" ? agileValues : impactValues;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Company Profile"
        description="Kelola Core Values (AGILE) dan Our IMPACT (IMPACT)"
      />

      {/* Tabs */}
      <AdminCard>
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("agile")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "agile"
                ? "border-[#0498da] text-[#0498da]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Core Values (AGILE)
          </button>
          <button
            onClick={() => setActiveTab("impact")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "impact"
                ? "border-[#0498da] text-[#0498da]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Our Philosophy (IMPACT)
          </button>
        </div>
      </AdminCard>

      {/* Values Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0498da]"></div>
          <p className="mt-2 text-sm text-gray-500">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentValues.map((value) => (
            <AdminCard
              key={value.letter}
              className="hover:shadow-lg transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0498da] to-[#71bf44] flex items-center justify-center text-white font-black text-xl">
                    {value.letter}
                  </div>
                  <button
                    onClick={() => handleEdit(value)}
                    className="px-3 py-1.5 text-xs font-medium text-[#0498da] hover:bg-[#0498da]/10 rounded-md transition-colors"
                  >
                    Edit
                  </button>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Title (ID)</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {value.translations.id?.title || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Subtitle (ID)</p>
                    <p className="text-sm text-gray-700">
                      {value.translations.id?.subtitle || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Description (ID)
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {value.translations.id?.description || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {showModal && editingValue && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={() => setShowModal(false)}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Edit {editingValue.letter} -{" "}
                    {activeTab === "agile" ? "AGILE" : "IMPACT"}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Indonesian */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 border-b pb-2">
                      Bahasa Indonesia
                    </h4>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={formData.id.title}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            id: { ...formData.id, title: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0498da]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={formData.id.subtitle}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            id: { ...formData.id, subtitle: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0498da]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={formData.id.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            id: { ...formData.id, description: e.target.value },
                          })
                        }
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0498da]"
                      />
                    </div>
                  </div>

                  {/* English */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 border-b pb-2">
                      English
                    </h4>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={formData.en.title}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            en: { ...formData.en, title: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0498da]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={formData.en.subtitle}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            en: { ...formData.en, subtitle: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0498da]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={formData.en.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            en: { ...formData.en, description: e.target.value },
                          })
                        }
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0498da]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSave}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-[#0498da] to-[#71bf44] text-base font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0498da] sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0498da] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
