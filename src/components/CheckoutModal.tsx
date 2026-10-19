import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { STORE_CONFIG } from '../data/storeInfo';
import { PaymentMethod, OrderCustomerInfo } from '../types';
import confetti from 'canvas-confetti';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  User, 
  Truck, 
  Copy, 
  QrCode, 
  Banknote, 
  CreditCard,
  MessageCircle,
  HelpCircle
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    placeOrder,
    getWhatsAppOrderLink
  } = useShop();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Devdaha');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [stitchingInstructions, setStitchingInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('esewa');
  const [transactionId, setTransactionId] = useState('');
  const [copiedBank, setCopiedBank] = useState(false);

  if (!isCheckoutOpen) return null;

  // Delivery calculation
  const isDevdaha = city.toLowerCase().includes('devdaha');
  const isRupandehi = city.toLowerCase().includes('butwal') || 
                      city.toLowerCase().includes('bhairahawa') || 
                      city.toLowerCase().includes('tilottama') ||
                      city.toLowerCase().includes('rupandehi');

  let deliveryFee = 200;
  let deliveryLabel = 'Nationwide Courier (All Nepal)';

  if (city === 'Store Pickup (Devdaha -1)') {
    deliveryFee = 0;
    deliveryLabel = 'Store Pickup (Devdaha Rijalchowk)';
  } else if (isDevdaha) {
    deliveryFee = 0;
    deliveryLabel = 'Devdaha Local Delivery (Same Day)';
  } else if (isRupandehi) {
    deliveryFee = cartSubtotal >= 3000 ? 0 : 100;
    deliveryLabel = deliveryFee === 0 ? 'Rupandehi Free Delivery (Orders > Rs. 3,000)' : 'Rupandehi Express (Rs. 100)';
  }

  const grandTotal = cartSubtotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !phone || !address) {
      alert('Please fill in your Name, WhatsApp Phone number, and Address.');
      return;
    }

    const customer: OrderCustomerInfo = {
      fullName,
      phone,
      email,
      city,
      address,
      landmark,
      stitchingInstructions
    };

    const order = placeOrder(customer, paymentMethod);
    setIsCheckoutOpen(false);

    // Trigger celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(STORE_CONFIG.paymentInfo.bankTransfer.accountNumber);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      
      <div 
        className="relative bg-white rounded-2xl md:rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-stone-900 to-brand-950 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-gold-400 font-bold text-xs uppercase tracking-wider">
                Perfect Collection Checkout
              </span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold mt-0.5">
              Complete Your Order
            </h2>
            <p className="text-xs text-stone-300">
              Devdaha Boutique • Fast Local Rupandehi & Nationwide Nepal Delivery
            </p>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Section 1: Customer Information */}
          <div className="space-y-4">
            <h3 className="font-heading text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-200 pb-2">
              <User className="w-4 h-4 text-brand-800" />
              <span>1. Contact & Delivery Location</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Pooja Thapa"
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand-500 text-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  WhatsApp Phone Number *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-xs text-stone-500 bg-stone-100 border border-r-0 border-stone-300 rounded-l-lg">
                    +977
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98XXXXXXXX"
                    className="w-full text-xs p-2.5 rounded-r-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand-500 text-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Delivery Region / City *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand-500 text-stone-800 bg-white"
                >
                  <option value="Devdaha">Devdaha (Free Delivery, Same Day)</option>
                  <option value="Butwal">Butwal, Rupandehi</option>
                  <option value="Bhairahawa">Bhairahawa, Rupandehi</option>
                  <option value="Tilottama">Tilottama, Rupandehi</option>
                  <option value="Store Pickup (Devdaha -1)">Pickup at Devdaha Rijalchowk Boutique</option>
                  <option value="Kathmandu / Lalitpur / Bhaktapur">Kathmandu Valley (Courier 2 Days)</option>
                  <option value="Pokhara">Pokhara, Kaski</option>
                  <option value="Chitwan">Chitwan (Bharatpur / Narayangarh)</option>
                  <option value="Other Nepal Location">Other Nepal District</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Street / Tole / Ward Address *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Ward No. 1, Near Rijalchowk"
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand-500 text-stone-800"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Landmark / House Description (Optional)
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Opposite to Red Gate, 200m from Highway"
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand-500 text-stone-800"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Custom Tailoring / Measurement Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={stitchingInstructions}
                  onChange={(e) => setStitchingInstructions(e.target.value)}
                  placeholder="Specific kurti length, chest/bust measurement, sleeve style, or blouse padding requests..."
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand-500 text-stone-800"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Local Nepal Payment Method */}
          <div className="space-y-4">
            <h3 className="font-heading text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-200 pb-2">
              <Banknote className="w-4 h-4 text-brand-800" />
              <span>2. Payment Option (Nepal Digital & COD)</span>
            </h3>

            {/* Payment Method Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'esewa', name: 'eSewa', desc: 'Scan & Pay / ID', color: 'border-emerald-500 bg-emerald-50/40 text-emerald-900' },
                { id: 'khalti', name: 'Khalti', desc: 'Wallet Pay', color: 'border-purple-500 bg-purple-50/40 text-purple-900' },
                { id: 'bank_transfer', name: 'Bank Transfer', desc: 'NIC Asia Devdaha', color: 'border-blue-500 bg-blue-50/40 text-blue-900' },
                { id: 'cod', name: 'Cash on Delivery', desc: 'Pay on Arrival', color: 'border-amber-500 bg-amber-50/40 text-amber-900' },
              ].map(method => (
                <button
                  type="button"
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    paymentMethod === method.id
                      ? `${method.color} shadow-sm font-bold ring-2 ring-brand-800/20`
                      : 'border-stone-200 hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <span className="block text-xs font-bold">{method.name}</span>
                  <span className="block text-[10px] text-stone-500 mt-0.5">{method.desc}</span>
                </button>
              ))}
            </div>

            {/* Payment Details Drawer based on selection */}
            {paymentMethod === 'esewa' && (
              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-300 text-xs text-stone-800 space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-32 h-32 bg-white p-2 rounded-xl shadow-sm border border-emerald-200 flex items-center justify-center shrink-0">
                    <img src={STORE_CONFIG.paymentInfo.esewa.qrCodeImage} alt="eSewa QR" className="w-full h-full object-contain" />
                  </div>
                  <div className="space-y-1.5 text-center sm:text-left">
                    <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-950 font-bold text-[10px] uppercase">
                      Official eSewa Merchant / Wallet
                    </span>
                    <p className="font-bold text-sm text-stone-900">
                      eSewa ID: <span className="font-mono text-emerald-800">{STORE_CONFIG.paymentInfo.esewa.id}</span>
                    </p>
                    <p className="text-stone-600">
                      Account Name: <strong>{STORE_CONFIG.paymentInfo.esewa.name}</strong>
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Scan QR or transfer to our number, then input the transaction ID below or share screenshot via WhatsApp.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-emerald-200">
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    eSewa Transaction ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="e.g. ES-9281928"
                    className="w-full text-xs p-2 rounded-lg bg-white border border-emerald-300 text-stone-800"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'khalti' && (
              <div className="p-4 rounded-xl bg-purple-50/80 border border-purple-300 text-xs text-stone-800 space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-32 h-32 bg-white p-2 rounded-xl shadow-sm border border-purple-200 flex items-center justify-center shrink-0">
                    <img src={STORE_CONFIG.paymentInfo.khalti.qrCodeImage} alt="Khalti QR" className="w-full h-full object-contain" />
                  </div>
                  <div className="space-y-1.5 text-center sm:text-left">
                    <span className="px-2 py-0.5 rounded bg-purple-200 text-purple-950 font-bold text-[10px] uppercase">
                      Khalti Digital Wallet
                    </span>
                    <p className="font-bold text-sm text-stone-900">
                      Khalti Mobile: <span className="font-mono text-purple-800">{STORE_CONFIG.paymentInfo.khalti.id}</span>
                    </p>
                    <p className="text-stone-600">
                      Account Name: <strong>{STORE_CONFIG.paymentInfo.khalti.name}</strong>
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Send to Khalti number with reference to your order name.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'bank_transfer' && (
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-300 text-xs text-stone-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-900">{STORE_CONFIG.paymentInfo.bankTransfer.bankName}</span>
                  <span className="text-[11px] text-stone-500">{STORE_CONFIG.paymentInfo.bankTransfer.branch}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-blue-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Account Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-stone-900">
                        {STORE_CONFIG.paymentInfo.bankTransfer.accountNumber}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyAccount}
                        className="p-1 hover:bg-stone-100 rounded text-blue-700"
                        title="Copy account number"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Account Name:</span>
                    <span className="font-semibold text-stone-800">
                      {STORE_CONFIG.paymentInfo.bankTransfer.accountName}
                    </span>
                  </div>
                </div>
                {copiedBank && (
                  <p className="text-[11px] text-emerald-700 font-bold">✓ Account number copied to clipboard!</p>
                )}
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-300 text-xs text-stone-800 space-y-1">
                <p className="font-bold text-amber-950">Cash on Delivery (COD) Selected</p>
                <p className="text-stone-600 text-[11px]">
                  You can inspect the sealed package and pay cash directly to the delivery person upon arrival at your doorstep.
                </p>
              </div>
            )}

          </div>

          {/* Section 3: Order Summary & Total */}
          <div className="p-4 rounded-2xl bg-[#fdfbf7] border border-stone-300 space-y-2.5">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Order Breakdown
            </h4>

            <div className="space-y-1 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal ({cart.length} items):</span>
                <span>Rs. {cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery ({deliveryLabel}):</span>
                <span className={deliveryFee === 0 ? 'text-emerald-700 font-bold' : ''}>
                  {deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 text-base font-bold text-stone-950">
                <span>Grand Total:</span>
                <span className="font-serif text-brand-950">Rs. {grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-brand-900 hover:bg-brand-950 text-white font-bold text-sm shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-gold-300" />
              <span>Confirm & Place Order</span>
            </button>
            <p className="text-[11px] text-stone-400 text-center">
              Our Devdaha team will call/WhatsApp you immediately to confirm delivery schedule & size customization.
            </p>
          </div>

        </form>

      </div>

    </div>
  );
};
