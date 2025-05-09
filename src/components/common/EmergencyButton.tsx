
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, PhoneCall, MapPin, X, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NearbyDonors from './NearbyDonors';
import useLocation from '@/hooks/useLocation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EmergencyButton: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showDonors, setShowDonors] = useState(false);
  const [showHospitals, setShowHospitals] = useState(false);
  const navigate = useNavigate();
  const { loading: locationLoading, error: locationError, location } = useLocation();

  const handleEmergencyCall = () => {
    // In a real implementation, this would initiate an emergency call
    console.log("Emergency call initiated");
    // Show nearby donors section
    setShowDonors(true);
  };

  const handleHomeRedirect = () => {
    navigate("/");
    setIsDialogOpen(false);
    setShowDonors(false);
    setShowHospitals(false);
  };

  const handleFindDonors = () => {
    setShowHospitals(false);
    setShowDonors(true);
  };

  const nearbyHospitals = [
    { id: 1, name: "City General Hospital", distance: "1.5 km", phone: "+1 (555) 234-5678", address: "123 Main Street" },
    { id: 2, name: "Memorial Medical Center", distance: "2.7 km", phone: "+1 (555) 876-5432", address: "456 Oak Avenue" },
    { id: 3, name: "Community Health Center", distance: "3.2 km", phone: "+1 (555) 987-6543", address: "789 Pine Boulevard" },
  ];

  const renderInitialOptions = () => (
    <div className="grid grid-cols-1 gap-4 my-4">
      <Button 
        onClick={handleEmergencyCall} 
        className="bg-red-600 hover:bg-red-700 py-6 flex items-center gap-3"
      >
        <PhoneCall className="h-5 w-5" />
        <span className="text-lg">Request Emergency Blood</span>
      </Button>
      
      <Button 
        variant="outline" 
        className="border-red-200 hover:bg-red-50 text-red-700 py-6 w-full flex items-center gap-3"
        onClick={handleFindDonors}
      >
        <MapPin className="h-5 w-5" />
        <span className="text-lg">Find Emergency Donors</span>
      </Button>
      
      <Button 
        variant="outline" 
        className="py-6 flex items-center gap-3"
        onClick={handleHomeRedirect}
      >
        <Home className="h-5 w-5" />
        <span className="text-lg">Back to Home</span>
      </Button>
    </div>
  );

  const renderNearbyDonors = () => (
    <div className="my-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Nearby Donors</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={() => setShowDonors(false)}
        >
          <X className="h-4 w-4" />
          Back
        </Button>
      </div>
      <NearbyDonors 
        userLocation={location} 
        bloodType="All" 
        urgency="critical"
      />
    </div>
  );

  const renderNearbyHospitals = () => (
    <div className="my-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Nearby Hospitals</h3>
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center gap-1"
          onClick={() => setShowHospitals(false)}
        >
          <X className="h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="space-y-3">
        {nearbyHospitals.map(hospital => (
          <Card key={hospital.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-lg">{hospital.name}</h4>
                  <p className="text-sm text-muted-foreground">{hospital.address}</p>
                  <p className="text-sm">{hospital.distance} away</p>
                </div>
                <a href={`tel:${hospital.phone}`} className="flex items-center gap-1 text-primary hover:underline">
                  <PhoneCall className="h-4 w-4" />
                  {hospital.phone}
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 15 }}
      >
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="h-16 w-16 rounded-full bg-red-600 hover:bg-red-700 shadow-lg flex items-center justify-center"
        >
          <AlertTriangle className="h-8 w-8 text-white" />
        </Button>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) {
          setShowDonors(false);
          setShowHospitals(false);
        }
      }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Emergency Assistance
            </DialogTitle>
            <DialogDescription>
              {!showDonors && !showHospitals ? 
                'Please select an option below for immediate help' : 
                'Contact a nearby donor or hospital for emergency assistance'}
            </DialogDescription>
          </DialogHeader>

          {!showDonors && !showHospitals && renderInitialOptions()}
          {showDonors && renderNearbyDonors()}
          {showHospitals && renderNearbyHospitals()}
          
          <p className="text-sm text-muted-foreground">
            For life-threatening emergencies, always call your local emergency number (911, 112, 999) first before using this app.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmergencyButton;
