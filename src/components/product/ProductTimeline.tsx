import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TimelineEvent } from '@/types/product';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface ProductTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const getEventIcon = (type: TimelineEvent['type']): string => {
  const icons: Record<TimelineEvent['type'], string> = {
    'birth': '✦',
    'first-owner': '♡',
    'usage': '◈',
    'milestone': '★',
    'restoration': '↻',
    'care': '❋',
    'transition': '→',
    'current': '◉',
  };
  return icons[type];
};

const getEventColor = (type: TimelineEvent['type']): string => {
  const colors: Record<TimelineEvent['type'], string> = {
    'birth': 'bg-vintage-green',
    'first-owner': 'bg-soft-rust',
    'usage': 'bg-primary',
    'milestone': 'bg-aged-gold',
    'restoration': 'bg-memory-blue',
    'care': 'bg-vintage-green',
    'transition': 'bg-warm-brown',
    'current': 'bg-primary',
  };
  return colors[type];
};

export const ProductTimeline: React.FC<ProductTimelineProps> = ({ events, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    // Animate the timeline line growing
    gsap.set(lineRef.current, { scaleY: 0, transformOrigin: 'top' });

    const lineAnimation = gsap.to(lineRef.current, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 0.8,
      },
    });

    // Animate each event
    eventsRef.current.forEach((event, index) => {
      if (!event) return;

      gsap.set(event, { 
        opacity: 0, 
        x: index % 2 === 0 ? -30 : 30,
        scale: 0.9 
      });

      gsap.to(event, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: event,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => {
      lineAnimation.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [events]);

  return (
    <div ref={containerRef} className={cn('relative py-12', className)}>
      {/* Timeline line */}
      <div 
        ref={lineRef}
        className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-primary/20 via-primary to-primary/20"
      />

      {/* Events */}
      <div className="relative space-y-16">
        {events.map((event, index) => (
          <div
            key={event.id}
            ref={el => eventsRef.current[index] = el}
            className={cn(
              'relative grid grid-cols-[1fr_auto_1fr] gap-8 items-center',
              index % 2 === 0 ? 'text-right' : ''
            )}
          >
            {/* Left content */}
            <div className={cn(
              'transition-all duration-500',
              index % 2 === 0 ? 'pr-4' : 'order-3 pl-4 text-left'
            )}>
              <div className="space-y-2">
                <span className="text-sm font-body text-muted-foreground">
                  {event.date}
                </span>
                <h4 className="text-xl font-serif font-medium text-foreground">
                  {event.title}
                </h4>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {event.description}
                </p>
                {event.location && (
                  <p className="text-sm text-primary/70 font-body italic">
                    📍 {event.location}
                  </p>
                )}
                {event.memory && (
                  <p className="text-sm text-warm-brown italic font-body mt-3 opacity-80">
                    "{event.memory}"
                  </p>
                )}
              </div>
            </div>

            {/* Center icon */}
            <div className={cn(
              'relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-xl',
              'border-4 border-background shadow-warm transition-transform duration-300 hover:scale-110',
              getEventColor(event.type)
            )}>
              <span className="text-primary-foreground filter drop-shadow-sm">
                {getEventIcon(event.type)}
              </span>
            </div>

            {/* Right spacer */}
            <div className={cn(index % 2 === 0 ? 'order-3' : '')} />
          </div>
        ))}
      </div>
    </div>
  );
};