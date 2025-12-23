import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Review } from '@/types/product';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface ReviewMemoryCardsProps {
  reviews: Review[];
  className?: string;
}

interface ReviewCardProps {
  review: Review;
  index: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Calculate opacity based on age (older reviews are more faded)
  const ageOpacity = Math.max(0.5, 1 - (review.age / 365) * 0.5);
  const rotation = (index % 2 === 0 ? 1 : -1) * (1 + Math.random() * 2);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    // Subtle idle animation
    gsap.to(card, {
      y: -5,
      rotation: rotation + (Math.random() - 0.5),
      duration: 3 + Math.random() * 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, [rotation]);

  const handleExpand = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      scale: 1.02,
      zIndex: 50,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleCollapse = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      scale: 1,
      zIndex: 10 - index,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative bg-card rounded-xl p-6 shadow-soft cursor-pointer',
        'border border-border/50 transition-shadow duration-500',
        'hover:shadow-warm',
      )}
      style={{
        opacity: ageOpacity,
        transform: `rotate(${rotation}deg)`,
        zIndex: 10 - index,
      }}
      onMouseEnter={handleExpand}
      onMouseLeave={handleCollapse}
    >
      {/* Age indicator */}
      <div className="absolute -top-2 -right-2 px-2 py-1 bg-sepia/20 rounded-full">
        <span className="text-xs text-muted-foreground">
          {review.age < 30 ? 'Recent' : review.age < 180 ? `${Math.floor(review.age / 30)} months ago` : `${Math.floor(review.age / 365)} years ago`}
        </span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
          <span className="text-lg font-serif text-foreground">
            {review.author.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-serif font-medium text-foreground">{review.author}</p>
          <p className="text-xs text-muted-foreground">
            Caretaker for {review.yearsOwned} {review.yearsOwned === 1 ? 'year' : 'years'}
          </p>
        </div>
      </div>

      {/* Content */}
      <p className="font-body text-foreground/90 leading-relaxed mb-4 italic">
        "{review.content}"
      </p>

      {/* Emotional summary */}
      <div className="mb-4 px-3 py-2 bg-primary/5 rounded-lg">
        <p className="text-sm text-primary font-body">
          ✧ {review.emotionalSummary}
        </p>
      </div>

      {/* Memories */}
      {review.memories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {review.memories.map((memory, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs font-body bg-muted/50 text-muted-foreground rounded-full"
            >
              {memory}
            </span>
          ))}
        </div>
      )}

      {/* Decorative corner */}
      <div className="absolute bottom-2 right-2 text-muted-foreground/20 text-xl">
        ❧
      </div>
    </div>
  );
};

export const ReviewMemoryCards: React.FC<ReviewMemoryCardsProps> = ({ reviews, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.children;

    gsap.set(cards, { opacity: 0, y: 60, scale: 0.9 });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [reviews]);

  return (
    <div className={cn('py-12', className)}>
      <div className="text-center mb-10">
        <h3 className="text-2xl font-serif font-semibold text-foreground">
          Voices of the Past
        </h3>
        <p className="text-muted-foreground font-body mt-2">
          Stories from those who cared for this piece
        </p>
      </div>

      <div 
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
      >
        {reviews.map((review, index) => (
          <ReviewCard key={review.id} review={review} index={index} />
        ))}
      </div>

      {/* Note about no star ratings */}
      <p className="text-center text-sm text-muted-foreground/60 mt-8 font-body italic">
        We don't believe in stars. Every connection is unique.
      </p>
    </div>
  );
};