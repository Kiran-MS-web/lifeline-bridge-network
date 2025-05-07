
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Drop } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex items-center justify-center mb-6">
          <Drop size={60} className="text-primary" />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center max-w-3xl">
          Bridging Lives Through <span className="text-primary">Blood Donation</span>
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-center max-w-2xl text-muted-foreground">
          Connect with donors, request blood deliveries, and access free blood testing services - all designed to be accessible for elderly and disabled users.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button asChild size="lg" className="flex-1 text-lg py-6">
            <Link to="/donate">
              Donate Blood
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="flex-1 text-lg py-6">
            <Link to="/request">
              Request Blood
            </Link>
          </Button>
        </div>
        
        <div className="mt-8">
          <Link to="/blood-check" className="text-primary underline underline-offset-4 text-lg hover:text-primary/80">
            Register for free blood checking
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
