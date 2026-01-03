"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ClientProductListings from "@/components/ClientProductListings";
import BuyerDashboardLayout from "@/components/BuyerDashboardLayout";
import ProductPreviewDialog from "@/components/ProductPreviewDialog"; // Import the new dialog component

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
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantityUnit: string;
  orderedQuantity: number;
}

const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Organic Apples",
    description: "Freshly picked organic apples, sweet and crisp. Perfect for snacking or baking.",
    price: 120.00, // Adjusted price
    quantityUnit: "per kg",
    imageUrl: "/apple.jpg",
    minOrderQuantity: 1,
    availableQuantity: 50,
    vendorName: "Green Farms",
  },
  {
    id: "2",
    name: "Heirloom Tomatoes",
    description: "Vibrant and flavorful heirloom tomatoes, ideal for salads and gourmet dishes.",
    price: 90.00, // Adjusted price
    quantityUnit: "per kg",
    imageUrl: "/tomato.jpg",
    minOrderQuantity: 0.5,
    availableQuantity: 30,
    vendorName: "Sunny Fields",
  },
  {
    id: "3",
    name: "Fresh Spinach",
    description: "Nutrient-rich fresh spinach, great for smoothies, salads, or sautéing.",
    price: 60.00,
    quantityUnit: "per bunch",
    imageUrl: "/spinach.jpg",
    minOrderQuantity: 1,
    availableQuantity: 100,
    vendorName: "Organic Harvest",
  },
  {
    id: "4",
    name: "Sweet Potatoes",
    description: "Naturally sweet and versatile sweet potatoes, perfect for roasting or mashing.",
    price: 90.00,
    quantityUnit: "per kg",
    imageUrl: "/potato.jpg",
    minOrderQuantity: 2,
    availableQuantity: 80,
    vendorName: "Farm Fresh Co.",
  },
  {
    id: "5",
    name: "Organic Bananas",
    description: "Ripe organic bananas, a healthy and convenient snack.",
    price: 70.00,
    quantityUnit: "per dozen",
    imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwYmFuYW5hc3xlbnwwfHx8fDE3MTk5NDY2NTd8MA&ixlib=rb-4.0.3&q=80&w=1080",
    minOrderQuantity: 1,
    availableQuantity: 60,
    vendorName: "Tropical Delights",
  },
  {
    id: "7",
    name: "Fresh Carrots",
    description: "Sweet and crunchy carrots, perfect for juicing, salads, or cooking.",
    price: 80.00,
    quantityUnit: "per kg",
    imageUrl: "https://images.unsplash.com/photo-1529692236671-ac3369727154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxjYXJyb3RzfGVufDB8fHx8MTcxOTk0NjY1OHww&ixlib=rb-4.0.3&q=80&w=1080",
    minOrderQuantity: 1,
    availableQuantity: 70,
    vendorName: "Root Vegetables Inc.",
  },
  {
    id: "9",
    name: "Fresh Oranges",
    description: "Juicy and sweet oranges, perfect for a healthy snack or fresh juice.",
    price: 100.00,
    quantityUnit: "per kg",
    imageUrl: "/oranges.jpg",
    minOrderQuantity: 1,
    availableQuantity: 45,
    vendorName: "Citrus Grove",
  },
  {
    id: "10",
    name: "Bitter Gourd (Karela)",
    description: "Fresh bitter gourd, known for its health benefits and unique taste.",
    price: 70.00,
    quantityUnit: "per kg",
    imageUrl: "/karela.jpg",
    minOrderQuantity: 0.5,
    availableQuantity: 35,
    vendorName: "Healthy Bites",
  },
  {
    id: "11",
    name: "Garlic",
    description: "Pungent and flavorful garlic, essential for many cuisines.",
    price: 120.00,
    quantityUnit: "per 250g",
    imageUrl: "/garlic.jpg",
    minOrderQuantity: 0.25,
    availableQuantity: 60,
    vendorName: "Spice Route",
  },
];

const ClientDashboard = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(dummyProducts);
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
      setFilteredProducts(dummyProducts);
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const results = dummyProducts.filter(
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