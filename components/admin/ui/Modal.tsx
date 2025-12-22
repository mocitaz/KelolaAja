'use client'

import { ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'
import Button from './Button'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl'
    footer?: ReactNode
}

export default function Modal({ isOpen, onClose, title, children, size = 'md', footer }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    if (!isOpen) return null

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl'
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className={`relative w-full ${sizes[size]} max-h-[90vh] flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200`}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    )
}
