
import { ContactForm } from '@/components/contacts/ContactForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { AppHeader } from '@/components/layout/AppHeader';
import { BottomNavigationBar } from '@/components/layout/BottomNavigationBar';
import { FloatingActionButton } from '@/components/layout/FloatingActionButton';


export const metadata: Metadata = {
  title: 'New Contact - DOIT',
  description: 'Add a new contact to your address book.',
};

export default function NewContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
        <AppHeader />
        <main className="flex-grow container mx-auto px-2 sm:px-4 py-6 md:py-8 mb-16 md:mb-0">
            <div className="flex items-center mb-6">
                <Button variant="outline" size="icon" asChild className="mr-4">
                <Link href="/contacts">
                    <ChevronLeft className="h-5 w-5" />
                    <span className="sr-only">Back to Contacts</span>
                </Link>
                </Button>
                {/* Title is now part of the ContactForm component */}
            </div>
            <ContactForm />
        </main>
        <FloatingActionButton />
        <BottomNavigationBar />
    </div>
  );
}
