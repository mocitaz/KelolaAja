'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusIcon, PencilIcon, TrashIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { apiFetch } from '@/lib/api-config';

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
        console.error('Invalid data format:', data);
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
      const response = await apiFetch(`/api/v1/pricing-plans/admin/${planId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchPlans();
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Pricing Plans</h1>
        <button
          onClick={() => {
            setEditingPlan(null);
            setShowModal(true);
          }}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-md hover:opacity-90 transition"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Plan
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Billing Cycle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">Loading...</td>
              </tr>
            ) : plans.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No plans found</td>
              </tr>
            ) : (
              plans.map((plan) => (
                <tr key={plan.planId} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{plan.planName || 'Unnamed Plan'}</div>
                    {plan.translations && plan.translations[0]?.displayName && (
                      <div className="text-sm text-gray-500">{plan.translations[0].displayName}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    Rp {plan.price ? plan.price.toLocaleString('id-ID') : '0'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{plan.billingCycle || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{plan.displayOrder || 0}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${plan.isActive ? 'bg-gradient-to-r from-[#71bf44]/10 to-[#5a9936]/10 text-[#71bf44] border border-[#71bf44]/30' : 'bg-red-100 text-red-800'}`}>
                      {plan.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => router.push(`/admin/pricing-plans/features?planId=${plan.planId}`)}
                        className="text-[#71bf44] hover:text-[#5a9936] transition"
                        title="Manage Features"
                      >
                        <Squares2X2Icon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => { setEditingPlan(plan); setShowModal(true); }}
                        className="text-[#039edb] hover:text-[#028dc9] transition"
                        title="Edit Plan"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(plan.planId)}
                        className="text-red-600 hover:text-red-900 transition"
                        title="Delete Plan"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <PlanModal plan={editingPlan} onClose={() => { setShowModal(false); setEditingPlan(null); }} onSave={() => { setShowModal(false); fetchPlans(); }} />
      )}
    </div>
  );
}

function PlanModal({ plan, onClose, onSave }: { plan: PricingPlan | null; onClose: () => void; onSave: () => void; }) {
  const [formData, setFormData] = useState({
    planName: plan?.planName || '',
    price: plan?.price || 0,
    billingCycle: plan?.billingCycle || 'monthly',
    displayOrder: plan?.displayOrder || 1,
    isActive: plan?.isActive ?? true,
    translations: plan?.translations || [
      { locale: 'id', displayName: '', description: '' },
      { locale: 'en', displayName: '', description: '' },
    ],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = plan
        ? `/api/v1/pricing-plans/admin/${plan.planId}`
        : '/api/v1/pricing-plans/admin';

      const response = await apiFetch(url, {
        method: plan ? 'PUT' : 'POST',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSave();
      }
    } catch (error) {
      console.error('Error saving plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-medium mb-4">{plan ? 'Edit Plan' : 'Add New Plan'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Plan Name</label>
              <input type="text" required value={formData.planName} onChange={(e) => setFormData({ ...formData, planName: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Billing Cycle</label>
              <select value={formData.billingCycle} onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="lifetime">Lifetime</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Display Order</label>
              <input type="number" value={formData.displayOrder} onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Translations</h4>
            {formData.translations.map((trans, idx) => (
              <div key={idx} className="border p-3 rounded">
                <div className="font-medium text-sm mb-2">{trans.locale.toUpperCase()}</div>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Display Name"
                    value={trans.displayName}
                    onChange={(e) => {
                      const newTrans = [...formData.translations];
                      newTrans[idx].displayName = e.target.value;
                      setFormData({ ...formData, translations: newTrans });
                    }}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  <textarea
                    placeholder="Description"
                    value={trans.description}
                    onChange={(e) => {
                      const newTrans = [...formData.translations];
                      newTrans[idx].description = e.target.value;
                      setFormData({ ...formData, translations: newTrans });
                    }}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="h-4 w-4 text-[#039edb] rounded" />
            <label className="ml-2 block text-sm text-gray-900">Active</label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white rounded-md hover:opacity-90 disabled:opacity-50 transition">
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
