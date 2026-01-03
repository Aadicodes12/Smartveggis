"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Define a Product interface for consistency
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
  latitude?: number; // Added for location feature
  longitude?: number; // Added for location feature
}

// Dummy data for demonstration. In a real app, this would come from an API.
const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Organic Apples",
    description: "Freshly picked organic apples, sweet and crisp. Perfect for snacking or baking.",
    price: 120.00,
    quantityUnit: "per kg",
    imageUrl: "/apple.jpg",
    minOrderQuantity: 1,
    availableQuantity: 50,
    vendorName: "Patil Farms",
    latitude: 28.6139, // Example latitude for Delhi
    longitude: 77.2090, // Example longitude for Delhi
  },
  {
    id: "2",
    name: "Heirloom Tomatoes",
    description: "Vibrant and flavorful heirloom tomatoes, ideal for salads and gourmet dishes.",
    price: 90.00,
    quantityUnit: "per kg",
    imageUrl: "/tomato.jpg",
    minOrderQuantity: 0.5,
    availableQuantity: 30,
    vendorName: "Ramesh Ecogrow",
    latitude: 19.0760, // Example latitude for Mumbai
    longitude: 72.8777, // Example longitude for Mumbai
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
    vendorName: "Mukesh Harvest",
    latitude: 12.9716, // Example latitude for Bangalore
    longitude: 77.5946, // Example longitude for Bangalore
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
    vendorName: "Farm fresh Co.",
    latitude: 28.6139, // Example latitude for Delhi
    longitude: 77.2090, // Example longitude for Delhi
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
    vendorName: "Gupta Farm Pvt Ltd.",
    latitude: 19.0760, // Example latitude for Mumbai
    longitude: 72.8777, // Example longitude for Mumbai
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
    vendorName: "Citrus Fruit",
    latitude: 12.9716, // Example latitude for Bangalore
    longitude: 77.5946, // Example longitude for Bangalore
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
    latitude: 28.6139, // Example latitude for Delhi
    longitude: 77.2090, // Example longitude for Delhi
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
    latitude: 19.0760, // Example latitude for Mumbai
    longitude: 72.8777, // Example longitude for Mumbai
  },
];


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
  const [latitude, setLatitude] = useState<number | string>("");
  const [longitude, setLongitude] = useState<number | string>("");

  useEffect(() => {
    if (productId) {
      // In a real app, you'd fetch product data from an API using productId
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
        setLatitude(foundProduct.latitude || "");
        setLongitude(foundProduct.longitude || "");
      } else {
        toast.error("Product not found.");
        navigate("/vendor-dashboard");
      }
    }
  }, [productId, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    // Basic validation
    if (!productName || !description || !price || !quantityUnit || !imageUrl || !minOrderQuantity || !availableQuantity || !latitude || !longitude) {
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
    if (isNaN(Number(latitude)) || Number(latitude) < -90 || Number(latitude) > 90) {
      toast.error("Latitude must be a number between -90 and 90.");
      return;
    }
    if (isNaN(Number(longitude)) || Number(longitude) < -180 || Number(longitude) > 180) {
      toast.error("Longitude must be a number between -180 and 180.");
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
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    console.log("Updated product:", updatedProduct);
    toast.success("Product updated successfully!");

    // In a real application, you would send this data to a backend API.
    // For now, we'll just navigate back to the vendor dashboard.
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="0.000001"
                  placeholder="e.g., 28.6139"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="0.000001"
                  placeholder="e.g., 77.2090"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  required
                />
              </div>
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