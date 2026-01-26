'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    Receipt,
    ClipboardList,
    Building2
} from 'lucide-react';

interface NavItem {
    name: string;
    href: string;
    icon: React.ReactNode;
}

const navItems: NavItem[] = [
    {
        name: 'Dashboard',
        href: '/admindashboard',
        icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
        name: 'Quotations',
        href: '/quotationList',
        icon: <FileText className="w-5 h-5" />
    },
    {
        name: 'Invoices',
        href: '/invoiceList',
        icon: <Receipt className="w-5 h-5" />
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white z-40 flex flex-col">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <Link href="/admindashboard" className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-semibold">FOURPALS</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6">
                <div className="px-4 mb-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Main Menu
                    </p>
                </div>
                <ul className="space-y-1 px-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`
                    flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium
                    transition-colors duration-150
                    ${isActive
                                            ? 'bg-primary-600 text-white'
                                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                        }
                  `}
                                >
                                    {item.icon}
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800">
                <div className="px-4 py-3 bg-slate-800/50 rounded-lg">
                    <p className="text-xs text-slate-400">
                        FOURPALS Ventures Pvt Ltd
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                        Admin Portal v1.0
                    </p>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
