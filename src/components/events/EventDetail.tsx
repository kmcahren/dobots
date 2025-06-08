"use client"; 
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, MapPin, Users, UserCircle, FileText, DollarSign, XCircle, CheckSquare, Link as LinkIcon, Edit } from 'lucide-react';
import Link from 'next/link';
import type { EventItem } from '@/lib/types'; // Assuming EventItem type is defined
import { Badge } from '@/components/ui/badge';

// Dummy data for a single event - replace with actual data fetching
const mockEventData: EventItem = {
  id: "1",
  title: "Annual Summer Soccer Camp",
  description: "Join us for a week of fun, skills development, and friendly matches. Open to all skill levels, ages 8-14. Our experienced coaches will provide top-notch training. Lunch and a camp t-shirt included. Don't miss out on early bird registration discounts!",
  startDate: "2024-07-15T09:00:00Z",
  endDate: "2024-07-19T15:00:00Z",
  location: "Victory Park, Soccer Fields 1 & 2, 123 Champion Lane, Sportsville, ST 54321",
  hostUserId: "coach-jane-doe",
  hostName: "Coach Jane Doe",
  groupName: "Sportsville Youth Soccer League",
  inviteesCount: 75,
  attendingMembersCount: 48,
  registrationFee: 150,
  maxParticipants: 60,
  imageUrl: "https://placehold.co/1200x400.png",
  dataAiHint: "youth soccer camp",
  isUserHost: true, // Assume current user is the host for demo purposes
  isCalendarSynced: false,
  allowComments: true,
  sendInvite: true,
  reminderTiming: '1day',
};

export function EventDetail({ eventId }: { eventId: string }) {
  // In a real app, fetch event by eventId. Using mock data for now.
  const event = mockEventData; 

  const handleCancelEvent = () => {
    // Logic to cancel event
    if(confirm("Are you sure you want to cancel this event? This action cannot be undone.")) {
      alert(`Event "${event.title}" cancellation logic here.`);
      // API call to cancel event
    }
  };

  const handleSyncCalendar = () => {
    // Logic to sync calendar
    alert(`Calendar sync logic for "${event.title}" here.`);
    // Update event.isCalendarSynced state, potentially make API call
    // This is a mock, so we'd toggle it in a real state management solution
    // For demo, we can't directly mutate event.isCalendarSynced here effectively without useState
  };
  
  const formattedStartDate = new Date(event.startDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const formattedStartTime = new Date(event.startDate).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  const formattedEndTime = new Date(event.endDate).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

  return (
    <Card className="overflow-hidden shadow-xl rounded-xl">
      <CardHeader className="p-0 relative">
        <div className="relative h-56 md:h-72">
          <Image src={event.imageUrl!} alt={event.title} layout="fill" objectFit="cover" data-ai-hint={event.dataAiHint} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 md:p-6">
            <Badge variant="secondary" className="mb-2 bg-opacity-80 backdrop-blur-sm">{event.groupName}</Badge>
            <h1 className="text-2xl md:text-4xl font-bold font-headline text-white drop-shadow-lg">{event.title}</h1>
            <p className="text-sm text-gray-200 flex items-center mt-1">
              <Users className="w-4 h-4 mr-1.5 flex-shrink-0" /> {event.attendingMembersCount} Members Attending (Invited: {event.inviteesCount})
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <UserCircle className="w-5 h-5 mr-2 text-primary flex-shrink-0" /> Hosted by <strong className="ml-1 text-foreground">{event.hostName}</strong>
            </div>
            <Button onClick={handleSyncCalendar} variant="outline" size="sm" className="w-full sm:w-auto">
              {event.isCalendarSynced ? <CheckSquare className="mr-2 h-4 w-4 text-green-500" /> : <CalendarDays className="mr-2 h-4 w-4" />}
              {event.isCalendarSynced ? 'Synced' : 'Add to Calendar'}
            </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
          <div className="flex items-start">
            <CalendarDays className="w-5 h-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">Date & Time</p>
              <p className="text-muted-foreground">{formattedStartDate}</p>
              <p className="text-muted-foreground">{formattedStartTime} - {formattedEndTime}</p>
            </div>
          </div>
          <div className="flex items-start">
            <MapPin className="w-5 h-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">Location</p>
              <p className="text-muted-foreground">{event.location}</p>
              <div className="mt-2 w-full h-32 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                <Image src={`https://placehold.co/400x200.png?text=Map+of+${encodeURIComponent(event.location.split(',')[0])}`} alt="Map Placeholder" width={400} height={200} objectFit="cover" data-ai-hint="map location"/>
              </div>
            </div>
          </div>
           {event.registrationFee && event.registrationFee > 0 && (
            <div className="flex items-start">
              <DollarSign className="w-5 h-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">Registration Fee</p>
                <p className="text-muted-foreground">${event.registrationFee.toFixed(2)}</p>
              </div>
            </div>
          )}
          {event.maxParticipants && (
            <div className="flex items-start">
              <Users className="w-5 h-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">Capacity</p>
                <p className="text-muted-foreground">Up to {event.maxParticipants} participants</p>
              </div>
            </div>
          )}
        </div>
        
        {event.description && (
          <div className="pt-4 border-t">
            <div className="flex items-start">
                <FileText className="w-5 h-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div>
                    <p className="font-medium text-foreground">Event Details</p>
                    <p className="text-muted-foreground whitespace-pre-wrap text-sm">{event.description}</p>
                </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 md:p-6 bg-muted/30 border-t flex flex-col sm:flex-row justify-end gap-3">
        <Button variant="outline" asChild className="w-full sm:w-auto">
          <Link href={`/dashboard/payments/new?eventId=${event.id}&title=${encodeURIComponent("Fee for " + event.title)}&amount=${event.registrationFee || ''}`}>
            <DollarSign className="mr-2 h-4 w-4" />
            Request Payment
          </Link>
        </Button>
        {event.isUserHost && (
          <>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href={`/dashboard/events/edit/${event.id}`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Event
              </Link>
            </Button>
            <Button variant="destructive" onClick={handleCancelEvent} className="w-full sm:w-auto">
              <XCircle className="mr-2 h-4 w-4" />
              Cancel Event
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
