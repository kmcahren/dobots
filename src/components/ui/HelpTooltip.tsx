import React from 'react';
import { HelpCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

interface HelpTooltipProps {
  helpText: string;
  icon?: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  iconClassName?: string;
}

const HelpTooltip: React.FC<HelpTooltipProps> = ({ helpText, icon, placement = "bottom", iconClassName }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className={`h-4 w-4 cursor-help ${iconClassName || 'text-muted-foreground'}`}>
          {icon || <HelpCircle className="h-4 w-4" />} {/* Keep the default size classes */}
        </Button>
      </PopoverTrigger>
      <PopoverContent side={placement} className="w-auto max-w-xs p-3 text-sm text-foreground bg-popover shadow-md rounded-md">
        {helpText}
      </PopoverContent>
    </Popover>
  );
};

export default HelpTooltip;