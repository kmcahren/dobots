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
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Info, Loader2, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const paymentFormSchema = z.object({
  title: z.string().min(3, "Title is too short.").max(100),
  description: z.string().max(500).optional(),
  price: z.coerce.number().positive("Price must be a positive number."),
  dueDate: z.date().optional(),
  paymentMethodInfo: z.boolean().default(true).optional(), // Represents checkbox for Stripe info
  productOrService: z.string().optional(),
  // TODO: Add recipient selection
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

export function PaymentRequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Pre-fill from query params if available (e.g., from "Add Payment Request" on Event Detail)
  const initialTitle = searchParams.get("title") || "";
  const initialAmount = searchParams.get("amount");

  const defaultValues: Partial<PaymentFormValues> = {
    title: initialTitle,
    price: initialAmount ? parseFloat(initialAmount) : undefined,
    paymentMethodInfo: true,
  };
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (initialTitle) form.setValue("title", initialTitle);
    if (initialAmount) form.setValue("price", parseFloat(initialAmount));
  }, [initialTitle, initialAmount, form]);


  async function onSubmit(data: PaymentFormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Payment Request Submitted:", data);
    
    setIsLoading(false);
    toast({
      title: "Payment Request Sent!",
      description: `Request for "${data.title}" has been sent.`,
    });
    router.push("/dashboard?tab=payments");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="p-6 md:p-8 bg-card rounded-xl shadow-lg border">
            <h2 className="text-2xl font-semibold font-headline mb-6 text-primary">
                Create New Payment Request
            </h2>
            <div className="space-y-6">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                    <Input placeholder="e.g., Team Jersey Fee" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Price (USD)</FormLabel>
                    <FormControl>
                    <Input type="number" placeholder="0.00" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                    <Textarea placeholder="Details about this payment..." {...field} rows={3}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Due Date (Optional)</FormLabel>
                    <Popover>
                    <PopoverTrigger asChild>
                        <FormControl>
                        <Button
                            variant={"outline"}
                            className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                            )}
                        >
                            {field.value ? (
                            format(field.value, "PPP")
                            ) : (
                            <span>Pick a due date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                        initialFocus
                        />
                    </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
                )}
            />
            
            <FormField
              control={form.control}
              name="productOrService"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product/Service (Optional)</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input placeholder="e.g., Small T-Shirt, Basic Membership" {...field} />
                    </FormControl>
                    <Button type="button" variant="outline" size="icon" className="flex-shrink-0">
                        <PlusCircle className="h-4 w-4"/>
                        <span className="sr-only">Add another product/service</span>
                    </Button>
                  </div>
                  <FormDescription>Link to an existing product or service, or describe it here.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
                control={form.control}
                name="paymentMethodInfo"
                render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-muted/20">
                    <FormControl>
                    <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="paymentMethodInfo"
                    />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                    <FormLabel htmlFor="paymentMethodInfo" className="cursor-pointer">
                        Payment Processing via Stripe
                    </FormLabel>
                    <FormDescription>
                        Payments are processed securely by Stripe. Standard processing fees may apply. Ensure your Stripe account is connected in settings. (This is a mock disclaimer)
                    </FormDescription>
                    </div>
                </FormItem>
                )}
            />
            {/* TODO: Add recipient selection similar to event form member selection */}
            </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
           <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Payment Request
          </Button>
        </div>
      </form>
    </Form>
  );
}
