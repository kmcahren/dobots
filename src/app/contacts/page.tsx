
// This page is accessed via the bottom navigation "Contact" icon.
// It's for viewing text messages and links to reports.
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNavigationBar } from "@/components/layout/BottomNavigationBar";
import { FloatingActionButton } from "@/components/layout/FloatingActionButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, MessageSquare, FileText, MoreHorizontal, Search, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock Data for contacts/messages/reports
const mockContactItems = [
  { id: "c1", type: "message", from: "Coach John", preview: "Reminder: Practice tomorrow at 5 PM sharp!", date: "2h ago", unread: true },
  { id: "c2", type: "report", from: "Admin Bot", preview: "Weekly Attendance Report (U12 Soccer) is ready.", date: "Yesterday", unread: false, reportUrl: "/dashboard/reports/123" },
  { id: "c3", type: "message", from: "Sarah M. (Photo Club)", preview: "Great shots from the event! Can you share them?", date: "3 days ago", unread: false },
  { id: "c4", type: "message", from: "Team Fundraising Lead", preview: "Quick update on our fundraising goals for this month.", date: "5 days ago", unread: true },
];

export const metadata = {
  title: 'Contacts & Messages - DOIT',
  description: 'View your messages and shared reports. Manage your contacts.',
};

export default function ContactsPage() {
  const itemsToShow = mockContactItems.slice(0,25);
  return (
     <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-6 md:py-8 mb-16 md:mb-0">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold font-headline">Contacts & Messages</h1>
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-grow sm:flex-grow-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search messages or contacts..." className="pl-9 w-full sm:w-64 h-9" />
                </div>
                <Button asChild size="sm">
                    <Link href="/contacts/new">
                        <PlusCircle className="mr-2 h-4 w-4" /> New Contact
                    </Link>
                </Button>
            </div>
        </div>
        
        {itemsToShow.length === 0 ? (
            <div className="text-center py-16">
                <Users className="mx-auto h-16 w-16 text-muted-foreground opacity-30 mb-4" />
                <h3 className="text-xl font-semibold font-headline text-muted-foreground mb-2">No Messages or Reports</h3>
                <p className="text-muted-foreground">Your contact interactions will appear here.</p>
            </div>
        ) : (
            <div className="space-y-3">
            {itemsToShow.map(item => (
                <Card key={item.id} className={`shadow-sm hover:shadow-md transition-shadow ${item.unread ? 'border-primary border-l-4' : ''}`}>
                    <CardContent className="p-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 flex-grow min-w-0">
                            {item.type === "message" ? <MessageSquare className="h-5 w-5 text-primary flex-shrink-0" /> : <FileText className="h-5 w-5 text-accent flex-shrink-0" />}
                            <div className="flex-grow min-w-0">
                                <p className="font-semibold text-sm truncate">{item.from}</p>
                                <p className="text-xs text-muted-foreground truncate">{item.preview}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end flex-shrink-0 ml-auto text-right space-y-1">
                            <span className="text-[11px] text-muted-foreground">{item.date}</span>
                            {item.type === "report" && item.reportUrl && (
                                <Button variant="outline" size="xs" asChild className="text-accent border-accent hover:bg-accent/10 hover:text-accent">
                                    <Link href={item.reportUrl}>View Report</Link>
                                </Button>
                            )}
                             {item.type === "message" && (
                                <Button variant="outline" size="xs" asChild className="text-primary border-primary hover:bg-primary/10 hover:text-primary">
                                    <Link href={`/contacts/message/${item.id}`}>View</Link>
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
            </div>
        )}

        {mockContactItems.length > 25 && (
            <div className="text-center mt-6">
            <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
                <MoreHorizontal className="mr-2 h-4 w-4" /> Load More
            </Button>
            </div>
        )}
      </main>
      <FloatingActionButton />
      <BottomNavigationBar />
    </div>
  );
}
