import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

export const FeaturedInternships = () => {
  const navigate = useNavigate();

  return (
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
          <Card key={index} className="hover:scale-105 transition-transform duration-300 group cursor-pointer"
                onClick={() => navigate(`/internships`)}>
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
        <Button 
          variant="outline" 
          size="lg" 
          className="group"
          onClick={() => navigate('/internships')}
        >
          View All Internships
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};