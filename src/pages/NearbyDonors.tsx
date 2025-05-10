
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PhoneCall, MapPin, Navigation, Droplets } from 'lucide-react';
import { getRequestById, getNearbyDonors } from '@/services/donationService';
import { getProfileById } from '@/services/profileService';
import LocationViewer from '@/components/common/LocationViewer';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const NearbyDonors: React.FC = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [request, setRequest] = useState<any | null>(null);
  const [donors, setDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!user) {
      toast.error('You must be signed in to view nearby donors');
      navigate('/auth');
      return;
    }
    
    const loadData = async () => {
      if (!requestId) return;
      
      setLoading(true);
      try {
        const requestData = await getRequestById(requestId);
        if (requestData) {
          setRequest(requestData);
          
          if (requestData.latitude && requestData.longitude) {
            const nearbyDonorsList = await getNearbyDonors(
              requestData.blood_type,
              requestData.latitude,
              requestData.longitude,
              10 // 10km radius
            );
            setDonors(nearbyDonorsList);
          } else {
            toast.warning('Location data not available for this request');
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [requestId, user, navigate]);
  
  const getBloodTypeCompatibility = (donorType: string, recipientType: string): string => {
    // Simplified compatibility check, in reality would be more complex
    if (donorType === recipientType) return 'Perfect match';
    if (recipientType === 'AB+') return 'Compatible';
    if (recipientType === 'AB-' && ['A-', 'B-', 'O-'].includes(donorType)) return 'Compatible';
    if (recipientType === 'A+' && ['A+', 'A-', 'O+', 'O-'].includes(donorType)) return 'Compatible';
    if (recipientType === 'A-' && ['A-', 'O-'].includes(donorType)) return 'Compatible';
    if (recipientType === 'B+' && ['B+', 'B-', 'O+', 'O-'].includes(donorType)) return 'Compatible';
    if (recipientType === 'B-' && ['B-', 'O-'].includes(donorType)) return 'Compatible';
    if (recipientType === 'O+' && ['O+', 'O-'].includes(donorType)) return 'Compatible';
    if (recipientType === 'O-' && donorType === 'O-') return 'Compatible';
    return 'Not compatible';
  };
  
  const formatDistance = (lat1: number, lon1: number, lat2: number, lon2: number): string => {
    // Simple distance calculation in km (not accurate for large distances)
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m away`;
    }
    return `${distance.toFixed(1)}km away`;
  };
  
  if (loading) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8 min-h-screen">
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">Loading data...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  if (!request) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8 min-h-screen">
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">Request not found</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Nearby Donors</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Blood Request Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Blood Type Needed:</p>
                  <p className="text-xl font-bold flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-red-600" />
                    {request.blood_type}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Urgency:</p>
                  <Badge className={
                    request.urgency === 'critical' ? 'bg-red-500 text-white' :
                    request.urgency === 'high' ? 'bg-orange-500 text-white' :
                    request.urgency === 'normal' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }>
                    {request.urgency}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Units Requested:</p>
                  <p className="text-lg">{request.units_requested}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location:</p>
                  <p className="text-lg">{request.hospital_name}</p>
                </div>
                
                {request.latitude && request.longitude && (
                  <div className="col-span-1 md:col-span-2 mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Request Location:</p>
                    <LocationViewer 
                      latitude={request.latitude} 
                      longitude={request.longitude}
                      name="Blood Request"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-bold mb-4">Available Donors</h2>
          
          {donors.length === 0 ? (
            <Card>
              <CardContent className="py-6">
                <div className="text-center py-8">
                  <p>No compatible donors found nearby</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try increasing the search radius or check back later
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {donors.map((donor) => {
                const compatibility = getBloodTypeCompatibility(donor.blood_type, request.blood_type);
                const distance = donor.last_latitude && donor.last_longitude && request.latitude && request.longitude ?
                  formatDistance(request.latitude, request.longitude, donor.last_latitude, donor.last_longitude) : 
                  'Unknown distance';
                  
                return (
                  <Card key={donor.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold">{donor.full_name || 'Anonymous Donor'}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{distance}</span>
                            </div>
                          </div>
                          <Badge className="bg-red-500 text-white">
                            {donor.blood_type}
                          </Badge>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-sm font-medium">Compatibility:</p>
                          <Badge variant={compatibility === 'Perfect match' ? 'default' : 'outline'} className="mt-1">
                            {compatibility}
                          </Badge>
                        </div>
                        
                        <div className="mt-4 flex gap-2">
                          {donor.phone_number && (
                            <Button size="sm" className="flex items-center gap-1">
                              <PhoneCall className="h-4 w-4" />
                              Call
                            </Button>
                          )}
                          
                          {donor.last_latitude && donor.last_longitude && (
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Navigation className="h-4 w-4" />
                              Get Directions
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {donor.last_latitude && donor.last_longitude && (
                        <div className="h-40 w-full mt-2 border-t">
                          <iframe 
                            title={`Location of ${donor.full_name || 'donor'}`}
                            width="100%" 
                            height="100%" 
                            frameBorder="0" 
                            src={`https://www.google.com/maps/embed/v1/place?key=&q=${donor.last_latitude},${donor.last_longitude}`} 
                            allowFullScreen
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NearbyDonors;
