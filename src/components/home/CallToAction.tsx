import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <Card className="bg-gradient-to-br from-secondary to-secondary/90 text-white border-none shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/dd9d4caa-4c89-4d38-8fb3-df0003f16f40.png')] opacity-5" />
        <CardContent className="pt-12 pb-12 relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Whether you're a student looking for opportunities or a company seeking fresh talent,
            Talenthic is here to help you succeed.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              size="lg" 
              variant="default" 
              className="text-lg px-8 bg-primary hover:bg-primary/90 group"
              onClick={() => navigate('/signup')}
            >
              Sign Up Now
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 border-white/20 bg-white/10 text-white hover:bg-white/20"
              onClick={() => navigate('/overview')}
            >
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};