import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Trash2, ArrowRight, Clock, Heart, Package } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, getCartCount } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalYears = cartItems.reduce((sum, item) => sum + item.product.metrics.usageYears, 0);
  const totalMemories = cartItems.reduce((sum, item) => sum + item.product.memories.length, 0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cart items
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll('.cart-item');
        gsap.set(items, { opacity: 0, x: -30 });
        gsap.to(items, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        });
      }

      // Animate summary
      if (summaryRef.current) {
        gsap.from(summaryRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleRemoveItem = (productId: string) => {
    const itemEl = document.querySelector(`[data-product-id="${productId}"]`);
    if (itemEl) {
      gsap.to(itemEl, {
        opacity: 0,
        x: -50,
        height: 0,
        marginBottom: 0,
        padding: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          removeFromCart(productId);
        },
      });
    } else {
      removeFromCart(productId);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 py-24 text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="font-serif text-3xl text-foreground mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Discover treasures waiting for their next chapter
          </p>
          <Button asChild>
            <Link to="/browse">Browse Collection</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <p className="text-primary/70 font-medium tracking-widest uppercase text-sm mb-2">
            Your Selection
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground">
            Preparing for Transition
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div ref={containerRef} className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                data-product-id={item.product.id}
                className="cart-item bg-card rounded-xl border border-border p-6 overflow-hidden"
              >
                <div className="flex gap-6">
                  {/* Image */}
                  <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Link 
                          to={`/product/${item.product.id}`}
                          className="font-serif text-xl text-foreground hover:text-primary transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-muted-foreground text-sm italic">
                          {item.product.tagline}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-2"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Mini Timeline */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {item.product.metrics.usageYears} years old
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3.5 w-3.5" />
                        {item.product.metrics.previousOwners} previous {item.product.metrics.previousOwners === 1 ? 'owner' : 'owners'}
                      </span>
                    </div>

                    {/* Timeline preview */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {item.product.timeline.slice(0, 4).map((event, i) => (
                        <div
                          key={event.id}
                          className="flex-shrink-0 px-3 py-1.5 bg-accent/50 rounded-full text-xs text-muted-foreground"
                        >
                          {event.title}
                        </div>
                      ))}
                      {item.product.timeline.length > 4 && (
                        <div className="flex-shrink-0 px-3 py-1.5 bg-primary/10 rounded-full text-xs text-primary">
                          +{item.product.timeline.length - 4} more
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                      <span className="text-muted-foreground text-sm">
                        Condition: {item.product.conditionScore}/10
                      </span>
                      <span className="font-serif text-xl text-foreground">
                        ${item.product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div ref={summaryRef} className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
              <h2 className="font-serif text-2xl text-foreground mb-6">
                Order Summary
              </h2>

              {/* Emotional Summary */}
              <div className="bg-accent/30 rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-3">
                  You're about to inherit:
                </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">Combined history</span>
                      <span className="text-primary font-medium">{totalYears} years</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">Attached memories</span>
                    <span className="text-primary font-medium">{totalMemories} memories</span>
                  </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">Stories to continue</span>
                      <span className="text-primary font-medium">{cartItems.length}</span>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Careful packaging</span>
                  <span className="text-foreground">$25</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Transition fee</span>
                  <span className="text-primary">Free</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="font-serif text-lg text-foreground">Total</span>
                    <span className="font-serif text-2xl text-foreground">
                      ${(subtotal + 25).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <Button className="w-full group" size="lg">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Each purchase includes certificate of authenticity and full history documentation
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
