"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ClientProductListings from "@/components/ClientProductListings";
import BuyerDashboardLayout from "@/components/BuyerDashboardLayout";
import ProductPreviewDialog from "@/components/ProductPreviewDialog";
import UserProfileCard from "@/components/UserProfileCard"; // New import
import { Product, dummyProducts } from "@/data/dummyProducts";
import { useSession } from "@/contexts/SessionContext"; // New import
import { useLanguage } from "@/contexts/LanguageContext"; // New import

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantityUnit: string;
  orderedQuantity: number;
}

const ClientDashboard = () => {
  const { user, profile, isLoading, signOut } = useSession(); // Use session context
  const { t } = useLanguage(); // Use language context

  const initialProducts: Product[] = dummyProducts;

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductPreviewOpen, setIsProductPreviewOpen] = useState(false);

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].orderedQuantity += quantity;
        return updatedItems;
      } else {
        return [...prevItems, { ...product, orderedQuantity: quantity }];
      }
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredProducts(initialProducts);
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const results = initialProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.vendorName.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(results);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductPreviewOpen(true);
  };

  const handleCloseProductPreview = () => {
    setIsProductPreviewOpen(false);
    setSelectedProduct(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  if (!user || profile?.role !== 'client') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 text-center">
        <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">You must be logged in as a client to view this page.</p>
        <Link to="/auth">
          <Button className="px-6 py-3 text-lg bg-green-600 hover:bg-green-700 text-white">
            Go to Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <BuyerDashboardLayout cartItems={cartItems} onSearch={handleSearch} onRemoveFromCart={handleRemoveFromCart}>
      <div className="w-full max-w-6xl mx-auto py-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">{t('welcome_client')}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          Explore fresh fruits and vegetables from local vendors.
        </p>
        
        <div className="mb-8">
          {user && <UserProfileCard userId={user.id} />}
        </div>

        <div className="flex justify-between items-center mb-6 px-4">
          <div className="flex gap-2">
          </div>
          <div>
          </div>
        </div>

        <ClientProductListings 
          products={filteredProducts} 
          onAddToCart={handleAddToCart} 
          onProductClick={handleProductClick} 
        />

        <div className="mt-12 text-center">
          <Button onClick={signOut} variant="destructive" className="px-6 py-3 text-lg shadow-lg transform transition-transform hover:scale-105">
            {t('logout')}
          </Button>
        </div>
      </div>

      <ProductPreviewDialog
        product={selectedProduct}
        isOpen={isProductPreviewOpen}
        onClose={handleCloseProductPreview}
        onAddToCart={handleAddToCart}
      />
    </BuyerDashboardLayout>
  );
};

export default ClientDashboard;