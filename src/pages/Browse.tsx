import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { getProductsByCategory } from '@/data/products';
import { cn } from '@/lib/utils';

const categories: { value: string; label: string }[] = [
  { value: 'all', label: 'All Treasures' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'accessories', label: 'Accessories' },
];

const Browse: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const gridRef = useRef<HTMLDivElement>(null);
  const filteredProducts = getProductsByCategory(activeCategory);

  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  // Sync state with URL on mount/navigation
  useEffect(() => {
    const urlCategory = searchParams.get('category') || 'all';
    if (urlCategory !== activeCategory) {
      setActiveCategory(urlCategory);
    }
  }, [searchParams]);

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
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={cn(
                  'relative px-6 py-3 rounded-xl font-body text-sm transition-all duration-300 overflow-hidden group',
                  activeCategory === cat.value
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                    : 'bg-card/80 text-muted-foreground hover:text-foreground border border-border/50 hover:border-primary/30 hover:shadow-md'
                )}
              >
                <span className="relative z-10">{cat.label}</span>
                {activeCategory !== cat.value && (
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
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