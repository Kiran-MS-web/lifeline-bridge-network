
import React from 'react';
import { cn } from '@/lib/utils';

type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

interface BloodTypeSelectorProps {
  selectedType: BloodType | null;
  onSelect: (type: BloodType) => void;
  className?: string;
}

const bloodTypes: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const BloodTypeSelector: React.FC<BloodTypeSelectorProps> = ({
  selectedType,
  onSelect,
  className
}) => {
  return (
    <div className={cn("grid grid-cols-4 gap-3", className)}>
      {bloodTypes.map(type => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className={cn(
            'blood-type-pill',
            selectedType === type ? 'active' : 'inactive'
          )}
          aria-pressed={selectedType === type}
          type="button"
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default BloodTypeSelector;
