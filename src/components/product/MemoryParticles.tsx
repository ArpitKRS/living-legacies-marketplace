import React, { useEffect, useRef, useState } from 'react';
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

const getSentimentBg = (sentiment: Memory['sentiment']): string => {
  const colors: Record<Memory['sentiment'], string> = {
    'warm': 'from-primary/20 to-primary/5',
    'nostalgic': 'from-sepia/20 to-sepia/5',
    'joyful': 'from-aged-gold/20 to-aged-gold/5',
    'bittersweet': 'from-memory-blue/20 to-memory-blue/5',
  };
  return colors[sentiment];
};

export const MemoryParticles: React.FC<MemoryParticlesProps> = ({ memories, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMemory, setActiveMemory] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.memory-card');
    
    // Subtle floating animation for each card
    cards.forEach((card, index) => {
      gsap.to(card, {
        y: -5 + Math.random() * 10,
        duration: 3 + Math.random() * 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 0.3,
      });
    });

    return () => {
      cards.forEach(card => gsap.killTweensOf(card));
    };
  }, [memories]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative py-12',
        className
      )}
    >
      {/* Section header */}
      <div className="text-center mb-10">
        <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">
          Memories Attached
        </h3>
        <p className="text-muted-foreground font-body text-sm">
          Echoes of moments this piece has witnessed
        </p>
      </div>

      {/* Memory cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {memories.map((memory) => (
          <div
            key={memory.id}
            className="memory-card relative"
            onMouseEnter={() => setActiveMemory(memory.id)}
            onMouseLeave={() => setActiveMemory(null)}
          >
            <div className={cn(
              'relative p-5 rounded-xl border transition-all duration-300 cursor-pointer',
              'bg-gradient-to-br',
              getSentimentBg(memory.sentiment),
              activeMemory === memory.id
                ? 'border-primary/40 shadow-warm scale-[1.02]'
                : 'border-border/30 shadow-soft'
            )}>
              {/* Quote icon */}
              <span className="absolute top-3 left-4 text-2xl opacity-20 font-serif">"</span>
              
              {/* Memory text */}
              <p className={cn(
                'font-body italic text-sm leading-relaxed pl-4 pr-2',
                'transition-all duration-300',
                activeMemory === memory.id ? 'opacity-100' : 'opacity-80',
                getSentimentColor(memory.sentiment)
              )}>
                {memory.text}
              </p>

              {/* Sentiment indicator */}
              <div className={cn(
                'mt-3 flex items-center gap-2 pl-4',
                'transition-opacity duration-300',
                activeMemory === memory.id ? 'opacity-100' : 'opacity-50'
              )}>
                <span className="text-xs text-muted-foreground capitalize">
                  {memory.sentiment} memory
                </span>
              </div>

              {/* Decorative corner */}
              <span className="absolute bottom-2 right-3 text-lg opacity-10">✧</span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {memories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground/60 italic">
            No memories have been shared yet
          </p>
        </div>
      )}
    </div>
  );
};
