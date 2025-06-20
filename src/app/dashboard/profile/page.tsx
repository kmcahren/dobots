"use client";

import React from 'react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ProfileForm } from '@/components/profile/ProfileForm';

export default function ProfilePage() {
  // Placeholder user data - in a real app, this would come from auth/state
  const userData = {
 name: "Jane Doe",
    email: "jane.doe@example.com",
    imageUrl: "https://placehold.co/100x100.png?text=JP",
    phoneNumber: "+1 123-456-7890",
    address: "123 Main St, Anytown, CA 91234",
  };

  const [user, setUser] = useState<typeof userData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user data from your backend or auth service
    // For now, simulate a delay and use placeholder data
    const timer = setTimeout(() => {
      setUser(userData);
      setLoading(false);
    }, 1000); // Simulate a 1-second delay

    // Cleanup function (optional, but good practice for async operations)
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div className="text-center py-8">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading profile: {error}</div>;
  }

  if (!user) {
     return <div className="text-center py-8">User data not available.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold font-headline mb-6">User Profile</h1>

      <Card className="max-w-md mx-auto shadow-lg rounded-lg">
 <ProfileForm initialData={userData} />
      </Card>

    </div>
  );
}