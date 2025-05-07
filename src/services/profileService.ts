
import { supabase } from "@/integrations/supabase/client";

export type Profile = {
  id: string;
  full_name: string | null;
  phone_number: string | null;
  address: string | null;
  blood_type: string | null;
  is_donor: boolean | null;
  created_at: string;
  updated_at: string;
};

export const getProfile = async (): Promise<Profile | null> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) return null;
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.user.id)
    .single();
  
  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
  
  return data;
};

export const updateProfile = async (profile: Partial<Profile>): Promise<Profile | null> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) return null;
  
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...profile,
      updated_at: new Date().toISOString()
    })
    .eq('id', user.user.id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating profile:', error);
    return null;
  }
  
  return data;
};
