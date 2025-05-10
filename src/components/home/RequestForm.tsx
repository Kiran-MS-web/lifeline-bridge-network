
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import BloodTypeSelector from '@/components/common/BloodTypeSelector';
import LocationTracker from '@/components/common/LocationTracker';
import { toast } from 'sonner';
import { addBloodRequest } from '@/services/donationService';
import { getUserLocation } from '@/services/locationService';
import { useAuth } from '@/context/AuthContext';

type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

const RequestForm: React.FC = () => {
  const { user } = useAuth();
  const [selectedType, setSelectedType] = useState<BloodType | null>(null);
  const [urgency, setUrgency] = useState<string>('normal');
  const [needDelivery, setNeedDelivery] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [shareLocation, setShareLocation] = useState<boolean>(true);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to submit a blood request');
      return;
    }
    
    if (!selectedType) {
      toast.error('Please select a blood type');
      return;
    }
    
    if (!location) {
      toast.error('Please enter your location');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let latitude = null;
      let longitude = null;
      
      if (shareLocation) {
        const userLocation = await getUserLocation();
        if (userLocation) {
          latitude = userLocation.latitude;
          longitude = userLocation.longitude;
        }
      }
      
      const request = {
        blood_type: selectedType,
        urgency: urgency,
        units_requested: 1,
        request_date: new Date().toISOString(),
        hospital_name: location,
        status: 'pending',
        notes: needDelivery ? 'Delivery needed' : '',
        latitude: latitude,
        longitude: longitude
      };
      
      const result = await addBloodRequest(request);
      
      if (result) {
        toast.success('Blood request submitted successfully!');
        
        // Reset form
        setSelectedType(null);
        setUrgency('normal');
        setNeedDelivery(false);
        setLocation('');
      } else {
        toast.error('Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      toast.error('An error occurred while submitting your request');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="form-container">
      <h3 className="text-2xl font-bold mb-6">Need Blood?</h3>
      <p className="mb-6 text-muted-foreground">
        Fill out this quick form to request blood. For emergencies, please use the emergency button.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="bloodType" className="text-lg">Blood Type Needed</Label>
          <BloodTypeSelector
            selectedType={selectedType}
            onSelect={setSelectedType}
          />
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="urgency" className="text-lg">Urgency Level</Label>
          <Select 
            value={urgency} 
            onValueChange={setUrgency}
          >
            <SelectTrigger id="urgency" className="w-full">
              <SelectValue placeholder="Select urgency level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low - Within a week</SelectItem>
              <SelectItem value="normal">Normal - Within 48 hours</SelectItem>
              <SelectItem value="high">High - Within 24 hours</SelectItem>
              <SelectItem value="critical">Critical - ASAP (Consider using emergency button)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="location" className="text-lg">Your Location</Label>
          <Input 
            id="location" 
            placeholder="Enter your address or hospital name" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-base p-6"
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-2 mb-2">
            <Checkbox 
              id="shareLocation" 
              checked={shareLocation} 
              onCheckedChange={(checked) => setShareLocation(checked === true)}
            />
            <Label 
              htmlFor="shareLocation"
              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Share my exact location to help donors find me faster
            </Label>
          </div>
          
          {shareLocation && (
            <LocationTracker 
              autoShare={false}
              showMap={true}
              className="mt-4"
            />
          )}
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="delivery" 
            checked={needDelivery} 
            onCheckedChange={(checked) => setNeedDelivery(checked === true)}
          />
          <Label 
            htmlFor="delivery"
            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I need delivery to my home or hospital
          </Label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full text-lg py-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </Button>
      </form>
    </div>
  );
};

export default RequestForm;
