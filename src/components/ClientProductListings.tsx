"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/data/dummyProducts"; // Import from new centralized file

interface ClientProductListingsProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onProductClick: (product: Product) => void;
}

const ClientProductListings: React.FC<ClientProductListingsProps> = ({ products, onAddToCart, onProductClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.length === 0 ? (
        <p className="col-span-full text-center text-gray-600 dark:text-gray-400 text-lg">No products available at the moment.</p>
      ) : (
        products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
            onProductClick={onProductClick}
          />
        ))
      )}
    </div>
  );
};

export default ClientProductListings;