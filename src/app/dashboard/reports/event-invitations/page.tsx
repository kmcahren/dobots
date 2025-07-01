import React from 'react';
import EventInvitationsContent from '@/components/EventInvitationsContent';

const EventInvitationsReportPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-6">
      {/* Render the client component */}
      <EventInvitationsContent />
    </div>
  );
};

export default EventInvitationsReportPage;