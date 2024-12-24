import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const HeroSearch = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("internships");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/${searchType}?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto">
      <Select
        value={searchType}
        onValueChange={setSearchType}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Search in..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="internships">Internships</SelectItem>
          <SelectItem value="gigs">Gigs</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="flex-1 relative">
        <Input
          type="text"
          placeholder="Search opportunities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      
      <Button type="submit">
        <Search className="w-4 h-4 mr-2" />
        Search
      </Button>
    </form>
  );
};