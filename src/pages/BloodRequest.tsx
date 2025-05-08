
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EmergencyButton from '@/components/common/EmergencyButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import BloodTypeSelector from '@/components/common/BloodTypeSelector';
import { toast } from 'sonner';

type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

const BloodRequest: React.FC = () => {
  const location = useLocation();
  const [isEmergency, setIsEmergency] = useState(false);
  const [selectedType, setSelectedType] = useState<BloodType | null>(null);
  const [units, setUnits] = useState('1');
  const [urgency, setUrgency] = useState('normal');
  const [needDelivery, setNeedDelivery] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [recipientContact, setRecipientContact] = useState('');
  const [recipientLocation, setRecipientLocation] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  
  useEffect(() => {
    // Check if it's an emergency request from URL params
    const searchParams = new URLSearchParams(location.search);
    const emergency = searchParams.get('emergency');
    if (emergency === 'true') {
      setIsEmergency(true);
      setUrgency('critical');
    }
  }, [location]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedType) {
      toast.error('Please select a blood type');
      return;
    }
    
    if (!recipientName || !recipientContact || !recipientLocation) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Here we would normally submit the form to an API
    console.log({
      isEmergency,
      bloodType: selectedType,
      units,
      urgency,
      needDelivery,
      recipientName,
      recipientContact,
      recipientLocation,
      hospitalName,
      additionalInfo
    });
    
    toast.success(`Blood request submitted successfully${isEmergency ? ' as EMERGENCY!' : '!'}`);
  };
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {isEmergency ? '🚨 EMERGENCY Blood Request' : 'Request Blood'}
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          {isEmergency 
            ? 'This request will be prioritized and marked as urgent. We will respond as quickly as possible.' 
            : 'Fill out the form below to request blood. All fields marked with * are required.'}
        </p>
        
        <Card className={isEmergency ? 'border-red-500 border-2' : ''}>
          <CardHeader className={isEmergency ? 'bg-red-50' : ''}>
            <CardTitle>Blood Request Form</CardTitle>
            <CardDescription>
              {isEmergency 
                ? 'Emergency requests are processed with the highest priority' 
                : 'Please provide accurate information to help match donors'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="bloodType" className="text-lg">
                  Blood Type Needed *
                </Label>
                <BloodTypeSelector
                  selectedType={selectedType}
                  onSelect={setSelectedType}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="units" className="text-lg">Units Needed *</Label>
                  <Select 
                    value={units} 
                    onValueChange={setUnits}
                  >
                    <SelectTrigger id="units" className="text-base p-6">
                      <SelectValue placeholder="Select number of units" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 unit</SelectItem>
                      <SelectItem value="2">2 units</SelectItem>
                      <SelectItem value="3">3 units</SelectItem>
                      <SelectItem value="4">4 units</SelectItem>
                      <SelectItem value="5+">5+ units</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="urgency" className="text-lg">Urgency Level *</Label>
                  <Select 
                    value={urgency} 
                    onValueChange={setUrgency}
                    disabled={isEmergency}
                  >
                    <SelectTrigger id="urgency" className="text-base p-6">
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Within a week</SelectItem>
                      <SelectItem value="normal">Normal - Within 48 hours</SelectItem>
                      <SelectItem value="high">High - Within 24 hours</SelectItem>
                      <SelectItem value="critical">Critical - ASAP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="recipient-name" className="text-lg">Recipient Name *</Label>
                <Input 
                  id="recipient-name" 
                  placeholder="Full name of the person who needs blood" 
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="text-base p-6"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="recipient-contact" className="text-lg">Contact Number *</Label>
                  <Input 
                    id="recipient-contact" 
                    placeholder="Phone number" 
                    value={recipientContact}
                    onChange={(e) => setRecipientContact(e.target.value)}
                    className="text-base p-6"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="recipient-location" className="text-lg">Location *</Label>
                  <Input 
                    id="recipient-location" 
                    placeholder="City and area" 
                    value={recipientLocation}
                    onChange={(e) => setRecipientLocation(e.target.value)}
                    className="text-base p-6"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="hospital-name" className="text-lg">Hospital/Medical Facility</Label>
                <Input 
                  id="hospital-name" 
                  placeholder="Name of hospital or medical facility (if applicable)" 
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
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
                  className="leading-normal"
                >
                  I need blood to be delivered to the recipient location
                </Label>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="additional-info" className="text-lg">Additional Information</Label>
                <Textarea 
                  id="additional-info" 
                  placeholder="Any additional details that might help with the request" 
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              
              <Button 
                type="submit" 
                className={`w-full text-lg py-6 ${isEmergency ? 'bg-red-600 hover:bg-red-700' : ''}`}
              >
                {isEmergency ? 'Submit EMERGENCY Request' : 'Submit Blood Request'}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">How quickly will I receive the requested blood?</h3>
                  <p className="text-muted-foreground">
                    Processing time depends on your urgency level, blood type availability, and location. Emergency requests are prioritized and typically processed within hours.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Is there a fee for blood delivery?</h3>
                  <p className="text-muted-foreground">
                    Basic delivery within city limits is free. Long-distance deliveries may incur a small fee to cover transportation costs.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">What if my blood type is rare?</h3>
                  <p className="text-muted-foreground">
                    For rare blood types, we expand our search to a wider geographic area and tap into our network of regular donors with rare blood types who have opted in for emergency notifications.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <EmergencyButton />
    </>
  );
};

export default BloodRequest;
