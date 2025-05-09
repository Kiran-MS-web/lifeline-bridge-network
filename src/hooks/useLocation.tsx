
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface LocationState {
  loading: boolean;
  error: string | null;
  location: { lat: number; lng: number } | null;
}

export const useLocation = () => {
  const [state, setState] = useState<LocationState>({
    loading: true,
    error: null,
    location: null
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        loading: false,
        error: "Geolocation is not supported by your browser",
        location: null
      });
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      position => {
        setState({
          loading: false,
          error: null,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      },
      error => {
        let errorMessage = "Unknown error occurred while retrieving location";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access was denied. Please enable location services to find nearby donors";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get location timed out";
            break;
        }
        
        setState({
          loading: false,
          error: errorMessage,
          location: null
        });
        
        toast.error(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
    
    // For real-time tracking, you can also use watchPosition
    const watchId = navigator.geolocation.watchPosition(
      position => {
        setState(prev => {
          // Only update if position actually changed significantly
          if (!prev.location || 
              Math.abs(prev.location.lat - position.coords.latitude) > 0.0001 ||
              Math.abs(prev.location.lng - position.coords.longitude) > 0.0001) {
            return {
              loading: false,
              error: null,
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            };
          }
          return prev;
        });
      },
      error => {
        console.error("Error watching position:", error);
        // Don't update state here, let the first getCurrentPosition handle errors
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
    
    // Clean up the watcher
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return state;
};

export default useLocation;
