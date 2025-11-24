'use client';

import { ReactNode } from 'react';

interface AdminCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
  compact?: boolean;
}

export default function AdminCard({ 
  title, 
  children, 
  className = '', 
  headerAction,
  compact = false 
}: AdminCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      {title && (
        <div className={`px-4 ${compact ? 'py-2.5' : 'py-3'} border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between`}>
          <h3 className={`${compact ? 'text-sm' : 'text-base'} font-semibold text-gray-900`}>{title}</h3>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className={compact ? 'p-4' : 'p-5'}>{children}</div>
    </div>
  );
}

