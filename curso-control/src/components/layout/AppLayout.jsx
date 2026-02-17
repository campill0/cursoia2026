import React from 'react';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
    return (
        <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
            <Sidebar />
            <main className="flex-1 ml-64 h-full overflow-y-auto relative bg-slate-950 selection:bg-control-primary selection:text-white">
                <div className="max-w-5xl mx-auto px-8 py-12 pb-32 min-h-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
