import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const AppLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const desktop = window.innerWidth >= 1024;
            setIsDesktop(desktop);
            if (desktop) setSidebarOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const sidebarWidth = collapsed ? 72 : 260;

    return (
        <div className="min-h-screen gradient-mesh">
            {/* Mobile top bar */}
            {!isDesktop && (
                <div className="fixed top-0 left-0 right-0 z-50 bg-obsidian/80 backdrop-blur-xl border-b border-surface-3 px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="tap-target flex items-center justify-center text-muted hover:text-electric-cyan transition-colors"
                        aria-label="Abrir menú"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-bold gradient-text-cyan">C.O.N.T.R.O.L.</span>
                    <div className="w-5" />
                </div>
            )}

            {/* Mobile backdrop */}
            <AnimatePresence>
                {!isDesktop && sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-obsidian/70 backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <AnimatePresence>
                {(isDesktop || sidebarOpen) && (
                    <motion.aside
                        initial={!isDesktop ? { x: -280 } : false}
                        animate={{ x: 0 }}
                        exit={{ x: -280 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 left-0 bottom-0 z-50"
                        style={{ width: isDesktop ? sidebarWidth : 280 }}
                    >
                        <Sidebar
                            collapsed={isDesktop && collapsed}
                            onToggleCollapse={() => setCollapsed(!collapsed)}
                            onClose={() => setSidebarOpen(false)}
                            isMobile={!isDesktop}
                        />
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main content */}
            <main
                className="min-h-screen transition-all duration-300"
                style={{ marginLeft: isDesktop ? sidebarWidth : 0, paddingTop: isDesktop ? 0 : 56 }}
            >
                <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
