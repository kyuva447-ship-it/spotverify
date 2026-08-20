create extension if not exists "uuid-ossp";

create type user_role as enum ('buyer', 'verifier', 'admin');
create type task_status as enum ('created', 'funded', 'inspection_pending', 'verified', 'released', 'disputed', 'refunded');

create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  phone text not null,
  role user_role not null default 'buyer',
  is_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.profiles enable row level security;

create table public.tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  amount numeric not null,
  platform_fee numeric not null,
  escrow_principal numeric not null,
  location text not null,
  buyer_id uuid references public.profiles(id) not null,
  verifier_id uuid references public.profiles(id),
  status task_status not null default 'created',
  razorpay_order_id text,
  proof_image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.tasks enable row level security;

create policy "Public tasks readable" on tasks for select using (true);
create policy "Buyers insert tasks" on tasks for insert with check (auth.uid() = buyer_id);
create policy "Tasks updates" on tasks for update using (true);
create policy "Profiles readable" on profiles for select using (true);
create policy "Profiles insert" on profiles for insert with check (auth.uid() = id);