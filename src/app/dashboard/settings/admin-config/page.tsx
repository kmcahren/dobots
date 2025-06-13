
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { AdminPaymentAccountForm } from "@/components/admin/AdminPaymentAccountForm";
import { AdminGroupCreatorManagement } from "@/components/admin/AdminGroupCreatorManagement";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Configuration - DOIT',
  description: 'Manage application-wide settings and configurations.',
};

export default function AdminConfigPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* AppHeader and BottomNavigationBar are managed by DashboardLayout */}
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-6 md:py-8">
        <div className="flex items-center mb-8">
          <Button variant="outline" size="icon" asChild className="mr-4">
            <Link href="/dashboard/settings">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back to Settings</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold font-headline">Admin Configuration</h1>
        </div>

        <div className="space-y-10">
          <AdminPaymentAccountForm />
          <AdminGroupCreatorManagement />
        </div>
      </main>
    </div>
  );
}
