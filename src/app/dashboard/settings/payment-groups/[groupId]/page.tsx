'use client';
// Use 'next/navigation' for accessing dynamic route parameters in App Router
import { useEffect, useState } from 'react'; // Use 'next/router' for accessing dynamic route parameters
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link'; // Import Link for navigation
// Import other necessary components like your PaymentRequestItem if you create one

interface PaymentRequest {
  assignedGroupId?: string; // Add a field to track assignment
  id: string;
  amount: number;
  description: string;
  // Add other relevant fields
}

// You'll need a type for your Payment Group data
interface PaymentGroup {
  id: string;
  title: string;
  imageUrl?: string;
  description?: string;
  // Add other relevant fields
}

const PaymentGroupDetailsPage: React.FC = () => {
  // Use useParams from next/navigation in App Router
  const params = useParams();
  const groupId = Array.isArray(params.groupId) ? params.groupId[0] : params.groupId;

  const [paymentGroup, setPaymentGroup] = useState<PaymentGroup | null>(null);
  const [availablePaymentRequests, setAvailablePaymentRequests] = useState<PaymentRequest[]>([]);
  const [assignedPaymentRequests, setAssignedPaymentRequests] = useState<PaymentRequest[]>([]);

  // Dummy data for all possible payment requests
  const allPaymentRequests: PaymentRequest[] = [
    { id: 'req-1', amount: 10.00, description: 'Product A', assignedGroupId: '1' },
    { id: 'req-2', amount: 25.00, description: 'Service B', assignedGroupId: '2' },
    { id: 'req-3', amount: 5.00, description: 'Product C', assignedGroupId: '1' },
    { id: 'req-4', amount: 15.00, description: 'Workshop Fee' }, // Not assigned initially
    { id: 'req-5', amount: 55.00, description: 'Consulting Service', assignedGroupId: '2' },
    { id: 'req-6', amount: 30.00, description: 'Subscription Renewal' }, // Not assigned initially
  ];

  useEffect(() => {
    if (groupId) {
      // Simulate fetching group data (as done in page.tsx for consistency)
      // For now, let's simulate fetching data
      const fetchGroupData = async () => {
        // Replace with actual API call
        const dummyGroups: PaymentGroup[] = [
          { id: '1', title: 'Default Group', imageUrl: '', description: 'This is the default payment group.' },
          { id: '2', title: 'Special Offer Group', imageUrl: 'https://example.com/special.png', description: 'Group for special promotions.' },
          { id: '3', title: 'Membership Group', imageUrl: 'https://example.com/membership.jpg', description: 'Group for membership payments.' },
        ];
        const foundGroup = dummyGroups.find(group => group.id === groupId);

        if (foundGroup) {
          setPaymentGroup(foundGroup);
        } else {
          console.error(`Payment group with ID ${groupId} not found.`);
          setPaymentGroup(null);
        }

        // Filter payment requests based on assignment to the current groupId
        const assigned = allPaymentRequests.filter(request => request.assignedGroupId === groupId);
        // Consider requests available if they are not assigned to ANY group
        // For this simplified example, let's consider all unassigned requests as available.
        const available = allPaymentRequests.filter(request => !request.assignedGroupId); // This is the corrected filtering for available
        setAssignedPaymentRequests(assigned);
        setAvailablePaymentRequests(available);
      };

      fetchGroupData();
    } else {
      // Handle case where groupId is not available initially (e.g., redirect or show message)
      console.warn("groupId is not available yet.");
    }
  }, [groupId]); // Depend on groupId to refetch when it changes

  const handleAssignRequest = (requestId: string) => {
    // Simulate assigning the request
    console.log(`Assigning request ${requestId} to group ${groupId}`);
    const requestToAssign = availablePaymentRequests.find(req => req.id === requestId);
    if (requestToAssign && groupId) {
      const updatedAssigned = [...assignedPaymentRequests, { ...requestToAssign, assignedGroupId: groupId }];
      const updatedAvailable = availablePaymentRequests.filter(req => req.id !== requestId);
      setAssignedPaymentRequests(updatedAssigned);
      setAvailablePaymentRequests(updatedAvailable);
    }
  };

  const handleUnassignRequest = (requestId: string) => {
    // Simulate unassigning the request
    console.log(`Unassigning request ${requestId} from group ${groupId}`);
    const requestToUnassign = assignedPaymentRequests.find(req => req.id === requestId);
    if (requestToUnassign) {
      const updatedAvailable = [...availablePaymentRequests, { ...requestToUnassign, assignedGroupId: undefined }];
      const updatedAssigned = assignedPaymentRequests.filter(req => req.id !== requestId);
      setAvailablePaymentRequests(updatedAvailable);
      setAssignedPaymentRequests(updatedAssigned);
    }
  };

  if (!paymentGroup) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader><CardTitle>Manage Group: {paymentGroup.title}</CardTitle></CardHeader>
        <CardContent>
          {/* Display group details */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold">Group Details</h4>
            <p>Description: {paymentGroup.description}</p>
            {paymentGroup.imageUrl && <img src={paymentGroup.imageUrl} alt={paymentGroup.title} className="w-32 h-32 object-cover rounded-md mt-2" />}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Available Payment Requests</h3>
            {availablePaymentRequests.length === 0 ? (
              <p>No available payment requests.</p>
            ) : (
              <ul>
                {availablePaymentRequests.map((request) => (
                  <li key={request.id} className="border rounded-md p-4 mb-2 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{request.description}</p>
                      <p className="text-sm text-gray-600">${request.amount.toFixed(2)}</p>
                    </div>
                    <Button size="sm" onClick={() => handleAssignRequest(request.id)}>Assign</Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Assigned Payment Requests</h3>
            {assignedPaymentRequests.length === 0 ? (
              <p>No payment requests assigned to this group.</p>
            ) : (
              <ul>
                {assignedPaymentRequests.map((request) => (
                  <li key={request.id} className="border rounded-md p-4 mb-2 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{request.description}</p>
                      <p className="text-sm text-gray-600">${request.amount.toFixed(2)}</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleUnassignRequest(request.id)}>Unassign</Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Link to preview page */}
      <div className="mt-6">
        <Link href={`/dashboard/settings/payment-groups/${groupId}/preview`} passHref>
          <Button size="lg">Preview Group</Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentGroupDetailsPage;