"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  category: string;
  vendorRating: number;
  latitude?: number;
  longitude?: number;
}

interface EditProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (updatedProduct: Product) => Promise<void>;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({ isOpen, onClose, product, onSave }) => {
  const [editedProduct, setEditedProduct] = useState<Product | null>(product);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setEditedProduct((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [id]: id === "price" || id === "minOrderQuantity" || id === "availableQuantity" ? parseFloat(value) : value,
      };
    });
  };

  const handleSave = async () => {
    if (editedProduct) {
      if (!editedProduct.name || !editedProduct.description || !editedProduct.price || !editedProduct.quantityUnit) {
        toast.error("Please fill in all required fields.");
        return;
      }
      if (editedProduct.price <= 0) {
        toast.error("Price must be greater than zero.");
        return;
      }
      if (editedProduct.minOrderQuantity <= 0) {
        toast.error("Minimum order quantity must be greater than zero.");
        return;
      }
      if (editedProduct.availableQuantity < 0) {
        toast.error("Available quantity cannot be negative.");
        return;
      }

      await onSave(editedProduct);
      onClose();
    }
  };

  if (!editedProduct) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Product: {editedProduct.name}</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={editedProduct.name} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input id="description" value={editedProduct.description} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price (₹)
            </Label>
            <Input id="price" type="number" value={editedProduct.price} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantityUnit" className="text-right">
              Unit
            </Label>
            <Input id="quantityUnit" value={editedProduct.quantityUnit} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="minOrderQuantity" className="text-right">
              Min Order Qty
            </Label>
            <Input id="minOrderQuantity" type="number" value={editedProduct.minOrderQuantity} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="availableQuantity" className="text-right">
              Available Qty
            </Label>
            <Input id="availableQuantity" type="number" value={editedProduct.availableQuantity} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageUrl" className="text-right">
              Image URL
            </Label>
            <Input id="imageUrl" value={editedProduct.imageUrl} onChange={handleChange} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;