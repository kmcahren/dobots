import React from 'react';
import { format } from 'date-fns';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react'; // Import icons

import Link from 'next/link';
interface AttendanceData {
  groupEventName: string;
  dateTime: string;
  fullName: string;
  phoneNumber: string;
  status: 'Confirmed' | 'Declined' | 'Unconfirmed';
}

const sampleData: AttendanceData[] = [
  {
    groupEventName: 'Group A - Team Meeting',
    dateTime: '2024-08-15 10:00 AM',
    fullName: 'John Doe',
    phoneNumber: '555-123-4567',
    status: 'Confirmed',
  },
  {
    groupEventName: 'Group A - Team Meeting',
    dateTime: '2024-08-15 10:00 AM',
    fullName: 'Jane Smith',
    phoneNumber: '555-987-6543',
    status: 'Declined',
  },
  {
    groupEventName: 'Group A - Team Meeting',
    dateTime: '2024-08-15 10:00 AM',
    fullName: 'Peter Jones',
    phoneNumber: '555-555-1212',
    status: 'Unconfirmed',
  },
  {
    groupEventName: 'Event B - Workshop',
    dateTime: '2024-08-20 02:30 PM',
    fullName: 'Alice Brown',
    phoneNumber: '555-111-2222',
    status: 'Confirmed',
  },
  {
    groupEventName: 'Event B - Workshop',
    dateTime: '2024-08-20 02:30 PM',
    fullName: 'Bob White',
    phoneNumber: '555-333-4444',
    status: 'Confirmed',
  },
  {
    groupEventName: 'Group C - Study Session',
    dateTime: '2024-08-25 06:00 PM',
    fullName: 'Charlie Green',
    phoneNumber: '555-666-7777',
    status: 'Unconfirmed',
  },
];

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

  // Sort data by Group/Event Name for grouping
  // Then sort by date in descending order within each group
  const sortedData = [...sampleData].sort((a, b) => {
    const groupCompare = a.groupEventName.localeCompare(b.groupEventName);

    if (groupCompare !== 0) return groupCompare;
    // Assuming dateTime can be directly compared or parsed to Date objects
    return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
  });

 return (
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
                        {attendance.status === 'Confirmed' && <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />}
                        {attendance.status === 'Declined' && <XCircle className="h-5 w-5 text-red-600 mx-auto" />}
                        {attendance.status === 'Unconfirmed' && <HelpCircle className="h-5 w-5 text-gray-400 mx-auto" />}
                      </td>
                    </tr>
                  </React.Fragment>
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
  );
};

export default EventAttendanceSummaryPage;