'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Bell, User, ChevronRight } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    action?: React.ReactNode;
}

// Breadcrumb mapping
const breadcrumbLabels: Record<string, string> = {
    admindashboard: 'Dashboard',
    quotationList: 'Quotations',
    invoiceList: 'Invoices',
};

export function AdminLayout({
    children,
    title,
    description,
    action
}: AdminLayoutProps) {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(Boolean);

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />

            {/* Main Content Area */}
            <div className="ml-64">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm">
                        <Link
                            href="/admindashboard"
                            className="text-slate-500 hover:text-slate-700 transition-colors"
                        >
                            Home
                        </Link>
                        {pathSegments.map((segment, index) => (
                            <React.Fragment key={segment}>
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                                <span className={index === pathSegments.length - 1 ? 'text-slate-900 font-medium' : 'text-slate-500'}>
                                    {breadcrumbLabels[segment] || segment}
                                </span>
                            </React.Fragment>
                        ))}
                    </nav>

                    {/* Header Actions */}
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                            <Bell className="w-5 h-5" />
                        </button>
                        <div className="w-px h-6 bg-slate-200" />
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-primary-600" />
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-medium text-slate-900">Admin</p>
                            </div>
                        </div>
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    {/* Page Header */}
                    {(title || action) && (
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <div>
                                {title && (
                                    <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
                                )}
                                {description && (
                                    <p className="text-sm text-slate-500 mt-1">{description}</p>
                                )}
                            </div>
                            {action && (
                                <div className="flex-shrink-0">
                                    {action}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Main Content */}
                    {children}
                </main>

                {/* Footer */}
                <footer className="px-6 py-4 border-t border-slate-200 bg-white">
                    <p className="text-sm text-slate-500 text-center">
                        © {new Date().getFullYear()} Fourpals Ventures Pvt Ltd. All rights reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default AdminLayout;
