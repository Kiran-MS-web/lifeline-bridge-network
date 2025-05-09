
import React, { useState, useEffect } from 'react';
import { useLocation as useRouterLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EmergencyButton from '@/components/common/EmergencyButton';
import DeliveryTimeTracker from '@/components/common/DeliveryTimeTracker';
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
import { motion } from 'framer-motion';
import useLocation from '@/hooks/useLocation';
import NearbyDonors from '@/components/common/NearbyDonors';
import LocationMap from '@/components/common/LocationMap';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from 'lucide-react';

type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

const BloodRequest: React.FC = () => {
  const routerLocation = useRouterLocation();
  const { loading: locationLoading, error: locationError, location } = useLocation();
  const [activeTab, setActiveTab] = useState<string>('form');
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
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    // Check if it's an emergency request from URL params
    const searchParams = new URLSearchParams(routerLocation.search);
    const emergency = searchParams.get('emergency');
    if (emergency === 'true') {
      setIsEmergency(true);
      setUrgency('critical');
    }
  }, [routerLocation]);

  useEffect(() => {
    // Auto-fill recipient location if gps location is available
    if (location && !recipientLocation) {
      // In a real app, we would use a geocoding service to convert coordinates
      // to a human-readable address
      setRecipientLocation(`Location at ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`);
    }
  }, [location, recipientLocation]);
  
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
      additionalInfo,
      gpsLocation: location
    });
    
    toast.success(`Blood request submitted successfully${isEmergency ? ' as EMERGENCY!' : '!'}`);
    setSubmitted(true);
    setActiveTab('donors');
  };
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-2 font-heading"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isEmergency ? '🚨 EMERGENCY Blood Request' : 'Request Blood'}
        </motion.h1>
        <motion.p 
          className="text-muted-foreground mb-8 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isEmergency 
            ? 'This request will be prioritized and marked as urgent. We will respond as quickly as possible.' 
            : 'Fill out the form below to request blood. All fields marked with * are required.'}
        </motion.p>
        
        {submitted && needDelivery ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DeliveryTimeTracker requestLocation={recipientLocation} />
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Request Submitted Successfully</CardTitle>
                <CardDescription>
                  Your blood request has been received and is being processed.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p><span className="font-medium">Blood Type:</span> {selectedType}</p>
                  <p><span className="font-medium">Units:</span> {units}</p>
                  <p><span className="font-medium">Priority:</span> {isEmergency ? 'EMERGENCY' : urgency}</p>
                  <p><span className="font-medium">Delivery to:</span> {recipientLocation}</p>
                  
                  <div className="border-t pt-4 mt-4">
                    <h3 className="text-lg font-medium mb-3">Nearby Donors</h3>
                    <NearbyDonors 
                      userLocation={location} 
                      bloodType={selectedType}
                      urgency={urgency} 
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="outline"
                      onClick={() => setSubmitted(false)}
                    >
                      Make Another Request
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Tabs defaultValue="donors" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="request">Request Details</TabsTrigger>
                <TabsTrigger value="donors">Nearby Donors</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              <TabsContent value="request" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Request Submitted Successfully</CardTitle>
                    <CardDescription>
                      Your blood request has been received and is being processed.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p><span className="font-medium">Blood Type:</span> {selectedType}</p>
                      <p><span className="font-medium">Units:</span> {units}</p>
                      <p><span className="font-medium">Priority:</span> {isEmergency ? 'EMERGENCY' : urgency}</p>
                      <p><span className="font-medium">Location:</span> {recipientLocation}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="donors" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Nearby Donors</CardTitle>
                    <CardDescription>
                      These donors match your blood type requirements and are in your area.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <NearbyDonors 
                      userLocation={location} 
                      bloodType={selectedType}
                      urgency={urgency} 
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="location" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Location</CardTitle>
                    <CardDescription>
                      This is where potential donors will be directed.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LocationMap location={location} className="h-64" />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6">
              <Button 
                variant="outline"
                onClick={() => setSubmitted(false)}
              >
                Make Another Request
              </Button>
            </div>
          </motion.div>
        ) : (
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
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="form">Request Form</TabsTrigger>
                  <TabsTrigger value="donors">Nearby Donors</TabsTrigger>
                  <TabsTrigger value="location">Your Location</TabsTrigger>
                </TabsList>
                
                <TabsContent value="form" className="mt-4">
                  <motion.form 
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
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
                    
                    {locationError && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-yellow-800">
                            {locationError}
                          </p>
                          <p className="text-xs text-yellow-700 mt-1">
                            You can still submit the request, but nearby donors functionality will be limited.
                          </p>
                        </div>
                      </div>
                    )}
                    
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
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        className={`w-full text-lg py-6 ${isEmergency ? 'bg-red-600 hover:bg-red-700' : ''}`}
                      >
                        {isEmergency ? 'Submit EMERGENCY Request' : 'Submit Blood Request'}
                      </Button>
                    </motion.div>
                  </motion.form>
                </TabsContent>
                
                <TabsContent value="donors" className="mt-4">
                  <div className="p-1">
                    {(!selectedType || !location) ? (
                      <div className="p-6 bg-gray-50 rounded-lg text-center">
                        <p className="text-lg mb-3">
                          {!selectedType ? 
                            'Please select a blood type in the form tab first' : 
                            'Location access is needed to find nearby donors'}
                        </p>
                        <Button onClick={() => setActiveTab('form')}>Go to Form</Button>
                      </div>
                    ) : (
                      <NearbyDonors 
                        userLocation={location} 
                        bloodType={selectedType}
                        urgency={urgency} 
                      />
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="location" className="mt-4">
                  <div className="p-1">
                    <LocationMap location={location} className="h-64 mb-4" />
                    
                    <div className="mt-4">
                      {locationLoading ? (
                        <p className="text-center text-muted-foreground">
                          Accessing your location...
                        </p>
                      ) : locationError ? (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                          <p className="text-sm text-yellow-800">{locationError}</p>
                          <p className="text-xs text-yellow-700 mt-2">
                            Please enable location access in your browser settings to improve donor matching.
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                            onClick={() => window.location.reload()}
                          >
                            Try again
                          </Button>
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground">
                          Your location is being used to find nearby compatible donors.
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
        
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
