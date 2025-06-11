
"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import type { EventItem, RsvpStatus } from "@/lib/types";
import { CalendarDays, MapPin, Users, MoreHorizontal, CheckCircle2, HelpCircle, XCircle, Check, X, ThumbsUp, ThumbsDown } from "lucide-react";
import { parseISO, format, isThisWeek, isPast, startOfWeek, endOfWeek, subWeeks, isWithinInterval, isFuture } from "date-fns";
import { Badge } from "@/components/ui/badge";

const getMockDateString = (daysOffset: number, hour: number = 10): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
};

// Dummy data - ensure isUserHost and currentUserRsvpStatus are included
const mockEvents: EventItem[] = [
  { id: "1", title: "Team Practice Session", startDate: getMockDateString(1, 10), endDate: getMockDateString(1, 12), location: "Main Community Field, Sportsville", groupName: "U12 Soccer Stars", inviteesCount: 20, attendingMembersCount: 15, cancelledMembersCount: 2, hostName: "Coach John", description: "Focus on passing drills and game strategy.", imageUrl: "https://placehold.co/600x400.png", dataAiHint: "soccer practice", hostUserId: "user1", isUserHost: false, currentUserRsvpStatus: 'unconfirmed' },
  { id: "2", title: "Club Committee Meeting", startDate: getMockDateString(0, 14), endDate: getMockDateString(0, 15), location: "Town Hall Room 3, Downtown", groupName: "Photography Club", inviteesCount: 15, attendingMembersCount: 10, cancelledMembersCount: 1, hostName: "Sarah M.", description: "Discuss upcoming exhibition and budget.", hostUserId: "user2", isUserHost: true, currentUserRsvpStatus: 'unconfirmed' },
  { id: "3", title: "Championship Game Day", startDate: getMockDateString(-7, 15), endDate: getMockDateString(-7, 17), location: "Away Team Stadium, Rival Town", groupName: "Varsity Basketball Team", inviteesCount: 50, attendingMembersCount: 45, cancelledMembersCount: 0, hostName: "Coach Miller", description: "The big game! Let's bring home the trophy.", hostUserId: "user3", isUserHost: false, currentUserRsvpStatus: 'attending' },
  { id: "4", title: "Annual Fundraiser Gala", startDate: getMockDateString(-10, 18), endDate: getMockDateString(-10, 22), location: "Grand Ballroom Downtown, Metro City", groupName: "Charity Org Volunteers", inviteesCount: 100, attendingMembersCount: 80, cancelledMembersCount: 5, hostName: "Mrs. Gable", description: "Evening of giving and celebration.", imageUrl: "https://placehold.co/600x400.png", dataAiHint: "gala event", hostUserId: "user4", isUserHost: false, currentUserRsvpStatus: 'declined' },
  { id: "5", title: "Weekend Coding Workshop", startDate: getMockDateString(-20, 9), endDate: getMockDateString(-18, 17), location: "Tech Hub Co-working, Innovation Drive", groupName: "Developers United", inviteesCount: 25, attendingMembersCount: 18, cancelledMembersCount: 3, hostName: "Alex P.", description: "Deep dive into new JavaScript frameworks.", hostUserId: "user5", isUserHost: true, currentUserRsvpStatus: 'unconfirmed' },
];

