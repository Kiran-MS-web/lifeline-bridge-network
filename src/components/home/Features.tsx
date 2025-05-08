
import React from 'react';
import { Droplets, Truck, Search, AlertTriangle, Hospital, User, Accessibility } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section className="py-16 md:py-24 bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="section-title font-heading"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="p-6 rounded-2xl border bg-card shadow-sm hover:shadow-lg transition-shadow hover-lift"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
              }}
            >
              <motion.div 
                className="mb-4 flex justify-center items-center h-16 w-16 rounded-full bg-primary/10 mx-auto"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-center font-heading">{feature.title}</h3>
              <p className="text-muted-foreground text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
