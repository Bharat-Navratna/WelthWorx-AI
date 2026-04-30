import HeroSection from "@/components/hero";
import StatsSection from "@/components/stats-section";
import { Card, CardContent } from "@/components/ui/card";
import { featuresData, howItWorksData, testimonialsData } from "@/data/landing";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="mt-14 sm:mt-16 md:mt-20">

      {/* Hero */}
      <HeroSection />

      {/* Stats — client component (CountUp + InView) */}
      <StatsSection />

      {/* Features */}
      <section className="py-16 sm:py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-12 text-gray-800 dark:text-gray-100">
            Everything you need to manage your finances
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuresData.map((feature, index) => (
              <Card key={index} className="p-4 sm:p-6 bg-white dark:bg-gray-800">
                <CardContent className="space-y-3 pt-4">
                  {feature.icon}
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 bg-blue-100 dark:bg-blue-950/40">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 sm:mb-16 text-gray-800 dark:text-gray-100">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center px-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                  {step.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-12 text-gray-800 dark:text-gray-100">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonialsData.map((testimonial, index) => (
              <Card key={index} className="p-4 sm:p-6 bg-white dark:bg-gray-800">
                <CardContent className="pt-4">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full shrink-0"
                    />
                    <div className="ml-3 sm:ml-4 min-w-0">
                      <div className="font-semibold text-gray-800 dark:text-gray-100 truncate">
                        {testimonial.name}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    {testimonial.quote}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-blue-600 dark:bg-blue-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
            Join thousands of users who are already managing their finances with
            the power of WelthWorx AI
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-gray-100 text-blue-600 hover:bg-blue-50 dark:bg-black dark:text-gray-300 dark:hover:bg-gray-900"
            >
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
