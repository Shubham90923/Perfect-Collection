import React, { useState, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { STORE_CONFIG } from '../data/storeInfo';
import { 
  X, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  ChevronDown, 
  Heart, 
  ShoppingBag, 
  MessageCircle, 
  Sparkles, 
  ExternalLink,
  Eye
} from 'lucide-react';

export const ReelsShowcase: React.FC = () => {
  const { 
    activeReelProduct, 
    setActiveReelProduct, 
    products, 
    setSelectedProduct, 
    addToCart, 
    getWhatsAppOrderLink 
  } = useShop();

  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!activeReelProduct) return null;

  // Filter products that have video clips or use all products
  const reelItems = products.filter(p => p.videoUrl);
  const currentIndex = reelItems.findIndex(p => p.id === activeReelProduct.id);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % reelItems.length;
    setActiveReelProduct(reelItems[nextIdx]);
    setLiked(false);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + reelItems.length) % reelItems.length;
    setActiveReelProduct(reelItems[prevIdx]);
    setLiked(false);
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleWhatsAppOrder = () => {
    const link = getWhatsAppOrderLink(activeReelProduct);
    window.open(link, '_blank');
  };

  const handleInspect = () => {
    setSelectedProduct(activeReelProduct);
    setActiveReelProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      
      {/* Top Header Controls */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-30 pointer-events-none">
        
        {/* Brand & TikTok handle */}
        <div className="glass-dark px-3.5 py-1.5 rounded-full text-white flex items-center gap-2 pointer-events-auto border border-white/10 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-xs font-bold tracking-wide">TikTok Showcase</span>
          <span className="text-stone-400">•</span>
          <a 
            href={STORE_CONFIG.tiktokUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs text-gold-300 font-semibold hover:underline flex items-center gap-1"
          >
            <span>{STORE_CONFIG.handle}</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setActiveReelProduct(null)}
          className="p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all pointer-events-auto shadow-lg backdrop-blur-md"
          aria-label="Close reels player"
        >
          <X className="w-6 h-6" />
        </button>

      </div>

      {/* Vertical Phone/Reels Container */}
      <div className="relative w-full max-w-[380px] h-[82vh] max-h-[780px] bg-stone-950 rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-800 flex flex-col justify-between">
        
        {/* Main Video Viewport */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            key={activeReelProduct.id}
            src={activeReelProduct.videoUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none"></div>
        </div>

        {/* Right Floating Vertical Action Buttons */}
        <div className="absolute right-3 bottom-28 z-20 flex flex-col items-center gap-4">
          
          {/* Mute / Unmute Button */}
          <button
            onClick={handleToggleMute}
            className="p-3 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-all shadow-lg active:scale-90"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-stone-300" /> : <Volume2 className="w-5 h-5 text-gold-400" />}
          </button>

          {/* Like Button */}
          <button
            onClick={() => setLiked(!liked)}
            className="p-3 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-all shadow-lg active:scale-90"
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-rose-500 text-rose-500 scale-110' : 'text-stone-200'}`} />
          </button>

          {/* WhatsApp Direct Order */}
          <button
            onClick={handleWhatsAppOrder}
            className="p-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg active:scale-90 transition-all"
            title="Order this look on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
          </button>

          {/* View Full Product Details */}
          <button
            onClick={handleInspect}
            className="p-3 rounded-full bg-brand-800 hover:bg-brand-900 text-white shadow-lg active:scale-90 transition-all"
            title="View full specs"
          >
            <Eye className="w-5 h-5" />
          </button>

        </div>

        {/* Navigation Arrows for Previous / Next Reel */}
        <div className="absolute left-3 bottom-28 z-20 flex flex-col gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all active:scale-95"
            title="Previous video"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all active:scale-95"
            title="Next video"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Overlay Info Card */}
        <div className="relative z-20 p-4 text-white space-y-2.5 mt-auto">
          
          {/* Item Code & Neckline Highlight */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm border border-white/20">
              {activeReelProduct.code}
            </span>
            <span className="text-xs text-gold-300 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Devdaha Boutique Showcase</span>
            </span>
          </div>

          {/* Product Title */}
          <h2 className="font-heading text-lg font-bold leading-tight">
            {activeReelProduct.name}
          </h2>

          {/* Neckline Details */}
          <p className="text-xs text-stone-200 line-clamp-2 leading-relaxed">
            <strong className="text-gold-300">Neckline:</strong> {activeReelProduct.necklineDetail}
          </p>

          {/* Price & Action Buttons */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-xs text-stone-400 block -mb-1">Boutique Price</span>
              <span className="text-xl font-bold font-serif text-white">
                Rs. {activeReelProduct.price.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleWhatsAppOrder}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Buy on WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  addToCart(activeReelProduct, activeReelProduct.colors[0]?.colorName || '', activeReelProduct.sizes[0] || 'Standard', 1);
                }}
                className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white active:scale-95 transition-all"
                title="Add to Bag"
              >
                <ShoppingBag className="w-4 h-4 text-gold-300" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
