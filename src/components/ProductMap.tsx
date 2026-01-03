"use client";

import React, { useState, useRef } from "react";
import Map, { Marker, Popup, ViewStateChangeEvent } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Product } from "@/data/dummyProducts";
import { MapPin } from "lucide-react";

interface ProductMapProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const MAPTILER_API_KEY = "v3zje79lMMfySZVAQUvO"; // Your MapTiler API key
const MAPTILER_STYLE_URL = `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_API_KEY}`;

const ProductMap: React.FC<ProductMapProps> = ({ products, onProductClick }) => {
  const [viewport, setViewport] = useState({
    latitude: 20.5937, // Centered roughly over India
    longitude: 78.9629,
    zoom: 4,
  });
  const [popupInfo, setPopupInfo] = useState<Product | null>(null);

  const mapRef = useRef<any>(null);

  const handleViewportChange = (event: ViewStateChangeEvent) => {
    setViewport(event.viewState);
  };

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPTILER_API_KEY} // MapTiler uses Mapbox GL JS, so this prop is used for the key
        initialViewState={viewport}
        style={{ width: "100%", height: "100%" }}
        mapStyle={MAPTILER_STYLE_URL}
        onMove={handleViewportChange}
      >
        {products.map((product) => (
          product.latitude && product.longitude && (
            <Marker
              key={product.id}
              latitude={product.latitude}
              longitude={product.longitude}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation(); // Prevent map click event from firing
                setPopupInfo(product);
              }}
            >
              <MapPin className="h-8 w-8 text-green-600 cursor-pointer" />
            </Marker>
          )
        ))}

        {popupInfo && (
          <Popup
            anchor="top"
            latitude={popupInfo.latitude!}
            longitude={popupInfo.longitude!}
            onClose={() => setPopupInfo(null)}
            closeButton={false}
            closeOnClick={false}
            className="product-map-popup"
          >
            <div className="p-2">
              <h3 className="font-semibold text-lg mb-1">{popupInfo.name}</h3>
              <p className="text-sm text-gray-600">{popupInfo.vendorName}</p>
              <p className="text-sm text-gray-600">{popupInfo.city}</p>
              <p className="text-md font-bold text-green-700 mt-2">
                ₹{popupInfo.price.toFixed(2)} {popupInfo.quantityUnit}
              </p>
              <Button 
                size="sm" 
                className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  onProductClick(popupInfo);
                  setPopupInfo(null); // Close popup after clicking
                }}
              >
                View Details
              </Button>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default ProductMap;