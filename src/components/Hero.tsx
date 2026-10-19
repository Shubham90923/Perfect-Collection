import React from 'react';
import { useShop } from '../context/ShopContext';
import { STORE_CONFIG } from '../data/storeInfo';
import { CATEGORIES_META } from '../data/products';
import { 
  Sparkles, 
  Film, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Scissors, 
  ShieldCheck, 
  Truck
} from 'lucide-react';
import { CategoryType } from '../types';

export const Hero: React.FC = () => {
  const { setActiveCategory, setActiveReelProduct, products, setIsLocationOpen } = useShop();

  const handleWatchReels = () => {
    const firstWithVideo = products.find(p => p.videoUrl) || products[0];
    setActiveReelProduct(firstWithVideo);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f9f5ed] to-[#fdfbf7] border-b border-stone-200">
      
      {/* Decorative Traditional Paisley / Mandala Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-200/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-200/25 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-12 sm:pb-16 relative z-10">
        
        {/* Main Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Social Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-50 border border-gold-300 text-gold-900 text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
              <span>Devdaha’s Premier Ethnic Boutique</span>
              <span className="text-stone-300">•</span>
              <a 
                href={STORE_CONFIG.tiktokUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline font-bold text-brand-900"
              >
                {STORE_CONFIG.handle}
              </a>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15]">
              Intricate Necklines. <br />
              <span className="bg-gradient-to-r from-brand-900 via-brand-700 to-gold-700 bg-clip-text text-transparent">
                Heirloom Elegance.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover pure silk sarees, handcrafted zardozi suits, opulent bridal lehengas, and royal flared anarkalis. Experience the tactile luxury at our boutique in <strong className="text-stone-900">Devdaha -1, 6 No. Rijalchowk</strong>, or order directly via WhatsApp with tailored stitching.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <a
                href="#catalog-section"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-900 hover:bg-brand-950 text-white font-semibold text-sm shadow-lg shadow-brand-950/15 hover:shadow-xl transition-all duration-200 active:scale-95"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleWatchReels}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 border border-brand-300 text-brand-900 font-semibold text-sm shadow-sm hover:shadow transition-all duration-200 group"
              >
                <Film className="w-4 h-4 text-brand-600 group-hover:scale-110 transition-transform" />
                <span>Watch Video Showcase</span>
                <span className="px-1.5 py-0.5 text-[10px] bg-red-100 text-red-700 rounded font-bold">New</span>
              </button>

              <button
                onClick={() => setIsLocationOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-sm transition-all"
              >
                <MapPin className="w-4 h-4 text-gold-700" />
                <span>Store Location</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-stone-200/70 text-left">
              <div className="flex items-center gap-2">
                <Scissors className="w-4 h-4 text-gold-600 shrink-0" />
                <span className="text-xs font-medium text-stone-700">Custom Tailoring</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-gold-600 shrink-0" />
                <span className="text-xs font-medium text-stone-700">Devdaha Free Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                <span className="text-xs font-medium text-stone-700">Authentic Fabrics</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0" />
                <span className="text-xs font-medium text-stone-700">eSewa / COD / Khalti</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase Carousel Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Main Image Frame with Gold Border */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                <img 
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80" 
                  alt="Perfect Collection Ethnic Wear Showcase" 
                  className="w-full h-[460px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20 pointer-events-none"></div>

                {/* Floating Product Highlight Tag */}
                <div className="absolute top-4 left-4 glass-dark text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/20 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-medium tracking-wide">Featured Bridal & Festive '26</span>
                </div>

                {/* Floating Video Preview Button */}
                <button
                  onClick={handleWatchReels}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-stone-900 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-semibold shadow-lg transition-all active:scale-95"
                >
                  <Film className="w-3.5 h-3.5 text-brand-600" />
                  <span>Clip</span>
                </button>

                {/* Bottom Card Details */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-gold-300 uppercase tracking-wider">
                        Neckline & Border Spotlight
                      </span>
                      <h3 className="font-heading text-lg font-bold">
                        Gulabi Zardozi Chanderi Suit
                      </h3>
                      <p className="text-xs text-stone-300">
                        Handcrafted Dabka & Pearl Resham Neckline
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-stone-400 line-through">Rs. 8,500</span>
                      <p className="text-base font-bold text-gold-300">Rs. 6,850</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating Testimonial Pill */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white p-3.5 rounded-xl shadow-xl border border-stone-200/80 max-w-[240px] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-900 font-bold text-sm shrink-0">
                  PT
                </div>
                <div>
                  <div className="flex text-amber-400 text-xs">★★★★★</div>
                  <p className="text-[11px] font-semibold text-stone-800 line-clamp-1">
                    "Stunning neckline work!"
                  </p>
                  <p className="text-[10px] text-stone-500">Pooja T. • Devdaha -1</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Categories Bar */}
        <div className="mt-14 pt-8 border-t border-stone-200">
          <div className="text-center sm:text-left mb-6">
            <h2 className="font-heading text-2xl font-bold text-stone-900">
              Curated Collections
            </h2>
            <p className="text-xs text-stone-500">
              Browse our premier offerings or filter by your favorite silhouette
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES_META.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as CategoryType);
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md border border-stone-200 transition-all duration-300 bg-white"
              >
                <div className="h-32 sm:h-36 overflow-hidden">
                  <img 
                    src={cat.bannerImage} 
                    alt={cat.label} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent"></div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-base sm:text-lg font-bold group-hover:text-gold-300 transition-colors">
                      {cat.label}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full">
                      {cat.count} Designs
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-300 line-clamp-1">
                    {cat.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
