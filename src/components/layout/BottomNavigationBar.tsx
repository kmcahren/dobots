"use client";
import Link from 'next/link';
import { Home, Bell, Users, CreditCard as CreditCardIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react'; // Import useState

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/app-notifications', label: 'Alerts', icon: Bell }, // Changed label for clarity
  { href: '/contacts', label: 'Contacts', icon: Users },
  { href: '/app-payments', label: 'Payments', icon: CreditCardIcon },
];

export function BottomNavigationBar() {
  const pathname = usePathname();
  const [unacknowledgedCount] = useState(5); // Static or initial value

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-t-lg md:hidden z-40">
      <div className="flex justify-around items-stretch h-16">
        {navItems.map((item) => {
          // More robust active check: handles /dashboard and /dashboard/events/* as "Home" active
          const isActive = item.href === '/dashboard' ? pathname.startsWith('/dashboard') : pathname === item.href;
          const isAlertsLink = item.href === '/app-notifications';
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={cn(
                "flex flex-col items-center justify-center flex-1 p-1 text-center transition-colors duration-200 ease-in-out relative",
                isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-1 bg-primary rounded-b-full"></span>}
              <div className="relative"> {/* Wrapper for icon and badge */}
                <item.icon className="h-6 w-6 mb-0.5" strokeWidth={isActive ? 2.5 : 2} />
                {/* Render badge if it's the alerts link and count > 0 */}
                {isAlertsLink && unacknowledgedCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-primary-foreground transform translate-x-1/2 -translate-y-1/2 bg-purple-500 rounded-full">
                    {unacknowledgedCount}{" "}
                  </span>
                )}
              </div>

              <span className={cn("text-xs", isActive ? "font-semibold" : "font-normal")}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
