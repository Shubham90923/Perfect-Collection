import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { STORE_CONFIG } from '../data/storeInfo';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  MapPin, 
  Film, 
  Ruler, 
  ShieldCheck, 
  Phone, 
  Menu, 
  X,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { CategoryType } from '../types';

export const Header: React.FC = () => {
  const { 
    cartItemCount, 
    wishlist, 
    setIsCartOpen, 
    setIsLocationOpen, 
    setIsSizeGuideOpen, 
    setIsAdminOpen,
    setActiveReelProduct,
    products,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories: { id: CategoryType | 'all'; label: string }[] = [
    { id: 'all', label: 'All Collections' },
    { id: 'suits', label: 'Suits' },
    { id: 'lehengas', label: 'Lehengas' },
    { id: 'sarees', label: 'Sarees' },
    { id: 'anarkalis', label: 'Anarkali Suits' },
  ];

  const handleOpenReels = () => {
    const firstWithVideo = products.find(p => p.videoUrl) || products[0];
    setActiveReelProduct(firstWithVideo);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fdfbf7]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top Notification Announcement Bar */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-stone-900 text-stone-100 text-xs py-2 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium tracking-wide text-gold-300">
              <MapPin className="w-3.5 h-3.5 text-gold-400 animate-bounce" />
              Boutique: Devdaha -1, 6 No. Rijalchowk, Rupandehi
            </span>
            <span className="hidden md:inline text-stone-400">•</span>
            <span className="hidden md:inline text-stone-200">
              Free Devdaha Delivery & Nationwide Nepal Shipping
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href={STORE_CONFIG.tiktokUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1 text-gold-200 hover:text-white transition-colors"
            >
              <span>TikTok: <strong>{STORE_CONFIG.handle}</strong></span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span className="text-stone-500">|</span>
            <a 
              href={`tel:${STORE_CONFIG.phone}`} 
              className="inline-flex items-center gap-1 text-stone-300 hover:text-white"
            >
              <Phone className="w-3 h-3 text-gold-400" />
              <span>{STORE_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:text-brand-900 hover:bg-stone-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveCategory('all')}>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-800 to-brand-950 flex items-center justify-center shadow-md border border-gold-400/40">
              <Sparkles className="w-6 h-6 text-gold-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-brand-950">
                  Perfect Collection
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-gold-100 text-gold-800 rounded-full border border-gold-300">
                  Devdaha
                </span>
              </div>
              <p className="text-[11px] font-medium tracking-widest text-stone-500 uppercase -mt-0.5">
                Luxury Ethnic Couturière • @perfect.collectio4
              </p>
            </div>
          </div>

          {/* Desktop Category Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-900 text-white shadow-sm font-semibold'
                      : 'text-stone-700 hover:text-brand-900 hover:bg-stone-100'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>

          {/* Action Tools & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Toggle / Input */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-stone-100 rounded-full pl-3 pr-2 py-1.5 border border-stone-300 shadow-inner w-44 sm:w-64 transition-all">
                  <Search className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search necklines, silk, suits..."
                    autoFocus
                    className="bg-transparent border-none outline-none text-xs text-stone-800 w-full"
                  />
                  <button 
                    onClick={() => { setSearchQuery(''); setSearchOpen(false); }}
                    className="p-1 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2.5 rounded-full text-stone-700 hover:text-brand-900 hover:bg-stone-100 transition-colors"
                  title="Search catalog"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Video Reels Showcase Button */}
            <button
              onClick={handleOpenReels}
              className="relative hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-brand-900 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-full transition-all shadow-sm group"
              title="Watch TikTok Video Showcase"
            >
              <Film className="w-4 h-4 text-brand-600 group-hover:scale-110 transition-transform" />
              <span>Reels Feed</span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            </button>

            {/* Store Visit / Map Button */}
            <button
              onClick={() => setIsLocationOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 hover:text-brand-950 bg-stone-100 hover:bg-stone-200/80 rounded-full transition-all"
              title="Store location at Devdaha -1, 6 No. Rijalchowk"
            >
              <MapPin className="w-4 h-4 text-gold-600" />
              <span>Visit Store</span>
            </button>

            {/* Size Guide */}
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="p-2.5 rounded-full text-stone-600 hover:text-brand-900 hover:bg-stone-100 transition-colors hidden sm:block"
              title="Ethnic Measurement & Size Guide"
              aria-label="Size Guide"
            >
              <Ruler className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => {
                if (wishlist.length > 0) {
                  // Filter by wishlist or notify
                }
              }}
              className="relative p-2.5 rounded-full text-stone-600 hover:text-brand-900 hover:bg-stone-100 transition-colors"
              title={`Wishlist (${wishlist.length})`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-brand-600 text-brand-600' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-brand-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag / Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-brand-900 text-white hover:bg-brand-950 shadow-md transition-all active:scale-95 group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform text-gold-300" />
              <span className="text-xs font-bold">{cartItemCount}</span>
            </button>

            {/* Admin Staff Portal Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
              title="Store Staff & Inventory Management Portal"
              aria-label="Staff Portal"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 py-4 px-2 space-y-2 bg-[#fdfbf7] animate-fadeIn">
            <div className="flex flex-col gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-brand-900 text-white font-semibold'
                      : 'text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="border-t border-stone-200 pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  handleOpenReels();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-brand-900 bg-brand-50 rounded-lg"
              >
                <Film className="w-4 h-4 text-brand-600" />
                <span>TikTok / Reels Showcase Feed</span>
              </button>

              <button
                onClick={() => {
                  setIsLocationOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-stone-800 hover:bg-stone-100 rounded-lg"
              >
                <MapPin className="w-4 h-4 text-gold-600" />
                <span>Visit Store (Devdaha -1, 6 No. Rijalchowk)</span>
              </button>

              <button
                onClick={() => {
                  setIsSizeGuideOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-stone-800 hover:bg-stone-100 rounded-lg"
              >
                <Ruler className="w-4 h-4 text-stone-600" />
                <span>Size & Measurement Guide</span>
              </button>

              <button
                onClick={() => {
                  setIsAdminOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2.5 px-4 py-2 text-xs text-stone-500 hover:bg-stone-100 rounded-lg"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Store Management & Stock Portal</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
