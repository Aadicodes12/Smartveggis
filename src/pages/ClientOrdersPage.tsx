"use client";

import React from "react";
import { Link } from "react-router-dom";
import BuyerDashboardLayout from "@/components/BuyerDashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";

interface Order {
  id: string;
  date: string;
  vendorName: string;
  total: number;
  status: "Pending" | "Completed" | "Cancelled" | "Delivered";
  items: { name: string; quantity: number; unit: string; price: number }[];
}

const dummyOrders: Order[] = [
  {
    id: "ORD001",
    date: "2023-10-26",
    vendorName: "Green Farms",
    total: 240.00,
    status: "Delivered",
    items: [
      { name: "Organic Apples", quantity: 2, unit: "kg", price: 120.00 },
    ],
  },
  {
    id: "ORD002",
    date: "2023-10-25",
    vendorName: "Sunny Fields",
    total: 180.00,
    status: "Completed",
    items: [
      { name: "Heirloom Tomatoes", quantity: 2, unit: "kg", price: 90.00 },
    ],
  },
  {
    id: "ORD003",
    date: "2023-10-24",
    vendorName: "Organic Harvest",
    total: 60.00,
    status: "Pending",
    items: [
      { name: "Fresh Spinach", quantity: 1, unit: "bunch", price: 60.00 },
    ],
  },
  {
    id: "ORD004",
    date: "2023-10-23",
    vendorName: "Farm Fresh Co.",
    total: 180.00,
    status: "Cancelled",
    items: [
      { name: "Sweet Potatoes", quantity: 2, unit: "kg", price: 90.00 },
    ],
  },
];

const ClientOrdersPage = () => {
  const { t } = useLanguage();
  const [cartItems, setCartItems] = React.useState([]); // Dummy cart for layout

  const handleSearch = (query: string) => {
    console.log("Searching orders for:", query);
    // In a real app, you'd filter orders based on the query
  };

  return (
    <BuyerDashboardLayout cartItems={cartItems} onSearch={handleSearch}>
      <div className="w-full max-w-6xl mx-auto py-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">
          {t('my_orders_title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          {t('my_orders_description')}
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t('order_history')}</CardTitle>
          </CardHeader>
          <CardContent>
            {dummyOrders.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-400">
                {t('no_orders_yet')}
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('order_id')}</TableHead>
                      <TableHead>{t('date')}</TableHead>
                      <TableHead>{t('vendor')}</TableHead>
                      <TableHead className="text-right">{t('total')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                      <TableHead className="text-center">{t('details')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.vendorName}</TableCell>
                        <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : order.status === "Completed"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : order.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
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

export default ClientOrdersPage;