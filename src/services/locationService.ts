
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Location {
  latitude: number;
  longitude: number;
  timestamp: Date;
}

export const updateUserLocation = async (location: Location): Promise<boolean> => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      toast.error("You must be signed in to share your location");
      return false;
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        // We'll store the most recent location in the profiles table
        // We can add a locations history table later if needed
        last_latitude: location.latitude,
        last_longitude: location.longitude,
        last_location_update: location.timestamp.toISOString(),
      })
      .eq('id', user.user.id);
    
    if (error) {
      console.error('Error updating user location:', error);
      toast.error("Failed to update your location");
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in updateUserLocation:', error);
    toast.error("Location sharing failed");
    return false;
  }
};

export const getUserLocation = async (): Promise<Location | null> => {
  try {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        toast.error("Geolocation is not supported by your browser");
        reject(new Error("Geolocation not supported"));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: new Date()
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error(`Location error: ${error.message}`);
          reject(error);
        },
        { enableHighAccuracy: true }
      );
    });
  } catch (error) {
    console.error('Error in getUserLocation:', error);
    return null;
  }
};

export const generateGoogleMapsLink = (latitude: number, longitude: number): string => {
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
};

export const generateDirectionsLink = (
  fromLat: number, 
  fromLng: number, 
  toLat: number, 
  toLng: number
): string => {
  return `https://www.google.com/maps/dir/?api=1&origin=${fromLat},${fromLng}&destination=${toLat},${toLng}`;
};
