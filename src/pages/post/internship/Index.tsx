import Header from "@/components/Header";
import PostingForm from "@/components/post/PostingForm";

const PostInternshipPage = () => {
  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-secondary mb-4">
            Post an Internship
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Create a new internship opportunity and find talented students
          </p>
          
          <PostingForm type="internship" />
        </div>
      </main>
    </div>
  );
};

export default PostInternshipPage;