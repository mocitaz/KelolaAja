'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
    children: ReactNode
    className?: string
    hover?: boolean
    gradient?: boolean
}

export default function Card({ children, className, hover = false, gradient = false }: CardProps) {
    return (
        <div
            className={cn(
                'bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-200',
                hover && 'hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-0.5',
                gradient && 'bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950/20',
                className
            )}
        >
            {children}
        </div>
    )
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className={cn('px-6 py-4 border-b border-gray-200 dark:border-gray-800', className)}>
            {children}
        </div>
    )
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className={cn('px-6 py-4', className)}>
            {children}
        </div>
    )
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className={cn('px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl', className)}>
            {children}
        </div>
    )
}
