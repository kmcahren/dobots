
"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import type { EventItem } from "@/lib/types";
import { CalendarDays, MapPin, Users, MoreHorizontal, CheckCircle2, HelpCircle, XCircle } from "lucide-react";

// Dummy data for now
const mockEvents: EventItem[] = [
  { id: "1", title: "Team Practice Session", startDate: "This Week", endDate: "", location: "Main Community Field", groupName: "U12 Soccer Stars", inviteesCount: 20, attendingMembersCount: 15, cancelledMembersCount: 2, hostName: "Coach John", description: "Focus on passing drills and game strategy. Bring water!", imageUrl: "https://placehold.co/600x400.png", dataAiHint: "soccer practice", hostUserId: "user1" },
  { id: "2", title: "Club Committee Meeting", startDate: "This Week", endDate: "", location: "Town Hall Room 3", groupName: "Photography Club", inviteesCount: 15, attendingMembersCount: 10, cancelledMembersCount: 1, hostName: "Sarah M.", description: "Discuss upcoming exhibition and budget.", imageUrl: "https://placehold.co/600x400.png", dataAiHint: "club meeting", hostUserId: "user2" },
  { id: "3", title: "Championship Game Day", startDate: "Last Week", endDate: "", location: "Away Team Stadium", groupName: "Varsity Basketball Team", inviteesCount: 50, attendingMembersCount: 45, cancelledMembersCount: 0, hostName: "Coach Miller", description: "The big game! Let's bring home the trophy.", hostUserId: "user3" }, // No imageUrl here
  { id: "4", title: "Annual Fundraiser Gala", startDate: "Last Week", endDate: "", location: "Grand Ballroom Downtown", groupName: "Charity Org Volunteers", inviteesCount: 100, attendingMembersCount: 80, cancelledMembersCount: 5, hostName: "Mrs. Gable", description: "Evening of giving and celebration.", imageUrl: "https://placehold.co/600x400.png", dataAiHint: "gala event", hostUserId: "user4" },
  { id: "5", title: "Weekend Coding Workshop", startDate: "Previous Weeks", endDate: "", location: "Tech Hub Co-working", groupName: "Developers United", inviteesCount: 25, attendingMembersCount: 18, cancelledMembersCount: 3, hostName: "Alex P.", description: "Deep dive into new JavaScript frameworks.", hostUserId: "user5" }, // No imageUrl here
];

const groupEventsByTimeframe = (events: EventItem[]) => {
  const grouped: Record<string, EventItem[]> = {
    "This Week": [],
    "Last Week": [],
    "Previous Weeks": [],
  };
  events.forEach(event => {
    // This is a simplified grouping based on the mock 'startDate' value
    if (event.startDate === "This Week") grouped["This Week"].push(event);
    else if (event.startDate === "Last Week") grouped["Last Week"].push(event);
    else grouped["Previous Weeks"].push(event);
  });
  return grouped;
};

export function EventsList() {
  const eventsToShow = mockEvents.slice(0, 25); // Max 25 records
  const groupedEvents = groupEventsByTimeframe(eventsToShow);

  return (
    <div className="space-y-8">
      {Object.entries(groupedEvents).map(([timeframe, eventsInTimeframe]) => (
        eventsInTimeframe.length > 0 && (
          <section key={timeframe}>
            <h2 className="text-2xl font-semibold font-headline mb-4 text-foreground/90">{timeframe}</h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {eventsInTimeframe.map((event) => {
                const totalInvited = event.inviteesCount || 0;
                const attending = event.attendingMembersCount || 0;
                const cancelled = event.cancelledMembersCount || 0;
                const unconfirmed = Math.max(0, totalInvited - attending - cancelled);
                
                return (
                  <Card key={event.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg">
                    {event.imageUrl && (
                       <div className="relative h-48 w-full">
                          <Image src={event.imageUrl} alt={event.title} layout="fill" objectFit="cover" data-ai-hint={event.dataAiHint || "event image"} className="transition-transform duration-300 group-hover:scale-105"/>
                       </div>
                    )}
                    <CardHeader className="pb-3">
                      <CardTitle className="font-headline text-lg leading-tight">{event.title}</CardTitle>
                      <CardDescription className="text-xs">{event.groupName} - Hosted by {event.hostName}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-2 text-sm pb-4">
                      <div className="flex items-center text-muted-foreground">
                        <CalendarDays className="h-4 w-4 mr-2 flex-shrink-0" /> <span>{event.startDate}</span> {/* Simplified display */}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" /> <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground space-x-2 pt-1">
                        <Users className="h-4 w-4 mr-0 flex-shrink-0" />
                        <span>{totalInvited} Invited</span>
                        <span className="text-xs text-muted-foreground/80 font-mono flex items-center">
                          (<CheckCircle2 className="h-3.5 w-3.5 mr-0.5 text-green-600" />{attending}
                          <HelpCircle className="h-3.5 w-3.5 ml-1 mr-0.5 text-gray-500" />{unconfirmed}
                          <XCircle className="h-3.5 w-3.5 ml-1 mr-0.5 text-red-600" />{cancelled})
                        </span>
                      </div>
                      {event.description && <p className="text-muted-foreground line-clamp-2 pt-1">{event.description}</p>}
                    </CardContent>
                    <CardFooter className="bg-muted/30 p-3">
                      <Button asChild variant="default" size="sm" className="w-full">
                        <Link href={`/dashboard/events/${event.id}`}>View Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </section>
        )
      ))}
      {mockEvents.length > 25 && (
        <div className="text-center mt-8">
          <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
            <MoreHorizontal className="mr-2 h-4 w-4" /> Load More Events
          </Button>
        </div>
      )}
      {eventsToShow.length === 0 && (
        <div className="text-center py-16">
            <CalendarDays className="mx-auto h-16 w-16 text-muted-foreground opacity-30 mb-4" />
            <h3 className="text-xl font-semibold font-headline text-muted-foreground mb-2">No Events Yet</h3>
            <p className="text-muted-foreground mb-6">It looks a bit empty here. Why not create your first event?</p>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/dashboard/events/new">Create New Event</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
