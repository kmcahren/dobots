"use client";
import { useState, type FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { Loader2, Smartphone, KeyRound } from 'lucide-react'; // Icons for visual cues

export function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Sending OTP to:', phoneNumber);
    setIsLoading(false);
    setOtpSent(true);
    // In a real app, call an API to send OTP
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Verifying OTP:', otp, 'for phone:', phoneNumber);
    setIsLoading(false);
    // In a real app, call an API to verify OTP and get a session
    // On successful login:
    router.push('/dashboard');
  };

  return (
    <Card className="shadow-xl border-none bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-center text-primary">
          {otpSent ? 'Enter Verification Code' : 'Welcome Back!'}
        </CardTitle>
        <CardDescription className="text-center">
          {otpSent ? `We've sent a one-time password to ${phoneNumber}.` : 'Enter your mobile number to sign in.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-muted-foreground">Phone Number</Label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 555 123 4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="pl-10 text-base h-12 rounded-md"
                  disabled={isLoading}
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-12 text-base rounded-md" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              Send OTP
            </Button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-muted-foreground">One-Time Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  placeholder="6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="pl-10 text-base h-12 rounded-md tracking-widest text-center"
                  disabled={isLoading}
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-12 text-base rounded-md" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              Verify & Login
            </Button>
          </form>
        )}
      </CardContent>
      {otpSent && (
        <CardFooter className="flex justify-center">
          <Button variant="link" className="text-sm text-muted-foreground hover:text-primary" onClick={() => { setOtpSent(false); setOtp(''); setIsLoading(false); }} disabled={isLoading}>
            Change phone number or resend OTP
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
