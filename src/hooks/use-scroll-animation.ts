"use client";

import { useEffect, useState, RefObject } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  once?: boolean;
}

/**
 * Hook pour déclencher des animations au scroll
 * @param ref - Référence de l'élément à observer
 * @param options - Options de l'animation
 * @returns boolean indiquant si l'élément est visible
 */
export function useScrollAnimation(
  ref: RefObject<HTMLElement>,
  options: UseScrollAnimationOptions = {}
) {
  const { threshold = 0.1, once = true } = options;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, threshold, once]);

  return isVisible;
}
