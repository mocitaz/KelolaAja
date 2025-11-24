'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  gradient: string;
  href?: string;
  loading?: boolean;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatCard({ 
  title, 
  value, 
  icon, 
  gradient, 
  href, 
  loading = false,
  trend 
}: StatCardProps) {
  const content = (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 ${href ? 'cursor-pointer group' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`bg-gradient-to-br ${gradient} rounded-lg p-2.5 shadow-sm group-hover:scale-110 transition-transform flex-shrink-0`}>
            <div className="h-5 w-5 text-white">
              {icon}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-0.5 truncate">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-xl font-bold text-gray-900 truncate">
                {loading ? (
                  <span className="inline-block w-10 h-5 bg-gray-200 rounded animate-pulse"></span>
                ) : (
                  typeof value === 'number' ? value.toLocaleString() : value
                )}
              </p>
              {trend && (
                <span className={`text-xs font-semibold whitespace-nowrap ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                </span>
              )}
            </div>
          </div>
        </div>
        {href && (
          <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

