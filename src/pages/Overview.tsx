import React from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Users, Globe, Target } from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Internship Opportunities",
    description: "Access a wide range of internship positions across various industries.",
  },
  {
    icon: Users,
    title: "Networking",
    description: "Connect with industry professionals and fellow interns.",
  },
  {
    icon: Globe,
    title: "Remote Work",
    description: "Find remote internship opportunities worldwide.",
  },
  {
    icon: Target,
    title: "Career Growth",
    description: "Gain valuable experience and kickstart your career.",
  },
];

const OverviewPage = () => {
  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-secondary mb-6">
            Your Journey to Success Starts Here
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Discover how Talenthic can help you find the perfect internship opportunity
            and launch your career.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="gap-2">
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;