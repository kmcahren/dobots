import { EventDetail } from '@/components/events/EventDetail';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

// This function could be used for generating static paths if needed, or for fetching data server-side.
// For now, we assume client-side fetching or mock data within EventDetail.
// export async function generateMetadata({ params }: { params: { id: string } }) {
//   // Fetch event data based on params.id to set dynamic title
//   // const event = await getEventData(params.id);
//   // return { title: `${event?.title || 'Event Details'} - DOIT` };
//   return { title: `Event Details - DOIT` };
// }

export default function EventDetailPage({ params }: { params: { id: string } }) {
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
    </div>
  );
}
