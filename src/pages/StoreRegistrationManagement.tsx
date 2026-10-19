
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  useStoreRegistrations, 
  StoreRegistration, 
  useUpdateRegistrationStatus,
  useCreateStore
} from '@/hooks/use-store-registrations';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { AlertCircle, CheckCircle } from 'lucide-react';

const StoreRegistrationManagement = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState<StoreRegistration | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  
  const { data: registrations, refetch, isLoading } = useStoreRegistrations();
  const updateRegistrationStatus = useUpdateRegistrationStatus();
  const createStore = useCreateStore();

  const handleUpdateStatus = async (registration: StoreRegistration, status: 'APPROVED' | 'REJECTED') => {
    try {
      setProcessingId(registration.id);
      
      // If approving, create a store entry first
      if (status === 'APPROVED') {
        await createStore.mutateAsync(registration);
        toast({
          title: "Store Created",
          description: "The store was successfully created and can now be viewed in Certified Stores",
        });
      }

      // Update the registration status
      await updateRegistrationStatus.mutateAsync({ 
        registrationId: registration.id,
        status
      });

      toast({
        title: "Status Updated",
        description: `Registration ${status.toLowerCase()} successfully`,
      });

      // Refetch the updated list
      refetch();
      setDetailDialogOpen(false);
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update registration status",
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const viewStore = () => {
    // Navigate to stores page
    navigate('/certified-stores');
  };

  const viewDetails = (registration: StoreRegistration) => {
    setSelectedRegistration(registration);
    setDetailDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Store Registration Management</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Store Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  <div className="flex justify-center">
                    <div className="animate-spin h-6 w-6 border-2 border-gold border-t-transparent rounded-full"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {registrations?.map((reg) => (
                  <TableRow key={reg.id}>
                    <TableCell className="font-medium">{reg.store_name}</TableCell>
                    <TableCell>{reg.owner_name}</TableCell>
                    <TableCell>
                      <div>{reg.email}</div>
                      <div className="text-sm text-muted-foreground">{reg.phone}</div>
                    </TableCell>
                    <TableCell>
                      <div>{reg.city}</div>
                      <div className="text-sm text-muted-foreground">{reg.state}</div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                        ${reg.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                        reg.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'}`}>
                        {reg.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => viewDetails(reg)}
                        >
                          View Details
                        </Button>
                        {reg.status === 'APPROVED' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={viewStore}
                          >
                            View Stores
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {(!registrations || registrations.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No store registrations found
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Registration Details Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Store Registration Details</DialogTitle>
            <DialogDescription>
              Review the store registration information
            </DialogDescription>
          </DialogHeader>
          
          {selectedRegistration && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Store Information</h3>
                  <div className="space-y-2 mt-2">
                    <div>
                      <div className="text-sm font-medium">Store Name</div>
                      <div>{selectedRegistration.store_name}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Description</div>
                      <div className="text-sm">{selectedRegistration.description}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Address</div>
                      <div className="text-sm">{selectedRegistration.address}, {selectedRegistration.city}, {selectedRegistration.state} - {selectedRegistration.pincode}</div>
                    </div>
                    {selectedRegistration.established_year && (
                      <div>
                        <div className="text-sm font-medium">Established</div>
                        <div className="text-sm">{selectedRegistration.established_year}</div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Owner Information</h3>
                  <div className="space-y-2 mt-2">
                    <div>
                      <div className="text-sm font-medium">Owner Name</div>
                      <div>{selectedRegistration.owner_name}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Contact</div>
                      <div className="text-sm">
                        <div>{selectedRegistration.email}</div>
                        <div>{selectedRegistration.phone}</div>
                        {selectedRegistration.whatsapp && <div>WhatsApp: {selectedRegistration.whatsapp}</div>}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Business Details</div>
                      <div className="text-sm">GSTIN: {selectedRegistration.gstin}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Social Media</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {selectedRegistration.website && (
                    <div className="text-sm">Website: {selectedRegistration.website}</div>
                  )}
                  {selectedRegistration.facebook_url && (
                    <div className="text-sm">Facebook: {selectedRegistration.facebook_url}</div>
                  )}
                  {selectedRegistration.instagram_handle && (
                    <div className="text-sm">Instagram: {selectedRegistration.instagram_handle}</div>
                  )}
                  {selectedRegistration.twitter_handle && (
                    <div className="text-sm">Twitter: {selectedRegistration.twitter_handle}</div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="mt-6">
            {selectedRegistration && selectedRegistration.status === 'PENDING' && (
              <div className="flex gap-2 w-full">
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={() => handleUpdateStatus(selectedRegistration, 'REJECTED')}
                  disabled={!!processingId}
                >
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Reject Registration
                </Button>
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => handleUpdateStatus(selectedRegistration, 'APPROVED')}
                  disabled={!!processingId}
                >
                  {processingId === selectedRegistration.id ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve Registration
                    </>
                  )}
                </Button>
              </div>
            )}
            {selectedRegistration && selectedRegistration.status !== 'PENDING' && (
              <div className="w-full flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setDetailDialogOpen(false)}
                >
                  Close
                </Button>
                {selectedRegistration.status === 'APPROVED' && (
                  <Button
                    variant="default"
                    onClick={viewStore}
                  >
                    View Stores
                  </Button>
                )}
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoreRegistrationManagement;
