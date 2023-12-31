import { HttpResponse, http } from "msw";

export const handlers = [
  http.get(
    "https://rwwldaqpuxdnztewxate.supabase.co/rest/v1/assignments",
    async ({}) => {
      console.log("siema");
      return new HttpResponse(
        JSON.stringify([
          {
            data: {
              assignments: [
                {
                  name: "rfdfdfd",
                  dates: [
                    "10.09.2023: 3PM-3:30PM",
                    "11.09.2023: 11AM-12AM",
                    "12.09.2023: 2:22PM-6:00PM",
                  ],
                },
                {
                  name: "fdfdfd",
                  dates: [
                    "10.09.2023: 3:30PM-4PM",
                    "11.09.2023: 3PM-4PM",
                    "12.09.2023: 1PM-2PM",
                  ],
                },
                {
                  name: "rfdfdfd",
                  dates: [
                    "10.09.2023: 3PM-3:30PM",
                    "11.09.2023: 11AM-12AM",
                    "12.09.2023: 2:22PM-6:00PM",
                  ],
                },
                {
                  name: "rfdfdfd",
                  dates: [
                    "10.09.2023: 3PM-3:30PM",
                    "11.09.2023: 11AM-12AM",
                    "12.09.2023: 2:22PM-6:00PM",
                  ],
                },
                {
                  name: "rfdfdfd",
                  dates: [
                    "10.09.2023: 3PM-3:30PM",
                    "11.09.2023: 11AM-12AM",
                    "12.09.2023: 2:22PM-6:00PM",
                  ],
                },
                {
                  name: "rfdfdfd",
                  dates: [
                    "10.09.2023: 3PM-3:30PM",
                    "11.09.2023: 11AM-12AM",
                    "12.09.2023: 2:22PM-6:00PM",
                  ],
                },
              ],
            },
          },
        ])
      );
    }
  ),
  http.post("http://localhost:3001/assign-work", async ({ request }) => {
    const data = await request.formData();
    const user_id = data.get("user_id");
    const assignmentName = data.get("assignmentName");

    if (assignmentName) {
      console.log(assignmentName);
    }

    if (!user_id) {
      return new HttpResponse("Missing user_id", { status: 400 });
    }

    return HttpResponse.json({ status: 200 });
  }),
];
