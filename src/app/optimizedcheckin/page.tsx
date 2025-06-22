
"use client";

// pages/optimized-checkin.tsx
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Payment, Event, Notification } from '../lib/types'; // Assuming types are defined in types.ts
import { FloatingActionButton } from '@/components/layout/FloatingActionButton';
import NfcWriter from '@/components/NfcWriter';
import { usePathname } from 'next/navigation';

// Placeholder data - replace with actual data fetching logic
const mockPayments: Payment[] = [
  { id: 'p1', description: 'Membership Fee', amount: 50.00, status: 'pending', dueDate: '2023-12-31' },
  { id: 'p2', description: 'Tournament Entry', amount: 25.00, status: 'pending', dueDate: '2024-01-15' },
];

const mockEvents: Event[] = [
  { id: 'e1', title: 'Annual General Meeting', startDate: '2024-02-10T10:00:00Z', location: 'Community Hall', groupName: 'Club Members', isUserHost: false, currentUserRsvpStatus: 'attending' },
  { id: 'e3', title: 'Team Practice Session', startDate: '2024-01-20T18:00:00Z', location: 'School Gym', groupName: 'Basketball Team', isUserHost: false, currentUserRsvpStatus: 'unconfirmed' },
  { id: 'e4', title: 'Next Committee Meeting', startDate: '2024-02-01T19:30:00Z', location: 'Online', groupName: 'Board Members', isUserHost: false, currentUserRsvpStatus: 'unconfirmed' },
  { id: 'e2', title: 'Volunteer Appreciation Picnic', startDate: '2024-03-05T14:00:00Z', location: 'Central Park', groupName: 'Volunteers', isUserHost: false, currentUserRsvpStatus: 'unconfirmed' },
];

const mockNotifications: Notification[] = [
  { id: 'n1', message: 'New message in Team Chat', read: false, timestamp: '2023-12-10T10:30:00Z' },
  { id: 'n2', message: 'Upcoming event reminder: Team Practice', read: false, timestamp: '2023-12-09T18:00:00Z' },
];



