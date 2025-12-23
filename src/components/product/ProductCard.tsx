import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Product } from '@/types/product';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0, className }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    // Initial reveal animation is handled by parent container
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!cardRef.current || !imageRef.current) return;

    gsap.to(cardRef.current, {
      y: -8,
      duration: 0.4,
      ease: 'power2.out',
    });

    gsap.to(imageRef.current, {
      scale: 1.05,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!cardRef.current || !imageRef.current) return;

    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
    });

    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  return (
    <Link to={`/product/${product.id}`}>
      <article
        ref={cardRef}
        className={cn(
          'group relative bg-card rounded-xl overflow-hidden',
          'border border-border/50 shadow-soft',
          'transition-shadow duration-500',
          'hover:shadow-warm',
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <div
            ref={imageRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${product.images[0]})` }}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Featured badge */}
          {product.featured && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full">
              <span className="text-xs font-body text-primary-foreground">Featured</span>
            </div>
          )}

          {/* Quick stats overlay */}
          <div className={cn(
            'absolute bottom-0 left-0 right-0 p-4',
            'flex items-center justify-between',
            'transform transition-all duration-500',
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          )}>
            <div className="flex items-center gap-4 text-primary-foreground text-sm">
              <span className="flex items-center gap-1">
                <span className="opacity-70">⏱</span>
                {product.metrics.usageYears}y
              </span>
              <span className="flex items-center gap-1">
                <span className="opacity-70">♡</span>
                {product.metrics.previousOwners} owners
              </span>
              <span className="flex items-center gap-1">
                <span className="opacity-70">✧</span>
                {product.metrics.journeyMiles.toLocaleString()}mi
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category */}
          <span className="text-xs font-body text-muted-foreground uppercase tracking-wider">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="mt-2 text-lg font-serif font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="mt-1 text-sm font-body text-muted-foreground italic line-clamp-1">
            {product.tagline}
          </p>

          {/* Price and condition */}
          <div className="mt-4 flex items-end justify-between">
            <div>
              <span className="text-xl font-serif font-semibold text-foreground">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="ml-2 text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            
            {/* Subtle condition score */}
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Condition</span>
              <span className="text-sm font-medium">{product.conditionScore}/10</span>
            </div>
          </div>
        </div>

        {/* Decorative corner */}
        <div className="absolute top-3 right-3 text-foreground/10 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          ❧
        </div>
      </article>
    </Link>
  );
};