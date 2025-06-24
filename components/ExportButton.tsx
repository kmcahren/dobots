"use client";

import React from 'react';

interface ExportButtonProps {
  onClick: () => void;
  className?: string; // Added className prop
}

const ExportButton: React.FC<ExportButtonProps> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={className} // Use the provided className
    >
      Export Data
    </button>
  );
};

export default ExportButton;