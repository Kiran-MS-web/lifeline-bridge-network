
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Drop, User, Bell, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard: React.FC = () => {
  // Mock data
  const donationHistory = [
    { id: 1, date: '2024-05-01', location: 'City Hospital', bloodType: 'A+', status: 'Complete' },
    { id: 2, date: '2024-03-15', location: 'Blood Drive Event', bloodType: 'A+', status: 'Complete' },
    { id: 3, date: '2024-01-10', location: 'Community Center', bloodType: 'A+', status: 'Complete' },
  ];
  
  const pendingRequests = [
    { 
      id: 1, 
      requestDate: '2024-05-05', 
      urgency: 'Normal', 
      bloodType: 'AB-', 
      status: 'Searching Donors',
      delivery: true
    }
  ];
  
  const upcomingAppointments = [
    {
      id: 1,
      type: 'Blood Check',
      date: '2024-05-20',
      time: '10:00 AM',
      location: 'City Hospital'
    }
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
          <Badge variant="outline" className="flex items-center gap-1 text-sm py-2 px-3">
            <Drop className="h-4 w-4" />
            Blood Type: A+
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                <div className="flex items-center gap-2">
                  <Drop className="h-5 w-5 text-primary" />
                  Donation Status
                </div>
              </CardTitle>
              <CardDescription>You can donate again in 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={67} className="h-2" />
                <p className="text-sm text-muted-foreground">Last donation: May 1, 2024</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  My Profile
                </div>
              </CardTitle>
              <CardDescription>Personal and health information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <p>John Doe</p>
                <p>Blood Type: A+</p>
                <p className="text-muted-foreground">Profile 80% complete</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notifications
                </div>
              </CardTitle>
              <CardDescription>You have 2 new notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-2">
                <p>Blood Drive near your location (2 miles)</p>
                <p className="text-muted-foreground">New message from LifeLine support</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="history" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="history">Donation History</TabsTrigger>
            <TabsTrigger value="requests">Blood Requests</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Donation History</CardTitle>
                <CardDescription>Your previous blood donations</CardDescription>
              </CardHeader>
              <CardContent>
                {donationHistory.length > 0 ? (
                  <div className="space-y-4">
                    {donationHistory.map(donation => (
                      <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{donation.date}</p>
                          <p className="text-sm text-muted-foreground">{donation.location}</p>
                        </div>
                        <div>
                          <Badge variant="outline" className="text-primary">{donation.bloodType}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">No donation history available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="requests" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Blood Requests</CardTitle>
                <CardDescription>Current and past blood requests</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingRequests.length > 0 ? (
                  <div className="space-y-4">
                    {pendingRequests.map(request => (
                      <div key={request.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">Request #{request.id}</p>
                          <Badge variant="secondary">{request.status}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <p className="text-muted-foreground">Date:</p>
                          <p>{request.requestDate}</p>
                          <p className="text-muted-foreground">Urgency:</p>
                          <p>{request.urgency}</p>
                          <p className="text-muted-foreground">Blood Type:</p>
                          <p>{request.bloodType}</p>
                          <p className="text-muted-foreground">Delivery:</p>
                          <p>{request.delivery ? 'Yes' : 'No'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">No blood requests available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appointments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Blood donations and checking appointments</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map(appointment => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{appointment.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {appointment.date} • {appointment.time}
                          </p>
                          <p className="text-sm text-muted-foreground">{appointment.location}</p>
                        </div>
                        <button className="text-sm text-primary hover:underline">
                          Reschedule
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">No upcoming appointments</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              Blood Delivery Status
            </CardTitle>
            <CardDescription>Track blood delivery in real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-8 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">No active deliveries at the moment</p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
