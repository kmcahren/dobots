import { NotificationForm } from '@/components/notifications/NotificationForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'New Notification',
  description: 'Create and send a new notification or survey.',
};

export default function NewNotificationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-2">
         <Button variant="outline" size="icon" asChild className="mr-4">
          <Link href="/dashboard?tab=notifications">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back to Notifications</span>
          </Link>
        </Button>
        {/* Title is inside NotificationForm */}
      </div>
      <NotificationForm />
    </div>
  );
}
