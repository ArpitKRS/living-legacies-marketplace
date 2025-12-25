# Afterlife — UX & Animation Design Guide

## Design Philosophy

### Core Principle: Animations as Storytelling

In Afterlife, animations aren't decorative—they're **narrative tools**. Every motion should evoke the feeling of:
- Turning pages in an old photo album
- Watching memories resurface
- Time passing slowly and meaningfully

### Emotional Tone
- **Pace**: Slow, deliberate, never rushed
- **Easing**: Organic curves (power2, power3, sine)
- **Rhythm**: Like breathing—expand, pause, contract

---

## Animation Catalog

### 1. Page Transitions

**Purpose**: Create continuity between pages, like chapters in a book.

```typescript
// Implementation
gsap.fromTo(page, 
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
);
```

**Guidelines**:
- Duration: 400-600ms
- Never use hard cuts
- Fade + subtle movement preferred

---

### 2. Scroll-Triggered Reveals

**Purpose**: Reward scrolling with gradual discovery.

**Types**:
- **Fade Up**: Default for text and cards
- **Stagger Reveal**: For grids and lists
- **Parallax**: For hero images and backgrounds

```typescript
// Stagger reveal example
gsap.to(cards, {
  opacity: 1,
  y: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: container,
    start: 'top 80%',
  },
});
```

**Guidelines**:
- Start animations when element is 75-85% in viewport
- Stagger: 100-150ms between items
- Don't animate everything—pick focal points

---

### 3. Product Timeline Animation

**Purpose**: Visualize the passage of time as user scrolls.

**Behavior**:
1. Vertical line grows from top as user scrolls
2. Timeline events fade in when line reaches them
3. Icons morph or pulse at key moments
4. Parallax depth on event cards

```typescript
// Timeline line growth
gsap.to(line, {
  scaleY: 1,
  ease: 'none',
  scrollTrigger: {
    trigger: container,
    start: 'top 70%',
    end: 'bottom 30%',
    scrub: 0.5,
  },
});
```

**Guidelines**:
- Use scrub for direct scroll connection
- Events should feel like they're being "uncovered"
- Color shift from muted to vibrant as events reveal

---

### 4. Floating Particles (Memory Layer)

**Purpose**: Create ambient emotion, suggest memories drifting.

**Behavior**:
- Gentle vertical oscillation (±10-20px)
- Slight rotation (±5°)
- Random delays between particles
- Hover reveals full memory text

```typescript
gsap.to(particle, {
  y: -15,
  rotation: 3,
  duration: 5,
  ease: 'sine.inOut',
  repeat: -1,
  yoyo: true,
});
```

**Guidelines**:
- Never more than 10-12 particles visible
- Opacity: 20-40% when idle
- Movement should be imperceptible at first glance

---

### 5. Progress Ring Animation

**Purpose**: Visualize metrics without plain text.

**Behavior**:
- Circle fills as user scrolls into view
- Percentage counter animates up
- Subtle glow effect on completion

```typescript
gsap.to(circle, {
  strokeDashoffset: targetOffset,
  duration: 1.5,
  ease: 'power2.out',
  scrollTrigger: { trigger: circle, start: 'top 80%' },
});
```

**Guidelines**:
- Duration: 1.5-2s for full reveal
- Use color to indicate quality (amber → green gradient)
- Add subtle pulse on completion

---

### 6. Card Stack Effect (Reviews)

**Purpose**: Make reviews feel like layered memories, not a list.

**Behavior**:
- Cards appear stacked with slight rotations
- Stagger reveal from bottom
- Expand smoothly on click
- Older reviews have lower opacity/saturation

```typescript
gsap.set(cards, {
  opacity: 0,
  y: 50,
  rotation: (i) => (i % 2 === 0 ? 2 : -2),
});
```

**Guidelines**:
- Max 3-5 visible before expansion
- Rotation: ±2-3° for organic feel
- Older = more "faded" (opacity 0.6-0.8)

---

### 7. Hover Interactions

**Purpose**: Encourage exploration, reward curiosity.

**Types**:
- **Scale**: Subtle lift effect (1.02-1.05x)
- **Shadow Growth**: Suggests picking up
- **Magnetic**: Cursor attraction for CTAs

```typescript
// Magnetic hover
const handleMouseMove = (e) => {
  const rect = element.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  
  gsap.to(element, {
    x: x * 0.3,
    y: y * 0.3,
    duration: 0.3,
  });
};
```

**Guidelines**:
- Scale hovers: 200-300ms duration
- Always include mouseout reset
- Don't over-use magnetic effect (CTAs only)

---

### 8. Delivery Journey Animation

**Purpose**: Transform tracking into storytelling.

**Behavior**:
- Path draws progressively
- Stage icons pulse when reached
- Emotional labels for each stage
- Celebration animation on arrival

**Stages**:
1. "Farewell" — Package leaves seller
2. "In Transit" — Journey begins
3. "Almost There" — Anticipation builds
4. "New Beginning" — Arrival celebration

**Guidelines**:
- Use SVG path drawing for journey line
- Each stage should have unique icon animation
- Final stage: confetti or gentle sparkle effect

---

## Performance Guidelines

### Critical Rules
1. **Use GSAP contexts**: Always clean up with `ctx.revert()`
2. **Throttle scroll events**: Don't animate on every pixel
3. **Prefer transforms**: `transform` and `opacity` only for smooth 60fps
4. **Lazy load animations**: Only initialize when section is near viewport

### Testing Checklist
- [ ] Animations smooth on 60Hz displays
- [ ] No jank on mobile Safari
- [ ] Reduced motion respected (`prefers-reduced-motion`)
- [ ] Memory leaks checked (no orphan ScrollTriggers)

---

## Accessibility

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Keyboard Navigation
- All interactive elements must be focusable
- Focus states should be visible and styled
- Animations shouldn't block content access

---

## Color & Motion Relationship

| Emotion | Motion Style | Easing |
|---------|--------------|--------|
| Nostalgia | Slow, drifting | sine.inOut |
| Discovery | Staggered reveals | power3.out |
| Joy | Bouncy, playful | elastic.out |
| Trust | Steady, predictable | power2.out |
| Anticipation | Building tension | power2.in |

---

## Implementation Checklist

For each new animated component:

1. [ ] Define purpose (what emotion/story does this serve?)
2. [ ] Choose appropriate easing and duration
3. [ ] Implement with GSAP hook or inline
4. [ ] Add ScrollTrigger if scroll-linked
5. [ ] Test performance on low-end device
6. [ ] Verify cleanup on unmount
7. [ ] Check reduced motion fallback
