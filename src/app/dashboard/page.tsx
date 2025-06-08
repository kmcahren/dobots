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
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1 p-1 h-auto rounded-lg bg-muted">
          <TabsTrigger value="events" className="flex-col md:flex-row h-14 md:h-10 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md rounded-md">
            <CalendarDays className="h-5 w-5 mb-1 md:mb-0 md:mr-2" /> Events
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex-col md:flex-row h-14 md:h-10 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md rounded-md">
            <BellRing className="h-5 w-5 mb-1 md:mb-0 md:mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="shares" className="flex-col md:flex-row h-14 md:h-10 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md rounded-md">
            <Share2 className="h-5 w-5 mb-1 md:mb-0 md:mr-2" /> Shares
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex-col md:flex-row h-14 md:h-10 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md rounded-md">
            <CreditCard className="h-5 w-5 mb-1 md:mb-0 md:mr-2" /> Payments
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
