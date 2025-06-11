
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BellRing, MoreHorizontal, CheckCircle2, AlertCircle, XCircle, HelpCircle, Users, Check, X, ThumbsUp, ThumbsDown } from "lucide-react";
import type { NotificationItem, NotificationUserChoice } from "@/lib/types";
import { ClientSideFormattedDate } from '@/components/utils/ClientSideFormattedDate';
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const initialMockNotifications: NotificationItem[] = [
  {
    id: "n1",
    question: "Confirm attendance for Saturday's practice?",
    description: "Practice is from 9 AM to 11 AM.",
    dueDate: "2024-08-25T00:00:00Z", // Ensure future date for active status demo
    creatorId: "user1",
    status: "active",
    totalRecipientsCount: 20,
    yesResponsesCount: 15,
    noResponsesCount: 2,
    allowComments: true,
    allowMultipleChoice: false,
    hideVotes: false,
    userChoice: 'unconfirmed',
  },
  {
    id: "n2",
    question: "Vote for new team jersey color",
    description: "Options: Blue, Red, Green. Voting ends Friday.",
    dueDate: "2024-08-23T00:00:00Z", // Ensure future date for active status demo
    creatorId: "user2",
    status: "active",
    totalRecipientsCount: 30,
    responsesCount: 22, // Total votes for any option
    allowComments: false,
    allowMultipleChoice: true,
    options: ["Blue", "Red", "Green"],
    hideVotes: true,
    userChoice: 'unconfirmed', // or an array like ['Blue'] if user already voted
  },
  {
    id: "n3",
    question: "Parent Volunteer Signup: Bake Sale",
    description: "We need 5 volunteers for the upcoming bake sale.",
    dueDate: "2024-08-10T00:00:00Z",
    creatorId: "user1",
    status: "closed",
    totalRecipientsCount: 10,
    yesResponsesCount: 5,
    noResponsesCount: 1,
    allowComments: true,
    allowMultipleChoice: false,
    hideVotes: false,
    userChoice: 'yes',
  },
    {
    id: "n4",
    question: "Upcoming Maintenance Window",
    description: "The app will be briefly unavailable for maintenance.",
    creatorId: "admin",
    status: "active", // Informational, no response needed
    totalRecipientsCount: 100,
    userChoice: 'unconfirmed', // N/A for this type, but field exists
  },
];


