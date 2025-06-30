"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { QRCodeCanvas } from 'qrcode.react';
import { usePathname, useParams, useRouter } from 'next/navigation'; // Import useParams

interface PaymentRequest {
  id: string;
  amount: number;
  description: string;
  status: 'assigned' | 'backorder'; // Add status field for preview
  deliveryMethod?: string; // Added placeholder for delivery method
  imageUrl?: string; // Added optional imageUrl field
  // Add other relevant payment request fields
}
interface PaymentGroup {
  id: string;
  title: string;
  imageUrl?: string;
  description?: string;
  paymentRequests: PaymentRequest[];
}

// Define a constant array of dummy payment group data
const dummyPaymentGroups: PaymentGroup[] = [
  {
    id: '1',
    title: 'Default Group Preview',
    imageUrl: '/images/dashboard.png', // Payment group image URL
    description: 'This is the default payment group description.',
    paymentRequests: [
      { id: 'req-1', amount: 10.00, description: 'Product A', imageUrl: '/images/bots/0000logo.png', deliveryMethod: 'Digital Download', status: 'assigned' },
      { id: 'req-2', amount: 25.00, description: 'Service B', status: 'backorder' }, // Example backordered item
    ],
  },
  {
    id: '2',
    title: 'Special Offer Group Preview',
    imageUrl: '/images/dashboard.png', // Example image for Group 2
    description: 'Check out our special offers in this group!',
    paymentRequests: [
      { id: 'req-3', amount: 5.00, description: 'Product C', deliveryMethod: 'Pickup', status: 'assigned' },
      { id: 'req-4', amount: 50.00, description: 'Bundle Deal', status: 'assigned' },
    ],
  },
  {
    id: '3',
    title: 'Membership Group Preview',
    imageUrl: '/images/membership-banner.jpg', // Example image for Group 3
    description: 'Exclusive items for members.',
    paymentRequests: [
      { id: 'req-5', amount: 100.00, description: 'Premium Access', deliveryMethod: 'Online', status: 'assigned' },
    ],
  },
];

import { useToast } from "@/hooks/use-toast";
import NfcWriter from '@/components/NfcWriter';

