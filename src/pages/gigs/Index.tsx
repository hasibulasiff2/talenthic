import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Clock, DollarSign } from "lucide-react";
import Header from "@/components/Header";

type Company = {
  name: string;
  logo_url: string | null;
}

type GigResponse = {
  id: string;
  title: string;
  description: string;
  budget_range: string | null;
  duration: string | null;
  skills: string[] | null;
  company_id: string;
  created_at: string;
  status: string | null;
  company: Company;
}

const GigsPage = () => {
  const { data: gigs, isLoading } = useQuery({
    queryKey: ["gigs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gigs")
        .select(`
          *,
          company:companies(
            name,
            logo_url
          )
        `)
        .eq("status", "open");

      if (error) throw error;
      return data as GigResponse[];
    },
  });

  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary mb-2">Gig Opportunities</h1>
            <p className="text-muted-foreground">Find your next freelance project</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline">Filter</Button>
            <Button>Post Gig</Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="h-32 bg-gray-200" />
                <CardContent className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs?.map((gig) => (
              <Card key={gig.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      {gig.company?.logo_url ? (
                        <img
                          src={gig.company.logo_url}
                          alt={gig.company.name}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <Building2 className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{gig.title}</CardTitle>
                      <CardDescription>{gig.company?.name}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{gig.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      {gig.budget_range && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <DollarSign className="w-4 h-4" />
                          <span>{gig.budget_range}</span>
                        </div>
                      )}
                      {gig.duration && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{gig.duration}</span>
                        </div>
                      )}
                    </div>
                    {gig.skills && (
                      <div className="flex flex-wrap gap-2">
                        {gig.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-accent rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                    <Button className="w-full">Apply Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default GigsPage;