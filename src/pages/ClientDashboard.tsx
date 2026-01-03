"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ClientDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">Client Dashboard</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Welcome, client! Here you will see available products and nearby vendors.
      </p>
      <Link to="/">
        <Button variant="outline">Back to Home</Button>
      </Link>
    </div>
  );
};

export default ClientDashboard;