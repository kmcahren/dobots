"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { QRCodeCanvas } from 'qrcode.react';
import { usePathname } from 'next/navigation';

interface PaymentRequest {
  id: string;
  amount: number;
  description: string;
  deliveryMethod?: string; // Added placeholder for delivery method
  imageUrl?: string; // Added optional imageUrl field
  // Add other relevant payment request fields
}

interface PaymentGroup {
  id: string;
  title: string;
  imageUrl?: string;
  paymentRequests: PaymentRequest[];
}

import { useToast } from "@/hooks/use-toast";
import NfcWriter from '@/components/NfcWriter';
const PaymentGroupPreviewPage: React.FC = () => {
  const [paymentGroup, setPaymentGroup] = useState<PaymentGroup | null>(null);

  // In a real application, you would fetch the payment group data here
  useEffect(() => {
    // Simulate fetching data
    const dummyPaymentGroup: PaymentGroup = {
      id: 'group-1',
      title: 'My Awesome Payment Group',
      imageUrl: '/images/dashboard.png', // Payment group image URL
 description: 'This is a sample payment group description. It provides more details about what this group is for.',
      paymentRequests: [
        { id: 'req-1', amount: 10.00, description: 'Product A', imageUrl: '/images/bots/0000logo.png', deliveryMethod: 'Digital Download' }, // Product A with image
        { id: 'req-2', amount: 25.50, description: 'Service B' },
        { id: 'req-3', amount: 5.00, description: 'Product C' },
      ],
    };
    setPaymentGroup(dummyPaymentGroup);
  }, []);

  const pathname = usePathname();
  const [showNfcWriter, setShowNfcWriter] = useState(false);
  const fullPaymentGroupUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}${pathname}` : '';

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
                <Button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full sm:w-auto">Add to Cart</Button> {/* Add to Cart Button */}
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
          <QRCodeCanvas value={fullPaymentGroupUrl} size={256} level="H" />
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