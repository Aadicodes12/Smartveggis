"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ClientProductListings from "@/components/ClientProductListings"; // Import the new component

const dummyProducts = [
  {
    id: "1",
    name: "Organic Apples",
    description: "Freshly picked organic apples, sweet and crisp. Perfect for snacking or baking.",
    price: 250.00,
    quantityUnit: "per kg",
    imageUrl: "https://images.unsplash.com/photo-1568702528493-07521216191b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwYXBwbGVzfGVufDB8fHx8MTcxOTk0NjY1Nnww&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "2",
    name: "Heirloom Tomatoes",
    description: "Vibrant and flavorful heirloom tomatoes, ideal for salads and gourmet dishes.",
    price: 180.00,
    quantityUnit: "per kg",
    imageUrl: "https://images.unsplash.com/photo-1591681334078-d3164121111d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWlybG9vbSUyMHRvbWF0b2VzfGVufDB8fHx8MTcxOTk0NjY1Nnww&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "3",
    name: "Fresh Spinach",
    description: "Nutrient-rich fresh spinach, great for smoothies, salads, or sautéing.",
    price: 60.00,
    quantityUnit: "per bunch",
    imageUrl: "https://images.unsplash.com/photo-1554679608-9c726d191223?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNwaW5hY2h8ZW58MHx8fHwxNzE5OTQ2NjU3fDA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "4",
    name: "Sweet Potatoes",
    description: "Naturally sweet and versatile sweet potatoes, perfect for roasting or mashing.",
    price: 90.00,
    quantityUnit: "per kg",
    imageUrl: "https://images.unsplash.com/photo-1597363280000-314199701503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxzcHJvdXQlMjBwb3RhdG9lc3xlbnwwfHx8fDE3MTk5NDY2NTd8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "5",
    name: "Organic Bananas",
    description: "Ripe organic bananas, a healthy and convenient snack.",
    price: 70.00,
    quantityUnit: "per dozen",
    imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwYmFuYW5hc3xlbnwwfHx8fDE3MTk5NDY2NTd8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "6",
    name: "Bell Peppers (Mixed)",
    description: "A colorful mix of red, yellow, and green bell peppers, great for stir-fries and salads.",
    price: 150.00,
    quantityUnit: "per kg",
    imageUrl: "https://images.unsplash.com/photo-1518635013023-f047779701a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxiZWxsJTIwcGVwcGVyc3xlbnwwfHx8fDE3MTk5NDY2NTd8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "7",
    name: "Fresh Carrots",
    description: "Sweet and crunchy carrots, perfect for juicing, salads, or cooking.",
    price: 80.00,
    quantityUnit: "per kg",
    imageUrl: "https://images.unsplash.com/photo-1529692236671-ac3369727154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxjYXJyb3RzfGVufDB8fHx8MTcxOTk0NjY1OHww&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "8",
    name: "Broccoli Florets",
    description: "Healthy and fresh broccoli florets, ready to be steamed or stir-fried.",
    price: 120.00,
    quantityUnit: "per 500g",
    imageUrl: "https://images.unsplash.com/photo-1587223962930-cb7f317f862c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxiaXJvY2NvbGl8ZW58MHx8fHwxNzE5OTQ2NjU4fDA&ixlib=rb-4.0.3&q=80&w=1080",
  },
];

const ClientDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="w-full max-w-6xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">Client Dashboard</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          Welcome, client! Explore fresh fruits and vegetables from local vendors.
        </p>
        
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-center">Available Products</h2>
        <ClientProductListings products={dummyProducts} />

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

export default ClientDashboard;