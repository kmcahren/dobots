
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
import HelpTooltip from "@/components/ui/HelpTooltip";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import type { SelectableMember } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";


// Mock data for selectable members/groups
const mockUsers: SelectableMember[] = [
  { id: "user1", name: "Alice Smith", phoneNumber: "111", avatarUrl: "https://placehold.co/40x40.png?text=AS" },
  { id: "user2", name: "Bob Johnson", phoneNumber: "222", avatarUrl: "https://placehold.co/40x40.png?text=BJ" },
  { id: "user3", name: "Charlie Brown", phoneNumber: "333", avatarUrl: "https://placehold.co/40x40.png?text=CB" },
  { id: "user4", name: "Diana Prince", phoneNumber: "444", avatarUrl: "https://placehold.co/40x40.png?text=DP" },
];

const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters.").max(100),
  description: z.string().max(500, "Description can be up to 500 characters.").optional(),
  startDate: z.date({ required_error: "Start date is required." }),
  endDate: z.date({ required_error: "End date is required." }),
  location: z.string().min(3, "Location is required.").max(150),
  hostId: z.string().optional(), // Assuming current user is host or selectable
  // selectedMemberIds: z.array(z.string()).min(1, "Select at least one member."), // Simplified group/member selection
  groupId: z.string().optional(), // Or a way to select/create a group
  registrationFee: z.coerce.number().min(0).optional(),
  maxParticipants: z.coerce.number().int().min(1).optional(),
  sendInvite: z.boolean().default(true).optional(),
  reminderTiming: z.enum(["none", "1hour", "2hours", "1day"]).default("1day").optional(),
  allowComments: z.boolean().default(true).optional(),
  imageUrl: z.string().url("Must be a valid URL.").optional().or(z.literal('')),
  eventLinkUrl: z.string().url("Must be a valid URL for the event link.").optional().or(z.literal('')), // Allow empty string
});

type EventFormValues = z.infer<typeof eventFormSchema>;

// Default values can be pre-filled if editing an event
const defaultValues: Partial<EventFormValues> = {
  sendInvite: true,
  allowComments: true,
  reminderTiming: "1day",
  imageUrl: "",
  eventLinkUrl: "",
};

