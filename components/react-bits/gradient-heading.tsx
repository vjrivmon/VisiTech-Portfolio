"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientHeadingProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  delay?: number;
}

export function GradientHeading({
  children,
  className,
  as: Component = "h2",
  delay = 0
}: GradientHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <Component className={cn(
        "text-4xl sm:text-5xl font-bold",
        "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent",
        "animate-gradient",
        className
      )}>
        {children}
      </Component>
    </motion.div>
  );
}
