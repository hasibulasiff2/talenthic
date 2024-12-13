import React from "react";
import { Briefcase, Brain, Target, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

export const Features = () => {
  return (
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
            className="hover:scale-105 transition-transform duration-300 group bg-gradient-to-br from-white to-accent/30 backdrop-blur-sm border-none shadow-lg"
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
  );
};