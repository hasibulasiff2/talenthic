import { Award, Shield, Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const TrustSignals = () => {
  const trustPoints = [
    {
      icon: Shield,
      title: "Secure Platform",
      description: "End-to-end encryption and robust security measures to protect your data.",
    },
    {
      icon: Users,
      title: "Verified Companies",
      description: "All partner companies are thoroughly vetted for legitimacy and quality.",
    },
    {
      icon: Star,
      title: "Quality Opportunities",
      description: "Curated internships and gigs from reputable organizations.",
    },
    {
      icon: Award,
      title: "Success Stories",
      description: "Join thousands of successful interns and freelancers on our platform.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 bg-accent rounded-3xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-secondary">
          Why Trust Talenthic?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We're committed to creating a safe and reliable platform for your career growth
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {trustPoints.map((point, index) => (
          <Card key={index} className="bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all">
            <CardContent className="pt-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <point.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-secondary">
                {point.title}
              </h3>
              <p className="text-muted-foreground">{point.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};