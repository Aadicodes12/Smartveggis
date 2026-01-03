"use client";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LeafyGreen, ShoppingCart } from "lucide-react"; // Adding some icons for visual appeal

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-lime-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-2xl text-center shadow-xl rounded-xl p-8 bg-white dark:bg-gray-800 border border-green-200 dark:border-gray-700">
        <CardHeader className="space-y-4">
          <div className="flex justify-center items-center gap-4 mb-4">
            <LeafyGreen className="h-12 w-12 text-green-600 dark:text-green-400" />
            <CardTitle className="text-4xl font-extrabold text-green-800 dark:text-green-200">
              Welcome to SmartVegiS
            </CardTitle>
            <ShoppingCart className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <CardDescription className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Your ultimate marketplace for fresh, locally sourced fruits and vegetables.
            Connect directly with growers and buyers!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 mt-6">
          <p className="text-lg text-gray-800 dark:text-gray-200 font-medium">
            Are you a buyer looking for fresh produce or a vendor ready to sell your harvest?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/client-login">
              <Button className="w-full sm:w-auto px-10 py-4 text-lg bg-green-600 hover:bg-green-700 text-white shadow-lg transform transition-transform hover:scale-105">
                I'm a Client
              </Button>
            </Link>
            <Link to="/vendor-login">
              <Button variant="outline" className="w-full sm:w-auto px-10 py-4 text-lg border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-gray-700 shadow-lg transform transition-transform hover:scale-105">
                I'm a Vendor
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;