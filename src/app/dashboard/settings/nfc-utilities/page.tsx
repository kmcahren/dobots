"use client";

import { Button } from "@/components/ui/button";
import NfcWriter from "@/components/NfcWriter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react"; // Import useState and useEffect
import { usePathname, useRouter } from "next/navigation"; // Import usePathname
import { Textarea } from "@/components/ui/textarea";


export default function NfcUtilitiesPage() {
  const [showNfcWriter, setShowNfcWriter] = useState(false);
  const pathname = usePathname();
  const fullNfcUtilityUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}${pathname}` : '';

  const [linkToAnywhere, setLinkToAnywhere] = useState('');
  // State variable for open events
  const [isLoadingEvents, setIsLoadingEvents] = useState(true); // Initially loading
  const [errorFetchingEvents, setErrorFetchingEvents] = useState<any>(null); // Initially null

  const [openEvents, setOpenEvents] = useState([]); // Initially empty or with placeholder data
  // State variables for Event Invitations
  const [invitationTitle, setInvitationTitle] = useState('');
  const [invitationDescription, setInvitationDescription] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<string | number | null>(null); // Or your event ID type

  const router = useRouter();

  const handlePreviewAndSend = () => {
    const queryParams = new URLSearchParams({
      title: invitationTitle,
      description: invitationDescription,
      eventId: selectedEventId?.toString() || '', // Ensure eventId is a string
    }).toString();
    router.push(`/dashboard/reports/event-invitations?${queryParams}`);
  };

  // Effect to fetch open events
  useEffect(() => {
    const fetchOpenEvents = async () => {
      try {
        setIsLoadingEvents(true);
        setErrorFetchingEvents(null);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

        // Simulate a successful API response with sample data
        const simulatedData = [
          { id: 'event-1', name: 'Team Meeting Q3' },
          { id: 'event-2', name: 'Product Workshop' },
          { id: 'event-3', name: 'Company Gathering' },
        ];

        const data = simulatedData;
        setOpenEvents(data);

      } catch (error) {
        console.error("Error fetching open events:", error);
        setErrorFetchingEvents(error);
        setOpenEvents([]); // Clear events on error
      } finally {
        setIsLoadingEvents(false);
      }
    };

    fetchOpenEvents();
  }, []); // Empty dependency array means this effect runs only once on mount
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-6 md:py-8">
        <div className="flex items-center mb-6">
          <Button variant="outline" size="icon" className="mr-4">
            <Link href="/dashboard/settings">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back to Settings</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold font-headline">Free NFC Utilities</h1>
        </div>

        {/* Personal Link Section */}
        <div className="border rounded-lg p-6 mb-6 bg-card">
          
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
 onClick={() => setShowNfcWriter(true)} // Keep existing onClick for now
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

        {/* Event Invitations Section */}
        <div className="border rounded-lg p-6 mb-6 bg-card">
          <h2 className="text-xl font-semibold font-headline mb-4">Event Invitations</h2>
          <div className="space-y-4">
            {/* Title Field */}
            <div>
              <Label htmlFor="eventInvitationTitle" className="font-medium">Title</Label>
              <Input
                id="eventInvitationTitle"
                type="text"
                placeholder="e.g., You're Invited!"
                value={invitationTitle}
                onChange={(e) => setInvitationTitle(e.target.value)}
                className="mt-1 border border-gray-300 bg-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-200 w-auto"
              />
            </div>
            {/* Description Field */}
            <div className="mt-4">
              <Label htmlFor="eventInvitationDescription" className="font-medium">Description</Label>
              <Textarea
                id="eventInvitationDescription"
                value={invitationDescription}
                onChange={(e) => setInvitationDescription(e.target.value)}
                placeholder="Add a personalized message for the invitation."
                className="mt-1 border border-gray-300 bg-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            {/* Placeholder */}
            <div className="mt-4 relative"> {/* Added relative for potential absolute positioning of loading/error */}
              <Label className="font-medium">Select Event</Label>
              {isLoadingEvents && (
                <div className="mt-1 text-sm text-muted-foreground">Loading events...</div>
              )}
              {errorFetchingEvents && (
                <div className="mt-1 text-sm text-red-500">Error loading events: {errorFetchingEvents.message}</div>
              )}
              {!isLoadingEvents && !errorFetchingEvents && (
                <select
                  className="mt-1 border border-gray-300 bg-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-200 w-auto rounded-md px-3 py-2 text-sm text-muted-foreground"
                  value={selectedEventId || ''}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  disabled={openEvents.length === 0} // Disable if no events
                >
                  <option value="">-- Select an Event --</option>
                  {openEvents.map((event: any) => ( // Added any for type safety, adjust as needed
                    <option key={event.id} value={event.id}>{event.name}</option>
                  ))}
                </select>
              )}
              
            </div>
            <Button
  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white w-auto"
  onClick={handlePreviewAndSend}
  disabled={!invitationTitle || !invitationDescription || selectedEventId === null}
>
  Preview and Send This Invitation
</Button>

          </div>
        </div>

        {/* Test Reports Section */}
        <div className="border rounded-lg p-6 mb-6 bg-card">
          <p><br></br></p>
          <div className="mt-6">
            <h2 className="text-xl font-semibold font-headline">Test Reports</h2>
            <ul className="mt-2">
              <li>
                <Link href="/dashboard/reports/event-attendance-summary" className="text-primary hover:underline">Event Attendance Summary</Link>
              </li>
               <li>
                <Link href="/dashboard/reports/payment-status-report" className="text-primary hover:underline">
                  Payment Status Report
                </Link>
              </li>
            </ul>
          </div>
          <p>More to come...</p>
        </div>

      </main>
    </div>
  );
}