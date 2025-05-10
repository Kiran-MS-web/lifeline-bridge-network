
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MapPin, Navigation, Loader2 } from "lucide-react";
import { getUserLocation, updateUserLocation, generateGoogleMapsLink } from "@/services/locationService";
import { useAuth } from "@/context/AuthContext";

interface LocationTrackerProps {
  autoShare?: boolean;
  showMap?: boolean;
  className?: string;
}

const LocationTracker: React.FC<LocationTrackerProps> = ({
  autoShare = false,
  showMap = true,
  className = ""
}) => {
  const { user } = useAuth();
  const [location, setLocation] = useState<{ latitude: number; longitude: number; } | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (autoShare && user) {
      handleShareLocation();
    }
  }, [autoShare, user]);
  
  const handleShareLocation = async () => {
    if (!user) {
      toast.error("You need to sign in to share your location");
      return;
    }
    
    setLoading(true);
    try {
      const currentLocation = await getUserLocation();
      if (currentLocation) {
        setLocation({ 
          latitude: currentLocation.latitude, 
          longitude: currentLocation.longitude 
        });
        
        const success = await updateUserLocation(currentLocation);
        if (success) {
          setIsSharing(true);
          toast.success("Your location is now being shared");
        }
      }
    } catch (error) {
      console.error("Location error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const openInGoogleMaps = () => {
    if (!location) return;
    
    const mapsUrl = generateGoogleMapsLink(location.latitude, location.longitude);
    window.open(mapsUrl, '_blank');
  };
  
  return (
    <div className={`space-y-4 ${className}`}>
      {!isSharing ? (
        <Button 
          onClick={handleShareLocation} 
          className="flex items-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
          Share My Location
        </Button>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-500">
            <MapPin className="h-4 w-4" />
            <span>Location shared successfully</span>
          </div>
          
          {location && showMap && (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                Lat: {location.latitude.toFixed(6)}, Long: {location.longitude.toFixed(6)}
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={openInGoogleMaps}
                className="flex items-center gap-2"
              >
                <Navigation className="h-4 w-4" />
                View in Google Maps
              </Button>
              
              <div className="aspect-video w-full rounded-md overflow-hidden border mt-2">
                <iframe 
                  title="Your location"
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  src={`https://www.google.com/maps/embed/v1/place?key=&q=${location.latitude},${location.longitude}`} 
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationTracker;
