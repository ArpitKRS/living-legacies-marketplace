import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Package, ChevronDown, ChevronUp, Clock, MapPin } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/context/OrderContext';
import { DeliveryJourney } from '@/components/delivery/DeliveryJourney';
import { cn } from '@/lib/utils';

const statusLabels = {
  'farewell': 'Farewell',
  'transit': 'In Transit',
  'near-arrival': 'Near Arrival',
  'new-beginning': 'Delivered'
};

const Orders = () => {
  const { orders } = useOrders();
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll('.order-card');
        gsap.set(items, { opacity: 0, y: 20 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 py-24 text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="font-serif text-3xl text-foreground mb-4">No orders yet</h1>
          <p className="text-muted-foreground mb-8">
            Start your journey by discovering treasures with stories to tell
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
            Your Journey
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground">
            Order History
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl">
            Track the journeys of your treasures as they make their way to their new home with you.
          </p>
        </div>

        <div ref={containerRef} className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="order-card bg-card rounded-xl border border-border overflow-hidden"
            >
              {/* Order Header */}
              <div 
                className="p-6 cursor-pointer hover:bg-accent/30 transition-colors"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={order.products[0].images[0]}
                        alt={order.products[0].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">
                          {order.id}
                        </span>
                        <span className={cn(
                          'px-2 py-0.5 rounded-full text-xs font-medium',
                          order.tracking.status === 'new-beginning' 
                            ? 'bg-primary/20 text-primary' 
                            : 'bg-accent text-muted-foreground'
                        )}>
                          {statusLabels[order.tracking.status]}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg text-foreground">
                        {order.products[0].name}
                        {order.products.length > 1 && (
                          <span className="text-muted-foreground text-sm ml-2">
                            +{order.products.length - 1} more
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {new Date(order.placedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {order.tracking.currentLocation}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-serif text-xl text-foreground">
                        ${order.totalAmount.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.tracking.journeyProgress}% complete
                      </p>
                    </div>
                    {expandedOrder === order.id ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-500"
                      style={{ width: `${order.tracking.journeyProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              <div className={cn(
                'overflow-hidden transition-all duration-500',
                expandedOrder === order.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              )}>
                <div className="border-t border-border p-6">
                  <DeliveryJourney tracking={order.tracking} />
                  
                  {/* Products in Order */}
                  {order.products.length > 1 && (
                    <div className="mt-8 pt-8 border-t border-border">
                      <h4 className="font-serif text-lg text-foreground mb-4">
                        Items in this order
                      </h4>
                      <div className="grid gap-4">
                        {order.products.map((product) => (
                          <div key={product.id} className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-serif text-foreground">{product.name}</p>
                              <p className="text-sm text-muted-foreground">{product.tagline}</p>
                            </div>
                            <p className="ml-auto font-serif text-foreground">
                              ${product.price.toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
