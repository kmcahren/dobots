"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Settings, LogOut, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // For logout redirect

export function AppHeader() {
  const router = useRouter();
  // These would come from auth/state in a real application
  const isLoggedIn = true; // Assume user is logged in for dashboard header
  const userName = "User Name"; // Placeholder

  const handleLogout = () => {
    // Perform logout logic (e.g., clear session, cookies)
    console.log("User logged out");
    router.push('/login'); // Redirect to login page
  };

  return (
    <header className="bg-card shadow-sm sticky top-0 z-30 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Image 
              src="https://placehold.co/40x40.png" // Replace with actual logo
              alt="DOIT Logo" 
              width={36} 
              height={36} 
              className="rounded-lg"
              data-ai-hint="app logo"
            />
            <span className="text-xl font-bold font-headline text-primary">DOIT</span>
          </Link>
          
          {isLoggedIn && (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard/settings"> {/* Placeholder for settings */}
                  <Settings className="h-5 w-5 text-muted-foreground hover:text-primary" />
                  <span className="sr-only">Settings</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5 text-muted-foreground hover:text-destructive" />
                <span className="sr-only">Logout</span>
              </Button>
               <Button variant="ghost" className="px-2 py-1 h-auto md:hidden" asChild>
                 <Link href="/dashboard/profile"> {/* Mobile profile quick access */}
                    <UserCircle className="h-6 w-6 text-muted-foreground hover:text-primary" />
                    <span className="sr-only">Profile</span>
                 </Link>
               </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
