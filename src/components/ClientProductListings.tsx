"use client";

import React from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantityUnit: string;
  imageUrl: string;
}

interface ClientProductListingsProps {
  products: Product[];
}

const ClientProductListings: React.FC<ClientProductListingsProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.length === 0 ? (
        <p className="col-span-full text-center text-gray-600 dark:text-gray-400 text-lg">No products available at the moment.</p>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default ClientProductListings;