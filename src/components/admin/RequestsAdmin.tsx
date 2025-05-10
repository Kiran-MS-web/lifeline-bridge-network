
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AdminBloodRequest {
  id: string;
  blood_type: string;
  urgency: string;
  units_requested: number;
  request_date: string;
  hospital_name: string | null;
  notes: string | null;
  status: string;
  recipient_name: string | null;
  recipient_contact: string | null;
  recipient_location: string | null;
}

const RequestsAdmin: React.FC = () => {
  const [requests, setRequests] = useState<AdminBloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAdminRequests = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('admin_blood_requests')
          .select('*');
          
        if (error) {
          console.error('Error fetching admin requests:', error);
          return;
        }
        
        setRequests(data || []);
      } catch (error) {
        console.error('Error in fetchAdminRequests:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAdminRequests();
  }, []);
  
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'normal': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'approved': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  if (loading) {
    return <div className="flex justify-center p-8">Loading requests...</div>;
  }
  
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Blood Requests Admin</h2>
      
      <Table>
        <TableCaption>List of all blood requests</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Blood Type</TableHead>
            <TableHead>Urgency</TableHead>
            <TableHead>Units</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">No blood requests found</TableCell>
            </TableRow>
          ) : (
            requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{formatDate(request.request_date)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-bold">
                    {request.blood_type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getUrgencyColor(request.urgency)}>
                    {request.urgency}
                  </Badge>
                </TableCell>
                <TableCell>{request.units_requested}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p className="font-medium">{request.recipient_name || 'Anonymous'}</p>
                    {request.recipient_contact && (
                      <p className="text-xs text-muted-foreground">{request.recipient_contact}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{request.hospital_name || request.recipient_location || 'Unknown'}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                      asChild
                    >
                      <a href={`/admin/requests/${request.id}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                        View
                      </a>
                    </Button>
                    {/* Add more action buttons as needed */}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RequestsAdmin;
