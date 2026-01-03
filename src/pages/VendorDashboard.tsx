"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import VendorProducts from "@/components/VendorProducts";
import EditProductPage from "./EditProductPage"; // Import to access dummyProducts

const VendorDashboard = () => {
  // Use the dummyProducts from EditProductPage for consistency
  const products = EditProductPage.dummyProducts; 

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="w-full max-w-6xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">Vendor Dashboard</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          Welcome, vendor! Here you can manage your listed products.
        </p>
        
        <div className="flex justify-center mb-8">
          <Link to="/vendor-add-product">
            <Button className="px-6 py-3 text-lg bg-green-600 hover:bg-green-700 text-white shadow-lg transform transition-transform hover:scale-105">
              Add New Product
            </Button>
          </Link>
        </div>

        <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-center">Your Listed Products</h2>
        <VendorProducts products={products} />

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