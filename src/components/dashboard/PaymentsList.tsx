
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreditCard, CheckCircle, AlertTriangle, MoreHorizontal, CircleDollarSign, XCircle } from "lucide-react"; // Added XCircle
import type { PaymentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns"; // Import format and parseISO

const mockPayments: PaymentItem[] = [
  { id: "p1", title: "U12 Team Jersey Fee", price: 25.00, currency: "USD", status: "paid", requesterId: "user1", createdAt: "2024-08-10T11:00:00Z", dueDate: "2024-08-01" },
  { id: "p2", title: "Club Membership Renewal", price: 50.00, currency: "USD", status: "pending", requesterId: "user2", createdAt: "2024-08-05T15:20:00Z", dueDate: "2024-08-20" },
  { id: "p3", title: "Tournament Entry Fee", price: 100.00, currency: "USD", status: "pending", requesterId: "user1", createdAt: "2024-08-01T08:00:00Z", dueDate: "2024-08-15" },
  { id: "p4", title: "Fundraising Dinner Ticket", price: 75.00, currency: "USD", status: "paid", requesterId: "user3", createdAt: "2024-07-20T18:00:00Z", dueDate: "2024-07-15" },
  { id: "p5", title: "Equipment Damage Fee", price: 30.00, currency: "USD", status: "failed", requesterId: "user4", createdAt: "2024-06-15T10:00:00Z", dueDate: "2024-06-10"},
];

export function PaymentsList() {
  const paymentsToShow = mockPayments.slice(0, 25);

  if (paymentsToShow.length === 0) {
    return (
      <div className="text-center py-16">
        <CreditCard className="mx-auto h-16 w-16 text-muted-foreground opacity-30 mb-4" />
        <h3 className="text-xl font-semibold font-headline text-muted-foreground mb-2">No Payment Requests</h3>
        <p className="text-muted-foreground mb-6">There are no pending or completed payment requests.</p>
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/dashboard/payments/new">Create a Payment Request</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {paymentsToShow.map((payment) => (
        <Card key={payment.id} className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg">
          <CardHeader className="px-4 py-3">
             <div className="flex justify-between items-start">
                <CardTitle className="font-headline text-lg flex items-center">
                    <CircleDollarSign className="h-5 w-5 mr-2 text-primary" />
                    {payment.title}
                </CardTitle>
                <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full flex items-center font-medium",
                    payment.status === 'paid' && "bg-green-600 text-primary-foreground hover:bg-green-600/90 dark:bg-green-500 dark:text-primary-foreground dark:hover:bg-green-500/90",
                    payment.status === 'pending' && "bg-amber-500 text-white dark:bg-amber-600 dark:text-amber-50",
                    payment.status === 'failed' && "bg-destructive text-destructive-foreground",
                    payment.status === 'cancelled' && "bg-gray-500 text-white dark:bg-gray-600 dark:text-gray-100"
                )}>
                    {payment.status === 'paid' && <CheckCircle className="w-3 h-3 mr-1"/>}
                    {payment.status === 'pending' && <AlertTriangle className="w-3 h-3 mr-1"/>}
                    {payment.status === 'failed' && <XCircle className="w-3 h-3 mr-1"/>}
                    {payment.status === 'cancelled' && <XCircle className="w-3 h-3 mr-1"/>}
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </span>
            </div>
            <CardDescription className="pt-1">
              Amount: <span className="font-semibold text-foreground">${payment.price.toFixed(2)} {payment.currency}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 py-3 text-sm space-y-0.5">
            <p className="text-muted-foreground">Requested by: User {payment.requesterId.slice(-3)}</p>
            {payment.dueDate && <p className="text-muted-foreground">Due Date: {format(parseISO(payment.dueDate), 'P')}</p>}
            <p className="text-muted-foreground">Created: {format(parseISO(payment.createdAt), 'P')}</p>
          </CardContent>
          <CardFooter className="bg-muted/30 p-2 dark:bg-muted/20">
            {payment.status === 'pending' ? (
              <Button asChild variant="default" size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-500 dark:hover:bg-green-600">
                {/* Link to payment page - placeholder */}
                <Link href={`/app-payments/pay/${payment.id}`}>Pay Now</Link>
              </Button>
            ) : (
              <Button asChild size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href={`/dashboard/payments/${payment.id}`}>View Details</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
      {mockPayments.length > 25 && (
        <div className="text-center mt-8">
          <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
             <MoreHorizontal className="mr-2 h-4 w-4" /> Load More Payments
          </Button>
        </div>
      )}
    </div>
  );
}
