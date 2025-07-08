import { SignedOut, SignedIn, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { LayoutDashboard, PenBox } from 'lucide-react';
import { checkUser } from '@/lib/checkUser';
import { ModeToggle } from './ui/toggle-mode';

const Header = async () => {
  await checkUser();

  return (
    <div className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <nav className="container mx-auto px-2 py-4 flex flex-wrap items-center justify-between">
      <Link
        href="/"
        className="relative inline-block h-12 w-[200px] flex items-center justify-center logo-netflix-container"
      >
        {/* Small screens: only “WW AI” (no animation) */}
        <div className="block md:hidden w-full text-center">
          <span className="logo-initial block w-full text-base font-bold">
            WW AI
          </span>
        </div>

        {/* Medium+ screens: full animated logo */}
        <div className="hidden md:block w-full text-center">
          {/* Light Mode */}
          <div className="dark:hidden relative w-full h-full">
            <span className="logo-initial block w-full text-base font-bold">
              WW AI
            </span>
            <span className="logo-final block w-full text-base font-bold">
              WelthWorx AI
            </span>
          </div>

          {/* Dark Mode */}
          <div className="hidden dark:block relative w-full h-full">
            <span className="logo-initial-dark block w-full text-base font-bold">
              WW AI
            </span>
            <span className="logo-final-dark block w-full text-base font-bold">
              WelthWorx AI
            </span>
          </div>
        </div>
      </Link>




        <div className="flex items-center space-x-4">
          <ModeToggle />
          <SignedIn>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-300"
            >
              <Button variant="outline">
                <LayoutDashboard size={18} />
                <span className="hidden md:inline cursor-pointer">Dashboard</span>
              </Button>
            </Link>
            <Link
              href="/transaction/create"
              className="flex items-center gap-2"
            >
              <Button>
                <PenBox size={18} />
                <span className="hidden md:inline cursor-pointer">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarImage: "w-10 h-10",
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
