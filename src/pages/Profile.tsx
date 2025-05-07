
import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import BloodTypeSelector from '@/components/common/BloodTypeSelector';
import { toast } from 'sonner';
import { getProfile, updateProfile, type Profile as ProfileType } from '@/services/profileService';
import { useAuth } from '@/context/AuthContext';

type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bloodType, setBloodType] = useState<BloodType>('A+');
  const [isDonor, setIsDonor] = useState(false);
  const [allowEmergencyContacts, setAllowEmergencyContacts] = useState(true);
  
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const profileData = await getProfile();
        
        if (profileData) {
          setProfile(profileData);
          setName(profileData.full_name || '');
          setPhone(profileData.phone_number || '');
          setAddress(profileData.address || '');
          setBloodType((profileData.blood_type as BloodType) || 'A+');
          setIsDonor(profileData.is_donor || false);
        }
        
        // Set email from auth user
        if (user.email) {
          setEmail(user.email);
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    
    loadProfile();
  }, [user]);
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const updated = await updateProfile({
        full_name: name,
        phone_number: phone,
        address: address
      });
      
      if (updated) {
        setProfile(updated);
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
    }
  };
  
  const handleMedicalInfoUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const updated = await updateProfile({
        blood_type: bloodType,
        is_donor: isDonor
      });
      
      if (updated) {
        setProfile(updated);
        toast.success('Medical information updated successfully!');
      }
    } catch (error) {
      console.error('Failed to update medical info:', error);
      toast.error('Failed to update medical information');
    }
  };
  
  const handlePreferencesUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Preferences updated successfully!');
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[60vh]">
            <p className="text-lg">Loading profile...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">My Profile</h1>
        
        <Tabs defaultValue="personal" className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="medical">Medical</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          {/* Personal Information Tab */}
          <TabsContent value="personal" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-lg">Full Name</Label>
                      <Input 
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-base p-6"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-lg">Email</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={email}
                        disabled
                        className="text-base p-6 bg-muted"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-lg">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="text-base p-6"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="address" className="text-lg">Address</Label>
                      <Input 
                        id="address" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="text-base p-6"
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="text-lg py-6 px-8">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Medical Information Tab */}
          <TabsContent value="medical" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Medical Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMedicalInfoUpdate} className="space-y-6">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="bloodType" className="text-lg">Blood Type</Label>
                      <BloodTypeSelector
                        selectedType={bloodType}
                        onSelect={setBloodType}
                      />
                    </div>
                    
                    <div className="border-t pt-6">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="donor"
                          checked={isDonor}
                          onCheckedChange={setIsDonor}
                        />
                        <Label htmlFor="donor" className="text-lg">I am willing to be a blood donor</Label>
                      </div>
                      
                      <p className="text-muted-foreground mt-2">
                        By opting in, you may be contacted for blood donation when there's a match request in your area.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <Label className="text-lg">Health Conditions</Label>
                      <p className="text-muted-foreground mb-2">
                        Select any health conditions that apply to you. This information helps ensure safe donation.
                      </p>
                      
                      {/* Simplified for this example - would be a list of checkboxes in reality */}
                      <div className="bg-muted p-4 rounded-md">
                        <p className="text-center text-muted-foreground">
                          Health conditions component would go here
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit" className="text-lg py-6 px-8">Save Medical Information</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Preferences Tab */}
          <TabsContent value="preferences" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePreferencesUpdate} className="space-y-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="text-lg font-medium">Email Notifications</p>
                        <p className="text-muted-foreground">Receive updates about donation events and requests</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="text-lg font-medium">SMS Notifications</p>
                        <p className="text-muted-foreground">Receive urgent blood requests and donation reminders</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="text-lg font-medium">Location Sharing</p>
                        <p className="text-muted-foreground">Allow your location to be used for finding nearby donation opportunities</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between pb-4">
                      <div>
                        <p className="text-lg font-medium">Emergency Contact Permission</p>
                        <p className="text-muted-foreground">Allow your contact information to be used for urgent blood needs</p>
                      </div>
                      <Switch 
                        checked={allowEmergencyContacts} 
                        onCheckedChange={setAllowEmergencyContacts}
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="text-lg py-6 px-8">Save Preferences</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="text-lg font-medium">Delete Account</p>
                <p className="text-muted-foreground mb-4">
                  This will permanently delete your account and all associated data.
                </p>
                <Button variant="destructive">Delete Account</Button>
              </div>
              
              <div>
                <p className="text-lg font-medium">Export Data</p>
                <p className="text-muted-foreground mb-4">
                  Download a copy of your personal data.
                </p>
                <Button variant="outline">Export Personal Data</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
