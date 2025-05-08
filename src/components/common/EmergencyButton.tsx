
import React, { useState } from 'react';
import { AlertTriangle, Phone, Hospital, MapPin, X, Home } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const EmergencyButton: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);

  const emergencyContacts = [
    {
      type: 'Hospital',
      name: 'City General Hospital',
      phone: '+1 (555) 123-4567',
      address: '123 Medical Center Blvd, Downtown',
      icon: Hospital
    },
    {
      type: 'Blood Bank',
      name: 'Regional Blood Center',
      phone: '+1 (555) 987-6543',
      address: '456 Lifesaver Ave, Midtown',
      icon: AlertTriangle
    },
    {
      type: 'Mobile Blood Unit',
      name: '24/7 Emergency Blood Service',
      phone: '+1 (555) 789-0123',
      address: 'Mobile unit - will come to your location',
      icon: MapPin
    }
  ];

  return (
    <>
      <Button 
        onClick={() => setShowDialog(true)}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center gap-2 z-50"
      >
        <AlertTriangle size={20} />
        <span>Emergency</span>
      </Button>

      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white border-red-500 border-2">
            <CardHeader className="bg-red-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-red-600 flex items-center gap-2">
                  <AlertTriangle />
                  Emergency Blood Contacts
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowDialog(false)}
                >
                  <X />
                </Button>
              </div>
              <CardDescription>
                Call these numbers immediately for emergency blood requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
                    <div className="text-red-500 mt-1">
                      <contact.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{contact.name}</h3>
                      <p className="text-sm text-gray-500">{contact.type} • {contact.address}</p>
                      <a 
                        href={`tel:${contact.phone.replace(/\D/g,'')}`} 
                        className="flex items-center gap-1 text-primary mt-1 font-medium"
                      >
                        <Phone size={16} />
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-4">
              <p className="text-sm text-gray-500">These emergency contacts are available 24/7</p>
              <div className="flex gap-3 w-full">
                <Link to="/" className="flex-1">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => setShowDialog(false)}
                  >
                    <Home size={16} />
                    Back to Home
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="flex-1"
                  onClick={() => setShowDialog(false)}
                >
                  Close
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default EmergencyButton;
