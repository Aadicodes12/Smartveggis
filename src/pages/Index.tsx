"use client";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-2">Welcome to the Marketplace</CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
            Your hub for fresh fruits and vegetables!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-md text-gray-700 dark:text-gray-200">
            Are you a buyer looking for fresh produce or a vendor ready to sell?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/client-login">
              <Button className="w-full sm:w-auto px-8 py-3 text-lg">I'm a Client</Button>
            </Link>
            <Link to="/vendor-login">
              <Button variant="outline" className="w-full sm:w-auto px-8 py-3 text-lg">I'm a Vendor</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;