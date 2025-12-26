import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Leaf, Recycle, TrendingDown, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Sustainability = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (statsRef.current) {
        const numbers = statsRef.current.querySelectorAll('.impact-number');
        numbers.forEach((num) => {
          const target = parseInt(num.getAttribute('data-value') || '0');
          gsap.fromTo(
            num,
            { textContent: 0 },
            {
              textContent: target,
              duration: 2.5,
              ease: 'power2.out',
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: num,
                start: 'top 85%',
              },
            }
          );
        });
      }

      if (impactRef.current) {
        const items = impactRef.current.querySelectorAll('.impact-item');
        gsap.set(items, { opacity: 0, x: -30 });
        gsap.to(items, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: impactRef.current,
            start: 'top 70%',
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const impactMetrics = [
    {
      icon: Recycle,
      value: 2400,
      suffix: 'kg',
      label: 'CO₂ Emissions Saved',
      description: 'By extending product lifecycles instead of manufacturing new',
    },
    {
      icon: TrendingDown,
      value: 847,
      suffix: '+',
      label: 'Items Diverted from Landfill',
      description: 'Quality treasures given new homes instead of becoming waste',
    },
    {
      icon: Globe,
      value: 15,
      suffix: 'tons',
      label: 'Raw Materials Preserved',
      description: 'Wood, metal, and fabric that didn\'t need to be extracted',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-accent/30 to-background">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-8">
            <Leaf className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-8">
            Sustainability Through Stories
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            The most sustainable product is one that already exists. By giving 
            pre-loved items new chapters, we're not just reducing waste—we're 
            proving that conscious consumption can be beautiful.
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 bg-card border-y border-border">
        <div ref={statsRef} className="container mx-auto px-6">
          <h2 className="font-serif text-3xl text-foreground text-center mb-16">
            Our Collective Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {impactMetrics.map((metric, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <metric.icon className="h-8 w-8 text-primary" />
                </div>
                <p className="font-serif text-5xl text-primary mb-2">
                  <span className="impact-number" data-value={metric.value}>0</span>
                  {metric.suffix}
                </p>
                <p className="font-medium text-foreground mb-2">{metric.label}</p>
                <p className="text-muted-foreground text-sm">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl text-foreground text-center mb-12">
              How Pre-Loved Helps the Planet
            </h2>
            <div ref={impactRef} className="space-y-8">
              {[
                {
                  title: 'Extended Product Lifecycles',
                  desc: 'Manufacturing accounts for a massive portion of global emissions. Every item rehomed means one less new product needs to be made.',
                },
                {
                  title: 'Reduced Landfill Waste',
                  desc: 'Quality furniture and electronics often end up in landfills prematurely. We give them the extended life they deserve.',
                },
                {
                  title: 'Preserved Craftsmanship',
                  desc: 'Older items were often built better. By keeping them in circulation, we preserve craftsmanship that is increasingly rare.',
                },
                {
                  title: 'Mindful Consumption Culture',
                  desc: 'We are building a community that values quality over quantity, stories over novelty.',
                },
              ].map((item, i) => (
                <div key={i} className="impact-item flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-serif text-lg text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pledge */}
      <section className="py-20 bg-accent/20">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="font-serif text-3xl text-foreground mb-6">
            Our Pledge
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            For every 100 items sold through Afterlife, we plant a tree. 
            We use carbon-neutral shipping whenever possible. And we continually 
            work to reduce packaging while ensuring your treasures arrive safely.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sustainability;