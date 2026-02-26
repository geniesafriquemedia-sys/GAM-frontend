"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ── Variantes de base ─────────────────────────────────────────────────────────

const VARIANTS = {
  "fade-up":    { initial: { opacity: 0, y: 30 },              whileInView: { opacity: 1, y: 0 } },
  "fade-down":  { initial: { opacity: 0, y: -30 },             whileInView: { opacity: 1, y: 0 } },
  "fade-left":  { initial: { opacity: 0, x: 30 },              whileInView: { opacity: 1, x: 0 } },
  "fade-right": { initial: { opacity: 0, x: -30 },             whileInView: { opacity: 1, x: 0 } },
  "scale":      { initial: { opacity: 0, scale: 0.9 },         whileInView: { opacity: 1, scale: 1 } },
  "blur":       { initial: { opacity: 0, filter: "blur(10px)" }, whileInView: { opacity: 1, filter: "blur(0px)" } },
} as const;

// ── AnimatedText ──────────────────────────────────────────────────────────────

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof VARIANTS;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function AnimatedText({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 0.5,
  once = true,
}: AnimatedTextProps) {
  const { initial, whileInView } = VARIANTS[variant];

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── AnimatedWord ──────────────────────────────────────────────────────────────

interface AnimatedWordProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function AnimatedWord({
  text,
  className,
  as: Component = "h1",
  delay = 0,
  staggerDelay = 0.05,
  once = true,
}: AnimatedWordProps) {
  const words = text.split(" ");

  return (
    <Component className={cn("overflow-hidden", className)}>
      {words.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once, margin: "-50px" }}
          transition={{
            duration: 0.5,
            delay: delay + idx * staggerDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
}

// ── AnimatedLetter ────────────────────────────────────────────────────────────

interface AnimatedLetterProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  delay?: number;
  staggerDelay?: number;
}

export function AnimatedLetter({
  text,
  className,
  as: Component = "h1",
  delay = 0,
  staggerDelay = 0.03,
}: AnimatedLetterProps) {
  const letters = text.split("");

  return (
    <Component className={cn("overflow-hidden", className)}>
      {letters.map((letter, idx) => (
        <motion.span
          key={`${letter}-${idx}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.4,
            delay: delay + idx * staggerDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </Component>
  );
}

// ── AnimatedLine ──────────────────────────────────────────────────────────────

interface AnimatedLineProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function AnimatedLine({
  children,
  className,
  delay = 0,
  duration = 0.6,
}: AnimatedLineProps) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ── StaggerContainer ──────────────────────────────────────────────────────────

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  once = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// ── itemVariants (pour les enfants de StaggerContainer) ───────────────────────

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};
