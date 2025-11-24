'use client';

import { ReactNode } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  };
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export default function PageHeader({ title, description, action, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="mb-5">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex mb-3" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="text-gray-400">/</span>}
                {crumb.href ? (
                  <a href={crumb.href} className="text-gray-500 hover:text-gray-700 px-1">
                    {crumb.label}
                  </a>
                ) : (
                  <span className={`px-1 ${index === breadcrumbs.length - 1 ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="mt-0.5 text-xs text-gray-600">{description}</p>
          )}
        </div>
        
        {action && (
          <button
            onClick={action.onClick}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md hover:opacity-90 transition-all duration-200 whitespace-nowrap flex-shrink-0"
          >
            {action.icon || <PlusIcon className="h-4 w-4" />}
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}

