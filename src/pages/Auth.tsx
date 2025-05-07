
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Auth: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left side - Auth form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-background">
          <div className="w-full max-w-md">
            <div className="mb-6">
              <Button variant="ghost" asChild className="gap-2">
                <Link to="/">
                  <ArrowLeft size={16} />
                  Back to Home
                </Link>
              </Button>
            </div>
            <AuthForm />
          </div>
        </div>
        
        {/* Right side - Hero image / branding */}
        <div className="w-full md:w-1/2 bg-primary/10 flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-8">
            <Droplets size={80} className="text-primary mx-auto" />
          </div>
          <h1 className="text-4xl font-bold mb-4">LifeLine</h1>
          <p className="text-xl text-muted-foreground max-w-md">
            Join our community of blood donors and recipients. Sign in to track your donations, 
            request blood when needed, and help save lives.
          </p>
          
          <div className="mt-12 space-y-4 text-left">
            <div className="flex items-start">
              <div className="bg-primary/20 p-2 rounded-full mr-4">
                <Droplets className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Track Your Donations</h3>
                <p className="text-muted-foreground">Keep a record of all your blood donations and their impact.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/20 p-2 rounded-full mr-4">
                <Droplets className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Request Blood</h3>
                <p className="text-muted-foreground">Make blood requests and track their status in real-time.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/20 p-2 rounded-full mr-4">
                <Droplets className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Get Notified</h3>
                <p className="text-muted-foreground">Receive alerts about donation opportunities and requests.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-muted py-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} LifeLine Blood Donation Service. All rights reserved.
      </footer>
    </div>
  );
};

export default Auth;
