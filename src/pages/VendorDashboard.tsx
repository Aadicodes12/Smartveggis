"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import VendorProducts from "@/components/VendorProducts"; // Import the new component

const dummyProducts = [
  {
    id: "1",
    name: "Organic Apples",
    description: "Freshly picked organic apples, sweet and crisp. Perfect for snacking or baking.",
    price: 2.99,
    imageUrl: "/apple.jpg",
  },
  {
    id: "2",
    name: "Heirloom Tomatoes",
    description: "Vibrant and flavorful heirloom tomatoes, ideal for salads and gourmet dishes.",
    price: 4.50,
    imageUrl: "/tomato.jpg",
  },
  {
    id: "3",
    name: "Fresh Spinach",
    description: "Nutrient-rich fresh spinach, great for smoothies, salads, or sautéing.",
    price: 1.75,
    imageUrl: "/spinach.jpg",
  },
  {
    id: "4",
    name: "Sweet Potatoes",
    description: "Naturally sweet and versatile sweet potatoes, perfect for roasting or mashing.",
    price: 2.20,
    imageUrl: "/potato.jpg",
  },
  {
    id: "5",
    name: "Organic Bananas",
    description: "Ripe organic bananas, a healthy and convenient snack.",
    price: 0.79,
    imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwYmFuYW5hc3xlbnwwfHx8fDE3MTk5NDY2NTd8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "6",
    name: "Bell Peppers (Mixed)",
    description: "A colorful mix of red, yellow, and green bell peppers, great for stir-fries and salads.",
    price: 3.50,
    imageUrl: "https://images.unsplash.com/photo-1518635013023-f047779701a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxiZWxsJTIwcGVwcGVyc3xlbnwwfHx8fDE3MTk5NDY2NTd8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "7",
    name: "Bitter Gourd (Karela)",
    description: "Fresh bitter gourd, known for its health benefits and unique taste.",
    price: 2.50,
    imageUrl: "/karela.jpg",
  },
  {
    id: "8",
    name: "Garlic",
    description: "Pungent and flavorful garlic, essential for many cuisines.",
    price: 1.99,
    imageUrl: "/garlic.jpg",
  },
];

const VendorDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="w-full max-w-6xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">Vendor Dashboard</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          Welcome, vendor! Here you can manage your listed products.
        </p>
        
        <div className="flex justify-center mb-8">
          <Button className="px-6 py-3 text-lg bg-green-600 hover:bg-green-700 text-white shadow-lg transform transition-transform hover:scale-105">
            Add New Product
          </Button>
        </div>

        <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-center">Your Listed Products</h2>
        <VendorProducts products={dummyProducts} />

        <div className="mt-12 text-center">
          <Link to="/">
            <Button variant="outline" className="px-6 py-3 text-lg border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-gray-700 shadow-lg transform transition-transform hover:scale-105">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;