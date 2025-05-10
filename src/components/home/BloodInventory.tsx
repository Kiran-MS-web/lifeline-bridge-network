
import React from 'react';
import { motion } from 'framer-motion';
import { Droplets } from 'lucide-react';

// Blood types with their estimated availability count
const bloodTypes = [
  { type: 'A+', count: 284, color: 'bg-red-500' },
  { type: 'A-', count: 156, color: 'bg-red-600' },
  { type: 'B+', count: 208, color: 'bg-red-500' },
  { type: 'B-', count: 93, color: 'bg-red-600' },
  { type: 'AB+', count: 78, color: 'bg-red-500' },
  { type: 'AB-', count: 45, color: 'bg-red-600' },
  { type: 'O+', count: 352, color: 'bg-red-500' },
  { type: 'O-', count: 147, color: 'bg-red-600' }
];

const BloodInventory: React.FC = () => {
  const totalUnits = bloodTypes.reduce((total, blood) => total + blood.count, 0);
  
  return (
    <section className="py-16 md:py-24 bg-gray-50/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title font-heading">Blood Inventory</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Currently we have <span className="font-bold text-primary">{totalUnits}</span> units of blood available across different blood types.
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {bloodTypes.map((blood, index) => (
              <motion.div
                key={blood.type}
                className="bg-white shadow-md rounded-lg p-4 relative overflow-hidden flex flex-col items-center justify-center"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)" }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-10">
                  <Droplets size={96} className="text-primary" />
                </div>
                
                <div className="mb-3 text-3xl font-bold font-heading text-foreground">
                  {blood.type}
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className={`${blood.color} h-3 rounded-full`} 
                    style={{ width: `${Math.min(100, (blood.count / 400) * 100)}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm text-muted-foreground">Units:</span>
                  <span className="text-xl font-semibold text-foreground">
                    {blood.count}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-muted-foreground">
              Blood units are constantly being used in emergencies and surgeries. 
              <br className="hidden md:block" />
              Your donation can help us maintain our inventory and save lives.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BloodInventory;
