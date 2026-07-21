create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text not null default '',
  school text default '',
  degree text default '',
  level text default '',
  target_grade text default 'C',
  study_mode text default 'sprint' check (study_mode in ('sprint','timetable')),
  available_hours numeric default 3,
  preferred_start time default '18:00',
  study_days text[] default array['Mon','Tue','Wed','Thu','Fri','Sat'],
  onboarding_complete boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.courses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  code text not null,
  title text not null,
  exam_date timestamptz,
  estimated_hours numeric default 12,
  completed_hours numeric default 0,
  content_type text not null default 'mixed' check (content_type in ('calculation', 'theory', 'mixed')),
  analysis jsonb,
  created_at timestamptz default now(),
  unique(user_id, code)
);

create table if not exists public.materials (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  name text not null,
  storage_path text,
  drive_file_id text,
  mime_type text,
  status text default 'ready',
  created_at timestamptz default now()
);

create table if not exists public.study_sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  scheduled_for timestamptz not null,
  planned_minutes integer not null,
  objective text not null,
  status text default 'planned',
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.materials enable row level security;
alter table public.study_sessions enable row level security;

create policy "profiles own rows" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "courses own rows" on public.courses for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "materials own rows" on public.materials for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "sessions own rows" on public.study_sessions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public) values ('course-materials','course-materials',false) on conflict (id) do nothing;
create policy "materials upload own folder" on storage.objects for insert to authenticated with check (bucket_id='course-materials' and (storage.foldername(name))[1]=auth.uid()::text);
create policy "materials read own folder" on storage.objects for select to authenticated using (bucket_id='course-materials' and (storage.foldername(name))[1]=auth.uid()::text);
create policy "materials delete own folder" on storage.objects for delete to authenticated using (bucket_id='course-materials' and (storage.foldername(name))[1]=auth.uid()::text);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin insert into public.profiles(id,email,name) values(new.id,new.email,coalesce(new.raw_user_meta_data->>'name','')); return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
