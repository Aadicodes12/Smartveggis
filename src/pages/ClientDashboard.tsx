"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ClientProductListings from "@/components/ClientProductListings";
import BuyerDashboardLayout from "@/components/BuyerDashboardLayout";
import ProductPreviewDialog from "@/components/ProductPreviewDialog";
import EditProductPage from "./EditProductPage"; // Import to access dummyProducts

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantityUnit: string;
  imageUrl: string;
  minOrderQuantity: number;
  availableQuantity: number;
  vendorName: string;
  latitude?: number; // Added for location feature
  longitude?: number; // Added for location feature
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantityUnit: string;
  orderedQuantity: number;
}

const ClientDashboard = () => {
  // Use the dummyProducts from EditProductPage for consistency, ensuring it's always an array
  const initialProducts: Product[] = EditProductPage.dummyProducts || [];

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

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredProducts(initialProducts); // Use initialProducts here as well
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const results = initialProducts.filter( // Filter from initialProducts
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

  return (
    <BuyerDashboardLayout cartItems={cartItems} onSearch={handleSearch}>
      <div className="w-full max-w-6xl mx-auto py-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">Available Products</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          Explore fresh fruits and vegetables from local vendors.
        </p>
        
        {/* Placeholder for Listings View Toggle and Sorting Options */}
        <div className="flex justify-between items-center mb-6 px-4">
          <div className="flex gap-2">
            {/* <Button variant="outline" size="sm">Card View</Button>
            <Button variant="outline" size="sm">List View</Button> */}
            {/* Implement actual toggle later */}
          </div>
          <div>
            {/* <select className="p-2 border rounded-md">
              <option>Sort by: Popularity</option>
              <option>Sort by: Price (Low to High)</option>
              <option>Sort by: Price (High to Low)</option>
              <option>Sort by: Newest</option>
            </select> */}
            {/* Implement actual sorting later */}
          </div>
        </div>

        <ClientProductListings 
          products={filteredProducts} 
          onAddToCart={handleAddToCart} 
          onProductClick={handleProductClick} 
        />

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