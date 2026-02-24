"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  variant?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "blur";
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function AnimatedText({
  children,
  className,
  as: Component = "div",
  variant = "fade-up",
  delay = 0,
  duration = 0.5,
  once = true,
}: AnimatedTextProps) {
  const ref = useRef(null);
  const pathname = usePathname();
  const [key, setKey] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // Éviter les erreurs d'hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Réinitialiser l'animation à chaque changement de page
  useEffect(() => {
    if (mounted) {
      setKey(prev => prev + 1);
    }
  }, [pathname, mounted]);
  
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  
  // Rendu initial sans animation pour éviter hydration mismatch
  if (!mounted) {
    return <Component className={className}>{children}</Component>;
  }

  const variants = {
    "fade-up": {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
    },
    "fade-down": {
      initial: { opacity: 0, y: -30 },
      animate: { opacity: 1, y: 0 },
    },
    "fade-left": {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
    },
    "fade-right": {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
    },
    blur: {
      initial: { opacity: 0, filter: "blur(10px)" },
      animate: { opacity: 1, filter: "blur(0px)" },
    },
  };

  const currentVariant = variants[variant];

  return (
    <motion.div
      key={key}
      ref={ref}
      initial={currentVariant.initial}
      animate={isInView ? currentVariant.animate : currentVariant.initial}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedWordProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  delay?: number;
  staggerDelay?: number;
}

export function AnimatedWord({
  text,
  className,
  as: Component = "h1",
  delay = 0,
  staggerDelay = 0.05,
}: AnimatedWordProps) {
  const ref = useRef(null);
  const pathname = usePathname();
  const [key, setKey] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // Éviter les erreurs d'hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Réinitialiser l'animation à chaque changement de page
  useEffect(() => {
    if (mounted) {
      setKey(prev => prev + 1);
    }
  }, [pathname, mounted]);
  
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  
  const words = text.split(" ");
  
  // Rendu initial sans animation pour éviter hydration mismatch
  if (!mounted) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component ref={ref} className={cn("overflow-hidden", className)} key={key}>
      {words.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}-${key}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const letters = text.split("");

  return (
    <Component ref={ref} className={cn("overflow-hidden", className)}>
      {letters.map((letter, idx) => (
        <motion.span
          key={`${letter}-${idx}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: "100%" }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </div>
  );
}

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
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

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
