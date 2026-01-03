"use client";

import React from "react";
import BuyerDashboardLayout from "@/components/BuyerDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";

// Dummy data for favorite vendors
interface Vendor {
  id: string;
  name: string;
  description: string;
  rating: number;
  location: string;
  imageUrl: string;
}

const dummyFavoriteVendors: Vendor[] = [
  {
    id: "V001",
    name: "Patil Farms",
    description: "Specializing in organic fruits and seasonal vegetables. Known for fresh apples.",
    rating: 4.8,
    location: "Pune, Maharashtra",
    imageUrl: "https://images.unsplash.com/photo-1563784462042-a645a736032a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZmFybXxlbnwwfHx8fDE3MTk5NDY2NTd8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "V002",
    name: "Ramesh Ecogrow",
    description: "Sustainable farming practices for a variety of heirloom produce, especially tomatoes.",
    rating: 4.5,
    location: "Bengaluru, Karnataka",
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxlY28lMjBmYXJtfGVufDB8fHx8MTcxOTk0NjY1N3ww&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "V003",
    name: "Mukesh Harvest",
    description: "Fresh leafy greens and root vegetables delivered daily from our local farm.",
    rating: 4.7,
    location: "Hyderabad, Telangana",
    imageUrl: "https://images.unsplash.com/photo-1509233725247-49e657a911d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGhhcnZlc3R8ZW58MHx8fHwxNzE5OTQ2NjU3fDA&ixlib=rb-4.0.3&q=80&w=1080",
  },
];

const ClientFavoriteVendorsPage = () => {
  // Placeholder for cart items and search function, as BuyerDashboardLayout requires them
  const dummyCartItems = [];
  const dummyOnSearch = (query: string) => console.log("Searching vendors for:", query);
  const dummyOnRemoveFromCart = (itemId: string) => console.log("Removing from cart:", itemId);


  return (
    <BuyerDashboardLayout cartItems={dummyCartItems} onSearch={dummyOnSearch} onRemoveFromCart={dummyOnRemoveFromCart}>
      <div className="w-full max-w-6xl mx-auto py-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">My Favorite Vendors</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          Here are the vendors you've marked as favorites.
        </p>

        {dummyFavoriteVendors.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400 text-lg">You haven't favorited any vendors yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyFavoriteVendors.map((vendor) => (
              <Card key={vendor.id} className="shadow-md dark:bg-gray-800 flex flex-col">
                <img src={vendor.imageUrl} alt={vendor.name} className="w-full h-48 object-cover rounded-t-lg" />
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-green-700 dark:text-green-400">{vendor.name}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-2">
                    {vendor.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{vendor.rating.toFixed(1)} / 5.0</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-4">
                    <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span>{vendor.location}</span>
                  </div>
                  <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-gray-700">
                    View Products
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link to="/client-dashboard">
            <Button variant="outline" className="px-6 py-3 text-lg border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-gray-700 shadow-lg transform transition-transform hover:scale-105">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </BuyerDashboardLayout>
  );
};

export default ClientFavoriteVendorsPage;