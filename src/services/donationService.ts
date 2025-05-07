
import { supabase } from "@/integrations/supabase/client";

export type BloodDonation = {
  id: string;
  user_id: string;
  donation_date: string;
  amount_ml: number;
  location: string | null;
  notes: string | null;
  created_at: string;
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

export const addDonation = async (donation: Omit<BloodDonation, 'id' | 'created_at'>): Promise<BloodDonation | null> => {
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

export const addBloodRequest = async (request: Omit<BloodRequest, 'id' | 'created_at' | 'updated_at' | 'user_id'>): Promise<BloodRequest | null> => {
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
