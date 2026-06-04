import { useEffect, useRef } from "react";

const THEME = {
  colors: [
    "rgba(255,210,150,",
    "rgba(240,180,100,",
    "rgba(255,240,200,",
  ],
};

const CONFIG = {
  count: 177,
  speed: 3,
  size: 3,
};

function rand(a, b) {
  return a + Math.random() * (b - a);
}

function createParticle(w, h, size, speed) {
  const colorBase = THEME.colors[Math.floor(Math.random() * THEME.colors.length)];
  const alpha = rand(0.08, 0.65);
  return {
    x: rand(0, w),
    y: rand(0, h),
    r: rand(0.5, size),
    vx: rand(-0.4, 0.4) * (speed / 3),
    vy: rand(-0.15, -0.55) * (speed / 3),
    drift: rand(-0.008, 0.008),
    twinkle: rand(0, Math.PI * 2),
    twinkleSpeed: rand(0.01, 0.04),
    color: colorBase,
    alpha,
    baseAlpha: alpha,
  };
}

export default function DustParticles({
  count = CONFIG.count,
  speed = CONFIG.speed,
  size = CONFIG.size,
  style = {},
  className = "",
}) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function init() {
      resize();
      particlesRef.current = Array.from({ length: count }, () =>
        createParticle(canvas.width, canvas.height, size, speed)
      );
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        p.twinkle += p.twinkleSpeed;
        const ta = p.baseAlpha * (0.55 + 0.45 * Math.sin(p.twinkle));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + ta.toFixed(3) + ")";
        ctx.fill();

        p.vx += p.drift;
        if (Math.abs(p.vx) > 0.6 * (speed / 3)) p.drift *= -1;
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -4) p.y = canvas.height + 4;
        if (p.x < -4) p.x = canvas.width + 4;
        if (p.x > canvas.width + 4) p.x = -4;
      }

      animRef.current = requestAnimationFrame(draw);
    }

    const observer = new ResizeObserver(() => {
      resize();
    });
    observer.observe(canvas);

    init();
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
    };
  }, [count, speed, size]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        background: "transparent",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}