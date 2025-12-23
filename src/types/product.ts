// ============================================
// AFTERLIFE - Product Type Definitions
// ============================================

export type ProductCategory = 
  | 'furniture' 
  | 'electronics' 
  | 'fashion' 
  | 'accessories' 
  | 'art' 
  | 'books' 
  | 'music';

export type TimelineEventType = 
  | 'birth' 
  | 'first-owner' 
  | 'usage' 
  | 'milestone' 
  | 'restoration' 
  | 'care' 
  | 'transition' 
  | 'current';

export type DeliveryStatus = 
  | 'farewell' 
  | 'transit' 
  | 'near-arrival' 
  | 'new-beginning';

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  date: string;
  title: string;
  description: string;
  location?: string;
  icon?: string;
  memory?: string; // Emotional memory attached to this event
}

export interface ProductMetrics {
  usageYears: number;
  careScore: number; // 0-100
  trustLevel: number; // 0-100
  sustainabilityImpact: number; // CO2 saved in kg
  previousOwners: number;
  journeyMiles: number;
}

export interface Memory {
  id: string;
  text: string;
  author?: string;
  date?: string;
  sentiment: 'warm' | 'nostalgic' | 'joyful' | 'bittersweet';
}

export interface Review {
  id: string;
  author: string;
  authorAvatar?: string;
  date: string;
  content: string;
  emotionalSummary: string;
  yearsOwned: number;
  memories: string[];
  age: number; // How old the review is in days (for visual decay)
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  images: string[];
  
  // The Story
  timeline: TimelineEvent[];
  metrics: ProductMetrics;
  memories: Memory[];
  reviews: Review[];
  
  // Metadata
  conditionScore: number; // 0-10 (subtle, secondary)
  yearMade: number;
  currentLocation: string;
  aiSummary: string; // AI-generated emotional summary
  longevityPrediction: number; // Years of expected remaining life
  
  // Flags
  featured?: boolean;
  recentlyAdded?: boolean;
  readyForNewChapter?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface DeliveryTracking {
  orderId: string;
  product: Product;
  status: DeliveryStatus;
  statusHistory: {
    status: DeliveryStatus;
    date: string;
    message: string;
  }[];
  estimatedArrival: string;
  currentLocation: string;
  journeyProgress: number; // 0-100
}