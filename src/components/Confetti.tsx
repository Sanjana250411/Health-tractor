import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  speedX: number;
  speedY: number;
  gravity: number;
}

const COLORS = [
  '#4CAF50', // Green
  '#2196F3', // Blue
  '#FFEB3B', // Yellow
  '#E91E63', // Pink
  '#9C27B0', // Purple
  '#FF9800', // Orange
  '#00BCD4', // Cyan
];

export default function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate initial burst of particles
    const initialParticles: Particle[] = Array.from({ length: 120 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 8;
      return {
        id: i,
        x: window.innerWidth / 2,
        y: window.innerHeight / 3, // burst from center top
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 10,
        rotation: Math.random() * 360,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed - 2, // slightly upward boost
        gravity: 0.15 + Math.random() * 0.1,
      };
    });

    setParticles(initialParticles);

    let animationFrameId: number;
    let lastTime = Date.now();

    const update = () => {
      const now = Date.now();
      const dt = (now - lastTime) / 16; // normalise around 60fps
      lastTime = now;

      setParticles((prev) =>
        prev
          .map((p) => {
            const nextX = p.x + p.speedX * dt;
            const nextY = p.y + p.speedY * dt;
            const nextSpeedY = p.speedY + p.gravity * dt;
            const nextRotation = p.rotation + p.speedX * 1.5 * dt;

            return {
              ...p,
              x: nextX,
              y: nextY,
              speedY: nextSpeedY,
              rotation: nextRotation,
            };
          })
          // Keep particles that are within the viewport bounds
          .filter((p) => p.y < window.innerHeight + 50 && p.x > -50 && p.x < window.innerWidth + 50)
      );

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size * 0.6, // rectangular confetti aspect
            backgroundColor: p.color,
            transform: `rotate(${p.rotation}deg)`,
            opacity: Math.max(0, 1 - p.y / (window.innerHeight + 20)), // gradual fade out near bottom
            borderRadius: '2px',
          }}
        />
      ))}
    </div>
  );
}
