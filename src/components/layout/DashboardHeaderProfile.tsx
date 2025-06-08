"use client"; 
import Image from 'next/image';
import { Users, ShieldCheck } from 'lucide-react'; // ShieldCheck for groups/clubs

export function DashboardHeaderProfile() {
  // These would come from state/props in a real application
  const memberCount = 120; // Example data
  const groupCount = 5;   // Example data

  return (
    <div className="mb-6 rounded-xl overflow-hidden shadow-lg border border-border/50">
      <div className="relative h-40 md:h-56 bg-gradient-to-r from-primary/80 to-accent/80">
        <Image
          src="https://placehold.co/1200x300.png" // Placeholder for customizable image
          alt="Team or Club Banner"
          layout="fill"
          objectFit="cover"
          className="opacity-30" // Make placeholder less prominent if it's just a pattern
          data-ai-hint="team sport collage" // More specific hint
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold font-headline text-white drop-shadow-md">
            Welcome to DOIT!
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-white text-sm md:text-base bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              <Users className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              <span>{memberCount} Members Connected</span>
            </div>
            <div className="flex items-center text-white text-sm md:text-base bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              <span>{groupCount} Groups Associated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
