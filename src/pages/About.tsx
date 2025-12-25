import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Clock, Leaf, Users, ArrowRight, Quote } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      if (heroRef.current) {
        const elements = heroRef.current.children;
        gsap.set(elements, { opacity: 0, y: 40 });
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.2,
        });
      }

      // Story paragraphs
      if (storyRef.current) {
        const paragraphs = storyRef.current.querySelectorAll('p');
        gsap.set(paragraphs, { opacity: 0, y: 30 });
        gsap.to(paragraphs, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 75%',
          },
        });
      }

      // Values cards
      if (valuesRef.current) {
        const cards = valuesRef.current.querySelectorAll('.value-card');
        gsap.set(cards, { opacity: 0, y: 50, rotateX: 10 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 70%',
          },
        });
      }

      // Quote animation
      if (quoteRef.current) {
        gsap.from(quoteRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 75%',
          },
        });
      }

      // Process steps
      if (processRef.current) {
        const steps = processRef.current.querySelectorAll('.process-step');
        const line = processRef.current.querySelector('.process-line');
        
        if (line) {
          gsap.set(line, { scaleY: 0, transformOrigin: 'top' });
          gsap.to(line, {
            scaleY: 1,
            duration: 1.5,
            ease: 'none',
            scrollTrigger: {
              trigger: processRef.current,
              start: 'top 60%',
              end: 'bottom 40%',
              scrub: true,
            },
          });
        }

        gsap.set(steps, { opacity: 0, x: -30 });
        steps.forEach((step, i) => {
          gsap.to(step, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
            },
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-accent/30 to-background">
        <div ref={heroRef} className="container mx-auto px-6 text-center max-w-3xl">
          <p className="text-primary/70 font-medium tracking-[0.3em] uppercase text-sm mb-4">
            Our Philosophy
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-foreground leading-tight mb-6">
            Every Object Has a Soul
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            We believe that the things we live with absorb our stories, our moments, 
            our essence. Afterlife is where these stories continue.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div ref={storyRef} className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                How It Began
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Afterlife was born from a simple observation: when we pass on our 
                beloved possessions, we're not just transferring objects—we're 
                sharing pieces of our lives.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our founder inherited her grandmother's writing desk. With it came 
                a letter describing every book written at that desk, every letter 
                penned, every quiet morning of creation. That desk became more than 
                furniture—it became a portal to understanding someone she barely knew.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                That experience sparked a question: What if every pre-owned item 
                came with its story? What if we could transform second-hand shopping 
                from a transaction into an emotional inheritance?
              </p>
              <p className="text-foreground font-medium">
                Afterlife is our answer.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800"
                  alt="Vintage desk with warm lighting"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-6 shadow-warm max-w-xs">
                <p className="font-serif text-lg text-foreground italic">
                  "Objects hold the fingerprints of lives well-lived"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-primary/70 font-medium tracking-widest uppercase text-sm mb-3">
              What Guides Us
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              Our Core Values
            </h2>
          </div>
          
          <div ref={valuesRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: 'Emotional Intelligence',
                desc: 'We recognize that value isn\'t just monetary. The memories attached to an object can be priceless.',
              },
              {
                icon: Clock,
                title: 'Respect for Time',
                desc: 'Every scratch, patina, and wear mark tells a story. We preserve history, not erase it.',
              },
              {
                icon: Leaf,
                title: 'Sustainable Future',
                desc: 'The most sustainable product is one that\'s already made. We extend lifespans, not landfills.',
              },
              {
                icon: Users,
                title: 'Community of Care',
                desc: 'Sellers and buyers become custodians, united in their appreciation for quality and meaning.',
              },
            ].map((value, i) => (
              <div 
                key={i}
                className="value-card bg-background rounded-xl p-6 border border-border"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-24 bg-accent/20">
        <div className="container mx-auto px-6">
          <div 
            ref={quoteRef}
            className="max-w-3xl mx-auto text-center"
          >
            <Quote className="h-12 w-12 text-primary/30 mx-auto mb-6" />
            <blockquote className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed mb-6 italic">
              "The best things in life aren't things at all—they're the memories 
              we attach to them, the moments they witnessed, the hands that held them before ours."
            </blockquote>
            <cite className="text-muted-foreground">
              — Elena Vasquez, Founder of Afterlife
            </cite>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-primary/70 font-medium tracking-widest uppercase text-sm mb-3">
              The Journey
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              How Afterlife Works
            </h2>
          </div>

          <div ref={processRef} className="relative max-w-2xl mx-auto">
            {/* Connecting line */}
            <div className="process-line absolute left-6 top-0 bottom-0 w-0.5 bg-primary/30" />

            {[
              {
                step: '01',
                title: 'Story Collection',
                desc: 'Sellers share their item\'s history—where it came from, who loved it, what memories it holds.',
              },
              {
                step: '02',
                title: 'Verification & Curation',
                desc: 'Our team verifies authenticity and condition, then crafts the item\'s narrative with care.',
              },
              {
                step: '03',
                title: 'Visual Timeline Creation',
                desc: 'We create a beautiful timeline documenting the item\'s journey through time and hands.',
              },
              {
                step: '04',
                title: 'Finding the Next Custodian',
                desc: 'Buyers browse not just products, but stories—finding items that resonate with their own lives.',
              },
              {
                step: '05',
                title: 'The Transition',
                desc: 'Items are carefully packaged with their documentation, ready to begin a new chapter.',
              },
            ].map((item, i) => (
              <div key={i} className="process-step relative pl-16 pb-12 last:pb-0">
                <div className="absolute left-0 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                  <span className="text-primary font-medium text-sm">{item.step}</span>
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-card to-background border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl text-foreground mb-6">
            Ready to Explore?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Discover treasures with stories waiting to continue, or share 
            your own cherished items with someone who will love them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="group">
              <Link to="/browse">
                Browse Collection
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/">Start Selling</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
