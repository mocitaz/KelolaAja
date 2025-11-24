'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusIcon, PencilIcon, TrashIcon, Squares2X2Icon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { apiFetch, API_ENDPOINTS } from '@/lib/api-config';
import PageHeader from '@/components/admin/PageHeader';
import AdminCard from '@/components/admin/AdminCard';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';

interface PricingPlan {
  planId: number;
  planName: string;
  price: number;
  billingCycle: string;
  displayOrder: number;
  isActive: boolean;
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
      const response = await apiFetch('/api/v1/pricing-plans/admin/all');
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setPlans(data.data);
      } else {
        setPlans([]);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (planId: number) => {
    if (!confirm('Are you sure you want to delete this plan?')) return;
    
    try {
      await apiFetch(`/api/v1/pricing-plans/admin/${planId}`, {
        method: 'DELETE',
      });
      fetchPlans();
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  const activeCount = plans.filter(p => p.isActive).length;
  const inactiveCount = plans.filter(p => !p.isActive).length;

  const columns = [
    {
      header: 'Plan Name',
      render: (plan: PricingPlan) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{plan.planName}</div>
        </div>
      ),
    },
    {
      header: 'Price',
      render: (plan: PricingPlan) => (
        <div className="flex items-center gap-1">
          <CurrencyDollarIcon className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-semibold text-gray-900">
            {plan.price.toLocaleString()}
          </span>
        </div>
      ),
    },
    {
      header: 'Billing Cycle',
      render: (plan: PricingPlan) => (
        <span className="text-xs text-gray-600 capitalize">{plan.billingCycle}</span>
      ),
    },
    {
      header: 'Order',
      render: (plan: PricingPlan) => (
        <span className="text-xs text-gray-600">{plan.displayOrder}</span>
      ),
    },
    {
      header: 'Status',
      render: (plan: PricingPlan) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${
          plan.isActive
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {plan.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (plan: PricingPlan) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => router.push(`/admin/pricing-plans/${plan.planId}/features`)}
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
          label: 'Add Plan',
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
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Total Plans</p>
            <p className="text-xl font-bold text-gray-900">{plans.length}</p>
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
    planName: plan?.planName || '',
    price: plan?.price || 0,
    billingCycle: plan?.billingCycle || 'monthly',
    displayOrder: plan?.displayOrder || 0,
    isActive: plan?.isActive ?? true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (plan) {
      setFormData({
        planName: plan.planName,
        price: plan.price,
        billingCycle: plan.billingCycle,
        displayOrder: plan.displayOrder,
        isActive: plan.isActive,
      });
    }
  }, [plan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = plan
        ? `/api/v1/pricing-plans/admin/${plan.planId}`
        : '/api/v1/pricing-plans/admin';

      const response = await apiFetch(endpoint, {
        method: plan ? 'PUT' : 'POST',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onSave();
      } else {
        setError(data.message || 'Failed to save plan');
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
      title={plan ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}
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
            <label className="block text-xs font-semibold text-gray-700 mb-1">Plan Name</label>
            <input
              type="text"
              required
              value={formData.planName}
              onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Price</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Billing Cycle</label>
              <select
                value={formData.billingCycle}
                onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb] bg-white"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="one-time">One Time</option>
              </select>
            </div>
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

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 text-[#039edb] focus:ring-[#039edb] border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="text-xs text-gray-700">Active Plan</label>
          </div>
        </div>
      </form>
    </AdminModal>
  );
}
