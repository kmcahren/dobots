
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, Save, BellRing, Mail, Smartphone } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface NotificationPreferences {
  eventInvitationsEmail: boolean;
  eventInvitationsPush: boolean;
  eventRemindersEmail: boolean;
  eventRemindersPush: boolean;
  groupMessagesPush: boolean;
  paymentUpdatesEmail: boolean;
  paymentUpdatesPush: boolean;
}

export default function NotificationSettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [prefs, setPrefs] = useState<NotificationPreferences>({
    eventInvitationsEmail: true,
    eventInvitationsPush: true,
    eventRemindersEmail: true,
    eventRemindersPush: false,
    groupMessagesPush: true,
    paymentUpdatesEmail: true,
    paymentUpdatesPush: true,
  });

  const handlePrefChange = (key: keyof NotificationPreferences, value: boolean) => {
    setPrefs(currentPrefs => ({ ...currentPrefs, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast({
      title: "Preferences Saved",
      description: "Your notification settings have been updated.",
    });
    console.log("Notification Preferences:", prefs);
  };

  const renderSwitchSetting = (
    id: keyof NotificationPreferences,
    label: string,
    description: string,
    icon?: React.ReactNode
  ) => (
    <div className="flex items-center justify-between rounded-lg border p-4 hover:shadow-sm transition-shadow bg-muted/20">
      <div className="flex items-start space-x-3">
        {icon && <span className="mt-1 text-primary">{icon}</span>}
        <div className="space-y-0.5">
          <Label htmlFor={id} className="text-base cursor-pointer">{label}</Label>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch
        id={id}
        checked={prefs[id]}
        onCheckedChange={(value) => handlePrefChange(id, value)}
      />
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-6 md:py-8">
        <div className="flex items-center mb-6">
          <Button variant="outline" size="icon" asChild className="mr-4">
            <Link href="/dashboard/settings">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back to Settings</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold font-headline">Notification Preferences</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline flex items-center"><BellRing className="mr-2 h-6 w-6 text-primary"/> Event & Activity Notifications</CardTitle>
              <CardDescription>Choose how you want to be notified about events and activities.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderSwitchSetting(
                "eventInvitationsEmail", 
                "New Event Invitations (Email)", 
                "Receive an email when you're invited to a new event.",
                <Mail className="h-5 w-5" />
              )}
              {renderSwitchSetting(
                "eventInvitationsPush", 
                "New Event Invitations (Push)", 
                "Get a push notification on your device for new event invites.",
                <Smartphone className="h-5 w-5" />
              )}
              {renderSwitchSetting(
                "eventRemindersEmail", 
                "Upcoming Event Reminders (Email)", 
                "Get email reminders for events you're attending.",
                <Mail className="h-5 w-5" />
              )}
              {renderSwitchSetting(
                "eventRemindersPush", 
                "Upcoming Event Reminders (Push)", 
                "Receive push notifications for upcoming event reminders.",
                <Smartphone className="h-5 w-5" />
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline flex items-center"><BellRing className="mr-2 h-6 w-6 text-primary"/> Group Communications</CardTitle>
              <CardDescription>Manage notifications for messages and updates within your groups.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               {renderSwitchSetting(
                "groupMessagesPush", 
                "New Group Messages (Push)", 
                "Get push notifications for new messages in your groups.",
                <Smartphone className="h-5 w-5" />
              )}
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline flex items-center"><BellRing className="mr-2 h-6 w-6 text-primary"/> Payment Notifications</CardTitle>
              <CardDescription>Stay informed about payment requests and status updates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               {renderSwitchSetting(
                "paymentUpdatesEmail", 
                "Payment Updates (Email)", 
                "Receive email notifications for payment requests and status changes.",
                <Mail className="h-5 w-5" />
              )}
                {renderSwitchSetting(
                "paymentUpdatesPush", 
                "Payment Updates (Push)", 
                "Get push notifications for payment requests and status changes.",
                <Smartphone className="h-5 w-5" />
              )}
            </CardContent>
          </Card>


          <div className="flex justify-start mt-8">
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? (
                <BellRing className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Preferences
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
