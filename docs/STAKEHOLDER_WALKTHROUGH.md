# Afterlife — Stakeholder Walkthrough

## Overview

This document provides a guided tour through the Afterlife marketplace experience, explaining the user journey and design decisions at each step.

---

## 1. Landing Page — First Impressions

### What Users See
When users arrive at Afterlife, they're greeted by a cinematic hero section:

- **Floating word particles**: Terms like "memories," "heritage," "soul" drift gently across the screen, setting the emotional tone before any product is shown
- **Hero headline**: "Welcome to Afterlife" with elegant serif typography
- **Subtle parallax**: Background moves at a different rate than foreground, creating depth
- **Philosophy strip**: Four core values presented with iconography

### Design Intent
Traditional marketplaces show products immediately. We delay that to **establish emotional context first**. Users should understand this isn't eBay before they see a single item.

### Key Animation
The hero text fades in sequentially with a staggered delay, mimicking the pace of turning pages in an old book.

---

## 2. Featured Products — The Hook

### What Users See
Below the hero, featured products appear with:
- Product image with warm color grading
- Name and tagline (emotional, not descriptive)
- Key metrics: age, previous owners
- Subtle hover effect suggesting depth

### Design Intent
Products are presented as **treasures, not inventory**. The tagline ("Sixty years of sunlit mornings") tells a story, not specifications.

### Key Animation
Products reveal with a staggered cascade effect—each card enters slightly after the previous, creating a sense of discovery.

---

## 3. Browse Page — Exploration Mode

### What Users See
- Category filters at the top
- Grid of product cards
- Each card shows minimal but evocative information
- Clicking a category smoothly filters (no page reload)

### Design Intent
Browsing should feel like **wandering through a curated gallery**, not searching a catalog. Categories are emotional ("Furniture with Memories") rather than utilitarian.

### Key Animation
When filters change, products fade out and new ones fade in with organic timing—no harsh transitions.

---

## 4. Product Detail — The Heart of Afterlife

This is the most animation-rich page, designed to be a **digital exhibit**.

### Section: Hero Image
- Large product image with subtle vignette
- Name and tagline prominently displayed
- Condition score as a small, non-intrusive badge

### Section: The Timeline
**The centerpiece experience.**

As users scroll:
1. A vertical line grows from top to bottom
2. Timeline events (birth, owners, milestones, restoration) reveal as the line reaches them
3. Each event has an icon that subtly pulses
4. Event cards have slight parallax, creating depth

**Example Event Flow:**
- "1962 — Crafted in Copenhagen" (birth icon)
- "1962-1985 — The Professor's Study" (usage icon)
- "1985 — Passed to Daughter" (transition icon)
- "2023 — Loving Restoration" (care icon)
- "Now — Ready for New Chapter" (current icon)

### Section: Product Metrics
Instead of text stats, we use **animated visual indicators**:
- **Usage Years**: Arc that fills as user scrolls
- **Care Score**: Heartbeat-style pulsing indicator
- **Trust Level**: Glowing fill bar
- **Sustainability Impact**: Organic morphing shape

### Section: Memory Particles
Floating text snippets representing emotional attachments:
- "Where Dad read us Tolkien"
- "The creak that meant grandpa was home"
- Hover reveals full memory with gentle expansion

### Section: Reviews as Memory Cards
Reviews don't have star ratings. Instead:
- Cards stack with slight rotations
- Older reviews appear more faded
- Clicking expands with depth illusion
- Each review includes emotional summary and years owned

### Design Intent
The product page should take **3+ minutes to experience fully**. Users should feel like they've visited a museum exhibit, not a product listing.

---

## 5. Cart — Preparing for Transition

### What Users See
- Products displayed with mini-timelines
- Emotional summary: "You're inheriting 95 years of combined history"
- Removal animation is gentle (item fades and collapses)
- Price summary includes "transition fee" (free) and "careful packaging"

### Design Intent
The cart reframes purchase as **inheritance**. Users aren't just checking out—they're accepting responsibility for continuing a story.

---

## 6. Delivery Tracking — The Journey

### What Users See (Post-Purchase)
A story-arc visualization instead of boring tracking steps:

| Traditional | Afterlife |
|------------|-----------|
| Order Placed | The Farewell |
| In Transit | The Journey |
| Out for Delivery | Almost Home |
| Delivered | A New Beginning |

### Animation
- Path draws progressively between stages
- Current stage pulses gently
- Final delivery triggers celebration animation

### Design Intent
Waiting for a package should build **anticipation, not impatience**. Each stage has emotional weight.

---

## 7. About Page — Our Philosophy

### What Users See
- Origin story with scroll-triggered paragraph reveals
- Core values as animated cards
- Quote section with scale-in animation
- Process steps with connecting line that draws on scroll

### Design Intent
For users who want to understand our "why." Reinforces that this isn't just another marketplace—it's a movement.

---

## User Journey Summary

```
Landing → Emotional priming with floating words and philosophy
    ↓
Featured → See curated treasures with evocative taglines
    ↓
Browse → Explore categories like a gallery
    ↓
Product Detail → Deep dive with timeline and memories (3+ min)
    ↓
Cart → Transition framing, emotional summary
    ↓
Checkout → (Future) Commit to custodianship
    ↓
Delivery → Story-arc tracking builds anticipation
    ↓
Receipt → Item arrives with full history documentation
```

---

## Metrics We Track

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Time on Product Page | 3+ min | Indicates engagement with story |
| Scroll Depth | 80%+ | Users experience full timeline |
| Memory Hover Rate | 50%+ | Curiosity about emotional details |
| Cart "Inheritance" View | 90%+ | Users see emotional summary |
| Return Visit Rate | 40%+ | Building loyalty and trust |

---

## Competitive Advantage

What makes Afterlife different at a glance:

1. **Story-first, price-second**: Emotional value is surfaced before cost
2. **Animation as storytelling**: Motion reveals history, not decorates
3. **Custodian language**: "Owners" become "chapters," "buyers" become "inheritors"
4. **Memory layers**: Every product has invisible emotional depth to discover

---

## Future Roadmap Highlights

1. **Owner Reunions**: Connect past and present owners
2. **Audio Memories**: Voice recordings from previous owners
3. **AR Placement**: See items in your space with history overlay
4. **Community Stories**: Buyers continue timelines with their own chapters

---

## Conclusion

Afterlife transforms the second-hand shopping experience from transactional to **transformational**. Every design and animation decision reinforces our core belief:

> Objects aren't just things. They're vessels for human experience.

When users buy from Afterlife, they're not just getting a product—they're inheriting a legacy.
