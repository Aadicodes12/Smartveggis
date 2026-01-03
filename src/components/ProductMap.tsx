"use client";

import React, { useState, useRef } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Product } from "@/data/dummyProducts";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductMapProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

// Removed MAPTILER_API_KEY and MAPTILER_STYLE_URL

const ProductMap: React.FC<ProductMapProps> = ({ products, onProductClick }) => {
  const [viewport, setViewport] = useState({
    latitude: 20.5937, // Centered roughly over India
    longitude: 78.9629,
    zoom: 4,
  });
  const [popupInfo, setPopupInfo] = useState<Product | null>(null);

  const mapRef = useRef<any>(null);

  const handleViewportChange = (event: any) => {
    setViewport(event.viewState);
  };

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <Map
        ref={mapRef}
        // Removed mapboxAccessToken and mapStyle props
        initialViewState={viewport}
        style={{ width: "100%", height: "100%" }}
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
                e.originalEvent.stopPropagation();
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
                  setPopupInfo(null);
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