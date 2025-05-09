
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
    details: "Our blood donation service connects donors with nearby collection centers. By registering, you can track your donation history, receive notifications about urgent blood needs that match your type, and schedule regular donations. Our system will remind you when you're eligible to donate again and provide health tips to maintain optimal donation condition.",
    extendedDetails: [
      {
        title: "The Donation Process",
        content: "Before donating, you'll go through a quick health check to ensure you're eligible. The actual donation takes only 8-10 minutes, though the entire process including registration and refreshments takes about an hour. Your body replaces the fluid within 24 hours and red blood cells within a few weeks."
      },
      {
        title: "Who Can Donate",
        content: "Most healthy individuals aged 18-65 weighing at least 110 pounds can donate. Some medical conditions or medications may affect eligibility. Our app will walk you through a pre-screening questionnaire to determine your eligibility before scheduling an appointment."
      },
      {
        title: "Benefits of Regular Donation",
        content: "Regular blood donation can reduce the risk of heart disease, help in weight management, and provide a free health check-up. Most importantly, each donation can save up to three lives in medical emergencies, surgeries, and treatments for chronic illnesses."
      }
    ]
  },
  {
    icon: <Truck className="h-10 w-10 text-primary" />,
    title: 'Urgent Delivery',
    description: 'Request emergency blood delivery to homes or hospitals.',
    link: '/request?emergency=true',
    details: "Our urgent delivery service ensures critical blood supplies reach patients within minutes. We operate a fleet of dedicated vehicles equipped with proper storage facilities. Our drivers are trained in medical transport protocols and take the fastest routes. The service operates 24/7 and can deliver directly to hospitals or patient homes as needed.",
    extendedDetails: [
      {
        title: "Response Time Guarantee",
        content: "We guarantee a response time of under 15 minutes for critical emergencies within city limits. Our tracking system assigns the closest available delivery vehicle to minimize transit time, and all deliveries are equipped with GPS tracking for real-time monitoring."
      },
      {
        title: "Specialized Transport Equipment",
        content: "Our vehicles are equipped with temperature-controlled storage units that maintain blood at optimal conditions throughout transit. We use specialized containers that protect against contamination and monitor temperature constantly to ensure integrity."
      },
      {
        title: "Coordination with Medical Teams",
        content: "Our delivery personnel coordinate directly with hospital staff or home healthcare providers to ensure a seamless handoff process. We maintain direct communication lines with emergency rooms and can provide advance notification of delivery details."
      }
    ]
  },
  {
    icon: <Search className="h-10 w-10 text-primary" />,
    title: 'Blood Testing',
    description: 'Access free blood checking services at events or at home.',
    link: '/blood-check',
    details: "Our blood testing services provide comprehensive blood type identification, pathogen screening, and health monitoring. We offer both in-home testing kits and scheduled mobile clinics in community centers. Results are processed in certified labs and delivered securely through our platform, with medical professionals available to discuss any concerns.",
    extendedDetails: [
      {
        title: "Comprehensive Blood Analysis",
        content: "Our standard blood tests include blood type and Rh factor determination, complete blood count (CBC), and basic metabolic panel. For registered donors, we also conduct tests for infectious diseases including HIV, Hepatitis B and C, and syphilis, all in strict confidentiality."
      },
      {
        title: "Mobile Clinics Schedule",
        content: "We operate mobile blood testing clinics that visit different neighborhoods weekly. Check our app's calendar feature to find when a mobile clinic will be in your area. These clinics provide free testing services and basic health consultations."
      },
      {
        title: "Home Testing Process",
        content: "Our home testing kit includes simple finger-prick collection tools with clear instructions. Once your sample is collected, it's picked up by our courier service and delivered to our lab. Results are typically available within 48 hours and can be accessed securely through our app."
      }
    ]
  },
  {
    icon: <User className="h-10 w-10 text-primary" />,
    title: 'Blood Type Profile',
    description: 'Store and manage your blood type information securely.',
    link: '/profile',
    details: "Your secure blood type profile lets you store critical health information that can be accessed quickly during emergencies. You control who can view your information, and our system can generate QR codes for first responders. The profile includes blood type, allergies, medical conditions, and emergency contacts - all encrypted and protected.",
    extendedDetails: [
      {
        title: "Medical ID Card",
        content: "Our app generates a digital medical ID card containing your blood type, allergies, and critical medical information. This can be shown to healthcare providers during emergencies even without internet access. You can also order a physical card for your wallet."
      },
      {
        title: "Data Security Measures",
        content: "Your profile information is protected with military-grade encryption. We implement strict access controls, and you can set permissions to determine exactly which information is visible to emergency responders, healthcare providers, or blood donation centers."
      },
      {
        title: "International Compatibility",
        content: "Your blood type profile can be translated into multiple languages automatically when traveling abroad. Our system uses internationally recognized medical terminology and can interface with major hospital systems worldwide during emergencies."
      }
    ]
  },
  {
    icon: <Accessibility className="h-10 w-10 text-primary" />,
    title: 'Accessibility',
    description: 'Interface designed for elderly and disabled users.',
    link: '/',
    details: "Our platform is built with accessibility at its core. Features include high contrast modes, text-to-speech compatibility, keyboard navigation, and simplified interfaces for elderly users. We regularly conduct usability testing with diverse user groups to ensure everyone can use our services with ease, regardless of ability or technical comfort.",
    extendedDetails: [
      {
        title: "Voice-Guided Navigation",
        content: "For visually impaired users, our app includes comprehensive voice-guided navigation that works with screen readers. All important functions can be activated through voice commands, making emergency requests possible without needing to see the screen."
      },
      {
        title: "Simplified Interface Options",
        content: "Users can switch to our simplified interface mode which features larger buttons, clearer text, and step-by-step guidance through complex processes. This mode is especially helpful for elderly users or those with cognitive disabilities."
      },
      {
        title: "Physical Accessibility Support",
        content: "Our donor centers and mobile clinics are equipped for full physical accessibility. The app includes information about accessibility features at each location, including wheelchair access, assistive listening systems, and availability of sign language interpreters."
      }
    ]
  },
  {
    icon: <AlertTriangle className="h-10 w-10 text-primary" />,
    title: 'Issue Reporting',
    description: 'Report problems with blood delivery or quality concerns.',
    link: '/report',
    details: "Our issue reporting system ensures that any problems with blood delivery, quality, or service are addressed immediately. Reports are sent directly to our quality control team, who initiate investigation within 30 minutes. We maintain full transparency throughout the resolution process and use feedback to continuously improve our services.",
    extendedDetails: [
      {
        title: "Quality Incident Response",
        content: "All quality concerns are treated with the highest priority. Our quality control team includes licensed medical professionals who can evaluate technical issues. For critical reports, we immediately quarantine related blood products while investigation is underway to prevent potential harm."
      },
      {
        title: "Service Improvement Process",
        content: "Every report is analyzed as part of our continuous improvement process. Monthly review meetings examine trends in reported issues to identify systematic improvements. We implement procedural changes based on this feedback and publish transparency reports on resolution rates."
      },
      {
        title: "Whistleblower Protection",
        content: "We provide anonymous reporting options for healthcare workers who observe issues with blood products or delivery services. These reports are handled with strict confidentiality, and we have explicit policies prohibiting retaliation against those reporting legitimate concerns."
      }
    ]
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10">
                {feature.icon}
              </div>
              <DialogTitle className="text-2xl">{feature.title}</DialogTitle>
            </div>
            <DialogDescription className="text-base">
              {feature.details}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-6">
            {feature.extendedDetails?.map((detail, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-xl font-medium text-foreground">{detail.title}</h3>
                <p className="text-muted-foreground">{detail.content}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end mt-4">
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
