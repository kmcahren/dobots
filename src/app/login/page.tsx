import { LoginForm } from '@/components/auth/LoginForm';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - DOBOTS Do)))',
  description: 'Login to DOBOTS Group Event Payment App.',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-primary/10 p-4 selection:bg-primary/20 selection:text-primary">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
           <Image 
             src="/images/newlogo-150x150withco.png" // "https://placehold.co/80x80.png" 
             alt="DOBOTS Logo"
             priority 
             width={110} 
             height={110} 
             className="mx-auto mb-6 rounded-2xl shadow-md" 
             data-ai-hint="app logo"
           />
          <h1 className="text-4xl font-bold font-headline text-primary">Do)))</h1>
          <p className="mt-2 text-lg text-muted-foreground">Group Event Payment App - it's FREE!</p>
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
          . Buy more&nbsp;
          <a href="https://www.dobots.co/" className="underline underline-offset-4 hover:text-primary">
             DOBOTS
          </a>
          !
        </p>
      </div>
    </div>
  );
}
