
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmergencyButton: React.FC = () => {
  return (
    <Link to="/request?emergency=true" className="btn-emergency">
      <AlertTriangle size={20} />
      <span>Emergency</span>
    </Link>
  );
};

export default EmergencyButton;
