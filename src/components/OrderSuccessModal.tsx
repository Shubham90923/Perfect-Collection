import React from 'react';
import { useShop } from '../context/ShopContext';
import { STORE_CONFIG } from '../data/storeInfo';
import { 
  CheckCircle2, 
  MessageCircle, 
  X, 
  ShoppingBag, 
  MapPin, 
  Printer, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const { lastPlacedOrder, setLastPlacedOrder } = useShop();

  if (!lastPlacedOrder) return null;

  const handleSendWhatsApp = () => {
    let itemsList = lastPlacedOrder.items.map((it, idx) => 
      `${idx + 1}. *${it.product.name}* (${it.product.code})%0A   - Color: ${it.selectedColor}, Size: ${it.selectedSize}, Qty: ${it.quantity}%0A   - Price: Rs. ${(it.product.price * it.quantity).toLocaleString()}`
    ).join('%0A');

    const msg = `Namaste Perfect Collection! 🙏✨%0A%0AI have just placed an order on your website:%0A*Order Number:* ${lastPlacedOrder.orderNumber}%0A*Customer Name:* ${encodeURIComponent(lastPlacedOrder.customer.fullName)}%0A*Phone:* ${lastPlacedOrder.customer.phone}%0A*Delivery City/Tole:* ${encodeURIComponent(lastPlacedOrder.customer.city)}, ${encodeURIComponent(lastPlacedOrder.customer.address)}%0A*Payment Method:* ${lastPlacedOrder.paymentMethod.toUpperCase()}%0A%0A*Items:*%0A${itemsList}%0A%0A*Total Amount:* Rs. ${lastPlacedOrder.total.toLocaleString()}%0A${lastPlacedOrder.customer.stitchingInstructions ? `*Stitching Request:* ${encodeURIComponent(lastPlacedOrder.customer.stitchingInstructions)}%0A` : ''}%0APlease confirm when it will be dispatched! Dhanyabad!`;

    window.open(`https://wa.me/${STORE_CONFIG.whatsappRaw}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      
      <div 
        className="relative bg-white rounded-2xl md:rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setLastPlacedOrder(null)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Body */}
        <div className="p-6 sm:p-8 text-center space-y-5">
          
          {/* Success Icon */}
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-gold-700 tracking-wider uppercase">
              Order Placed Successfully!
            </span>
            <h2 className="font-heading text-2xl font-bold text-stone-950 mt-1">
              Dhanyabad, {lastPlacedOrder.customer.fullName}!
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Your ethnic apparel order has been registered in the Devdaha system.
            </p>
          </div>

          {/* Order Details Receipt Box */}
          <div className="bg-[#fdfbf7] p-4 rounded-xl border border-stone-300 text-left space-y-2 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-stone-200">
              <span className="text-stone-500">Order Reference:</span>
              <span className="font-mono font-bold text-brand-900 text-sm">
                {lastPlacedOrder.orderNumber}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-stone-500">Delivery Destination:</span>
              <strong className="text-stone-800">{lastPlacedOrder.customer.city}</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-stone-500">Payment Selected:</span>
              <span className="font-semibold uppercase text-stone-800">
                {lastPlacedOrder.paymentMethod.replace('_', ' ')}
              </span>
            </div>

            <div className="flex justify-between pt-2 border-t border-stone-200 font-bold text-sm text-stone-950">
              <span>Grand Total:</span>
              <span className="font-serif">Rs. {lastPlacedOrder.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Immediate WhatsApp Connect Button */}
          <div className="space-y-2">
            <button
              onClick={handleSendWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Send Order Receipt to WhatsApp</span>
            </button>
            <p className="text-[11px] text-stone-400">
              Recommended: Notify our Devdaha boutique team directly on WhatsApp for priority tailoring & instant dispatch.
            </p>
          </div>

          {/* Boutique Visit Info */}
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-[11px] text-stone-600 flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
            <span>Store address: <strong>Devdaha -1, 6 No. Rijalchowk, Rupandehi</strong></span>
          </div>

          {/* Close & Continue Shopping */}
          <button
            onClick={() => setLastPlacedOrder(null)}
            className="w-full py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold transition-all"
          >
            Continue Browsing Catalog
          </button>

        </div>

      </div>

    </div>
  );
};
