"use client";

import { AnimatedWord } from "@/components/AnimatedText";
import { ReactNode } from "react";

interface PageTitleProps {
  children: string;
  className?: string;
  subtitle?: ReactNode;
}

export function PageTitle({ children, className, subtitle }: PageTitleProps) {
  return (
    <div className="space-y-4">
      <AnimatedWord
        text={children}
        as="h1"
        className={className || "text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter"}
        staggerDelay={0.05}
      />
      {subtitle && (
        <div className="text-muted-foreground">
          {subtitle}
        </div>
      )}
    </div>
  );
}
