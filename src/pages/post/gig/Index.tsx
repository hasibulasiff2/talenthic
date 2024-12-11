import Header from "@/components/Header";
import PostingForm from "@/components/post/PostingForm";

const PostGigPage = () => {
  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-secondary mb-4">
            Post a Gig
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Create a new gig opportunity and find talented freelancers
          </p>
          
          <PostingForm type="gig" />
        </div>
      </main>
    </div>
  );
};

export default PostGigPage;