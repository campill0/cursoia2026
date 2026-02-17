import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const BentoGrid = ({ children, className }) => (
    <div className={cn(
        "bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
    )}>
        {children}
    </div>
);

export const BentoCell = ({
    children,
    className,
    span = 1,
    rowSpan = 1,
    glowColor = 'cyan',
    onClick,
    as: Component = 'div'
}) => {
    const glowMap = {
        cyan: 'hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] hover:border-electric-cyan/30',
        magenta: 'hover:shadow-[0_0_30px_rgba(224,64,251,0.1)] hover:border-neon-magenta/30',
        emerald: 'hover:shadow-[0_0_30px_rgba(52,211,153,0.1)] hover:border-emerald-glow/30',
        amber: 'hover:shadow-[0_0_30px_rgba(251,191,36,0.1)] hover:border-amber-glow/30',
    };

    return (
        <motion.div
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={cn(
                "relative bg-deep-slate border border-surface-3 rounded-2xl p-6 overflow-hidden transition-all duration-300 cursor-pointer group",
                glowMap[glowColor],
                span === 2 && "md:col-span-2 span-2",
                rowSpan === 2 && "md:row-span-2",
                className
            )}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
};
