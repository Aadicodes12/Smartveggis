"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantityUnit: string;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleAddToCart = (productId: string) => {
    console.log(`Add product with ID: ${productId} to cart`);
    // In a real application, this would add the product to a shopping cart state or API
  };

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">{product.name}</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between p-4 pt-0">
        <p className="text-lg font-bold text-green-700 dark:text-green-400 mb-4">
          ₹{product.price.toFixed(2)} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{product.quantityUnit}</span>
        </p>
        <Button onClick={() => handleAddToCart(product.id)} className="w-full bg-green-600 hover:bg-green-700 text-white">
          <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;