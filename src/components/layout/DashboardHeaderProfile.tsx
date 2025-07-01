
"use client"; 
"use client";
import Image from 'next/image';
import { Users, ShieldCheck } from 'lucide-react'; // ShieldCheck for groups/clubs
import HelpTooltip from '@/components/ui/HelpTooltip';
import Link from 'next/link';

export function DashboardHeaderProfile() {
  // These would come from state/props in a real application
  const memberCount = 120; // Example data
  const groupCount = 5;   // Example data

  return ( 
    <Link href="#" passHref>
    <div className="mb-6 rounded-xl overflow-hidden shadow-lg border border-border/50">
      <div className="relative h-32 md:h-40 bg-gradient-to-r from-primary/80 to-accent/80">
        <Image
          src="/images/flame_banner.gif" // Placeholder for customizable image
          alt="Team or Club Banner"
          fill // Replaced layout="fill"
          style={{ objectFit: 'cover' }} // Replaced objectFit="cover"
          className="opacity-30" // Make placeholder less prominent if it's just a pattern
          data-ai-hint="team sport collage" // More specific hint
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center space-y-2">
 <div className="flex items-center justify-center gap-2">
 <h2 className="text-xl md:text-2xl font-bold font-headline text-white drop-shadow-md">
Welcome to the Do))) App
          </h2>
 <HelpTooltip helpText="This is your dashboard and home navigation page. Tool tips on headings will help guide your experience. NFC enabled DOBOTS are not necessary to operate this App, but they do automate many useful functions like event sharing, payment requests and other cool NFC applications!" iconClassName="text-white" />
 </div>
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="flex items-center text-white text-xs md:text-sm px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg">
              <Users className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" />
              <span>{memberCount} Connections</span>
            </div>
            <div className="flex items-center text-white text-xs md:text-sm px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" />
              <span>{groupCount} Groups</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
}
