export const STORAGE_KEY = "olodo-ai-v1";

export type CourseRecord = {
  id: string;
  code: string;
  title: string;
  examDate: string;
  estimatedHours: number;
  completedHours: number;
  materials: string[];
};

export type StudentData = {
  authenticated: boolean;
  onboardingComplete: boolean;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  country: string;
  school: string;
  degree: string;
  level: string;
  targetGrade: string;
  studyMode: "sprint" | "timetable";
  availableHours: number;
  preferredStart: string;
  studyDays: string[];
  courses: CourseRecord[];
  timetableFile: string;
};

export const initialStudentData: StudentData = {
  authenticated: false,
  onboardingComplete: false,
  name: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  country: "Nigeria",
  school: "",
  degree: "",
  level: "",
  targetGrade: "C",
  studyMode: "sprint",
  availableHours: 3,
  preferredStart: "18:00",
  studyDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  courses: [],
  timetableFile: "",
};

export function loadStudentData(): StudentData {
  if (typeof window === "undefined") return initialStudentData;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? { ...initialStudentData, ...JSON.parse(value) } : initialStudentData;
  } catch {
    return initialStudentData;
  }
}

export function saveStudentData(data: StudentData) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function readiness(course: CourseRecord) {
  if (!course.estimatedHours) return 0;
  return Math.min(100, Math.round((course.completedHours / course.estimatedHours) * 100));
}
