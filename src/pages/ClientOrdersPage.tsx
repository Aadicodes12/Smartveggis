"use client";

import React from "react";
import BuyerDashboardLayout from "@/components/BuyerDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Dummy data for orders
interface OrderItem {
  name: string;
  quantity: number;
  unit: string;
  price: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
  vendorName: string;
}

const dummyOrders: Order[] = [
  {
    id: "ORD001",
    date: "2023-10-26",
    total: 240.00,
    status: "Delivered",
    items: [
      { name: "Organic Apples", quantity: 1, unit: "kg", price: 120.00 },
      { name: "Fresh Spinach", quantity: 2, unit: "bunch", price: 60.00 },
    ],
    vendorName: "Patil Farms",
  },
  {
    id: "ORD002",
    date: "2023-10-20",
    total: 180.00,
    status: "Delivered",
    items: [
      { name: "Heirloom Tomatoes", quantity: 1, unit: "kg", price: 90.00 },
      { name: "Sweet Potatoes", quantity: 1, unit: "kg", price: 90.00 },
    ],
    vendorName: "Ramesh Ecogrow",
  },
  {
    id: "ORD003",
    date: "2023-10-15",
    total: 70.00,
    status: "Cancelled",
    items: [
      { name: "Organic Bananas", quantity: 1, unit: "dozen", price: 70.00 },
    ],
    vendorName: "Gupta Farm Pvt Ltd.",
  },
];

const ClientOrdersPage = () => {
  // Placeholder for cart items and search function, as BuyerDashboardLayout requires them
  const dummyCartItems = [];
  const dummyOnSearch = (query: string) => console.log("Searching orders for:", query);
  const dummyOnRemoveFromCart = (itemId: string) => console.log("Removing from cart:", itemId);


  return (
    <BuyerDashboardLayout cartItems={dummyCartItems} onSearch={dummyOnSearch} onRemoveFromCart={dummyOnRemoveFromCart}>
      <div className="w-full max-w-6xl mx-auto py-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">My Orders</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          View your past and current orders.
        </p>

        {dummyOrders.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400 text-lg">You haven't placed any orders yet.</p>
        ) : (
          <div className="grid gap-6">
            {dummyOrders.map((order) => (
              <Card key={order.id} className="shadow-md dark:bg-gray-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-semibold text-green-700 dark:text-green-400">Order #{order.id}</CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Placed on: {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-100">Total: ₹{order.total.toFixed(2)}</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Delivered" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                      order.status === "Cancelled" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" :
                      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Separator className="my-4" />
                  <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Items:</h3>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.name} ({item.quantity} {item.unit})</span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-md text-gray-600 dark:text-gray-300">
                    <span className="font-semibold">Vendor:</span> {order.vendorName}
                  </p>
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

export default ClientOrdersPage;