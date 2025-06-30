"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { default as dynamicImport } from 'next/dynamic'; // Keep the renamed import
import { Suspense } from 'react';
import HelpTooltip from '@/components/ui/HelpTooltip'; // Import the HelpTooltip component

// Feature Flags
const isPaymentGroupEnhancementEnabled = true; // Add the feature flag

export const dynamic = 'force-dynamic'; // Keep this to prevent static generation for now

export default function NewPaymentPage() {
  // Dynamically import the PaymentRequestForm component using the renamed dynamicImport
  const PaymentRequestForm = dynamicImport(() => import('@/components/payments/PaymentRequestForm').then(mod => mod.PaymentRequestForm), {
    ssr: false, // Ensure client-side only,
  });

  return (
    <div className="space-y-6"> {/* Original JSX content restored */}
 <div className="flex items-center mb-2 justify-between"> {/* Added justify-between to align items */}
 <div className="flex items-center"> {/* Added a flex container for the back button and title */}
 <Button variant="outline" size="icon" asChild className="mr-4">
          <Link href="/dashboard?tab=payments">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back to Payments</span>
          </Link>
        </Button>
 {/* Title is inside PaymentRequestForm */}
 </div>
 {/* Added subtitle and link */}
 <div className="flex items-center text-sm text-gray-500">
 <span>STRIPE status:</span>
 <HelpTooltip helpText="Indicates the connection status of your Stripe account. 'setup' means it's not yet configured. Click on this link or proceed to Settings Admin Configuration for setup." />
 <Link href="/dashboard/settings/payment-methods" className="ml-1 underline">setup</Link>
 </div>
      </div>

 <Suspense fallback={<p>Loading form...</p>}>
        {/* Pass the feature flag to the component */}
        <PaymentRequestForm isPaymentGroupEnhancementEnabled={isPaymentGroupEnhancementEnabled} /> {/* Dynamically imported component */}
      </Suspense>
    </div>
  );
}