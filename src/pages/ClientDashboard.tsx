"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ClientProductListings from "@/components/ClientProductListings";
import BuyerDashboardLayout from "@/components/BuyerDashboardLayout";
import ProductPreviewDialog from "@/components/ProductPreviewDialog";
import VendorMap from "@/components/VendorMap"; // Import the new map component
import { useSupabase } from "@/contexts/SupabaseContext";
import { toast } from "sonner";

interface Product {
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
  category: string; // Added category for filtering
  vendorRating: number; // Added vendorRating for filtering
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantityUnit: string;
  orderedQuantity: number;
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Organic Apples",
    description: "Freshly picked organic apples, sweet and crisp. Perfect for snacking or baking.",
    price: 120.00,
    quantityUnit: "per kg",
    imageUrl: "/apple.jpg",
    minOrderQuantity: 1,
    availableQuantity: 50,
    vendorName: "Patil Farms (Delhi)",
    latitude: 28.6139, // New Delhi
    longitude: 77.2090, // New Delhi
    category: "Fruits",
    vendorRating: 4.8,
  },
  {
    id: "2",
    name: "Tomatoes",
    description: "Vibrant and flavorful tomatoes, ideal for salads and gourmet dishes.",
    price: 90.00,
    quantityUnit: "per kg",
    imageUrl: "/tomato.jpg",
    minOrderQuantity: 0.5,
    availableQuantity: 30,
    vendorName: "Gupta Farm Produce (Mumbai)",
    latitude: 19.0760, // Mumbai
    longitude: 72.8777, // Mumbai
    category: "Vegetables",
    vendorRating: 4.5,
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
    vendorName: "Ecogrow (Bengaluru)",
    latitude: 12.9716, // Bengaluru
    longitude: 77.5946, // Bengaluru
    category: "Leafy Greens",
    vendorRating: 4.9,
  },
  {
    id: "4",
    name: "Potatoes",
    description: "Versatile potatoes, perfect for roasting or mashing.",
    price: 90.00,
    quantityUnit: "per kg",
    imageUrl: "/potato.jpg",
    minOrderQuantity: 2,
    availableQuantity: 80,
    vendorName: "Farm Fresh Co. (Chennai)",
    latitude: 13.0827, // Chennai
    longitude: 80.2707, // Chennai
    category: "Vegetables",
    vendorRating: 4.2,
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
    vendorName: "Tropical Delights (Kolkata)",
    latitude: 22.5726, // Kolkata
    longitude: 88.3639, // Kolkata
    category: "Fruits",
    vendorRating: 4.7,
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
    vendorName: "Citrus Grove (Hyderabad)",
    latitude: 17.3850, // Hyderabad
    longitude: 78.4867, // Hyderabad
    category: "Fruits",
    vendorRating: 4.6,
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
    vendorName: "Healthy Bites (Jaipur)",
    latitude: 26.9124, // Jaipur
    longitude: 75.7873, // Jaipur
    category: "Vegetables",
    vendorRating: 4.0,
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
    vendorName: "Spice Route (Ahmedabad)",
    latitude: 23.0225, // Ahmedabad
    longitude: 72.5714, // Ahmedabad
    category: "Spices",
    vendorRating: 4.3,
  },
  {
    id: "12",
    name: "Cabbage",
    description: "Fresh green cabbage, great for salads and stir-fries.",
    price: 40.00,
    quantityUnit: "per kg",
    imageUrl: "https://images.unsplash.com/photo-1590005354167-6dafe5cdace5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxjYWJiYWdlfGVufDB8fHx8MTcxOTk0NjY1N3ww&ixlib=rb-4.0.3&q=80&w=1080",
    minOrderQuantity: 1,
    availableQuantity: 70,
    vendorName: "Green Fields (Pune)",
    latitude: 18.5204, // Pune
    longitude: 73.8567, // Pune
    category: "Vegetables",
    vendorRating: 4.1,
  },
  {
    id: "13",
    name: "Bell Peppers",
    description: "Colorful bell peppers, perfect for adding crunch and flavor.",
    price: 150.00,
    quantityUnit: "per kg",
    imageUrl: "https://images.unsplash.com/photo-1518843875456-df49b7921538?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxiZWxsJTIwcGVwcGVyc3xlbnwwfHx8fDE3MTk5NDY2NTd8MA&ixlib=rb-4.0.3&q=80&w=1080",
    minOrderQuantity: 0.5,
    availableQuantity: 40,
    vendorName: "Rainbow Harvest (Lucknow)",
    latitude: 26.8467, // Lucknow
    longitude: 80.9462, // Lucknow
    category: "Vegetables",
    vendorRating: 4.6,
  },
];

