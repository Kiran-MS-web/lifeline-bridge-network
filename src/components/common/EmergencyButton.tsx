
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

const EmergencyButton: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleEmergencyCall = () => {
    // In a real implementation, this would initiate an emergency call
    console.log("Emergency call initiated");
    // For now, just redirect to the emergency request form
    navigate("/request?emergency=true");
    setIsDialogOpen(false);
  };

  const handleHomeRedirect = () => {
    navigate("/");
    setIsDialogOpen(false);
  };

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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Emergency Assistance
            </DialogTitle>
            <DialogDescription>
              Please select an option below for immediate help
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4 my-4">
            <Button 
              onClick={handleEmergencyCall} 
              className="bg-red-600 hover:bg-red-700 py-6 flex items-center gap-3"
            >
              <PhoneCall className="h-5 w-5" />
              <span className="text-lg">Request Emergency Blood</span>
            </Button>
            
            <Link to="/request?emergency=true" className="w-full">
              <Button 
                variant="outline" 
                className="border-red-200 hover:bg-red-50 text-red-700 py-6 w-full flex items-center gap-3"
                onClick={() => setIsDialogOpen(false)}
              >
                <MapPin className="h-5 w-5" />
                <span className="text-lg">Find Emergency Donors</span>
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              className="py-6 flex items-center gap-3"
              onClick={handleHomeRedirect}
            >
              <Home className="h-5 w-5" />
              <span className="text-lg">Back to Home</span>
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            For life-threatening emergencies, always call your local emergency number (911, 112, 999) first before using this app.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmergencyButton;