export function NotificationsList() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialMockNotifications);

  const handleResponse = (notificationId: string, choice: 'yes' | 'no') => {
    setNotifications(prevNotifications =>
      prevNotifications.map(n =>
        n.id === notificationId ? { ...n, userChoice: choice } : n
      )
    );
    toast({
      title: "Response Recorded",
      description: `You responded "${choice.toUpperCase()}" to "${notifications.find(n => n.id === notificationId)?.question}".`,
    });
  };

  // For multiple choice (not fully implemented here for simplicity, but showing the idea)
  const handleMultiChoiceResponse = (notificationId: string, choice: string) => {
     setNotifications(prevNotifications =>
      prevNotifications.map(n =>
        n.id === notificationId ? { ...n, userChoice: [choice] } : n // Example: sets to single choice array
      )
    );
    toast({
      title: "Vote Recorded",
      description: `You voted for "${choice}".`,
    });
  }


  const notificationsToShow = notifications.slice(0, 25);

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
      {notificationsToShow.map((notification) => {
        const totalRecipients = notification.totalRecipientsCount || 0;
        const yesCount = notification.yesResponsesCount || 0;
        const noCount = notification.noResponsesCount || 0;
        // For simple yes/no, unconfirmed can be calculated. For MC, it's different.
        const unconfirmedCount = notification.allowMultipleChoice 
            ? Math.max(0, totalRecipients - (notification.responsesCount || 0))
            : Math.max(0, totalRecipients - yesCount - noCount);

        const isSimpleYesNo = !notification.allowMultipleChoice && !notification.options;

        return (
          <Card key={notification.id} className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="font-headline text-lg">{notification.question}</CardTitle>
                {notification.status === 'active' ?
                  <Badge className="bg-green-600 text-primary-foreground hover:bg-green-600/90 dark:bg-green-500 dark:text-primary-foreground dark:hover:bg-green-500/90"><AlertCircle className="w-3 h-3 mr-1"/> Active</Badge> :
                  <Badge className="bg-gray-500 text-white hover:bg-gray-500/90 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-600/90"><CheckCircle2 className="w-3 h-3 mr-1"/> Closed</Badge>
                }
              </div>
              {notification.description && <CardDescription className="pt-1">{notification.description}</CardDescription>}
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              {notification.dueDate && (
                <p className="text-muted-foreground">
                  Due Date: <ClientSideFormattedDate isoDateString={notification.dueDate} formatString="PPp" />
                </p>
              )}
              <div className="flex items-center text-muted-foreground space-x-1">
                <Users className="h-4 w-4 mr-0 flex-shrink-0" />
                <span className="text-xs">{totalRecipients} Recipients</span>
                {!notification.allowMultipleChoice && (
                 <span className="text-xs text-muted-foreground/80 font-mono flex items-center dark:text-muted-foreground/70">
                    (<CheckCircle2 className="h-3.5 w-3.5 mr-0.5 text-green-600 dark:text-green-400" />{yesCount}
                    <HelpCircle className="h-3.5 w-3.5 ml-1 mr-0.5 text-gray-500 dark:text-gray-400" />{unconfirmedCount}
                    <XCircle className="h-3.5 w-3.5 ml-1 mr-0.5 text-red-600 dark:text-red-400" />{noCount})
                </span>
                )}
                {notification.allowMultipleChoice && notification.responsesCount !== undefined && (
                  <span className="text-xs text-muted-foreground/80 font-mono flex items-center dark:text-muted-foreground/70">({notification.responsesCount} responded, {unconfirmedCount} pending)</span>
                )}
              </div>

              {notification.status === 'active' && (
                <div className="pt-2">
                  {isSimpleYesNo && notification.userChoice === 'unconfirmed' && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="default"
                        className="bg-green-600 hover:bg-green-700 text-white flex-1 sm:flex-auto dark:bg-green-500 dark:hover:bg-green-600" 
                        onClick={() => handleResponse(notification.id, 'yes')}>
                        <ThumbsUp className="mr-2 h-4 w-4" /> Yes
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        className="flex-1 sm:flex-auto" 
                        onClick={() => handleResponse(notification.id, 'no')}>
                        <ThumbsDown className="mr-2 h-4 w-4" /> No
                      </Button>
                    </div>
                  )}
                  {isSimpleYesNo && notification.userChoice === 'yes' && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 text-sm py-1 px-3 dark:bg-green-800/50 dark:text-green-300 dark:hover:bg-green-700/50">
                      <ThumbsUp className="mr-2 h-4 w-4" /> You responded: Yes
                    </Badge>
                  )}
                  {isSimpleYesNo && notification.userChoice === 'no' && (
                    <Badge variant="destructive" className="text-sm py-1 px-3">
                      <ThumbsDown className="mr-2 h-4 w-4" /> You responded: No
                    </Badge>
                  )}
                  {/* Rudimentary multiple choice display */}
                  {notification.allowMultipleChoice && notification.options && notification.userChoice === 'unconfirmed' && (
                    <div className="space-y-2">
                      <p className="font-medium text-foreground">Your vote:</p>
                      <div className="flex flex-wrap gap-2">
                        {notification.options.map(option => (
                          <Button key={option} variant="outline" size="sm" onClick={() => handleMultiChoiceResponse(notification.id, option)}>
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  {notification.allowMultipleChoice && Array.isArray(notification.userChoice) && notification.userChoice.length > 0 && (
                     <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm py-1 px-3 dark:bg-blue-800/50 dark:text-blue-300 dark:hover:bg-blue-700/50">
                      <CheckCircle2 className="mr-2 h-4 w-4" /> You voted: {notification.userChoice.join(', ')}
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
      {notifications.length > 25 && (
        <div className="text-center mt-8">
          <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
             <MoreHorizontal className="mr-2 h-4 w-4" /> Load More Notifications
          </Button>
        </div>
      )}
    </div>
  );
}

