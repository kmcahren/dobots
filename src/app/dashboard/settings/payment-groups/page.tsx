
'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import HelpTooltip from "@/components/ui/HelpTooltip";
import Link from 'next/link';

import { PaymentGroup, PaymentRequest } from '@/lib/types'; // Import types from shared file

const ManagePaymentGroupsPage = () => {
  // State for payment group details
  const [selectedGroupId, setSelectedGroupId] = useState<string>('1');
  // Add state to hold the currently managed group data
  const [currentGroup, setCurrentGroup] = useState<PaymentGroup | null>(null);
  const [isLoadingGroup, setIsLoadingGroup] = useState(true);

  const [paymentGroupTitle, setPaymentGroupTitle] = useState('');
  const [groupImageUrl, setGroupImageUrl] = useState('');
  const [paymentGroupDescription, setPaymentGroupDescription] = useState('');
  const [allPaymentRequests, setAllPaymentRequests] = useState<PaymentRequest[]>([]);

  useEffect(() => {
    // Simulate fetching all payment requests
    const fetchAllRequests = async () => {
      const dummyRequests: PaymentRequest[] = [
        { id: 'req1', amount: 50, description: 'Consultation Fee', status: 'available' },
        { id: 'req2', amount: 120, description: 'Product Purchase', status: 'available' },
        { id: 'req3', amount: 30, description: 'Subscription Renewal', status: 'available' },
        { id: 'req4', amount: 80, description: 'Service D', assignedGroupId: '1', status: 'assigned' },
        { id: 'req5', amount: 60, description: 'Product E', assignedGroupId: '2', status: 'backorder' },
      ];
      setAllPaymentRequests(dummyRequests);
    };
    fetchAllRequests();
  }, []);

  useEffect(() => {
    const fetchOrCreateGroup = async () => {
      setIsLoadingGroup(true);
      // Simulate fetching group data
      const dummyGroups: PaymentGroup[] = [
        { id: '1', title: 'Default Group', imageUrl: '', description: 'This is the default payment group.' },
        { id: '2', title: 'Special Offer Group', imageUrl: 'https://example.com/special.png', description: 'Group for special promotions.' },
        { id: '3', title: 'Membership Group', imageUrl: 'https://example.com/membership.jpg', description: 'Group for membership payments.' },
      ];
      const foundGroup = dummyGroups.find(group => group.id === selectedGroupId);

      if (foundGroup) {
        setCurrentGroup(foundGroup);
        setPaymentGroupTitle(foundGroup.title);
        setGroupImageUrl(foundGroup.imageUrl || '');
        setPaymentGroupDescription(foundGroup.description || '');
      } else {
        const newGroup: PaymentGroup = {
          id: selectedGroupId,
          title: `New Group ${selectedGroupId}`,
          imageUrl: '',
          description: '',
        };
        setCurrentGroup(newGroup);
        setPaymentGroupTitle(newGroup.title);
        setGroupImageUrl('');
        setPaymentGroupDescription('');
      }
      setIsLoadingGroup(false);
    };
    fetchOrCreateGroup();
  }, [selectedGroupId]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentGroupTitle(e.target.value);
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupImageUrl(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentGroupDescription(e.target.value);
  };

  const handleAssignRequest = (requestId: string) => {
    setAllPaymentRequests(allPaymentRequests.map(req =>
      req.id === requestId ? { ...req, assignedGroupId: selectedGroupId, status: 'assigned' } : req
    ));
  };

  const handleUnassignRequest = (requestId: string) => {
    setAllPaymentRequests(allPaymentRequests.map(req =>
      req.id === requestId ? { ...req, assignedGroupId: undefined, status: 'available' } : req
    ));
  };

  const handleToggleBackorder = (requestId: string, currentStatus: 'assigned' | 'backorder') => {
    setAllPaymentRequests(allPaymentRequests.map(req =>
      req.id === requestId ? { ...req, status: currentStatus === 'assigned' ? 'backorder' : 'assigned' } : req
    ));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Label>Select Payment Group Version:</Label>
        <div className="flex space-x-2 mt-2">
          <Button
            variant={selectedGroupId === '1' ? 'default' : 'outline'}
            onClick={() => setSelectedGroupId('1')}
          >
            Products/Services
          </Button>
          <Button
            variant={selectedGroupId === '2' ? 'default' : 'outline'}
            onClick={() => setSelectedGroupId('2')}
          >
            Promotions
          </Button>
          <Button
            variant={selectedGroupId === '3' ? 'default' : 'outline'}
            onClick={() => setSelectedGroupId('3')}
          >
            Memberships
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
              <h3 className="text-lg font-semibold mb-4">All Payment Requests</h3>
              {allPaymentRequests.length === 0 ? (
                <p>No payment requests found.</p>
              ) : (
                <ul>
                  {allPaymentRequests.map((request) => {
                    const isAssignedToCurrentGroup = request.assignedGroupId === selectedGroupId;
                    const isAssignedToOtherGroup = request.assignedGroupId !== undefined && !isAssignedToCurrentGroup;
                    return (
                      <li key={request.id} className="border rounded-md p-4 mb-2 flex justify-between items-center">
                        <div className="flex-grow">
                          <p className="font-medium">{request.description}</p>
                          <p className="text-sm text-gray-600">${request.amount.toFixed(2)}</p>
                          {isAssignedToCurrentGroup && request.status === 'backorder' && (
                            <span className="text-orange-500 text-sm">On Backorder</span>
                          )}
                          {isAssignedToOtherGroup && (
                            <span className="text-sm text-gray-500">Assigned to Group {request.assignedGroupId}</span>
                          )}
                          {!request.assignedGroupId && (
                            <span className="text-sm text-gray-500">Available</span>
                          )}
                        </div>
                        <div className="flex flex-shrink-0 items-center gap-2 ml-2">
                          {isAssignedToCurrentGroup ? (
                            <>
                              <Button size="sm" variant="outline" onClick={() => handleUnassignRequest(request.id)}>Unassign</Button>
                              <Button
                                size="sm"
                                variant={request.status === 'backorder' ? 'default' : 'secondary'}
                                onClick={() => handleToggleBackorder(request.id, request.status)}
                              >
                                {request.status === 'backorder' ? 'Mark Available' : 'Mark Backorder'}
                              </Button>
                            </>
                          ) : !request.assignedGroupId ? (
                            <Button size="sm" onClick={() => handleAssignRequest(request.id)}>Assign</Button>
                          ) : null}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-6">
        <Link href={`/dashboard/settings/payment-groups/${selectedGroupId}/preview`} passHref>
          <Button size="lg">Publish Group/Store - Share Link, QR & NFC</Button>
        </Link>
      </div>
    </div>
  );
};

export default ManagePaymentGroupsPage;
