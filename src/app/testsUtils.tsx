import { RenderOptions, render, cleanup } from "@testing-library/react";
import { afterEach, expect } from "vitest";
import { server } from "./mocks/server";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import { ReactElement, ReactNode } from "react";
import { CalendarModalProvider } from "./shared/utils/calendarModal";

import { AuthProvider } from "./shared/utils/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

afterEach(() => {
  cleanup();
});

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider
        mockedSession={{
          access_token: "111",
          expires_in: 32131321,
          refresh_token: "222",
          token_type: "sss",
          user: {
            id: "1",
            app_metadata: {},
            aud: "",
            created_at: "1",
            user_metadata: {},
          },
        }}
      >
        <BrowserRouter>
          <CalendarModalProvider>{children} </CalendarModalProvider>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};
export * from "@testing-library/react";

export { customRender as render };