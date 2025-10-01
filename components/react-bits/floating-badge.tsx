"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FloatingBadgeProps {
  children: ReactNode;
  className?: string;
  color?: string;
  delay?: number;
}

export function FloatingBadge({ children, className, color, delay = 0 }: FloatingBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.1, y: -2 }}
      className={cn(
        "inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl",
        "border border-border bg-card/80 backdrop-blur-sm",
        "hover:border-primary/50 hover:shadow-lg transition-all cursor-default",
        className
      )}
      style={color ? {
        backgroundColor: `${color}15`,
        borderColor: `${color}40`,
        color: color
      } : {}}
    >
      {children}
    </motion.span>
  );
}
