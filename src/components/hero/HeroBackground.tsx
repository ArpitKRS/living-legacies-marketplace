import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const HeroBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !dustRef.current) return;

    const ctx = gsap.context(() => {
      // Animate aurora waves
      const waves = containerRef.current?.querySelectorAll('.aurora-wave');
      waves?.forEach((wave, i) => {
        gsap.to(wave, {
          x: `${30 * (i % 2 === 0 ? 1 : -1)}%`,
          y: `${20 * (i % 2 === 0 ? -1 : 1)}%`,
          scale: 1.1 + (i * 0.05),
          duration: 15 + (i * 3),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });

      // Animate floating orbs
      const orbs = containerRef.current?.querySelectorAll('.floating-orb');
      orbs?.forEach((orb, i) => {
        gsap.to(orb, {
          y: `-${50 + Math.random() * 100}`,
          x: `${(Math.random() - 0.5) * 100}`,
          scale: 0.8 + Math.random() * 0.4,
          opacity: 0.3 + Math.random() * 0.4,
          duration: 8 + Math.random() * 8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.5,
        });
      });

      // Dust particles
      const dust = dustRef.current?.querySelectorAll('.dust-particle');
      dust?.forEach((particle, i) => {
        gsap.to(particle, {
          y: '-100vh',
          x: (Math.random() - 0.5) * 200,
          opacity: 0,
          duration: 15 + Math.random() * 10,
          ease: 'none',
          repeat: -1,
          delay: Math.random() * 15,
        });
      });

      // Shimmer effect
      const shimmer = containerRef.current?.querySelector('.shimmer-overlay');
      if (shimmer) {
        gsap.to(shimmer, {
          backgroundPosition: '200% 200%',
          duration: 20,
          ease: 'none',
          repeat: -1,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/20 to-background" />
      
      {/* Aurora waves */}
      <div className="aurora-wave absolute -top-1/2 -left-1/4 w-[150%] h-[150%] opacity-30">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-full blur-3xl" />
      </div>
      <div className="aurora-wave absolute -bottom-1/2 -right-1/4 w-[120%] h-[120%] opacity-25">
        <div className="w-full h-full bg-gradient-to-tl from-accent/30 via-transparent to-primary/10 rounded-full blur-3xl" />
      </div>
      <div className="aurora-wave absolute top-1/4 left-1/4 w-[80%] h-[80%] opacity-20">
        <div className="w-full h-full bg-gradient-to-r from-primary/15 via-accent/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Floating orbs */}
      <div className="floating-orb absolute w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-2xl" style={{ left: '10%', top: '30%' }} />
      <div className="floating-orb absolute w-48 h-48 rounded-full bg-gradient-to-br from-accent/40 to-accent/5 blur-2xl" style={{ right: '15%', top: '20%' }} />
      <div className="floating-orb absolute w-24 h-24 rounded-full bg-gradient-to-br from-primary/25 to-transparent blur-xl" style={{ left: '60%', top: '60%' }} />
      <div className="floating-orb absolute w-40 h-40 rounded-full bg-gradient-to-br from-muted/30 to-transparent blur-2xl" style={{ left: '30%', bottom: '20%' }} />
      <div className="floating-orb absolute w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-xl" style={{ right: '25%', bottom: '35%' }} />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />

      {/* Dust particles */}
      <div ref={dustRef} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="dust-particle absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100 + 100}%`,
              opacity: 0.2 + Math.random() * 0.3,
            }}
          />
        ))}
      </div>

      {/* Shimmer overlay */}
      <div 
        className="shimmer-overlay absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(45deg, transparent 40%, hsl(var(--primary) / 0.1) 50%, transparent 60%)',
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 0%',
        }}
      />

      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
