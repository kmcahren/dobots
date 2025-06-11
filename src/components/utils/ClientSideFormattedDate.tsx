
"use client";

import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

interface ClientSideFormattedDateProps {
  isoDateString?: string;
  formatString?: string;
  placeholder?: string;
  className?: string;
}

export function ClientSideFormattedDate({
  isoDateString,
  formatString = "PPp",
  placeholder = "Loading date...",
  className,
}: ClientSideFormattedDateProps) {
  const [formattedDate, setFormattedDate] = useState<string>(placeholder);

  useEffect(() => {
    if (isoDateString) {
      try {
        const date = parseISO(isoDateString);
        setFormattedDate(format(date, formatString));
      } catch (error) {
        console.error("Error formatting date:", error);
        setFormattedDate("Invalid date");
      }
    } else {
      // If isoDateString is undefined or null, don't render anything or render an empty string
      // setFormattedDate(""); // Or handle as per requirement, maybe return null from component
    }
  }, [isoDateString, formatString]);

  if (!isoDateString) {
    // Don't render the component if there's no date string
    // This prevents rendering the placeholder if the date is intentionally absent
    return null; 
  }

  return <span className={className}>{formattedDate}</span>;
}
