"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ClientProductListings from "@/components/ClientProductListings";
import BuyerDashboardLayout from "@/components/BuyerDashboardLayout";
import ProductPreviewDialog from "@/components/ProductPreviewDialog";
import ProductMap from "@/components/ProductMap"; // Import the new map component
import { Product, dummyProducts } from "@/data/dummyProducts"; // Import from new centralized file
import { List, Map as MapIcon } from "lucide-react"; // Import icons for toggle

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantityUnit: string;
  orderedQuantity: number;
}

const ClientDashboard = () => {
  const initialProducts: Product[] = dummyProducts;

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductPreviewOpen, setIsProductPreviewOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list"); // New state for view mode

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
        product.vendorName.toLowerCase().includes(lowerCaseQuery) ||
        (product.city && product.city.toLowerCase().includes(lowerCaseQuery)) // Search by city
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

  return (
    <BuyerDashboardLayout cartItems={cartItems} onSearch={handleSearch} onRemoveFromCart={handleRemoveFromCart}>
      <div className="w-full max-w-6xl mx-auto py-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">Available Products</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          Explore fresh fruits and vegetables from local vendors.
        </p>
        
        <div className="flex justify-between items-center mb-6 px-4">
          <div className="flex gap-2">
            <Button 
              variant={viewMode === "list" ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-green-600 hover:bg-green-700 text-white" : "border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-gray-700"}
            >
              <List className="h-4 w-4 mr-2" /> List View
            </Button>
            <Button 
              variant={viewMode === "map" ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewMode("map")}
              className={viewMode === "map" ? "bg-green-600 hover:bg-green-700 text-white" : "border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-gray-700"}
            >
              <MapIcon className="h-4 w-4 mr-2" /> Map View
            </Button>
          </div>
          <div>
            {/* Sorting options can go here */}
          </div>
        </div>

        {viewMode === "list" ? (
          <ClientProductListings 
            products={filteredProducts} 
            onAddToCart={handleAddToCart} 
            onProductClick={handleProductClick} 
          />
        ) : (
          <ProductMap 
            products={filteredProducts} 
            onProductClick={handleProductClick} 
          />
        )}

        <div className="mt-12 text-center">
          <Link to="/">
            <Button variant="outline" className="px-6 py-3 text-lg border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-gray-700 shadow-lg transform transition-transform hover:scale-105">
              Back to Home
            </Button>
          </Link>
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