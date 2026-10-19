
import React from 'react';
import { cn } from '@/lib/utils';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-graphite-dark text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <a href="/" className="inline-block mb-6">
              <span className="text-3xl font-serif italic tracking-wide text-gold">lumi</span>
            </a>
            <p className="mb-6 text-white/70 max-w-sm">
              A jewelry atlas that illuminates transparency, knowledge, and trust 
              in the world of precious metals and gemstones.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-4">Navigate</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">Discover</a></li>
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">Compare</a></li>
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">Journal</a></li>
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-4">Subscribe</h4>
            <p className="text-white/70 mb-4">Stay updated with our latest insights.</p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-gold"
              />
              <Button className="bg-gold hover:bg-gold-dark">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/50 text-sm">
            © {new Date().getFullYear()} Lumi. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
