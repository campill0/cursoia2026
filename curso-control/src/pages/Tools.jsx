import React from 'react';
import { motion } from 'framer-motion';
import ControlWizard from '../components/ui/ControlWizard';

const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const Tools = () => (
    <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="space-y-6"
    >
        <ControlWizard />
    </motion.div>
);

export default Tools;
