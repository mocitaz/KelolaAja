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
  CalendarIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { apiFetch, API_ENDPOINTS } from '@/lib/api-config';
import Link from 'next/link';

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
  const [user, setUser] = useState<any>(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Get user from local storage or API
    const token = localStorage.getItem("accessToken");
    if (token) {
      apiFetch("/api/proxy?endpoint=/api/v1/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json()).then(data => {
        if (data.success) setUser(data.data);
      });
    }

    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Parallel data fetching for speed
      const [usersRes, analyticsRes, contactsRes, logsRes] = await Promise.all([
        apiFetch(`${API_ENDPOINTS.USERS.LIST}?limit=1`),
        apiFetch(API_ENDPOINTS.ADMIN.ANALYTICS.OVERVIEW),
        apiFetch(`${API_ENDPOINTS.ADMIN.CONTACTS.LIST}?limit=1`),
        apiFetch(`${API_ENDPOINTS.ADMIN.AUDIT_LOGS.LIST}?limit=8`)
      ]);

      const [usersData, analyticsData, contactsData, logsData] = await Promise.all([
        usersRes.json(),
        analyticsRes.json(),
        contactsRes.json(),
        logsRes.json()
      ]);

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
      change: '+12%',
      icon: UsersIcon,
      color: 'blue',
      gradient: 'from-[#039edb] to-[#0280af]',
      href: '/admin/users',
    },
    {
      name: 'Total Content',
      value: stats.totalContent,
      change: '+5%',
      icon: DocumentTextIcon,
      color: 'green',
      gradient: 'from-[#71bf44] to-[#5a9936]',
      href: '/admin/testimonials',
    },
    {
      name: 'Contact Submissions',
      value: stats.totalContacts,
      change: '+24%',
      icon: EnvelopeIcon,
      color: 'teal',
      gradient: 'from-teal-400 to-teal-600',
      href: '/admin/contact-submissions',
    },
    {
      name: 'Total Visitors',
      value: stats.totalVisitors,
      change: '+8%',
      icon: EyeIcon,
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-600',
      href: '/admin/analytics',
    },
  ];

  const getActionColor = (action: string) => {
    if (action.includes('CREATE')) return 'bg-green-100 text-green-700 border-green-200';
    if (action.includes('UPDATE')) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (action.includes('DELETE')) return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-slate-200"></div>
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-[#039edb] border-t-transparent animate-spin"></div>
        </div>
        <p className="text-slate-500 font-medium animate-pulse">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#039edb] p-8 lg:p-12 text-white shadow-2xl">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-[#71bf44]/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#71bf44] font-medium bg-white/5 w-fit px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#71bf44] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#71bf44]"></span>
              </span>
              <span className="text-xs tracking-wide uppercase">System Healthy</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
              {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-200">{user?.fullName?.split(' ')[0] || 'Admin'}</span>
            </h1>
            <p className="text-slate-300 max-w-xl text-sm leading-relaxed">
              Here is what is happening with your business today. You have <span className="text-white font-semibold">{stats.totalContacts} new contacts</span> contacts and visitor traffic is up by <span className="text-[#71bf44] font-semibold">12%</span>.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="/admin/contact-submissions" className="px-5 py-2.5 bg-white text-slate-900 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-lg">
                View Messages
              </Link>
              <Link href="/admin/analytics" className="px-5 py-2.5 bg-white/10 text-white text-sm font-semibold rounded-xl hover:bg-white/20 backdrop-blur-md border border-white/10 transition-colors">
                View Analytics
              </Link>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 lg:min-w-[300px]">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-slate-300">Current Date</p>
                <p className="font-semibold text-lg">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
            <div className="h-px bg-white/10 my-4" />
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300">Version</span>
              <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-xs">v2.4.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Link key={stat.name} href={stat.href} className="group relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden">
            <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity bg-gradient-to-br ${stat.gradient} rounded-bl-3xl`}>
              <stat.icon className="w-16 h-16 text-white" />
            </div>

            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="mt-4">
                <p className="text-sm text-slate-500 font-medium">{stat.name}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="text-2xl font-bold text-slate-900">{stat.value.toLocaleString()}</h3>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    <ArrowTrendingUpIcon className="w-3 h-3" /> {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Timeline */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
              <p className="text-sm text-slate-500">Latest actions performed across the system</p>
            </div>
            <Link href="/admin/audit-logs" className="text-sm font-medium text-[#039edb] hover:text-[#0284b8] flex items-center gap-1 group">
              View All <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="relative pl-4 border-l border-slate-100 space-y-8">
            {recentActivities.map((activity, index) => (
              <div key={index} className="relative pl-6">
                {/* Timeline Dot */}
                <span className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full border-2 border-white ring-1 ring-slate-200 ${activity.action.includes('CREATE') ? 'bg-green-500' :
                  activity.action.includes('UPDATE') ? 'bg-blue-500' :
                    activity.action.includes('DELETE') ? 'bg-red-500' : 'bg-slate-400'
                  }`}></span>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 group">
                  <div>
                    <p className="text-sm font-medium text-slate-800 group-hover:text-[#039edb] transition-colors">
                      <span className="font-bold">{activity.user?.fullName || 'System'}</span> {activity.action.toLowerCase().replace(/_/g, ' ')} <span className="font-bold">{activity.entityName || 'item'}</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Module: {activity.entityType}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                    {new Date(activity.createdAt).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}

            {recentActivities.length === 0 && (
              <div className="py-12 text-center text-slate-400 italic">
                No recent activities found.
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions & System Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/admin/users" className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-sky-50 hover:border-sky-100 hover:text-[#039edb] transition-all group text-center">
                <UsersIcon className="w-6 h-6 mb-2 text-slate-400 group-hover:text-[#039edb]" />
                <span className="text-xs font-semibold">Users</span>
              </Link>
              <Link href="/admin/pricing-plans" className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-purple-50 hover:border-purple-100 hover:text-purple-600 transition-all group text-center">
                <CurrencyDollarIcon className="w-6 h-6 mb-2 text-slate-400 group-hover:text-purple-600" />
                <span className="text-xs font-semibold">Pricing</span>
              </Link>
              <Link href="/admin/site-config" className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-orange-50 hover:border-orange-100 hover:text-orange-600 transition-all group text-center">
                <CheckCircleIcon className="w-6 h-6 mb-2 text-slate-400 group-hover:text-orange-600" />
                <span className="text-xs font-semibold">Config</span>
              </Link>
              <Link href="/admin/testimonials" className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-green-50 hover:border-green-100 hover:text-green-600 transition-all group text-center">
                <ChatBubbleLeftRightIcon className="w-6 h-6 mb-2 text-slate-400 group-hover:text-green-600" />
                <span className="text-xs font-semibold">Reviews</span>
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">Need Help?</h3>
              <p className="text-slate-300 text-sm mb-4">Check our documentation for guides and API references.</p>
              <button className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-sm font-semibold transition-colors backdrop-blur-sm">
                Open Documentation
              </button>
            </div>

            {/* Decor */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-[#039edb]/30 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
