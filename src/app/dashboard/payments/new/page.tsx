"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { default as dynamicImport } from 'next/dynamic'; // Keep the renamed import
import { Suspense } from 'react'; // Import Suspense

export const dynamic = 'force-dynamic'; // Keep this to prevent static generation for now

export default function NewPaymentPage() {
  // Dynamically import the PaymentRequestForm component using the renamed dynamicImport
  const PaymentRequestForm = dynamicImport(() => import('@/components/payments/PaymentRequestForm').then(mod => mod.PaymentRequestForm), {
    ssr: false, // Ensure client-side only
    loading: () => <p>Loading form...</p>, // Optional loading component (can be removed if using Suspense fallback)
  });

  return (
    <div className="space-y-6"> {/* Original JSX content restored */}
      <div className="flex items-center mb-2">
         <Button variant="outline" size="icon" asChild className="mr-4">
          <Link href="/dashboard?tab=payments">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back to Payments</span>
          </Link>
        </Button>
        {/* Title is inside PaymentRequestForm */}
      </div>
      <Suspense fallback={<p>Loading form...</p>}> {/* Wrap with Suspense */}
        <PaymentRequestForm /> {/* Dynamically imported component */}
      </Suspense>
    </div>
  );
}