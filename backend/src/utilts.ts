export type UserSchedule = {
  data: {
    assignments: [
      {
        name: string;
        dates: string[];
      }
    ];
  };
}[];

export class AssignmentExistsError extends Error {
  constructor() {
    super("This assignment already exists");
    this.name = "AssignmentExistsError";
  }
}