export function EventForm({ eventToEdit }: { eventToEdit?: EventFormValues & {id?: string} }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: eventToEdit || defaultValues,
  });

  const [selectedMembers, setSelectedMembers] = useState<SelectableMember[]>(
    // Pre-select members if editing and IDs are available
    // This part needs actual logic to map eventToEdit.selectedMemberIds to mockUsers
    mockUsers.map(u => ({...u, selected: false})) 
  );

  const handleMemberSelection = (memberId: string) => {
    setSelectedMembers(prev => 
      prev.map(m => m.id === memberId ? {...m, selected: !m.selected} : m)
    );
  };

  async function onSubmit(data: EventFormValues) {
    setIsLoading(true);
    const submissionData = {
      ...data,
      selectedMemberIds: selectedMembers.filter(m => m.selected).map(m => m.id),
      // Convert dates to ISO strings or desired format for backend
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
      eventLinkUrl: data.eventLinkUrl === "" ? undefined : data.eventLinkUrl, // Set to undefined if empty
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Event Form Submitted:", submissionData);
    
    setIsLoading(false);
    toast({
      title: eventToEdit ? "Event Updated!" : "Event Created!",
      description: `"${data.title}" has been successfully ${eventToEdit ? 'updated' : 'scheduled'}.`,
      variant: "default", 
    });
    router.push("/dashboard?tab=events"); 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="p-6 md:p-8 bg-card rounded-xl shadow-lg border">
          <h2 className="text-2xl font-semibold font-headline mb-6 text-primary">
            {eventToEdit ? "Edit Event" : "New Group/Event"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                 <div className="flex items-center gap-1">
                 <FormLabel>Group/Event Title</FormLabel>
                 <HelpTooltip helpText="This could be your family, friend circles, sports team, clubs or membership organizations." />
                 </div>
                  <FormControl>
                    <Input placeholder="e.g., Weekly Team Sync" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Provide details about the event..." {...field} rows={4}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                 <div className="flex items-center gap-1">
                 <FormLabel>Start Date & Time</FormLabel>
                 <HelpTooltip helpText="Select the date and time when your event will begin. NOTE: family and friend groups do not need a start date." />
                 </div>
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
                            format(field.value, "PPP HH:mm") // Includes time
                          ) : (
                            <span>Pick a date and time</span>
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
                        disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} // Disable past dates
                        initialFocus
                      />
                      {/* Basic Time Picker - replace with a proper one if needed */}
                      <div className="p-2 border-t">
                         <Input type="time" defaultValue={field.value ? format(field.value, "HH:mm") : ""} 
                           onChange={(e) => {
                             const [hours, minutes] = e.target.value.split(':').map(Number);
                             const newDate = new Date(field.value || new Date());
                             newDate.setHours(hours, minutes);
                             field.onChange(newDate);
                           }}
                         />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <FormLabel>End Date & Time</FormLabel>
                    <HelpTooltip helpText="Select the date and time when your event will end - events often span multiple days. NOTE: all events do not need an end date." />
                  </div>
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
                            format(field.value, "PPP HH:mm")
                          ) : (
                            <span>Pick a date and time</span>
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
                        disabled={(date) => date < (form.getValues("startDate") || new Date(new Date().setHours(0,0,0,0)))}
                        initialFocus
                      />
                       <div className="p-2 border-t">
                         <Input type="time" defaultValue={field.value ? format(field.value, "HH:mm") : ""}
                           onChange={(e) => {
                             const [hours, minutes] = e.target.value.split(':').map(Number);
                             const newDate = new Date(field.value || new Date());
                             newDate.setHours(hours, minutes);
                             field.onChange(newDate);
                           }}
                         />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <div className="flex items-center gap-1">
                    <FormLabel>Location</FormLabel> {/* Use FormLabel for accessibility */}
                    <HelpTooltip helpText="Enter a street address if you want a map link to be included with the event details." />
                  </div>
                  <FormControl>
                    <Input placeholder="e.g., 123 Main St., Anywhere on Maps" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Simplified Member Selection */}
            <div className="md:col-span-2 space-y-2">
              <FormLabel>Invite Members/Group</FormLabel>
              <FormDescription>Select members to invite to this event.</FormDescription>
              <div className="max-h-60 overflow-y-auto space-y-2 rounded-md border p-4 bg-muted/20">
                {selectedMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Image src={member.avatarUrl || `https://placehold.co/40x40.png?text=${member.name.substring(0,2)}`} alt={member.name} width={32} height={32} className="rounded-full" data-ai-hint="user avatar"/>
                      <span className="text-sm">{member.name}</span>
                    </div>
                    <Checkbox
                      checked={member.selected}
                      onCheckedChange={() => handleMemberSelection(member.id)}
                      aria-label={`Select ${member.name}`}
                    />
                  </div>
                ))}
              </div>
              {/* Add FormMessage for selectedMemberIds if validation is added */}
            </div>


            <FormField
              control={form.control}
              name="registrationFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Fee (Optional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="maxParticipants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Participants (Optional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 50" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reminderTiming"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Send Reminder</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reminder timing" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">No Reminder</SelectItem>
                      <SelectItem value="30mins">30 minutes before</SelectItem>
                      <SelectItem value="1hour">1 hour before</SelectItem>
                      <SelectItem value="2hours">2 hours before</SelectItem>
                      <SelectItem value="1day">1 day before</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

             <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
 <div className="flex items-center gap-1">
                  <FormLabel>Event Image URL (Optional)</FormLabel>
 <HelpTooltip helpText="Provide a URL for the event banner image. Recommended size is 600x400 pixels." />
 </div>
                  <FormControl>
                    <Input placeholder="https://example.com/image.png" {...field} value={field.value || ""} />
                  </FormControl>
                  {field.value && <img src={field.value} alt="Preview" className="mt-2 rounded-md max-h-40 object-cover" data-ai-hint="event banner" />}
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="eventLinkUrl"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
 <div className="flex items-center gap-1">
 <FormLabel>Event Link URL (External-Optional)</FormLabel>
 <HelpTooltip helpText="Provide a URL for an external event page or link." />
 </div>
                  <FormControl>
                    <Input placeholder="https://example.com/event-details" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormDescription>Provide an external link for more event information, if any.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2 space-y-4 pt-4">
               <FormField
                control={form.control}
                name="sendInvite"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-muted/20">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Send Invite Instantly</FormLabel>
                      <FormDescription>
                        Notify selected members immediately upon event creation.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allowComments"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-muted/20">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Allow Comments from Invitees</FormLabel>
                       <FormDescription>
                        Let invitees post comments on the event page.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-start gap-3 pt-4">
          <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {eventToEdit ? "Update Event" : "Create Event"}
         </Button>
         <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
