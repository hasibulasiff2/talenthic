import React from "react";
import { Search, Briefcase, Code, Users, MessageSquare, Target, Brain, ArrowRight, Star, Clock, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { HeroScene } from "@/components/HeroScene";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Briefcase,
    title: "Smart Matching",
    description: "AI-powered job matching that connects you with the perfect opportunities.",
  },
  {
    icon: Brain,
    title: "Skill Analysis",
    description: "Advanced skill assessment and recommendations for career growth.",
  },
  {
    icon: Target,
    title: "Project Management",
    description: "Comprehensive tools for managing gigs and internship projects.",
  },
  {
    icon: MessageSquare,
    title: "Collaboration Hub",
    description: "Seamless communication and task management platform.",
  },
];

const dummyInternships = [
  {
    title: "UX Design Intern",
    company: "TechVision Labs",
    location: "Remote",
    duration: "3 months",
    salary: "$2000/month",
    tags: ["Design", "UI/UX", "Figma"],
  },
  {
    title: "Frontend Developer",
    company: "InnovateCorp",
    location: "New York",
    duration: "6 months",
    salary: "$2500/month",
    tags: ["React", "TypeScript", "Tailwind"],
  },
  {
    title: "Data Science Intern",
    company: "DataMinds",
    location: "San Francisco",
    duration: "4 months",
    salary: "$3000/month",
    tags: ["Python", "ML", "Analytics"],
  },
];

const dummyGigs = [
  {
    title: "Brand Identity Design",
    budget: "$500-1000",
    duration: "2 weeks",
    skills: ["Branding", "Logo Design", "Adobe Suite"],
    company: "StartupX",
  },
  {
    title: "Mobile App Development",
    budget: "$2000-3000",
    duration: "1 month",
    skills: ["React Native", "API Integration", "UI Design"],
    company: "AppWorks",
  },
  {
    title: "Content Writing",
    budget: "$300-500",
    duration: "1 week",
    skills: ["Copywriting", "SEO", "Research"],
    company: "ContentPro",
  },
];

const Index = () => {
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
            <div className="max-w-2xl mx-auto relative mb-12 animate-fade-up delay-200">
              <input
                type="text"
                placeholder="Search for internships, gigs, or companies..."
                className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-primary shadow-lg text-lg bg-white/90 backdrop-blur-sm"
              />
              <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 p-0">
                <Search className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex justify-center gap-4 animate-fade-up delay-300">
              <Button 
                size="lg" 
                className="text-lg px-8 bg-primary hover:bg-primary/90 transition-all group"
              >
                Find Opportunities
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 border-2 hover:bg-secondary hover:text-white transition-all"
              >
                Post a Job
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Internships */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Featured Internships
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-secondary">
              Top Internship Opportunities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover hand-picked internships from leading companies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dummyInternships.map((internship, index) => (
              <Card key={index} className="hover-scale group">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{internship.location}</Badge>
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {internship.title}
                  </CardTitle>
                  <CardDescription>{internship.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{internship.duration}</span>
                    <span className="text-sm font-medium ml-auto">{internship.salary}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {internship.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="bg-accent">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="group">
              View All Internships
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>

        {/* Featured Gigs */}
        <section className="container mx-auto px-4 py-16 bg-accent rounded-3xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Featured Gigs
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-secondary">
              Exciting Freelance Projects
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find flexible gig opportunities that match your skills
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dummyGigs.map((gig, index) => (
              <Card key={index} className="hover-scale group bg-white/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{gig.duration}</Badge>
                    <Badge variant="outline">{gig.budget}</Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {gig.title}
                  </CardTitle>
                  <CardDescription>{gig.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {gig.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="bg-accent">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="group bg-white">
              Explore All Gigs
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>

        {/* Core Features */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Platform Features
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-secondary">
              Why Choose Talenthic?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover how our platform can help accelerate your career
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="hover-scale group bg-gradient-to-br from-white to-accent/30 backdrop-blur-sm border-none shadow-lg"
              >
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-none shadow-lg hover-scale">
              <CardContent className="pt-8">
                <div className="text-4xl font-bold text-primary mb-2">2,500+</div>
                <div className="text-muted-foreground">Active Internships</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-none shadow-lg hover-scale">
              <CardContent className="pt-8">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Partner Companies</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-none shadow-lg hover-scale">
              <CardContent className="pt-8">
                <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-muted-foreground">Successful Placements</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <Card className="bg-gradient-to-br from-secondary to-secondary/90 text-white border-none shadow-xl">
            <CardContent className="pt-12 pb-12">
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
                  className="text-lg px-8 bg-primary hover:bg-primary/90 group"
                >
                  Sign Up Now
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 border-white/20 bg-white/10 text-white hover:bg-white/20"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;