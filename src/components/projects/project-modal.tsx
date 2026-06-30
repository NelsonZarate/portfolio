"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  demoUrl: string;
}

export function ProjectModal({ isOpen, onClose, title, demoUrl }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Focus trap: keep focus within dialog
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-5xl h-[80vh] sm:h-[85vh] rounded-xl overflow-hidden border border-border bg-card shadow-2xl flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Browser bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-muted border-b border-border">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <span id="project-modal-title" className="ml-3 text-xs text-muted-foreground truncate max-w-[200px] sm:max-w-none">{title}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  render={<a href={demoUrl} target="_blank" rel="noopener noreferrer" />}
                  nativeButton={false}
                  variant="ghost"
                  size="sm"
                  className="text-xs gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open</span>
                </Button>
                <Button
                  ref={closeRef}
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  aria-label="Close demo"
                  className="h-7 w-7"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {/* Iframe */}
            <div className="flex-1 bg-white">
              <iframe
                src={demoUrl}
                title={`Live demo of ${title}`}
                className="w-full h-full border-0"
                allow="fullscreen"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
