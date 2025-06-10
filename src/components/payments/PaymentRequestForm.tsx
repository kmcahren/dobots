
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
import { CalendarIcon, Info, Loader2, PlusCircle, Users, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for groups and contacts
const mockContacts = [
  { id: "user1", name: "Alice Smith", groupAffiliation: "U12 Soccer" },
  { id: "user2", name: "Bob Johnson", groupAffiliation: "Photo Club" },
  { id: "user3", name: "Charlie Brown", groupAffiliation: "U12 Soccer" },
  { id: "user4", name: "Diana Prince", groupAffiliation: "Dev Team" },
  { id: "user5", name: "Edward Forte", groupAffiliation: "Book Club" },
];

const mockGroups = [
  { id: "group1", name: "U12 Soccer Stars" },
  { id: "group2", name: "Photography Club Committee" },
  { id: "group3", name: "Dev Team Leads" },
];

const paymentFormSchema = z.object({
  title: z.string().min(3, "Title is too short.").max(100),
  description: z.string().max(500).optional(),
  price: z.coerce.number().positive("Price must be a positive number."),
  dueDate: z.date().optional(),
  paymentMethodInfo: z.boolean().default(true).optional(),
  productOrService: z.string().optional(),
  targetType: z.enum(["group", "contacts"], {
    required_error: "Please select who to send this request to.",
  }),
  targetGroupId: z.string().optional(),
  selectedContactIds: z.array(z.string()).optional(),
}).superRefine((data, ctx) => {
  if (data.targetType === "group" && !data.targetGroupId) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please select a group.",
      path: ["targetGroupId"],
    });
  }
  if (data.targetType === "contacts" && (!data.selectedContactIds || data.selectedContactIds.length === 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please select at least one contact.",
      path: ["selectedContactIds"],
    });
  }
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

export function PaymentRequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const initialTitle = searchParams.get("title") || "";
  const initialAmount = searchParams.get("amount");

  const defaultValues: Partial<PaymentFormValues> = {
    title: initialTitle,
    price: initialAmount ? parseFloat(initialAmount) : undefined,
    paymentMethodInfo: true,
    selectedContactIds: [],
  };
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (initialTitle) form.setValue("title", initialTitle);
    if (initialAmount) form.setValue("price", parseFloat(initialAmount));
  }, [initialTitle, initialAmount, form]);

  const targetType = form.watch("targetType");

  async function onSubmit(data: PaymentFormValues) {
    setIsLoading(true);
    const submissionData = {...data};
    if (data.targetType === "group") {
        delete submissionData.selectedContactIds;
    } else if (data.targetType === "contacts") {
        delete submissionData.targetGroupId;
    }
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Payment Request Submitted:", submissionData);
    
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
              name="targetType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Send Request To:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue("targetGroupId", undefined);
                        form.setValue("selectedContactIds", []);
                      }}
                      defaultValue={field.value}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0 p-3 border rounded-md flex-1 hover:bg-muted/30 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                        <FormControl><RadioGroupItem value="group" /></FormControl>
                        <FormLabel className="font-normal cursor-pointer flex items-center"><Users className="mr-2 h-4 w-4 text-muted-foreground"/>An Existing Group</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 p-3 border rounded-md flex-1 hover:bg-muted/30 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                        <FormControl><RadioGroupItem value="contacts" /></FormControl>
                        <FormLabel className="font-normal cursor-pointer flex items-center"><UserCheck className="mr-2 h-4 w-4 text-muted-foreground"/>Specific Contacts</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {targetType === "group" && (
              <FormField
                control={form.control}
                name="targetGroupId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Group</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a group to send this request to" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockGroups.map(group => (
                          <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {targetType === "contacts" && (
              <FormField
                control={form.control}
                name="selectedContactIds"
                render={() => (
                  <FormItem>
                    <FormLabel>Select Contacts</FormLabel>
                    <FormDescription>Choose one or more contacts to send this request to.</FormDescription>
                    <ScrollArea className="h-48 w-full rounded-md border bg-muted/10 p-2">
                      <div className="space-y-1">
                        {mockContacts.map((contact) => (
                          <FormField
                            key={contact.id}
                            control={form.control}
                            name="selectedContactIds"
                            render={({ field: contactArrayField }) => {
                              return (
                                <FormItem
                                  className="flex flex-row items-center space-x-3 space-y-0 p-2 hover:bg-muted/50 rounded-md transition-colors"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={contactArrayField.value?.includes(contact.id)}
                                      onCheckedChange={(checked) => {
                                        const currentValues = contactArrayField.value || [];
                                        return checked
                                          ? contactArrayField.onChange([...currentValues, contact.id])
                                          : contactArrayField.onChange(
                                              currentValues.filter(
                                                (value) => value !== contact.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal cursor-pointer">
                                    {contact.name} <span className="text-xs text-muted-foreground">({contact.groupAffiliation})</span>
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
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


    