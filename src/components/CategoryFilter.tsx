import React from 'react';
import { useShop } from '../context/ShopContext';
import { CategoryType } from '../types';
import { SlidersHorizontal, RotateCcw, Check, Sparkles } from 'lucide-react';

export const CategoryFilter: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    selectedPriceMax,
    setSelectedPriceMax,
    selectedFabric,
    setSelectedFabric,
    selectedStockFilter,
    setSelectedStockFilter,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery
  } = useShop();

  const fabrics = [
    'all',
    'Chanderi Silk',
    'Velvet',
    'Raw Silk',
    'Katan Silk',
    'Organza',
    'Georgette',
    'Chinon Silk'
  ];

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSelectedPriceMax(40000);
    setSelectedFabric('all');
    setSelectedStockFilter('all');
    setSortBy('featured');
    setSearchQuery('');
  };

  const isFiltered = activeCategory !== 'all' || 
    selectedPriceMax < 40000 || 
    selectedFabric !== 'all' || 
    selectedStockFilter !== 'all' || 
    sortBy !== 'featured' || 
    searchQuery !== '';

  return (
    <div id="catalog-section" className="bg-white border-y border-stone-200 py-6 px-4 sm:px-6 lg:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Category Pill Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'suits', label: 'Suits' },
              { id: 'lehengas', label: 'Lehengas' },
              { id: 'sarees', label: 'Sarees' },
              { id: 'anarkalis', label: 'Anarkali Suits' }
            ].map(tab => {
              const active = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as CategoryType | 'all')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 ${
                    active
                      ? 'bg-brand-900 text-white shadow-md shadow-brand-900/20'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Reset Filters if active */}
          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-stone-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t border-stone-100 items-end">
          
          {/* Stock Filter */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Stock Status</span>
            </label>
            <div className="flex rounded-lg bg-stone-100 p-0.5 border border-stone-200">
              <button
                onClick={() => setSelectedStockFilter('all')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                  selectedStockFilter === 'all'
                    ? 'bg-white text-stone-900 shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedStockFilter('in_stock')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                  selectedStockFilter === 'in_stock'
                    ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                In Stock
              </button>
              <button
                onClick={() => setSelectedStockFilter('pre_order')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                  selectedStockFilter === 'pre_order'
                    ? 'bg-amber-600 text-white shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Pre-Order
              </button>
            </div>
          </div>

          {/* Fabric Type Filter */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Fabric Texture
            </label>
            <select
              value={selectedFabric}
              onChange={(e) => setSelectedFabric(e.target.value)}
              className="w-full text-xs font-medium bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-brand-500"
            >
              <option value="all">All Fabrics (Silk, Velvet, Chanderi...)</option>
              {fabrics.filter(f => f !== 'all').map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-1.5">
              <span>Max Budget:</span>
              <span className="text-brand-900 font-bold">
                {selectedPriceMax >= 40000 ? 'Any Budget' : `Up to Rs. ${selectedPriceMax.toLocaleString()}`}
              </span>
            </div>
            <input
              type="range"
              min="4000"
              max="40000"
              step="1000"
              value={selectedPriceMax}
              onChange={(e) => setSelectedPriceMax(Number(e.target.value))}
              className="w-full accent-brand-800 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>Rs. 4,000</span>
              <span>Rs. 40,000+</span>
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full text-xs font-medium bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-brand-500"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

        </div>

      </div>
    </div>
  );
};
