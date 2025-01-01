import React from "react";
import Header from "@/components/Header";
import { HeroSearch } from "@/components/home/HeroSearch";
import { CallToAction } from "@/components/home/CallToAction";
import { Features } from "@/components/home/Features";
import { FeaturedInternships } from "@/components/home/FeaturedInternships";
import { FeaturedGigs } from "@/components/home/FeaturedGigs";
import { Stats } from "@/components/home/Stats";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TrustSignals } from "@/components/home/TrustSignals";
import { WaitlistForm } from "@/components/home/WaitlistForm";
import { RecommendedListings } from "@/components/home/RecommendedListings";
import Footer from "@/components/Footer";

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
              Connecting Talent with Opportunity
            </p>
            <HeroSearch />
          </div>
        </section>
        <RecommendedListings />
        <FeaturedInternships />
        <FeaturedGigs />
        <Features />
        <HowItWorks />
        <Stats />
        <TrustSignals />
        <WaitlistForm />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;