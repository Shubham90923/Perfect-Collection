import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { 
  Heart, 
  Film, 
  ShoppingBag, 
  MessageCircle, 
  Eye, 
  Sparkles,
  Check
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    setSelectedProduct, 
    setActiveReelProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    getWhatsAppOrderLink
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.colorName || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [isAdded, setIsAdded] = useState(false);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, selectedSize, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = getWhatsAppOrderLink(product, selectedColor, selectedSize);
    window.open(link, '_blank');
  };

  const handleWatchReel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveReelProduct(product);
  };

  return (
    <div 
      onClick={() => setSelectedProduct(product)}
      className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:border-brand-300 relative"
    >
      {/* Top Media Container */}
      <div 
        className="relative aspect-[3/4] overflow-hidden bg-stone-100"
        onMouseEnter={() => product.images.length > 1 && setActiveImageIndex(1)}
        onMouseLeave={() => setActiveImageIndex(0)}
      >
        <img
          src={product.images[activeImageIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {/* Stock Status Badge */}
          {product.stockStatus === 'in_stock' && (
            <span className="px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase bg-emerald-600/95 text-white rounded-full shadow-sm backdrop-blur-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse"></span>
              In Stock
            </span>
          )}
          {product.stockStatus === 'pre_order' && (
            <span className="px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase bg-amber-600/95 text-white rounded-full shadow-sm backdrop-blur-sm">
              Pre-Order
            </span>
          )}
          {product.stockStatus === 'sold_out' && (
            <span className="px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase bg-stone-700/95 text-white rounded-full shadow-sm backdrop-blur-sm">
              Sold Out
            </span>
          )}

          {/* Item Code Badge */}
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-white/90 text-stone-800 rounded border border-stone-300 shadow-sm">
            {product.code}
          </span>
        </div>

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 right-12 bg-rose-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            -{discountPercent}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-brand-700 shadow-md backdrop-blur-sm transition-all"
          title="Save to Wishlist"
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>

        {/* Video Reel Badge Button */}
        {product.videoUrl && (
          <button
            onClick={handleWatchReel}
            className="absolute bottom-3 left-3 bg-black/75 hover:bg-black text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md shadow-lg transition-transform hover:scale-105 active:scale-95"
            title="Watch short-form video clip"
          >
            <Film className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
            <span>Watch Clip</span>
            {product.videoDuration && <span className="text-[10px] text-stone-300">({product.videoDuration})</span>}
          </button>
        )}

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end pointer-events-none">
          <span className="bg-white/95 text-stone-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm flex items-center gap-1.5 pointer-events-auto">
            <Eye className="w-3.5 h-3.5 text-brand-700" />
            <span>Inspect Details</span>
          </span>
        </div>

      </div>

      {/* Card Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Category & Subcategory */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-brand-800">
              {product.category}
            </span>
            <span>{product.subCategory}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-heading text-base font-bold text-stone-900 line-clamp-1 group-hover:text-brand-900 transition-colors">
            {product.name}
          </h3>

          {/* Neckline Feature Detail Highlight */}
          <div className="mt-1.5 p-2 rounded-lg bg-stone-50 border border-stone-200/60 text-[11px] text-stone-700">
            <div className="flex items-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
              <span className="line-clamp-2 leading-tight">
                <strong className="text-stone-900">Neckline:</strong> {product.necklineDetail}
              </span>
            </div>
          </div>
        </div>

        {/* Colors & Price Section */}
        <div className="pt-2 border-t border-stone-100 space-y-2.5">
          
          <div className="flex items-center justify-between">
            {/* Price */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-stone-950">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-stone-400 line-through">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-stone-500">
                {product.sizes.includes('Unstitched') ? 'Stitching Available' : 'Ready to Wear'}
              </span>
            </div>

            {/* Color Swatches */}
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 3).map((col) => (
                <button
                  key={col.colorName}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(col.colorName);
                  }}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    selectedColor === col.colorName 
                      ? 'ring-2 ring-brand-800 ring-offset-1 scale-110' 
                      : 'border-stone-300'
                  }`}
                  style={{ backgroundColor: col.colorHex }}
                  title={col.colorName}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[10px] text-stone-400 font-medium">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>

          {/* Action Buttons: Buy via WhatsApp + Add to Bag */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
              title="Buy directly via WhatsApp with item details pre-filled"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleQuickAdd}
              disabled={product.stockStatus === 'sold_out'}
              className={`w-full flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
                product.stockStatus === 'sold_out'
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : isAdded
                    ? 'bg-stone-900 text-emerald-400'
                    : 'bg-brand-900 hover:bg-brand-950 text-white shadow-sm'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-gold-300" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
