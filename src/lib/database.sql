-- ============================================================
-- Clozy — Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- ── profiles ──────────────────────────────────────────────
create table if not exists profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  full_name   text,
  avatar_url  text,
  plan        text default 'free',
  city        text,
  created_at  timestamptz default now()
);

-- ── items ─────────────────────────────────────────────────
create table if not exists items (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references profiles(id) on delete cascade,
  name                text not null,
  category            text,
  color               text,
  color_hex           text,
  style               text,
  season              text[],
  occasion            text[],
  price               numeric(10,2),
  brand               text,
  image_url           text,
  tags                text[],
  worn_count          integer default 0,
  last_worn           date,
  favorite            boolean default false,
  for_sale            boolean default false,
  shared_with_family  boolean default false,
  created_at          timestamptz default now()
);

-- ── outfits ───────────────────────────────────────────────
create table if not exists outfits (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references profiles(id) on delete cascade,
  name        text not null,
  items       uuid[],
  occasion    text,
  season      text,
  favorite    boolean default false,
  created_at  timestamptz default now()
);

-- ── marketplace_listings ──────────────────────────────────
create table if not exists marketplace_listings (
  id           uuid primary key default gen_random_uuid(),
  seller_id    uuid not null references profiles(id) on delete cascade,
  item_id      uuid references items(id) on delete set null,
  price        numeric(10,2) not null,
  description  text,
  contact_type text default 'whatsapp',
  phone        text,
  status       text default 'active',
  created_at   timestamptz default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table profiles             enable row level security;
alter table items                enable row level security;
alter table outfits              enable row level security;
alter table marketplace_listings enable row level security;

-- profiles: users read/write their own row
create policy "profiles: own row" on profiles
  for all using (auth.uid() = id);

-- items: users read/write their own items
create policy "items: own rows" on items
  for all using (auth.uid() = user_id);

-- outfits: users read/write their own outfits
create policy "outfits: own rows" on outfits
  for all using (auth.uid() = user_id);

-- marketplace: sellers manage their own listings; anyone can read active listings
create policy "marketplace: seller owns" on marketplace_listings
  for all using (auth.uid() = seller_id);

create policy "marketplace: public read active" on marketplace_listings
  for select using (status = 'active');

-- ============================================================
-- Auto-create profile on signup
-- ============================================================
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
