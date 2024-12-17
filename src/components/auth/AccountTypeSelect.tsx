import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, User } from "lucide-react";

interface AccountTypeSelectProps {
  onSelect: (type: "user" | "business") => void;
}

export const AccountTypeSelect = ({ onSelect }: AccountTypeSelectProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => onSelect("user")}>
        <CardHeader>
          <User className="w-8 h-8 text-primary mb-2" />
          <CardTitle>User Account</CardTitle>
          <CardDescription>For candidates seeking internships and gigs</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
            <li>Apply for internships and gigs</li>
            <li>Showcase your portfolio</li>
            <li>Connect with businesses</li>
            <li>Get personalized recommendations</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => onSelect("business")}>
        <CardHeader>
          <Building2 className="w-8 h-8 text-primary mb-2" />
          <CardTitle>Business Account</CardTitle>
          <CardDescription>For companies looking to hire talent</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
            <li>Post internships and gigs</li>
            <li>Find and hire talent</li>
            <li>Manage projects</li>
            <li>Access analytics and insights</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};