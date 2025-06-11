
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, PlusCircle, Trash2, CreditCard as CreditCardIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PaymentMethod {
  id: string;
  type: string; // e.g., "Visa", "Mastercard"
  last4: string;
  expiry: string; // e.g., "08/26"
  isDefault?: boolean;
}

const mockPaymentMethods: PaymentMethod[] = [
  { id: "pm_1", type: "Visa", last4: "1234", expiry: "12/25", isDefault: true },
  { id: "pm_2", type: "Mastercard", last4: "5678", expiry: "08/26" },
];

export default function PaymentMethodsPage() {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  // methodToRemove state is kept for handleRemoveMethod, though dialog display is per-item.
  const [methodToRemove, setMethodToRemove] = useState<PaymentMethod | null>(null);

  const handleAddNewMethod = () => {
    // In a real app, this would open a Stripe Elements form or similar
    toast({
      title: "Add New Payment Method",
      description: "This would typically open a secure form to add card details.",
    });
  };

  const handleRemoveMethod = (methodId: string) => {
    // Simulate API call
    setPaymentMethods(prev => prev.filter(pm => pm.id !== methodId));
    toast({
      title: "Payment Method Removed",
      description: "The selected payment method has been removed.",
    });
    setMethodToRemove(null); // Clear the 'method to remove' state
  };

  const handleSetDefault = (methodId: string) => {
    setPaymentMethods(prev => prev.map(pm => ({...pm, isDefault: pm.id === methodId })));
    toast({
      title: "Default Payment Method Updated",
      description: "The selected payment method is now your default.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-6 md:py-8">
        <div className="flex items-center mb-6">
          <Button variant="outline" size="icon" asChild className="mr-4">
            <Link href="/dashboard/settings">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back to Settings</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold font-headline">Payment Methods</h1>
        </div>

        <Card className="shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="font-headline">Saved Payment Methods</CardTitle>
            <CardDescription>Manage your credit and debit cards.</CardDescription>
          </CardHeader>
          <CardContent>
            {paymentMethods.length === 0 ? (
              <div className="text-center py-8">
                <CreditCardIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                <p className="text-muted-foreground">No payment methods saved yet.</p>
                <p className="text-sm text-muted-foreground">Add a card to make payments easier.</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {paymentMethods.map((method) => (
                  <li key={method.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow bg-muted/20">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <CreditCardIcon className="h-8 w-8 mr-4 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">{method.type} ending in {method.last4}</p>
                        <p className="text-sm text-muted-foreground">Expires {method.expiry} {method.isDefault && <span className="ml-2 text-xs font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full dark:bg-green-700 dark:text-green-100">Default</span>}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
                      {!method.isDefault && (
                         <Button size="sm" onClick={() => handleSetDefault(method.id)} className="flex-1 sm:flex-auto bg-accent text-accent-foreground hover:bg-accent/90">
                           Set as Default
                         </Button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" className="flex-1 sm:flex-auto" onClick={() => setMethodToRemove(method)}>
                            <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Remove
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently remove your {method.type} ending in {method.last4}.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleRemoveMethod(method.id)}>
                                Continue
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-start">
          <Button onClick={handleAddNewMethod} size="lg">
            <PlusCircle className="mr-2 h-5 w-5" /> Add New Payment Method
          </Button>
        </div>
        
      </main>
    </div>
  );
}
