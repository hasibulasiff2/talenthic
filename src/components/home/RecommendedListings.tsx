import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookmarkButton } from "@/components/listings/BookmarkButton";
import { supabase } from "@/integrations/supabase/client";

export const RecommendedListings = () => {
  const { data: userProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .maybeSingle(); // Changed from .single() to .maybeSingle()

      if (error) throw error;
      return profile;
    },
  });

  const { data: recommendations } = useQuery({
    queryKey: ["recommendations", userProfile?.skills],
    queryFn: async () => {
      // First try internships
      const { data: internships } = await supabase
        .from("internships")
        .select("*, company:companies(*)")
        .filter("status", "eq", "active")
        .limit(3);

      // Then gigs
      const { data: gigs } = await supabase
        .from("gigs")
        .select("*, company:companies(*)")
        .filter("status", "eq", "open")
        .limit(3);

      return { internships, gigs };
    },
    enabled: !!userProfile,
  });

  if (!recommendations) return null;

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4">
          Recommended For You
        </Badge>
        <h2 className="text-3xl font-bold mb-4">Personalized Opportunities</h2>
        <p className="text-muted-foreground">
          Based on your skills and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.internships?.map((internship) => (
          <Card key={internship.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{internship.title}</span>
                <BookmarkButton
                  listingId={internship.id}
                  listingType="internships"
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {internship.company?.name}
                </p>
                <div className="flex gap-2">
                  <Badge variant="secondary">{internship.location}</Badge>
                  <Badge variant="outline">{internship.duration}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {recommendations.gigs?.map((gig) => (
          <Card key={gig.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{gig.title}</span>
                <BookmarkButton listingId={gig.id} listingType="gigs" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{gig.company?.name}</p>
                <div className="flex gap-2">
                  <Badge variant="secondary">{gig.duration}</Badge>
                  <Badge variant="outline">{gig.budget_range}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};