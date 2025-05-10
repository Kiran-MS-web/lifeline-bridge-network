
import { supabase } from "@/integrations/supabase/client";

export type BloodDonation = {
  id: string;
  user_id: string;
  donation_date: string;
  amount_ml: number;
  location: string | null;
  notes: string | null;
  created_at: string;
  latitude?: number | null;
  longitude?: number | null;
};

export type BloodRequest = {
  id: string;
  user_id: string;
  request_date: string;
  blood_type: string;
  units_requested: number;
  urgency: string;
  status: string;
  hospital_name: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  latitude?: number | null;
  longitude?: number | null;
};

export const getDonationHistory = async (): Promise<BloodDonation[]> => {
  const { data: userResponse } = await supabase.auth.getUser();
  if (!userResponse.user) return [];
  
  const { data, error } = await supabase
    .from('blood_donations')
    .select('*')
    .eq('user_id', userResponse.user.id)
    .order('donation_date', { ascending: false });
    
  if (error) {
    console.error('Error fetching donation history:', error);
    return [];
  }
  
  return data || [];
};

export const addDonation = async (
  donation: Omit<BloodDonation, 'id' | 'created_at'> & { latitude?: number | null; longitude?: number | null; }
): Promise<BloodDonation | null> => {
  const { data: userResponse } = await supabase.auth.getUser();
  if (!userResponse.user) return null;
  
  const { data, error } = await supabase
    .from('blood_donations')
    .insert({
      ...donation,
      user_id: userResponse.user.id
    })
    .select()
    .single();
    
  if (error) {
    console.error('Error adding donation:', error);
    return null;
  }
  
  return data;
};

export const getBloodRequests = async (): Promise<BloodRequest[]> => {
  const { data: userResponse } = await supabase.auth.getUser();
  if (!userResponse.user) return [];
  
  const { data, error } = await supabase
    .from('blood_requests')
    .select('*')
    .eq('user_id', userResponse.user.id)
    .order('request_date', { ascending: false });
    
  if (error) {
    console.error('Error fetching blood requests:', error);
    return [];
  }
  
  return data || [];
};

export const addBloodRequest = async (
  request: Omit<BloodRequest, 'id' | 'created_at' | 'updated_at' | 'user_id'> & 
  { latitude?: number | null; longitude?: number | null; }
): Promise<BloodRequest | null> => {
  const { data: userResponse } = await supabase.auth.getUser();
  if (!userResponse.user) return null;
  
  const { data, error } = await supabase
    .from('blood_requests')
    .insert({
      ...request,
      user_id: userResponse.user.id
    })
    .select()
    .single();
    
  if (error) {
    console.error('Error adding blood request:', error);
    return null;
  }
  
  return data;
};

export const updateBloodRequest = async (id: string, updates: Partial<BloodRequest>): Promise<BloodRequest | null> => {
  const { data, error } = await supabase
    .from('blood_requests')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating blood request:', error);
    return null;
  }
  
  return data;
};

export const getRequestById = async (requestId: string): Promise<BloodRequest | null> => {
  const { data, error } = await supabase
    .from('blood_requests')
    .select('*')
    .eq('id', requestId)
    .single();
    
  if (error) {
    console.error('Error fetching blood request:', error);
    return null;
  }
  
  return data;
};

export const getNearbyDonors = async (bloodType: string, latitude: number, longitude: number, radiusKm: number = 10): Promise<any[]> => {
  // This is a simplified version - in a real app, you would use PostGIS or a geolocation service
  // to do proper radius search
  
  // For now, we'll just get all donors with the matching blood type
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('blood_type', bloodType)
    .eq('is_donor', true)
    .not('last_latitude', 'is', null)
    .not('last_longitude', 'is', null);
    
  if (error) {
    console.error('Error fetching nearby donors:', error);
    return [];
  }
  
  // Filter by distance (simplified)
  // In a real app, use proper geospatial calculations
  const nearbyDonors = data.filter(donor => {
    if (!donor.last_latitude || !donor.last_longitude) return false;
    
    // Simple distance calculation (not accurate for large distances)
    const latDiff = donor.last_latitude - latitude;
    const lngDiff = donor.last_longitude - longitude;
    const distanceSquared = latDiff * latDiff + lngDiff * lngDiff;
    
    // Rough approximation: 1 degree ≈ 111km at the equator
    // So distanceSquared < (radiusKm/111)^2 is approximately within radiusKm
    return distanceSquared < Math.pow(radiusKm/111, 2);
  });
  
  return nearbyDonors;
};
