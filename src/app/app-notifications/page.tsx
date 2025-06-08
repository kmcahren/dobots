// This page is accessed via the bottom navigation "Bell" icon.
// It might reuse components from `dashboard/notifications` or have a specific layout.
import { NotificationsList } from "@/components/dashboard/NotificationsList"; // Reusing for now
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNavigationBar } from "@/components/layout/BottomNavigationBar";
import { FloatingActionButton } from "@/components/layout/FloatingActionButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export const metadata = {
  title: 'All Notifications - DOIT',
  description: 'View all your notifications and surveys.',
};

export default function AppNotificationsPage() {
  return (
     <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-6 md:py-8 mb-16 md:mb-0">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold font-headline">All Notifications</h1>
            <Button asChild>
                <Link href="/dashboard/notifications/new">
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New
                </Link>
            </Button>
        </div>
        <NotificationsList />
      </main>
      <FloatingActionButton />
      <BottomNavigationBar />
    </div>
  );
}
