
import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface LocationMapProps {
  location: { lat: number; lng: number } | null;
  className?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ location, className = "" }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // In a real implementation, we would initialize a proper map here
    // with Mapbox, Leaflet, or Google Maps
    
    // For now, we'll show a simplified UI representation
  }, [location]);
  
  if (!location) {
    return (
      <div className={`bg-gray-100 rounded-lg p-4 flex items-center justify-center ${className}`}>
        <p className="text-muted-foreground">Location data unavailable</p>
      </div>
    );
  }
  
  return (
    <div 
      ref={mapRef} 
      className={`relative bg-blue-50 rounded-lg overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+e91e63(${location.lng},${location.lat})/${location.lng},${location.lat},12/500x300?access_token=pk.example')] bg-cover bg-center opacity-50"></div>
      <div className="relative p-4 h-full flex flex-col items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-500" />
            <span className="font-medium">Current Location</span>
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
          </div>
        </div>
        <div className="mt-2 text-xs text-center bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
          Donors in a 10km radius will be notified
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
