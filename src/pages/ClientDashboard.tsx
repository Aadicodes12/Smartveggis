"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ClientProductListings from "@/components/ClientProductListings";
import BuyerDashboardLayout from "@/components/BuyerDashboardLayout";
import ProductPreviewDialog from "@/components/ProductPreviewDialog";
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
  vendor_id?: string; // Added vendor_id
  distance?: number; // Added for sorting by distance
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantityUnit: string;
  orderedQuantity: number;
}

// Haversine formula to calculate distance between two lat/lng points in kilometers
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const ClientDashboard = () => {
  const { supabase } = useSupabase();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductPreviewOpen, setIsProductPreviewOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showNearestVendors, setShowNearestVendors] = useState(false); // New state for nearest vendors filter

  // Fetch user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast.success("Your location has been detected!");
        },
        (error) => {
          console.error("Error getting user location:", error);
          toast.error("Could not retrieve your location. Nearest vendor filter will not be active.");
          setUserLocation(null); // Explicitly set to null if permission denied or error
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      toast.info("Geolocation is not supported by your browser. Nearest vendor filter will not be active.");
      setUserLocation(null);
    }
  }, []);

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [vendorRatingFilter, setVendorRatingFilter] = useState<number>(0); // Min rating
  const [priceRangeFilter, setPriceRangeFilter] = useState<[number, number]>([0, 500]); // [min, max]
  const [deliveryLocationFilter, setDeliveryLocationFilter] = useState<string>(""); // For future use with geocoding

  const fetchAllProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.error("Error fetching all products:", error);
      setError("Failed to load products.");
      setProducts([]);
    } else {
      setProducts(data as Product[]);
      setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllProducts();

    // Set up real-time subscription for all products
    const channel = supabase
      .channel("all_products_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        (payload) => {
          console.log("Real-time change received for all products!", payload);
          fetchAllProducts(); // Re-fetch all products on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // Apply filters whenever filter states or products change
  useEffect(() => {
    let currentFilteredProducts = products;

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
    if (deliveryLocationFilter) {
      // This would involve more complex geospatial queries or client-side distance calculations
      // For now, it's a visual indicator on the map.
    }

    // Nearest Vendors filter
    if (showNearestVendors && userLocation) {
      currentFilteredProducts = currentFilteredProducts
        .map(product => {
          if (product.latitude && product.longitude) {
            const dist = calculateDistance(
              userLocation.lat,
              userLocation.lng,
              product.latitude,
              product.longitude
            );
            return { ...product, distance: dist };
          }
          return { ...product, distance: Infinity }; // Products without location go to the end
        })
        .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
    } else {
      // If not showing nearest, ensure distance is not used for sorting
      currentFilteredProducts = currentFilteredProducts.map(product => {
        const { distance, ...rest } = product; // Remove distance property
        return rest;
      });
    }

    setFilteredProducts(currentFilteredProducts);
  }, [products, categoryFilter, vendorRatingFilter, priceRangeFilter, deliveryLocationFilter, showNearestVendors, userLocation]);

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

      // Re-apply nearest vendors filter if active
      if (showNearestVendors && userLocation) {
        currentFilteredProducts = currentFilteredProducts
          .map(product => {
            if (product.latitude && product.longitude) {
              const dist = calculateDistance(
                userLocation.lat,
                userLocation.lng,
                product.latitude,
                product.longitude
              );
              return { ...product, distance: dist };
            }
            return { ...product, distance: Infinity };
          })
          .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
      } else {
        currentFilteredProducts = currentFilteredProducts.map(product => {
          const { distance, ...rest } = product;
          return rest;
        });
      }

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

  if (loading) {
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
        userLocation={userLocation}
        showNearestVendors={showNearestVendors}
        setShowNearestVendors={setShowNearestVendors}
      >
        <div className="w-full max-w-6xl mx-auto py-4 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading products...</p>
        </div>
      </BuyerDashboardLayout>
    );
  }

  if (error) {
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
        userLocation={userLocation}
        showNearestVendors={showNearestVendors}
        setShowNearestVendors={setShowNearestVendors}
      >
        <div className="w-full max-w-6xl mx-auto py-4 text-center">
          <p className="text-lg text-red-600 dark:text-red-400 mb-4">{error}</p>
          <Button onClick={fetchAllProducts}>Retry Loading Products</Button>
        </div>
      </BuyerDashboardLayout>
    );
  }

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
      userLocation={userLocation}
      showNearestVendors={showNearestVendors}
      setShowNearestVendors={setShowNearestVendors}
    >
      <div className="w-full max-w-6xl mx-auto py-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">Available Products</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          Explore fresh fruits and vegetables from local vendors.
        </p>
        
        <ClientProductListings 
          products={filteredProducts} 
          onAddToCart={handleAddToCart} 
          onProductClick={handleProductClick} 
        />

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