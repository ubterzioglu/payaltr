-- Faz 3: Mülkler, cüzdan, yatırımlar, blog CMS.

-- ---------- Mülkler (yatırım yapılabilir varlıklar) ----------
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  location text not null,
  image_url text not null,
  price_per_share numeric(12, 2) not null default 150,
  total_shares integer not null default 1000,
  sold_shares integer not null default 0,
  annual_yield_percent numeric(5, 2) not null default 10.1,
  status text not null default 'active' check (status in ('active', 'sold_out', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- Cüzdan ----------
create table if not exists public.wallets (
  user_id uuid primary key references auth.users(id) on delete cascade,
  balance numeric(14, 2) not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('deposit', 'investment', 'rental_income', 'withdrawal')),
  amount numeric(14, 2) not null,
  description text not null,
  created_at timestamptz not null default now()
);

-- ---------- Yatırımlar (kullanıcı <-> mülk pay sahipliği) ----------
create table if not exists public.investments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  shares integer not null check (shares > 0),
  amount numeric(14, 2) not null,
  created_at timestamptz not null default now()
);

create index if not exists wallet_transactions_user_id_idx on public.wallet_transactions(user_id);
create index if not exists investments_user_id_idx on public.investments(user_id);
create index if not exists investments_property_id_idx on public.investments(property_id);

-- ---------- Blog CMS ----------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null default '',
  content_html text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_slug_idx on public.posts(slug);
create index if not exists posts_status_idx on public.posts(status);

-- ---------- RLS ----------
alter table public.properties enable row level security;
alter table public.wallets enable row level security;
alter table public.wallet_transactions enable row level security;
alter table public.investments enable row level security;
alter table public.posts enable row level security;

-- Properties: herkes okuyabilir (public sayfada gösteriliyor), yazma admin (service-role) ile.
create policy "herkes aktif mulkleri gorur"
  on public.properties for select
  using (true);

-- Wallets: kullanıcı sadece kendi cüzdanını görür.
create policy "kullanici kendi cuzdanini gorur"
  on public.wallets for select
  using (auth.uid() = user_id);

-- Wallet transactions: kullanıcı sadece kendi işlemlerini görür.
create policy "kullanici kendi islemlerini gorur"
  on public.wallet_transactions for select
  using (auth.uid() = user_id);

-- Investments: kullanıcı sadece kendi yatırımlarını görür.
create policy "kullanici kendi yatirimlarini gorur"
  on public.investments for select
  using (auth.uid() = user_id);

-- Posts: herkes yayınlanmış yazıları okuyabilir; taslaklar sadece service-role'e görünür.
create policy "herkes yayinlanan yazilari gorur"
  on public.posts for select
  using (status = 'published');
