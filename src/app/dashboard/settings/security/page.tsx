
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Shield, Lock, FileText, LogOut, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SecurityPrivacyPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleChangePassword = () => {
    // This would typically navigate to a change password form or open a modal
    toast({
      title: "Change Password",
      description: "Functionality to change password would be here.",
    });
  };

  const handleLogout = () => {
    // Perform logout logic (e.g., clear session, cookies)
    console.log("User logged out from settings page");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push('/login'); // Redirect to login page
  };

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
          <h1 className="text-2xl font-bold font-headline">Security & Privacy</h1>
        </div>

        <div className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline flex items-center"><Lock className="mr-2 h-6 w-6 text-primary"/> Account Security</CardTitle>
              <CardDescription>Manage your password and account security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" onClick={handleChangePassword} className="w-full sm:w-auto justify-start text-left">
                <Lock className="mr-2 h-4 w-4" /> Change Password
              </Button>
              <div className="p-4 border rounded-lg bg-muted/30">
                <h3 className="font-medium text-foreground mb-1">Two-Factor Authentication (2FA)</h3>
                <p className="text-sm text-muted-foreground">
                  For enhanced security, we recommend enabling Two-Factor Authentication. (This feature is coming soon!)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline flex items-center"><FileText className="mr-2 h-6 w-6 text-primary"/> Legal & Compliance</CardTitle>
              <CardDescription>Review our policies and terms.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <Button variant="link" asChild className="p-0 h-auto justify-start text-base text-primary hover:underline">
                    <Link href="/privacy" target="_blank" rel="noopener noreferrer">
                        Privacy Policy <ExternalLink className="ml-1.5 h-4 w-4"/>
                    </Link>
                </Button>
                <Button variant="link" asChild className="p-0 h-auto justify-start text-base text-primary hover:underline">
                    <Link href="/terms" target="_blank" rel="noopener noreferrer">
                        Terms of Service <ExternalLink className="ml-1.5 h-4 w-4"/>
                    </Link>
                </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-destructive/50">
            <CardHeader>
              <CardTitle className="font-headline flex items-center text-destructive"><LogOut className="mr-2 h-6 w-6"/> Logout</CardTitle>
              <CardDescription>Sign out of your DOIT account on this device.</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full sm:w-auto">
                    <LogOut className="mr-2 h-4 w-4" /> Log Out of Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be returned to the login screen.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>Log Out</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
