import React, { useEffect, useRef } from "react";

const TRAIL_LEN = 25;

export default function Cursor() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const trail = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // initialize trail
    trail.current = Array.from({ length: TRAIL_LEN }, () => ({
      x: 0,
      y: 0,
    }));

    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", move);

    const lerp = (a, b, n) => a + (b - a) * n;

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail.current[0].x = lerp(trail.current[0].x, mouse.current.x, 0.35);
      trail.current[0].y = lerp(trail.current[0].y, mouse.current.y, 0.35);

      for (let i = 1; i < TRAIL_LEN; i++) {
        trail.current[i].x = lerp(
          trail.current[i].x,
          trail.current[i - 1].x,
          0.35
        );
        trail.current[i].y = lerp(
          trail.current[i].y,
          trail.current[i - 1].y,
          0.35
        );
      }

      trail.current.forEach((p, i) => {
        const t = 1 - i / TRAIL_LEN;
        const size = 4 * t;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(13,148,136,${t * 0.7})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(13,148,136,${t * 0.08})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 99999,
      }}
    />
  );
}

