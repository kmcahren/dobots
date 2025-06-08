// This page is accessed via the bottom navigation "Credit Card" icon.
// It shows all payment records, paid or pending.
import { PaymentsList } from "@/components/dashboard/PaymentsList"; // Reusing for now
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNavigationBar } from "@/components/layout/BottomNavigationBar";
import { FloatingActionButton } from "@/components/layout/FloatingActionButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, ExternalLink } from "lucide-react";

export const metadata = {
  title: 'All Payments - DOIT',
  description: 'View all your payment requests and history.',
};

export default function AppPaymentsPage() {
  return (
     <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-6 md:py-8 mb-16 md:mb-0">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold font-headline">All Payments</h1>
            <div className="flex gap-2">
                <Button variant="outline" asChild>
                    <Link href="/dashboard/payments/history"> {/* Placeholder for full history/filtering */}
                        View Full History <ExternalLink className="ml-2 h-3 w-3"/>
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/dashboard/payments/new">
                        <PlusCircle className="mr-2 h-4 w-4" /> New Request
                    </Link>
                </Button>
            </div>
        </div>
        <PaymentsList />
      </main>
      <FloatingActionButton />
      <BottomNavigationBar />
    </div>
  );
}
