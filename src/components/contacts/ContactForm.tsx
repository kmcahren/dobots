
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
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2, UserPlus, Save } from "lucide-react";
import Image from "next/image";

import HelpTooltip from "@/components/ui/HelpTooltip";
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(100, "Name is too long."),
  phoneNumber: z.string().refine(val => /^\+(?:[0-9] ?){6,14}[0-9]$/.test(val), {
    message: "Invalid phone number format.",
  }),
  email: z.string().email("Invalid email address.").optional().or(z.literal('')),
  avatarUrl: z.string().url("Invalid URL for avatar.").optional().or(z.literal('')),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const defaultValues: Partial<ContactFormValues> = {
  name: "",
  phoneNumber: "",
  email: "",
  avatarUrl: "",
};

export function ContactForm({ contactToEdit }: { contactToEdit?: ContactFormValues & { id?: string } }) {

  const [isLoading, setIsLoading] = useState(false);
  // State for open events and dropdown visibility
  const [openEvents, setOpenEvents] = useState<any[]>([]); // TODO: Fetch the list of open events and define a proper type
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const form = useForm<ContactFormValues>({
  });

  // TODO: Fetch the list of avatars from a server-side source
  // useEffect(() => {
  //   // Example: Fetch from an API endpoint
  //   fetch('/api/avatars')
  //     .then(res => res.json())
  //     .then(data => setAvailableAvatars(data));
  // }])
  // }, []);

  async function onSubmit(data: ContactFormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Contact Form Submitted:", data);
    
    setIsLoading(false);
    toast({
      title: contactToEdit ? "Contact Updated!" : "Contact Saved!",
      description: `"${data.name}" has been successfully ${contactToEdit ? 'updated' : 'saved'}.`,
    });
    router.push("/contacts"); 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="p-6 md:p-8 bg-card rounded-xl shadow-lg border">
          <h2 className="text-2xl font-semibold font-headline mb-6 text-primary flex items-center">
            <UserPlus className="mr-3 h-7 w-7" />
            {contactToEdit ? "Edit Contact" : "Create New Contact"}
          </h2>
          <div className="space-y-6">

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
 <div className="flex items-center gap-1">
 <FormLabel>Full Name</FormLabel>
 <HelpTooltip helpText="Enter the full name of the contact. NOTE: this is not a CMS so the phone number you enter below may be already taken by the owner." />
 </div>
                  <FormControl>
                    <Input placeholder="e.g., Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
 <div className="flex items-center gap-1">
 <FormLabel>Phone Number</FormLabel>
 <HelpTooltip helpText="Enter the phone number for this contact. This is an OTP App designed for active users on the go. The owner will be allowed to take ownership of this record, feel free to enter it first." />
 </div>
                    <FormControl>
                      <Input type="tel" placeholder="+1 123-456-7890" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem> {/* Use FormLabel for accessibility */}
 <div className="flex items-center gap-1">
                    <FormLabel>Email Address (Optional)</FormLabel>
 <HelpTooltip helpText="Provide an email address for sending and receiving reports or notifications." />
 </div>
                    <FormControl>
                      <Input type="email" placeholder="name@example.com" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
 <div className="flex items-center gap-1">
 <FormLabel>Notes / Short Bio (Optional)</FormLabel>
 <HelpTooltip helpText="Add notes or a short bio for this contact. NOTE: this App is not a CMS and everything will be overwritten by the owner of this phone number if they sign in - they will not see your entries but your data will be lost. You were just inviting them anyway, right? I wonder what their real name is..." />
 </div>
                  <FormControl>
                    <Textarea placeholder="Add notes or a short bio for this contact. NOTE: This data could be overridden if the owner of this number signs in - read the tool tip for details." {...field} rows={4} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

      <div className="flex flex-col items-start gap-3 pt-4 w-auto"> {/* Main container for all buttons, stacked vertically and left-aligned */}
          {/* New button for Save and Send a Payment Request */}
          <Button type="button" variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white w-auto" disabled={isLoading}> {/* Removed w-full */}
            Save and Send a Payment Request
          </Button>
 {/* Button for Save and Invite */}
        <DropdownMenu>
 <DropdownMenuTrigger asChild>
 <Button type="button" variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white w-auto" disabled={isLoading}> {/* Removed w-full */}
 Save and Invite to a Group/Event
 </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto"> {/* Set dropdown content width to auto */}
 <DropdownMenuLabel>Select an Event</DropdownMenuLabel>
              {openEvents.map(event => (
 <DropdownMenuItem
 key={event.id} // Assuming your event object has an 'id' property
 // TODO: Add onClick handler to handle the invitation logic for this event
 >
 {event.name} {/* Assuming your event object has a 'name' property */}
 </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
 {/* Original Save Contact Button */}
 <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground w-auto"> {/* Removed w-full */}
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {contactToEdit ? "Save Changes" : "Save Contact"}
            </Button>
 <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading} className="w-auto"> {/* Removed w-full */}
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
