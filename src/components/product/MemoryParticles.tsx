import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Memory } from '@/types/product';
import { cn } from '@/lib/utils';

interface MemoryParticlesProps {
  memories: Memory[];
  className?: string;
}

const getSentimentColor = (sentiment: Memory['sentiment']): string => {
  const colors: Record<Memory['sentiment'], string> = {
    'warm': 'text-primary',
    'nostalgic': 'text-sepia',
    'joyful': 'text-aged-gold',
    'bittersweet': 'text-memory-blue',
  };
  return colors[sentiment];
};

export const MemoryParticles: React.FC<MemoryParticlesProps> = ({ memories, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = particlesRef.current.filter(Boolean);

    // Set initial random positions
    particles.forEach((particle, index) => {
      if (!particle) return;

      const randomX = (Math.random() - 0.5) * 100;
      const randomY = Math.random() * 50;
      const randomRotation = (Math.random() - 0.5) * 10;

      gsap.set(particle, {
        x: randomX,
        y: randomY,
        rotation: randomRotation,
        opacity: 0.6 + Math.random() * 0.4,
      });

      // Floating animation
      gsap.to(particle, {
        y: randomY - 20 - Math.random() * 30,
        x: randomX + (Math.random() - 0.5) * 40,
        rotation: randomRotation + (Math.random() - 0.5) * 5,
        duration: 4 + Math.random() * 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 0.5,
      });
    });

    return () => {
      particles.forEach(particle => {
        if (particle) gsap.killTweensOf(particle);
      });
    };
  }, [memories]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative min-h-[300px] flex items-center justify-center py-16',
        className
      )}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 rounded-3xl" />

      {/* Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10">
        <h3 className="text-xl font-serif font-medium text-foreground/80">
          Memories Attached
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Hover to feel the echoes
        </p>
      </div>

      {/* Memory particles */}
      <div className="relative w-full max-w-2xl h-48">
        {memories.map((memory, index) => (
          <div
            key={memory.id}
            ref={el => particlesRef.current[index] = el}
            className={cn(
              'absolute cursor-pointer group',
              'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
            )}
            style={{
              left: `${20 + (index * 30) % 60}%`,
              top: `${30 + (index * 20) % 40}%`,
            }}
          >
            {/* Particle bubble */}
            <div className={cn(
              'px-4 py-2 rounded-full backdrop-blur-sm',
              'bg-card/60 border border-border/50 shadow-soft',
              'transition-all duration-500 ease-out',
              'group-hover:scale-110 group-hover:shadow-warm group-hover:bg-card/90',
            )}>
              <p className={cn(
                'text-sm font-body italic whitespace-nowrap',
                'opacity-70 group-hover:opacity-100 transition-opacity duration-300',
                getSentimentColor(memory.sentiment)
              )}>
                "{memory.text}"
              </p>
            </div>

            {/* Connecting line on hover */}
            <div className="absolute top-1/2 left-1/2 w-px h-8 bg-gradient-to-b from-primary/50 to-transparent -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-3 text-muted-foreground/50">
          <span className="text-2xl">✧</span>
          <span className="text-lg">✦</span>
          <span className="text-2xl">✧</span>
        </div>
      </div>
    </div>
  );
};