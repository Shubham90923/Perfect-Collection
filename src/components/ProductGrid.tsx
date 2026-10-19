import React, { useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Sparkles, SlidersHorizontal, PackageOpen } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const {
    products,
    activeCategory,
    searchQuery,
    selectedPriceMax,
    selectedFabric,
    selectedStockFilter,
    sortBy,
    setActiveCategory,
    setSelectedPriceMax,
    setSelectedFabric,
    setSelectedStockFilter,
    setSearchQuery
  } = useShop();

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCode = item.code.toLowerCase().includes(query);
        const matchesFabric = item.fabric.toLowerCase().includes(query);
        const matchesNeckline = item.necklineDetail.toLowerCase().includes(query);
        const matchesWork = item.workType.toLowerCase().includes(query);
        if (!matchesName && !matchesCode && !matchesFabric && !matchesNeckline && !matchesWork) {
          return false;
        }
      }

      // Price filter
      if (item.price > selectedPriceMax) {
        return false;
      }

      // Fabric filter
      if (selectedFabric !== 'all') {
        if (!item.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) {
          return false;
        }
      }

      // Stock status filter
      if (selectedStockFilter !== 'all') {
        if (item.stockStatus !== selectedStockFilter) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, activeCategory, searchQuery, selectedPriceMax, selectedFabric, selectedStockFilter, sortBy]);

  const handleClearFilters = () => {
    setActiveCategory('all');
    setSelectedPriceMax(40000);
    setSelectedFabric('all');
    setSelectedStockFilter('all');
    setSearchQuery('');
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Grid Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-2 border-b border-stone-200/80 mb-8">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-stone-900 capitalize">
            {activeCategory === 'all' ? 'All Traditional & Ethnic Masterpieces' : `${activeCategory} Collection`}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Displaying <strong className="text-stone-900">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'outfit' : 'outfits'} from Devdaha boutique
          </p>
        </div>

        {/* Quick status pill */}
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Verified Local Stock & Custom Fitting</span>
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-dashed border-stone-300 max-w-lg mx-auto">
          <PackageOpen className="w-12 h-12 text-stone-400 mx-auto mb-3" />
          <h3 className="font-heading text-xl font-bold text-stone-900 mb-1">
            No matching outfits found
          </h3>
          <p className="text-xs text-stone-500 mb-6 max-w-xs mx-auto">
            Try adjusting your search criteria, price range, or clearing fabric filters to view more items.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-5 py-2.5 rounded-full bg-brand-900 hover:bg-brand-950 text-white text-xs font-semibold shadow-md transition-all"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </section>
  );
};
