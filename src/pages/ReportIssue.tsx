
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const ReportIssue: React.FC = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [attachments, setAttachments] = useState<FileList | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !contact || !issueType || !description) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Here we would normally submit the form to an API
    console.log({
      name,
      contact,
      issueType,
      description,
      referenceId: referenceId || 'N/A',
      urgent,
      hasAttachments: attachments && attachments.length > 0
    });
    
    toast.success('Issue reported successfully! We will address it promptly.');
  };
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Report an Issue</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Report any problems related to blood donation, delivery, or services. We take all issues seriously and will respond promptly.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Issue Report Form</CardTitle>
                <CardDescription>
                  Please provide detailed information about the issue you're experiencing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-lg">Your Name *</Label>
                      <Input 
                        id="name" 
                        placeholder="Full name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-base p-6"
                        required
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="contact" className="text-lg">Contact Information *</Label>
                      <Input 
                        id="contact" 
                        placeholder="Phone number or email" 
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="text-base p-6"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="issue-type" className="text-lg">Issue Type *</Label>
                    <Select 
                      value={issueType} 
                      onValueChange={setIssueType}
                      required
                    >
                      <SelectTrigger id="issue-type" className="text-base p-6">
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delivery">Blood Delivery Problem</SelectItem>
                        <SelectItem value="quality">Blood Quality Concern</SelectItem>
                        <SelectItem value="service">Customer Service Issue</SelectItem>
                        <SelectItem value="technical">Website or App Problem</SelectItem>
                        <SelectItem value="appointment">Appointment Scheduling Issue</SelectItem>
                        <SelectItem value="other">Other Issue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="reference" className="text-lg">Reference ID (if applicable)</Label>
                    <Input 
                      id="reference" 
                      placeholder="Order number, appointment ID, or other reference" 
                      value={referenceId}
                      onChange={(e) => setReferenceId(e.target.value)}
                      className="text-base p-6"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="description" className="text-lg">Issue Description *</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Please describe the issue in detail" 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[150px]"
                      required
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="attachments" className="text-lg">Attachments (optional)</Label>
                    <Input 
                      id="attachments" 
                      type="file"
                      multiple
                      className="text-base p-6"
                      onChange={(e) => setAttachments(e.target.files)}
                    />
                    <p className="text-sm text-muted-foreground">
                      You can upload images or documents related to the issue (max 5MB per file)
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="urgent" 
                      checked={urgent} 
                      onCheckedChange={(checked) => setUrgent(checked === true)}
                    />
                    <Label 
                      htmlFor="urgent"
                      className="leading-normal"
                    >
                      This is an urgent issue that requires immediate attention
                    </Label>
                  </div>
                  
                  <Button type="submit" className="text-lg py-6 px-8">Submit Report</Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  For urgent issues requiring immediate assistance, please contact our emergency support:
                </p>
                
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Phone:</p>
                    <p className="text-primary">+1 (555) 123-4567</p>
                  </div>
                  
                  <div>
                    <p className="font-medium">Email:</p>
                    <p className="text-primary">emergency@lifeline-bridge.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Common Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Delivery Delays</h3>
                    <p className="text-sm text-muted-foreground">
                      If your blood delivery is delayed, it might be due to weather, traffic, or unexpected logistical issues.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Appointment Rescheduling</h3>
                    <p className="text-sm text-muted-foreground">
                      Need to reschedule? You can do so through your account dashboard or by contacting us directly.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Blood Type Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      If you believe your blood type was incorrectly recorded, we can arrange for a re-check.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Technical Support</h3>
                    <p className="text-sm text-muted-foreground">
                      For website or app issues, try clearing your cache or updating your browser before reporting.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ReportIssue;
