
"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventsList } from "@/components/dashboard/EventsList";
import { NotificationsList } from "@/components/dashboard/NotificationsList";
import { SharesList } from "@/components/dashboard/SharesList";
import { PaymentsList } from "@/components/dashboard/PaymentsList";
import { DashboardHeaderProfile } from "@/components/layout/DashboardHeaderProfile";
import { CalendarDays, BellRing, Share2, CreditCard } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeaderProfile />
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-4 gap-1 p-1 h-auto rounded-lg bg-muted">
          <TabsTrigger value="events" className="flex flex-row items-center justify-center h-12 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md rounded-md px-2 text-xs sm:text-sm">
            <CalendarDays className="h-4 w-4 mr-2" /> Events
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex flex-row items-center justify-center h-12 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md rounded-md px-2 text-xs sm:text-sm">
            <BellRing className="h-4 w-4 mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="shares" className="flex flex-row items-center justify-center h-12 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md rounded-md px-2 text-xs sm:text-sm">
            <Share2 className="h-4 w-4 mr-2" /> Reports
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex flex-row items-center justify-center h-12 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md rounded-md px-2 text-xs sm:text-sm">
            <CreditCard className="h-4 w-4 mr-2" /> Payments
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="events" className="mt-6">
          <EventsList />
        </TabsContent>
        <TabsContent value="notifications" className="mt-6">
          <NotificationsList />
        </TabsContent>
        <TabsContent value="shares" className="mt-6">
          <SharesList />
        </TabsContent>
        <TabsContent value="payments" className="mt-6">
          <PaymentsList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
