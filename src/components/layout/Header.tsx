
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Menu, X, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthButtons } from '@/components/layout/AuthButtons';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Droplets size={32} className="text-primary" />
          <span className="text-xl md:text-2xl font-bold">LifeLine</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/donate" className="text-foreground hover:text-primary transition-colors">
            Donate Blood
          </Link>
          <Link to="/request" className="text-foreground hover:text-primary transition-colors">
            Request Blood
          </Link>
          <Link to="/blood-check" className="text-foreground hover:text-primary transition-colors">
            Blood Check
          </Link>
          <Link to="/report" className="text-foreground hover:text-primary transition-colors">
            Report Issue
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell size={20} />
          </Button>
          {user && (
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User size={20} />
              </Button>
            </Link>
          )}
          <AuthButtons />
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t px-4 py-3 absolute top-full left-0 right-0 shadow-lg">
          <nav className="flex flex-col space-y-4 mb-4">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/donate" 
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={toggleMenu}
            >
              Donate Blood
            </Link>
            <Link 
              to="/request" 
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={toggleMenu}
            >
              Request Blood
            </Link>
            <Link 
              to="/blood-check" 
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={toggleMenu}
            >
              Blood Check
            </Link>
            <Link 
              to="/report" 
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={toggleMenu}
            >
              Report Issue
            </Link>
            {user && (
              <Link 
                to="/profile"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={toggleMenu}
              >
                Profile
              </Link>
            )}
            <div className="py-2" onClick={toggleMenu}>
              <AuthButtons />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
