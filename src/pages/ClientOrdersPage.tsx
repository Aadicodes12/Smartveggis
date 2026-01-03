"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface OrderItem {
  productName: string;
  quantity: number;
  quantityUnit: string;
  price: number;
}

interface Order {
  id: string;
  date: string;
  vendorName: string;
  totalAmount: number;
  status: "Pending" | "Completed" | "Cancelled";
  items: OrderItem[];
}

const dummyOrders: Order[] = [
  {
    id: "ORD001",
    date: "2024-07-20",
    vendorName: "Patil Farms",
    totalAmount: 240.00,
    status: "Completed",
    items: [
      { productName: "Organic Apples", quantity: 2, quantityUnit: "kg", price: 120.00 },
    ],
  },
  {
    id: "ORD002",
    date: "2024-07-18",
    vendorName: "Ramesh Ecogrow",
    totalAmount: 135.00,
    status: "Pending",
    items: [
      { productName: "Tomatoes", quantity: 1.5, quantityUnit: "kg", price: 90.00 },
    ],
  },
  {
    id: "ORD003",
    date: "2024-07-15",
    vendorName: "Mukesh Harvest",
    totalAmount: 60.00,
    status: "Completed",
    items: [
      { productName: "Fresh Spinach", quantity: 1, quantityUnit: "bunch", price: 60.00 },
    ],
  },
  {
    id: "ORD004",
    date: "2024-07-10",
    vendorName: "Farm fresh Co.",
    totalAmount: 180.00,
    status: "Cancelled",
    items: [
      { productName: "Potatoes", quantity: 2, quantityUnit: "kg", price: 90.00 },
    ],
  },
];

const ClientOrdersPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="w-full max-w-6xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">{t('my_orders_title')}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          {t('my_orders_description')}
        </p>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Package className="h-6 w-6 text-green-600" /> {t('order_history')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dummyOrders.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">{t('no_orders_yet')}</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('order_id')}</TableHead>
                      <TableHead>{t('date')}</TableHead>
                      <TableHead>{t('vendor')}</TableHead>
                      <TableHead>{t('total')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                      <TableHead>{t('details')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.vendorName}</TableCell>
                        <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.status === "Completed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                            order.status === "Pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
                            "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}>
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                            {order.items.map((item, idx) => (
                              <li key={idx}>
                                {item.productName} ({item.quantity} {item.quantityUnit}) - ₹{(item.quantity * item.price).toFixed(2)}
                              </li>
                            ))}
                          </ul>
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
    </div>
  );
};

export default ClientOrdersPage;