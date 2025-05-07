
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const AuthButtons: React.FC = () => {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <Button asChild variant="outline">
        <Link to="/auth" className="flex items-center gap-2">
          <LogIn className="h-4 w-4" />
          Sign In
        </Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Button asChild variant="ghost">
        <Link to="/profile" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Profile
        </Link>
      </Button>
      <Button
        variant="outline"
        onClick={() => signOut()}
        className="flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );
};
