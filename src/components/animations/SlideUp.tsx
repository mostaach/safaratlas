'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export function SlideUp({ children, delay = 0, duration = 0.6, yOffset = 30, className = '' }: SlideUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }} // Custom spring-like easing
      className={className}
    >
      {children}
    </motion.div>
  );
}
