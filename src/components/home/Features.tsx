
import React, { useState } from 'react';
import { Droplets, Truck, Search, AlertTriangle, Hospital, User, Accessibility, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const features = [
  {
    icon: <Droplets className="h-10 w-10 text-primary" />,
    title: 'Blood Donation',
    description: 'Register as a donor and help save lives in your community.',
    link: '/donate',
    details: "Our blood donation service connects donors with nearby collection centers. By registering, you can track your donation history, receive notifications about urgent blood needs that match your type, and schedule regular donations. Our system will remind you when you're eligible to donate again and provide health tips to maintain optimal donation condition."
  },
  {
    icon: <Truck className="h-10 w-10 text-primary" />,
    title: 'Urgent Delivery',
    description: 'Request emergency blood delivery to homes or hospitals.',
    link: '/request?emergency=true',
    details: "Our urgent delivery service ensures critical blood supplies reach patients within minutes. We operate a fleet of dedicated vehicles equipped with proper storage facilities. Our drivers are trained in medical transport protocols and take the fastest routes. The service operates 24/7 and can deliver directly to hospitals or patient homes as needed."
  },
  {
    icon: <Search className="h-10 w-10 text-primary" />,
    title: 'Blood Testing',
    description: 'Access free blood checking services at events or at home.',
    link: '/blood-check',
    details: "Our blood testing services provide comprehensive blood type identification, pathogen screening, and health monitoring. We offer both in-home testing kits and scheduled mobile clinics in community centers. Results are processed in certified labs and delivered securely through our platform, with medical professionals available to discuss any concerns."
  },
  {
    icon: <User className="h-10 w-10 text-primary" />,
    title: 'Blood Type Profile',
    description: 'Store and manage your blood type information securely.',
    link: '/profile',
    details: "Your secure blood type profile lets you store critical health information that can be accessed quickly during emergencies. You control who can view your information, and our system can generate QR codes for first responders. The profile includes blood type, allergies, medical conditions, and emergency contacts - all encrypted and protected."
  },
  {
    icon: <Accessibility className="h-10 w-10 text-primary" />,
    title: 'Accessibility',
    description: 'Interface designed for elderly and disabled users.',
    link: '/',
    details: "Our platform is built with accessibility at its core. Features include high contrast modes, text-to-speech compatibility, keyboard navigation, and simplified interfaces for elderly users. We regularly conduct usability testing with diverse user groups to ensure everyone can use our services with ease, regardless of ability or technical comfort."
  },
  {
    icon: <AlertTriangle className="h-10 w-10 text-primary" />,
    title: 'Issue Reporting',
    description: 'Report problems with blood delivery or quality concerns.',
    link: '/report',
    details: "Our issue reporting system ensures that any problems with blood delivery, quality, or service are addressed immediately. Reports are sent directly to our quality control team, who initiate investigation within 30 minutes. We maintain full transparency throughout the resolution process and use feedback to continuously improve our services."
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <motion.div 
        className="relative p-6 rounded-2xl border bg-card shadow-sm hover:shadow-lg transition-shadow hover-lift overflow-hidden group"
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
        <p className="text-muted-foreground text-center mb-4">{feature.description}</p>
        
        <div className="flex justify-between items-center mt-4 pt-3 border-t">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:text-primary/80 p-0 h-auto"
            onClick={() => setIsDialogOpen(true)}
          >
            Learn more
          </Button>
          <Link to={feature.link}>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform">
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
        
        <motion.div 
          className="absolute inset-0 bg-primary-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10">
                {feature.icon}
              </div>
              <DialogTitle>{feature.title}</DialogTitle>
            </div>
            <DialogDescription>
              {feature.details}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Link to={feature.link}>
              <Button className="flex items-center gap-2">
                Go to {feature.title} <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const Features: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title font-heading">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide comprehensive blood services to connect donors with recipients and ensure timely delivery when it matters most.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link to="/auth">
            <Button className="px-8 py-6 text-lg">
              Join Our Network
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
