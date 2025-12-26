import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Heart, Clock, Leaf, Sparkles, Camera, FileText, Users, CheckCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { getFeaturedProducts, getRecentProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const sellSectionRef = useRef<HTMLDivElement>(null);

  const featuredProducts = getFeaturedProducts();
  const recentProducts = getRecentProducts();

  const scrollToSell = () => {
    sellSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

      // Floating orbs animation
      if (orbsRef.current) {
        const orbs = orbsRef.current.children;
        Array.from(orbs).forEach((orb, i) => {
          gsap.to(orb, {
            y: -40 - Math.random() * 30,
            x: Math.sin(i) * 30,
            scale: 0.9 + Math.random() * 0.2,
            duration: 6 + Math.random() * 4,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: i * 0.5,
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

      // Sell section animation
      if (sellSectionRef.current) {
        const items = sellSectionRef.current.querySelectorAll('.sell-step');
        gsap.set(items, { opacity: 0, y: 40 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sellSectionRef.current,
            start: 'top 70%',
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

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

        {/* Soft floating orbs */}
        <div 
          ref={orbsRef}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <div 
            className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl"
            style={{ left: '10%', top: '20%' }}
          />
          <div 
            className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-accent/20 to-transparent blur-3xl"
            style={{ right: '15%', top: '30%' }}
          />
          <div 
            className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-primary/5 to-accent/10 blur-3xl"
            style={{ left: '40%', bottom: '20%' }}
          />
          <div 
            className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-muted/30 to-transparent blur-2xl"
            style={{ right: '30%', bottom: '30%' }}
          />
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

      {/* Sell Your Items Section */}
      <section 
        ref={sellSectionRef}
        id="sell"
        className="py-24 bg-gradient-to-b from-card to-background border-t border-border"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-primary/70 font-medium tracking-widest uppercase text-sm mb-3">
              Become a Seller
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              Share Your Treasures
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Give your cherished items a new chapter. We'll help tell their story
              and find them a loving new home.
            </p>
          </div>

          {/* How it works */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { icon: Camera, step: '01', title: 'Capture', desc: 'Take beautiful photos that show character and patina' },
              { icon: FileText, step: '02', title: 'Tell the Story', desc: 'Share the memories and history behind your item' },
              { icon: Users, step: '03', title: 'Connect', desc: 'We match your treasure with appreciative buyers' },
              { icon: CheckCircle, step: '04', title: 'Complete', desc: 'Easy handoff with our guided delivery process' },
            ].map((item, i) => (
              <div key={i} className="sell-step text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <h3 className="font-serif text-2xl text-foreground mb-6 text-center">
                Get Started
              </h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Your Name
                    </label>
                    <Input placeholder="Jane Smith" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input type="email" placeholder="jane@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    What would you like to sell?
                  </label>
                  <Input placeholder="e.g., Vintage oak dining table from the 1960s" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tell us the story
                  </label>
                  <Textarea 
                    placeholder="Share the history, memories, and why this piece is special..."
                    rows={4}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full group">
                  Submit Your Item
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
              <p className="text-center text-muted-foreground text-sm mt-4">
                We'll review your submission and get back within 48 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-lg mb-4">
            Ready to give your treasures a new chapter?
          </p>
          <Button onClick={scrollToSell} variant="outline" size="lg" className="group">
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