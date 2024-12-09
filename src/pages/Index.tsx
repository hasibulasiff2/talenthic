import React from "react";
import { Search, Briefcase, Code, Palette, ChevronRight } from "lucide-react";

const categories = [
  { icon: Briefcase, name: "Business", count: 234 },
  { icon: Code, name: "Development", count: 156 },
  { icon: Palette, name: "Design", count: 89 },
];

const featuredJobs = [
  {
    title: "UI/UX Design Intern",
    company: "TechCorp",
    type: "Internship",
    location: "Remote",
    salary: "$20-25/hr",
  },
  {
    title: "Frontend Developer",
    company: "StartupX",
    type: "Gig",
    location: "Hybrid",
    salary: "$45-60/hr",
  },
  {
    title: "Marketing Assistant",
    company: "GrowthLabs",
    type: "Internship",
    location: "On-site",
    salary: "$18-22/hr",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-accent">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center animate-fade-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-secondary">
            Find Your Perfect{" "}
            <span className="text-primary">Opportunity</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover internships and gigs that match your skills and aspirations.
            Your next career move starts here.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for internships or gigs..."
              className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-primary shadow-sm text-lg"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
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

      {/* Featured Jobs */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-secondary">Featured Opportunities</h2>
          <button className="text-primary flex items-center hover:underline">
            View all <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <div
              key={job.title}
              className="glass-card rounded-xl p-6 hover-scale cursor-pointer"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
                {job.type}
              </span>
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-muted-foreground mb-4">{job.company}</p>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{job.location}</span>
                <span>{job.salary}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;