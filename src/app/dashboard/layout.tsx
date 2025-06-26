import type { Metadata } from 'next';
import { AppHeader } from '@/components/layout/AppHeader';
import { BottomNavigationBar } from '@/components/layout/BottomNavigationBar';
import { FloatingActionButton } from '@/components/layout/FloatingActionButton';

export const metadata: Metadata = {
  title: 'DOBOTS Do))) App',
  description: 'Group Event Payment App.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-6 md:py-8 mb-16 md:mb-0"> {/* mb-16 for bottom nav space on mobile */}
        {children}
      </main>
      <FloatingActionButton />
      <BottomNavigationBar />
      {/* Toaster is already in RootLayout */}
    </div>
  );
}
