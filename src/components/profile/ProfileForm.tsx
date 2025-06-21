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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const profileFormSchema = z.object({
  city: z.string().optional(),
  aboutMe: z.string().optional(),
  fullName: z.string().min(1, "Full Name is required."),
  phoneNumber: z
    .string()
    .min(1, "Phone Number is required.")
    .refine((val) => /^\+(?:[0-9] ?){6,14}[0-9]$/.test(val), {
      message: "Invalid international phone number format.",
    }),
  email: z.string().email("Invalid email address.").optional().or(z.literal('')),

});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  city: "",
  aboutMe: "",
  fullName: "",
  phoneNumber: "",
  email: "",
};

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  function onSubmit(data: ProfileFormValues) {
    console.log("Profile Form Submitted:", data);
    // TODO: Implement save logic (e.g., API call)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
 <div className="p-6 md:p-8 bg-card rounded-xl shadow-lg border">
 <h2 className="text-2xl font-semibold font-headline mb-6 text-primary">
 Profile Information
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <FormField
 control={form.control}
 name="fullName"
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

 <FormField
 control={form.control}
 name="phoneNumber"
 render={({ field }) => (
 <FormItem className="md:col-span-2">
 <FormLabel>Phone Number</FormLabel>
 <FormControl>
 <Input type="tel" placeholder="+1 123-456-7890" {...field} />
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
 <Input type="email" placeholder="name@example.com" {...field} />
 </FormControl>
 <FormMessage />
 </FormItem>
 )}
 />

 <FormField
 control={form.control}
 name="city"
 render={({ field }) => (
 <FormItem>
 <FormLabel>City (Optional - but good to know)</FormLabel>
 <FormControl>
 <Input placeholder="e.g., New York" {...field} />
 </FormControl>
 <FormMessage />
 </FormItem>
 )}
 />

 <FormField
 control={form.control}
 name="aboutMe"
 render={({ field }) => (
 <FormItem className="md:col-span-2">
 <FormLabel>About Me (Optional - but cool to Do!)</FormLabel>
 <FormControl>
 <Textarea
 placeholder="e.g., I am not a robot..."
 className="resize-none"
 {...field}
 />
 </FormControl>
 <FormMessage />
 </FormItem>
 )}
 />
 </div>
 </div>

        <Button type="submit">Save Profile</Button>
      </form>
    </Form>
  );
}