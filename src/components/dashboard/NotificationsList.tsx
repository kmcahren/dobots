"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BellRing, MessageSquareText, PieChart, MoreHorizontal, CheckCircle2, AlertCircle } from "lucide-react"; // Using MessageSquareText for survey-like nature
import type { NotificationItem } from "@/lib/types";

const mockNotifications: NotificationItem[] = [
  { id: "n1", question: "Confirm attendance for Saturday's practice?", description: "Practice is from 9 AM to 11 AM.", dueDate: "2024-08-15", creatorId: "user1", status: "active", responsesCount: 15, allowComments: true, allowMultipleChoice: false, hideVotes: false },
  { id: "n2", question: "Vote for new team jersey color", description: "Options: Blue, Red, Green. Voting ends Friday.", dueDate: "2024-08-12", creatorId: "user2", status: "active", responsesCount: 22, allowComments: false, allowMultipleChoice: true, hideVotes: true },
  { id: "n3", question: "Parent Volunteer Signup: Bake Sale", description: "We need 5 volunteers for the upcoming bake sale.", dueDate: "2024-08-10", creatorId: "user1", status: "closed", responsesCount: 5, allowComments: true, allowMultipleChoice: false, hideVotes: false },
];


export function NotificationsList() {
  const notificationsToShow = mockNotifications.slice(0, 25);

  if (notificationsToShow.length === 0) {
    return (
      <div className="text-center py-16">
        <BellRing className="mx-auto h-16 w-16 text-muted-foreground opacity-30 mb-4" />
        <h3 className="text-xl font-semibold font-headline text-muted-foreground mb-2">No Notifications</h3>
        <p className="text-muted-foreground mb-6">You have no new notifications or surveys at the moment.</p>
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/dashboard/notifications/new">Create a Notification</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {notificationsToShow.map((notification) => (
        <Card key={notification.id} className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="font-headline text-lg">{notification.question}</CardTitle>
              {notification.status === 'active' ? 
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center"><AlertCircle className="w-3 h-3 mr-1"/> Active</span> : 
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> Closed</span>
              }
            </div>
            {notification.description && <CardDescription className="pt-1">{notification.description}</CardDescription>}
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            {notification.dueDate && <p className="text-muted-foreground">Due Date: {new Date(notification.dueDate).toLocaleDateString()}</p>}
             <div className="flex items-center text-muted-foreground">
                <PieChart className="h-4 w-4 mr-2 flex-shrink-0" /> <span>{notification.responsesCount || 0} Responses</span>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 p-3">
            <Button asChild variant="default" size="sm" className="w-full">
              {/* Link to view/respond to notification - placeholder */}
              <Link href={`/dashboard/notifications/${notification.id}`}>View & Respond</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
      {mockNotifications.length > 25 && (
        <div className="text-center mt-8">
          <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
             <MoreHorizontal className="mr-2 h-4 w-4" /> Load More Notifications
          </Button>
        </div>
      )}
    </div>
  );
}
