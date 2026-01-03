"use client";

import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon issue with Webpack/Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

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
}

interface VendorMapProps {
  products: Product[];
  userLocation: { lat: number; lng: number };
}

const VendorMap: React.FC<VendorMapProps> = ({ products, userLocation }) => {
  const [mapBounds, setMapBounds] = useState<L.LatLngBounds | null>(null);

  // Extract unique vendors from products that have location data
  const allVendors = useMemo(() => {
    const uniqueVendors = new Map<string, { name: string; lat: number; lng: number; productsCount: number }>();
    products.forEach(product => {
      if (product.vendorName && product.latitude && product.longitude) {
        const vendorKey = `${product.vendorName}-${product.latitude}-${product.longitude}`; // Unique key for vendor location
        if (!uniqueVendors.has(vendorKey)) {
          uniqueVendors.set(vendorKey, {
            name: product.vendorName,
            lat: product.latitude,
            lng: product.longitude,
            productsCount: 1,
          });
        } else {
          const vendor = uniqueVendors.get(vendorKey);
          if (vendor) {
            vendor.productsCount++;
          }
        }
      }
    });
    return Array.from(uniqueVendors.values());
  }, [products]);

  const MapEvents = () => {
    useMapEvents({
      moveend: (e) => {
        setMapBounds(e.target.getBounds());
      },
      zoomend: (e) => {
        setMapBounds(e.target.getBounds());
      },
    });
    return null;
  };

  const visibleVendors = useMemo(() => {
    if (!mapBounds) return allVendors; // Show all initially until bounds are set
    return allVendors.filter(vendor => {
      const latLng = L.latLng(vendor.lat, vendor.lng);
      return mapBounds.contains(latLng);
    });
  }, [allVendors, mapBounds]);

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer 
        center={[22.3511148, 78.6677428]} // Center of India
        zoom={5} // Initial zoom level to show most of India
        scrollWheelZoom={true} // Enable scroll wheel zoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents /> {/* Attach map event listeners */}

        {/* User's current location marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>
              You are here!
            </Popup>
          </Marker>
        )}

        {/* Vendor markers */}
        {visibleVendors.map((vendor, index) => (
          <Marker key={index} position={[vendor.lat, vendor.lng]}>
            <Popup>
              <div className="font-semibold">{vendor.name}</div>
              <div>{vendor.productsCount} products available</div>
              {/* Add more vendor details or a link to their page here */}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default VendorMap;