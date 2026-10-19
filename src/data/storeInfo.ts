import { Testimonial } from '../types';

export const STORE_CONFIG = {
  name: 'Perfect Collection',
  tagline: 'Luxury Women’s Ethnic & Traditional Wear',
  handle: '@perfect.collectio4',
  tiktokUrl: 'https://www.tiktok.com/@perfect.collectio4',
  instagramUrl: 'https://www.instagram.com/perfect.collectio4',
  phone: '+977 9812345678',
  phoneDisplay: '+977 9812345678',
  whatsappRaw: '9779812345678', // For wa.me links
  email: 'contact@perfectcollection.com.np',
  
  // Physical Boutique Location
  address: {
    street: '6 No. Rijalchowk',
    ward: 'Devdaha -1',
    district: 'Rupandehi',
    province: 'Lumbini Province',
    country: 'Nepal',
    fullFormatted: 'Devdaha -1, 6 No. Rijalchowk, Rupandehi, Nepal',
    landmark: 'Opposite to Rijal Chowk Central Square, Main Highway Access',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14136.702875323497!2d83.5684!3d27.6749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996860e6e69bb3b%3A0x6e919ff7f21df912!2sDevdaha%2C%20Rupandehi!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp',
    googleMapsLink: 'https://maps.google.com/?q=Devdaha+Rijalchowk+Rupandehi+Nepal'
  },

  businessHours: [
    { days: 'Sunday – Friday', time: '10:00 AM – 7:30 PM' },
    { days: 'Saturday', time: '11:00 AM – 6:00 PM' }
  ],

  paymentInfo: {
    esewa: {
      id: '9812345678',
      name: 'Perfect Collection Devdaha',
      qrCodeImage: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=esewa://pay?id=9812345678&name=PerfectCollection'
    },
    khalti: {
      id: '9812345678',
      name: 'Perfect Collection Devdaha',
      qrCodeImage: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=khalti://pay?id=9812345678&name=PerfectCollection'
    },
    bankTransfer: {
      bankName: 'NIC Asia Bank Ltd.',
      branch: 'Devdaha Branch, Rupandehi',
      accountName: 'PERFECT COLLECTION BOUTIQUE',
      accountNumber: '108489201948201',
      swiftCode: 'NICA-NP-KTM'
    }
  },

  deliveryRates: {
    devdaha: { name: 'Devdaha Local Delivery', fee: 0, time: 'Same Day / within 4 hours' },
    rupandehi: { name: 'Butwal / Bhairahawa / Tilottama', fee: 100, freeAbove: 3000, time: 'Next Day Delivery' },
    nationwide: { name: 'Nationwide Courier (All Nepal)', fee: 200, time: '2–4 Business Days' },
    pickup: { name: 'Store Pickup at Devdaha Rijalchowk', fee: 0, time: 'Instant / Ready Today' }
  }
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Pooja Thapa',
    location: 'Devdaha -1, Rupandehi',
    rating: 5,
    comment: 'I visited the store at Rijalchowk after seeing their TikTok video showcase. The Gulabi Zardozi suit neckline detail is even more breathtaking in person than on camera! Perfect fitting and very warm hospitality.',
    date: '3 days ago',
    verifiedPurchase: 'Gulabi Zardozi Chanderi Suit'
  },
  {
    id: 't-2',
    name: 'Sunita Sharma',
    location: 'Traffic Chowk, Butwal',
    rating: 5,
    comment: 'Ordered via WhatsApp from Butwal. It was delivered the very next morning! The Katan Banarasi Silk saree drape is so authentic and the gold zari shimmer looks so rich.',
    date: '1 week ago',
    verifiedPurchase: 'Heritage Katan Banarasi Silk Saree'
  },
  {
    id: 't-3',
    name: 'Ritika Gurung',
    location: 'Bhairahawa',
    rating: 5,
    comment: 'Got my bridal lehenga semi-stitched customized here. The team coordinated all measurements on WhatsApp and sent video updates of the neckline and flare. 10/10 service!',
    date: '2 weeks ago',
    verifiedPurchase: 'Shahi Dulhan Bridal Lehenga'
  },
  {
    id: 't-4',
    name: 'Anjali Pandey',
    location: 'Tilottama, Rupandehi',
    rating: 5,
    comment: 'Finally a quality boutique right here in Rupandehi that understands modern neckline cuts and ethnic craftsmanship. Highly recommend @perfect.collectio4!',
    date: '3 weeks ago',
    verifiedPurchase: 'Mumtaz Angrakha Anarkali'
  }
];

export const FAQS = [
  {
    q: 'Can I visit the store in person to try on outfits?',
    a: 'Yes, absolutely! We warmly welcome you to our boutique at Devdaha -1, 6 No. Rijalchowk, Rupandehi. You can touch the fabrics, inspect intricate neckline embroidery, and try on your favorite lehengas and suits.'
  },
  {
    q: 'How does WhatsApp ordering work?',
    a: 'Simply click the "Order via WhatsApp" button on any product. A pre-filled message with the exact item code, color, size, and photo link will open in WhatsApp. Our team will promptly confirm stock, provide custom tailoring advice, and share payment details.'
  },
  {
    q: 'Do you offer custom tailoring / stitching for unstitched pieces?',
    a: 'Yes! We provide master-tailor custom stitching for blouses, kurtis, churidars, and lehengas. You can submit your measurements during checkout or send them directly via WhatsApp.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept eSewa, Khalti, direct Bank Transfer (NIC Asia), and Cash on Delivery (COD) for Devdaha, Butwal, Bhairahawa, Tilottama, and major cities across Nepal.'
  },
  {
    q: 'How long does delivery take within Rupandehi and outside?',
    a: 'Local Devdaha deliveries are dispatched same-day or within 4 hours. Butwal, Bhairahawa, and Tilottama are delivered next-day. Nationwide Nepal orders take 2 to 4 business days via courier.'
  }
];
