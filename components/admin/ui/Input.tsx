'use client'

import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, helperText, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false)
        const isPassword = type === 'password'
        const inputType = isPassword && showPassword ? 'text' : type

        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}

                <div className="relative">
                    <input
                        ref={ref}
                        type={inputType}
                        className={cn(
                            'w-full px-4 py-2.5 text-sm bg-white dark:bg-gray-900 border rounded-lg transition-all duration-200',
                            'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent',
                            'placeholder:text-gray-400 dark:placeholder:text-gray-600',
                            error
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 dark:border-gray-700',
                            isPassword && 'pr-12',
                            className
                        )}
                        {...props}
                    />

                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    )}
                </div>

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

Input.displayName = 'Input'

export default Input
