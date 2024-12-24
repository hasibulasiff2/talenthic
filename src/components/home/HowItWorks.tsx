import { ArrowRight, Briefcase, GraduationCap, HandshakeIcon, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const HowItWorks = () => {
  const steps = [
    {
      icon: GraduationCap,
      title: "Create Your Profile",
      description: "Sign up and showcase your skills, experience, and aspirations.",
    },
    {
      icon: Briefcase,
      title: "Discover Opportunities",
      description: "Browse through curated internships and gigs that match your interests.",
    },
    {
      icon: HandshakeIcon,
      title: "Apply & Connect",
      description: "Submit applications and connect directly with companies.",
    },
    {
      icon: Users,
      title: "Collaborate & Grow",
      description: "Work on real projects and build your professional network.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-secondary">
          How Talenthic Works
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your journey to professional success made simple
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="pt-6 text-center relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 group-hover:scale-110 transition-transform">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-secondary">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
              {index < steps.length - 1 && (
                <ArrowRight className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-primary/40 hidden lg:block" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};