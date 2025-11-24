'use client';

import { useEffect, useState } from 'react';
import {
  UsersIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  ChartBarIcon,
  EyeIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import { apiFetch, API_ENDPOINTS } from '@/lib/api-config';
import StatCard from '@/components/admin/StatCard';
import AdminCard from '@/components/admin/AdminCard';

interface Stats {
  totalUsers: number;
  totalContent: number;
  totalContacts: number;
  totalVisitors: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalContent: 0,
    totalContacts: 0,
    totalVisitors: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch users count
      const usersRes = await apiFetch(`${API_ENDPOINTS.USERS.LIST}?limit=1`);
      const usersData = await usersRes.json();
      
      // Fetch analytics
      const analyticsRes = await apiFetch(API_ENDPOINTS.ANALYTICS.OVERVIEW);
      const analyticsData = await analyticsRes.json();
      
      // Fetch contact submissions
      const contactsRes = await apiFetch(`${API_ENDPOINTS.CONTACTS.LIST}?limit=1`);
      const contactsData = await contactsRes.json();
      
      // Fetch recent audit logs
      const logsRes = await apiFetch(`${API_ENDPOINTS.AUDIT_LOGS.LIST}?limit=10`);
      const logsData = await logsRes.json();

      setStats({
        totalUsers: usersData.meta?.total || 0,
        totalContent: analyticsData.data?.totalContent || 0,
        totalContacts: contactsData.meta?.total || 0,
        totalVisitors: analyticsData.data?.totalVisitors || 0,
      });

      setRecentActivities(logsData.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: 'Total Users',
      value: stats.totalUsers,
      icon: <UsersIcon className="h-6 w-6" />,
      gradient: 'from-[#039edb] to-[#0280af]',
      href: '/admin/users',
    },
    {
      name: 'Total Content',
      value: stats.totalContent,
      icon: <DocumentTextIcon className="h-6 w-6" />,
      gradient: 'from-[#71bf44] to-[#5a9936]',
      href: '/admin/features',
    },
    {
      name: 'Contact Submissions',
      value: stats.totalContacts,
      icon: <EnvelopeIcon className="h-6 w-6" />,
      gradient: 'from-[#039edb] to-[#71bf44]',
      href: '/admin/contact-submissions',
    },
    {
      name: 'Total Visitors',
      value: stats.totalVisitors,
      icon: <EyeIcon className="h-6 w-6" />,
      gradient: 'from-purple-500 to-pink-500',
      href: '/admin/analytics',
    },
  ];

  const getActionBadge = (action: string) => {
    if (action.includes('CREATE')) {
      return 'bg-green-50 text-green-700 border-green-200';
    } else if (action.includes('UPDATE')) {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    } else if (action.includes('DELETE')) {
      return 'bg-red-50 text-red-700 border-red-200';
    }
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-0.5 text-xs text-gray-600">Overview of your system</p>
      </div>

      {/* Stats Grid - Compact */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <StatCard
            key={stat.name}
            title={stat.name}
            value={stat.value}
            icon={stat.icon}
            gradient={stat.gradient}
            href={stat.href}
            loading={loading}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activities - Compact */}
        <div className="lg:col-span-2">
          <AdminCard title="Recent Activities" compact>
            {loading ? (
              <div className="py-6 text-center">
                <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-[#039edb]"></div>
                <p className="mt-2 text-xs text-gray-500">Loading...</p>
              </div>
            ) : recentActivities.length === 0 ? (
              <div className="py-6 text-center">
                <ClockIcon className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-xs text-gray-500">No recent activities</p>
              </div>
            ) : (
              <div className="space-y-2">
                {recentActivities.slice(0, 5).map((activity, index) => (
                  <div key={index} className="flex items-start justify-between p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-xs font-medium text-gray-900 truncate">
                          {activity.action.replace(/_/g, ' ')}
                        </p>
                        <span className={`px-1.5 py-0.5 text-xs font-medium rounded border flex-shrink-0 ${getActionBadge(activity.action)}`}>
                          {activity.action.split('_')[0]}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 truncate">
                        {activity.entityType} • {activity.entityName || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {activity.user?.fullName || 'Unknown'} • {new Date(activity.createdAt).toLocaleString('id-ID', { 
                          day: 'numeric', 
                          month: 'short', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </AdminCard>
        </div>

        {/* Quick Actions - Compact */}
        <div>
          <AdminCard title="Quick Actions" compact>
            <div className="space-y-1.5">
              <a
                href="/admin/users"
                className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="bg-gradient-to-br from-[#039edb] to-[#0280af] rounded-lg p-2 group-hover:scale-110 transition-transform flex-shrink-0">
                  <UsersIcon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900">Manage Users</p>
                  <p className="text-xs text-gray-500 truncate">Add, edit, or remove</p>
                </div>
              </a>
              <a
                href="/admin/pricing-plans"
                className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="bg-gradient-to-br from-[#71bf44] to-[#5a9936] rounded-lg p-2 group-hover:scale-110 transition-transform flex-shrink-0">
                  <CurrencyDollarIcon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900">Pricing Plans</p>
                  <p className="text-xs text-gray-500 truncate">Manage plans & features</p>
                </div>
              </a>
              <a
                href="/admin/analytics"
                className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="bg-gradient-to-br from-[#039edb] to-[#71bf44] rounded-lg p-2 group-hover:scale-110 transition-transform flex-shrink-0">
                  <ChartBarIcon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900">Analytics</p>
                  <p className="text-xs text-gray-500 truncate">View reports & stats</p>
                </div>
              </a>
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
