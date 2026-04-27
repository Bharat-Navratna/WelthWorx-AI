import { Button } from '@/components/ui/button';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center'>
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-950/40 mb-6">
        <FileQuestion className="h-10 w-10 text-blue-500" />
      </div>

      <h1 className='text-6xl sm:text-8xl font-bold gradient-title mb-2'>
        404
      </h1>
      <h2 className='text-xl sm:text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100'>
        Page Not Found
      </h2>
      <p className='text-gray-500 dark:text-gray-400 mb-8 max-w-md text-sm sm:text-base'>
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/">
          <Button className="gap-2">
            <Home className="h-4 w-4" />
            Return Home
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
