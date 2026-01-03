// src/data/dummyProducts.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantityUnit: string;
  imageUrl: string;
  minOrderQuantity: number;
  availableQuantity: number;
  vendorName: string;
  latitude?: number;
  longitude?: number;
}

export const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Organic Apples",
    description: "Freshly picked organic apples, sweet and crisp. Perfect for snacking or baking.",
    price: 120.00,
    quantityUnit: "per kg",
    imageUrl: "/apple.jpg",
    minOrderQuantity: 1,
    availableQuantity: 50,
    vendorName: "Patil Farms",
    latitude: 28.6139, // Example latitude for Delhi
    longitude: 77.2090, // Example longitude for Delhi
  },
  {
    id: "2",
    name: "Heirloom Tomatoes",
    description: "Vibrant and flavorful heirloom tomatoes, ideal for salads and gourmet dishes.",
    price: 90.00,
    quantityUnit: "per kg",
    imageUrl: "/tomato.jpg",
    minOrderQuantity: 0.5,
    availableQuantity: 30,
    vendorName: "Ramesh Ecogrow",
    latitude: 19.0760, // Example latitude for Mumbai
    longitude: 72.8777, // Example longitude for Mumbai
  },
  {
    id: "3",
    name: "Fresh Spinach",
    description: "Nutrient-rich fresh spinach, great for smoothies, salads, or sautéing.",
    price: 60.00,
    quantityUnit: "per bunch",
    imageUrl: "/spinach.jpg",
    minOrderQuantity: 1,
    availableQuantity: 100,
    vendorName: "Mukesh Harvest",
    latitude: 12.9716, // Example latitude for Bangalore
    longitude: 77.5946, // Example longitude for Bangalore
  },
  {
    id: "4",
    name: "Sweet Potatoes",
    description: "Naturally sweet and versatile sweet potatoes, perfect for roasting or mashing.",
    price: 90.00,
    quantityUnit: "per kg",
    imageUrl: "/potato.jpg",
    minOrderQuantity: 2,
    availableQuantity: 80,
    vendorName: "Farm fresh Co.",
    latitude: 28.6139, // Example latitude for Delhi
    longitude: 77.2090, // Example longitude for Delhi
  },
  {
    id: "5",
    name: "Organic Bananas",
    description: "Ripe organic bananas, a healthy and convenient snack.",
    price: 70.00,
    quantityUnit: "per dozen",
    imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwYmFuYW5hc3xlbnwwfHx8fDE3MTk5NDY2NTd8MA&ixlib=rb-4.0.3&q=80&w=1080",
    minOrderQuantity: 1,
    availableQuantity: 60,
    vendorName: "Gupta Farm Pvt Ltd.",
    latitude: 19.0760, // Example latitude for Mumbai
    longitude: 72.8777, // Example longitude for Mumbai
  },
  {
    id: "9",
    name: "Fresh Oranges",
    description: "Juicy and sweet oranges, perfect for a healthy snack or fresh juice.",
    price: 100.00,
    quantityUnit: "per kg",
    imageUrl: "/oranges.jpg",
    minOrderQuantity: 1,
    availableQuantity: 45,
    vendorName: "Citrus Fruit",
    latitude: 12.9716, // Example latitude for Bangalore
    longitude: 77.5946, // Example longitude for Bangalore
  },
  {
    id: "10",
    name: "Bitter Gourd (Karela)",
    description: "Fresh bitter gourd, known for its health benefits and unique taste.",
    price: 70.00,
    quantityUnit: "per kg",
    imageUrl: "/karela.jpg",
    minOrderQuantity: 0.5,
    availableQuantity: 35,
    vendorName: "Healthy Bites",
    latitude: 28.6139, // Example latitude for Delhi
    longitude: 77.2090, // Example longitude for Delhi
  },
  {
    id: "11",
    name: "Garlic",
    description: "Pungent and flavorful garlic, essential for many cuisines.",
    price: 120.00,
    quantityUnit: "per 250g",
    imageUrl: "/garlic.jpg",
    minOrderQuantity: 0.25,
    availableQuantity: 60,
    vendorName: "Spice Route",
    latitude: 19.0760, // Example latitude for Mumbai
    longitude: 72.8777, // Example longitude for Mumbai
  },
];