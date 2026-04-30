import { SignedOut, SignedIn, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from './ui/button';
import { LayoutDashboard, PenBox } from 'lucide-react';
import { checkUser } from '@/lib/checkUser';
import { ModeToggle } from './ui/toggle-mode';
import DemoSignInButton from './demo-sign-in-button';

const Header = async () => {
  await checkUser();

  return (
    <div className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between gap-2">

        {/* Brand */}
        <Link href="/" className="flex items-center shrink-0">
          <span className="text-lg md:text-xl lg:text-2xl font-bold leading-none select-none gradient-logo">
            WelthWorx AI
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <ModeToggle />
          <SignedIn>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-300"
            >
              <Button variant="outline" size="sm" className="sm:size-default">
                <LayoutDashboard size={18} />
                <span className="hidden md:inline cursor-pointer">Dashboard</span>
              </Button>
            </Link>
            <Link
              href="/transaction/create"
              className="flex items-center gap-2"
            >
              <Button size="sm" className="sm:size-default">
                <PenBox size={18} />
                <span className="hidden md:inline cursor-pointer">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <DemoSignInButton size="sm" className="px-3" />
            <SignInButton forceRedirectUrl="/dashboard">
              <Button size="sm">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarImage: "w-9 h-9",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
};

export default Header;
