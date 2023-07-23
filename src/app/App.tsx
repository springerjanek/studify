import { Routing } from "./Routing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@shared/utils/auth";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routing />
      </AuthProvider>
      <Toaster />
    </QueryClientProvider>
  );
};
