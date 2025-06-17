"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import dynamic from 'next/dynamic';

export default function NewPaymentPage() {
  // Dynamically import the PaymentRequestForm component, disable server-side rendering (ssr: false)
  // We are re-declaring PaymentRequestForm here to use the dynamically imported version.
  const PaymentRequestForm = dynamic(() => import('@/components/payments/PaymentRequestForm').then(mod => mod.PaymentRequestForm), {
    ssr: false,
    loading: () => <p>Loading form...</p>, // Optional loading component
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-2">
         <Button variant="outline" size="icon" asChild className="mr-4">
          <Link href="/dashboard?tab=payments">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back to Payments</span>
          </Link>
        </Button>
        {/* Title is inside PaymentRequestForm */}
      </div>
      <PaymentRequestForm />
    </div>
  );
}
