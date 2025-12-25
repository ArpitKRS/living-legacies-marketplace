# Afterlife — Technical Architecture

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design tokens
- **Animation**: GSAP with ScrollTrigger plugin
- **Routing**: React Router v6
- **State Management**: React Context + hooks (expandable to Zustand)
- **UI Components**: shadcn/ui (Radix primitives)

### Typography
- **Display**: Playfair Display (serif, elegant)
- **Body**: Crimson Pro (readable serif)
- **Fallbacks**: Georgia, Times New Roman, serif

---

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn components
│   ├── layout/       # Navbar, Footer
│   ├── product/      # ProductCard, Timeline, Metrics, etc.
│   └── delivery/     # DeliveryJourney
├── data/
│   └── products.ts   # Mock data with rich histories
├── hooks/
│   └── useAnimations.ts  # GSAP animation hooks
├── pages/
│   ├── Index.tsx     # Landing page
│   ├── Browse.tsx    # Marketplace
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── About.tsx
│   └── NotFound.tsx
├── types/
│   └── product.ts    # TypeScript interfaces
└── lib/
    └── utils.ts      # Utility functions
```

---

## Design System

### Color Tokens (HSL)

```css
/* Warm, nostalgic palette */
--background: 35 30% 96%;      /* Aged cream */
--foreground: 25 20% 20%;      /* Warm charcoal */
--primary: 28 60% 50%;         /* Amber */
--secondary: 35 25% 88%;       /* Light sepia */
--accent: 30 40% 90%;          /* Warm highlight */
--muted: 30 15% 70%;           /* Soft brown */
--card: 35 25% 94%;            /* Paper-like */
--border: 30 20% 85%;          /* Subtle edge */
```

### Custom Shadows
```css
--shadow-warm: 0 4px 20px -4px hsl(30 50% 30% / 0.15);
--shadow-elevated: 0 12px 40px -8px hsl(30 50% 25% / 0.2);
```

---

## Animation Architecture

### Custom Hooks

Located in `src/hooks/useAnimations.ts`:

| Hook | Purpose |
|------|---------|
| `useFadeInOnScroll` | Reveal elements on scroll |
| `useParallax` | Parallax scroll effect |
| `useStaggerReveal` | Animate children sequentially |
| `useTimelineGrow` | Product timeline animation |
| `useHoverScale` | Subtle scale on hover |
| `useFloatingAnimation` | Gentle breathing motion |
| `useTextReveal` | Typewriter text effect |
| `useProgressRing` | Animated circular progress |
| `useCardStack` | Stacked card reveal |
| `useMagneticHover` | Cursor-following buttons |

### GSAP Best Practices

1. **Context Cleanup**
```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    // All GSAP animations here
  });
  return () => ctx.revert(); // Clean up
}, []);
```

2. **ScrollTrigger Registration**
```typescript
gsap.registerPlugin(ScrollTrigger);
```

3. **Performance Optimization**
```typescript
// Use scrub for smooth scroll-linked animations
scrollTrigger: {
  scrub: 0.5, // 0.5 second smoothing
}
```

---

## Data Models

### Product Interface
```typescript
interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: 'furniture' | 'electronics' | 'accessories' | 'collectibles';
  price: number;
  originalPrice?: number;
  images: string[];
  timeline: TimelineEvent[];
  metrics: ProductMetrics;
  memories: Memory[];
  reviews: Review[];
  conditionScore: number;
  yearMade: number;
  currentLocation: string;
  aiSummary?: string;
  longevityPrediction?: number;
  featured?: boolean;
  recentlyAdded?: boolean;
  readyForNewChapter?: boolean;
}
```

### Timeline Event
```typescript
interface TimelineEvent {
  id: string;
  type: 'birth' | 'first-owner' | 'usage' | 'milestone' | 
        'care' | 'restoration' | 'transition' | 'current';
  date: string;
  title: string;
  description: string;
  location?: string;
  memory?: string;
}
```

---

## Component Architecture

### Product Card
- Displays product image, name, tagline
- Shows key metrics (age, owners)
- Hover reveals additional info
- Links to ProductDetail page

### Product Timeline
- Vertical timeline with growing line
- Icons morph based on event type
- Scroll-driven reveal
- Parallax depth effects

### Product Metrics
- Animated progress rings
- Heartbeat pulse for care score
- Organic shape for sustainability

### Memory Particles
- Floating text snippets
- Hover reveals full memory
- Gentle idle animation

### Review Memory Cards
- Stacked card layout
- Visual decay for older reviews
- Expand on click

---

## Routing Structure

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Index | Landing page with hero |
| `/browse` | Browse | Product grid with filters |
| `/product/:id` | ProductDetail | Full product page |
| `/cart` | Cart | Shopping cart |
| `/about` | About | Philosophy page |
| `*` | NotFound | 404 page |

---

## Performance Considerations

### Optimization Strategies
1. **Lazy Loading**: Images load on scroll
2. **Code Splitting**: Route-based splitting
3. **Animation Throttling**: Debounce scroll handlers
4. **GSAP Contexts**: Proper cleanup prevents memory leaks

### Lighthouse Targets
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

---

## Future Backend Integration

When connecting to Supabase/backend:

### Database Tables
```sql
-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY,
  name TEXT,
  tagline TEXT,
  description TEXT,
  category TEXT,
  price DECIMAL,
  condition_score DECIMAL,
  year_made INTEGER,
  created_at TIMESTAMPTZ
);

-- Timeline Events
CREATE TABLE timeline_events (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  event_type TEXT,
  event_date DATE,
  title TEXT,
  description TEXT,
  location TEXT
);

-- Memories
CREATE TABLE memories (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  content TEXT,
  sentiment TEXT
);
```

### API Endpoints (Edge Functions)
- `GET /products` — List products with filters
- `GET /products/:id` — Single product with full history
- `POST /products` — Create listing (authenticated)
- `POST /cart` — Add to cart
- `POST /orders` — Complete purchase

---

## Deployment

### Environment Variables
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_STRIPE_PUBLIC_KEY=
```

### Build Command
```bash
npm run build
```

### Preview
```bash
npm run preview
```

---

## Testing Strategy

### Unit Tests
- Animation hook behavior
- Data transformation functions
- Component rendering

### Integration Tests
- Page routing
- Cart functionality
- Filter behavior

### Visual Regression
- Screenshot comparison for animations
- Cross-browser consistency
