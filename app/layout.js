import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WelthWorx AI",
  description: "One stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/finance.png" sizes="any" />
        </head>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <footer className="bg-blue-50 py-12 dark:bg-black">
              <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-100">
                <p>Made with ❤️ by Bharat Anil Navratna</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
