# Olodo AI

A past-question-first exam survival tutor for students who need a clear route to passing calculation-heavy courses.

## Foundation

- Next.js and TypeScript web application
- Responsive semester command-centre shell
- Provider-neutral OpenAI-compatible AI client
- Structured formula-roadmap validation with Zod
- Supabase boundaries for authentication, PostgreSQL, vectors, and private files
- Feature areas for courses, documents, planning, and tutoring

## Local setup

1. Copy `.env.example` to `.env.local` and add credentials when integrations are ready.
2. Install dependencies with `pnpm install`.
3. Start with `pnpm dev` and open `http://localhost:3000`.

The starter dashboard uses demonstration data, so it renders without external accounts.

## Planned milestones

1. Supabase schema and authentication
2. Multi-course creation and document upload
3. Google Drive Picker import
4. Exam-timetable OCR and confirmation
5. Past-question extraction and clustering
6. Course Sprint and Timetable planning engines
7. Step-by-step formula-roadmap tutoring
8. Deterministic arithmetic and unit verification
