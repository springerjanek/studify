import { describe, expect, it } from "vitest";

import { handleFormSubmit } from "./formSubmitHandler";
import { QueryClient } from "@tanstack/react-query";
import { act } from "@/app/testsUtils";
import { User } from "@supabase/supabase-js";
import { mockCurrentUser, mockExcessiveUserAssignments, mockUserSchedule, mockValidUserAssignments } from "@/app/mocks/user";

describe("add assignment form handler", () => {
  it("should handle successful form submission", async () => {
    const mockData = {
      assignmentName: "Test Assignment",
      dueDate: new Date(),
    };

    const mockQueryClient = new QueryClient();
    const querySpy = vi.spyOn(mockQueryClient, "invalidateQueries")

    const mockToast = vi.fn();

    await act(async () => {
      await handleFormSubmit({
        data: mockData,
        queryClient: mockQueryClient,
        user_assignments: mockValidUserAssignments,
        user_schedule: mockUserSchedule,
        toast: mockToast,
        currentUser: mockCurrentUser,
        setLoading: vi.fn(),
        showModal: vi.fn(),
      });
    });

    expect(querySpy).toHaveBeenCalledWith({
      queryKey: ["user_assignments"],
    });
    expect(querySpy).toHaveBeenCalledWith({
      queryKey: ["user_schedule"],
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: "Successfully assigned work plan",
      description: "Check your calendar for more info",
      className: "text-black",
    });
  });

  it("should handle user having too much assignments", async () => {
    const mockData = {
      assignmentName: "test",
      dueDate: new Date(),
    };

    const mockQueryClient = new QueryClient();
    const mockToast = vi.fn();
    
    const mockCurrentUser: User | null = {
      id: "1",
      app_metadata: {},
      aud: "",
      created_at: "1",
      user_metadata: {},
    };

    await act(async () => {
      await handleFormSubmit({
        data: mockData,
        user_assignments: mockExcessiveUserAssignments,
        user_schedule: mockUserSchedule,
        queryClient: mockQueryClient,
        toast: mockToast,
        currentUser: mockCurrentUser,
        setLoading: vi.fn(),
        showModal: vi.fn(),
      });
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: "You can only have 5 assignments at a time on a free version",
      className: "text-red-500",
    });
  });
});
