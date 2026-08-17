'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerContainerProps {
  children: ReactNode;
  delayChildren?: number;
  staggerChildren?: number;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (custom: { delayChildren: number; staggerChildren: number }) => ({
    opacity: 1,
    transition: {
      delayChildren: custom.delayChildren,
      staggerChildren: custom.staggerChildren,
    },
  }),
};

export function StaggerContainer({ 
  children, 
  delayChildren = 0, 
  staggerChildren = 0.1,
  className = '' 
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      custom={{ delayChildren, staggerChildren }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Helper component for stagger items
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  },
};

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
