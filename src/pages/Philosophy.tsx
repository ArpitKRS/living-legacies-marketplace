import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Heart, Feather, Infinity, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          opacity: 0,
          y: 40,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        });
      }

      if (principlesRef.current) {
        const items = principlesRef.current.querySelectorAll('.principle-card');
        gsap.set(items, { opacity: 0, y: 60 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: principlesRef.current,
            start: 'top 70%',
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const principles = [
    {
      icon: Heart,
      title: 'Emotional Intelligence',
      description: 'We believe objects hold emotional energy. The love poured into a handcrafted chair, the memories embedded in a family heirloom—these aren\'t just sentimental notions, they\'re what makes pre-loved items invaluable.',
    },
    {
      icon: Feather,
      title: 'Lightness of Being',
      description: 'Ownership is temporary stewardship. We\'re all just custodians of the beautiful things that pass through our lives. Letting go isn\'t loss—it\'s allowing an object to continue its journey.',
    },
    {
      icon: Infinity,
      title: 'Circular Living',
      description: 'Every item rehomed is a small victory against disposability. We champion the idea that quality objects should live many lives, each chapter adding depth to their character.',
    },
    {
      icon: Compass,
      title: 'Intentional Acquisition',
      description: 'We encourage mindful consumption. Before acquiring something new, consider: what\'s the story? What life has it lived? These questions lead to more meaningful ownership.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-accent/30 to-background">
        <div ref={heroRef} className="container mx-auto px-6 text-center max-w-3xl">
          <p className="text-primary/70 font-medium tracking-[0.3em] uppercase text-sm mb-6">
            Our Philosophy
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-8">
            Objects Have Souls
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            At Afterlife, we see beyond the surface. Every scratch tells a story, 
            every worn edge speaks of years of love. We're not just a marketplace—
            we're guardians of these stories, helping them find their next chapter.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div ref={principlesRef} className="grid md:grid-cols-2 gap-8">
            {principles.map((principle, i) => (
              <div 
                key={i}
                className="principle-card bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <principle.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-4">
                  {principle.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 bg-accent/20">
        <div className="container mx-auto px-6">
          <blockquote className="max-w-3xl mx-auto text-center">
            <p className="font-serif text-3xl md:text-4xl text-foreground italic leading-relaxed mb-6">
              "The things we own end up owning us. The solution isn't to own less, 
              but to own things that truly matter."
            </p>
            <cite className="text-muted-foreground not-italic">
              — The Afterlife Manifesto
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="font-serif text-3xl text-foreground mb-6">
            Our Commitment
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Every item on Afterlife is verified for quality and authenticity. 
            We document histories, validate conditions, and ensure that what 
            reaches you carries the story it promises. This isn't just commerce—
            it's preservation of meaning.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Philosophy;