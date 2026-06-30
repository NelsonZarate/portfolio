"use client";

import { useRef, useEffect, useState, type ReactNode, Children } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function HorizontalScroll({ children, sectionIds }: { children: ReactNode; sectionIds?: string[] }) {
  const [current, setCurrent] = useState(0);
  const isScrolling = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const items = Children.toArray(children);
  const total = items.length;

  // Notify navbar of section changes
  useEffect(() => {
    if (sectionIds && sectionIds[current]) {
      window.dispatchEvent(new CustomEvent("section-changed", { detail: sectionIds[current] }));
    }
  }, [current, sectionIds]);

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

    function handleTouchStart(e: TouchEvent) {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    }

    function handleTouchEnd(e: TouchEvent) {
      if (!touchStartRef.current || isScrolling.current) return;
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      touchStartRef.current = null;

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      const minSwipe = 50;

      // Horizontal swipe: left = next, right = prev
      if (absX > absY && absX > minSwipe) {
        if (deltaX < 0 && current < total - 1) {
          isScrolling.current = true;
          setCurrent((c) => c + 1);
          setTimeout(() => { isScrolling.current = false; }, 800);
        } else if (deltaX > 0 && current > 0) {
          isScrolling.current = true;
          setCurrent((c) => c - 1);
          setTimeout(() => { isScrolling.current = false; }, 800);
        }
      } else if (absY > absX && absY > minSwipe) {
        // Vertical swipe: up = next, down = prev
        if (deltaY < 0 && current < total - 1) {
          isScrolling.current = true;
          setCurrent((c) => c + 1);
          setTimeout(() => { isScrolling.current = false; }, 800);
        } else if (deltaY > 0 && current > 0) {
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
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("navigate-section", handleNav);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
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
          className="absolute inset-0 flex items-center justify-center overflow-y-auto"
        >
          {items[current]}
        </motion.div>
      </AnimatePresence>

      {/* Section indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-50">
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
