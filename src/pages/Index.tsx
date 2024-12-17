import React from "react";
import Header from "@/components/Header";
import { CallToAction } from "@/components/home/CallToAction";
import { Features } from "@/components/home/Features";
import { FeaturedInternships } from "@/components/home/FeaturedInternships";
import { FeaturedGigs } from "@/components/home/FeaturedGigs";
import { Stats } from "@/components/home/Stats";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative">
          <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-8">
              Find Your Perfect{" "}
              <span className="text-primary">Internship or Gig</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-12">
              Connect with top companies, gain valuable experience, and kickstart your career
              with AI-powered job matching and secure collaboration tools.
            </p>
          </div>
        </section>
        <FeaturedInternships />
        <FeaturedGigs />
        <Features />
        <Stats />
        <CallToAction />
      </main>
    </div>
  );
};

export default Index;