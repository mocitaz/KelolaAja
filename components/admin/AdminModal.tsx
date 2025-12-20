'use client';

import { ReactNode, useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  footer?: ReactNode;
}

export default function AdminModal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  footer
}: AdminModalProps) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setShowModal(false), 200); // Animation duration
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!showModal && !isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl',
    'full': 'max-w-[95vw]'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full mx-auto my-6 bg-white border border-slate-200 rounded-2xl shadow-2xl outline-none focus:outline-none transform transition-all duration-300 scale-95 opacity-0 ${sizeClasses[size]} ${isOpen ? 'scale-100 opacity-100' : ''}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 ml-auto bg-transparent border-0 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all focus:outline-none"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="relative px-6 py-6 flex-auto max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end px-6 py-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
