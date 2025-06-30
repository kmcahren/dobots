"use client";

import React from 'react';
import { format } from 'date-fns';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react'; // Import icons

import Link from 'next/link'; // Keep this import
import HelpTooltip from '@/components/ui/HelpTooltip'; // Import the HelpTooltip component
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react'; // Import useState

interface AttendanceData {
  groupEventName: string;
  dateTime: string;
  fullName: string;  phoneNumber: string;
  status: AttendanceStatus; // Use the new type
}

const sampleData: AttendanceData[] = [
  {
    groupEventName: 'Group A - Team Meeting',
    dateTime: '2024-08-15 10:00 AM',
    fullName: 'John Doe',
    phoneNumber: '555-123-4567',
    status: 'confirmed',
  },
  {
    groupEventName: 'Group A - Team Meeting',
    dateTime: '2024-08-15 10:00 AM',
    fullName: 'Jane Smith',
    phoneNumber: '555-987-6543',
    status: 'declined',
  },
  {
    groupEventName: 'Group A - Team Meeting',
    dateTime: '2024-08-15 10:00 AM',
    fullName: 'Peter Jones',
    phoneNumber: '555-555-1212',
    status: 'unconfirmed',
  },
  {
    groupEventName: 'Event B - Workshop',
    dateTime: '2024-08-20 02:30 PM',
    fullName: 'Alice Brown',
    phoneNumber: '555-111-2222',
    status: 'confirmed',
  },
  {
    groupEventName: 'Event B - Workshop',
    dateTime: '2024-08-20 02:30 PM',
    fullName: 'Bob White',
    phoneNumber: '555-333-4444',
    status: 'confirmed',
  },
  {
    groupEventName: 'Group C - Study Session',
    dateTime: '2024-08-25 06:00 PM',
    fullName: 'Charlie Green',
    phoneNumber: '555-666-7777',
    status: 'unconfirmed',
  },
];

type AttendanceStatus = 'confirmed' | 'declined' | 'unconfirmed' | 'disallowed';

interface EventDetails {
  startDate: string; // Or Date type
  endDate: string;   // Or Date type
}

// Placeholder data - replace with your actual event details lookup
const eventDetailsMap: Record<string, EventDetails> = {
  "Group A - Team Meeting": { startDate: "2024-08-15 09:00 AM", endDate: "2024-08-15 11:00 AM" },
  "Event B - Workshop": { startDate: "2024-08-20 01:00 PM", endDate: "2024-08-20 04:00 PM" },
  "Group C - Study Session": { startDate: "2024-08-25 05:30 PM", endDate: "2024-08-25 07:00 PM" },
};