const ClientDashboard = () => {
  const { supabase } = useSupabase();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductPreviewOpen, setIsProductPreviewOpen] = useState(false);
  const [showMapView, setShowMapView] = useState(false); // State to toggle between list and map view
  // Initialize userLocation with a default value
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({ lat: 28.6139, lng: 77.2090 }); // Default to New Delhi

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [vendorRatingFilter, setVendorRatingFilter] = useState<number>(0); // Min rating
  const [priceRangeFilter, setPriceRangeFilter] = useState<[number, number]>([0, 500]); // [min, max]
  const [deliveryLocationFilter, setDeliveryLocationFilter] = useState<string>(""); // For future use with geocoding

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          toast.error("Could not retrieve your location. Showing all vendors at a default location.");
          // userLocation already has a default, so no need to set it again here.
        }
      );
    } else {
      toast.info("Geolocation is not supported by your browser. Showing all vendors at a default location.");
      // userLocation already has a default.
    }
  }, []);

  // Apply filters whenever filter states or products change
  useEffect(() => {
    let currentFilteredProducts = products;

    // Apply search query filter (from BuyerDashboardLayout)
    // This will be handled by the onSearch prop, which updates filteredProducts directly.
    // So, we need to ensure the search query is also applied here if it's a persistent filter.
    // For now, let's assume onSearch updates filteredProducts, and these filters refine that.

    // Category filter
    if (categoryFilter !== "All") {
      currentFilteredProducts = currentFilteredProducts.filter(
        (product) => product.category === categoryFilter
      );
    }

    // Vendor Rating filter
    currentFilteredProducts = currentFilteredProducts.filter(
      (product) => product.vendorRating >= vendorRatingFilter
    );

    // Price Range filter
    currentFilteredProducts = currentFilteredProducts.filter(
      (product) => product.price >= priceRangeFilter[0] && product.price <= priceRangeFilter[1]
    );

    // Delivery Location filter (placeholder for future implementation with actual location data)
    // For now, this filter will not actively filter products based on location,
    // but the map will show nearby vendors based on userLocation.
    if (deliveryLocationFilter) {
      // This would involve more complex geospatial queries or client-side distance calculations
      // For now, it's a visual indicator on the map.
    }

    setFilteredProducts(currentFilteredProducts);
  }, [products, categoryFilter, vendorRatingFilter, priceRangeFilter, deliveryLocationFilter]);

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].orderedQuantity += quantity;
        toast.success(`${quantity} ${product.quantityUnit} of ${product.name} added to cart.`);
        return updatedItems;
      } else {
        toast.success(`${quantity} ${product.quantityUnit} of ${product.name} added to cart.`);
        return [...prevItems, { ...product, orderedQuantity: quantity }];
      }
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== productId);
      toast.info("Product removed from cart.");
      return updatedItems;
    });
  };

  const handleSearch = (query: string) => {
    if (!query) {
      // If query is empty, reset to all products, then apply other filters
      let currentFilteredProducts = products;

      if (categoryFilter !== "All") {
        currentFilteredProducts = currentFilteredProducts.filter(
          (product) => product.category === categoryFilter
        );
      }
      currentFilteredProducts = currentFilteredProducts.filter(
        (product) => product.vendorRating >= vendorRatingFilter
      );
      currentFilteredProducts = currentFilteredProducts.filter(
        (product) => product.price >= priceRangeFilter[0] && product.price <= priceRangeFilter[1]
      );

      setFilteredProducts(currentFilteredProducts);
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.vendorName.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(results);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductPreviewOpen(true);
  };

  const handleCloseProductPreview = () => {
    setIsProductPreviewOpen(false);
    setSelectedProduct(null);
  };

  const availableCategories = ["All", ...new Set(products.map(p => p.category))];

  return (
    <BuyerDashboardLayout
      cartItems={cartItems}
      onSearch={handleSearch}
      onRemoveFromCart={handleRemoveFromCart}
      categoryFilter={categoryFilter}
      setCategoryFilter={setCategoryFilter}
      vendorRatingFilter={vendorRatingFilter}
      setVendorRatingFilter={setVendorRatingFilter}
      priceRangeFilter={priceRangeFilter}
      setPriceRangeFilter={setPriceRangeFilter}
      deliveryLocationFilter={deliveryLocationFilter}
      setDeliveryLocationFilter={setDeliveryLocationFilter}
      availableCategories={availableCategories}
      userLocation={userLocation} // Pass userLocation to BuyerDashboardLayout
    >
      <div className="w-full max-w-6xl mx-auto py-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">Available Products</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          Explore fresh fruits and vegetables from local vendors.
        </p>
        
        <div className="flex justify-center gap-4 mb-6 px-4">
          <Button
            variant={!showMapView ? "default" : "outline"}
            onClick={() => setShowMapView(false)}
            className="px-6 py-3 text-lg"
          >
            Product Listings
          </Button>
          <Button
            variant={showMapView ? "default" : "outline"}
            onClick={() => setShowMapView(true)}
            className="px-6 py-3 text-lg"
          >
            View on Map
          </Button>
        </div>

        {showMapView ? (
          <VendorMap products={filteredProducts} userLocation={userLocation} />
        ) : (
          <ClientProductListings 
            products={filteredProducts} 
            onAddToCart={handleAddToCart} 
            onProductClick={handleProductClick} 
          />
        )}

        <div className="mt-12 text-center">
          <Link to="/">
            <Button variant="outline" className="px-6 py-3 text-lg border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-gray-700 shadow-lg transform transition-transform hover:scale-105">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <ProductPreviewDialog
        product={selectedProduct}
        isOpen={isProductPreviewOpen}
        onClose={handleCloseProductPreview}
        onAddToCart={handleAddToCart}
      />
    </BuyerDashboardLayout>
  );
};

export default ClientDashboard;