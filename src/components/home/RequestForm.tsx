
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
import { toast } from 'sonner';

type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

const RequestForm: React.FC = () => {
  const [selectedType, setSelectedType] = useState<BloodType | null>(null);
  const [urgency, setUrgency] = useState<string>('normal');
  const [needDelivery, setNeedDelivery] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedType) {
      toast.error('Please select a blood type');
      return;
    }
    
    if (!location) {
      toast.error('Please enter your location');
      return;
    }
    
    // Here we would normally submit the form to an API
    console.log({
      bloodType: selectedType,
      urgency,
      needDelivery,
      location
    });
    
    toast.success('Blood request submitted successfully!');
    
    // Reset form
    setSelectedType(null);
    setUrgency('normal');
    setNeedDelivery(false);
    setLocation('');
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
        
        <Button type="submit" className="w-full text-lg py-6">Submit Request</Button>
      </form>
    </div>
  );
};

export default RequestForm;
