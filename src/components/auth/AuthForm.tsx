
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthForm: React.FC = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if user is already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    try {
      setIsLoading(true);
      await signIn(loginEmail, loginPassword);
      // The redirect is handled by the AuthContext
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerName || !registerEmail || !registerPassword || !registerPhone) {
      toast.error('Please fill in all fields');
      return;
    }
    
    try {
      setIsLoading(true);
      await signUp(registerEmail, registerPassword, registerName, registerPhone);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="form-container max-w-md w-full mx-auto p-6 bg-card rounded-lg shadow-md">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login" className="text-lg py-3">Login</TabsTrigger>
          <TabsTrigger value="register" className="text-lg py-3">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-lg">Email</Label>
              <Input 
                id="email" 
                type="email"
                placeholder="your@email.com" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="text-base p-6"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-lg">Password</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input 
                id="password" 
                type="password"
                placeholder="••••••••" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="text-base p-6"
                disabled={isLoading}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full text-lg py-6"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="register">
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-lg">Full Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                className="text-base p-6"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="register-email" className="text-lg">Email</Label>
              <Input 
                id="register-email" 
                type="email"
                placeholder="your@email.com" 
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="text-base p-6"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="phone" className="text-lg">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel"
                placeholder="+1 (123) 456-7890" 
                value={registerPhone}
                onChange={(e) => setRegisterPhone(e.target.value)}
                className="text-base p-6"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="register-password" className="text-lg">Password</Label>
              <Input 
                id="register-password" 
                type="password"
                placeholder="••••••••" 
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="text-base p-6"
                disabled={isLoading}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full text-lg py-6"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
            
            <p className="text-center text-sm text-muted-foreground mt-4">
              By registering, you agree to our 
              <a href="#" className="text-primary hover:underline"> Terms of Service</a> and 
              <a href="#" className="text-primary hover:underline"> Privacy Policy</a>.
            </p>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForm;
