import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const Stats = () => {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-none shadow-lg hover:scale-105 transition-transform duration-300">
          <CardContent className="pt-8">
            <div className="text-4xl font-bold text-primary mb-2">2,500+</div>
            <div className="text-muted-foreground">Active Internships</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-none shadow-lg hover:scale-105 transition-transform duration-300">
          <CardContent className="pt-8">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Partner Companies</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-none shadow-lg hover:scale-105 transition-transform duration-300">
          <CardContent className="pt-8">
            <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-muted-foreground">Successful Placements</div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};