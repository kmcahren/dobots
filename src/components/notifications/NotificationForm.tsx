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
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const notificationFormSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters.").max(200),
  description: z.string().max(500).optional(),
  dueDate: z.date().optional(),
  allowMultipleChoice: z.boolean().default(false).optional(),
  allowComments: z.boolean().default(true).optional(),
  hideVotes: z.boolean().default(false).optional(),
  // TODO: Add target audience/group selection
});

type NotificationFormValues = z.infer<typeof notificationFormSchema>;

const defaultValues: Partial<NotificationFormValues> = {
  allowComments: true,
};

export function NotificationForm() {
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues,
  });
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: NotificationFormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Notification Form Submitted:", data);
    
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
            Create New Notification / Survey
          </h2>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question / Title</FormLabel>
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
            
            <div className="space-y-3 pt-2">
                <FormField
                    control={form.control}
                    name="allowMultipleChoice"
                    render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3 shadow-sm bg-muted/20">
                        <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="font-normal">Allow multiple choice answers</FormLabel>
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
                        <FormLabel className="font-normal">Allow comments from recipients</FormLabel>
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
                        <FormLabel className="font-normal">Hide votes/responses from other recipients</FormLabel>
                    </FormItem>
                    )}
                />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Publish Notification
          </Button>
        </div>
      </form>
    </Form>
  );
}
