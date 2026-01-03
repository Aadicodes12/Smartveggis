"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, X } from "lucide-react";
import { toast } from "sonner";

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

interface ProductPreviewDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductPreviewDialog: React.FC<ProductPreviewDialogProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const [desiredQuantity, setDesiredQuantity] = useState<number>(product?.minOrderQuantity || 1);

  React.useEffect(() => {
    if (product) {
      setDesiredQuantity(product.minOrderQuantity);
    }
  }, [product]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setDesiredQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

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
    onClose(); // Close the dialog after adding to cart
  };

  if (!product) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl p-0">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 rounded-full bg-white/70 hover:bg-white dark:bg-gray-800/70 dark:hover:bg-gray-800"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
          <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-t-lg" />
        </div>
        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-3xl font-bold text-gray-800 dark:text-gray-100">{product.name}</DialogTitle>
            <DialogDescription className="text-lg text-gray-600 dark:text-gray-400">
              {product.description}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <p className="text-md text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Vendor:</span> {product.vendorName}
            </p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-400">
              ₹{product.price.toFixed(2)} <span className="text-base font-normal text-gray-500 dark:text-gray-400">{product.quantityUnit}</span>
            </p>
            <p className="text-md text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Available:</span> {product.availableQuantity} {product.quantityUnit}
            </p>
            <p className="text-md text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Minimum Order Quantity:</span> {product.minOrderQuantity} {product.quantityUnit}
            </p>

            <div className="flex items-center gap-3 mt-4">
              <Label htmlFor={`qty-dialog-${product.id}`} className="text-md font-semibold">Quantity:</Label>
              <Input
                id={`qty-dialog-${product.id}`}
                type="number"
                min={product.minOrderQuantity}
                value={desiredQuantity}
                onChange={handleQuantityChange}
                className="w-28 text-center text-md"
              />
              <span className="text-md text-gray-600 dark:text-gray-300">{product.quantityUnit}</span>
            </div>

            <Button onClick={handleAddToCart} className="w-full mt-6 py-3 text-lg bg-green-600 hover:bg-green-700 text-white">
              <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductPreviewDialog;