import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { Briefcase, Code } from "lucide-react";

const PostingTypePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary mb-4">
            What would you like to post?
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose the type of opportunity you want to create
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card 
            className="hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => navigate("/post/internship")}
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Post an Internship</CardTitle>
                  <CardDescription>Find talented interns for your company</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Access to a pool of motivated students</li>
                <li>• Structured internship programs</li>
                <li>• Long-term talent pipeline</li>
              </ul>
              <Button className="w-full mt-6">Get Started</Button>
            </CardContent>
          </Card>

          <Card 
            className="hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => navigate("/post/gig")}
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Post a Gig</CardTitle>
                  <CardDescription>Find freelancers for short-term projects</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Quick project completion</li>
                <li>• Flexible engagement</li>
                <li>• Access to specialized skills</li>
              </ul>
              <Button className="w-full mt-6">Get Started</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PostingTypePage;