const OptimizedCheckinPage: React.FC = () => {
  const [actionablePayments, setActionablePayments] = useState<Payment[]>([]);
  const [actionableEvents, setActionableEvents] = useState<Event[]>([]);
  const [confirmedEvents, setConfirmedEvents] = useState<Event[]>([]);
  const [actionableNotifications, setActionableNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFabMenu, setShowFabMenu] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate fetching data with a delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setActionableEvents(mockEvents.filter(event => event.currentUserRsvpStatus === 'unconfirmed'));
        setActionablePayments(mockPayments);
        setConfirmedEvents(mockEvents.filter(event => event.currentUserRsvpStatus === 'attending')); // Filter confirmed events
        setActionableNotifications(mockNotifications);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading optimized checkin data...</div>;
  }

  if (error) {
    return <div>Error loading data: {error}</div>;
  }

  const hasActionableItems =
    actionablePayments.length > 0 ||
    confirmedEvents.length > 0 ||
    actionableNotifications.length > 0;

  return (
    <>
      <div className="container mx-auto px-2 sm:px-4 py-8 mb-8">
 <Link href="/dashboard" passHref className="flex items-center text-2xl font-bold mb-4 text-foreground hover:text-muted-foreground">
          <span className="text-2xl font-bold mr-2">&lt;</span>
          <h1>Optimized Checkin</h1>

 </Link>
 <div className="space-y-6">
          {/* Actionable Payments Section */}
 <Card>
 <CardHeader className="pb-4">
 <CardTitle className="text-xl font-semibold">Actionable Payments</CardTitle>
 </CardHeader>
 <CardContent className="pt-0">
 <div className="space-y-2">
 {actionablePayments.map((payment) => (
 <div key={payment.id} className="flex items-center justify-between p-2 border rounded-md shadow-sm text-sm">
 <div className="flex-grow">
 <p className="font-medium text-foreground">{payment.description}</p>
 <p className="text-xs text-muted-foreground">Due: {payment.dueDate}</p>
 </div>
 <div className="flex-shrink-0 ml-4">
 <p className="text-sm font-bold text-foreground">${payment.amount.toFixed(2)}</p>
 <button
 className="mt-2 px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
 onClick={() => console.log(`Pay Now clicked for payment ID: ${payment.id}`)}>
 Pay Now
 </button>
 </div>
 </div>
 ))}
 </div>

 </CardContent>
 </Card>

          {/* Actionable Events Section */}
 <Card>
 <CardHeader className="pb-4">
 <CardTitle className="text-xl font-semibold">Actionable Events</CardTitle>
 </CardHeader>
 <CardContent className="pt-0">
 {actionableEvents.length > 0 ? (
 <div className="space-y-2">
 {actionableEvents.slice(0, 3).map((event) => (
 <div key={event.id} className="flex items-center justify-between p-2 border rounded-md shadow-sm text-sm">
 <div className="flex-grow">
 <p className="font-medium text-foreground">{event.title}</p>
 <p className="text-xs text-muted-foreground">{event.location} - {event.startDate ? new Date(event.startDate).toLocaleDateString() : 'Date TBD'}</p>
 </div>
 <div className="flex space-x-2 mt-2">
 <button
 className="px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded hover:bg-green-600"
 onClick={() => console.log(`Accept clicked for event ID: ${event.id}`)}
 >
 Accept
 </button>
 <button
 className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded hover:bg-red-600"
 onClick={() => console.log(`Decline clicked for event ID: ${event.id}`)}
 >Decline</button>
 </div>
 </div>
 ))}
                </div>
 ) : (
 <p className="text-muted-foreground text-sm">No actionable events at this time.</p>
 )}
              </CardContent>
 </Card> {/* Correctly closing Actionable Events Card */}

 {/* Confirmed Events Section */}
 <Card>
 <CardHeader className="pb-4">
 <CardTitle className="text-xl font-semibold">Confirmed Events</CardTitle>
 </CardHeader>
 <CardContent>
 {confirmedEvents.length > 0 ? (
 <div className="space-y-2">
 {confirmedEvents.filter(event => event.currentUserRsvpStatus === 'attending').slice(0, 3).map((event) => (
 <div key={event.id} className="flex items-center justify-between p-2 border rounded-md shadow-sm text-sm">
 <div className="flex-grow">
 <p className="font-medium text-foreground">{event.title}</p>
 <p className="text-xs text-muted-foreground">{event.location} - {event.startDate ? new Date(event.startDate).toLocaleDateString() : 'Date TBD'}</p>
 </div>
 <div className="flex-shrink-0 ml-4">
 <Link
 href={`/dashboard/events/${event.id}`}
 className="px-2 py-1 text-xs font-semibold text-blue-500 rounded border border-blue-500 hover:bg-blue-50 flex items-center"
 >View Details
 </Link>
 </div>
 </div>
 ))}
 </div>
 ) : (
 <p className="text-muted-foreground text-sm">No confirmed events at this time.</p>
 )}

 </CardContent>
 </Card>

          {/* Actionable Notifications Section */}
 <Card>
 <CardHeader className="pb-4">
 <CardTitle className="text-xl font-semibold">Actionable Notifications</CardTitle>
 </CardHeader>
 <CardContent className="pt-0">
 {actionableNotifications.length > 0 ? (
 <div className="space-y-2">
 {actionableNotifications.map((notification) => (
 <div key={notification.id} className="flex items-center justify-between p-2 border rounded-md shadow-sm text-sm">
 <div className="flex-grow">
 <p className="font-medium text-foreground">
 {notification.message}</p>
 <p className="text-xs text-muted-foreground">
 {notification.timestamp ? new Date(notification.timestamp).toLocaleString() : ''}</p>
 </div>
 <div className="flex-shrink-0 ml-4">
 {!notification.read && (
 <button
 className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
 onClick={() => console.log(`Mark as Read clicked for notification ID: ${notification.id}`)}>
 Mark as Read
 </button>
 )}
 </div>
 </div>
 ))}
 </div>
 ) : (
 <p className="text-muted-foreground text-sm">
 No new notifications.</p>
 )}
 </CardContent>
 </Card>
 </div>
 <div className="flex justify-center mt-8">
 <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
 Write Link on NFC Tag
 </button>
 </div>
      </div>
 <FloatingActionButton
 onClick={() => setShowFabMenu(!showFabMenu)}
 icon={<PlusCircle size={24} />} // Changed icon to PlusCircle
 />
 </>
  );
};

export default OptimizedCheckinPage;
