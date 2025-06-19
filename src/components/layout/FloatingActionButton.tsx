"use client";
import { Plus, CalendarPlus, MessageSquarePlus, Share2, CreditCard, Edit3 } from 'lucide-react'; // Edit3 for generic "New Item"
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export function FloatingActionButton() {
  return (
    <div className="fixed bottom-[calc(4rem+1.5rem)] right-6 md:bottom-8 md:right-8 z-50"> {/* Adjusted bottom for bottom nav: 4rem nav + 1.5rem margin */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="default" 
            size="icon" 
            className="rounded-full w-14 h-14 shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground"
            aria-label="Create new item"
          >
            <Plus className="h-7 w-7" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="top" className="w-60 mb-2 mr-1 rounded-lg shadow-xl border-border bg-popover">
          <DropdownMenuLabel className="font-medium text-popover-foreground px-3 py-2">Create New</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="focus:bg-accent/20 focus:text-accent-foreground cursor-pointer">
            <Link href="/dashboard/events/new" className="flex items-center px-3 py-2.5 text-sm">
              <CalendarPlus className="mr-3 h-5 w-5 text-primary" />
              <span>New Event/Group</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="focus:bg-accent/20 focus:text-accent-foreground cursor-pointer">
            <Link href="/dashboard/notifications/new" className="flex items-center px-3 py-2.5 text-sm">
              <MessageSquarePlus className="mr-3 h-5 w-5 text-primary" />
              <span>New Notification/Survey</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="focus:bg-accent/20 focus:text-accent-foreground cursor-pointer">
            <Link href="/dashboard/shares/new" className="flex items-center px-3 py-2.5 text-sm">
              <Share2 className="mr-3 h-5 w-5 text-primary" />
              <span>New Share/Report</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="focus:bg-accent/20 focus:text-accent-foreground cursor-pointer">
            <Link href="/dashboard/payments/new" className="flex items-center px-3 py-2.5 text-sm">
              <CreditCard className="mr-3 h-5 w-5 text-primary" />
              <span>New Payment Request</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
