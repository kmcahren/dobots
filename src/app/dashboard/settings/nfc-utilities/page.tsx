"use client";

import { Button } from "@/components/ui/button";
import NfcWriter from "@/components/NfcWriter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useState } from "react"; // Import useState
import { usePathname } from "next/navigation"; // Import usePathname

export default function NfcUtilitiesPage() {
  const [showNfcWriter, setShowNfcWriter] = useState(false);
  const pathname = usePathname();
  const fullNfcUtilityUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}${pathname}` : '';

  const [linkToAnywhere, setLinkToAnywhere] = useState('');
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
          <h1 className="text-2xl font-bold font-headline">Free NFC Utilities</h1>
        </div>

        {/* Add your NFC Utilities content here */}
        <div>
          <p>This page will contain various tools for working with NFC Tags and this App.</p>
          {/* Example: Add components for reading, writing, formatting NFC tags */}
          
          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="linkToAnywhere" className="text-lg font-semibold">Personal Link</Label>
              <Input
                id="linkToAnywhere"
                type="url"
                placeholder="e.g., https://www.instagram.com/dobots.co/ << include the https://"
                value={linkToAnywhere}
                onChange={(e) => setLinkToAnywhere(e.target.value)}
                className="mt-1"
              />
            </div>

 <Button
 className="mt-4 bg-chart-3 hover:bg-chart-3/90 text-primary-foreground"
 onClick={() => setShowNfcWriter(true)}
 disabled={!linkToAnywhere}
 >
 Write Link to NFC Tag
 </Button>

            {showNfcWriter && (
              <div className="mt-4 flex flex-col items-center">
                <NfcWriter dataToWrite={linkToAnywhere} />
              </div>
            )}
          </div>
        </div>

        <div>
          <p><br></br></p>
          <p>More to come...</p>
        </div>

      </main>
    </div>
  );
}