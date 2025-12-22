'use client'

import { ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from './Button'

interface Column<T> {
    key: string
    label: string
    render?: (item: T) => ReactNode
    sortable?: boolean
}

interface TableProps<T> {
    data: T[]
    columns: Column<T>[]
    onRowClick?: (item: T) => void
    actions?: (item: T) => ReactNode
    isLoading?: boolean
    emptyMessage?: string
}

export default function Table<T extends Record<string, any>>({
    data,
    columns,
    onRowClick,
    actions,
    isLoading,
    emptyMessage = 'No data available'
}: TableProps<T>) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
        )
    }

    if (data.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                {emptyMessage}
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                            >
                                {column.label}
                            </th>
                        ))}
                        {actions && (
                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            onClick={() => onRowClick?.(item)}
                            className={onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors' : ''}
                        >
                            {columns.map((column) => (
                                <td key={column.key} className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                                    {column.render ? column.render(item) : item[column.key]}
                                </td>
                            ))}
                            {actions && (
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {actions(item)}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-800">
            <div className="text-sm text-gray-700 dark:text-gray-300">
                Page <span className="font-medium">{currentPage}</span> of{' '}
                <span className="font-medium">{totalPages}</span>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
