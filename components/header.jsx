import React from 'react';
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
    // Instead of 'bg-white/80', we use 'bg-background/80' so the background color
    // will update based on your custom property and dark mode.
    <div className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
      <Link
        href="/"
        className="relative inline-block mx-auto h-12 w-[150px] md:w-[200px] flex items-center justify-center logo-netflix-container"
      >
        {/* Light Mode Animated Logo */}
        <div className="dark:hidden w-full">
          <span className="logo-initial block w-full text-sm md:text-base">WW AI</span>
          <span className="logo-final block w-full text-sm md:text-base">WelthWorx AI</span>
        </div>
        {/* Dark Mode Animated Logo */}
        <div className="hidden dark:block w-full">
          <span className="logo-initial-dark block w-full text-sm md:text-base">WW AI</span>
          <span className="logo-final-dark block w-full text-sm md:text-base">WelthWorx AI</span>
        </div>
      </Link>

        <div className="flex items-center space-x-4">
          <ModeToggle />
          <SignedIn>
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 flex items-center gap-2">  
              <Button variant="outline">
                <LayoutDashboard size={18} />
                <span className="hidden md:inline cursor-pointer">Dashboard</span>
              </Button>
            </Link>
            <Link href="/transaction/create" className="flex items-center gap-2">
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
