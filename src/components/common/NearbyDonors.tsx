
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from "@/integrations/supabase/client";
import { Loader2, MapPin, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type Donor = {
  id: string;
  name: string;
  blood_type: string;
  distance: number;
  last_donation?: string;
  phone?: string;
}

interface NearbyDonorsProps {
  userLocation: { lat: number; lng: number } | null;
  bloodType: string | null;
  urgency: string;
}

const NearbyDonors: React.FC<NearbyDonorsProps> = ({ userLocation, bloodType, urgency }) => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [contactedDonors, setContactedDonors] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!userLocation || !bloodType) return;
    
    const fetchNearbyDonors = async () => {
      setLoading(true);
      try {
        // In a real implementation, we would query Supabase for actual donors
        // using PostGIS or a similar geospatial extension
        // For demo purposes, we'll simulate some nearby donors
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate some fake donors based on the blood type requested
        const compatibleTypes = getCompatibleBloodTypes(bloodType);
        const mockDonors: Donor[] = Array(5).fill(0).map((_, index) => ({
          id: `donor-${index}`,
          name: `Donor ${index + 1}`,
          blood_type: compatibleTypes[index % compatibleTypes.length],
          distance: Math.round((Math.random() * 10 + 0.5) * 10) / 10, // 0.5 - 10.5km, rounded to 1 decimal
          last_donation: getRandomPastDate(),
          phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`
        }));
        
        // Sort by distance
        mockDonors.sort((a, b) => a.distance - b.distance);
        
        setDonors(mockDonors);
      } catch (error) {
        console.error("Error fetching nearby donors:", error);
        toast.error("Could not fetch nearby donors. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchNearbyDonors();
    
    // Set up a polling interval to refresh donors (simulates real-time)
    const interval = setInterval(() => {
      fetchNearbyDonors();
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [userLocation, bloodType]);
  
  const getCompatibleBloodTypes = (requestedType: string): string[] => {
    // This is a simplified compatibility chart
    const compatibilityMap: Record<string, string[]> = {
      'O-': ['O-'],
      'O+': ['O-', 'O+'],
      'A-': ['O-', 'A-'],
      'A+': ['O-', 'O+', 'A-', 'A+'],
      'B-': ['O-', 'B-'],
      'B+': ['O-', 'O+', 'B-', 'B+'],
      'AB-': ['O-', 'A-', 'B-', 'AB-'],
      'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']
    };
    
    return compatibilityMap[requestedType] || [];
  };
  
  const getRandomPastDate = () => {
    const today = new Date();
    const pastDays = Math.floor(Math.random() * 120) + 60; // Between 60-180 days ago
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - pastDays);
    return pastDate.toISOString().split('T')[0];
  };
  
  const handleContactDonor = (donorId: string) => {
    // In a real app, this would send a notification to the donor or connect them
    setContactedDonors(prev => new Set([...prev, donorId]));
    toast.success("Donor has been notified of your request");
  };

  if (!userLocation) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg shadow-inner text-center">
        <p>Please allow location access to find nearby donors</p>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg shadow-inner text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
        <p>Locating nearby donors...</p>
      </div>
    );
  }
  
  if (donors.length === 0) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg shadow-inner text-center">
        <p className="text-muted-foreground">No compatible donors found nearby</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Nearby Donors ({donors.length})</h3>
      <div className="space-y-3">
        {donors.map((donor) => (
          <motion.div 
            key={donor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-background border rounded-lg shadow-sm hover:shadow transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{donor.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{donor.distance} km away</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-medium rounded-full text-sm">
                  {donor.blood_type}
                </span>
                {donor.last_donation && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Last donation: {donor.last_donation}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm flex items-center">
                <Phone className="h-3 w-3 mr-1" />
                {donor.phone}
              </div>
              <Button 
                size="sm"
                variant={contactedDonors.has(donor.id) ? "outline" : "default"}
                onClick={() => handleContactDonor(donor.id)}
                disabled={contactedDonors.has(donor.id)}
              >
                {contactedDonors.has(donor.id) ? "Contacted" : "Contact"}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center text-xs text-muted-foreground mt-4">
        {urgency === 'critical' ? 
          "Critical requests are sent automatically to all nearby compatible donors" : 
          "Only donors who match your blood type requirements and are available are shown"}
      </div>
    </div>
  );
};

export default NearbyDonors;
