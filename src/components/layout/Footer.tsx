
import React from 'react';
import { Droplets, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Droplets size={28} className="text-primary" />
              <span className="text-xl font-bold">LifeFlow</span>
            </div>
            <p className="text-muted-foreground">
              Connecting blood donors with recipients for a healthier community.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-foreground hover:text-primary transition-colors">
                  Donate Blood
                </Link>
              </li>
              <li>
                <Link to="/request" className="text-foreground hover:text-primary transition-colors">
                  Request Blood
                </Link>
              </li>
              <li>
                <Link to="/blood-check" className="text-foreground hover:text-primary transition-colors">
                  Blood Check
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-foreground hover:text-primary transition-colors">
                  Report Issue
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="text-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-foreground hover:text-primary transition-colors">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-primary" />
                <span>Emergency: +1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-primary" />
                <span>contact@lifeline-bridge.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="text-primary mt-1" />
                <span>123 Health Avenue, Medical District, City, 12345</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 mt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} LifeFlow Blood Bridge Network. All rights reserved.</p>
          <p className="mt-2 text-sm">This platform is designed to be accessible for elderly and disabled users.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
