-- Admin'in kendi adına revizyon isteği/notu oluşturabilmesi için:
-- user_id nullable olur (admin oluşturduğunda NULL), created_by_admin eklenir.
alter table public.revision_requests
  alter column user_id drop not null;

alter table public.revision_requests
  add column if not exists created_by_admin boolean not null default false;

-- user_id NULL olduğunda created_by_admin true olmalı, aksi halde false.
alter table public.revision_requests
  add constraint revision_requests_admin_or_user_check
  check (
    (user_id is null and created_by_admin = true)
    or (user_id is not null and created_by_admin = false)
  );
