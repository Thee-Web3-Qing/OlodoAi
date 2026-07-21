export type StudyMode = "course_sprint" | "timetable";

export interface Course {
  id: string;
  code: string;
  title: string;
  examAt: string;
  estimatedHours: number;
  completedHours: number;
  readiness: number;
}

export interface StudySession {
  id: string;
  courseId: string;
  startsAt: string;
  plannedMinutes: number;
  objective: string;
  status: "planned" | "active" | "completed" | "missed";
}
