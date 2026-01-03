"use client";

import React from "react";
import { Link } from "react-router-dom";
import BuyerDashboardLayout from "@/components/BuyerDashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Store } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Vendor {
  id: string;
  name: string;
  description: string;
  rating: number;
  imageUrl: string;
}

const dummyFavoriteVendors: Vendor[] = [
  {
    id: "V001",
    name: "Green Farms",
    description: "Specializing in organic fruits and seasonal vegetables.",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1533035353720-f1c6a7b759d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZmFybXxlbnwwfHx8fDE3MTk5NDY2NTd8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "V002",
    name: "Sunny Fields",
    description: "Fresh, locally sourced produce with a focus on quality.",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1517057011479-f0627776357c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmYXJtJTIwZmllbGRzfGVufDB8fHx8MTcxOTk0NjY1N3ww&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "V003",
    name: "Organic Harvest",
    description: "Sustainable farming practices for healthy and delicious greens.",
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1518843875456-df49b7921538?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoYXJ2ZXN0JTIwZmFybXxlbnwwfHx8fDE3MTk5NDY2NTd8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
];

const ClientFavoriteVendorsPage = () => {
  const { t } = useLanguage();
  const [cartItems, setCartItems] = React.useState([]); // Dummy cart for layout

  const handleSearch = (query: string) => {
    console.log("Searching vendors for:", query);
    // In a real app, you'd filter vendors based on the query
  };

  return (
    <BuyerDashboardLayout cartItems={cartItems} onSearch={handleSearch}>
      <div className="w-full max-w-6xl mx-auto py-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">
          {t('favorite_vendors_title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          {t('favorite_vendors_description')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyFavoriteVendors.length === 0 ? (
            <p className="col-span-full text-center text-gray-600 dark:text-gray-400">
              {t('no_favorite_vendors')}
            </p>
          ) : (
            dummyFavoriteVendors.map((vendor) => (
              <Card key={vendor.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img src={vendor.imageUrl} alt={vendor.name} className="w-full h-48 object-cover" />
                <CardHeader className="flex-row items-center gap-4 pb-2">
                  <Store className="h-8 w-8 text-green-600 dark:text-green-400" />
                  <div>
                    <CardTitle className="text-xl font-semibold">{vendor.name}</CardTitle>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                      <span>{vendor.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-4 pt-0">
                  <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-3">
                    {vendor.description}
                  </CardDescription>
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                    View Products
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="mt-12 text-center">
          <Link to="/client-dashboard">
            <Button variant="outline" className="px-6 py-3 text-lg border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-gray-700 shadow-lg transform transition-transform hover:scale-105">
              {t('back_to_dashboard')}
            </Button>
          </Link>
        </div>
      </div>
    </BuyerDashboardLayout>
  );
};

export default ClientFavoriteVendorsPage;