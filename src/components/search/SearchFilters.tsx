import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterDropdown } from "./FilterDropdown";
import { X } from "lucide-react";

interface SearchFiltersProps {
  type: "gigs" | "internships";
  filters: {
    search: string;
    category?: string;
    location?: string;
    duration?: string;
    priceRange?: string;
    skills?: string[];
  };
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
}

const categories = [
  { label: "Web Development", value: "web-dev" },
  { label: "Mobile Development", value: "mobile-dev" },
  { label: "UI/UX Design", value: "design" },
  { label: "Content Writing", value: "content" },
  { label: "Digital Marketing", value: "marketing" },
];

const locations = [
  { label: "Remote", value: "remote" },
  { label: "Hybrid", value: "hybrid" },
  { label: "On-site", value: "onsite" },
];

const durations = [
  { label: "Less than 1 month", value: "0-1" },
  { label: "1-3 months", value: "1-3" },
  { label: "3-6 months", value: "3-6" },
  { label: "6+ months", value: "6+" },
];

const priceRanges = [
  { label: "$500-1000", value: "500-1000" },
  { label: "$1000-2000", value: "1000-2000" },
  { label: "$2000-5000", value: "2000-5000" },
  { label: "$5000+", value: "5000+" },
];

export function SearchFilters({
  type,
  filters,
  onFilterChange,
  onClearFilters,
}: SearchFiltersProps) {
  const hasActiveFilters =
    filters.category ||
    filters.location ||
    filters.duration ||
    filters.priceRange ||
    filters.search;

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <FilterDropdown
            options={categories}
            value={filters.category}
            onChange={(value) => onFilterChange("category", value)}
            placeholder="Select category"
            label="Category"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <FilterDropdown
            options={locations}
            value={filters.location}
            onChange={(value) => onFilterChange("location", value)}
            placeholder="Select location"
            label="Location"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Duration</label>
          <FilterDropdown
            options={durations}
            value={filters.duration}
            onChange={(value) => onFilterChange("duration", value)}
            placeholder="Select duration"
            label="Duration"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {type === "gigs" ? "Budget Range" : "Salary Range"}
          </label>
          <FilterDropdown
            options={priceRanges}
            value={filters.priceRange}
            onChange={(value) => onFilterChange("priceRange", value)}
            placeholder="Select range"
            label="Price Range"
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground"
          >
            <X className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}