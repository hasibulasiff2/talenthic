import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Clock, DollarSign, Search } from "lucide-react";
import Header from "@/components/Header";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ApplicationForm } from "@/components/applications/ApplicationForm";
import { ApplicationStatus } from "@/components/applications/ApplicationStatus";
import { Input } from "@/components/ui/input";
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

type InternshipResponse = {
  id: string;
  title: string;
  description: string;
  location: string | null;
  duration: string | null;
  salary_range: string | null;
  company_id: string;
  created_at: string;
  requirements: string | null;
  status: string | null;
  company: Company;
}

// Dummy data for development
const dummyInternships = [
  {
    id: "1",
    title: "Software Development Intern",
    company: {
      name: "TechCorp Solutions",
      logo_url: null
    },
    description: "Join our dynamic team and work on cutting-edge projects using React, Node.js, and cloud technologies.",
    location: "Remote",
    duration: "6 months",
    salary_range: "$2000-3000/month",
    requirements: "Currently pursuing CS degree, knowledge of JavaScript",
    status: "active"
  },
  {
    id: "2",
    title: "UI/UX Design Intern",
    company: {
      name: "Creative Studios",
      logo_url: null
    },
    description: "Help design beautiful and intuitive user interfaces for our clients' web and mobile applications.",
    location: "New York, NY",
    duration: "3 months",
    salary_range: "$2500-3500/month",
    requirements: "Design portfolio, Figma experience",
    status: "active"
  },
  {
    id: "3",
    title: "Data Science Intern",
    company: {
      name: "DataMinds Inc",
      logo_url: null
    },
    description: "Work with big data and machine learning models to derive meaningful insights for our clients.",
    location: "San Francisco, CA",
    duration: "4 months",
    salary_range: "$3000-4000/month",
    requirements: "Python, SQL, Statistics background",
    status: "active"
  }
];

const InternshipsPage = () => {
  const [selectedInternshipId, setSelectedInternshipId] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: undefined,
    location: undefined,
    duration: undefined,
    priceRange: undefined,
  });

  const { data: internships, isLoading } = useQuery({
    queryKey: ["internships", filters],
    queryFn: async () => {
      let query = supabase
        .from("internships")
        .select(`
          *,
          company:companies(
            name,
            logo_url
          )
        `)
        .eq("status", "active");

      if (filters.category) {
        query = query.eq("category", filters.category);
      }
      if (filters.location) {
        query = query.eq("location", filters.location);
      }
      if (filters.duration) {
        query = query.eq("duration", filters.duration);
      }
      if (filters.priceRange) {
        query = query.eq("salary_range", filters.priceRange);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data?.length ? data : dummyInternships;
    },
  });

  const filteredInternships = internships?.filter((internship) => {
    const searchLower = filters.search.toLowerCase();
    const matchesSearch =
      !filters.search ||
      internship.title.toLowerCase().includes(searchLower) ||
      internship.company.name.toLowerCase().includes(searchLower) ||
      (internship.location && internship.location.toLowerCase().includes(searchLower));

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
            <h1 className="text-3xl font-bold text-secondary mb-2">Internship Opportunities</h1>
            <p className="text-muted-foreground">Discover your next career opportunity</p>
          </div>
          <Button>Post Internship</Button>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search internships by title, company, or location..."
              className="pl-10"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          <SearchFilters
            type="internships"
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
              {filteredInternships?.map((internship) => (
                <Card key={internship.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        {internship.company?.logo_url ? (
                          <img
                            src={internship.company.logo_url}
                            alt={internship.company.name}
                            className="w-8 h-8 object-contain"
                          />
                        ) : (
                          <Building2 className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{internship.title}</CardTitle>
                        <CardDescription>{internship.company?.name}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {internship.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {internship.location && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{internship.location}</span>
                          </div>
                        )}
                        {internship.duration && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{internship.duration}</span>
                          </div>
                        )}
                        {internship.salary_range && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <DollarSign className="w-4 h-4" />
                            <span>{internship.salary_range}</span>
                          </div>
                        )}
                      </div>
                      <ApplicationStatus internshipId={internship.id} />
                      <Button 
                        className="w-full"
                        onClick={() => setSelectedInternshipId(internship.id)}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Dialog open={!!selectedInternshipId} onOpenChange={() => setSelectedInternshipId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Application</DialogTitle>
            </DialogHeader>
            <ApplicationForm 
              internshipId={selectedInternshipId || undefined}
              onSuccess={() => setSelectedInternshipId(null)}
            />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default InternshipsPage;
