import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, Briefcase, Code, Users, MessageSquare, Target, Brain, ArrowRight, Star, Clock, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { HeroScene } from "@/components/HeroScene";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FeaturedInternships } from "@/components/home/FeaturedInternships";
import { FeaturedGigs } from "@/components/home/FeaturedGigs";
import { Features } from "@/components/home/Features";
import { Stats } from "@/components/home/Stats";
import { CallToAction } from "@/components/home/CallToAction";

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchInput = event.currentTarget.querySelector('input') as HTMLInputElement;
    if (searchInput.value.trim()) {
      navigate(`/internships?search=${encodeURIComponent(searchInput.value.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-accent to-white">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 relative overflow-hidden min-h-[80vh] flex items-center">
          <HeroScene />
          <div className="text-center relative z-10 w-full">
            <Badge variant="secondary" className="mb-4 animate-fade-in">
              🚀 The Future of Work
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-secondary bg-white/30 backdrop-blur-md inline-block px-6 py-3 rounded-2xl animate-fade-up">
              Discover Your Next{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Career Move
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto bg-white/30 backdrop-blur-md px-6 py-3 rounded-xl animate-fade-up delay-100">
              Connect with innovative companies, find exciting internships, and explore freelance opportunities.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative mb-12 animate-fade-up delay-200">
              <input
                type="text"
                placeholder="Search for internships, gigs, or companies..."
                className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-primary shadow-lg text-lg bg-white/90 backdrop-blur-sm"
              />
              <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 p-0">
                <Search className="w-5 h-5" />
              </Button>
            </form>

            <div className="flex justify-center gap-4 animate-fade-up delay-300">
              <Button 
                size="lg" 
                className="text-lg px-8 bg-primary hover:bg-primary/90 transition-all group"
                onClick={() => navigate('/internships')}
              >
                Find Opportunities
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 border-2 hover:bg-secondary hover:text-white transition-all"
                onClick={() => navigate('/post')}
              >
                Post a Job
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Sections */}
        <FeaturedInternships />
        <FeaturedGigs />
        <Features />
        <Stats />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;