const EventAttendanceSummaryPage = () => {
  // State for the dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<AttendanceData | null>(null);
  const [selectedNewStatus, setSelectedNewStatus] = useState<AttendanceStatus | null>(null);

  // Add the handleStatusChange function
  const handleStatusChange = async () => {
    if (selectedContact && selectedNewStatus) {
      try {
        // TODO: Make API call to update status in the backend
        console.log(`Updating status for ${selectedContact.fullName} to ${selectedNewStatus}`);
        // Example: await fetch('/api/update-attendance-status', { method: 'POST', body: JSON.stringify({ contactId: selectedContact.contactId, eventId: '...', newStatus: selectedNewStatus }) });

        // Update local state after successful backend update
        // Note: This uses sampleData. In a real application, you'd update your fetched data state.
        // setAttendanceData(attendanceData.map(item =>
        //   item.fullName === selectedContact.fullName ? { ...item, status: selectedNewStatus } : item
        // ));

      } catch (error) {
        console.error("Error updating attendance status:", error);
        // TODO: Show an error message to the user
      } finally {
        setIsDialogOpen(false);
        setSelectedContact(null);
        setSelectedNewStatus(null);
      }
    }
  };

  // Sort data by Group/Event Name for grouping
  // Then sort by date in descending order within each group
  const sortedData = [...sampleData].sort((a, b) => {
    const groupCompare = a.groupEventName.localeCompare(b.groupEventName);

    if (groupCompare !== 0) return groupCompare;
    // Assuming dateTime can be directly compared or parsed to Date objects
    return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
  });

 return (
    <>
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Event Attendance Summary</h1>
      {/* This is the EventAttendanceSummaryPage component */}

      <h2 className="text-xl font-semibold mb-2">Current Month: {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
      {/* Placeholder for the actual report content */}
      <div>
        <p className="text-gray-600 mb-6">Summary of attendance for your Group/Events in the current month.</p>

        {/* Table with Attendance Data */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date-Time</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((attendance, index) => {
                let currentGroup = ''; // To keep track of the current group for striped rows
                let isEvenRow = true; // To alternate row colors within each group
                const isNewGroup = attendance.groupEventName !== currentGroup;
                if (isNewGroup) {
                  currentGroup = attendance.groupEventName;
                  isEvenRow = true; // Reset row color for new group
                } else {
                    isEvenRow = !isEvenRow; // Alternate row color within group
                }

                const rowClassName = isEvenRow ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800';

                return (
                  <React.Fragment key={`${attendance.groupEventName}-${index}`}>
                    {isNewGroup && (
                      <tr className="bg-gray-200 dark:bg-gray-600">
                        <td className="px-4 py-2 whitespace-nowrap font-semibold" colSpan={5}>
                          {attendance.groupEventName}
                          {eventDetailsMap[attendance.groupEventName] && (
                            <span className="font-normal ml-4 text-gray-700 dark:text-gray-300">
                              {eventDetailsMap[attendance.groupEventName].startDate} - {eventDetailsMap[attendance.groupEventName].endDate}
                            </span>
                          )}
                        </td>
                      </tr>
                    )}
               <tr className={rowClassName}> {/* Removed Group/Event Name cell */}
                      <td className="px-4 py-2 whitespace-nowrap">
                        {attendance.dateTime}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                      <Link href="/dashboard/shares/new" className="text-blue-600 hover:underline">{attendance.fullName}</Link>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">{attendance.phoneNumber}</td>
 <td className="px-4 py-2 whitespace-nowrap text-center">
 {/* Wrap the DialogTrigger with a Dialog */}
 <Dialog open={isDialogOpen && selectedContact?.fullName === attendance.fullName} onOpenChange={setIsDialogOpen}>
 <DialogTrigger asChild>
 <Button variant="ghost" size="icon" onClick={() => {
 setSelectedContact(attendance);
 setSelectedNewStatus(attendance.status); // Set initial status in dialog
 }}>
 {/* Render appropriate icon based on attendance.status */}
 {attendance.status === 'confirmed' && <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />}
 {attendance.status === 'declined' && <XCircle className="h-5 w-5 text-red-600 mx-auto" />}
 {attendance.status === 'unconfirmed' && <HelpCircle className="h-5 w-5 text-gray-400 mx-auto" />}
 {attendance.status === 'disallowed' && <XCircle className="h-5 w-5 text-red-800 mx-auto" />} {/* TODO: Replace with a specific icon for 'disallowed' status */}
 </Button>
 </DialogTrigger>
 {/* DialogContent is rendered outside the table */}
 </Dialog> {/* <--- Close the Dialog component */}
 </td>
 </tr></React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Export Button */}
      <div className="mt-6 text-left">
        <a href="#" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Export current year data
        </a>
        <a href="#" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Export prior year data
        </a>
      </div>
    </div>


 {/* Dialog for changing status */}
 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
 <DialogContent>
 <DialogTitle>Change Attendance Status</DialogTitle>
 <DialogDescription>
           Select the new status for {selectedContact?.fullName || 'this contact'}.
 </DialogDescription>
 {/* Status selection options */}
 <div className="flex flex-col space-y-2">
 <Button variant={selectedNewStatus === 'confirmed' ? 'default' : 'outline'} onClick={() => setSelectedNewStatus('confirmed')}>
 Confirmed
 </Button>
 <Button variant={selectedNewStatus === 'declined' ? 'default' : 'outline'} onClick={() => setSelectedNewStatus('declined')}>
 Declined
 </Button>
 <Button variant={selectedNewStatus === 'unconfirmed' ? 'default' : 'outline'} onClick={() => setSelectedNewStatus('unconfirmed')}>
 Unconfirmed
 </Button>
 <Button variant={selectedNewStatus === 'disallowed' ? 'default' : 'outline'} onClick={() => setSelectedNewStatus('disallowed')}>
 Disallowed
 </Button>
 </div>
 <DialogFooter>
 <DialogClose asChild>
 <Button variant="outline">Cancel</Button>
 </DialogClose>
 <Button onClick={handleStatusChange} disabled={!selectedNewStatus || selectedNewStatus === selectedContact?.status}>
 Save
 </Button>
 </DialogFooter>
 </DialogContent>
 </Dialog>
    </>
  );
};

export default EventAttendanceSummaryPage;