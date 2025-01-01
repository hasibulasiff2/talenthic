import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookmarkPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SaveSearchButtonProps {
  filters: any;
  type: "internships" | "gigs";
}

export const SaveSearchButton = ({ filters, type }: SaveSearchButtonProps) => {
  const [open, setOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const { toast } = useToast();

  const handleSaveSearch = async () => {
    try {
      const { error } = await supabase.from("saved_searches").insert({
        name: searchName,
        filters,
        type,
      });

      if (error) throw error;

      toast({
        title: "Search saved successfully",
        description: "You can access your saved searches from your dashboard",
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error saving search",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <BookmarkPlus className="w-4 h-4" />
          Save Search
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Current Search</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Enter a name for this search"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Button onClick={handleSaveSearch} className="w-full">
            Save Search
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};