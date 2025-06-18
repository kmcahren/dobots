"use client";

import { useRouter, useParams, usePathname } from 'next/navigation';
import { QRCodeCanvas } from 'qrcode.react';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { CreditCard, CheckCircle, AlertTriangle, CircleDollarSign, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PaymentItem } from "@/lib/types"; // Assuming PaymentItem type is here

// Assume mockPayments is imported or defined elsewhere, similar to PaymentsList.tsx
// For demonstration, redefining a small mock array here:
const mockPayments: PaymentItem[] = [
  { id: "p1", title: "U12 Team Jersey Fee", price: 25.00, currency: "USD", status: "paid", requesterId: "user1", createdAt: "2024-08-10T11:00:00Z", dueDate: "2024-08-01", imageUrl: "https://placehold.co/600x400.png?text=Jersey" },
  { id: "p2", title: "Club Membership Renewal", price: 50.00, currency: "USD", status: "pending", requesterId: "user2", createdAt: "2024-08-05T15:20:00Z", dueDate: "2024-08-20" },
  { id: "p3", title: "Tournament Entry Fee", price: 100.00, currency: "USD", status: "pending", requesterId: "user1", createdAt: "2024-08-01T08:00:00Z", dueDate: "2024-08-15", imageUrl: "https://placehold.co/600x400.png?text=Tournament" },
];


export default function PaymentDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const paymentId = params.id; // Get the 'id' from the URL parameters

  const [payment, setPayment] = useState<PaymentItem | undefined>(undefined);
  // Construct the full URL for the QR code
  const fullPaymentUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}${pathname}` : '';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (paymentId) {
      // In a real app, you would fetch data from an API here
      // Example: fetch(`/api/payments/${paymentId}`).then(res => res.json()).then(data => setPayment(data));

      // For now, find the payment in mock data
      const foundPayment = mockPayments.find(p => p.id === paymentId);
      setPayment(foundPayment);
      setLoading(false);
    }
  }, [paymentId]);

  if (loading) {
    return <div className="text-center py-8">Loading payment details...</div>;
  }

  if (!payment) {
    return (
      <div className="text-center py-8">
        <p>Payment not found.</p>
        <Button variant="link" onClick={() => router.back()} className="mt-4">
          Back to Payments
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="icon" asChild className="mr-4">
          <Link href="/dashboard?tab=payments">
            {/* ChevronLeft icon or similar */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            <span className="sr-only">Back to Payments</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold font-headline text-primary">{payment.title} Details</h1>
      </div>

      <Card className="overflow-hidden shadow-lg rounded-lg">
        {payment.imageUrl && (
          <div className="relative h-60 w-full">
            <Image
              src={payment.imageUrl}
              alt={`Image for ${payment.title}`}
              fill={true}
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-2xl font-headline">{payment.title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
             Requested by: User {payment.requesterId.slice(-3)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center">
             <CircleDollarSign className="h-5 w-5 mr-2 text-primary" />
             <span className="text-lg font-semibold">${payment.price.toFixed(2)} {payment.currency}</span>
          </div>

           {payment.dueDate && (
              <div className="flex items-center text-muted-foreground">
                {/* CalendarDays icon or similar */}
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                 <span className="ml-2">Due Date: {format(parseISO(payment.dueDate), 'PPP')}</span>
              </div>
           )}

          <div className="flex items-center">
              {/* Status Icon */}\
              {payment.status === 'paid' && <CheckCircle className="h-5 w-5 mr-2 text-green-600 dark:text-green-500" />}
              {payment.status === 'pending' && <AlertTriangle className="h-5 w-5 mr-2 text-amber-500 dark:text-amber-600" />}
              {payment.status === 'failed' && <XCircle className="h-5 w-5 mr-2 text-destructive dark:text-destructive-foreground" />}
              {payment.status === 'cancelled' && <XCircle className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-600" />}
              <span className={cn(
                  "text-lg font-medium",
                  payment.status === 'paid' && "text-green-600 dark:text-green-500",
                  payment.status === 'pending' && "text-amber-500 dark:text-amber-600",
                  payment.status === 'failed' && "text-destructive dark:text-destructive-foreground",
                  payment.status === 'cancelled' && "text-gray-500 dark:text-gray-600"
              )}>
                  Status: {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </span>
          </div>


          {payment.description && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{payment.description}</p>
            </div>
          )}

           <div className="text-sm text-muted-foreground">
               Created: {format(parseISO(payment.createdAt), 'PPP p')}
           </div>

        </CardContent>
        {/* You could add a CardFooter here for actions like "Mark as Paid" (if user is requester) or "Cancel" */}
      </Card>

      {/* QR Code for Sharing */}
      {fullPaymentUrl && (
        <div className="mt-8 flex flex-col items-center">
          <h3 className="text-xl font-semibold font-headline mb-4 text-foreground">Share This Payment</h3>
          <QRCodeCanvas
            value={fullPaymentUrl} // Use QRCodeCanvas here
            size={256}
            level="H" // High error correction level
          />
        </div>
      )}

       <div className="mt-8 text-center">
         <Button asChild variant="outline">
             <Link href="/dashboard?tab=payments">Back to Payments List</Link>
         </Button>
       </div>
    </div>
  );
}