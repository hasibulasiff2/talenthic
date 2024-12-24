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
    <form 
      onSubmit={handleSearch} 
      className="flex gap-2 max-w-2xl mx-auto relative group"
    >
      <div className="absolute inset-0 bg-white/30 backdrop-blur-lg rounded-lg shadow-2xl -z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary-muted/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      
      <Select
        value={searchType}
        onValueChange={setSearchType}
      >
        <SelectTrigger className="w-[180px] bg-white/80 backdrop-blur-sm border-white/20">
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
          className="w-full bg-white/80 backdrop-blur-sm border-white/20"
        />
      </div>
      
      <Button 
        type="submit"
        className="relative overflow-hidden group bg-gradient-to-r from-primary to-primary-muted hover:opacity-90 transition-opacity"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-muted to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Search className="w-4 h-4 mr-2 relative z-10" />
        <span className="relative z-10">Search</span>
      </Button>
    </form>
  );
};