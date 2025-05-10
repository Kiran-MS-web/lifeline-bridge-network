
import React, { useEffect, useState } from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import RequestForm from '@/components/home/RequestForm';
import EmergencyButton from '@/components/common/EmergencyButton';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BloodInventory from '@/components/home/BloodInventory';
import { motion, useScroll, useTransform } from 'framer-motion';

const Index: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background image with parallax effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          opacity,
          scale,
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Scroll indicator animation */}
      {showScrollIndicator && (
        <motion.div 
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="flex flex-col items-center text-white">
            <span className="text-sm mb-2">Scroll down</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 13l5 5 5-5"></path>
              <path d="M7 6l5 5 5-5"></path>
            </svg>
          </div>
        </motion.div>
      )}

      <Header />
      
      <main className="flex-grow relative z-10">
        <Hero />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Features />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <BloodInventory />
        </motion.div>
        
        <motion.section 
          className="py-16 md:py-24 bg-gray-50/90 backdrop-blur-sm"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="section-title">Request Blood</h2>
            <div className="flex justify-center">
              <RequestForm />
            </div>
          </div>
        </motion.section>
        
        <motion.section 
          className="py-16 md:py-24 bg-white/95 backdrop-blur-sm"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="section-title">Join Our Life-Saving Network</h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-muted-foreground">
              Whether you're a donor, recipient, or healthcare provider, join our platform to help improve blood donation and management in your community.
            </p>
            <div className="max-w-md mx-auto">
              <motion.a 
                href="/auth" 
                className="block w-full bg-primary text-primary-foreground text-center py-6 rounded-lg text-lg font-medium hover:bg-primary/90 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Your Account
              </motion.a>
            </div>
          </div>
        </motion.section>
      </main>
      
      <Footer />
      <EmergencyButton />
    </div>
  );
};

export default Index;
