import React, { useState } from 'react';
import { TESTIMONIALS, FAQS, STORE_CONFIG } from '../data/storeInfo';
import { Star, ChevronDown, MessageCircle, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const TestimonialsSection: React.FC = () => {
  const { getWhatsAppDirectLink } = useShop();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-14 sm:py-16 bg-[#fbf8f2] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Testimonials Block */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 text-gold-900 text-xs font-bold border border-gold-300">
              <Sparkles className="w-3.5 h-3.5 text-gold-700" />
              <span>Devdaha & Rupandehi Customer Love</span>
            </div>
            <h2 className="font-heading text-3xl font-bold text-stone-900">
              Loved by Brides & Ethnic Connoisseurs
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Hear from women in Devdaha, Butwal, and Bhairahawa who found their dream outfits with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TESTIMONIALS.map((t) => (
              <div 
                key={t.id} 
                className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed italic mb-4">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xs text-stone-900">{t.name}</p>
                      <p className="text-[11px] text-stone-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gold-600" />
                        <span>{t.location}</span>
                      </p>
                    </div>
                    <span className="text-[10px] text-stone-400">{t.date}</span>
                  </div>
                  <div className="mt-2 text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-medium inline-block">
                    ✓ Verified: {t.verifiedPurchase}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto pt-6">
          <div className="text-center mb-8">
            <h3 className="font-heading text-2xl font-bold text-stone-900">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Everything you need to know about our Devdaha store, custom stitching, and Nepal delivery.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-semibold text-xs sm:text-sm text-stone-900 flex items-center justify-between hover:bg-stone-50"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still have questions WhatsApp prompt */}
          <div className="mt-8 p-4 rounded-2xl bg-white border border-stone-200 text-center space-y-2 shadow-sm">
            <p className="text-xs font-semibold text-stone-800">
              Have a specific question about an outfit or neckline style?
            </p>
            <a
              href={getWhatsAppDirectLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Chat with Devdaha Team on WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
