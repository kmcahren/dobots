
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
import HelpTooltip from "@/components/ui/HelpTooltip";
import { CalendarIcon, Loader2, Users, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  { id: "user6", name: "Fiona Gallagher", groupAffiliation: "Fundraising Comm." },
  { id: "user7", name: "George Harrison", groupAffiliation: "Band Members" },
];

const mockGroups = [
  { id: "group1", name: "U12 Soccer Stars" },
  { id: "group2", name: "Photography Club Committee" },
  { id: "group3", name: "Dev Team Leads" },
  { id: "group4", name: "Book Club Members" },
];

const notificationFormSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters.").max(200),
  description: z.string().max(500).optional(),
  dueDate: z.date().optional(),
  allowMultipleChoice: z.boolean().default(false).optional(),
  allowComments: z.boolean().default(true).optional(),
  hideVotes: z.boolean().default(false).optional(),
  targetType: z.enum(["group", "contacts"], {
    required_error: "Please select who to send this to.",
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

type NotificationFormValues = z.infer<typeof notificationFormSchema>;

const defaultValues: Partial<NotificationFormValues> = {
  allowComments: true,
  selectedContactIds: [], // Initialize as empty array
};

export function NotificationForm() {
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues,
  });
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const targetType = form.watch("targetType");

  async function onSubmit(data: NotificationFormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const submissionData = {...data};
    if (data.targetType === "group") {
        delete submissionData.selectedContactIds;
    } else if (data.targetType === "contacts") {
        delete submissionData.targetGroupId;
    }
    console.log("Notification Form Submitted:", submissionData);
    
    setIsLoading(false);
    toast({
      title: "Notification Published!",
      description: `Your notification "${data.question.substring(0,30)}..." has been published.`,
    });
    router.push("/dashboard?tab=notifications");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
         <div className="p-6 md:p-8 bg-card rounded-xl shadow-lg border">
          <h2 className="text-2xl font-semibold font-headline mb-6 text-primary">
            New Notification/Survey
          </h2>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-1">
                    <FormLabel>Question / Title / Vote</FormLabel>
                    <HelpTooltip helpText="Enter the question or title for your notification or survey. NOTE: you can add multiple choices and interactions below." />
                  </div>
                  <FormControl>
                    <Input placeholder="e.g., Confirm availability for next game?" {...field} />
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
                    <Textarea placeholder="Add more details or context..." {...field} rows={3} />
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
              name="targetType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Send to:</FormLabel>
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
                          <SelectValue placeholder="Choose a group to send this notification to" />
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
                render={() => ( // Outer field provides context but individual checkboxes manage updates
                  <FormItem>
                    <FormLabel>Select Contacts</FormLabel>
                    <FormDescription>Choose one or more contacts to notify.</FormDescription>
                    <ScrollArea className="h-48 w-full rounded-md border bg-muted/10 p-2">
                      <div className="space-y-1">
                        {mockContacts.map((contact) => (
                          <FormField
                            key={contact.id}
                            control={form.control}
                            name="selectedContactIds" // Correctly refers to the array field
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
                    <FormMessage /> {/* For errors related to selectedContactIds (e.g., "select at least one") */}
                  </FormItem>
                )}
              />
            )}
            
            <div className="space-y-3 pt-2">
                <FormField
                    control={form.control}
                    name="allowMultipleChoice"
                    render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3 shadow-sm bg-muted/20">
                        <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Allow multiple choice answers</FormLabel>
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="allowComments"
                    render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3 shadow-sm bg-muted/20">
                        <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Allow comments from recipients</FormLabel>
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="hideVotes"
                    render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3 shadow-sm bg-muted/20">
                        <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Hide votes/responses from other recipients</FormLabel>
                    </FormItem>
                    )}
                />
            </div>
          </div>
        </div>
        <div className="flex justify-start gap-3 pt-4">
          <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Publish Notification
          </Button>
 <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

    