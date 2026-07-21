import type { StudentData } from "@/lib/store";
import { createBrowserSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";

export async function syncStudentData(data: StudentData) {
  if (!isSupabaseConfigured()) return;
  const supabase = createBrowserSupabaseClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return;
  await supabase.from("profiles").upsert({
    id: auth.user.id, email: data.email, name: data.name, phone: data.phone,
    date_of_birth: data.dateOfBirth || null, gender: data.gender, country: data.country,
    school: data.school, degree: data.degree, level: data.level, target_grade: data.targetGrade,
    study_mode: data.studyMode, available_hours: data.availableHours,
    preferred_start: data.preferredStart, study_days: data.studyDays,
    onboarding_complete: data.onboardingComplete, updated_at: new Date().toISOString(),
  });
  if (data.courses.length) await supabase.from("courses").upsert(data.courses.map(course => ({
    id: course.id, user_id: auth.user!.id, code: course.code, title: course.title,
    exam_date: course.examDate || null, estimated_hours: course.estimatedHours,
    completed_hours: course.completedHours,
  })), { onConflict: "id" });
}
