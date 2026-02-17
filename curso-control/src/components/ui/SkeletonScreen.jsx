import React from 'react';
import { cn } from '../../lib/utils';

export const SkeletonBlock = ({ className, lines = 3 }) => (
    <div className={cn("space-y-3 animate-pulse", className)}>
        <div className="skeleton h-8 w-2/3" />
        {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="skeleton h-4" style={{ width: `${85 - i * 10}%` }} />
        ))}
    </div>
);

export const SkeletonBento = ({ cells = 4 }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
        {Array.from({ length: cells }).map((_, i) => (
            <div key={i} className="skeleton h-48 rounded-2xl" />
        ))}
    </div>
);

export const SkeletonPage = () => (
    <div className="space-y-8 p-2">
        <div className="skeleton h-12 w-1/2 rounded-xl" />
        <div className="skeleton h-6 w-3/4 rounded-lg" />
        <SkeletonBento cells={6} />
    </div>
);
