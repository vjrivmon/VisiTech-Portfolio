"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
}

export function AnimatedButton({
  children,
  className,
  variant = "primary",
  onClick
}: AnimatedButtonProps) {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-xl transition-all";

  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl",
    secondary: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl",
    outline: "border-2 border-border bg-background/50 backdrop-blur-sm hover:bg-accent hover:border-accent"
  };

  const Component = motion.button;

  return (
    <Component
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(baseStyles, variants[variant], className)}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}
