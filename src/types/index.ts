export type CategoryType = 'suits' | 'lehengas' | 'sarees' | 'anarkalis';

export type StockStatus = 'in_stock' | 'pre_order' | 'sold_out';

export interface ProductVariant {
  colorName: string;
  colorHex: string;
  image?: string;
}

export interface Product {
  id: string;
  code: string; // e.g. PC-1048
  name: string;
  category: CategoryType;
  subCategory: string; // e.g. "Heavy Zari Work", "Silk", "Casual Cotton"
  price: number; // In NPR
  originalPrice?: number;
  fabric: string; // e.g. "Pure Georgette with Zari & Sequence"
  workType: string; // e.g. "Hand Embroidered Neckline & Border Zardozi"
  necklineDetail: string; // Detailed neckline description
  stockStatus: StockStatus;
  stockCount: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestseller?: boolean;
  colors: ProductVariant[];
  sizes: string[]; // ['Unstitched', 'S', 'M', 'L', 'XL', 'XXL']
  images: string[];
  videoUrl?: string; // Short video preview
  videoDuration?: string;
  description: string;
  includedPieces: string; // "Kurti Top, Salwar Bottom, Dupatta"
  careInstructions?: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  customStitchingNotes?: string;
}

export type PaymentMethod = 'esewa' | 'khalti' | 'bank_transfer' | 'cod';

export interface OrderCustomerInfo {
  fullName: string;
  phone: string; // WhatsApp enabled phone number
  email?: string;
  city: string; // Devdaha, Butwal, Bhairahawa, Tilottama, etc.
  address: string; // Street/Tole, Ward No.
  landmark?: string;
  stitchingInstructions?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  customer: OrderCustomerInfo;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending_whatsapp' | 'confirmed' | 'payment_verified' | 'dispatched' | 'delivered';
  createdAt: string;
  paymentDetails?: {
    transactionId?: string;
    verifiedAt?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: string;
  avatar?: string;
}
