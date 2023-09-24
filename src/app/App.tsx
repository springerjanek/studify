import { Routing } from "./Routing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@shared/utils/auth";
import { Toaster } from "@/components/ui/toaster";
import { CalendarModalProvider } from "./shared/utils/calendarModal";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CalendarModalProvider>
          <Routing />
        </CalendarModalProvider>
      </AuthProvider>
      <Toaster />
    </QueryClientProvider>
  );
};
