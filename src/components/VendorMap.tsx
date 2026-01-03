"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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
  // Extract unique vendors from products that have location data
  const vendors = React.useMemo(() => {
    const uniqueVendors = new Map<string, { name: string; lat: number; lng: number; productsCount: number }>();
    products.forEach(product => {
      if (product.vendorName && product.latitude && product.longitude) {
        if (!uniqueVendors.has(product.vendorName)) {
          uniqueVendors.set(product.vendorName, {
            name: product.vendorName,
            lat: product.latitude,
            lng: product.longitude,
            productsCount: 1,
          });
        } else {
          const vendor = uniqueVendors.get(product.vendorName);
          if (vendor) {
            vendor.productsCount++;
          }
        }
      }
    });
    return Array.from(uniqueVendors.values());
  }, [products]);

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={13} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User's current location marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>
              You are here!
            </Popup>
          </Marker>
        )}

        {/* Vendor markers */}
        {vendors.map((vendor, index) => (
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