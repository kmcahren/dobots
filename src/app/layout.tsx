// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWNs5Ke0aK1GZhmIa-4AUu78-6FqulBa4",
  authDomain: "doit-team-club-manager.firebaseapp.com",
  projectId: "doit-team-club-manager",
  storageBucket: "doit-team-club-manager.firebasestorage.app",
  messagingSenderId: "370187476936",
  appId: "1:370187476936:web:864828c99d10cf535baafd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Added Toaster for global notifications
import { ToastStateProvider } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Do))): Group Event Payment App',
  description: 'Free and Simple Team and Club Management Mobile App by DOBOTS',
  manifest: '/manifest.json', // Link to the manifest file
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <meta name="application-name" content="DOIT" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DOIT" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" /> 
        <meta name="msapplication-TileColor" content="#E4F6FD" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#E4F6FD" />

        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512x512.png" />
      </head>
      <body className="font-body antialiased">
        {children}
        {/* Toaster must be inside the ToastStateProvider to consume the context */}
        <ToastStateProvider>
          <Toaster />
        </ToastStateProvider>
      </body>
    </html>
  );
}
