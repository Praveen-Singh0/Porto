"use client";
import { useEffect, useRef } from "react";

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  twinkle: number;
}

const SplashCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true })!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const pointer = { x: w / 2, y: h / 2 };
    const sparkles: Sparkle[] = [];
    
    const colors = [
      "#FFD700", // Gold
      "#FFF700", // Yellow
      "#FFE4B5", // Light gold
      "#FFFFE0", // Light yellow
      "#FFA500", // Orange
      "#FF69B4"  // Pink
    ];

    const createSparkle = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 1 + Math.random() * 3;
      
      sparkles.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 0,
        maxLife: 40 + Math.random() * 40,
        size: 2 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkle: Math.random() * Math.PI * 2
      });
    };

    const handleMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      
      // Create sparkles continuously
      for (let i = 0; i < 2; i++) {
        createSparkle(pointer.x, pointer.y);
      }
    };

    const handleClick = () => {
      // Burst effect on click
      for (let i = 0; i < 15; i++) {
        createSparkle(pointer.x, pointer.y);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);

    const drawStar = (
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number,
      rotation: number
    ) => {
      let rot = (Math.PI / 2) * 3 + rotation;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);

      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
        rot += step;
        ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
        rot += step;
      }

      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
    };

    const animate = () => {
      // Clear with transparency (important!)
      ctx.clearRect(0, 0, w, h);

      // Update and draw sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const sparkle = sparkles[i];

        // Physics
        sparkle.x += sparkle.vx;
        sparkle.y += sparkle.vy;
        sparkle.vy += 0.05; // Slight gravity
        sparkle.vx *= 0.98;
        sparkle.vy *= 0.98;
        sparkle.life++;
        sparkle.twinkle += 0.2;

        const lifePercent = sparkle.life / sparkle.maxLife;
        let alpha = 1;

        // Fade in and out
        if (lifePercent < 0.15) {
          alpha = lifePercent / 0.15;
        } else if (lifePercent > 0.85) {
          alpha = (1 - lifePercent) / 0.15;
        }

        // Twinkling effect
        const twinkleAlpha = (Math.sin(sparkle.twinkle) + 1) * 0.5;
        alpha *= 0.5 + twinkleAlpha * 0.5;

        if (sparkle.life < sparkle.maxLife && alpha > 0) {
          ctx.save();

          // Draw star shape
          ctx.translate(sparkle.x, sparkle.y);
          ctx.rotate(sparkle.twinkle * 0.5);

          // Outer glow
          const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, sparkle.size * 3);
          glowGradient.addColorStop(0, `${sparkle.color}${Math.round(alpha * 100).toString(16).padStart(2, '0')}`);
          glowGradient.addColorStop(0.5, `${sparkle.color}${Math.round(alpha * 50).toString(16).padStart(2, '0')}`);
          glowGradient.addColorStop(1, `${sparkle.color}00`);

          ctx.fillStyle = glowGradient;
          ctx.fillRect(-sparkle.size * 3, -sparkle.size * 3, sparkle.size * 6, sparkle.size * 6);

          // Star center
          drawStar(ctx, 0, 0, 4, sparkle.size, sparkle.size * 0.4, 0);
          ctx.fillStyle = `${sparkle.color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();

          // Bright center point
          ctx.beginPath();
          ctx.arc(0, 0, sparkle.size * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();

          ctx.restore();
        } else {
          sparkles.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[9999]"
      style={{ 
        background: "transparent",
      }}
    />
  );
};

export default SplashCursor;
