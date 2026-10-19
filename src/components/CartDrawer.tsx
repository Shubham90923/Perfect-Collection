import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  MessageCircle, 
  Scissors, 
  Truck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateCartQuantity, 
    cartSubtotal, 
    cartItemCount,
    clearCart,
    setIsCheckoutOpen,
    getWhatsAppCartLink
  } = useShop();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppCheckout = () => {
    const link = getWhatsAppCartLink();
    window.open(link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-900" />
              <h2 className="font-heading text-lg font-bold text-stone-900">
                Shopping Bag ({cartItemCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div 
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex gap-3.5 p-3 rounded-xl border border-stone-200 bg-[#fdfbf7] relative"
                >
                  {/* Item Image */}
                  <div className="w-20 h-24 rounded-lg overflow-hidden bg-stone-200 shrink-0 border border-stone-300">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      className="w-full h-full object-cover object-top" 
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] font-mono font-bold text-brand-800 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-200">
                          {item.product.code}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="font-heading text-xs font-bold text-stone-900 line-clamp-1 mt-1">
                        {item.product.name}
                      </h4>

                      <div className="text-[11px] text-stone-600 mt-0.5 flex flex-wrap gap-x-2">
                        <span>Color: <strong>{item.selectedColor}</strong></span>
                        <span>•</span>
                        <span>Size: <strong>{item.selectedSize}</strong></span>
                      </div>

                      {item.customStitchingNotes && (
                        <div className="mt-1 flex items-center gap-1 text-[10px] text-brand-900 bg-brand-50/60 p-1 rounded border border-brand-100">
                          <Scissors className="w-3 h-3 text-brand-700 shrink-0" />
                          <span className="line-clamp-1">Tailoring: {item.customStitchingNotes}</span>
                        </div>
                      )}
                    </div>

                    {/* Quantity & Item Subtotal */}
                    <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 mt-1">
                      <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, -1)}
                          className="p-1 text-stone-500 hover:text-stone-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-2 text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, 1)}
                          className="p-1 text-stone-500 hover:text-stone-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-stone-900 font-serif">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-stone-400">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-stone-300" />
                <p className="font-heading text-lg font-bold text-stone-700">Your bag is empty</p>
                <p className="text-xs text-stone-500 mt-1">Discover suits, sarees & lehengas from Devdaha boutique</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-4 py-2 bg-brand-900 text-white rounded-full text-xs font-semibold"
                >
                  Start Exploring
                </button>
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-stone-200 bg-stone-50 space-y-3">
              
              {/* Delivery info alert */}
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Devdaha Deliveries: Free!</strong> Butwal & Bhairahawa Free on orders above Rs. 3,000.
                </span>
              </div>

              {/* Subtotal */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-600">Subtotal:</span>
                <span className="font-bold text-lg text-stone-950 font-serif">
                  Rs. {cartSubtotal.toLocaleString()}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-900 hover:bg-brand-950 text-white font-semibold text-sm shadow-md transition-all active:scale-95"
                >
                  <span>Proceed to Local Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Entire Bag to WhatsApp</span>
                </button>
              </div>

              <div className="flex justify-between items-center pt-1 text-[11px] text-stone-400">
                <button 
                  onClick={clearCart} 
                  className="hover:text-rose-600 underline"
                >
                  Clear Bag
                </button>
                <span>Store: Devdaha -1, 6 No. Rijalchowk</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
