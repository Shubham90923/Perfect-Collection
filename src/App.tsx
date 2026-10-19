import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';

// Modals
import { ProductDetailModal } from './components/ProductDetailModal';
import { ReelsShowcase } from './components/ReelsShowcase';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { StoreLocationModal } from './components/StoreLocationModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { AdminPortal } from './components/AdminPortal';

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] selection:bg-brand-900 selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <Hero />
        <CategoryFilter />
        <ProductGrid />
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals & Drawers */}
      <ProductDetailModal />
      <ReelsShowcase />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <StoreLocationModal />
      <SizeGuideModal />
      <AdminPortal />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
