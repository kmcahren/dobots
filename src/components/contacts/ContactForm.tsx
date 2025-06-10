
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, UserPlus, Save } from "lucide-react";
import Image from "next/image";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(100, "Name is too long."),
  phoneNumber: z.string().optional().refine(val => !val || /^[+]?[0-9\s-()]*$/.test(val), {
    message: "Invalid phone number format.",
  }),
  email: z.string().email("Invalid email address.").optional().or(z.literal('')),
  avatarUrl: z.string().url("Invalid URL for avatar.").optional().or(z.literal('')),
  notes: z.string().max(500, "Notes can be up to 500 characters.").optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const defaultValues: Partial<ContactFormValues> = {
  name: "",
  phoneNumber: "",
  email: "",
  avatarUrl: "",
  notes: "",
};

export function ContactForm({ contactToEdit }: { contactToEdit?: ContactFormValues & { id?: string } }) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: contactToEdit || defaultValues,
  });
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(contactToEdit?.avatarUrl || null);

  const handleAvatarUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    form.setValue("avatarUrl", url, { shouldValidate: true });
    if (contactFormSchema.shape.avatarUrl.safeParse(url).success) {
      setAvatarPreview(url);
    } else if (!url) {
      setAvatarPreview(null);
    }
  };

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
              name="avatarUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar URL (Optional)</FormLabel>
                  <div className="flex items-center gap-4">
                    {avatarPreview ? (
                      <Image 
                        src={avatarPreview} 
                        alt="Avatar Preview" 
                        width={64} 
                        height={64} 
                        className="rounded-full object-cover border-2 border-primary/30"
                        data-ai-hint="user avatar"
                        onError={() => setAvatarPreview("https://placehold.co/64x64.png?text=Error")}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-2xl">
                        {form.getValues("name")?.charAt(0).toUpperCase() || <UserPlus size={24} />}
                      </div>
                    )}
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/avatar.png" 
                        {...field} 
                        onChange={handleAvatarUrlChange} 
                        value={field.value || ""}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    <FormLabel>Phone Number (Optional)</FormLabel>
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
                    <FormLabel>Email Address (Optional)</FormLabel>
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
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any additional information about this contact..." {...field} rows={4} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
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
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {contactToEdit ? "Save Changes" : "Save Contact"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
