'use client';

import { useEffect, useState } from 'react';
import { ClipboardDocumentListIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { apiFetch, API_ENDPOINTS } from '@/lib/api-config';
import PageHeader from '@/components/admin/PageHeader';
import AdminCard from '@/components/admin/AdminCard';
import AdminTable from '@/components/admin/AdminTable';
import Pagination from '@/components/admin/Pagination';
import SearchBar from '@/components/admin/SearchBar';

interface AuditLog {
  logId: number;
  userId: number;
  action: string;
  entityType: string;
  entityId: number | null;
  entityName: string | null;
  changes: any;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  user: {
    fullName: string;
    email: string;
    role: string;
  };
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    action: '',
    entityType: '',
    userId: '',
    startDate: '',
    endDate: '',
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchLogs();
  }, [page, filters]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(filters.action && { action: filters.action }),
        ...(filters.entityType && { entityType: filters.entityType }),
        ...(filters.userId && { userId: filters.userId }),
        ...(filters.startDate && { startDate: filters.startDate }),
        ...(filters.endDate && { endDate: filters.endDate }),
      });

      const response = await apiFetch(`${API_ENDPOINTS.AUDIT_LOGS.LIST}?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setLogs(data.data);
        setTotalPages(data.meta.totalPages);
        setTotalItems(data.meta.total);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionBadge = (action: string) => {
    if (action.includes('CREATE')) {
      return 'bg-green-50 text-green-700 border border-green-200';
    } else if (action.includes('UPDATE')) {
      return 'bg-blue-50 text-blue-700 border border-blue-200';
    } else if (action.includes('DELETE')) {
      return 'bg-red-50 text-red-700 border border-red-200';
    } else if (action.includes('LOGIN')) {
      return 'bg-purple-50 text-purple-700 border border-purple-200';
    }
    return 'bg-gray-50 text-gray-700 border border-gray-200';
  };

  const filteredLogs = logs.filter(log =>
    log.action.toLowerCase().includes(search.toLowerCase()) ||
    log.entityType.toLowerCase().includes(search.toLowerCase()) ||
    log.user.fullName.toLowerCase().includes(search.toLowerCase()) ||
    (log.entityName && log.entityName.toLowerCase().includes(search.toLowerCase()))
  );

  const columns = [
    {
      header: 'Timestamp',
      render: (log: AuditLog) => (
        <span className="text-xs text-gray-600">
          {new Date(log.createdAt).toLocaleString('id-ID', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      ),
    },
    {
      header: 'User',
      render: (log: AuditLog) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{log.user.fullName}</div>
          <div className="text-xs text-gray-500">{log.user.role}</div>
        </div>
      ),
    },
    {
      header: 'Action',
      render: (log: AuditLog) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${getActionBadge(log.action)}`}>
          {log.action}
        </span>
      ),
    },
    {
      header: 'Entity',
      render: (log: AuditLog) => (
        <div>
          <div className="text-sm text-gray-900">{log.entityType}</div>
          {log.entityName && (
            <div className="text-xs text-gray-500 truncate max-w-xs">{log.entityName}</div>
          )}
        </div>
      ),
    },
    {
      header: 'IP Address',
      render: (log: AuditLog) => (
        <span className="text-xs text-gray-600 font-mono">{log.ipAddress || '-'}</span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Audit Logs"
        description="Track all system activities and changes"
        action={{
          label: showFilters ? 'Hide Filters' : 'Show Filters',
          onClick: () => setShowFilters(!showFilters),
          icon: <FunnelIcon className="h-4 w-4" />,
        }}
      />

      {/* Filters */}
      {showFilters && (
        <AdminCard compact>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Action</label>
              <select
                value={filters.action}
                onChange={(e) => setFilters({ ...filters, action: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb] bg-white"
              >
                <option value="">All Actions</option>
                <option value="CREATE">Create</option>
                <option value="UPDATE">Update</option>
                <option value="DELETE">Delete</option>
                <option value="LOGIN">Login</option>
                <option value="LOGOUT">Logout</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Entity Type</label>
              <select
                value={filters.entityType}
                onChange={(e) => setFilters({ ...filters, entityType: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb] bg-white"
              >
                <option value="">All Entities</option>
                <option value="USER">User</option>
                <option value="PRICING_PLAN">Pricing Plan</option>
                <option value="FEATURE">Feature</option>
                <option value="PARTNER">Partner</option>
                <option value="TESTIMONIAL">Testimonial</option>
                <option value="FAQ">FAQ</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">User ID</label>
              <input
                type="number"
                value={filters.userId}
                onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
                placeholder="Filter by user ID"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb]"
              />
            </div>
          </div>
        </AdminCard>
      )}

      {/* Search */}
      <AdminCard compact>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by action, entity, or user..."
        />
      </AdminCard>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Total Logs</p>
            <p className="text-xl font-bold text-gray-900">{totalItems}</p>
          </div>
        </AdminCard>
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Current Page</p>
            <p className="text-xl font-bold text-[#039edb]">{page}</p>
          </div>
        </AdminCard>
        <AdminCard compact>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Total Pages</p>
            <p className="text-xl font-bold text-gray-900">{totalPages}</p>
          </div>
        </AdminCard>
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={filteredLogs}
        loading={loading}
        emptyMessage="No audit logs found"
      />

      {/* Pagination */}
      {!loading && logs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={totalItems}
          itemsPerPage={20}
        />
      )}
    </div>
  );
}
