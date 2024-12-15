import { Loader2 } from 'lucide-react';

export const LoadingState = () => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-4">
      <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );
};