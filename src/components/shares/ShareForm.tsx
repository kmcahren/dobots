"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Mock data
const mockContacts = [
  { id: "contact1", name: "Alice (U12 Parent)" },
  { id: "contact2", name: "Bob (Photography Club)" },
];
const mockGroups = [
  { id: "group1", name: "U12 Soccer Stars" },
  { id: "group2", name: "Photography Club Committee" },
];
const mockReportTypes = [
  { id: "event_summary1", name: "Event Attendance Summary - Current Month" },
  { id: "event_summary2", name: "Event Attendance Summary - Prior Month" },
  { id: "payment_status1", name: "Payment Status Report - Current Month" },
  { id: "payment_status2", name: "Payment Status Report - Prior Month" },
];


const shareFormSchema = z.object({
  shareType: z.enum(["message", "report"], { required_error: "Please select a share type."}),
  messageContent: z.string().optional(),
  genericLink: z.string().optional(), // Added genericLink field
  reportType: z.string().optional(),
  targetType: z.enum(["contact", "group"], { required_error: "Please select a target."}).optional(),
  targetId: z.string({ required_error: "Please select a recipient or group."}).optional(),
}).superRefine((data, ctx) => {
  if (data.shareType === "message" && (!data.messageContent || data.messageContent.length < 5)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Message content must be at least 5 characters.",
      path: ["messageContent"],
    });
  }
  if (data.shareType === "report" && !data.reportType) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please select a report type.",
      path: ["reportType"],
    });
  }
  if (data.targetType && !data.targetId) {
     ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please select a recipient or group.",
      path: ["targetId"],
    });
  }
});

type ShareFormValues = z.infer<typeof shareFormSchema>;

export function ShareForm() {
  const form = useForm<ShareFormValues>({
    resolver: zodResolver(shareFormSchema),
    defaultValues: { shareType: "message" },
  });
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const shareType = form.watch("shareType");
  const targetType = form.watch("targetType");

  async function onSubmit(data: ShareFormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
 if (data.shareType === "message" && data.genericLink) {
 data.messageContent = `${data.messageContent}\n${data.genericLink}`;
    }
    console.log("Share Form Submitted:", data);
    
    setIsLoading(false);
    toast({
      title: "Share Sent!",
      description: `Your ${data.shareType} has been successfully sent/generated.`,
    });
    router.push("/dashboard?tab=shares");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="p-6 md:p-8 bg-card rounded-xl shadow-lg border">
            <h2 className="text-2xl font-semibold font-headline mb-6 text-primary">
                New Message/Report
            </h2>
            <div className="space-y-6">
            <FormField
                control={form.control}
                name="shareType"
                render={({ field }) => (
                <FormItem className="space-y-3">
                    <FormLabel>What would you like to share?</FormLabel>
                    <FormControl>
                    <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <FormItem className="flex items-center space-x-3 space-y-0 p-3 border rounded-md flex-1 hover:bg-muted/30 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                        <FormControl>
                            <RadioGroupItem value="message" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Send a Text Message</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 p-3 border rounded-md flex-1 hover:bg-muted/30 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                        <FormControl>
                            <RadioGroupItem value="report" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Generate & Share a Report</FormLabel>
                        </FormItem>
                    </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            {shareType === "message" && (
                <FormField
                control={form.control}
                name="messageContent"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Type your message here..." {...field} rows={5}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            )}

            {shareType === "message" && (
                <FormField
                control={form.control}
                name="genericLink"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Message Link</FormLabel>
                    <FormControl>
                        <input type="text" placeholder="e.g., Link to an event or payment request - use https://..." className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            )}
            {shareType === "report" && (
                <FormField
                control={form.control}
                name="reportType"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Report Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a report to generate" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {mockReportTypes.map(rt => <SelectItem key={rt.id} value={rt.id}>{rt.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
            )}

            <FormField
              control={form.control}
              name="targetType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Share with?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue("targetId", undefined); // Reset targetId when type changes
                      }}
                      defaultValue={field.value}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0 p-3 border rounded-md flex-1 hover:bg-muted/30 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                        <FormControl><RadioGroupItem value="contact" /></FormControl>
                        <FormLabel className="font-normal cursor-pointer">A Specific Contact</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 p-3 border rounded-md flex-1 hover:bg-muted/30 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                        <FormControl><RadioGroupItem value="group" /></FormControl>
                        <FormLabel className="font-normal cursor-pointer">A Group</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {targetType && (
                <FormField
                    control={form.control}
                    name="targetId"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>{targetType === "contact" ? "Select Contact" : "Select Group"}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder={`Select a ${targetType}`} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {(targetType === "contact" ? mockContacts : mockGroups).map(item => (
                            <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            )}
            </div>
        </div>
        <div className="flex justify-start gap-3 pt-4">
          <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {shareType === "message" ? "Send Message" : "Generate & Share Report"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
