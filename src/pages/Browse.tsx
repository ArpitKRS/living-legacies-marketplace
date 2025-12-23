import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { products, getProductsByCategory } from '@/data/products';
import { ProductCategory } from '@/types/product';
import { cn } from '@/lib/utils';

const categories: { value: string; label: string }[] = [
  { value: 'all', label: 'All Treasures' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'accessories', label: 'Accessories' },
];

const Browse: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const gridRef = useRef<HTMLDivElement>(null);
  const filteredProducts = getProductsByCategory(activeCategory);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.children;
    gsap.fromTo(cards,
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
    );
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-foreground">
              Discover Treasures
            </h1>
            <p className="mt-4 font-body text-muted-foreground">
              Each piece carries decades of memories, waiting for you
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  'px-5 py-2 rounded-full font-body text-sm transition-all duration-300',
                  activeCategory === cat.value
                    ? 'bg-primary text-primary-foreground shadow-warm'
                    : 'bg-card text-muted-foreground hover:bg-muted border border-border/50'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Browse;