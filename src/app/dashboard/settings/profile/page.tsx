
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, UserCircle, CalendarIcon, UploadCloud, Save } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function ProfileSettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState("e,g,, Alex Doe"); // Assuming name is still required
  const [email, setEmail] = useState("e.g., alex.doe@example.com"); // Email is optional for reporting purposes
  const [phone, setPhone] = useState("+1 555-555-0101");
  const [bio, setBio] = useState("e.g., I am not a robot...");
  const [city, setCity] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("https://placehold.co/120x120.png");
  const [calendarSyncEnabled, setCalendarSyncEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePictureUrl(e.target?.result as string || profilePictureUrl);
      };
      reader.readAsDataURL(event.target.files[0]);
      toast({ title: "Profile Picture", description: "Mock picture selected. In a real app, this would upload." });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast({
      title: "Profile Updated",
      description: "Your profile details have been saved.",
    });
    console.log({ name, email, phone, city, bio, profilePictureUrl, calendarSyncEnabled });
  };

  // No explicit validation for email being required in the provided code,
  // so simply removing a hypothetical 'required' attribute from the Input
  // and allowing the state to be an empty string makes it optional from the UI perspective.
  // Backend validation would be needed for true optionality.

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* AppHeader and BottomNavigationBar are part of DashboardLayout */}
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-6 md:py-8">
        <div className="flex items-center mb-6">
          <Button variant="outline" size="icon" asChild className="mr-4">
            <Link href="/dashboard/settings">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back to Settings</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold font-headline">Profile Settings</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6 shadow-lg">
            <CardHeader data-ai-block="cardHeader">
              <CardTitle className="font-headline">Profile Information</CardTitle>
              {/* <CardDescription>Update your personal details and profile picture.</CardDescription> 
              <CardDescription>Update your personal details and profile picture.</CardDescription> */}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                <div className="flex-grow space-y-4 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <Label htmlFor="name">Full Name</Label>
 <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
 </div>
 <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 123-456-7890" /> {/* Consider adding validation for international format */}
                    </div>
                   <div>
                      <Label htmlFor="email">Email Address (Optional)</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" />
 </div>
 <div>
                      <Label htmlFor="city">City (Optional)</Label>
                      <Input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g., Your city" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Short Bio (Optional)</Label>
                <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us a bit about yourself..." rows={3}/>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="calendarSync" className="text-base">Calendar Sync</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically sync your events with your device calendar.
                  </p>
                </div>
                <Switch
                  id="calendarSync"
                  checked={calendarSyncEnabled}
                  onCheckedChange={(checked) => console.log("Calendar Sync:", checked)} // Placeholder for future implementation
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-start">
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? (
                <UserCircle className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Profile
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
