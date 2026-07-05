-- Revizyon istekleri: kullanıcılar istek gönderir, admin/yorumcular altına yorum yazar.
create table if not exists public.revision_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text not null,
  status text not null default 'open' check (status in ('open', 'in_progress', 'done', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.revision_comments (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.revision_requests(id) on delete cascade,
  author_email text not null,
  is_admin boolean not null default false,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists revision_requests_user_id_idx on public.revision_requests(user_id);
create index if not exists revision_comments_request_id_idx on public.revision_comments(request_id);

alter table public.revision_requests enable row level security;
alter table public.revision_comments enable row level security;

-- Kullanıcılar sadece kendi isteklerini görebilir/oluşturabilir.
-- Admin panel service-role key kullandığı için RLS'i bypass eder.
create policy "kullanicilar kendi isteklerini gorur"
  on public.revision_requests for select
  using (auth.uid() = user_id);

create policy "kullanicilar kendi istegini olusturur"
  on public.revision_requests for insert
  with check (auth.uid() = user_id);

create policy "kullanicilar kendi istegine ait yorumlari gorur"
  on public.revision_comments for select
  using (
    exists (
      select 1 from public.revision_requests r
      where r.id = request_id and r.user_id = auth.uid()
    )
  );

create policy "kullanicilar kendi istegine yorum ekler"
  on public.revision_comments for insert
  with check (
    exists (
      select 1 from public.revision_requests r
      where r.id = request_id and r.user_id = auth.uid()
    )
  );
