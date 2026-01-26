'use client';

import React from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

interface Column<T> {
    key: keyof T | string;
    header: string;
    sortable?: boolean;
    render?: (item: T) => React.ReactNode;
    className?: string;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    sortColumn?: string;
    sortDirection?: 'asc' | 'desc';
    onSort?: (column: string) => void;
    emptyMessage?: string;
    isLoading?: boolean;
    rowKey: keyof T;
}

export function Table<T extends Record<string, unknown>>({
    data,
    columns,
    sortColumn,
    sortDirection,
    onSort,
    emptyMessage = 'No data found.',
    isLoading = false,
    rowKey,
}: TableProps<T>) {
    const renderSortIcon = (column: Column<T>) => {
        if (!column.sortable) return null;

        const isActive = sortColumn === column.key;

        if (!isActive) {
            return <ChevronsUpDown className="w-4 h-4 text-slate-400" />;
        }

        return sortDirection === 'asc'
            ? <ChevronUp className="w-4 h-4 text-primary-600" />
            : <ChevronDown className="w-4 h-4 text-primary-600" />;
    };

    if (isLoading) {
        return (
            <div className="overflow-hidden bg-white rounded-xl border border-slate-200 shadow-card">
                <div className="animate-pulse">
                    <div className="h-12 bg-slate-100" />
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-16 border-t border-slate-100 flex items-center px-6 gap-4">
                            <div className="h-4 bg-slate-200 rounded w-1/4" />
                            <div className="h-4 bg-slate-200 rounded w-1/4" />
                            <div className="h-4 bg-slate-200 rounded w-1/4" />
                            <div className="h-4 bg-slate-200 rounded w-1/4" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden bg-white rounded-xl border border-slate-200 shadow-card">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={String(column.key)}
                                    onClick={() => column.sortable && onSort?.(String(column.key))}
                                    className={`
                    px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider
                    ${column.sortable ? 'cursor-pointer select-none hover:bg-slate-100 transition-colors duration-150' : ''}
                    ${column.className || ''}
                  `}
                                >
                                    <div className="flex items-center gap-2">
                                        <span>{column.header}</span>
                                        {renderSortIcon(column)}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.length > 0 ? (
                            data.map((item) => (
                                <tr
                                    key={String(item[rowKey])}
                                    className="transition-colors duration-150 hover:bg-slate-50"
                                >
                                    {columns.map((column) => (
                                        <td
                                            key={String(column.key)}
                                            className={`px-6 py-4 text-sm text-slate-700 whitespace-nowrap ${column.className || ''}`}
                                        >
                                            {column.render
                                                ? column.render(item)
                                                : String(item[column.key as keyof T] ?? '')}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-6 py-12 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center text-slate-500">
                                        <svg className="w-12 h-12 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-sm font-medium">{emptyMessage}</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onSearch?: (value: string) => void;
}

export function SearchInput({
    value,
    onChange,
    onSearch,
    placeholder = 'Search...',
    className = '',
    ...props
}: SearchInputProps) {
    return (
        <div className="relative">
            <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`
          w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 text-sm 
          placeholder:text-slate-400 transition-colors duration-150
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          ${className}
        `}
                {...props}
            />
        </div>
    );
}

export default Table;
