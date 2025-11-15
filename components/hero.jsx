"use client";

import Link from "next/link";
import { Button } from "./ui/button";
// import Image from "next/image";
import { useEffect, useRef } from "react";


const HeroSection = () => {
    const imageRef = useRef();

    useEffect(() => {
        const imageElement = imageRef.current;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;

            if(scrollPosition>scrollThreshold) {
                imageElement.classList.add("scrolled");
            } else {
                imageElement.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <div className="max-w-3xl mx-auto w-screen mb-28">
        <div className="container mx-auto text-center" >
            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-4 gradient-title" >
                Manage Your Finances with Intelligence
            </h1>
            <p className="text-sm md:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto" >
                An AI-powered financial platform that helps you track, analyze, and optimize your spending with real-time insights.
            </p>
            <div className="flex justify-center space-x-4 mb-4" >
                <Link href="/dashboard">
                   <Button size="lg" className="px-8" >
                    Get Started
                   </Button>
                </Link>
                {/* Can link any demo video or think of using the button below for something else */}
                <Link href=""> 
                   <Button size="lg" variant="outline" className="px-8" >
                    Watch Demo
                   </Button>
                </Link>
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
                    className="rounded-lg shadow-2xl border mx-auto"
                    >
                    <source src="/3752538-hd_1920_1080_24fps.webm" type="video/webm" />
                    <source src="/3752538-hd_1920_1080_24fps.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>              
    </div>
  )
}

export default HeroSection;
