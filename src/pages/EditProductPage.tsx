"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Product, dummyProducts } from "@/data/dummyProducts"; // Import from new centralized file

const EditProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [quantityUnit, setQuantityUnit] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [minOrderQuantity, setMinOrderQuantity] = useState<number | string>("");
  const [availableQuantity, setAvailableQuantity] = useState<number | string>("");
  const [city, setCity] = useState(""); // Changed from latitude and longitude

  useEffect(() => {
    if (productId) {
      const foundProduct = dummyProducts.find((p) => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        setProductName(foundProduct.name);
        setDescription(foundProduct.description);
        setPrice(foundProduct.price);
        setQuantityUnit(foundProduct.quantityUnit);
        setImageUrl(foundProduct.imageUrl);
        setMinOrderQuantity(foundProduct.minOrderQuantity);
        setAvailableQuantity(foundProduct.availableQuantity);
        setCity(foundProduct.city || ""); // Set city
      } else {
        toast.error("Product not found.");
        navigate("/vendor-dashboard");
      }
    }
  }, [productId, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    if (!productName || !description || !price || !quantityUnit || !imageUrl || !minOrderQuantity || !availableQuantity || !city) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (isNaN(Number(price)) || Number(price) <= 0) {
      toast.error("Price must be a positive number.");
      return;
    }
    if (isNaN(Number(minOrderQuantity)) || Number(minOrderQuantity) <= 0) {
      toast.error("Minimum Order Quantity must be a positive number.");
      return;
    }
    if (isNaN(Number(availableQuantity)) || Number(availableQuantity) <= 0) {
      toast.error("Available Quantity must be a positive number.");
      return;
    }
    if (Number(minOrderQuantity) > Number(availableQuantity)) {
      toast.error("Minimum Order Quantity cannot be greater than Available Quantity.");
      return;
    }

    const updatedProduct: Product = {
      ...product,
      name: productName,
      description,
      price: Number(price),
      quantityUnit,
      imageUrl,
      minOrderQuantity: Number(minOrderQuantity),
      availableQuantity: Number(availableQuantity),
      city: city, // Include city
    };

    console.log("Updated product:", updatedProduct);
    toast.success("Product updated successfully!");

    navigate("/vendor-dashboard");
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-green-700 dark:text-green-400">Edit Product</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Modify the details for your product listing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                type="text"
                placeholder="e.g., Organic Apples"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="A brief description of your product..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 120.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantityUnit">Quantity Unit</Label>
                <Input
                  id="quantityUnit"
                  type="text"
                  placeholder="e.g., per kg, per dozen, per bunch"
                  value={quantityUnit}
                  onChange={(e) => setQuantityUnit(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                placeholder="e.g., https://example.com/apple.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="minOrderQuantity">Minimum Order Quantity</Label>
                <Input
                  id="minOrderQuantity"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 1"
                  value={minOrderQuantity}
                  onChange={(e) => setMinOrderQuantity(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="availableQuantity">Available Quantity</Label>
                <Input
                  id="availableQuantity"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 50"
                  value={availableQuantity}
                  onChange={(e) => setAvailableQuantity(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
                placeholder="e.g., Mumbai"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full py-3 text-lg bg-green-600 hover:bg-green-700 text-white">
              Update Product
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <Link to="/vendor-dashboard" className="underline text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
              Back to Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProductPage;