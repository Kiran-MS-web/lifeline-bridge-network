
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation } from '@/hooks/useLocation';
import LocationMap from '@/components/common/LocationMap';
import { Checkbox } from '@/components/ui/checkbox';

const BloodCheck: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [checkType, setCheckType] = useState('home');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  
  // Get user's location using the useLocation hook
  const { loading: locationLoading, error: locationError, location } = useLocation();
  
  // Handle automatic address update when using current location
  useEffect(() => {
    if (useCurrentLocation && location) {
      // In a real app, we would use reverse geocoding to get an address
      // For now, just use the coordinates as the address
      setAddress(`${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`);
    }
  }, [useCurrentLocation, location]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !address || !date || !timeSlot) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Here we would normally submit the form to an API
    console.log({
      name,
      phone,
      address,
      checkType,
      location: useCurrentLocation ? location : null,
      date: date ? format(date, 'yyyy-MM-dd') : '',
      timeSlot
    });
    
    toast.success('Blood check registration submitted successfully!');
  };
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Free Blood Checking</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Register for our free blood type and basic health checking service. We offer both home visits and event-based testing.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Register for Blood Check</CardTitle>
                <CardDescription>
                  Complete this form to schedule your free blood checking appointment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-lg">Full Name *</Label>
                    <Input 
                      id="name" 
                      placeholder="Your full name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="text-base p-6"
                      required
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-lg">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      placeholder="Your phone number" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="text-base p-6"
                      required
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="check-type" className="text-lg">Check Type *</Label>
                    <RadioGroup 
                      value={checkType}
                      onValueChange={setCheckType}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2 border rounded-md p-4">
                        <RadioGroupItem value="home" id="home" />
                        <Label htmlFor="home" className="cursor-pointer">Home Visit</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-4">
                        <RadioGroupItem value="event" id="event" />
                        <Label htmlFor="event" className="cursor-pointer">Blood Drive Event</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {checkType === 'home' && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="use-location" 
                          checked={useCurrentLocation}
                          onCheckedChange={(checked) => setUseCurrentLocation(checked as boolean)}
                        />
                        <Label htmlFor="use-location" className="cursor-pointer">
                          Use my current location
                        </Label>
                      </div>
                      
                      {useCurrentLocation ? (
                        <div className="space-y-3">
                          {locationLoading && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Detecting your location...</span>
                            </div>
                          )}
                          
                          {locationError && (
                            <div className="text-sm text-destructive">
                              <p>Error: {locationError}</p>
                              <p className="mt-1">Please enter your address manually or try again.</p>
                            </div>
                          )}
                          
                          {location && (
                            <LocationMap 
                              location={location} 
                              className="h-48 w-full mt-2"
                              title="Home Location" 
                              subtitle="Our medical staff will visit this location"
                            />
                          )}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Label htmlFor="address" className="text-lg">Address *</Label>
                          <Input 
                            id="address" 
                            placeholder="Your home address or preferred location" 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="text-base p-6"
                            required
                          />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {checkType === 'event' && (
                    <div className="space-y-3">
                      <Label htmlFor="address" className="text-lg">Preferred Event Location *</Label>
                      <Input 
                        id="address" 
                        placeholder="Select or enter the event location" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="text-base p-6"
                        required
                      />
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-lg">Preferred Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full text-left justify-start text-base p-6",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                            disabled={(date) => 
                              date < new Date() || 
                              date > new Date(new Date().setMonth(new Date().getMonth() + 3))
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="time-slot" className="text-lg">Preferred Time *</Label>
                      <Select 
                        value={timeSlot} 
                        onValueChange={setTimeSlot}
                      >
                        <SelectTrigger id="time-slot" className="text-base p-6">
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12:00 PM - 3:00 PM)</SelectItem>
                          <SelectItem value="evening">Evening (3:00 PM - 6:00 PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button type="submit" className="text-lg py-6 px-8">Register for Blood Check</Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>About Free Blood Checking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">What's included?</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Blood type determination (ABO and Rh)</li>
                      <li>Basic blood pressure check</li>
                      <li>Hemoglobin level</li>
                      <li>Health consultation</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Home Visit Details</h3>
                    <p className="text-muted-foreground">
                      Our trained phlebotomist will visit your home at the scheduled time. The process takes approximately 15-20 minutes.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Blood Drive Events</h3>
                    <p className="text-muted-foreground mb-2">
                      Upcoming blood drive events where you can get your blood checked:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>City Hospital - May 15, 2024</li>
                      <li>Community Center - May 20, 2024</li>
                      <li>Central Mall - May 25, 2024</li>
                    </ul>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium mb-2">Why Know Your Blood Type?</h3>
                    <p className="text-muted-foreground">
                      Knowing your blood type is crucial for emergencies and can help you understand your eligibility for donation and potential health insights.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BloodCheck;
