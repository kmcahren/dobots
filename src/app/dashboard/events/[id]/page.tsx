"use client";
import { EventDetail } from '@/components/events/EventDetail';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { QRCodeCanvas } from 'qrcode.react';
import { usePathname } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import NfcWriter from '@/components/NfcWriter';
import { useState } from 'react'; // Import useState
import { ChevronLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

// This function could be used for generating static paths if needed, or for fetching data server-side.
// For now, we assume client-side fetching or mock data within EventDetail.
// export async function generateMetadata({ params }: { params: { id: string } }) {
//   // Fetch event data based on params.id to set dynamic title
//   // const event = await getEventData(params.id);
//   // return { title: `${event?.title || 'Event Details'} - DOIT` };
//   return { title: `Event Details - DOIT` };
// }

export default function EventDetailPage({ params }: { params: { id: string } }) {

  const pathname = usePathname();
  const [showNfcWriter, setShowNfcWriter] = useState(false);
  const fullEventUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}${pathname}` : '';
  const { toast } = useToast();
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="outline" size="icon" asChild className="mr-4">
          <Link href="/dashboard?tab=events"> {/* Or history.back() if preferred for SPA-like feel */}
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back to Events</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold font-headline">Event Details</h1>
      </div>
      <EventDetail eventId={params.id} />

      {/* QR Code for Sharing */}
      {fullEventUrl && (
        <div className="mt-8 flex flex-col items-center">
          <h3 className="text-xl font-semibold font-headline mb-4 text-foreground">Share This Event</h3>
          <QRCodeCanvas value={fullEventUrl} size={256} level="H" />
        </div>
      )}

      {/* Button to Copy Link */}
      {fullEventUrl && (
        <div className="mt-4 flex justify-center">
          <Button className="mt-4" onClick={() => { navigator.clipboard.writeText(fullEventUrl); toast({ title: "Event link copied to clipboard!" }); }} disabled={!fullEventUrl}>Copy Link to Clipboard</Button>
        </div>
      )}

      {/* Button to Write on NFC Tag */}
      {fullEventUrl && (
        <div className="mt-4 flex justify-center">
          <Button className="mt-4 bg-chart-3 hover:bg-chart-3/90 text-primary-foreground" onClick={() => setShowNfcWriter(!showNfcWriter)}>
            Write Link on NFC Tag
          </Button>
        </div>
      )}

      {/* NFC Writer Component */}
      {showNfcWriter && fullEventUrl && (
        <div className="mt-4 flex flex-col items-center">
          <h3 className="text-xl font-semibold font-headline mb-4 text-foreground">Write to NFC Tag</h3>
          <NfcWriter dataToWrite={fullEventUrl} />
        </div>
      )}

      <div className="mt-8 text-center">
        <Button asChild variant="outline">
          <Link href="/dashboard?tab=events">Back to Events List</Link>
        </Button>
      </div>

    </div>
  );
}
