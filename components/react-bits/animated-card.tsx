"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  gradient?: boolean;
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
  hover = true,
  gradient = false
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -8, transition: { duration: 0.2 } } : {}}
      className={cn("group relative", className)}
    >
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      <div className="relative h-full rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-xl">
        {children}
      </div>
    </motion.div>
  );
}
