import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DeliveryTracking, DeliveryStatus } from '@/types/product';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface DeliveryJourneyProps {
  tracking: DeliveryTracking;
  className?: string;
}

const stages: { status: DeliveryStatus; label: string; icon: string; description: string }[] = [
  { 
    status: 'farewell', 
    label: 'Farewell', 
    icon: '🌅',
    description: 'Saying goodbye to its previous home'
  },
  { 
    status: 'transit', 
    label: 'In Transit', 
    icon: '✈️',
    description: 'Traveling to find you'
  },
  { 
    status: 'near-arrival', 
    label: 'Near Arrival', 
    icon: '🏠',
    description: 'Almost at its new home'
  },
  { 
    status: 'new-beginning', 
    label: 'New Beginning', 
    icon: '✨',
    description: 'Ready to start a new chapter'
  },
];

const getStageIndex = (status: DeliveryStatus): number => {
  return stages.findIndex(s => s.status === status);
};

export const DeliveryJourney: React.FC<DeliveryJourneyProps> = ({ tracking, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const currentStageIndex = getStageIndex(tracking.status);

  useEffect(() => {
    if (!containerRef.current || !pathRef.current) return;

    const path = pathRef.current;
    const pathLength = path.getTotalLength();

    // Set up the path for animation
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Animate path drawing
    gsap.to(path, {
      strokeDashoffset: pathLength * (1 - tracking.journeyProgress / 100),
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    // Animate stages
    stageRefs.current.forEach((stage, index) => {
      if (!stage) return;

      const isCompleted = index <= currentStageIndex;
      const isCurrent = index === currentStageIndex;

      gsap.fromTo(stage,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.2 + 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      if (isCurrent) {
        // Pulse animation for current stage
        gsap.to(stage.querySelector('.stage-icon'), {
          scale: 1.1,
          duration: 1,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [tracking.journeyProgress, currentStageIndex]);

  return (
    <div ref={containerRef} className={cn('py-12', className)}>
      <div className="text-center mb-10">
        <h3 className="text-2xl font-serif font-semibold text-foreground">
          The Journey Home
        </h3>
        <p className="text-muted-foreground font-body mt-2">
          Follow {tracking.product.name} as it finds its way to you
        </p>
      </div>

      {/* Journey visualization */}
      <div className="relative max-w-3xl mx-auto">
        {/* SVG Path */}
        <svg 
          className="absolute inset-0 w-full h-32 pointer-events-none"
          viewBox="0 0 800 100"
          preserveAspectRatio="none"
        >
          {/* Background path */}
          <path
            d="M 50 50 Q 200 20 400 50 Q 600 80 750 50"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Animated progress path */}
          <path
            ref={pathRef}
            d="M 50 50 Q 200 20 400 50 Q 600 80 750 50"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* Stage markers */}
        <div className="relative flex justify-between items-start pt-8 pb-16">
          {stages.map((stage, index) => {
            const isCompleted = index < currentStageIndex;
            const isCurrent = index === currentStageIndex;

            return (
              <div
                key={stage.status}
                ref={el => stageRefs.current[index] = el}
                className="flex flex-col items-center text-center w-1/4"
              >
                {/* Icon */}
                <div
                  className={cn(
                    'stage-icon w-16 h-16 rounded-full flex items-center justify-center text-2xl',
                    'border-4 transition-all duration-500',
                    isCompleted || isCurrent
                      ? 'bg-primary border-primary shadow-warm'
                      : 'bg-muted border-border',
                    isCurrent && 'ring-4 ring-primary/30'
                  )}
                >
                  <span className={cn(
                    isCompleted || isCurrent ? '' : 'grayscale opacity-50'
                  )}>
                    {stage.icon}
                  </span>
                </div>

                {/* Label */}
                <h4 className={cn(
                  'mt-4 font-serif font-medium',
                  isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                )}>
                  {stage.label}
                </h4>

                {/* Description */}
                <p className="mt-1 text-xs text-muted-foreground font-body max-w-[120px]">
                  {stage.description}
                </p>

                {/* Current indicator */}
                {isCurrent && (
                  <div className="mt-3 px-3 py-1 bg-primary/10 rounded-full">
                    <span className="text-xs font-body text-primary">Now here</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Current status details */}
      <div className="mt-8 max-w-xl mx-auto bg-card rounded-xl p-6 border border-border/50 shadow-soft">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-xl">
              {stages[currentStageIndex]?.icon}
            </span>
          </div>
          <div>
            <h4 className="font-serif font-medium text-foreground">
              {tracking.statusHistory[tracking.statusHistory.length - 1]?.message}
            </h4>
            <p className="mt-1 text-sm text-muted-foreground font-body">
              Currently in: {tracking.currentLocation}
            </p>
            <p className="mt-2 text-sm text-primary font-body">
              Estimated arrival: {new Date(tracking.estimatedArrival).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Journey Progress</span>
            <span>{tracking.journeyProgress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-primary to-aged-gold rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${tracking.journeyProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Status history */}
      <div className="mt-8 max-w-xl mx-auto">
        <h4 className="text-sm font-body text-muted-foreground mb-4 text-center">
          Journey Updates
        </h4>
        <div className="space-y-3">
          {tracking.statusHistory.map((event, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 text-sm"
            >
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-foreground font-body">{event.message}</p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};