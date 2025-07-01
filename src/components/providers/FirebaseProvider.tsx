"use client";

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import React, { createContext, useContext } from 'react';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWNs5Ke0aK1GZhmIa-4AUu78-6FqulBa4",
  authDomain: "doit-team-club-manager.firebaseapp.com",
  projectId: "doit-team-club-manager",
  storageBucket: "doit-team-club-manager.firebasestorage.app",
  messagingSenderId: "370187476936",
  appId: "1:370187476936:web:864828c99d10cf535baafd"
};

let firebaseApp: FirebaseApp;

// Initialize Firebase safely for client-side execution
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}

const FirebaseContext = createContext<FirebaseApp | null>(null);

export const useFirebase = () => {
    return useContext(FirebaseContext);
};

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseContext.Provider value={firebaseApp}>
      {children}
    </FirebaseContext.Provider>
  );
}
