
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, User, Phone, Mail, Info } from 'lucide-react';
import type { Metadata } from 'next';
import { AppHeader } from '@/components/layout/AppHeader';
import { BottomNavigationBar } from '@/components/layout/BottomNavigationBar';
import { FloatingActionButton } from '@/components/layout/FloatingActionButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

// Mock data for demonstration purposes - in a real app, you'd fetch this
const mockContactData = {
  contact2: { id: "contact2", name: "Sarah M. (Photo Club)", phoneNumber: "+15551002", email: "sarah.m@photoclub.example", avatarUrl: "https://placehold.co/96x96.png?text=SM", notes: "Active member of the Photo Club, often shares event photos." },
  // Add other contacts that might be view-only
};


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const contact = (mockContactData as any)[params.id];
  return {
    title: `View ${contact?.name || 'Contact'} - DOIT`,
    description: `Details for contact ${contact?.name || params.id}.`,
  };
}

export default function ViewContactPage({ params }: { params: { id: string } }) {
  const contact = (mockContactData as any)[params.id];

  if (!contact) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <AppHeader />
        <main className="flex-grow container mx-auto px-2 sm:px-4 py-6 md:py-8 mb-16 md:mb-0 flex flex-col items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold font-headline mb-2">Contact Not Found</h1>
                <p className="text-muted-foreground mb-6">The contact with ID "{params.id}" could not be found or is not viewable.</p>
                <Button asChild>
                    <Link href="/contacts">
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Contacts
                    </Link>
                </Button>
            </div>
        </main>
        <FloatingActionButton />
        <BottomNavigationBar />
    </div>
    );
  }

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
                <h1 className="text-2xl font-bold font-headline">Contact Details</h1>
            </div>
            
            <Card className="shadow-lg">
                <CardHeader className="items-center text-center">
                    {contact.avatarUrl && (
                        <Image 
                            src={contact.avatarUrl} 
                            alt={contact.name} 
                            width={96} 
                            height={96} 
                            className="rounded-full mb-4 border-2 border-primary/30 object-cover" 
                            data-ai-hint="user avatar"
                        />
                    )}
                    <CardTitle className="text-2xl font-headline text-primary">{contact.name}</CardTitle>
                    <CardDescription>This contact is managed through a group relationship and is view-only.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-2">
                    {contact.phoneNumber && (
                        <div className="flex items-center">
                            <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                            <span className="text-foreground">{contact.phoneNumber}</span>
                        </div>
                    )}
                    {contact.email && (
                        <div className="flex items-center">
                            <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                            <span className="text-foreground">{contact.email}</span>
                        </div>
                    )}
                    {contact.notes && (
                        <div className="flex items-start">
                            <Info className="h-5 w-5 mr-3 mt-1 text-muted-foreground" />
                            <p className="text-muted-foreground italic">{contact.notes}</p>
                        </div>
                    )}
                </CardContent>
            </Card>

        </main>
        <FloatingActionButton />
        <BottomNavigationBar />
    </div>
  );
}
