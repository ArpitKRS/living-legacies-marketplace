import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Camera, FileText, Users, CheckCircle, Shield, Heart, DollarSign, Truck, Star, Upload, X, ImageIcon } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

const Sell = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      if (heroRef.current) {
        const elements = heroRef.current.querySelectorAll('.hero-animate');
        gsap.fromTo(elements,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
        );
      }

      // Steps animation
      if (stepsRef.current) {
        const steps = stepsRef.current.querySelectorAll('.step-card');
        gsap.fromTo(steps,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: stepsRef.current, start: 'top 75%' }
          }
        );
      }

      // Benefits animation
      if (benefitsRef.current) {
        const items = benefitsRef.current.querySelectorAll('.benefit-item');
        gsap.fromTo(items,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0,
            duration: 0.6, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: benefitsRef.current, start: 'top 70%' }
          }
        );
      }

      // Form animation
      if (formRef.current) {
        gsap.fromTo(formRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: formRef.current, start: 'top 80%' }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      icon: Camera,
      step: '01',
      title: 'Capture',
      desc: 'Take beautiful photos that show character, patina, and the unique story of your item.'
    },
    {
      icon: FileText,
      step: '02',
      title: 'Tell the Story',
      desc: 'Share the memories, history, and emotional journey behind your treasured piece.'
    },
    {
      icon: Users,
      step: '03',
      title: 'Connect',
      desc: 'We carefully match your treasure with appreciative buyers who value its history.'
    },
    {
      icon: CheckCircle,
      step: '04',
      title: 'Complete',
      desc: 'Easy handoff with our guided delivery process and ceremonial transition.'
    },
  ];

  const benefits = [
    { icon: Shield, title: 'Secure Transactions', desc: 'Protected payments and verified buyers' },
    { icon: Heart, title: 'Story Preservation', desc: 'We document and honor your item\'s history' },
    { icon: DollarSign, title: 'Fair Pricing', desc: 'Expert valuation based on emotional and material worth' },
    { icon: Truck, title: 'White-Glove Delivery', desc: 'Professional handling and ceremonial handoff' },
    { icon: Star, title: 'Curated Placement', desc: 'Your item finds the perfect appreciative home' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-background to-background" />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 rounded-full bg-primary/5 blur-3xl -top-20 -left-20" />
          <div className="absolute w-80 h-80 rounded-full bg-accent/10 blur-3xl top-40 right-10" />
        </div>

        <div ref={heroRef} className="container relative mx-auto px-6 text-center">
          <p className="hero-animate text-primary/70 font-medium tracking-[0.3em] uppercase text-sm mb-4">
            Become a Seller
          </p>
          <h1 className="hero-animate font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-6">
            Share Your
            <span className="block text-primary italic">Treasures</span>
          </h1>
          <p className="hero-animate text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Give your cherished items a new chapter. We'll help tell their story
            and find them a loving new home where they'll be treasured for generations to come.
          </p>
          <div className="hero-animate">
            <Button 
              size="lg" 
              className="group"
              onClick={() => document.getElementById('seller-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-primary/70 font-medium tracking-widest uppercase text-sm mb-3">
              The Process
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              How It Works
            </h2>
          </div>

          <div ref={stepsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, i) => (
              <div key={i} className="step-card text-center p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-colors">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center shadow-lg">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary/70 font-medium tracking-widest uppercase text-sm mb-3">
                Why Sell With Us
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
                More Than a Transaction
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                At Afterlife, we understand that parting with treasured items is an emotional journey. 
                We're here to ensure your items find homes where they'll be valued and their stories continued.
              </p>

              <div ref={benefitsRef} className="space-y-4">
                {benefits.map((benefit, i) => (
                  <div key={i} className="benefit-item flex items-start gap-4 p-4 rounded-xl bg-card border border-border/30">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-serif text-foreground mb-1">{benefit.title}</h4>
                      <p className="text-muted-foreground text-sm">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-accent/30 to-background rounded-3xl p-10 border border-border/50">
              <h3 className="font-serif text-2xl text-foreground mb-8 text-center">
                Our Seller Community
              </h3>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { value: '847+', label: 'Items Rehomed' },
                  { value: '98%', label: 'Seller Satisfaction' },
                  { value: '$2.4M', label: 'Paid to Sellers' },
                  { value: '48hrs', label: 'Avg. Response Time' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="font-serif text-3xl md:text-4xl text-primary mb-2">{stat.value}</p>
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="seller-form" className="py-24 bg-gradient-to-b from-card to-background border-t border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-primary/70 font-medium tracking-widest uppercase text-sm mb-3">
              Get Started
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              Tell Us About Your Item
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Share the basics and we'll be in touch within 48 hours
            </p>
          </div>

          <div ref={formRef} className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg overflow-hidden">
              {isSubmitted ? (
                <div className="text-center py-8 animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="font-serif text-2xl text-foreground mb-3">
                    Submission Received!
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Thank you for sharing your treasure with us. Our team will review your submission 
                    and get back to you within 48 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsSubmitted(false);
                        setImagePreview(null);
                        setImageName('');
                      }}
                    >
                      Submit Another Item
                    </Button>
                    <Button asChild>
                      <Link to="/browse">Browse Collection</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <form className="space-y-6" onSubmit={handleSubmit}>
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
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Item Category
                        </label>
                        <Input placeholder="e.g., Furniture, Electronics, Fashion" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Approximate Age
                        </label>
                        <Input placeholder="e.g., 1960s, 30 years" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        What would you like to sell?
                      </label>
                      <Input placeholder="e.g., Vintage oak dining table from the 1960s" />
                    </div>
                    
                    {/* Image Upload Section */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Upload Image
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="item-image"
                      />
                      
                      {!imagePreview ? (
                        <label
                          htmlFor="item-image"
                          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-accent/30 transition-colors"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 text-muted-foreground mb-3" />
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium text-primary">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP up to 10MB</p>
                          </div>
                        </label>
                      ) : (
                        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-border bg-accent/20">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-contain"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <ImageIcon className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-foreground truncate max-w-[200px]">{imageName}</span>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="h-8"
                                >
                                  Change
                                </Button>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={removeImage}
                                  className="h-8 w-8 p-0"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Tell us the story
                      </label>
                      <Textarea 
                        placeholder="Share the history, memories, and why this piece is special to you..."
                        rows={5}
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full group" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="animate-pulse">Submitting...</span>
                        </>
                      ) : (
                        <>
                          Submit Your Item
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </form>
                  <p className="text-center text-muted-foreground text-sm mt-6">
                    We'll review your submission and get back within 48 hours with next steps
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-accent/20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-4xl mb-6">✧</div>
            <blockquote className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed mb-6 italic">
              "Selling my grandmother's armoire was emotional, but Afterlife made it beautiful. 
              The new owner sent me photos of it in their home, filled with their family's treasures now. 
              It brought me to tears—happy ones."
            </blockquote>
            <p className="text-muted-foreground">
              — Claire B., Vermont
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sell;
