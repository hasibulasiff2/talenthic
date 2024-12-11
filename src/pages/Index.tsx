import React from "react";
import { Search, Briefcase, Code, Users, MessageSquare, Target, Brain } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { HeroScene } from "@/components/HeroScene";

const features = [
  {
    icon: Briefcase,
    title: "Internship Opportunities",
    description: "Discover tailored internship opportunities that match your skills and career goals.",
  },
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Advanced AI tools help businesses find their perfect candidates effortlessly.",
  },
  {
    icon: Target,
    title: "Gig Management",
    description: "End-to-end project management and task collaboration platform.",
  },
  {
    icon: MessageSquare,
    title: "Collaboration Hub",
    description: "Seamless communication, contract management, and task tracking system.",
  },
];

const categories = [
  { icon: Briefcase, name: "Business", count: 234 },
  { icon: Code, name: "Development", count: 156 },
  { icon: Users, name: "Design", count: 89 },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-accent">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 relative overflow-hidden">
          <HeroScene />
          <div className="text-center animate-fade-up relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-secondary bg-accent/80 backdrop-blur-sm inline-block px-4 py-2 rounded-lg">
              Connect with Top{" "}
              <span className="text-primary">Talent & Opportunities</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto bg-accent/80 backdrop-blur-sm px-4 py-2 rounded-lg">
              The ultimate platform connecting talented students with innovative companies 
              for internships and project collaborations.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-12">
              <input
                type="text"
                placeholder="Search for internships or gigs..."
                className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-primary shadow-sm text-lg bg-white/90 backdrop-blur-sm"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-center gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8 bg-white/90 backdrop-blur-sm hover:bg-white/100 transition-all"
              >
                Find Internships
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 bg-white/50 backdrop-blur-sm hover:bg-white/70"
              >
                Post a Job
              </Button>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="container mx-auto px-4 py-16 bg-white rounded-3xl shadow-sm">
          <h2 className="text-3xl font-bold mb-12 text-center text-secondary">
            Why Choose Talenthic?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass-card rounded-xl p-6 hover-scale cursor-pointer text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8 text-secondary">
            Browse Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className="glass-card rounded-xl p-6 hover-scale cursor-pointer"
              >
                <category.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-muted-foreground">
                  {category.count} opportunities
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card rounded-xl p-8">
              <div className="text-4xl font-bold text-primary mb-2">2,500+</div>
              <div className="text-muted-foreground">Active Internships</div>
            </div>
            <div className="glass-card rounded-xl p-8">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Partner Companies</div>
            </div>
            <div className="glass-card rounded-xl p-8">
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Successful Placements</div>
            </div>
          </div>
        </section>

        {/* CTA Section - Updated with better contrast */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="glass-card rounded-3xl p-12 bg-gradient-to-br from-secondary to-secondary/90 text-white">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Whether you're a student looking for opportunities or a company seeking fresh talent,
              Talenthic is here to help you succeed.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                size="lg" 
                variant="default" 
                className="text-lg px-8 bg-primary hover:bg-primary/90"
              >
                Sign Up Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
