
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const AuthForm: React.FC = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Here we would normally authenticate with an API
    console.log('Login attempt', { loginEmail, loginPassword });
    
    toast.success('Login successful!');
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerName || !registerEmail || !registerPassword || !registerPhone) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Here we would normally register with an API
    console.log('Register attempt', { 
      registerName, 
      registerEmail, 
      registerPassword,
      registerPhone
    });
    
    toast.success('Registration successful!');
  };
  
  return (
    <div className="form-container">
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
              />
            </div>
            
            <Button type="submit" className="w-full text-lg py-6">Sign In</Button>
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
              />
            </div>
            
            <Button type="submit" className="w-full text-lg py-6">Create Account</Button>
            
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
