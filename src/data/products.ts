import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // SUITS
  {
    id: 'pc-suit-101',
    code: 'PC-ST-101',
    name: 'Gulabi Zardozi Chanderi Silk Suit Set',
    category: 'suits',
    subCategory: 'Heavy Work Suits',
    price: 6850,
    originalPrice: 8500,
    fabric: 'Pure Chanderi Silk with Santoon Lining & Organza Dupatta',
    workType: 'Handcrafted Zardozi, Golden Gota Patti & Moti Work',
    necklineDetail: 'Regal Sweetheart Neckline framed with intricate dabka & pearl embroidery',
    stockStatus: 'in_stock',
    stockCount: 5,
    isFeatured: true,
    isBestseller: true,
    colors: [
      { colorName: 'Gulabi Rose Pink', colorHex: '#e06b88' },
      { colorName: 'Champagne Gold', colorHex: '#e2ba7d' },
      { colorName: 'Emerald Green', colorHex: '#1b4d3e' }
    ],
    sizes: ['Unstitched', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-an-ethnic-dress-41399-large.mp4',
    videoDuration: '0:14',
    description: 'A masterpiece created for festive occasions and wedding celebrations. Features an ornate neckline with genuine dabka and micro-pearls hand-embroidered by master artisans, paired with a scallop-bordered scalloped organza dupatta.',
    includedPieces: 'Full Embroidered Kurti (3m), Trouser Fabric (2.5m), Organza Embroidered Dupatta (2.4m)',
    careInstructions: 'Dry Clean Only. Keep in breathable muslin bag.',
    rating: 4.9,
    reviewCount: 38
  },
  {
    id: 'pc-suit-102',
    code: 'PC-ST-102',
    name: 'Noor Emerald Velvet Winter Suit',
    category: 'suits',
    subCategory: 'Heavy Work Suits',
    price: 9200,
    originalPrice: 11500,
    fabric: 'Micro 9000 Royal Velvet with Embroidered Silk Dupatta',
    workType: 'Tilla Kashmiri Embroidery & Antique Zari Border',
    necklineDetail: 'Band Collar V-Slit with dense antique gold Kashmiri tilla handwork',
    stockStatus: 'in_stock',
    stockCount: 3,
    isFeatured: true,
    colors: [
      { colorName: 'Royal Emerald', colorHex: '#084c38' },
      { colorName: 'Deep Wine Burgundy', colorHex: '#58111a' },
      { colorName: 'Midnight Navy', colorHex: '#0f172a' }
    ],
    sizes: ['Unstitched', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-in-a-luxurious-gown-41395-large.mp4',
    videoDuration: '0:18',
    description: 'Rich, plush Micro 9000 Velvet tailored to perfection. The antique gold tilla threadwork catches ambient evening light gorgeously, making it ideal for Rupandehi winter wedding receptions.',
    includedPieces: 'Velvet Top with Hand Embroidery, Velvet Pants, Heavy Pure Silk Shawl Dupatta',
    careInstructions: 'Strictly Dry Clean Only.',
    rating: 5.0,
    reviewCount: 22
  },
  {
    id: 'pc-suit-103',
    code: 'PC-ST-103',
    name: 'Kashish Pastel Chanderi Daily Festive Suit',
    category: 'suits',
    subCategory: 'Casual & Semi-Formal',
    price: 4250,
    originalPrice: 5200,
    fabric: 'Pure Cotton Silk with Mulmul Cotton Lining & Kota Doria Dupatta',
    workType: 'Resham Thread Floral Work & Subtle Sequins',
    necklineDetail: 'Classic Round Neckline with Button Placket & Delicate Thread Flora',
    stockStatus: 'in_stock',
    stockCount: 12,
    isNewArrival: true,
    colors: [
      { colorName: 'Powder Blue', colorHex: '#93c5fd' },
      { colorName: 'Peach Blush', colorHex: '#fbcfe8' },
      { colorName: 'Mint Sage', colorHex: '#a7f3d0' }
    ],
    sizes: ['Unstitched', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-modeling-a-traditional-indian-dress-41396-large.mp4',
    videoDuration: '0:12',
    description: 'Breathable, lightweight cotton silk suitable for daytime poojas, family gatherings, and casual celebrations in Devdaha & Butwal. Gentle hand feel with long-lasting vibrant sheen.',
    includedPieces: 'Cotton Silk Kurti (2.5m), Cotton Bottom (2.5m), Printed Kota Doria Dupatta',
    careInstructions: 'Gentle Hand Wash in Cold Water or Mild Dry Clean.',
    rating: 4.8,
    reviewCount: 45
  },

  // LEHENGAS
  {
    id: 'pc-lehenga-201',
    code: 'PC-LH-201',
    name: 'Shahi Dulhan Crimson Bridal Lehenga',
    category: 'lehengas',
    subCategory: 'Bridal Lehengas',
    price: 32500,
    originalPrice: 38000,
    fabric: 'Raw Silk with Double Can-Can Layering & Dual Organza-Net Dupattas',
    workType: 'Heavy Cutwork Border, Zardozi, Kundan Stone & Marodi Embroidery',
    necklineDetail: 'Deep Royal Cut Blouse with Embroidered Latkan Back Dori',
    stockStatus: 'in_stock',
    stockCount: 2,
    isFeatured: true,
    isBestseller: true,
    colors: [
      { colorName: 'Sindoor Crimson', colorHex: '#9f1239' },
      { colorName: 'Rani Magenta', colorHex: '#be185d' }
    ],
    sizes: ['Semi-Stitched (Up to 44 Bust/Waist)', 'Custom Tailored'],
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-in-a-luxurious-gown-41395-large.mp4',
    videoDuration: '0:22',
    description: 'The quintessential Nepali wedding bridal set. Crafted with over 160 hours of artisanal handwork on lustrous raw silk. 5-meter flare with double can-can gives extraordinary volume for your once-in-a-lifetime wedding moment.',
    includedPieces: 'Embroidered Semi-Stitched Lehenga, Unstitched Blouse Piece with Sleeves, Dual Heavy Dupattas',
    careInstructions: 'Strictly Professional Bridal Dry Clean. Store in heirloom bridal box.',
    rating: 5.0,
    reviewCount: 19
  },
  {
    id: 'pc-lehenga-202',
    code: 'PC-LH-202',
    name: 'Aafreen Lavender Mirror Work Party Lehenga',
    category: 'lehengas',
    subCategory: 'Party & Sangeet Lehengas',
    price: 18500,
    originalPrice: 22000,
    fabric: 'Georgette with Flared Inner Lining & Soft Net Dupatta',
    workType: 'Original Glass Mirror Work, Resham Thread & Foil Accents',
    necklineDetail: 'Modern Scoop Plunge with Dori-Tied Latkan Blouse',
    stockStatus: 'in_stock',
    stockCount: 4,
    isNewArrival: true,
    colors: [
      { colorName: 'Lilac Lavender', colorHex: '#c084fc' },
      { colorName: 'Pistachio Mint', colorHex: '#86efac' },
      { colorName: 'Champagne Yellow', colorHex: '#fef08a' }
    ],
    sizes: ['Semi-Stitched', 'Custom Stitching Available'],
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-an-ethnic-dress-41399-large.mp4',
    videoDuration: '0:15',
    description: 'A dazzling party look designed for Sangeet nights and reception celebrations. The real mirror work catches every camera flash and stage light effortlessly as you dance.',
    includedPieces: 'Flared 4.2m Lehenga Skirt, Heavy Designer Blouse Fabric, Light Scalloped Dupatta',
    careInstructions: 'Dry Clean Only.',
    rating: 4.9,
    reviewCount: 31
  },

  // SAREES
  {
    id: 'pc-saree-301',
    code: 'PC-SR-301',
    name: 'Devdaha Heritage Katan Banarasi Silk Saree',
    category: 'sarees',
    subCategory: 'Silk Sarees',
    price: 11800,
    originalPrice: 14500,
    fabric: 'Pure Katan Weave Silk with Pure Gold Zari Pallu',
    workType: 'Traditional Kadwa Weave with Floral Jaal & Royal Minakari',
    necklineDetail: 'Comes with unstitched heavy brocade blouse fabric for custom neckline tailoring',
    stockStatus: 'in_stock',
    stockCount: 6,
    isFeatured: true,
    isBestseller: true,
    colors: [
      { colorName: 'Royal Vermillion Red', colorHex: '#be123c' },
      { colorName: 'Peacock Blue', colorHex: '#0e7490' },
      { colorName: 'Mustard Haldi Yellow', colorHex: '#ca8a04' }
    ],
    sizes: ['Free Size (6.3m with Blouse Piece)'],
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-modeling-a-traditional-indian-dress-41396-large.mp4',
    videoDuration: '0:20',
    description: 'A timeless heirloom piece woven with pure gold zari. Perfect for Dashain, Tihar, Teej, and wedding ceremonies. Holds its structured drape with unrivaled royal grace.',
    includedPieces: '5.5m Pure Katan Silk Saree + 0.8m Matching Heavy Brocade Blouse Piece',
    careInstructions: 'Dry Clean Only. Wrap in white cotton cloth.',
    rating: 5.0,
    reviewCount: 52
  },
  {
    id: 'pc-saree-302',
    code: 'PC-SR-302',
    name: 'Nazneen Hand-Painted Floral Organza Saree',
    category: 'sarees',
    subCategory: 'Organza Sarees',
    price: 7400,
    originalPrice: 8900,
    fabric: 'Semi-Sheer Crisp Silk Organza with Gota Scallop Hem',
    workType: 'Hand-painted Botanical Motifs with Cutdana Border Highlights',
    necklineDetail: 'Includes Designer Satin-Silk Blouse piece with sleeve embroidery border',
    stockStatus: 'in_stock',
    stockCount: 8,
    isNewArrival: true,
    colors: [
      { colorName: 'Blush Ivory', colorHex: '#fdf2f8' },
      { colorName: 'Aqua Sky', colorHex: '#e0f2fe' },
      { colorName: 'Lavender Mist', colorHex: '#f3e8ff' }
    ],
    sizes: ['Free Size (6.3m with Blouse Piece)'],
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-an-ethnic-dress-41399-large.mp4',
    videoDuration: '0:16',
    description: 'Ethereal and ultra-modern. The sheer translucence of pure organza is elevated with delicate hand-brushed blooms and luminous cutdana beads that glimmer under daylight.',
    includedPieces: '5.5m Hand-painted Organza Saree + 0.8m Raw Silk Blouse Fabric',
    careInstructions: 'Strictly Dry Clean Only. Avoid direct ironing on painted surface.',
    rating: 4.8,
    reviewCount: 29
  },

  // ANARKALIS
  {
    id: 'pc-anarkali-401',
    code: 'PC-AK-401',
    name: 'Mumtaz Floor-Length Royal Angrakha Anarkali',
    category: 'anarkalis',
    subCategory: 'Royal Floor Length',
    price: 13500,
    originalPrice: 16200,
    fabric: 'Heavy Chinon Silk with Shantoon Lining & Net Dupatta',
    workType: 'Antique Dabka, Pearl Motifs & 28-Kali Kalidar Flare',
    necklineDetail: 'Crossover Angrakha Neckline adorned with handmade silk dori tassels',
    stockStatus: 'in_stock',
    stockCount: 3,
    isFeatured: true,
    colors: [
      { colorName: 'Rani Pink & Gold', colorHex: '#be185d' },
      { colorName: 'Mor-Pankhi Teal', colorHex: '#0f766e' },
      { colorName: 'Ivory Royal Cream', colorHex: '#fef3c7' }
    ],
    sizes: ['Unstitched', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-in-a-luxurious-gown-41395-large.mp4',
    videoDuration: '0:25',
    description: 'Featuring a grand 28-kali kalidar sweep that flows majestically as you walk. The Angrakha overlap neckline is decorated with rich antique dabka work and custom handcrafted latkans.',
    includedPieces: 'Stitched/Unstitched Anarkali Gown (56 inch length), Churidar Bottom, 2.5m Heavy Embroidered Dupatta',
    careInstructions: 'Dry Clean Only.',
    rating: 4.9,
    reviewCount: 41
  },
  {
    id: 'pc-anarkali-402',
    code: 'PC-AK-402',
    name: 'Jahanara Georgette Layered Festive Anarkali',
    category: 'anarkalis',
    subCategory: 'Layered Festive',
    price: 8900,
    originalPrice: 10800,
    fabric: 'Fox Georgette with Thread Embroidery & Sequence Highlights',
    workType: 'Micro Sequins & Zari Floral Embroidery',
    necklineDetail: 'High Mandarin Collar with Teardrop Keyhole & Moti Border',
    stockStatus: 'pre_order',
    stockCount: 7,
    isNewArrival: true,
    colors: [
      { colorName: 'Maroon Ruby', colorHex: '#881337' },
      { colorName: 'Midnight Black & Gold', colorHex: '#18181b' },
      { colorName: 'Teal Peacock', colorHex: '#115e59' }
    ],
    sizes: ['Unstitched', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-an-ethnic-dress-41399-large.mp4',
    videoDuration: '0:17',
    description: 'Dramatic double-layered flare in lightweight fox georgette. Comfortable for long wedding events while exuding aristocratic grace. Available for immediate pre-order with custom tailoring option.',
    includedPieces: 'Double Layered Kurti Anarkali, Stretchable Lycra Churidar, Sequence Border Dupatta',
    careInstructions: 'Dry Clean Recommended.',
    rating: 4.7,
    reviewCount: 16
  }
];

export const CATEGORIES_META = [
  {
    id: 'suits',
    label: 'Suits',
    subtitle: 'Casual & Heavy Zari Work',
    count: 3,
    icon: 'Sparkles',
    bannerImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted necklines, Pakistani & Indian cuts, pure silk, organza, and festive cotton suites.'
  },
  {
    id: 'lehengas',
    label: 'Lehengas',
    subtitle: 'Bridal & Grand Sangeet Flare',
    count: 2,
    icon: 'Crown',
    bannerImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    description: 'Heavy bridal lehengas with can-can layering, real mirror work, and intricate zardozi craftsmanship.'
  },
  {
    id: 'sarees',
    label: 'Sarees',
    subtitle: 'Silk, Banarasi & Organza',
    count: 2,
    icon: 'Flame',
    bannerImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    description: 'Timeless Katan Banarasi weaves, sheer floral organzas, and fluid georgettes.'
  },
  {
    id: 'anarkalis',
    label: 'Anarkali Suits',
    subtitle: '28-Kali & Angrakha Gowns',
    count: 2,
    icon: 'Layers',
    bannerImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
    description: 'Flared floor-length royal anarkalis with statement necklines and delicate latkans.'
  }
];
