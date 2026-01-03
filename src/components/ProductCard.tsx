"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart } from "lucide-react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; // Using sonner for toasts

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantityUnit: string;
  imageUrl: string;
  minOrderQuantity: number;
  availableQuantity: number;
  vendorName: string; // Added vendorName
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [desiredQuantity, setDesiredQuantity] = useState<number>(product.minOrderQuantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setDesiredQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (desiredQuantity < product.minOrderQuantity) {
      toast.error(`Minimum order quantity for ${product.name} is ${product.minOrderQuantity} ${product.quantityUnit}.`);
      return;
    }
    if (desiredQuantity > product.availableQuantity) {
      toast.error(`Only ${product.availableQuantity} ${product.quantityUnit} of ${product.name} are available.`);
      return;
    }
    if (desiredQuantity === 0) {
      toast.error("Please enter a quantity greater than 0.");
      return;
    }

    onAddToCart(product, desiredQuantity);
    toast.success(`${desiredQuantity} ${product.quantityUnit} of ${product.name} added to cart.`);
  };

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">{product.name}</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-2">
          {product.description}
        </CardDescription>
        <p className="text-sm text-gray-500 dark:text-gray-400">Vendor: {product.vendorName}</p>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between p-4 pt-0">
        <p className="text-lg font-bold text-green-700 dark:text-green-400 mb-2">
          ₹{product.price.toFixed(2)} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{product.quantityUnit}</span>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
          Available: <span className="font-medium">{product.availableQuantity} {product.quantityUnit}</span>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          MOQ: <span className="font-medium">{product.minOrderQuantity} {product.quantityUnit}</span>
        </p>

        <div className="flex items-center gap-2 mb-4">
          <Label htmlFor={`qty-${product.id}`} className="sr-only">Enter Quantity</Label>
          <Input
            id={`qty-${product.id}`}
            type="number"
            min={product.minOrderQuantity}
            value={desiredQuantity}
            onChange={handleQuantityChange}
            className="w-24 text-center"
          />
          <span className="text-sm text-gray-600 dark:text-gray-300">{product.quantityUnit}</span>
        </div>

        <Button onClick={handleAddToCart} className="w-full bg-green-600 hover:bg-green-700 text-white">
          <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;