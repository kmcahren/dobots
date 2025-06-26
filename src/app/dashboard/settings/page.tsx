
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNavigationBar } from "@/components/layout/BottomNavigationBar";
import { FloatingActionButton } from "@/components/layout/FloatingActionButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, User, Bell, CreditCardIcon, Shield, Cog } from "lucide-react";


export const metadata = {
  title: 'Settings - Do)))',
  description: 'Manage your account and application settings.',
};

export default function SettingsPage() {
  const settingsOptions = [
    { title: "Profile", description: "Update personal info and preferences.", icon: User, href: "/dashboard/settings/profile" },
    { title: "Notifications", description: "Manage how and when you receive notifications.", icon: Bell, href: "/dashboard/settings/notifications" },
    { title: "Payment Methods", description: "Add or remove payment details.", icon: CreditCardIcon, href: "/dashboard/settings/payment-methods" },
    { title: "Payment Groups", description: "Create  a POS Store for Products & Services", icon: CreditCardIcon, href: "/dashboard/settings/payment-groups" },
    { title: "Optimized Checkin", description: "Designed for experienced NFC users to do quick checkins.", icon: User, href: "/optimizedcheckin" },
    { title: "Free NFC Utilities", description: "Access tools for working with NFC tags.", icon: Cog, href: "/dashboard/settings/nfc-utilities" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* AppHeader and BottomNavigationBar are part of DashboardLayout or individual page layout */}
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-6 md:py-8">
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
            <Card key={option.title} className="hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card rounded-xl border">
              <CardHeader className="flex flex-row items-center space-x-4 pb-3 pt-5">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <option.icon className="w-6 h-6 text-primary"/>
                </div>
                <div>
                  <CardTitle className="font-headline text-lg">{option.title}</CardTitle>
                  <CardDescription className="text-xs leading-snug">{option.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-2 pb-4 px-5">
                <Button variant="outline" asChild className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10 hover:text-primary">
                  <Link href={option.href}>Manage {option.title}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="mt-8 shadow-lg rounded-xl border">
          <CardHeader className="flex flex-row items-center space-x-4 pb-3 pt-5">
            <div className="p-3 bg-muted rounded-lg">
              <Cog className="w-6 h-6 text-muted-foreground"/>
            </div>
            <div>
              <CardTitle className="font-headline text-lg">Admin Configuration</CardTitle>
              <CardDescription className="text-xs leading-snug">For app administrators: manage setup items, field choices, and payment processor plugins.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-2 pb-4 px-5">
            <p className="text-sm text-muted-foreground mb-3">This section is restricted to users with administrative privileges.</p>
            <Button variant="secondary" asChild>
                <Link href="/dashboard/settings/admin-config">Configure Settings</Link>
            </Button>
          </CardContent>
        </Card>

      </main>
      {/* FloatingActionButton and BottomNavigationBar are rendered by parent layout or globally */}
    </div>
  );
}
