"use client";

import { useEffect, useState } from "react";
import { ClipboardDocumentListIcon, FunnelIcon } from "@heroicons/react/24/outline";

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
  const [filters, setFilters] = useState({
    action: "",
    entityType: "",
    userId: "",
    startDate: "",
    endDate: ""
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(
    () => {
      const loadLogs = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const params = new URLSearchParams({
            page: page.toString(),
            limit: "20",
            ...(filters.action && { action: filters.action }),
            ...(filters.entityType && { entityType: filters.entityType }),
            ...(filters.userId && { userId: filters.userId }),
            ...(filters.startDate && { startDate: filters.startDate }),
            ...(filters.endDate && { endDate: filters.endDate })
          });

          const response = await fetch(`http://localhost:8080/api/v1/admin/audit-logs?${params}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          const data = await response.json();
          if (data.success) {
            setLogs(data.data);
            setTotalPages(data.meta.totalPages);
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      };

      loadLogs();
    },
    [page, filters]
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Audit Logs</h1>
          <p className="text-gray-600 mt-2">Track all system activities</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          <FunnelIcon className="h-5 w-5 mr-2" />
          {showFilters ? "Hide" : "Show"} Filters
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Action</label>
              <select
                value={filters.action}
                onChange={e => setFilters({ ...filters, action: e.target.value })}
                className="block w-full px-3 py-2 border rounded-md"
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
              <label className="block text-sm font-medium mb-1">Entity Type</label>
              <select
                value={filters.entityType}
                onChange={e => setFilters({ ...filters, entityType: e.target.value })}
                className="block w-full px-3 py-2 border rounded-md"
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
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={e => setFilters({ ...filters, startDate: e.target.value })}
                className="block w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>
      )}

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No logs found
                </td>
              </tr>
            ) : (
              logs.map(log => (
                <tr key={log.logId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{new Date(log.createdAt).toLocaleString("id-ID")}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium">{log.user.fullName}</div>
                    <div className="text-xs text-gray-500">{log.user.role}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        log.action.includes("CREATE")
                          ? "bg-gradient-to-r from-[#71bf44]/10 to-[#5a9936]/10 text-[#71bf44] border border-[#71bf44]/30"
                          : log.action.includes("UPDATE")
                          ? "bg-gradient-to-r from-[#039edb]/10 to-[#71bf44]/10 text-[#039edb] border border-[#039edb]/30"
                          : log.action.includes("DELETE")
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{log.entityType}</div>
                    {log.entityName && <div className="text-xs text-gray-500">{log.entityName}</div>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {log.ipAddress && <div>IP: {log.ipAddress}</div>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-4 py-3 border-t flex justify-between">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
