import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

export const FeaturedGigs = () => {
  const navigate = useNavigate();

  return (
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
          <Card 
            key={index} 
            className="hover:scale-105 transition-transform duration-300 group cursor-pointer bg-white/50 backdrop-blur-sm"
            onClick={() => navigate(`/gigs`)}
          >
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
        <Button 
          variant="outline" 
          size="lg" 
          className="group bg-white"
          onClick={() => navigate('/gigs')}
        >
          Explore All Gigs
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};