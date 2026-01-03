"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantityUnit: string; // Ensure quantityUnit is always provided
  minOrderQuantity: number;
  availableQuantity: number;
  vendorName: string;
  category: string;
  vendorRating: number;
  latitude?: number;
  longitude?: number;
}

interface VendorProductsProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const VendorProducts: React.FC<VendorProductsProps> = ({ products, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.length === 0 ? (
        <p className="col-span-full text-center text-gray-600 dark:text-gray-400">No products listed yet.</p>
      ) : (
        products.map((product) => (
          <Card key={product.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-2">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between p-4 pt-0">
              <p className="text-lg font-bold text-green-700 dark:text-green-400 mb-4">
                ₹{product.price.toFixed(2)} {product.quantityUnit}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(product)} className="flex-1">
                  <Pencil className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(product.id)} className="flex-1">
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default VendorProducts;