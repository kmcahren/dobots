import { PaymentRequestForm } from '@/components/payments/PaymentRequestForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'New Payment Request - DOIT',
  description: 'Create and send a new payment request.',
};

export default function NewPaymentPage() {
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
