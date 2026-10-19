import React from 'react';
import { STORE_CONFIG } from '../data/storeInfo';
import { useShop } from '../context/ShopContext';
import { CategoryType } from '../types';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  ExternalLink, 
  Heart,
  Ruler,
  ShieldCheck
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { 
    setActiveCategory, 
    setIsLocationOpen, 
    setIsSizeGuideOpen, 
    setIsAdminOpen,
    setActiveReelProduct,
    products,
    getWhatsAppDirectLink 
  } = useShop();

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Brand & Address */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-900 flex items-center justify-center border border-gold-400">
                <Sparkles className="w-5 h-5 text-gold-300" />
              </div>
              <span className="font-heading text-2xl font-bold text-white tracking-tight">
                {STORE_CONFIG.name}
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Devdaha’s premier luxury ethnic couturière. Specializing in handcrafted necklines, pure silk sarees, heavy bridal lehengas, and royal anarkali suits tailored to perfection.
            </p>

            {/* Address */}
            <div className="space-y-2 text-xs text-stone-300 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>{STORE_CONFIG.address.fullFormatted}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Sun–Fri: 10:00 AM – 7:30 PM | Sat: 11:00 AM – 6:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`tel:${STORE_CONFIG.phone}`} className="hover:text-white transition-colors">
                  {STORE_CONFIG.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={STORE_CONFIG.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white transition-colors"
              >
                <span>TikTok: {STORE_CONFIG.handle}</span>
                <ExternalLink className="w-3 h-3 text-gold-300" />
              </a>

              <a
                href={STORE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white transition-colors"
              >
                <span>Instagram</span>
                <ExternalLink className="w-3 h-3 text-gold-300" />
              </a>
            </div>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => setActiveCategory('suits')}
                  className="hover:text-gold-300 transition-colors"
                >
                  Heavy & Casual Suits
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveCategory('lehengas')}
                  className="hover:text-gold-300 transition-colors"
                >
                  Bridal & Sangeet Lehengas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveCategory('sarees')}
                  className="hover:text-gold-300 transition-colors"
                >
                  Katan Banarasi & Organza Sarees
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveCategory('anarkalis')}
                  className="hover:text-gold-300 transition-colors"
                >
                  Royal Angrakha Anarkalis
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveCategory('all')}
                  className="hover:text-gold-300 transition-colors"
                >
                  View All Outfits
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Customer Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
              Customer Services
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => setIsLocationOpen(true)}
                  className="hover:text-gold-300 transition-colors"
                >
                  Store Location & Directions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="hover:text-gold-300 transition-colors"
                >
                  Ethnic Size & Measurement Guide
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const firstWithVideo = products.find(p => p.videoUrl) || products[0];
                    setActiveReelProduct(firstWithVideo);
                  }}
                  className="hover:text-gold-300 transition-colors"
                >
                  Watch TikTok Video Showcase
                </button>
              </li>
              <li>
                <a 
                  href={getWhatsAppDirectLink("Namaste! I want to inquire about custom bridal tailoring.")} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-300 transition-colors"
                >
                  Bespoke Tailoring Inquiry
                </a>
              </li>
              <li>
                <button 
                  onClick={() => setIsAdminOpen(true)}
                  className="hover:text-gold-300 text-stone-500 transition-colors"
                >
                  Staff Management Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Local Rupandehi Delivery & Payment */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
              Payments & Shipping
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              We accept digital wallets and deliver across Rupandehi and all districts in Nepal:
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] pt-1">
              <span className="px-2.5 py-1 bg-stone-900 text-emerald-400 rounded border border-stone-800 font-semibold">
                eSewa
              </span>
              <span className="px-2.5 py-1 bg-stone-900 text-purple-400 rounded border border-stone-800 font-semibold">
                Khalti
              </span>
              <span className="px-2.5 py-1 bg-stone-900 text-blue-400 rounded border border-stone-800 font-semibold">
                NIC Asia
              </span>
              <span className="px-2.5 py-1 bg-stone-900 text-amber-400 rounded border border-stone-800 font-semibold">
                COD
              </span>
            </div>
            <div className="text-[11px] text-stone-500 pt-2 space-y-1">
              <p>• Devdaha: Same-Day Delivery</p>
              <p>• Butwal & Bhairahawa: Next Day</p>
              <p>• Rest of Nepal: 2–4 Days</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>
            © {new Date().getFullYear()} {STORE_CONFIG.name}. All rights reserved. Devdaha -1, 6 No. Rijalchowk, Rupandehi.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-stone-400">Handle: <strong>{STORE_CONFIG.handle}</strong></span>
            <span>•</span>
            <span className="text-stone-400">Made with ❤️ for Ethnic Fashion</span>
          </div>
        </div>

      </div>

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={getWhatsAppDirectLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="hidden sm:inline font-bold text-xs tracking-wide">
          Chat with Devdaha Boutique
        </span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping absolute top-1 right-1"></span>
      </a>
    </footer>
  );
};
