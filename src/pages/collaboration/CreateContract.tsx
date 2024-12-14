import Header from "@/components/Header";
import ContractForm from "@/components/contracts/ContractForm";

const CreateContract = () => {
  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-secondary mb-4">
            Create New Contract
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Set up a new contract for collaboration
          </p>
          <ContractForm />
        </div>
      </main>
    </div>
  );
};

export default CreateContract;