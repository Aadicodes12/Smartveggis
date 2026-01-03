"use client";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const AddProductPage = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [quantityUnit, setQuantityUnit] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [minOrderQuantity, setMinOrderQuantity] = useState<number | string>("");
  const [availableQuantity, setAvailableQuantity] = useState<number | string>("");
  const [city, setCity] = useState(""); // Changed from latitude and longitude

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
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

    const newProduct = {
      id: String(Date.now()), // Simple unique ID for now
      name: productName,
      description,
      price: Number(price),
      quantityUnit,
      imageUrl,
      minOrderQuantity: Number(minOrderQuantity),
      availableQuantity: Number(availableQuantity),
      vendorName: "Your Vendor Name", // Placeholder, would be dynamic in a real app
      city: city, // Include city
    };

    console.log("New product added:", newProduct);
    toast.success("Product added successfully!");

    // In a real application, you would send this data to a backend API.
    // For now, we'll just navigate back to the vendor dashboard.
    navigate("/vendor-dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-green-700 dark:text-green-400">Add New Product</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Enter the details for your new product listing.
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
              Add Product
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

export default AddProductPage;