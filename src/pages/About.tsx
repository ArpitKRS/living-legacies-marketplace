import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Clock, Leaf, Users, ArrowRight, Quote } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import vintageDesk from '@/assets/vintage-desk.jpg';

gsap.registerPlugin(ScrollTrigger);

const journeySteps = [
  {
    step: '01',
    title: 'Story Collection',
    desc: 'Sellers share their item\'s history—where it came from, who loved it, what memories it holds.',
    visual: '📜',
  },
  {
    step: '02',
    title: 'Verification & Curation',
    desc: 'Our team verifies authenticity and condition, then crafts the item\'s narrative with care.',
    visual: '🔍',
  },
  {
    step: '03',
    title: 'Visual Timeline Creation',
    desc: 'We create a beautiful timeline documenting the item\'s journey through time and hands.',
    visual: '📸',
  },
  {
    step: '04',
    title: 'Finding the Next Custodian',
    desc: 'Buyers browse not just products, but stories—finding items that resonate with their own lives.',
    visual: '💫',
  },
  {
    step: '05',
    title: 'The Transition',
    desc: 'Items are carefully packaged with their documentation, ready to begin a new chapter.',
    visual: '🎁',
  },
];

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const journeySectionRef = useRef<HTMLDivElement>(null);
  const journeyTrackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

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

      // Story section parallax
      if (storyRef.current) {
        const image = storyRef.current.querySelector('.story-image');
        const content = storyRef.current.querySelector('.story-content');
        
        if (image) {
          gsap.fromTo(image, 
            { y: 60, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: storyRef.current,
                start: 'top 80%',
              },
            }
          );
        }

        if (content) {
          gsap.fromTo(content,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: storyRef.current,
                start: 'top 70%',
              },
            }
          );
        }
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

      // Horizontal scroll journey section - responsive
      if (journeySectionRef.current && journeyTrackRef.current) {
        const track = journeyTrackRef.current;
        const cards = track.querySelectorAll('.journey-card');
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
          // Vertical scroll animation for mobile
          cards.forEach((card) => {
            gsap.fromTo(card,
              { opacity: 0, y: 60, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 85%',
                  end: 'top 50%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          });
        } else {
          // Horizontal scroll for desktop
          const totalScroll = track.scrollWidth - window.innerWidth;

          const scrollTween = gsap.to(track, {
            x: -totalScroll,
            ease: 'none',
            scrollTrigger: {
              trigger: journeySectionRef.current,
              start: 'top top',
              end: () => `+=${totalScroll}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              onUpdate: (self) => {
                if (progressRef.current) {
                  gsap.to(progressRef.current, {
                    scaleX: self.progress,
                    duration: 0.1,
                    ease: 'none',
                  });
                }
              },
            },
          });

          cards.forEach((card) => {
            gsap.fromTo(card,
              { opacity: 0.3, scale: 0.9, rotateY: 15 },
              {
                opacity: 1,
                scale: 1,
                rotateY: 0,
                duration: 0.5,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: scrollTween,
                  start: 'left 80%',
                  end: 'left 30%',
                  scrub: true,
                },
              }
            );
          });
        }
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

      {/* Origin Story - Brief Version */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div ref={storyRef} className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="story-content space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                How It Began
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Afterlife was born when our founder inherited her grandmother's writing desk—along with a letter describing every book written there, every memory it held. That desk became more than furniture; it became a portal to understanding.
              </p>
              <p className="text-foreground font-medium text-lg">
                What if every pre-owned item came with its story? Afterlife is our answer.
              </p>
            </div>
            <div className="story-image relative max-w-sm mx-auto lg:mx-0">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-warm">
                <img 
                  src={vintageDesk}
                  alt="Vintage desk with handwritten letters in warm golden light"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-warm max-w-[200px]">
                <p className="font-serif text-sm text-foreground italic">
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

      {/* The Journey - Responsive Section */}
      <section 
        ref={journeySectionRef}
        className="relative md:h-screen bg-gradient-to-b from-background via-accent/10 to-background overflow-hidden py-16 md:py-0"
      >
        {/* Progress bar - desktop only */}
        <div className="hidden md:block fixed top-0 left-0 right-0 h-1 bg-border/30 z-50">
          <div 
            ref={progressRef}
            className="h-full bg-primary origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Section header */}
        <div className="md:absolute md:top-8 left-0 right-0 z-10 text-center mb-8 md:mb-0">
          <p className="text-primary/70 font-medium tracking-widest uppercase text-sm mb-2">
            The Journey
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            How Afterlife Works
          </h2>
        </div>

        {/* Mobile: Vertical layout */}
        <div className="md:hidden container mx-auto px-6">
          <div ref={journeyTrackRef} className="space-y-6">
            {journeySteps.map((item, i) => (
              <div 
                key={i}
                className="journey-card relative"
              >
                <div className="relative bg-card border border-border rounded-2xl p-6 shadow-warm overflow-hidden">
                  <div className="absolute -right-2 -top-2 text-[80px] font-serif font-bold text-primary/5 leading-none pointer-events-none">
                    {item.step}
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">{item.visual}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-medium text-xs">
                          {item.step}
                        </span>
                        <h3 className="font-serif text-lg text-foreground">{item.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
                
                {i < journeySteps.length - 1 && (
                  <div className="absolute left-1/2 -bottom-3 w-px h-6 bg-gradient-to-b from-border to-primary/30" />
                )}
              </div>
            ))}
            
            {/* End marker - mobile */}
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✨</span>
              </div>
              <p className="font-serif text-lg text-foreground">New Chapter Begins</p>
            </div>
          </div>
        </div>

        {/* Desktop: Horizontal track */}
        <div 
          ref={journeyTrackRef}
          className="hidden md:flex absolute top-0 left-0 h-full items-center gap-8 px-[50vw] pt-24"
          style={{ width: 'fit-content' }}
        >
          {journeySteps.map((item, i) => (
            <div 
              key={i}
              className="journey-card relative flex-shrink-0 w-[350px] lg:w-[400px] h-[450px] lg:h-[500px] perspective-1000"
            >
              <div className="relative w-full h-full bg-card border border-border rounded-3xl p-6 lg:p-8 flex flex-col shadow-warm overflow-hidden group">
                <div className="absolute -right-4 -top-4 text-[140px] lg:text-[180px] font-serif font-bold text-primary/5 leading-none pointer-events-none">
                  {item.step}
                </div>
                
                <div className="text-5xl lg:text-6xl mb-4 lg:mb-6">{item.visual}</div>
                
                <div className="flex items-center gap-3 mb-3 lg:mb-4">
                  <span className="w-8 lg:w-10 h-8 lg:h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-medium text-sm">
                    {item.step}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
                </div>
                
                <h3 className="font-serif text-xl lg:text-2xl text-foreground mb-3 lg:mb-4">{item.title}</h3>
                <p className="text-muted-foreground text-sm lg:text-base leading-relaxed flex-grow">{item.desc}</p>
                
                <div className="absolute bottom-0 right-0 w-24 lg:w-32 h-24 lg:h-32 bg-gradient-to-tl from-primary/5 to-transparent rounded-tl-full" />
              </div>
              
              {i < journeySteps.length - 1 && (
                <div className="absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-border to-primary/30" />
              )}
            </div>
          ))}
          
          {/* End marker - desktop */}
          <div className="flex-shrink-0 w-[150px] lg:w-[200px] h-[450px] lg:h-[500px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 lg:w-20 h-16 lg:h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl lg:text-3xl">✨</span>
              </div>
              <p className="font-serif text-lg lg:text-xl text-foreground">New Chapter</p>
              <p className="text-muted-foreground text-sm mt-2">Begins</p>
            </div>
          </div>
        </div>

        {/* Scroll hint - desktop only */}
        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 items-center gap-2 text-muted-foreground text-sm">
          <span>Scroll to explore</span>
          <ArrowRight className="w-4 h-4 animate-pulse" />
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
