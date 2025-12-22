'use client'

import { TextareaHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
    helperText?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, helperText, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}

                <textarea
                    ref={ref}
                    className={cn(
                        'w-full px-4 py-2.5 text-sm bg-white dark:bg-gray-900 border rounded-lg transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent',
                        'placeholder:text-gray-400 dark:placeholder:text-gray-600',
                        'resize-none',
                        error
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 dark:border-gray-700',
                        className
                    )}
                    {...props}
                />

                {error && (
                    <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>
                )}

                {helperText && !error && (
                    <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
                )}
            </div>
        )
    }
)

Textarea.displayName = 'Textarea'

export default Textarea
