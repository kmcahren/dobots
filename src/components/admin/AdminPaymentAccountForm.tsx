
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Banknote, Save, Loader2 } from "lucide-react";

const paymentAccountSchema = z.object({
  accountNickname: z.string().min(2, "Nickname must be at least 2 characters.").max(50),
  accountHolderName: z.string().min(2, "Account holder name is required.").max(100),
  paymentInstructions: z.string().max(1000, "Instructions are too long.").optional(),
});

type PaymentAccountFormValues = z.infer<typeof paymentAccountSchema>;

const defaultValues: Partial<PaymentAccountFormValues> = {
  accountNickname: "",
  accountHolderName: "",
  paymentInstructions: "",
};

export function AdminPaymentAccountForm() {
  const form = useForm<PaymentAccountFormValues>({
    resolver: zodResolver(paymentAccountSchema),
    defaultValues,
  });
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<PaymentAccountFormValues | null>(null); // To display current saved config

  // In a real app, you'd fetch currentConfig in useEffect
  // For demo, we'll just set it on successful submit
  // useEffect(() => { /* fetch config */ }, []);

  async function onSubmit(data: PaymentAccountFormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Payment Account Config Submitted:", data);
    setCurrentConfig(data); // Simulate saving and re-fetching
    setIsLoading(false);
    toast({
      title: "Payment Account Updated",
      description: "Recipient payment account details have been saved.",
    });
  }

  return (
    <Card className="shadow-lg rounded-xl border">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center">
          <Banknote className="mr-3 h-6 w-6 text-primary" />
          Recipient Payment Account Setup
        </CardTitle>
        <CardDescription>
          Configure the primary account for receiving payments (e.g., club dues, event fees).
          This information may be displayed to users when they make payments.
          Do NOT enter sensitive bank account numbers or private API keys here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="accountNickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Nickname</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Club Main Account, U12 Team Fund" {...field} />
                  </FormControl>
                  <FormDescription>A friendly name for this payment destination.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Official Account Holder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., DOIT Club Treasurer, Sportsville Youth League" {...field} />
                  </FormControl>
                  <FormDescription>The name that payments should be made out to, if applicable.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Instructions / Public Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., For Zelle, use phone: 555-1234. For checks, mail to PO Box 123. Include player name in memo."
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide any public instructions or notes for users making payments (e.g., how to reference their payment, alternative methods).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Payment Settings
              </Button>
            </div>
          </form>
        </Form>
        {currentConfig && (
            <div className="mt-6 p-4 border-t border-dashed">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Current Saved Configuration:</h3>
                <p className="text-xs"><strong>Nickname:</strong> {currentConfig.accountNickname}</p>
                <p className="text-xs"><strong>Holder:</strong> {currentConfig.accountHolderName}</p>
                <p className="text-xs"><strong>Instructions:</strong> {currentConfig.paymentInstructions || "N/A"}</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
