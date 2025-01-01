import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BookmarkButtonProps {
  listingId: string;
  listingType: "internships" | "gigs";
}

export const BookmarkButton = ({ listingId, listingType }: BookmarkButtonProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  const toggleBookmark = async () => {
    try {
      if (isBookmarked) {
        const { error } = await supabase
          .from("bookmarks")
          .delete()
          .match({ listing_id: listingId, listing_type: listingType });

        if (error) throw error;

        setIsBookmarked(false);
        toast({
          title: "Bookmark removed",
          description: "The listing has been removed from your bookmarks",
        });
      } else {
        const { error } = await supabase.from("bookmarks").insert({
          listing_id: listingId,
          listing_type: listingType,
        });

        if (error) throw error;

        setIsBookmarked(true);
        toast({
          title: "Bookmark added",
          description: "The listing has been added to your bookmarks",
        });
      }
    } catch (error) {
      toast({
        title: "Error updating bookmark",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleBookmark}
      className={`gap-2 ${isBookmarked ? "text-primary" : ""}`}
    >
      <Bookmark className="w-4 h-4" />
      {isBookmarked ? "Bookmarked" : "Bookmark"}
    </Button>
  );
};