const PaymentGroupPreviewPage: React.FC = () => {
  const params = useParams();
  const groupId = Array.isArray(params.groupId) ? params.groupId[0] : params.groupId; // Get groupId from the URL dynamic parameter

  const [paymentGroup, setPaymentGroup] = useState<PaymentGroup | null>(null);

  useEffect(() => {
    if (groupId) {
      // Find the matching group in the dummy data based on groupId
      const foundGroup = dummyPaymentGroups.find(group => group.id === groupId);
  
      if (foundGroup) {
        setPaymentGroup(foundGroup); // Set the found group data
      } else {
        // Handle case where group is not found (e.g., display an error or redirect)
        console.error(`Payment group with ID ${groupId} not found.`);
        setPaymentGroup(null); // Or handle this case as needed
      }
    }
  }, [groupId]); // Add groupId as a dependency
  

  const pathname = usePathname();
 const [showNfcWriter, setShowNfcWriter] = useState(false);
  const fullPaymentGroupUrl = typeof window !== 'undefined' && groupId ? `${window.location.protocol}//${window.location.host}${pathname}?groupId=${groupId}` : ''; // Include groupId in the URL
  if (!paymentGroup) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section (Compact, inspired by DashboardHeaderProfile) */}
      <div className="relative w-full h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md overflow-hidden shadow-md border border-gray-200 mb-8">
        {paymentGroup.imageUrl && ( // Use the group image as the banner
          <Image
            src={paymentGroup.imageUrl}
            alt={paymentGroup.title || 'Payment Group Image'}
              layout="fill"
 objectFit="cover"
 className="opacity-50" // Add some opacity to the banner image
            />
        )}
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">{paymentGroup.title}</h2>
          {paymentGroup.description && (
            <p className="text-lg opacity-90">{paymentGroup.description}</p> // Add some opacity to the description
          )}
          {/* Add other relevant group info here if needed */}
        </div>
      </div>

      {/* Payment Requests Section */}
      <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">Available Items</h3>

      {/* Product List (Shopping Cart Design) */}
      <div className="grid grid-cols-1 gap-4 sm:px-0"> {/* Adjusted gap and removed small screen padding */}
        {paymentGroup.paymentRequests.map((request) => (
          <Card key={request.id} className="flex flex-col sm:flex-row items-center"> {/* Card for each product, flex column on mobile, row on wider screens */}
            <CardContent className="flex flex-col sm:flex-row items-center p-4 w-full"> {/* Content within Card, flex column on mobile, row on wider screens, full width */}
              {request.imageUrl && (
                <div className="relative w-32 h-32 sm:w-24 sm:h-24 mb-4 sm:mb-0 sm:mr-4 overflow-hidden rounded-md flex-shrink-0"> {/* Smaller image size for mobile, adjusted margin */}
                  <Image
                    src={request.imageUrl}
                    alt={request.description}
                    layout="fill"
                    objectFit="cover" // Use 'cover' for consistent image sizing
                  />
                </div>
              )}
              <div className="flex-grow text-center sm:text-left mb-4 sm:mb-0"> {/* Text alignment, added bottom margin on mobile */}
                <h3 className="text-lg font-semibold mb-1">{request.description}</h3> {/* Product Title */}
                <p className="text-gray-600 text-sm mb-2">{request.description}</p> {/* Product Description (using description field again as example) */}
                {request.deliveryMethod && (<p className="text-sm text-gray-500 mb-2">Delivery: {request.deliveryMethod}</p>)} {/* Delivery Method */}
              </div>
              <div className="flex flex-col items-center sm:items-end ml-0 sm:ml-auto"> {/* Price and Add to Cart Button */}
                <p className="text-lg font-bold mb-2">${request.amount.toFixed(2)}</p> {/* Product Price */}
                {request.status === 'assigned' ? (
 <Button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full sm:w-auto">Add to Cart</Button>
                ) : request.status === 'backorder' ? (
 <Button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 w-full sm:w-auto">Send SMS when available</Button>
 ) : (
                  <span className="text-gray-500 text-sm">Status Unknown</span> // Handle other statuses if needed
 )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Checkout Link/Button/Icon */}
      <div className="flex justify-center mt-8">
        {/* This can be a button, link, or icon depending on desired UI */}
        <button className="bg-green-500 text-white text-lg font-semibold px-8 py-3 rounded-md hover:bg-green-600">
          Proceed to Checkout
        </button>
      </div>

      {/* QR Code for Sharing */}
      {fullPaymentGroupUrl && (
        <div className="mt-8 flex flex-col items-center">
          <h3 className="text-xl font-semibold font-headline mb-4 text-foreground">Share This Payment Group</h3>
          <QRCodeCanvas value={fullPaymentGroupUrl} size={192} level="H" />
        </div>
      )}

      {/* Button to Send Link to a Contact */}
      {fullPaymentGroupUrl && (
 <div className="mt-4 flex justify-center">
 <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white" onClick={() => { /* Implement functionality to send link to contact */ }}>Send Link to a Contact</Button>
 </div>
      )}

      {/* Button to Copy Link */}
      {fullPaymentGroupUrl && (
        <div className="mt-4 flex justify-center">
          <Button className="mt-4" onClick={() => { navigator.clipboard.writeText(fullPaymentGroupUrl); /*toast({ title: "Payment group link copied to clipboard!" });*/ }} disabled={!fullPaymentGroupUrl}>Copy Link to Clipboard</Button>
          </div>
      )}
      
      {/* Button to Write on NFC Tag */}
      {fullPaymentGroupUrl && (
        <div className="mt-4 flex justify-center">
          <Button className="mt-4 bg-chart-3 hover:bg-chart-3/90 text-primary-foreground" onClick={() => setShowNfcWriter(!showNfcWriter)}>
            Write Link on NFC Tag
          </Button>
        </div>
      )}

      {/* NFC Writer Component */}
      {showNfcWriter && fullPaymentGroupUrl && (
        <div className="mt-4 flex flex-col items-center">
          <h3 className="text-xl font-semibold font-headline mb-4 text-foreground">Write to NFC Tag</h3>
          <NfcWriter dataToWrite={fullPaymentGroupUrl} />
        </div>
      )}
    </div>
    </>
  );
};

export default PaymentGroupPreviewPage;