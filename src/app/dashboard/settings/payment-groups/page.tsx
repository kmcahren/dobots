'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import HelpTooltip from "@/components/ui/HelpTooltip";
import Link from 'next/link';

// Define a type for your Payment Group data (should match the one in [groupId]/page.tsx)
interface PaymentGroup {
  id: string
  title: string;
  imageUrl?: string;
  description?: string;
}

// Define a type for your Payment Request data
interface PaymentRequest {
  id: string;
  amount: number;
  description: string;
  isAssigned?: boolean; // Optional field
}
  // Component for individual payment request item with assign button state
  const PaymentRequestItem: React.FC<{ request: PaymentRequest }> = ({ request }) => {
    const [isAssigned, setIsAssigned] = useState(request.isAssigned || false);

    const handleAssignClick = () => {
      setIsAssigned(!isAssigned);
      // TODO: Implement actual assignment logic here (e.g., update backend)
      console.log(`Payment request ${request.id} ${isAssigned ? 'unassigned' : 'assigned'}`);
    };

    return (
      <div key={request.id} className="flex justify-between items-center w-full">
        <div>
          <p className="font-medium">{request.description}</p>
          <p className="text-sm text-gray-600">${request.amount.toFixed(2)}</p>
        </div>
        <Button variant={isAssigned ? "default" : "outline"} size="sm" onClick={handleAssignClick}>
          {isAssigned ? 'Assigned' : 'Assign'}
        </Button>
      </div>
    );
  };

  const ManagePaymentGroupsPage = () => {
    // State for payment group details
    const [selectedGroupId, setSelectedGroupId] = useState<string>('1');
    // Add state to hold the currently managed group data
    const [currentGroup, setCurrentGroup] = useState<PaymentGroup | null>(null);
    const [isLoadingGroup, setIsLoadingGroup] = useState(true);

    const [paymentGroupTitle, setPaymentGroupTitle] = useState('');
    const [groupImageUrl, setGroupImageUrl] = useState('');
    const [paymentGroupDescription, setPaymentGroupDescription] = useState('');
    const [openPaymentRequests, setOpenPaymentRequests] = useState<PaymentRequest[]>([]);


  useEffect(() => {
    // TODO: Fetch open payment requests that are not assigned to a contact
    // This is a placeholder for the actual data fetching logic
    const fetchOpenPaymentRequests = async () => {
      const dummyRequests: PaymentRequest[] = [
        { id: 'req1', amount: 50, description: 'Consultation Fee' },
        { id: 'req2', amount: 120, description: 'Product Purchase' },
        { id: 'req3', amount: 30, description: 'Subscription Renewal' },
      ]
      setOpenPaymentRequests(dummyRequests);
    };

    fetchOpenPaymentRequests();
  }, []); // Fetch open requests only once on mount

  // Effect to fetch or create the payment group when selectedGroupId changes
  useEffect(() => {
    const fetchOrCreateGroup = async () => {
      setIsLoadingGroup(true);
      // Simulate fetching group data
      console.log(`Attempting to fetch group with ID: ${selectedGroupId}`);
      const dummyGroups: PaymentGroup[] = [
        { id: '1', title: 'Default Group', imageUrl: '', description: 'This is the default payment group.' },
        { id: '2', title: 'Special Offer Group', imageUrl: 'https://example.com/special.png', description: 'Group for special promotions.' },
        { id: '3', title: 'Membership Group', imageUrl: 'https://example.com/membership.jpg', description: 'Group for membership payments.' },
      ];
      const foundGroup = dummyGroups.find(group => group.id === selectedGroupId);

      if (foundGroup) {
        console.log('Group found:', foundGroup);
        setCurrentGroup(foundGroup);
        setPaymentGroupTitle(foundGroup.title);
        setGroupImageUrl(foundGroup.imageUrl || '');
        setPaymentGroupDescription(foundGroup.description || '');
      } else {
        // Simulate creating a new group if not found
        console.log(`Group with ID ${selectedGroupId} not found. Simulating creation.`);
        const newGroup: PaymentGroup = {
          id: selectedGroupId,
          title: `New Group ${selectedGroupId}`,
          imageUrl: '',
          description: '',
        };
        setCurrentGroup(newGroup);
      }
      setIsLoadingGroup(false);
    };
    fetchOrCreateGroup();
  }, [selectedGroupId]); // Re-run when selectedGroupId changes

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentGroupTitle(e.target.value);
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupImageUrl(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentGroupDescription(e.target.value);
  };

  // TODO: Implement logic to assign payment requests to a group or perform other actions

  return (
 <div className="container mx-auto py-8">
        <div className="mb-6">
    <Label>Select Payment Group Version:</Label>
    <div className="flex space-x-2 mt-2"> {/* Use a div for layout */}
        <Button
            variant={selectedGroupId === '1' ? 'default' : 'outline'}
            onClick={() => setSelectedGroupId('1')}
        >
            Group 1
        </Button>
        <Button
            variant={selectedGroupId === '2' ? 'default' : 'outline'}
            onClick={() => setSelectedGroupId('2')}
        >
            Group 2
        </Button>
        <Button
            variant={selectedGroupId === '3' ? 'default' : 'outline'}
            onClick={() => setSelectedGroupId('3')}
        >
            Group 3
        </Button>
    </div>
</div>


        {isLoadingGroup ? (
            <p>Loading group...</p>
        ) : (
      <Card>
       <CardHeader><CardTitle>Manage Payment Group</CardTitle></CardHeader>
        <CardContent>
 <div className="mb-6">
 <div className="flex items-center gap-1">
 <Label htmlFor="payment_group_title">Payment Group Title</Label>
 <HelpTooltip helpText="This title will appear over your Group/Store image" />
 </div>
 <Input
 id="payment_group_title"
 value={paymentGroupTitle}
 onChange={handleTitleChange}
 placeholder="This title for the payment group"
 />
 </div>

          <div className="mb-6">
            <Label htmlFor="group_image_url">Group Image URL</Label>
            <Input
              id="group_image_url"
              value={groupImageUrl}
              onChange={handleImageUrlChange}
              placeholder="Enter image URL for the group"
            />
          </div>
 <div className="mb-6">
 <Label htmlFor="payment_group_description">Payment Group Description (Optional)</Label>
 <Input
 id="payment_group_description"
 value={paymentGroupDescription}
 onChange={handleDescriptionChange}
 placeholder="Enter a description for the payment group"
 />
 </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Open Payment Requests</h3>
            {openPaymentRequests.length === 0 ? (
              <p>No unassigned open payment requests found.</p>
            ) : (
              <ul>
                {openPaymentRequests.map((request) => (
                  <li key={request.id} className="border rounded-md p-4 mb-2 flex justify-between items-center"> {/* Keep the wrapper li for list structure */}
                    <PaymentRequestItem request={request} />
                  </li>
                ))}
              </ul>

            )}
          </div>
 </CardContent>
      </Card>)}

      <div className="mt-6">
 <Link href={`/dashboard/settings/payment-groups/${selectedGroupId}/preview`} passHref>
          <Button size="lg">Publish Group/Store - Share Link, QR & NFC</Button>
 </Link>
      </div>
    </div>
  );
};
export default ManagePaymentGroupsPage;