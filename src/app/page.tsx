import { redirect } from 'next/navigation';

export default function RootPage() {
  // In a real app, you might check auth status here.
  // For now, we redirect all users to the login page.
  redirect('/login');
  
  // Return null or a loading component if redirect doesn't happen immediately server-side
  return null; 
}