const groupEventsByTimeframe = (events: EventItem[]) => {
  const grouped: Record<string, EventItem[]> = {
    "This Week": [],
    "Last Week": [],
    "Previous Weeks": [],
    "Upcoming": [], 
  };
  const now = new Date();
  const startOfThisWeekMonday = startOfWeek(now, { weekStartsOn: 1 });

  events.forEach(event => {
    if (!event.startDate) return;
    const eventDate = parseISO(event.startDate);

    if (isThisWeek(eventDate, { weekStartsOn: 1 })) {
      grouped["This Week"].push(event);
    } else if (isPast(eventDate)) {
      const startOfLastWeekMonday = subWeeks(startOfThisWeekMonday, 1);
      const endOfLastWeekSunday = endOfWeek(startOfLastWeekMonday, { weekStartsOn: 1 });
      if (isWithinInterval(eventDate, { start: startOfLastWeekMonday, end: endOfLastWeekSunday })) {
        grouped["Last Week"].push(event);
      } else if (eventDate < startOfLastWeekMonday) {
        grouped["Previous Weeks"].push(event);
      } else { 
        grouped["Previous Weeks"].push(event);
      }
    }
     else if (isFuture(eventDate)) { 
       grouped["Upcoming"].push(event);
     }
  });
  // Sort events within each group by date, most recent first for past, soonest first for upcoming/this week
  for (const key in grouped) {
    if (key === "Upcoming" || key === "This Week") {
        grouped[key].sort((a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime());
    } else {
        grouped[key].sort((a, b) => parseISO(b.startDate).getTime() - parseISO(a.startDate).getTime());
    }
  }
  return grouped;
};

const handleRsvpClick = (action: 'confirm' | 'decline', eventTitle: string) => {
  alert(`RSVP action: ${action} for event "${eventTitle}". This would update backend in a real app.`);
};


export function EventsList() {
  const eventsToShow = mockEvents.slice(0, 25); 
  const groupedEvents = groupEventsByTimeframe(eventsToShow);

  const timeframesOrder = ["Upcoming", "This Week", "Last Week", "Previous Weeks"];

  return (
    <div className="space-y-8">
      {timeframesOrder.map(timeframe => {
        const eventsInTimeframe = groupedEvents[timeframe];
        if (!eventsInTimeframe || eventsInTimeframe.length === 0) return null;

        return (
          <section key={timeframe}>
            <h2 className="text-2xl font-semibold font-headline mb-4 text-foreground/90">{timeframe}</h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {eventsInTimeframe.map((event) => {
                const totalInvited = event.inviteesCount || 0;
                const attending = event.attendingMembersCount || 0;
                const cancelled = event.cancelledMembersCount || 0;
                const unconfirmed = Math.max(0, totalInvited - attending - cancelled);
                const displayDate = event.startDate ? format(parseISO(event.startDate), "MMM d, h:mm a") : "Date TBD";
                const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;
                
                return (
                  <Card key={event.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg group">
                    {event.imageUrl && (
                       <div className="relative h-48 w-full">
                          <Image src={event.imageUrl} alt={event.title} layout="fill" objectFit="cover" data-ai-hint={event.dataAiHint || "event image"} className="transition-transform duration-300 group-hover:scale-105"/>
                       </div>
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-grow">
                            <CardTitle className="font-headline text-lg leading-tight group-hover:text-primary transition-colors">
                                <Link href={`/dashboard/events/${event.id}`} className="hover:underline focus:outline-none focus:ring-1 focus:ring-primary rounded-sm">
                                    {event.title}
                                </Link>
                            </CardTitle>
                            <CardDescription className="text-xs">{event.groupName} - Hosted by {event.hostName}</CardDescription>
                        </div>
                        {/* RSVP Badges */}
                        {!event.isUserHost && event.currentUserRsvpStatus === 'attending' && (
                            <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-white dark:text-primary-foreground dark:bg-green-500 dark:hover:bg-green-600 text-xs flex-shrink-0 h-7 px-2"><ThumbsUp className="mr-1 h-3 w-3"/> Attending</Badge>
                        )}
                        {!event.isUserHost && event.currentUserRsvpStatus === 'declined' && (
                            <Badge variant="destructive" className="text-xs flex-shrink-0 h-7 px-2"><ThumbsDown className="mr-1 h-3 w-3"/> Declined</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-2 text-sm pb-4">
                      <div className="flex items-center text-muted-foreground">
                        <CalendarDays className="h-4 w-4 mr-2 flex-shrink-0" /> <span>{displayDate}</span>
                      </div>
                      <div className="flex items-start text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" /> 
                        <span className="flex-grow">{event.location} 
                          <a 
                            href={mapUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="ml-1 text-primary hover:underline text-xs"
                            onClick={(e) => e.stopPropagation()} 
                          >
                            (map)
                          </a>
                        </span>
                      </div>
                      <div className="flex items-center text-muted-foreground space-x-1 pt-1">
                        <Users className="h-4 w-4 mr-0 flex-shrink-0" />
                        <span className="text-xs">{totalInvited} Invited</span>
                        <span className="text-xs text-muted-foreground/80 font-mono flex items-center dark:text-muted-foreground/70">
                          (<CheckCircle2 className="h-3.5 w-3.5 mr-0.5 text-green-600 dark:text-green-400" />{attending}
                          <HelpCircle className="h-3.5 w-3.5 ml-1 mr-0.5 text-gray-500 dark:text-gray-400" />{unconfirmed}
                          <XCircle className="h-3.5 w-3.5 ml-1 mr-0.5 text-red-600 dark:text-red-400" />{cancelled})
                        </span>
                      </div>
                      {event.description && <p className="text-muted-foreground line-clamp-2 pt-1">{event.description}</p>}
                    </CardContent>
                    <CardFooter className="bg-muted/30 p-3 dark:bg-muted/20">
                        { !event.isUserHost && event.currentUserRsvpStatus === 'unconfirmed' ? (
                            <div className="flex items-center gap-2 w-full">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="bg-green-50 hover:bg-green-100 border-green-300 text-green-700 dark:bg-green-700/30 dark:hover:bg-green-700/50 dark:border-green-500/50 dark:text-green-300"
                                    onClick={() => handleRsvpClick('confirm', event.title)}
                                    title="Confirm Attendance"
                                >
                                    <Check className="h-4 w-4 mr-1.5" /> Confirm
                                </Button>
                                <Button asChild variant="default" size="sm" className="flex-grow">
                                    <Link href={`/dashboard/events/${event.id}`}>Details</Link>
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="bg-red-50 hover:bg-red-100 border-red-300 text-red-700 dark:bg-red-700/30 dark:hover:bg-red-700/50 dark:border-red-500/50 dark:text-red-300"
                                    onClick={() => handleRsvpClick('decline', event.title)}
                                    title="Decline Attendance"
                                >
                                    <X className="h-4 w-4 mr-1.5" /> Decline
                                </Button>
                            </div>
                        ) : (
                            <Button asChild variant="default" size="sm" className="w-full">
                            <Link href={`/dashboard/events/${event.id}`}>View Details</Link>
                            </Button>
                        )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </section>
        )
      })}
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

