"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const EventInvitationsReportPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-50px)] bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-6">
      {/* Wrap the content that uses useSearchParams with Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        <EventInvitationsContent />
 </Suspense>
    </div>
  );
};

const EventInvitationsContent = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const description = searchParams.get('description');
  const eventId = searchParams.get('eventId');

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Display Title */}
      <h1 className="text-5xl font-extrabold text-center mb-6 text-white drop-shadow-lg">{title}</h1>

      {/* Display Description */}
      <p className="text-2xl text-center mb-8 text-yellow-200 font-semibold">{description}</p>

      {/* Go to Event Link */}
      {eventId && (
        <Link href={`/dashboard/events/${eventId}`} className="text-white px-4 py-2 rounded-md bg-white bg-opacity-10 border border-white border-opacity-30 hover:bg-opacity-20 text-xl font-medium transition-colors duration-300">
          Go to the Event
        </Link>
      )}

      <div className="text-center text-sm text-gray-300 mt-16">
        Invitation by: <a href="https://app.dobots.co" className="underline hover:text-gray-200">app.dobots.co</a> &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default EventInvitationsReportPage;