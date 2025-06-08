"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Share2, FileText, MessageCircle, MoreHorizontal } from "lucide-react";
import type { ShareItem } from "@/lib/types";

const mockShares: ShareItem[] = [
  { id: "s1", type: "report", content: "Weekly Event Attendance Summary (Aug 5 - Aug 11)", senderId: "user1", createdAt: "2024-08-12T10:00:00Z", groupId: "g1" },
  { id: "s2", type: "message", content: "Quick reminder: Team photos next Tuesday!", senderId: "user2", createdAt: "2024-08-11T14:30:00Z", recipientId: "userGroup" },
  { id: "s3", type: "report", content: "Q3 Financial Overview for Fundraising", senderId: "user3", createdAt: "2024-08-10T09:15:00Z", groupId: "g2" },
];

export function SharesList() {
  const sharesToShow = mockShares.slice(0, 25);

  if (sharesToShow.length === 0) {
    return (
      <div className="text-center py-16">
        <Share2 className="mx-auto h-16 w-16 text-muted-foreground opacity-30 mb-4" />
        <h3 className="text-xl font-semibold font-headline text-muted-foreground mb-2">No Shares Yet</h3>
        <p className="text-muted-foreground mb-6">Nothing has been shared with you or by you recently.</p>
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/dashboard/shares/new">Create a Share or Report</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sharesToShow.map((share) => (
        <Card key={share.id} className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="font-headline text-lg flex items-center">
                {share.type === 'report' ? <FileText className="h-5 w-5 mr-2 text-primary" /> : <MessageCircle className="h-5 w-5 mr-2 text-primary" />}
                {share.type === 'report' ? "Report Shared" : "Message Shared"}
              </CardTitle>
              <span className="text-xs text-muted-foreground">{new Date(share.createdAt).toLocaleDateString()}</span>
            </div>
            <CardDescription className="pt-1 line-clamp-2">{share.content}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="text-muted-foreground">From: User {share.senderId.slice(-3)} {/* Placeholder for sender name */}</p>
            {share.groupId && <p className="text-muted-foreground">Group: Group {share.groupId.slice(-2)}</p>}
            {share.recipientId && <p className="text-muted-foreground">To: User {share.recipientId.slice(-3)}</p>}
          </CardContent>
          <CardFooter className="bg-muted/30 p-3">
            <Button asChild variant="default" size="sm" className="w-full">
              {/* Link to view share details - placeholder */}
              <Link href={`/dashboard/shares/${share.id}`}>View Share</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
      {mockShares.length > 25 && (
        <div className="text-center mt-8">
          <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
             <MoreHorizontal className="mr-2 h-4 w-4" /> Load More Shares
          </Button>
        </div>
      )}
    </div>
  );
}
