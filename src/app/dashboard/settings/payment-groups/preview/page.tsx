"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { QRCodeCanvas } from 'qrcode.react';
import { usePathname } from 'next/navigation';

interface PaymentRequest {
  id: string;
  amount: number;
  description: string;
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
      imageUrl: '/images/dashboard.png', // Example group image URL
      paymentRequests: [
        { id: 'req-1', amount: 10.00, description: 'Product A', imageUrl: '/images/newlogo-150x150.png' }, // Example item image URL
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
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-8">
        {paymentGroup.imageUrl && (
          <div className="relative h-64 w-full">
            <Image
              src={paymentGroup.imageUrl}
              alt={paymentGroup.title || 'Payment Group Image'}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
            <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white text-center drop-shadow-lg">
                {paymentGroup.title}
              </h1>
            </div>
          </div>
        )}
        {!paymentGroup.imageUrl && (
          <div className="h-40 bg-gray-200 rounded-md flex items-center justify-center">
             <h1 className="text-3xl font-bold text-gray-800">
                {paymentGroup.title}
              </h1>
          </div>
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Available Items</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentGroup.paymentRequests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
 <CardTitle>{request.description}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              {request.imageUrl && (
                <div className="relative w-1/2 h-32 mr-4 overflow-hidden rounded-md">
                  <Image
 src={request.imageUrl}
                    alt={request.description}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
 <div className={`flex-grow flex flex-col justify-between ${request.imageUrl ? 'w-1/2' : 'w-full'}`}>
                <p className="text-xl font-bold">${request.amount.toFixed(2)}</p>
             

              </div> {/* Closing div for flex-grow */}
              <Button className="mt-4 w-full">
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
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