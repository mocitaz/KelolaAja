'use client';

import { useEffect, useState } from 'react';
import {
  UsersIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  ChartBarIcon,
  EyeIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

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
      const token = localStorage.getItem('accessToken');
      
      // Fetch users count
      const usersRes = await fetch('http://localhost:8080/api/v1/users?limit=1', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const usersData = await usersRes.json();
      
      // Fetch analytics
      const analyticsRes = await fetch('http://localhost:8080/api/v1/analytics/overview', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const analyticsData = await analyticsRes.json();
      
      // Fetch contact submissions
      const contactsRes = await fetch('http://localhost:8080/api/v1/admin/contact-submissions?limit=1', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const contactsData = await contactsRes.json();
      
      // Fetch recent audit logs
      const logsRes = await fetch('http://localhost:8080/api/v1/admin/audit-logs?limit=10', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
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
      icon: UsersIcon,
      gradient: 'from-[#039edb] to-[#0280af]',
      href: '/admin/users',
    },
    {
      name: 'Total Content Items',
      value: stats.totalContent,
      icon: DocumentTextIcon,
      gradient: 'from-[#71bf44] to-[#5a9936]',
      href: '/admin/features',
    },
    {
      name: 'Contact Submissions',
      value: stats.totalContacts,
      icon: EnvelopeIcon,
      gradient: 'from-[#039edb] to-[#71bf44]',
      href: '/admin/contact-submissions',
    },
    {
      name: 'Total Visitors',
      value: stats.totalVisitors,
      icon: EyeIcon,
      gradient: 'from-purple-500 to-pink-500',
      href: '/admin/analytics',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to KelolaAja Admin Panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            onClick={() => window.location.href = stat.href}
          >
            <div className="flex items-center">
              <div className={`bg-gradient-to-br ${stat.gradient} rounded-lg p-3 shadow-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : stat.value.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {loading ? (
            <div className="px-6 py-4 text-center text-gray-500">Loading...</div>
          ) : recentActivities.length === 0 ? (
            <div className="px-6 py-4 text-center text-gray-500">No recent activities</div>
          ) : (
            recentActivities.map((activity, index) => (
              <div key={index} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.entityType} - {activity.entityName || 'N/A'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      By {activity.user?.fullName || 'Unknown'} •{' '}
                      {new Date(activity.createdAt).toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="ml-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        activity.action.includes('CREATE')
                          ? 'bg-gradient-to-r from-[#71bf44]/10 to-[#5a9936]/10 text-[#71bf44] border border-[#71bf44]/30'
                          : activity.action.includes('UPDATE')
                          ? 'bg-gradient-to-r from-[#039edb]/10 to-[#71bf44]/10 text-[#039edb] border border-[#039edb]/30'
                          : activity.action.includes('DELETE')
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {activity.action.split('_')[0]}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <QuickActionCard
          title="Manage Users"
          description="Add, edit, or remove users"
          icon={UsersIcon}
          href="/admin/users"
          color="from-[#039edb] to-[#0280af]"
        />
        <QuickActionCard
          title="Pricing Plans"
          description="Manage pricing plans and features"
          icon={CurrencyDollarIcon}
          href="/admin/pricing-plans"
          color="from-[#71bf44] to-[#5a9936]"
        />
        <QuickActionCard
          title="View Analytics"
          description="Check site analytics and reports"
          icon={ChartBarIcon}
          href="/admin/analytics"
          color="from-[#039edb] to-[#71bf44]"
        />
      </div>
    </div>
  );
}

function QuickActionCard({
  title,
  description,
  icon: Icon,
  href,
  color,
}: {
  title: string;
  description: string;
  icon: any;
  href: string;
  color: string;
}) {
  return (
    <a
      href={href}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className={`bg-gradient-to-br ${color} rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4 shadow-lg`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </a>
  );
}
