"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const EventInvitationsReportPage = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const description = searchParams.get('description');
  const eventId = searchParams.get('eventId');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-6">
      <div className="flex flex-col items-center justify-center">
        {/* Display Title */}
        <h1 className="text-5xl font-extrabold text-center mb-6 text-white drop-shadow-lg">{title}</h1>

        {/* Display Description */}
        <p className="text-2xl text-center mb-8 text-yellow-200 font-semibold">{description}</p>
      </div>

      {/* Placeholder Link to Event Details */}
      {eventId && ( // Conditionally render the link if eventId exists
        <Link href={`/dashboard/events/${eventId}`} className="text-white px-4 py-2 rounded-md bg-white bg-opacity-10 border border-white border-opacity-30 hover:bg-opacity-20 text-xl font-medium transition-colors duration-300">
          Go to the Event
        </Link>
      )}

    </div>
  );
};

export default EventInvitationsReportPage;