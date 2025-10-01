"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  gradient?: boolean;
}

export function AnimatedText({ children, className, delay = 0, gradient = false }: AnimatedTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={cn(
        gradient && "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
