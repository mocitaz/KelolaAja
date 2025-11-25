'use client';

import { useEffect, useState, useCallback } from 'react';
import { EyeIcon, UserGroupIcon, DocumentTextIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { apiFetch, API_ENDPOINTS } from '@/lib/api-config';
import PageHeader from '@/components/admin/PageHeader';
import AdminCard from '@/components/admin/AdminCard';
import StatCard from '@/components/admin/StatCard';

interface AnalyticsOverview {
  totalVisitors: number;
  totalPageViews: number;
  totalContent: number;
  recentVisits: number;
}

interface TopPage {
  pagePath: string;
  visits: number;
}

export default function AnalyticsPage() {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch overview
      const overviewRes = await apiFetch(API_ENDPOINTS.ANALYTICS.OVERVIEW);
      const overviewData = await overviewRes.json();
      
      // Fetch top pages
      const topPagesRes = await apiFetch(
        `/api/v1/analytics/top-pages?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}&limit=10`
      );
      const topPagesData = await topPagesRes.json();

      if (overviewData.success) {
        setOverview(overviewData.data);
      }
      if (topPagesData.success) {
        setTopPages(topPagesData.data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const statCards = [
    {
      name: 'Total Visitors',
      value: overview?.totalVisitors || 0,
      icon: <UserGroupIcon className="h-6 w-6" />,
      gradient: 'from-[#039edb] to-[#0280af]',
    },
    {
      name: 'Page Views',
      value: overview?.totalPageViews || 0,
      icon: <EyeIcon className="h-6 w-6" />,
      gradient: 'from-green-500 to-green-600',
    },
    {
      name: 'Content Items',
      value: overview?.totalContent || 0,
      icon: <DocumentTextIcon className="h-6 w-6" />,
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Recent Visits (7d)',
      value: overview?.recentVisits || 0,
      icon: <CalendarIcon className="h-6 w-6" />,
      gradient: 'from-yellow-500 to-yellow-600',
    },
  ];

  const totalVisits = topPages.reduce((sum, p) => sum + p.visits, 0);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Analytics"
        description="Website analytics and statistics"
      />

      {/* Date Range Filter */}
      <AdminCard compact>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, startDate: e.target.value })
              }
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, endDate: e.target.value })
              }
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
            />
          </div>
        </div>
      </AdminCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <StatCard
            key={stat.name}
            title={stat.name}
            value={stat.value}
            icon={stat.icon}
            gradient={stat.gradient}
            loading={loading}
          />
        ))}
      </div>

      {/* Top Pages */}
      <AdminCard title="Top Pages" compact>
        {loading ? (
          <div className="py-8 text-center">
            <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-[#039edb]"></div>
            <p className="mt-2 text-xs text-gray-500">Loading...</p>
          </div>
        ) : topPages.length === 0 ? (
          <div className="py-8 text-center">
            <DocumentTextIcon className="mx-auto h-10 w-10 text-gray-300" />
            <p className="mt-2 text-xs text-gray-500">No data available</p>
          </div>
        ) : (
          <div className="space-y-2">
            {topPages.map((page, index) => {
              const percentage = totalVisits > 0 ? ((page.visits / totalVisits) * 100).toFixed(1) : '0';
              
              return (
                <div key={index} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{page.pagePath}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                        <div
                          className="bg-gradient-to-r from-[#039edb] to-[#71bf44] h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 whitespace-nowrap">{percentage}%</span>
                    </div>
                  </div>
                  <div className="ml-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                    {page.visits != null ? page.visits.toLocaleString() : '0'}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </AdminCard>
    </div>
  );
}
