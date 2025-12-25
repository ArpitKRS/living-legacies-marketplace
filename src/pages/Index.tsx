import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Heart, Clock, Leaf, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { getFeaturedProducts, getRecentProducts } from '@/data/products';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const featuredProducts = getFeaturedProducts();
  const recentProducts = getRecentProducts();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      gsap.to(heroRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Hero text animation
      if (heroTextRef.current) {
        const elements = heroTextRef.current.children;
        gsap.set(elements, { opacity: 0, y: 60 });
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          delay: 0.3,
        });
      }

      // Floating particles
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        Array.from(particles).forEach((particle, i) => {
          gsap.to(particle, {
            y: -30 - Math.random() * 20,
            x: Math.sin(i) * 20,
            rotation: Math.random() * 10 - 5,
            duration: 4 + Math.random() * 2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: i * 0.3,
          });
        });
      }

      // Featured products reveal
      if (featuredRef.current) {
        const cards = featuredRef.current.querySelectorAll('.product-card');
        gsap.set(cards, { opacity: 0, y: 80, scale: 0.95 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 75%',
          },
        });
      }

      // Philosophy section
      if (philosophyRef.current) {
        const items = philosophyRef.current.querySelectorAll('.philosophy-item');
        gsap.set(items, { opacity: 0, x: -40 });
        gsap.to(items, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: 'top 70%',
          },
        });
      }

      // Stats counter animation
      if (statsRef.current) {
        const statNumbers = statsRef.current.querySelectorAll('.stat-number');
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.getAttribute('data-value') || '0');
          gsap.fromTo(
            stat,
            { textContent: 0 },
            {
              textContent: target,
              duration: 2,
              ease: 'power2.out',
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const floatingWords = [
    'memories', 'stories', 'heritage', 'warmth', 'legacy', 
    'craftsmanship', 'soul', 'journey', 'time', 'love'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div 
          ref={heroRef}
          className="absolute inset-0 bg-gradient-to-b from-accent/30 via-background to-background"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-50" />
        </div>

        {/* Floating particles */}
        <div 
          ref={particlesRef}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          {floatingWords.map((word, i) => (
            <span
              key={word}
              className="absolute text-primary/20 font-serif italic text-lg md:text-xl"
              style={{
                left: `${10 + (i % 5) * 20}%`,
                top: `${20 + Math.floor(i / 5) * 40}%`,
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Hero content */}
        <div className="relative h-full flex items-center justify-center px-6">
          <div ref={heroTextRef} className="text-center max-w-4xl">
            <p className="text-primary/70 font-medium tracking-[0.3em] uppercase text-sm mb-6">
              A marketplace for things with a past
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight mb-8">
              Welcome to
              <span className="block text-primary italic">Afterlife</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Every object carries a story. Here, pre-loved treasures find their next chapter,
              and new owners become part of a continuing legacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link to="/browse">
                  Explore the Collection
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">Our Philosophy</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse">
          <span className="text-muted-foreground text-sm">Scroll to discover</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-primary/50 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Philosophy Strip */}
      <section className="py-20 bg-card border-y border-border">
        <div ref={philosophyRef} className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: 'Emotional Value', desc: 'Objects that carry meaning beyond their function' },
              { icon: Clock, title: 'Timeless Quality', desc: 'Built to last, meant to be passed on' },
              { icon: Leaf, title: 'Sustainable Choice', desc: 'Extending life, reducing waste' },
              { icon: Sparkles, title: 'Curated Stories', desc: 'Every item verified and documented' },
            ].map((item, i) => (
              <div key={i} className="philosophy-item flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-primary/70 font-medium tracking-widest uppercase text-sm mb-3">
              Curated Selection
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              Featured Treasures
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Handpicked items with remarkable histories, ready for their next chapter
            </p>
          </div>
          
          <div ref={featuredRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/browse">
                View All Items
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-accent/30">
        <div ref={statsRef} className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 847, label: 'Items Rehomed', suffix: '+' },
              { value: 62, label: 'Average Age (Years)', suffix: '' },
              { value: 98, label: 'Happy New Owners', suffix: '%' },
              { value: 2400, label: 'kg CO₂ Saved', suffix: '+' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="font-serif text-4xl md:text-5xl text-primary mb-2">
                  <span className="stat-number" data-value={stat.value}>0</span>
                  {stat.suffix}
                </p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Added */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-primary/70 font-medium tracking-widest uppercase text-sm mb-3">
                New Arrivals
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                Recently Added
              </h2>
            </div>
            <Link 
              to="/browse" 
              className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
            >
              See all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-card to-background border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Have something with a story?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            We'd love to help your treasured item find its next loving home.
            Every piece deserves a continued legacy.
          </p>
          <Button size="lg" className="group">
            Start Selling
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
