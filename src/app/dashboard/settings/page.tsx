import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNavigationBar } from "@/components/layout/BottomNavigationBar";
import { FloatingActionButton } from "@/components/layout/FloatingActionButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, User, Bell, CreditCardIcon, Shield } from "lucide-react";


export const metadata = {
  title: 'Settings - DOIT',
  description: 'Manage your account and application settings.',
};

export default function SettingsPage() {
  const settingsOptions = [
    { title: "Profile", description: "Update your personal information.", icon: User, href: "/dashboard/settings/profile" },
    { title: "Notifications", description: "Manage your notification preferences.", icon: Bell, href: "/dashboard/settings/notifications" },
    { title: "Payment Methods", description: "Configure your payment options.", icon: CreditCardIcon, href: "/dashboard/settings/payment-methods" },
    { title: "Security & Privacy", description: "Manage account security and privacy settings.", icon: Shield, href: "/dashboard/settings/security" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-6 md:py-8 mb-16 md:mb-0">
        <div className="flex items-center mb-6">
          <Button variant="outline" size="icon" asChild className="mr-4">
            <Link href="/dashboard">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back to Dashboard</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold font-headline">Settings</h1>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {settingsOptions.map(option => (
            <Card key={option.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <option.icon className="w-8 h-8 text-primary"/>
                <div>
                  <CardTitle className="font-headline text-lg">{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <Link href={option.href}>Manage {option.title}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-headline">Admin Configuration</CardTitle>
            <CardDescription>For app administrators: manage setup items, field choices, and payment processor plugins.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">This section is typically restricted to users with administrative privileges.</p>
            <Button variant="default" disabled>Access Admin Panel (Admin Only)</Button>
          </CardContent>
        </Card>

      </main>
      <FloatingActionButton />
      <BottomNavigationBar />
    </div>
  );
}
