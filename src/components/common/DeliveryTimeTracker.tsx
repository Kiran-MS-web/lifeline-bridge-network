
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, MapPin, Clock, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

interface DeliveryTimeTrackerProps {
  requestLocation: string;
}

interface LocationCoordinates {
  lat: number;
  lng: number;
}

const DeliveryTimeTracker: React.FC<DeliveryTimeTrackerProps> = ({ requestLocation }) => {
  const [currentLocation, setCurrentLocation] = useState<LocationCoordinates | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setIsLoading(true);
        
        // Get current position using browser's geolocation API
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const userCoords = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            
            setCurrentLocation(userCoords);
            
            // For demo purposes, we'll simulate a destination location and calculate time
            // In a real app, you'd geocode the requestLocation address to get coordinates
            // and use a mapping API like Google Maps to calculate actual travel time
            const simulatedDestination = {
              lat: userCoords.lat + (Math.random() * 0.05 - 0.025),
              lng: userCoords.lng + (Math.random() * 0.05 - 0.025)
            };
            
            // Calculate distance (using Haversine formula)
            const distanceInKm = calculateDistance(
              userCoords.lat, userCoords.lng,
              simulatedDestination.lat, simulatedDestination.lng
            );
            
            setDistance(distanceInKm);
            
            // Calculate estimated time (assume average speed of 30 km/h in city)
            const timeInMinutes = Math.round(distanceInKm / 30 * 60);
            setEstimatedTime(timeInMinutes);
            
            setIsLoading(false);
          },
          (err) => {
            console.error("Error getting location:", err);
            setError("Unable to access your location. Please enable location services.");
            setIsLoading(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } catch (err) {
        console.error("Error in location tracking:", err);
        setError("An error occurred while tracking location.");
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, [requestLocation]);

  // Haversine formula to calculate distance between two points on Earth
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return parseFloat(d.toFixed(2));
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI/180);
  };

  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blood-600 to-blood-700 text-white">
        <CardTitle className="flex items-center">
          <Navigation className="mr-2 h-5 w-5" />
          Blood Delivery Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-muted-foreground">Calculating delivery time...</p>
          </div>
        ) : error ? (
          <div className="text-center py-4 text-destructive">
            <p>{error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Please enable location services to track delivery time
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="text-sm font-medium">Delivery to:</p>
                  <p className="text-muted-foreground">{requestLocation}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Distance:</p>
                <p className="text-muted-foreground">{distance} km</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  <p className="font-medium">Estimated delivery time:</p>
                </div>
                <motion.p 
                  className="text-xl font-bold text-primary"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {estimatedTime} min
                </motion.p>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div 
                  className="bg-primary h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 30, ease: "linear" }}
                ></motion.div>
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Blood being prepared</span>
                <span>On the way</span>
                <span>Delivered</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeliveryTimeTracker;
