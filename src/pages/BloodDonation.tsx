import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BloodTypeSelector from '@/components/common/BloodTypeSelector';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

const BloodDonation: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodType, setBloodType] = useState<BloodType | null>(null);
  const [donationLocation, setDonationLocation] = useState('center');
  const [preferredCenter, setPreferredCenter] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState('');
  const [isAvailableForEmergency, setIsAvailableForEmergency] = useState(false);
  const [lastDonationDate, setLastDonationDate] = useState<Date | undefined>(undefined);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !bloodType || !date || !timeSlot) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (donationLocation === 'center' && !preferredCenter) {
      toast.error('Please select a donation center');
      return;
    }
    
    if (donationLocation === 'home' && !homeAddress) {
      toast.error('Please provide your home address');
      return;
    }
    
    // Here we would normally submit the form to an API
    console.log({
      name,
      phone,
      bloodType,
      donationLocation,
      preferredCenter: donationLocation === 'center' ? preferredCenter : null,
      homeAddress: donationLocation === 'home' ? homeAddress : null,
      date: date ? format(date, 'yyyy-MM-dd') : '',
      timeSlot,
      isAvailableForEmergency,
      lastDonationDate: lastDonationDate ? format(lastDonationDate, 'yyyy-MM-dd') : 'First time donor'
    });
    
    toast.success('Blood donation scheduled successfully!');
  };
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Donate Blood</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Schedule a blood donation appointment at a center or request a home collection. Your donation can save up to three lives.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="donate" className="mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="donate" className="text-lg py-3">Schedule Donation</TabsTrigger>
                <TabsTrigger value="info" className="text-lg py-3">Eligibility Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="donate">
                <Card>
                  <CardHeader>
                    <CardTitle>Schedule a Blood Donation</CardTitle>
                    <CardDescription>
                      Fill out this form to schedule your next blood donation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="bloodType" className="text-lg">Your Blood Type *</Label>
                        <BloodTypeSelector
                          selectedType={bloodType}
                          onSelect={setBloodType}
                        />
                        <p className="text-sm text-muted-foreground">
                          Don't know your blood type? You can select "Unknown" and we'll determine it during donation.
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="text-lg">Donation Location *</Label>
                        <RadioGroup 
                          value={donationLocation}
                          onValueChange={setDonationLocation}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          <div className="flex items-center space-x-2 border rounded-md p-4">
                            <RadioGroupItem value="center" id="center" />
                            <Label htmlFor="center" className="cursor-pointer">Donation Center</Label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded-md p-4">
                            <RadioGroupItem value="home" id="home" />
                            <Label htmlFor="home" className="cursor-pointer">Home Collection</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {donationLocation === 'center' && (
                        <div className="space-y-3">
                          <Label htmlFor="center" className="text-lg">Preferred Donation Center *</Label>
                          <Select 
                            value={preferredCenter} 
                            onValueChange={setPreferredCenter}
                          >
                            <SelectTrigger id="center" className="text-base p-6">
                              <SelectValue placeholder="Select donation center" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="city-hospital">City Hospital Blood Bank</SelectItem>
                              <SelectItem value="medical-center">Medical Center</SelectItem>
                              <SelectItem value="community-clinic">Community Health Clinic</SelectItem>
                              <SelectItem value="mobile-drive">Mobile Blood Drive (City Park)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      
                      {donationLocation === 'home' && (
                        <div className="space-y-3">
                          <Label htmlFor="address" className="text-lg">Home Address *</Label>
                          <Input 
                            id="address" 
                            placeholder="Your complete home address" 
                            value={homeAddress}
                            onChange={(e) => setHomeAddress(e.target.value)}
                            className="text-base p-6"
                          />
                          <p className="text-sm text-muted-foreground">
                            Home collection is available only in selected areas and cities.
                          </p>
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
                                  date > new Date(new Date().setMonth(new Date().getMonth() + 2))
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
                      
                      <div className="space-y-3">
                        <Label className="text-lg">Last Donation Date (if applicable)</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full text-left justify-start text-base p-6",
                                !lastDonationDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {lastDonationDate ? format(lastDonationDate, "PPP") : <span>First time donor</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={lastDonationDate}
                              onSelect={setLastDonationDate}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                              disabled={(date) => 
                                date > new Date()
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="emergency" 
                          checked={isAvailableForEmergency} 
                          onCheckedChange={(checked) => setIsAvailableForEmergency(checked === true)}
                        />
                        <Label 
                          htmlFor="emergency"
                          className="leading-normal"
                        >
                          I am available for emergency donation requests
                        </Label>
                      </div>
                      
                      <Button type="submit" className="text-lg py-6 px-8">Schedule Donation</Button>
                      
                      <p className="text-center text-sm text-muted-foreground mt-4">
                        By scheduling a donation, you agree to our 
                        <a href="#" className="text-primary hover:underline"> Terms of Service</a> and 
                        <a href="#" className="text-primary hover:underline"> Privacy Policy</a>.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="info">
                <Card>
                  <CardHeader>
                    <CardTitle>Blood Donation Eligibility</CardTitle>
                    <CardDescription>
                      Information about eligibility requirements for blood donation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Basic Requirements</h3>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>Age: Most donors must be at least 18 years old</li>
                          <li>Weight: At least 110 pounds (50 kg)</li>
                          <li>Health: General good health and feeling well on donation day</li>
                          <li>Identification: Valid ID with photo</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Donation Frequency</h3>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>Whole Blood: Every 56 days (8 weeks)</li>
                          <li>Power Red: Every 112 days (16 weeks)</li>
                          <li>Platelets: Every 7 days (up to 24 times per year)</li>
                          <li>Plasma: Every 28 days (up to 13 times per year)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Temporary Deferrals</h3>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>Cold, flu or fever: Until symptoms are gone</li>
                          <li>Pregnancy: 6 weeks after delivery</li>
                          <li>Tattoos: Varies by state/country (typically 3-12 months)</li>
                          <li>Certain medications: Varies by medication</li>
                          <li>Travel to certain countries: Varies by destination</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Permanent Deferrals</h3>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>HIV or risk for HIV</li>
                          <li>Certain chronic illnesses</li>
                          <li>History of Hepatitis B or C</li>
                          <li>Spent time in certain countries during specified periods</li>
                          <li>Use of certain medications</li>
                        </ul>
                      </div>
                      
                      <div className="bg-muted p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2 flex items-center">
                          <Droplets className="h-6 w-6 mr-2 text-primary" />
                          Pre-Donation Tips
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>Get a good night's sleep</li>
                          <li>Eat a healthy meal within 2-3 hours of donation</li>
                          <li>Drink plenty of fluids (water) before donation</li>
                          <li>Avoid fatty foods before donation</li>
                          <li>Wear comfortable clothing with sleeves that can be raised above the elbow</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card className="mb-6 bg-gradient-to-br from-red-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Droplets className="h-6 w-6 mr-2 text-primary" />
                  Blood Donation Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Save Lives</h3>
                    <p className="text-sm text-muted-foreground">
                      Each donation can save up to 3 lives and help countless patients.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Free Health Check</h3>
                    <p className="text-sm text-muted-foreground">
                      Donors receive a mini health check (pulse, blood pressure, hemoglobin, and temperature).
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Know Your Blood Type</h3>
                    <p className="text-sm text-muted-foreground">
                      First-time donors will learn their blood type.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Reduced Heart Disease Risk</h3>
                    <p className="text-sm text-muted-foreground">
                      Regular blood donation is linked to lower blood viscosity, which can reduce heart disease risk.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Burns Calories</h3>
                    <p className="text-sm text-muted-foreground">
                      Donating one pint of blood burns about 650 calories as your body works to replace it.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Blood Type Compatibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Understanding blood type compatibility can help you know who can receive your blood:
                </p>
                
                <div className="space-y-3">
                  <div className="border-b pb-2">
                    <p className="font-medium">Type O-</p>
                    <p className="text-sm">Universal donor. Can donate to all blood types.</p>
                  </div>
                  
                  <div className="border-b pb-2">
                    <p className="font-medium">Type O+</p>
                    <p className="text-sm">Can donate to O+, A+, B+, and AB+.</p>
                  </div>
                  
                  <div className="border-b pb-2">
                    <p className="font-medium">Type A-</p>
                    <p className="text-sm">Can donate to A-, A+, AB-, and AB+.</p>
                  </div>
                  
                  <div className="border-b pb-2">
                    <p className="font-medium">Type A+</p>
                    <p className="text-sm">Can donate to A+ and AB+.</p>
                  </div>
                  
                  <div className="border-b pb-2">
                    <p className="font-medium">Type B-</p>
                    <p className="text-sm">Can donate to B-, B+, AB-, and AB+.</p>
                  </div>
                  
                  <div className="border-b pb-2">
                    <p className="font-medium">Type B+</p>
                    <p className="text-sm">Can donate to B+ and AB+.</p>
                  </div>
                  
                  <div className="border-b pb-2">
                    <p className="font-medium">Type AB-</p>
                    <p className="text-sm">Can donate to AB- and AB+.</p>
                  </div>
                  
                  <div>
                    <p className="font-medium">Type AB+</p>
                    <p className="text-sm">Universal recipient. Can donate only to AB+.</p>
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

export default BloodDonation;
