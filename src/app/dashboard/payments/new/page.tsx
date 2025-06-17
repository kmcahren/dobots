"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { default as dynamicImport } from 'next/dynamic';

export const dynamic = 'force-dynamic';

export default function NewPaymentPage() {
  // Dynamically import the PaymentRequestForm component, disable server-side rendering (ssr: false)
  // We are re-declaring PaymentRequestForm here to use the dynamically imported version.
  const PaymentRequestForm = dynamic(() => import('@/components/payments/PaymentRequestForm').then(mod => mod.PaymentRequestForm), {
    ssr: false, // Ensure client-side only
    loading: () => <p>Loading form...</p>, // Optional loading component
  });

  return (
    <div>Payments New Page Placeholder</div>
  );
}
