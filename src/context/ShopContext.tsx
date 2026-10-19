import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, CategoryType, OrderCustomerInfo, PaymentMethod, StockStatus } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { STORE_CONFIG } from '../data/storeInfo';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  activeCategory: CategoryType | 'all';
  searchQuery: string;
  selectedPriceMax: number;
  selectedFabric: string;
  selectedStockFilter: 'all' | 'in_stock' | 'pre_order';
  sortBy: string;
  
  // Modals & Viewers
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isLocationOpen: boolean;
  isSizeGuideOpen: boolean;
  isAdminOpen: boolean;
  selectedProduct: Product | null;
  activeReelProduct: Product | null;
  lastPlacedOrder: Order | null;
  
  // State setters
  setActiveCategory: (cat: CategoryType | 'all') => void;
  setSearchQuery: (query: string) => void;
  setSelectedPriceMax: (val: number) => void;
  setSelectedFabric: (fabric: string) => void;
  setSelectedStockFilter: (filter: 'all' | 'in_stock' | 'pre_order') => void;
  setSortBy: (sort: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsLocationOpen: (open: boolean) => void;
  setIsSizeGuideOpen: (open: boolean) => void;
  setIsAdminOpen: (open: boolean) => void;
  setSelectedProduct: (p: Product | null) => void;
  setActiveReelProduct: (p: Product | null) => void;
  setLastPlacedOrder: (o: Order | null) => void;

  // Actions
  addToCart: (product: Product, color: string, size: string, quantity?: number, stitchingNotes?: string) => void;
  removeFromCart: (productId: string, color: string, size: string) => void;
  updateCartQuantity: (productId: string, color: string, size: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  placeOrder: (customer: OrderCustomerInfo, paymentMethod: PaymentMethod) => Order;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  updateProductStock: (productId: string, stockStatus: StockStatus, stockCount: number) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Helper calculation
  cartSubtotal: number;
  cartItemCount: number;
  getWhatsAppOrderLink: (product: Product, color?: string, size?: string, note?: string) => string;
  getWhatsAppCartLink: (customer?: Partial<OrderCustomerInfo>) => string;
  getWhatsAppDirectLink: (msg?: string) => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products from localStorage or fallback
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('pc_products_v1');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pc_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pc_wishlist_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('pc_orders_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filters
  const [activeCategory, setActiveCategory] = useState<CategoryType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceMax, setSelectedPriceMax] = useState<number>(40000);
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [selectedStockFilter, setSelectedStockFilter] = useState<'all' | 'in_stock' | 'pre_order'>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeReelProduct, setActiveReelProduct] = useState<Product | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('pc_products_v1', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('pc_cart_v1', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('pc_wishlist_v1', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('pc_orders_v1', JSON.stringify(orders));
  }, [orders]);

  // Cart actions
  const addToCart = (product: Product, color: string, size: string, quantity = 1, stitchingNotes = '') => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedColor === color && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        if (stitchingNotes) {
          next[existingIndex].customStitchingNotes = stitchingNotes;
        }
        return next;
      }
      return [...prev, { product, selectedColor: color, selectedSize: size, quantity, customStitchingNotes: stitchingNotes }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, color: string, size: string) => {
    setCart(prev => prev.filter(
      item => !(item.product.id === productId && item.selectedColor === color && item.selectedSize === size)
    ));
  };

  const updateCartQuantity = (productId: string, color: string, size: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedColor === color && item.selectedSize === size) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const clearCart = () => setCart([]);

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const placeOrder = (customer: OrderCustomerInfo, paymentMethod: PaymentMethod): Order => {
    const isDevdaha = customer.city.toLowerCase().includes('devdaha');
    const isRupandehi = customer.city.toLowerCase().includes('butwal') || 
                        customer.city.toLowerCase().includes('bhairahawa') || 
                        customer.city.toLowerCase().includes('tilottama') || 
                        customer.city.toLowerCase().includes('rupandehi');

    let deliveryFee = 200;
    if (isDevdaha) {
      deliveryFee = 0;
    } else if (isRupandehi) {
      deliveryFee = cartSubtotal >= 3000 ? 0 : 100;
    }

    const orderNumber = `PC-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber,
      items: [...cart],
      customer,
      paymentMethod,
      subtotal: cartSubtotal,
      deliveryFee,
      total: cartSubtotal + deliveryFee,
      status: paymentMethod === 'cod' ? 'confirmed' : 'pending_whatsapp',
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setLastPlacedOrder(newOrder);
    return newOrder;
  };

  // Product management (Admin)
  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const addProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
  };

  const updateProductStock = (productId: string, stockStatus: StockStatus, stockCount: number) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stockStatus, stockCount } : p));
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  // WhatsApp link generators
  const getWhatsAppOrderLink = (product: Product, color?: string, size?: string, note?: string) => {
    const chosenColor = color || product.colors[0]?.colorName || 'Default';
    const chosenSize = size || product.sizes[0] || 'Standard';
    const text = `Namaste Perfect Collection! 🙏✨%0A%0AI would like to order / inquire about:%0A*Product:* ${encodeURIComponent(product.name)}%0A*Item Code:* ${product.code}%0A*Category:* ${product.category.toUpperCase()}%0A*Price:* Rs. ${product.price.toLocaleString()}%0A*Selected Color:* ${encodeURIComponent(chosenColor)}%0A*Selected Size / Stitching:* ${encodeURIComponent(chosenSize)}%0A${note ? `*Note:* ${encodeURIComponent(note)}%0A` : ''}%0A*Store Location:* Devdaha -1, 6 No. Rijalchowk, Rupandehi%0APlease let me know if this is available for pickup / delivery!`;
    return `https://wa.me/${STORE_CONFIG.whatsappRaw}?text=${text}`;
  };

  const getWhatsAppCartLink = (customer?: Partial<OrderCustomerInfo>) => {
    let itemsText = cart.map((item, idx) => 
      `${idx + 1}. *${item.product.name}* (${item.product.code}) - ${item.selectedColor}, Size: ${item.selectedSize} x ${item.quantity} = Rs. ${(item.product.price * item.quantity).toLocaleString()}`
    ).join('%0A');

    const total = cartSubtotal;
    const custName = customer?.fullName ? `%0A*Customer:* ${encodeURIComponent(customer.fullName)}` : '';
    const custLoc = customer?.city ? `%0A*Delivery City:* ${encodeURIComponent(customer.city)}` : '';

    const text = `Namaste Perfect Collection! 🙏✨%0A%0AI want to place an order from your online catalog:%0A%0A${itemsText}%0A%0A*Subtotal:* Rs. ${total.toLocaleString()}${custName}${custLoc}%0A%0APlease confirm my order & share payment details. Dhanyabad!`;
    return `https://wa.me/${STORE_CONFIG.whatsappRaw}?text=${text}`;
  };

  const getWhatsAppDirectLink = (msg?: string) => {
    const base = msg 
      ? `https://wa.me/${STORE_CONFIG.whatsappRaw}?text=${encodeURIComponent(msg)}`
      : `https://wa.me/${STORE_CONFIG.whatsappRaw}?text=${encodeURIComponent('Namaste Perfect Collection! I have an inquiry regarding your women\'s ethnic wear collection at Devdaha store.')}`;
    return base;
  };

  return (
    <ShopContext.Provider value={{
      products,
      cart,
      wishlist,
      orders,
      activeCategory,
      searchQuery,
      selectedPriceMax,
      selectedFabric,
      selectedStockFilter,
      sortBy,
      isCartOpen,
      isCheckoutOpen,
      isLocationOpen,
      isSizeGuideOpen,
      isAdminOpen,
      selectedProduct,
      activeReelProduct,
      lastPlacedOrder,
      setActiveCategory,
      setSearchQuery,
      setSelectedPriceMax,
      setSelectedFabric,
      setSelectedStockFilter,
      setSortBy,
      setIsCartOpen,
      setIsCheckoutOpen,
      setIsLocationOpen,
      setIsSizeGuideOpen,
      setIsAdminOpen,
      setSelectedProduct,
      setActiveReelProduct,
      setLastPlacedOrder,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleWishlist,
      isInWishlist,
      placeOrder,
      updateProduct,
      addProduct,
      updateProductStock,
      updateOrderStatus,
      cartSubtotal,
      cartItemCount,
      getWhatsAppOrderLink,
      getWhatsAppCartLink,
      getWhatsAppDirectLink,
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
