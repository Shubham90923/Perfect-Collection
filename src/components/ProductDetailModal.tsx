import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { STORE_CONFIG } from '../data/storeInfo';
import { 
  X, 
  Heart, 
  MessageCircle, 
  ShoppingBag, 
  Check, 
  Sparkles, 
  Ruler, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  Film, 
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    getWhatsAppOrderLink,
    setActiveReelProduct,
    setIsSizeGuideOpen,
    setIsLocationOpen
  } = useShop();

  if (!selectedProduct) return null;

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(selectedProduct.colors[0]?.colorName || '');
  const [selectedSize, setSelectedSize] = useState(selectedProduct.sizes[0] || 'Standard');
  const [stitchingNotes, setStitchingNotes] = useState('');
  const [isVideoTab, setIsVideoTab] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const discountPercent = selectedProduct.originalPrice 
    ? Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)
    : 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedColor, selectedSize, 1, stitchingNotes);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWhatsAppOrder = () => {
    const link = getWhatsAppOrderLink(selectedProduct, selectedColor, selectedSize, stitchingNotes);
    window.open(link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      
      {/* Modal Container */}
      <div 
        className="relative bg-white rounded-2xl md:rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-stone-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-900 shadow-md transition-all active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          
          {/* Left Column: Visual Gallery & Video (Col 6/7) */}
          <div className="md:col-span-6 bg-stone-50 p-4 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
            
            {/* View Mode Toggle: Photos vs Short Video */}
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => setIsVideoTab(false)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  !isVideoTab 
                    ? 'bg-brand-900 text-white shadow-sm' 
                    : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                High-Res Photos & Neckline Zoom
              </button>

              {selectedProduct.videoUrl && (
                <button
                  onClick={() => setIsVideoTab(true)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isVideoTab 
                      ? 'bg-brand-900 text-white shadow-sm' 
                      : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  <Film className="w-3.5 h-3.5 text-gold-500" />
                  <span>Video Clip</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                </button>
              )}
            </div>

            {/* Main Media Preview Frame */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-stone-200 border border-stone-300 shadow-inner group">
              {!isVideoTab ? (
                <div 
                  className="w-full h-full relative cursor-zoom-in overflow-hidden"
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onMouseMove={handleMouseMove}
                >
                  <img
                    src={selectedProduct.images[activeImgIndex] || selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    className={`w-full h-full object-cover object-top transition-transform duration-200 ${
                      isZoomed ? 'scale-150' : 'scale-100'
                    }`}
                    style={isZoomed ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
                  />

                  {/* Zoom Instruction Tag */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded-full pointer-events-none flex items-center gap-1.5">
                    <Maximize2 className="w-3 h-3 text-gold-300" />
                    <span>Hover to inspect neckline embroidery details</span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <video
                    src={selectedProduct.videoUrl}
                    controls
                    autoPlay
                    loop
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Prev / Next Photo Arrow Overlays */}
              {!isVideoTab && selectedProduct.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : selectedProduct.images.length - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-stone-800 shadow-md transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveImgIndex((prev) => (prev < selectedProduct.images.length - 1 ? prev + 1 : 0))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-stone-800 shadow-md transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails Strip */}
            {!isVideoTab && selectedProduct.images.length > 1 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative w-14 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      activeImgIndex === idx ? 'border-brand-700 shadow-md scale-105' : 'border-stone-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover object-top" />
                    {idx === 0 && <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] text-white text-center">Front</span>}
                    {idx === 1 && <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] text-white text-center">Neck</span>}
                    {idx === 2 && <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] text-white text-center">Detail</span>}
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Right Column: Garment Details, Sizing, Neckline specs & Ordering (Col 6/7) */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-5">
            
            <div className="space-y-4">
              
              {/* Category, SKU & Wishlist Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-brand-800 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                    {selectedProduct.category}
                  </span>
                  <span className="text-xs font-mono font-semibold text-stone-500">
                    SKU: {selectedProduct.code}
                  </span>
                </div>

                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className="p-2 rounded-full hover:bg-stone-100 text-stone-600 transition-colors"
                  title="Add to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(selectedProduct.id) ? 'fill-rose-600 text-rose-600' : ''}`} />
                </button>
              </div>

              {/* Garment Title */}
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {selectedProduct.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl sm:text-3xl font-bold text-stone-950 font-serif">
                  Rs. {selectedProduct.price.toLocaleString()}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    Rs. {selectedProduct.originalPrice.toLocaleString()}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-rose-100 text-rose-700 rounded-md">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* Neckline Feature Spotlight Box */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-gold-50 via-amber-50/50 to-stone-50 border border-gold-300/80 shadow-sm">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-gold-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gold-900">
                      Neckline & Embroidery Craftsmanship
                    </h4>
                    <p className="text-xs text-stone-800 mt-0.5 leading-relaxed font-medium">
                      {selectedProduct.necklineDetail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Fabric & Work Specifications Table */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                <div>
                  <span className="text-stone-500 font-medium block">Fabric & Lining:</span>
                  <strong className="text-stone-800 block mt-0.5">{selectedProduct.fabric}</strong>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block">Handwork Type:</span>
                  <strong className="text-stone-800 block mt-0.5">{selectedProduct.workType}</strong>
                </div>
                <div className="col-span-2 pt-2 border-t border-stone-200">
                  <span className="text-stone-500 font-medium block">Included Pieces:</span>
                  <span className="text-stone-800 font-medium">{selectedProduct.includedPieces}</span>
                </div>
              </div>

              {/* Color Swatch Selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  Select Color: <span className="text-brand-900 font-bold">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  {selectedProduct.colors.map((c) => (
                    <button
                      key={c.colorName}
                      onClick={() => setSelectedColor(c.colorName)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        selectedColor === c.colorName
                          ? 'border-brand-900 bg-brand-50 text-brand-950 font-bold ring-2 ring-brand-800/20'
                          : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: c.colorHex }}></span>
                      <span>{c.colorName}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size & Stitching Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-stone-700">
                    Size / Stitching Preference:
                  </label>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="inline-flex items-center gap-1 text-xs text-brand-800 hover:underline font-semibold"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        selectedSize === sz
                          ? 'bg-stone-900 text-white shadow-sm'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Tailoring / Stitching Note Input */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center justify-between">
                  <span>Custom Stitching / Fitting Request (Optional):</span>
                  <span className="text-[10px] text-stone-400 font-normal">Bust, length, or neckline adjustments</span>
                </label>
                <input
                  type="text"
                  value={stitchingNotes}
                  onChange={(e) => setStitchingNotes(e.target.value)}
                  placeholder="e.g., Kurti length 44 inch, Chest 38, deep neck..."
                  className="w-full text-xs p-2.5 rounded-lg bg-stone-50 border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand-500 text-stone-800"
                />
              </div>

              {/* Physical Store Invitation Card */}
              <div 
                onClick={() => setIsLocationOpen(true)}
                className="p-3 rounded-xl bg-gold-50/70 border border-gold-200 flex items-center justify-between cursor-pointer hover:bg-gold-100/70 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold-700 shrink-0" />
                  <span className="text-xs text-stone-800">
                    Want to inspect fabric in person? Visit our store at <strong>Devdaha -1, 6 No. Rijalchowk</strong>.
                  </span>
                </div>
                <span className="text-xs font-bold text-brand-900 underline shrink-0 ml-2">Directions</span>
              </div>

            </div>

            {/* Bottom Actions Row */}
            <div className="pt-4 border-t border-stone-200 space-y-2.5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1-Click WhatsApp Order Button */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order via WhatsApp</span>
                </button>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={selectedProduct.stockStatus === 'sold_out'}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all active:scale-95 shadow-md ${
                    selectedProduct.stockStatus === 'sold_out'
                      ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                      : isAdded
                        ? 'bg-stone-900 text-emerald-400'
                        : 'bg-brand-900 hover:bg-brand-950 text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-gold-300" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-gold-600" />
                  <span>Fast Nepal Delivery</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-gold-600" />
                  <span>100% Quality Checked</span>
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
