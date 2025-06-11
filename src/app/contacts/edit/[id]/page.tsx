
import { ContactForm } from '@/components/contacts/ContactForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { AppHeader } from '@/components/layout/AppHeader';
import { BottomNavigationBar } from '@/components/layout/BottomNavigationBar';
import { FloatingActionButton } from '@/components/layout/FloatingActionButton';

// Mock data for demonstration purposes
const mockContactData = {
  contact1: { id: "contact1", name: "Coach John", phoneNumber: "+15551001", email: "coach.john@example.com", avatarUrl: "https://placehold.co/64x64.png?text=CJ", notes: "Head coach for U12 Soccer Stars." },
  contact3: { id: "contact3", name: "Team Fundraising Lead", phoneNumber: "+15551003", email: "fundraising@example.com", notes: "Leads all fundraising initiatives." },
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const contact = (mockContactData as any)[params.id];
  return {
    title: `Edit ${contact?.name || 'Contact'} - DOIT`,
    description: `Edit details for contact ${contact?.name || params.id}.`,
  };
}

export default function EditContactPage({ params }: { params: { id: string } }) {
  const contactToEdit = (mockContactData as any)[params.id];

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
                {/* Title is part of ContactForm or handled by metadata */}
            </div>
            {contactToEdit ? (
                <ContactForm contactToEdit={contactToEdit} />
            ) : (
                <div className="text-center py-10">
                    <h2 className="text-xl font-semibold text-muted-foreground">Contact not found</h2>
                    <p className="text-muted-foreground">Could not find contact with ID: {params.id}</p>
                    <Button asChild className="mt-4">
                        <Link href="/contacts">Go to Contacts</Link>
                    </Button>
                </div>
            )}
        </main>
        <FloatingActionButton />
        <BottomNavigationBar />
    </div>
  );
}
