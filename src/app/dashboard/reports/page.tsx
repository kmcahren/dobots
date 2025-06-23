'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const ReportsPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">View summaries and details of your activities.</p>
      </div>
      <Separator />
      <div className="-mx-2 space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-start"
          asChild
        >
          <Link href="/dashboard/reports/event-attendance-summary">
            Event Attendance Summary
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          asChild
        >
          <Link href="/dashboard/reports/payment-status-report">
            Payment Status Report
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/settings/nfc-utilities">NFC Utilities</Link>
        </Button>
      </div>
    </div>
  );
};

export default ReportsPage;