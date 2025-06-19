import { EventForm } from '@/components/events/EventForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'Create New Group/Event',
  description: 'Schedule a new event for your team or club.',
};

export default function NewEventPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-2">
        <Button variant="outline" size="icon" asChild className="mr-4">
          <Link href="/dashboard?tab=events">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back to Events</span>
          </Link>
        </Button>
        {/* Title is now part of the EventForm component */}
      </div>
      <EventForm />
    </div>
  );
}
