
import React from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import RequestForm from '@/components/home/RequestForm';
import EmergencyButton from '@/components/common/EmergencyButton';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Index: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="section-title">Request Blood</h2>
            <div className="flex justify-center">
              <RequestForm />
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="section-title">Join Our Life-Saving Network</h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-muted-foreground">
              Whether you're a donor, recipient, or healthcare provider, join our platform to help improve blood donation and management in your community.
            </p>
            <div className="max-w-md mx-auto">
              <a 
                href="/auth" 
                className="block w-full bg-primary text-primary-foreground text-center py-6 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Create Your Account
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <EmergencyButton />
    </>
  );
};

export default Index;
