import React from 'react';
import { format } from 'date-fns';
import { CheckCircle2, XCircle } from 'lucide-react'; // Import icons
import Link from 'next/link';

// Define a type for your data
interface PaymentData {
  paymentRequestName: string;
  dateTime: string;
  fullName: string;
  phoneNumber: string;
  status: 'Paid' | 'Unpaid';
}

const sampleData: PaymentData[] = [
  {
    paymentRequestName: 'Team Jersey Fee',
    dateTime: '2024-08-10 09:00 AM',
    fullName: 'John Doe',
    phoneNumber: '555-123-4567',
    status: 'Paid',
  },
  {
    paymentRequestName: 'Team Jersey Fee',
    dateTime: '2024-08-11 10:00 AM',
    fullName: 'Jane Smith',
    phoneNumber: '555-987-6543',
    status: 'Unpaid',
  },
  {
    paymentRequestName: 'Tournament Entry Fee',
    dateTime: '2024-08-12 01:00 PM',
    fullName: 'Peter Jones',
    phoneNumber: '555-555-1212',
    status: 'Paid',
  },
    {
    paymentRequestName: 'Tournament Entry Fee',
    dateTime: '2024-08-13 02:00 PM',
    fullName: 'Sarah Brown',
    phoneNumber: '555-444-3333',
    status: 'Unpaid',
  },
];

const PaymentStatusReportPage = () => {

  // Sort data by Payment Request Name for grouping
  const sortedData = [...sampleData].sort((a, b) => {
    const groupCompare = a.paymentRequestName.localeCompare(b.paymentRequestName);
    if (groupCompare !== 0) return groupCompare;
    return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime(); // Sort by date descending within group
  });

  let currentGroup = ''; // To keep track of the current group for striped rows
  let isEvenRow = true; // To alternate row colors within each group

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Payment Status Report</h1>
      <h2 className="text-xl font-semibold mb-2">Current Month: {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
      <p className="text-gray-600 mb-6">Summary of payment for your Payment Requests in the current month.</p>

      {/* Table with Payment Status Data */}
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
            {sortedData.map((payment, index) => {
              const isNewGroup = payment.paymentRequestName !== currentGroup;
              if (isNewGroup) {
                currentGroup = payment.paymentRequestName;
                isEvenRow = true; // Reset row color for new group
              } else {
                  isEvenRow = !isEvenRow; // Alternate row color within group
              }

              const rowClassName = isEvenRow ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800';

              return (
                <React.Fragment key={`${payment.paymentRequestName}-${index}`}>
                  {isNewGroup && (
                    <tr className="bg-gray-200 dark:bg-gray-600">
                      <td className="px-4 py-2 whitespace-nowrap font-semibold" colSpan={4}>{payment.paymentRequestName}</td>
                    </tr>
                  )}
                  <tr className={rowClassName}>
                    <td className="px-4 py-2 whitespace-nowrap">{payment.dateTime}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <Link href="/dashboard/shares/new" className="text-blue-600 hover:underline">{payment.fullName}</Link>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">{payment.phoneNumber}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-center">
                      {payment.status === 'Paid' && <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />}
                      {payment.status === 'Unpaid' && <XCircle className="h-5 w-5 text-red-600 mx-auto" />}
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default PaymentStatusReportPage;