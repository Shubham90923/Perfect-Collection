import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, StockStatus, CategoryType, Order } from '../types';
import { 
  X, 
  Package, 
  ShoppingBag, 
  Plus, 
  Edit3, 
  Check, 
  Trash2, 
  TrendingUp, 
  AlertCircle,
  Truck,
  DollarSign,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    products, 
    orders, 
    updateProductStock, 
    updateOrderStatus,
    addProduct 
  } = useShop();

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'add_product'>('inventory');

  // New product form states
  const [newCode, setNewCode] = useState(`PC-${Math.floor(1000 + Math.random() * 9000)}`);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<CategoryType>('suits');
  const [newSubCategory, setNewSubCategory] = useState('Heavy Work');
  const [newPrice, setNewPrice] = useState<number>(6500);
  const [newOriginalPrice, setNewOriginalPrice] = useState<number>(7999);
  const [newFabric, setNewFabric] = useState('Pure Chanderi Silk');
  const [newWorkType, setNewWorkType] = useState('Zardozi & Gota Patti');
  const [newNeckline, setNewNeckline] = useState('Intricate Sweetheart Neckline with Pearl Tassels');
  const [newStockStatus, setNewStockStatus] = useState<StockStatus>('in_stock');
  const [newStockCount, setNewStockCount] = useState<number>(5);
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newIncludedPieces, setNewIncludedPieces] = useState('Kurti, Bottom Pant, Embroidered Dupatta');
  const [newDescription, setNewDescription] = useState('Exquisite ethnic ensemble crafted for weddings and festive functions.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isAdminOpen) return null;

  // Stats
  const totalStockCount = products.reduce((acc, p) => acc + p.stockCount, 0);
  const inStockItems = products.filter(p => p.stockStatus === 'in_stock').length;
  const preOrderItems = products.filter(p => p.stockStatus === 'pre_order').length;
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const newProd: Product = {
      id: `pc-${Date.now()}`,
      code: newCode,
      name: newName,
      category: newCategory,
      subCategory: newSubCategory,
      price: Number(newPrice),
      originalPrice: Number(newOriginalPrice) || undefined,
      fabric: newFabric,
      workType: newWorkType,
      necklineDetail: newNeckline,
      stockStatus: newStockStatus,
      stockCount: Number(newStockCount),
      isNewArrival: true,
      colors: [
        { colorName: 'Royal Red', colorHex: '#991b1b' },
        { colorName: 'Antique Gold', colorHex: '#ca8a04' }
      ],
      sizes: ['Unstitched', 'M', 'L', 'XL'],
      images: [newImageUrl],
      videoUrl: newVideoUrl || undefined,
      videoDuration: newVideoUrl ? '0:15' : undefined,
      description: newDescription,
      includedPieces: newIncludedPieces,
      rating: 5.0,
      reviewCount: 1
    };

    addProduct(newProd);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setActiveTab('inventory');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      
      <div 
        className="relative bg-white rounded-2xl md:rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-stone-300 text-stone-900 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-stone-950 text-white flex items-center justify-between border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-mono uppercase tracking-wider text-stone-400">
                Staff & Owner Portal • Devdaha Boutique
              </span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold mt-1">
              Perfect Collection Inventory & Order Control
            </h2>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Summary Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 sm:p-6 bg-[#fbf9f4] border-b border-stone-200">
          <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
            <span className="text-xs text-stone-500 font-medium block">Active Catalog Items</span>
            <span className="text-xl font-bold text-stone-950">{products.length} Designs</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
            <span className="text-xs text-stone-500 font-medium block">In-Stock Units</span>
            <span className="text-xl font-bold text-emerald-700">{totalStockCount} Units ({inStockItems} Live)</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
            <span className="text-xs text-stone-500 font-medium block">Pre-Order Items</span>
            <span className="text-xl font-bold text-amber-600">{preOrderItems} Designs</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
            <span className="text-xs text-stone-500 font-medium block">Customer Orders</span>
            <span className="text-xl font-bold text-brand-900">{orders.length} Placed</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 px-6 bg-white gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'inventory' ? 'border-brand-900 text-brand-950 font-bold' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Catalog & Stock Status ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'orders' ? 'border-brand-900 text-brand-950 font-bold' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders Management ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add_product')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'add_product' ? 'border-brand-900 text-brand-950 font-bold' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Add New Garment</span>
          </button>
        </div>

        {/* Body content based on tab */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          
          {/* TAB 1: INVENTORY MANAGEMENT */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="text-xs text-stone-500">
                Manage stock statuses in real time. Items marked as "In Stock" or "Pre-Order" will dynamically update on the customer storefront.
              </div>

              <div className="overflow-x-auto rounded-xl border border-stone-200">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-100 text-stone-700 font-semibold border-b border-stone-200">
                    <tr>
                      <th className="p-3">Item / Code</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Neckline Detail</th>
                      <th className="p-3">Stock Status</th>
                      <th className="p-3">Units Left</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-stone-50">
                        <td className="p-3">
                          <div className="flex items-center gap-2.5">
                            <img src={p.images[0]} alt={p.name} className="w-9 h-11 object-cover rounded border border-stone-300" />
                            <div>
                              <span className="font-bold text-stone-900 block">{p.name}</span>
                              <span className="font-mono text-[10px] text-stone-400 font-bold">{p.code}</span>
                            </div>
                          </div>
                        </td>

                        <td className="p-3 capitalize font-medium text-stone-700">
                          {p.category}
                        </td>

                        <td className="p-3 font-bold font-serif text-stone-900">
                          Rs. {p.price.toLocaleString()}
                        </td>

                        <td className="p-3 text-[11px] text-stone-600 max-w-xs truncate" title={p.necklineDetail}>
                          {p.necklineDetail}
                        </td>

                        <td className="p-3">
                          <select
                            value={p.stockStatus}
                            onChange={(e) => updateProductStock(p.id, e.target.value as StockStatus, p.stockCount)}
                            className={`p-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${
                              p.stockStatus === 'in_stock'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : p.stockStatus === 'pre_order'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : 'bg-stone-100 text-stone-600 border-stone-300'
                            }`}
                          >
                            <option value="in_stock">In Stock</option>
                            <option value="pre_order">Pre-Order</option>
                            <option value="sold_out">Sold Out</option>
                          </select>
                        </td>

                        <td className="p-3">
                          <input
                            type="number"
                            min="0"
                            value={p.stockCount}
                            onChange={(e) => updateProductStock(p.id, p.stockStatus, Number(e.target.value))}
                            className="w-16 p-1 rounded border border-stone-300 text-center text-xs font-bold"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length > 0 ? (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div key={ord.id} className="p-4 rounded-xl border border-stone-200 bg-[#fdfbf7] space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-brand-900">{ord.orderNumber}</span>
                          <span className="text-[10px] text-stone-400">
                            {new Date(ord.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold uppercase text-stone-600">
                            Payment: <strong>{ord.paymentMethod}</strong>
                          </span>
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as Order['status'])}
                            className="text-xs p-1 rounded-md border border-stone-300 font-semibold bg-white"
                          >
                            <option value="pending_whatsapp">Pending WhatsApp Confirmation</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="payment_verified">Payment Verified</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-stone-500">Customer:</p>
                          <p className="font-bold text-stone-900">{ord.customer.fullName} ({ord.customer.phone})</p>
                          <p className="text-stone-600">{ord.customer.city}, {ord.customer.address}</p>
                          {ord.customer.stitchingInstructions && (
                            <p className="text-brand-900 font-medium mt-1 bg-brand-50 p-1.5 rounded">
                              Tailoring note: {ord.customer.stitchingInstructions}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-stone-500">Ordered Items:</p>
                          <div className="space-y-1 mt-0.5">
                            {ord.items.map((it, idx) => (
                              <div key={idx} className="flex justify-between text-stone-800">
                                <span>{it.quantity}x {it.product.name} ({it.selectedColor}, {it.selectedSize})</span>
                                <span className="font-mono">Rs. {(it.product.price * it.quantity).toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                          <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-stone-950 mt-1">
                            <span>Total (incl. delivery):</span>
                            <span>Rs. {ord.total.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-1">
                        <a
                          href={`https://wa.me/977${ord.customer.phone.replace(/^(\+977|977)/, '')}?text=${encodeURIComponent(`Namaste ${ord.customer.fullName}! Perfect Collection here regarding your order #${ord.orderNumber}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white" />
                          <span>Chat with Customer</span>
                        </a>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-stone-400">
                  <ShoppingBag className="w-10 h-10 mx-auto mb-2 text-stone-300" />
                  <p className="font-bold text-stone-700">No customer orders placed yet</p>
                  <p className="text-xs text-stone-500">When visitors order through the checkout or cart, they will appear here.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ADD NEW PRODUCT */}
          {activeTab === 'add_product' && (
            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Item Code *</label>
                  <input
                    type="text"
                    required
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-full p-2 rounded-lg border border-stone-300 bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Royal Maroon Velvet Zardozi Suit Set"
                    className="w-full p-2 rounded-lg border border-stone-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as CategoryType)}
                    className="w-full p-2 rounded-lg border border-stone-300 bg-white"
                  >
                    <option value="suits">Suits</option>
                    <option value="lehengas">Lehengas</option>
                    <option value="sarees">Sarees</option>
                    <option value="anarkalis">Anarkali Suits</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Price (NPR / Rs.) *</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-stone-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Original / Strike Price</label>
                  <input
                    type="number"
                    value={newOriginalPrice}
                    onChange={(e) => setNewOriginalPrice(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-stone-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Fabric & Material *</label>
                  <input
                    type="text"
                    required
                    value={newFabric}
                    onChange={(e) => setNewFabric(e.target.value)}
                    className="w-full p-2 rounded-lg border border-stone-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Handwork / Embroidery *</label>
                  <input
                    type="text"
                    required
                    value={newWorkType}
                    onChange={(e) => setNewWorkType(e.target.value)}
                    className="w-full p-2 rounded-lg border border-stone-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Initial Stock Count</label>
                  <input
                    type="number"
                    value={newStockCount}
                    onChange={(e) => setNewStockCount(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-stone-300 bg-white"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block font-semibold text-stone-700 mb-1">Neckline Details Highlight *</label>
                  <input
                    type="text"
                    required
                    value={newNeckline}
                    onChange={(e) => setNewNeckline(e.target.value)}
                    placeholder="e.g. Deep Sweetheart Cut with heavy Dabka and Pearl Bordering"
                    className="w-full p-2 rounded-lg border border-stone-300 bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-700 mb-1">Image URL (High-Resolution) *</label>
                  <input
                    type="url"
                    required
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="w-full p-2 rounded-lg border border-stone-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Short Video URL (MP4 / Reel)</label>
                  <input
                    type="url"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    placeholder="https://...mp4"
                    className="w-full p-2 rounded-lg border border-stone-300 bg-white"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block font-semibold text-stone-700 mb-1">Included Pieces</label>
                  <input
                    type="text"
                    value={newIncludedPieces}
                    onChange={(e) => setNewIncludedPieces(e.target.value)}
                    className="w-full p-2 rounded-lg border border-stone-300 bg-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-brand-900 hover:bg-brand-950 text-white font-bold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Garment Added to Catalog!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Publish Outfit to Online Catalog</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
