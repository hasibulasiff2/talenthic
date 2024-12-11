import React from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Target, Clock } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Access Top Talent",
    description: "Connect with qualified and motivated students and recent graduates.",
  },
  {
    icon: Briefcase,
    title: "Flexible Hiring",
    description: "Choose between internships and project-based gigs.",
  },
  {
    icon: Target,
    title: "Perfect Match",
    description: "Our AI-powered matching ensures you find the right candidates.",
  },
  {
    icon: Clock,
    title: "Quick Process",
    description: "Streamlined hiring process saves you time and resources.",
  },
];

const HirePage = () => {
  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-secondary mb-6">
            Hire Top Student Talent
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Find the perfect interns and project collaborators for your company.
            Post opportunities and connect with motivated students today.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {benefits.map((benefit) => (
              <Card key={benefit.title}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Button size="lg">Post an Internship</Button>
            <Button size="lg" variant="outline">
              Post a Gig
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HirePage;