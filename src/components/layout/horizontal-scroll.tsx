"use client";

import { useRef, useEffect, useState, type ReactNode, Children } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function HorizontalScroll({ children, sectionIds }: { children: ReactNode; sectionIds?: string[] }) {
  const [current, setCurrent] = useState(0);
  const isScrolling = useRef(false);
  const items = Children.toArray(children);
  const total = items.length;

  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      if (isScrolling.current) return;

      if (e.deltaY > 30 && current < total - 1) {
        isScrolling.current = true;
        setCurrent((c) => c + 1);
        setTimeout(() => { isScrolling.current = false; }, 800);
      } else if (e.deltaY < -30 && current > 0) {
        isScrolling.current = true;
        setCurrent((c) => c - 1);
        setTimeout(() => { isScrolling.current = false; }, 800);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (isScrolling.current) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        if (current < total - 1) {
          isScrolling.current = true;
          setCurrent((c) => c + 1);
          setTimeout(() => { isScrolling.current = false; }, 800);
        }
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        if (current > 0) {
          isScrolling.current = true;
          setCurrent((c) => c - 1);
          setTimeout(() => { isScrolling.current = false; }, 800);
        }
      }
    }

    function handleNav(e: Event) {
      const id = (e as CustomEvent).detail;
      if (!sectionIds) return;
      const idx = sectionIds.indexOf(id);
      if (idx !== -1) setCurrent(idx);
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("navigate-section", handleNav);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("navigate-section", handleNav);
    };
  }, [current, total, sectionIds]);

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {items[current]}
        </motion.div>
      </AnimatePresence>

      {/* Section indicators */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-primary scale-125" : "bg-muted-foreground/40"
            }`}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
