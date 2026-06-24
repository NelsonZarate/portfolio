"use client";

import { useEffect, useRef } from "react";

interface FloatingCard {
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
  depth: number; // 0-1 for parallax
  label: string;
  opacity: number;
}

interface Keyword {
  x: number;
  y: number;
  text: string;
  speed: number;
  depth: number;
  opacity: number;
  size: number;
}

function rand(min: number, max: number) { return min + Math.random() * (max - min); }

const CARD_LABELS = ["UI/UX", "React", "Next.js", "TypeScript", "Node.js", "Design", "API", "Deploy"];
const KEYWORDS = ["build", "create", "ship", "design", "iterate", "deploy", "optimize", "scale", "test", "refactor", "compose", "render"];

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cardsRef = useRef<FloatingCard[]>([]);
  const keywordsRef = useRef<Keyword[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (cardsRef.current.length === 0) init();
    }

    function init() {
      // Floating cards
      const cards: FloatingCard[] = [];
      for (let i = 0; i < 8; i++) {
        cards.push({
          x: rand(0.05, 0.9) * w,
          y: rand(0.05, 0.9) * h,
          w: rand(80, 140),
          h: rand(50, 90),
          speed: rand(0.08, 0.2),
          depth: rand(0.3, 1),
          label: CARD_LABELS[i % CARD_LABELS.length],
          opacity: rand(0.03, 0.08),
        });
      }
      cardsRef.current = cards;

      // Keywords
      const kws: Keyword[] = [];
      for (let i = 0; i < 14; i++) {
        kws.push({
          x: rand(0.05, 0.95) * w,
          y: rand(0.05, 0.95) * h,
          text: KEYWORDS[i % KEYWORDS.length],
          speed: rand(0.03, 0.12),
          depth: rand(0.2, 0.8),
          opacity: rand(0.04, 0.1),
          size: rand(11, 16),
        });
      }
      keywordsRef.current = kws;
    }

    // Grain overlay (static noise texture)
    let grainData: ImageData | null = null;
    function generateGrain() {
      const gw = Math.ceil(w / 2), gh = Math.ceil(h / 2);
      const img = ctx.createImageData(gw, gh);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255;
        img.data[i] = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = 12; // very subtle
      }
      grainData = img;
    }

    function drawBackground(now: number) {
      // Solid dark base
      ctx.fillStyle = "#08080f";
      ctx.fillRect(0, 0, w, h);

      // Gradient blobs (soft, slow-moving)
      const blobs = [
        { x: w * 0.2 + Math.sin(now * 0.0002) * 60, y: h * 0.3 + Math.cos(now * 0.00015) * 40, r: w * 0.3, color: "rgba(60, 20, 120, 0.12)" },
        { x: w * 0.75 + Math.cos(now * 0.00018) * 50, y: h * 0.6 + Math.sin(now * 0.00022) * 35, r: w * 0.25, color: "rgba(20, 60, 100, 0.1)" },
        { x: w * 0.5 + Math.sin(now * 0.00025) * 40, y: h * 0.8, r: w * 0.35, color: "rgba(40, 10, 80, 0.08)" },
      ];

      for (const blob of blobs) {
        const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
        grad.addColorStop(0, blob.color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }
    }

    function drawGrid() {
      const spacing = 60;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 0.5;

      for (let x = 0; x < w; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }

    function drawCards(now: number) {
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const cards = cardsRef.current;

      for (const card of cards) {
        // Float motion
        card.y += Math.sin(now * 0.001 * card.speed) * 0.15;
        card.x += Math.cos(now * 0.0008 * card.speed) * 0.1;

        // Parallax offset from mouse
        const px = (mx - w / 2) * card.depth * 0.015;
        const py = (my - h / 2) * card.depth * 0.015;

        const dx = card.x + px;
        const dy = card.y + py;

        // Card border
        ctx.strokeStyle = `rgba(255, 255, 255, ${card.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        const radius = 8;
        ctx.roundRect(dx, dy, card.w, card.h, radius);
        ctx.stroke();

        // Card fill (very subtle)
        ctx.fillStyle = `rgba(255, 255, 255, ${card.opacity * 0.3})`;
        ctx.fill();

        // Label
        ctx.fillStyle = `rgba(255, 255, 255, ${card.opacity * 1.8})`;
        ctx.font = `500 11px system-ui, sans-serif`;
        ctx.fillText(card.label, dx + 12, dy + card.h / 2 + 4);

        // Fake content lines
        const lineY = dy + 14;
        ctx.fillStyle = `rgba(255, 255, 255, ${card.opacity * 0.5})`;
        ctx.fillRect(dx + 12, lineY, card.w * 0.6, 2);
        ctx.fillRect(dx + 12, lineY + 8, card.w * 0.4, 2);
      }
    }

    function drawKeywords(now: number) {
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const kws = keywordsRef.current;

      for (const kw of kws) {
        kw.y += Math.sin(now * 0.0006 * kw.speed + kw.x) * 0.08;
        kw.x += Math.cos(now * 0.0005 * kw.speed + kw.y) * 0.06;

        const px = (mx - w / 2) * kw.depth * 0.01;
        const py = (my - h / 2) * kw.depth * 0.01;

        ctx.fillStyle = `rgba(255, 255, 255, ${kw.opacity})`;
        ctx.font = `300 ${kw.size}px system-ui, sans-serif`;
        ctx.fillText(kw.text, kw.x + px, kw.y + py);
      }
    }

    function drawGrain() {
      if (!grainData) return;
      // Draw scaled grain
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = grainData.width;
      tempCanvas.height = grainData.height;
      const tempCtx = tempCanvas.getContext("2d")!;
      tempCtx.putImageData(grainData, 0, 0);
      ctx.drawImage(tempCanvas, 0, 0, w, h);
    }

    function animate(now: number) {
      timeRef.current = now;
      drawBackground(now);
      drawGrid();
      drawCards(now);
      drawKeywords(now);
      drawGrain();

      animRef.current = requestAnimationFrame(animate);
    }

    function handleMouse(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    resize();
    generateGrain();
    window.addEventListener("resize", () => { resize(); generateGrain(); });
    window.addEventListener("mousemove", handleMouse);
    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
