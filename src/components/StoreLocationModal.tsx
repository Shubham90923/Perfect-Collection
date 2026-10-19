import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { STORE_CONFIG } from '../data/storeInfo';
import { 
  X, 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Navigation, 
  ExternalLink, 
  Calendar, 
  Check, 
  Sparkles
} from 'lucide-react';

export const StoreLocationModal: React.FC = () => {
  const { isLocationOpen, setIsLocationOpen, getWhatsAppDirectLink } = useShop();
  const [visitorName, setVisitorName] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitCategory, setVisitCategory] = useState('Bridal Lehengas & Heavy Suits');
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  if (!isLocationOpen) return null;

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName) return;

    const message = `Namaste Perfect Collection! 🙏%0A%0AI would like to book a boutique visit / bridal consultation at Devdaha Rijalchowk:%0A*Name:* ${encodeURIComponent(visitorName)}%0A*Preferred Date/Time:* ${encodeURIComponent(visitDate || 'This Weekend')}%0A*Interested In:* ${encodeURIComponent(visitCategory)}%0APlease confirm if a stylist is available.`;
    
    window.open(`https://wa.me/${STORE_CONFIG.whatsappRaw}?text=${message}`, '_blank');
    setAppointmentBooked(true);
    setTimeout(() => {
      setAppointmentBooked(false);
      setIsLocationOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      
      <div 
        className="relative bg-white rounded-2xl md:rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 text-stone-900 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-brand-950 via-brand-900 to-stone-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-300" />
              <span className="text-xs uppercase font-bold tracking-wider text-gold-300">
                Physical Boutique & Showroom
              </span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold mt-1">
              Visit Perfect Collection in Devdaha
            </h2>
            <p className="text-xs text-stone-300">
              Devdaha -1, 6 No. Rijalchowk, Rupandehi, Nepal
            </p>
          </div>

          <button
            onClick={() => setIsLocationOpen(false)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Top Quick Actions (Call, WhatsApp, Maps) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={`tel:${STORE_CONFIG.phone}`}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors"
            >
              <Phone className="w-4 h-4 text-brand-800" />
              <span>Call: {STORE_CONFIG.phoneDisplay}</span>
            </a>

            <a
              href={getWhatsAppDirectLink("Namaste! I'm planning to visit your Devdaha store today. Can you share exact landmarks?")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Direct</span>
            </a>

            <a
              href={STORE_CONFIG.address.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-brand-900 hover:bg-brand-950 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Navigation className="w-4 h-4 text-gold-300" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
          </div>

          {/* Interactive Map Representation */}
          <div className="rounded-2xl overflow-hidden border border-stone-300 shadow-inner relative bg-stone-100">
            <div className="p-3 bg-stone-900 text-white text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span className="font-semibold">Devdaha -1, 6 No. Rijalchowk (Opposite Central Chowk)</span>
              </div>
              <span className="text-[11px] text-stone-300">Rupandehi, Lumbini Province</span>
            </div>

            {/* Google Maps Embed iframe */}
            <div className="aspect-[16/9] w-full bg-stone-200">
              <iframe
                title="Perfect Collection Devdaha Map"
                src={STORE_CONFIG.address.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Location & Opening Hours Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            
            {/* Address & Travel Info */}
            <div className="p-4 rounded-xl bg-[#fdfbf7] border border-stone-200 space-y-2">
              <div className="flex items-center gap-2 text-brand-900 font-bold">
                <MapPin className="w-4 h-4" />
                <span>Exact Address & Route</span>
              </div>
              <p className="text-stone-700 leading-relaxed font-medium">
                {STORE_CONFIG.address.fullFormatted}
              </p>
              <p className="text-stone-500 text-[11px]">
                <strong>Landmark:</strong> {STORE_CONFIG.address.landmark}
              </p>
              <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-600 space-y-1">
                <p>• <strong>From Butwal:</strong> ~15–20 mins eastward along East-West Highway.</p>
                <p>• <strong>From Bhairahawa:</strong> ~25–30 mins via Tilottama highway bypass.</p>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="p-4 rounded-xl bg-[#fdfbf7] border border-stone-200 space-y-2">
              <div className="flex items-center gap-2 text-brand-900 font-bold">
                <Clock className="w-4 h-4" />
                <span>Boutique Showroom Hours</span>
              </div>
              <div className="space-y-1.5 pt-1">
                {STORE_CONFIG.businessHours.map((bh, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1 border-b border-stone-100 last:border-none">
                    <span className="font-semibold text-stone-800">{bh.days}:</span>
                    <span className="text-stone-600 font-mono">{bh.time}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold pt-1">
                ✓ In-store trial room & master tailor measurement assistance available on-site.
              </p>
            </div>

          </div>

          {/* Book a Private Styling / Bridal Consultation Form */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-stone-50 to-gold-50/50 border border-gold-200 space-y-3">
            <div>
              <h3 className="font-heading text-sm font-bold text-stone-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold-700" />
                <span>Schedule a Store Visit or Bridal Try-On Consultation</span>
              </h3>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Let us know in advance so our bridal stylist can prepare curated lehengas & suits for you.
              </p>
            </div>

            <form onSubmit={handleBookVisit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                required
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder="Your Name *"
                className="text-xs p-2.5 rounded-lg border border-stone-300 bg-white"
              />

              <input
                type="datetime-local"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="text-xs p-2.5 rounded-lg border border-stone-300 bg-white text-stone-700"
              />

              <select
                value={visitCategory}
                onChange={(e) => setVisitCategory(e.target.value)}
                className="text-xs p-2.5 rounded-lg border border-stone-300 bg-white text-stone-800"
              >
                <option value="Bridal Lehengas">Bridal Lehengas</option>
                <option value="Zardozi Heavy Suits">Heavy Zari & Zardozi Suits</option>
                <option value="Banarasi Silk Sarees">Banarasi & Heritage Sarees</option>
                <option value="Custom Tailoring Fitting">Custom Tailoring Consultation</option>
              </select>

              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-brand-900 hover:bg-brand-950 text-white font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  {appointmentBooked ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Consultation Request Sent via WhatsApp!</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Request Visit Time via WhatsApp</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
};
