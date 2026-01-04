import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function GlassCard({ 
  children, 
  className, 
  hover = true,
  delay = 0 
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={hover ? { y: -5, scale: 1.01 } : {}}
      className={cn(
  "bg-white/90 border border-gray-200 rounded-xl shadow-xl p-6",
  "hover:shadow-2xl transition-shadow duration-300",
  "dark:bg-white/10 dark:border-white/20 dark:backdrop-blur-xl",
  className
)}

    >
      {children}
    </motion.div>
  );
}
