
import React from 'react';
import { Droplets, Truck, Search, AlertTriangle, Hospital, User, Accessibility } from 'lucide-react';

const features = [
  {
    icon: <Droplets className="h-10 w-10 text-primary" />,
    title: 'Blood Donation',
    description: 'Register as a donor and help save lives in your community.'
  },
  {
    icon: <Truck className="h-10 w-10 text-primary" />,
    title: 'Urgent Delivery',
    description: 'Request emergency blood delivery to homes or hospitals.'
  },
  {
    icon: <Search className="h-10 w-10 text-primary" />,
    title: 'Blood Testing',
    description: 'Access free blood checking services at events or at home.'
  },
  {
    icon: <User className="h-10 w-10 text-primary" />,
    title: 'Blood Type Profile',
    description: 'Store and manage your blood type information securely.'
  },
  {
    icon: <Accessibility className="h-10 w-10 text-primary" />,
    title: 'Accessibility',
    description: 'Interface designed for elderly and disabled users.'
  },
  {
    icon: <AlertTriangle className="h-10 w-10 text-primary" />,
    title: 'Issue Reporting',
    description: 'Report problems with blood delivery or quality concerns.'
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Our Services</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl border bg-card shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
