import { LoginForm } from '@/components/auth/LoginForm';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - DOIT',
  description: 'Login to DOIT Team & Club Manager.',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-primary/10 p-4 selection:bg-primary/20 selection:text-primary">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
           <Image 
             src="/images/logo2.png" // "https://placehold.co/80x80.png" 
             alt="DOIT Logo" 
             width={110} 
             height={110} 
             className="mx-auto mb-6 rounded-2xl shadow-md" 
             data-ai-hint="app logo"
           />
          <h1 className="text-4xl font-bold font-headline text-primary">DO!</h1>
          <p className="mt-2 text-lg text-muted-foreground">Team & Club Management, Elegant & FREE!</p>
        </div>
        <LoginForm />
        <p className="px-8 text-center text-xs text-muted-foreground">
          By continuing, you agree to our{' '}
          <a href="https://www.dobots.co/termsofuse.html" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="https://www.dobots.co/privacypolicy.html" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
