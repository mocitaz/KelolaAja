'use client';

import { useEffect, useState } from 'react';
import { EyeIcon, UserGroupIcon, DocumentTextIcon, CalendarIcon } from '@heroicons/react/24/outline';

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

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        
        // Fetch overview
        const overviewRes = await fetch('http://localhost:8080/api/v1/analytics/overview', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const overviewData = await overviewRes.json();
        
        // Fetch top pages
        const topPagesRes = await fetch(
          `http://localhost:8080/api/v1/analytics/top-pages?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}&limit=10`,
          { headers: { Authorization: `Bearer ${token}` } }
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
    };

    loadAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      
      // Fetch overview
      const overviewRes = await fetch('http://localhost:8080/api/v1/analytics/overview', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const overviewData = await overviewRes.json();
      
      // Fetch top pages
      const topPagesRes = await fetch(
        `http://localhost:8080/api/v1/analytics/top-pages?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}&limit=10`,
        { headers: { Authorization: `Bearer ${token}` } }
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
  };

  const statCards = [
    {
      name: 'Total Visitors',
      value: overview?.totalVisitors || 0,
      icon: UserGroupIcon,
      color: 'bg-gradient-to-r from-[#039edb] to-[#0280af]',
    },
    {
      name: 'Page Views',
      value: overview?.totalPageViews || 0,
      icon: EyeIcon,
      color: 'bg-green-500',
    },
    {
      name: 'Content Items',
      value: overview?.totalContent || 0,
      icon: DocumentTextIcon,
      color: 'bg-purple-500',
    },
    {
      name: 'Recent Visits (7d)',
      value: overview?.recentVisits || 0,
      icon: CalendarIcon,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-2 text-gray-600">Website analytics and statistics</p>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, startDate: e.target.value })
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, endDate: e.target.value })
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} rounded-lg p-3`}>
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

      {/* Top Pages */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Top Pages</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Page Path
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Visits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : topPages.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              ) : (
                topPages.map((page, index) => {
                  const totalVisits = topPages.reduce((sum, p) => sum + p.visits, 0);
                  const percentage = ((page.visits / totalVisits) * 100).toFixed(1);
                  
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {page.pagePath}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {page.visits.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-xs">
                            <div
                              className="bg-gradient-to-r from-[#039edb] to-[#71bf44] h-2.5 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
