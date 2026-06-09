create extension if not exists "pgcrypto";

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  cover_image text not null,
  category text not null,
  author_name text not null,
  author_avatar text not null,
  read_time text not null default '4 min read',
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  is_published boolean not null default false,
  is_featured boolean not null default false
);

alter table public.posts enable row level security;

drop policy if exists "Published posts are publicly readable" on public.posts;
create policy "Published posts are publicly readable"
  on public.posts
  for select
  using (is_published = true);

create index if not exists posts_published_at_idx on public.posts (published_at desc);
create index if not exists posts_category_idx on public.posts (category);
