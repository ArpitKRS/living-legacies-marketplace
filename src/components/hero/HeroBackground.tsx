import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const HeroBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !dustRef.current) return;

    const container = containerRef.current;

    // Mouse move handler for interactive parallax
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      // Smoothly return to center
      gsap.to(mouseRef.current, {
        x: 0.5,
        y: 0.5,
        duration: 1.5,
        ease: 'power2.out',
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    const ctx = gsap.context(() => {
      // Continuous orb animation with mouse influence
      const updateOrbs = () => {
        orbsRef.current.forEach((orb, i) => {
          if (!orb) return;
          
          const baseX = parseFloat(orb.dataset.baseX || '0');
          const baseY = parseFloat(orb.dataset.baseY || '0');
          const speed = parseFloat(orb.dataset.speed || '1');
          const depth = parseFloat(orb.dataset.depth || '1');
          
          // Calculate parallax offset based on mouse position
          const parallaxX = (mouseRef.current.x - 0.5) * 100 * depth;
          const parallaxY = (mouseRef.current.y - 0.5) * 80 * depth;
          
          gsap.to(orb, {
            x: baseX + parallaxX,
            y: baseY + parallaxY,
            duration: 1.2 + (i * 0.1),
            ease: 'power2.out',
          });
        });
      };

      // Update orbs on mouse move
      gsap.ticker.add(updateOrbs);

      // Animate aurora waves with depth
      const waves = container.querySelectorAll('.aurora-wave');
      waves.forEach((wave, i) => {
        gsap.to(wave, {
          x: `${40 * (i % 2 === 0 ? 1 : -1)}%`,
          y: `${30 * (i % 2 === 0 ? -1 : 1)}%`,
          rotation: 5 * (i % 2 === 0 ? 1 : -1),
          scale: 1.15 + (i * 0.05),
          duration: 18 + (i * 4),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });

      // Magnetic orb effect on hover
      orbsRef.current.forEach((orb, i) => {
        if (!orb) return;
        
        // Store base positions
        const rect = orb.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        orb.dataset.baseX = '0';
        orb.dataset.baseY = '0';
        orb.dataset.speed = String(0.8 + Math.random() * 0.4);
        orb.dataset.depth = String(0.3 + (i / orbsRef.current.length) * 0.7);

        // Breathing animation
        gsap.to(orb, {
          scale: 0.85 + Math.random() * 0.3,
          opacity: 0.4 + Math.random() * 0.3,
          duration: 4 + Math.random() * 4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.3,
        });
      });

      // Dust particles with organic movement
      const dust = dustRef.current?.querySelectorAll('.dust-particle');
      dust?.forEach((particle, i) => {
        const el = particle as HTMLElement;
        gsap.set(el, {
          x: 0,
          y: 0,
        });
        
        gsap.to(el, {
          y: '-100vh',
          x: (Math.random() - 0.5) * 300,
          rotation: Math.random() * 360,
          opacity: 0,
          duration: 12 + Math.random() * 15,
          ease: 'none',
          repeat: -1,
          delay: Math.random() * 12,
        });
      });

      // Shimmer effect
      const shimmer = container.querySelector('.shimmer-overlay');
      if (shimmer) {
        gsap.to(shimmer, {
          backgroundPosition: '200% 200%',
          duration: 25,
          ease: 'none',
          repeat: -1,
        });
      }

      // Pulse ring animation
      const rings = container.querySelectorAll('.pulse-ring');
      rings.forEach((ring, i) => {
        gsap.to(ring, {
          scale: 2.5,
          opacity: 0,
          duration: 4 + i,
          ease: 'power1.out',
          repeat: -1,
          delay: i * 1.5,
        });
      });

      return () => {
        gsap.ticker.remove(updateOrbs);
      };
    });

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden cursor-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/20 to-background" />
      
      {/* Aurora waves with enhanced depth */}
      <div className="aurora-wave absolute -top-1/2 -left-1/4 w-[150%] h-[150%] opacity-30 will-change-transform">
        <div className="w-full h-full bg-gradient-to-br from-primary/25 via-transparent to-accent/20 rounded-full blur-3xl" />
      </div>
      <div className="aurora-wave absolute -bottom-1/2 -right-1/4 w-[120%] h-[120%] opacity-25 will-change-transform">
        <div className="w-full h-full bg-gradient-to-tl from-accent/35 via-transparent to-primary/15 rounded-full blur-3xl" />
      </div>
      <div className="aurora-wave absolute top-1/4 left-1/4 w-[80%] h-[80%] opacity-20 will-change-transform">
        <div className="w-full h-full bg-gradient-to-r from-primary/20 via-accent/25 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Interactive floating orbs with parallax */}
      <div 
        ref={el => el && (orbsRef.current[0] = el)}
        className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-primary/40 to-primary/5 blur-2xl will-change-transform"
        style={{ left: '8%', top: '25%' }}
      />
      <div 
        ref={el => el && (orbsRef.current[1] = el)}
        className="absolute w-56 h-56 rounded-full bg-gradient-to-br from-accent/50 to-accent/5 blur-2xl will-change-transform"
        style={{ right: '12%', top: '15%' }}
      />
      <div 
        ref={el => el && (orbsRef.current[2] = el)}
        className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-xl will-change-transform"
        style={{ left: '55%', top: '55%' }}
      />
      <div 
        ref={el => el && (orbsRef.current[3] = el)}
        className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-muted/40 to-transparent blur-2xl will-change-transform"
        style={{ left: '25%', bottom: '15%' }}
      />
      <div 
        ref={el => el && (orbsRef.current[4] = el)}
        className="absolute w-28 h-28 rounded-full bg-gradient-to-br from-primary/25 to-accent/15 blur-xl will-change-transform"
        style={{ right: '22%', bottom: '30%' }}
      />
      <div 
        ref={el => el && (orbsRef.current[5] = el)}
        className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-accent/35 to-primary/10 blur-xl will-change-transform"
        style={{ left: '45%', top: '35%' }}
      />

      {/* Pulse rings at center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="pulse-ring absolute w-32 h-32 rounded-full border border-primary/20" />
        <div className="pulse-ring absolute w-32 h-32 rounded-full border border-accent/15" />
        <div className="pulse-ring absolute w-32 h-32 rounded-full border border-primary/10" />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />

      {/* Enhanced dust particles */}
      <div ref={dustRef} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="dust-particle absolute rounded-full will-change-transform"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100 + 100}%`,
              opacity: 0.15 + Math.random() * 0.35,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              background: i % 3 === 0 
                ? 'hsl(var(--primary) / 0.6)' 
                : i % 3 === 1 
                  ? 'hsl(var(--accent) / 0.5)' 
                  : 'hsl(var(--foreground) / 0.3)',
            }}
          />
        ))}
      </div>

      {/* Shimmer overlay */}
      <div 
        className="shimmer-overlay absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(45deg, transparent 40%, hsl(var(--primary) / 0.15) 50%, transparent 60%)',
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 0%',
        }}
      />

      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Cursor glow effect */}
      {isHovering && (
        <div 
          className="pointer-events-none fixed w-64 h-64 rounded-full blur-3xl transition-opacity duration-500"
          style={{
            left: `calc(${mouseRef.current.x * 100}% - 128px)`,
            top: `calc(${mouseRef.current.y * 100}% - 128px)`,
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
          }}
        />
      )}
    </div>
  );
};
