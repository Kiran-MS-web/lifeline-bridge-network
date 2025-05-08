
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Droplets } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="min-h-[90vh] flex items-center justify-center relative py-24 px-4">
      {/* Glass effect card for content */}
      <motion.div 
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-12 w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="flex items-center justify-center mb-6"
            variants={itemVariants}
          >
            <Droplets size={60} className="text-primary" />
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center max-w-3xl"
            variants={itemVariants}
          >
            Bridging Lives Through <span className="text-primary">Blood Donation</span>
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-lg md:text-xl text-center max-w-2xl text-muted-foreground"
            variants={itemVariants}
          >
            Connect with donors, request blood deliveries, and access free blood testing services - all designed to be accessible for elderly and disabled users.
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-md"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Button asChild size="lg" className="w-full text-lg py-6">
                <Link to="/donate">
                  Donate Blood
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Button asChild variant="outline" size="lg" className="w-full text-lg py-6">
                <Link to="/request">
                  Request Blood
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-8"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/blood-check" className="text-primary underline underline-offset-4 text-lg hover:text-primary/80">
              Register for free blood checking
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Animated blood drops in background */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:block"
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            width: `${Math.random() * 30 + 10}px`,
            height: `${Math.random() * 40 + 15}px`,
            background: `rgba(220, 38, 38, ${Math.random() * 0.5 + 0.1})`,
            borderRadius: '50% 50% 50% 0',
            transform: 'rotate(45deg)',
            zIndex: 1
          }}
          animate={{
            y: [0, 30, 0],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.8
          }}
        />
      ))}
    </section>
  );
};

export default Hero;
