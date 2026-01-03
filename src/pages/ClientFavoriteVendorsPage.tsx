"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Vendor {
  id: string;
  name: string;
  description: string;
  rating: number;
  avatarUrl: string;
  location: string;
}

const dummyVendors: Vendor[] = [
  {
    id: "V001",
    name: "Patil Farms",
    description: "Specializing in organic fruits and seasonal vegetables.",
    rating: 4.8,
    avatarUrl: "https://images.unsplash.com/photo-1517486804500-e215cd05117b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBwb3J0cmFpdHxlbnwwfHx8fDE3MTk5NDY2NTd8MA&ixlib=rb-4.0.3&q=80&w=1080",
    location: "Pune, Maharashtra",
  },
  {
    id: "V002",
    name: "Ramesh Ecogrow",
    description: "Sustainable farming practices for fresh, chemical-free produce.",
    rating: 4.5,
    avatarUrl: "https://images.unsplash.com/photo-1517486804500-e215cd05117b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBwb3J0cmFpdHxlbnwwfHx8fDE3MTk5NDY2NTd8MA&ixlib=rb-4.0.3&q=80&w=1080",
    location: "Nashik, Maharashtra",
  },
  {
    id: "V003",
    name: "Mukesh Harvest",
    description: "Wide variety of leafy greens and exotic vegetables.",
    rating: 4.9,
    avatarUrl: "https://images.unsplash.com/photo-1517486804500-e215cd05117b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBwb3J0cmFpdHxlbnwwfHx8fDE3MTk5NDY2NTd8MA&ixlib=rb-4.0.3&q=80&w=1080",
    location: "Mumbai, Maharashtra",
  },
  {
    id: "V004",
    name: "Farm fresh Co.",
    description: "Delivering farm-fresh produce directly to your doorstep.",
    rating: 4.7,
    avatarUrl: "https://images.unsplash.com/photo-1517486804500-e215cd05117b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBwb3J0cmFpdHxlbnwwfHx8fDE3MTk5NDY2NTd8MA&ixlib=rb-4.0.3&q=80&w=1080",
    location: "Nagpur, Maharashtra",
  },
];

const ClientFavoriteVendorsPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="w-full max-w-6xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">{t('favorite_vendors_title')}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          {t('favorite_vendors_description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyVendors.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">{t('no_favorite_vendors')}</p>
          ) : (
            dummyVendors.map((vendor) => (
              <Card key={vendor.id} className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Avatar className="h-24 w-24 mb-4 border-4 border-green-500 dark:border-green-400">
                  <AvatarImage src={vendor.avatarUrl} alt={vendor.name} />
                  <AvatarFallback className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 text-xl font-bold">
                    {vendor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{vendor.name}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">{vendor.location}</CardDescription>
                </CardHeader>
                <CardContent className="p-0 flex-grow">
                  <p className="text-gray-700 dark:text-gray-300 mb-3">{vendor.description}</p>
                  <div className="flex items-center justify-center gap-1 text-yellow-500 mb-4">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="font-semibold text-lg">{vendor.rating.toFixed(1)}</span>
                  </div>
                  <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-gray-700">
                    View Vendor Profile
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
    </div>
  );
};

export default ClientFavoriteVendorsPage;