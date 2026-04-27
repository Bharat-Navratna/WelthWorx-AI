"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";
import DemoSignInButton from "./demo-sign-in-button";

const HeroSection = () => {
  const imageRef = useRef();

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="max-w-4xl mx-auto w-full mb-28 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-4 gradient-title leading-tight">
          Manage Your Finances with Intelligence
        </h1>
        <p className="text-sm md:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          An AI-powered financial platform that helps you track, analyze, and
          optimize your spending with real-time insights.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <DemoSignInButton size="lg" className="px-8" />
        </div>
        <div className="w-full">
          <div ref={imageRef} className="hero-image">
            <video
              autoPlay
              loop
              muted
              playsInline
              width={1920}
              height={720}
              className="rounded-lg shadow-2xl border mx-auto w-full"
            >
              <source
                src="/3752538-hd_1920_1080_24fps.webm"
                type="video/webm"
              />
              <source src="/3752538-hd_1920_1080_24fps.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
