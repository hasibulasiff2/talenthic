import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Clock, DollarSign, Search, Filter, Tag } from "lucide-react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SearchFilters } from "@/components/search/SearchFilters";

interface Filters {
  search: string;
  category?: string;
  location?: string;
  duration?: string;
  priceRange?: string;
}

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

// Dummy data for development
const dummyGigs = [
  {
    id: "1",
    title: "Website Redesign Project",
    company: {
      name: "Digital Agency Co",
      logo_url: null
    },
    description: "Looking for a talented web designer to revamp our company website using modern design principles.",
    budget_range: "$3000-5000",
    duration: "2 weeks",
    skills: ["React", "Tailwind CSS", "UI/UX"],
    status: "open"
  },
  {
    id: "2",
    title: "Mobile App Development",
    company: {
      name: "StartupX",
      logo_url: null
    },
    description: "Need a React Native developer to build a social networking app with real-time features.",
    budget_range: "$5000-8000",
    duration: "1 month",
    skills: ["React Native", "Firebase", "API Integration"],
    status: "open"
  },
  {
    id: "3",
    title: "Content Writing for Blog",
    company: {
      name: "ContentPro",
      logo_url: null
    },
    description: "Seeking an experienced content writer to create engaging blog posts about technology and innovation.",
    budget_range: "$500-1000",
    duration: "1 week",
    skills: ["Content Writing", "SEO", "Research"],
    status: "open"
  }
];

const GigsPage = () => {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: undefined,
    location: undefined,
    duration: undefined,
    priceRange: undefined,
  });

  const { data: gigs, isLoading } = useQuery({
    queryKey: ["gigs", filters],
    queryFn: async () => {
      let query = supabase
        .from("gigs")
        .select(`
          *,
          company:companies(
            name,
            logo_url
          )
        `)
        .eq("status", "open");

      if (filters.category) {
        query = query.eq("category", filters.category);
      }
      if (filters.duration) {
        query = query.eq("duration", filters.duration);
      }
      if (filters.priceRange) {
        query = query.eq("budget_range", filters.priceRange);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data?.length ? data : dummyGigs;
    },
  });

  const filteredGigs = gigs?.filter((gig) => {
    const searchLower = filters.search.toLowerCase();
    const matchesSearch =
      !filters.search ||
      gig.title.toLowerCase().includes(searchLower) ||
      gig.company.name.toLowerCase().includes(searchLower) ||
      gig.skills?.some((skill) => skill.toLowerCase().includes(searchLower));

    return matchesSearch;
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: undefined,
      location: undefined,
      duration: undefined,
      priceRange: undefined,
    });
  };

  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary mb-2">Available Gigs</h1>
            <p className="text-muted-foreground">Find your next freelance opportunity</p>
          </div>
          <Button>Post Gig</Button>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search gigs by title, company, or skills..."
              className="pl-10"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          <SearchFilters
            type="gigs"
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />

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
              {filteredGigs?.map((gig) => (
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
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {gig.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {gig.duration && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{gig.duration}</span>
                          </div>
                        )}
                        {gig.budget_range && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <DollarSign className="w-4 h-4" />
                            <span>{gig.budget_range}</span>
                          </div>
                        )}
                      </div>
                      {gig.skills && (
                        <div className="flex flex-wrap gap-2">
                          {gig.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <Button className="w-full">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GigsPage;
