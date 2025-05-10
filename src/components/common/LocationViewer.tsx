
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Map, Navigation, Route } from "lucide-react";
import { getUserLocation, generateDirectionsLink } from "@/services/locationService";

interface LocationViewerProps {
  latitude: number;
  longitude: number;
  name?: string;
  className?: string;
}

const LocationViewer: React.FC<LocationViewerProps> = ({
  latitude,
  longitude,
  name = "Location",
  className = ""
}) => {
  const [loading, setLoading] = useState(false);
  
  const viewLocation = () => {
    const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(mapsUrl, '_blank');
  };
  
  const getDirections = async () => {
    setLoading(true);
    try {
      const userLocation = await getUserLocation();
      
      if (userLocation) {
        const directionsUrl = generateDirectionsLink(
          userLocation.latitude, 
          userLocation.longitude, 
          latitude, 
          longitude
        );
        window.open(directionsUrl, '_blank');
      } else {
        toast.error("Could not get your current location");
      }
    } catch (error) {
      console.error("Error getting directions:", error);
      toast.error("Failed to get directions");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="aspect-video w-full rounded-md overflow-hidden border">
        <iframe 
          title={`Location of ${name}`}
          width="100%" 
          height="100%" 
          frameBorder="0" 
          src={`https://www.google.com/maps/embed/v1/place?key=&q=${latitude},${longitude}`} 
          allowFullScreen
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          onClick={viewLocation}
          className="flex items-center gap-2 flex-1"
        >
          <Map className="h-4 w-4" />
          View in Google Maps
        </Button>
        
        <Button 
          onClick={getDirections}
          disabled={loading}
          className="flex items-center gap-2 flex-1"
        >
          <Route className="h-4 w-4" />
          Get Directions
        </Button>
      </div>
    </div>
  );
};

export default LocationViewer;
