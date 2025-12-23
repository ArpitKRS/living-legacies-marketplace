import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border/50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block">
              <h3 className="text-2xl font-serif font-semibold text-foreground">
                Afterlife
              </h3>
            </Link>
            <p className="mt-4 font-body text-muted-foreground max-w-md leading-relaxed">
              We believe every object has a soul. Our marketplace celebrates the stories, 
              memories, and journeys that make pre-loved treasures irreplaceable.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-2xl">✧</span>
              <span className="text-lg text-muted-foreground">◈</span>
              <span className="text-2xl">✧</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-medium text-foreground mb-4">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/browse', label: 'Browse All' },
                { href: '/browse?category=furniture', label: 'Furniture' },
                { href: '/browse?category=electronics', label: 'Electronics' },
                { href: '/browse?category=fashion', label: 'Fashion' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="story-link font-body text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-serif font-medium text-foreground mb-4">
              About
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'Our Story' },
                { href: '/philosophy', label: 'Philosophy' },
                { href: '/sustainability', label: 'Sustainability' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="story-link font-body text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-body text-muted-foreground">
            © {new Date().getFullYear()} Afterlife. Every piece has a story.
          </p>
          <p className="text-sm font-body text-muted-foreground/60 italic">
            "Nothing is truly lost if it finds a new home"
          </p>
        </div>
      </div>
    </footer>
  );
};