import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductTimeline } from '@/components/product/ProductTimeline';
import { ProductMetrics } from '@/components/product/ProductMetrics';
import { MemoryParticles } from '@/components/product/MemoryParticles';
import { ReviewMemoryCards } from '@/components/product/ReviewMemoryCards';
import { getProductById } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    gsap.fromTo(heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    );
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-foreground">Product not found</h1>
          <Link to="/browse" className="mt-4 inline-block text-primary">← Back to Browse</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="pt-24">
        <div className="container mx-auto px-4">
          <Link to="/browse" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Browse
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full">
                <span className="text-sm font-body">Condition: {product.conditionScore}/10</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <span className="text-sm font-body text-muted-foreground uppercase tracking-wider">
                {product.category} · {product.yearMade}
              </span>
              <h1 className="mt-3 text-4xl md:text-5xl font-serif font-semibold text-foreground">
                {product.name}
              </h1>
              <p className="mt-2 text-xl font-body text-primary italic">{product.tagline}</p>
              <p className="mt-6 font-body text-muted-foreground leading-relaxed">{product.longDescription}</p>

              <div className="mt-8 flex items-end gap-4">
                <span className="text-4xl font-serif font-bold text-foreground">${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">${product.originalPrice.toLocaleString()}</span>
                )}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 group">
                  <ShoppingBag className="mr-2 w-5 h-5" />
                  Continue This Story
                </Button>
              </div>

              {/* AI Summary */}
              <div className="mt-8 p-6 bg-card rounded-xl border border-border/50">
                <p className="text-sm text-muted-foreground mb-2">✧ AI Emotional Summary</p>
                <p className="font-body text-foreground italic">"{product.aiSummary}"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-semibold text-foreground text-center mb-4">The Life Story</h2>
          <p className="text-center text-muted-foreground font-body mb-12">Scroll to witness {product.metrics.usageYears} years of history</p>
          <ProductTimeline events={product.timeline} />
        </div>
      </section>

      {/* Metrics */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <ProductMetrics metrics={product.metrics} />
        </div>
      </section>

      {/* Memories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <MemoryParticles memories={product.memories} />
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <ReviewMemoryCards reviews={product.reviews} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;