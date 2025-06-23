
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
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2, UserPlus, Save } from "lucide-react";
import Image from "next/image";

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
                  <FormLabel>Full Name</FormLabel>
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
                    <FormLabel>Phone Number</FormLabel>
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
                  <FormItem>
                    <FormLabel>Email Address (Optional - for reports)</FormLabel>
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
                  <FormLabel>Notes / Short Bio (Optional - for relationships)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Add temporary information about this contact. NOTE: the Full Name and Notes will be overwritten with their Short Bio if the owner of this phone number takes control of the record - they will not see your entries and your data will be lost." {...field} rows={4} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="flex justify-start gap-3 pt-4">
          <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {contactToEdit ? "Save Changes" : "Save Contact"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
