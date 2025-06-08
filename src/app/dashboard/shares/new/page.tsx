import { ShareForm } from '@/components/shares/ShareForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'New Share - DOIT',
  description: 'Share a message or generate a report.',
};

export default function NewSharePage() {
  return (
    <div className="space-y-6">
       <div className="flex items-center mb-2">
         <Button variant="outline" size="icon" asChild className="mr-4">
          <Link href="/dashboard?tab=shares">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back to Shares</span>
          </Link>
        </Button>
        {/* Title is inside ShareForm */}
      </div>
      <ShareForm />
    </div>
  );
}
