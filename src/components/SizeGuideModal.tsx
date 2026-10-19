import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { STORE_CONFIG } from '../data/storeInfo';
import { X, Ruler, Scissors, MessageCircle, HelpCircle } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen, getWhatsAppDirectLink } = useShop();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isSizeGuideOpen) return null;

  const sizeTable = [
    { size: 'XS', bustIn: '34', waistIn: '28', hipIn: '36', bustCm: '86', waistCm: '71', hipCm: '91' },
    { size: 'S', bustIn: '36', waistIn: '30', hipIn: '38', bustCm: '91', waistCm: '76', hipCm: '96' },
    { size: 'M', bustIn: '38', waistIn: '32', hipIn: '40', bustCm: '96', waistCm: '81', hipCm: '101' },
    { size: 'L', bustIn: '40', waistIn: '34', hipIn: '42', bustCm: '101', waistCm: '86', hipCm: '106' },
    { size: 'XL', bustIn: '42', waistIn: '36', hipIn: '44', bustCm: '106', waistCm: '91', hipCm: '111' },
    { size: 'XXL', bustIn: '44', waistIn: '38', hipIn: '46', bustCm: '111', waistCm: '96', hipCm: '116' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      
      <div 
        className="relative bg-white rounded-2xl md:rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 text-stone-900 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-400/20 flex items-center justify-center text-gold-300">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold">
                Ethnic Wear Size & Measurement Guide
              </h2>
              <p className="text-xs text-stone-300">
                Suits, Sarees, Lehengas & Anarkalis
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Unit Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              Standard Ready-to-Wear Chart
            </span>
            <div className="flex bg-stone-100 rounded-lg p-0.5 border border-stone-200">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  unit === 'inches' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                }`}
              >
                Inches (in)
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  unit === 'cm' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-stone-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#f9f7f2] font-semibold text-stone-700 border-b border-stone-200">
                <tr>
                  <th className="p-3">Size</th>
                  <th className="p-3">Bust / Chest</th>
                  <th className="p-3">Waist</th>
                  <th className="p-3">Hip</th>
                  <th className="p-3">Kurti Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {sizeTable.map((row) => (
                  <tr key={row.size} className="hover:bg-stone-50">
                    <td className="p-3 font-bold text-brand-900">{row.size}</td>
                    <td className="p-3">{unit === 'inches' ? `${row.bustIn}"` : `${row.bustCm} cm`}</td>
                    <td className="p-3">{unit === 'inches' ? `${row.waistIn}"` : `${row.waistCm} cm`}</td>
                    <td className="p-3">{unit === 'inches' ? `${row.hipIn}"` : `${row.hipCm} cm`}</td>
                    <td className="p-3">{unit === 'inches' ? '44" – 46"' : '112 – 117 cm'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Garment Construction & Fabrics Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-1.5 font-bold text-stone-900 mb-1">
                <Scissors className="w-4 h-4 text-brand-800" />
                <span>Unstitched Suits</span>
              </div>
              <p className="text-stone-600 leading-relaxed text-[11px]">
                Comes with 3.0m Kurti fabric, 2.5m Bottom fabric & 2.4m Dupatta. Can be tailored to any size from XS to 5XL.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-1.5 font-bold text-stone-900 mb-1">
                <Scissors className="w-4 h-4 text-brand-800" />
                <span>Semi-Stitched Lehengas</span>
              </div>
              <p className="text-stone-600 leading-relaxed text-[11px]">
                Skirt is pre-flared with can-can. Blouse is unstitched fabric allowing customized neckline, sleeve & back depth.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-1.5 font-bold text-stone-900 mb-1">
                <Scissors className="w-4 h-4 text-brand-800" />
                <span>Sarees (Free Size)</span>
              </div>
              <p className="text-stone-600 leading-relaxed text-[11px]">
                Full length 5.5 meters with 0.8 meter matching unstitched blouse piece. Fall and pico can be requested.
              </p>
            </div>
          </div>

          {/* WhatsApp Direct Tailor Consultation */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-bold text-emerald-950">
                Unsure about your measurements?
              </p>
              <p className="text-emerald-800 text-[11px]">
                Send your measurements or ask for advice directly from our Devdaha master tailor on WhatsApp.
              </p>
            </div>

            <a
              href={getWhatsAppDirectLink("Namaste! I need help choosing the right size and stitching options for an outfit.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shrink-0 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Ask Our Tailor</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
