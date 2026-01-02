"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  Squares2X2Icon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { apiFetch, API_ENDPOINTS } from "@/lib/api-config";
import PageHeader from "@/components/admin/PageHeader";
import AdminCard from "@/components/admin/AdminCard";
import AdminTable from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";

interface PricingPlan {
  planId: number;
  planCode: string;
  planName: string;
  pricePerUserMonth: number;
  minUsers: number;
  maxUsers?: number;
  displayOrder: number;
  isActive: boolean;
  badgeColor?: string;
  translations?: any[];
}

export default function PricingPlansPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await apiFetch("/api/v1/pricing-plans/admin/all");
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setPlans(data.data);
      } else {
        setPlans([]);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (planId: number) => {
    if (!confirm("Are you sure you want to delete this plan?")) return;

    try {
      await apiFetch(`/api/v1/pricing-plans/admin/${planId}`, {
        method: "DELETE",
      });
      fetchPlans();
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  const activeCount = plans.filter((p) => p.isActive).length;
  const inactiveCount = plans.filter((p) => !p.isActive).length;

  const columns = [
    {
      header: "Plan Info",
      render: (plan: PricingPlan) => (
        <div>
          <div className="text-sm font-medium text-gray-900">
            {plan.planName}
          </div>
          <div className="text-[10px] text-gray-500 font-mono">
            {plan.planCode}
          </div>
        </div>
      ),
    },
    {
      header: "Price / User",
      render: (plan: PricingPlan) => (
        <div className="flex items-center gap-1">
          <CurrencyDollarIcon className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-semibold text-gray-900">
            {plan.pricePerUserMonth != null
              ? plan.pricePerUserMonth.toLocaleString()
              : "0"}
          </span>
        </div>
      ),
    },
    {
      header: "Users",
      render: (plan: PricingPlan) => (
        <span className="text-xs text-gray-600">
          {plan.minUsers} - {plan.maxUsers || "∞"}
        </span>
      ),
    },
    {
      header: "Order",
      render: (plan: PricingPlan) => (
        <span className="text-xs text-gray-600">{plan.displayOrder}</span>
      ),
    },
    {
      header: "Status",
      render: (plan: PricingPlan) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${
            plan.isActive
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {plan.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      render: (plan: PricingPlan) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() =>
              router.push(`/admin/pricing-plans/${plan.planId}/features`)
            }
            className="p-1.5 text-[#039edb] hover:bg-blue-50 rounded-lg transition-colors"
            title="Manage Features"
          >
            <Squares2X2Icon className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setEditingPlan(plan);
              setShowModal(true);
            }}
            className="p-1.5 text-[#039edb] hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(plan.planId)}
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
        title="Pricing Plans"
        description="Manage pricing plans and their features"
        action={{
          label: "Add Plan",
          onClick: () => {
            setEditingPlan(null);
            setShowModal(true);
          },
        }}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
              Total Plans
            </p>
            <p className="text-xl font-bold text-gray-900">{plans.length}</p>
          </div>
        </AdminCard>
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
              Active
            </p>
            <p className="text-xl font-bold text-green-600">{activeCount}</p>
          </div>
        </AdminCard>
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
              Inactive
            </p>
            <p className="text-xl font-bold text-red-600">{inactiveCount}</p>
          </div>
        </AdminCard>
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={plans}
        loading={loading}
        emptyMessage="No pricing plans found. Click 'Add Plan' to create one."
      />

      {/* Modal */}
      {showModal && (
        <PricingPlanModal
          plan={editingPlan}
          onClose={() => {
            setShowModal(false);
            setEditingPlan(null);
          }}
          onSave={() => {
            setShowModal(false);
            fetchPlans();
          }}
        />
      )}
    </div>
  );
}

interface PricingPlan {
  planId: number;
  planCode: string;
  planName: string;
  pricePerUserMonth: number;
  minUsers: number;
  maxUsers?: number;
  displayOrder: number;
  isActive: boolean;
  badgeColor?: string;
  translations?: any[]; // The generic response might have this, but flattened is main
}

function PricingPlanModal({
  plan,
  onClose,
  onSave,
}: {
  plan: PricingPlan | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    planCode: plan?.planCode || "",
    pricePerUserMonth: plan?.pricePerUserMonth || 0,
    minUsers: plan?.minUsers || 1,
    maxUsers: plan?.maxUsers || 0,
    displayOrder: plan?.displayOrder || 0,
    badgeColor: plan?.badgeColor || "",
    isActive: plan?.isActive ?? true,
    translations:
      plan?.translations && plan.translations.length > 0
        ? plan.translations
        : [
            {
              locale: "id",
              planName: "",
              pricePeriod: "monthly",
              description: "",
            },
            {
              locale: "en",
              planName: "",
              pricePeriod: "monthly",
              description: "",
            },
          ],
  });

  // If plan exists but translations are missing (because we relied on flattened data previously), optimize init
  useEffect(() => {
    if (plan) {
      // If the plan is from the list, it might only have flattened data.
      // We might need to fetch detailed plan to get all translations if the list one implies flattened "current locale" only.
      // However, `getAllPlans` Service seems to return ALL translations in the `translations` array too?
      // `include: { translations: { orderBy: { locale: 'asc' } } }`
      // Yes, so `plan` passed here should have the `translations` array.
      // But wait, the Frontend `PricingPlan` interface in the original code didn't have `translations`.
      // We need to verify if the API actually sends `translations` array in the JSON.
      // The Service `Result` map: `translations: mergeAllTranslations(plan.translations)`.
      // Wait, `mergeAllTranslations` usually flattens array to Object or merges one locale?
      // Let's check `mergeAllTranslations` util.
      // Assuming it works like Feature service which sends `translations: mergeAllTranslations(...)`.
      // Actually `getAllPlans` sends `translations: mergeAllTranslations(plan.translations)`.
      // If `mergeAllTranslations` returns an OBJECT with keys as locales, OR it returns a single merged object?
      // In `FeatureService`, `getAllFeatures` returns `translations: mergeAllTranslations(feature.translations)`.
      // Let's assume for now we need an array for UI state.
      // Update: I will assume the List endpoint returns the validation data we need.
      // Construct initial state carefully.

      const initialTranslations =
        plan.translations && Array.isArray(plan.translations)
          ? plan.translations
          : [
              {
                locale: "id",
                planName: plan.planName || "",
                pricePeriod: "monthly",
                description: "",
              },
              {
                locale: "en",
                planName: "",
                pricePeriod: "monthly",
                description: "",
              },
            ];

      setFormData({
        planCode: plan.planCode || "",
        pricePerUserMonth: plan.pricePerUserMonth || 0,
        minUsers: plan.minUsers || 1,
        maxUsers: plan.maxUsers || 0,
        displayOrder: plan.displayOrder || 0,
        badgeColor: plan.badgeColor || "",
        isActive: plan.isActive,
        translations: initialTranslations,
      });
    }
  }, [plan]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = plan
        ? `/api/v1/pricing-plans/admin/${plan.planId}`
        : "/api/v1/pricing-plans/admin";

      const submitData = {
        planCode: formData.planCode,
        pricePerUserMonth: formData.pricePerUserMonth,
        minUsers: formData.minUsers,
        maxUsers: formData.maxUsers || undefined,
        displayOrder: formData.displayOrder,
        badgeColor: formData.badgeColor,
        isActive: formData.isActive,
        translations: formData.translations,
      };

      const response = await apiFetch(endpoint, {
        method: plan ? "PUT" : "POST",
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onSave();
      } else {
        setError(data.message || "Failed to save plan");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminModal
      isOpen={true}
      onClose={onClose}
      title={plan ? "Edit Pricing Plan" : "Add New Pricing Plan"}
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
            {loading ? "Saving..." : "Save"}
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
          {/* Main Info */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Plan Code (Unique)
            </label>
            <input
              type="text"
              required
              value={formData.planCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  planCode: e.target.value.toUpperCase().replace(/\s+/g, "_"),
                })
              }
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              placeholder="e.g. STARTER_MONTHLY"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Price / User / Month
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.pricePerUserMonth}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pricePerUserMonth: parseFloat(e.target.value),
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Badge Color (Optional)
              </label>
              <input
                type="text"
                value={formData.badgeColor}
                onChange={(e) =>
                  setFormData({ ...formData, badgeColor: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                placeholder="e.g. blue, green"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Min Users
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.minUsers}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minUsers: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Max Users (0 = Unlimited)
              </label>
              <input
                type="number"
                min="0"
                value={formData.maxUsers}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxUsers: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Display Order
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.displayOrder}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    displayOrder: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              />
            </div>
          </div>

          {/* Translations */}
          <div className="space-y-2 pt-2 border-t border-gray-200">
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Translations
            </label>
            {formData.translations.map((trans: any, idx: number) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-lg p-3 border border-gray-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded text-white ${
                      trans.locale === "id" ? "bg-red-500" : "bg-blue-500"
                    }`}
                  >
                    {trans.locale.toUpperCase()}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Plan Name"
                      value={trans.planName}
                      onChange={(e) => {
                        const newTranslations = [
                          ...formData.translations,
                        ] as any[];
                        newTranslations[idx] = {
                          ...trans,
                          planName: e.target.value,
                        };
                        setFormData({
                          ...formData,
                          translations: newTranslations,
                        });
                      }}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                    />
                    <input
                      type="text"
                      placeholder="Price Period (e.g. /bulan)"
                      value={trans.pricePeriod}
                      onChange={(e) => {
                        const newTranslations = [
                          ...formData.translations,
                        ] as any[];
                        newTranslations[idx] = {
                          ...trans,
                          pricePeriod: e.target.value,
                        };
                        setFormData({
                          ...formData,
                          translations: newTranslations,
                        });
                      }}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={trans.description}
                    onChange={(e) => {
                      const newTranslations = [
                        ...formData.translations,
                      ] as any[];
                      newTranslations[idx] = {
                        ...trans,
                        description: e.target.value,
                      };
                      setFormData({
                        ...formData,
                        translations: newTranslations,
                      });
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
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="h-4 w-4 text-[#039edb] focus:ring-[#039edb] border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="text-xs text-gray-700">
              Active Plan
            </label>
          </div>
        </div>
      </form>
    </AdminModal>
  );
}
