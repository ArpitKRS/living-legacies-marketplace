import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductMetrics as MetricsType } from '@/types/product';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface ProductMetricsProps {
  metrics: MetricsType;
  className?: string;
}

interface MetricRingProps {
  value: number;
  max: number;
  label: string;
  sublabel?: string;
  color: string;
  delay?: number;
}

const MetricRing: React.FC<MetricRingProps> = ({ 
  value, 
  max, 
  label, 
  sublabel,
  color,
  delay = 0 
}) => {
  const circleRef = useRef<SVGCircleElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);

  useEffect(() => {
    if (!circleRef.current || !valueRef.current || !containerRef.current) return;

    const circle = circleRef.current;
    const valueEl = valueRef.current;
    const offset = circumference - progress * circumference;

    gsap.set(circle, {
      strokeDasharray: circumference,
      strokeDashoffset: circumference,
    });

    const animation = gsap.to(circle, {
      strokeDashoffset: offset,
      duration: 1.8,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Animate the value counter
    gsap.to({ val: 0 }, {
      val: value,
      duration: 1.8,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      onUpdate: function() {
        if (valueEl) {
          valueEl.textContent = Math.round(this.targets()[0].val).toString();
        }
      },
    });

    return () => {
      animation.kill();
    };
  }, [value, circumference, progress, delay]);

  return (
    <div ref={containerRef} className="flex flex-col items-center group">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-muted/30"
          />
          {/* Progress circle */}
          <circle
            ref={circleRef}
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            className="transition-all duration-300 group-hover:filter group-hover:drop-shadow-lg"
          />
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span 
            ref={valueRef} 
            className="text-2xl font-serif font-semibold text-foreground"
          >
            0
          </span>
          {sublabel && (
            <span className="text-xs text-muted-foreground">{sublabel}</span>
          )}
        </div>
      </div>
      <span className="mt-3 text-sm font-body text-muted-foreground text-center">
        {label}
      </span>
    </div>
  );
};

interface HeartbeatMetricProps {
  value: number;
  label: string;
}

const HeartbeatMetric: React.FC<HeartbeatMetricProps> = ({ value, label }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heartRef.current || !containerRef.current) return;

    const heart = heartRef.current;

    // Heartbeat animation
    const heartbeat = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
    heartbeat
      .to(heart, { scale: 1.15, duration: 0.15, ease: 'power2.out' })
      .to(heart, { scale: 1, duration: 0.15, ease: 'power2.in' })
      .to(heart, { scale: 1.1, duration: 0.15, ease: 'power2.out' })
      .to(heart, { scale: 1, duration: 0.3, ease: 'power2.in' });

    return () => {
      heartbeat.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center">
      <div 
        ref={heartRef}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-soft-rust to-primary flex items-center justify-center shadow-warm"
      >
        <span className="text-2xl font-serif font-bold text-primary-foreground">
          {value}
        </span>
      </div>
      <span className="mt-3 text-sm font-body text-muted-foreground">
        {label}
      </span>
    </div>
  );
};

interface GlowBarProps {
  value: number;
  max: number;
  label: string;
}

const GlowBar: React.FC<GlowBarProps> = ({ value, max, label }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = (value / max) * 100;

  useEffect(() => {
    if (!barRef.current || !containerRef.current) return;

    gsap.set(barRef.current, { width: 0 });

    gsap.to(barRef.current, {
      width: `${progress}%`,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  }, [progress]);

  return (
    <div ref={containerRef} className="w-full max-w-xs">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-body text-muted-foreground">{label}</span>
        <span className="text-sm font-serif font-medium text-foreground">{value}%</span>
      </div>
      <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-gradient-to-r from-primary to-aged-gold rounded-full shadow-glow relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
};

interface SustainabilityShapeProps {
  value: number;
}

const SustainabilityShape: React.FC<SustainabilityShapeProps> = ({ value }) => {
  const shapeRef = useRef<HTMLDivElement>(null);
  const leafRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shapeRef.current || !leafRef.current) return;

    // Gentle breathing animation
    gsap.to(shapeRef.current, {
      scale: 1.05,
      duration: 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    // Leaf sway
    gsap.to(leafRef.current, {
      rotation: 5,
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={shapeRef}
        className="relative w-24 h-24 flex items-center justify-center"
      >
        {/* Organic blob shape */}
        <div className="absolute inset-0 bg-gradient-to-br from-vintage-green/80 to-vintage-green rounded-[60%_40%_70%_30%/50%_60%_40%_50%] shadow-soft" />
        <div ref={leafRef} className="relative z-10 text-3xl">🌱</div>
      </div>
      <div className="mt-3 text-center">
        <span className="text-xl font-serif font-semibold text-foreground">{value} kg</span>
        <p className="text-xs text-muted-foreground">CO₂ Saved</p>
      </div>
    </div>
  );
};

export const ProductMetrics: React.FC<ProductMetricsProps> = ({ metrics, className }) => {
  return (
    <div className={cn('py-12', className)}>
      <h3 className="text-2xl font-serif font-semibold text-foreground text-center mb-4">
        The Numbers Tell a Story
      </h3>
      <p className="text-center text-muted-foreground font-body mb-12 max-w-md mx-auto">
        Every number represents moments lived, care given, and impact made
      </p>
      
      {/* Main metrics grid - structured layout */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Usage Years - Ring */}
          <div className="bg-card/50 rounded-2xl p-6 border border-border/30 flex flex-col items-center">
            <MetricRing
              value={metrics.usageYears}
              max={30}
              label="Years of Life"
              sublabel="years"
              color="hsl(28, 65%, 45%)"
              delay={0}
            />
          </div>

          {/* Care Score - Heartbeat */}
          <div className="bg-card/50 rounded-2xl p-6 border border-border/30 flex flex-col items-center">
            <HeartbeatMetric
              value={metrics.careScore}
              label="Care Score"
            />
          </div>

          {/* Trust Level - Glow Bar */}
          <div className="bg-card/50 rounded-2xl p-6 border border-border/30 flex flex-col items-center justify-center">
            <GlowBar
              value={metrics.trustLevel}
              max={100}
              label="Trust Level"
            />
          </div>

          {/* Sustainability - Organic Shape */}
          <div className="bg-card/50 rounded-2xl p-6 border border-border/30 flex flex-col items-center">
            <SustainabilityShape value={metrics.sustainabilityImpact} />
          </div>
        </div>

        {/* Secondary stats - clean row */}
        <div className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto">
          <div className="bg-primary/5 rounded-xl p-4 text-center border border-primary/10">
            <span className="text-2xl font-serif font-bold text-primary block">
              {metrics.previousOwners}
            </span>
            <p className="text-xs text-muted-foreground mt-1">Previous Caretakers</p>
          </div>
          <div className="bg-primary/5 rounded-xl p-4 text-center border border-primary/10">
            <span className="text-2xl font-serif font-bold text-primary block">
              {metrics.journeyMiles.toLocaleString()}
            </span>
            <p className="text-xs text-muted-foreground mt-1">Miles Traveled</p>
          </div>
        </div>
      </div>
    </div>
  );
};