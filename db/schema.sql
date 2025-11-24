-- Supabase Postgres şeması: Mekanova
create extension if not exists "uuid-ossp";

-- users
create table if not exists public.users (
    id uuid primary key default uuid_generate_v4(),
    auth_user_id uuid references auth.users(id),
    email text unique not null,
    display_name text not null,
    avatar_url text,
    phone_number text,
    city text,
    created_at timestamp without time zone default now()
);
create index if not exists idx_users_auth_user_id on public.users (auth_user_id);

-- venues
create table if not exists public.venues (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    slug text unique not null,
    concept_type text not null,
    city text not null,
    district text not null,
    address text not null,
    latitude double precision not null,
    longitude double precision not null,
    phone_number text,
    average_price_level smallint not null check (average_price_level between 1 and 4),
    rating real,
    total_reviews integer default 0,
    cover_image_url text,
    is_featured boolean default false,
    open_hours_json jsonb,
    current_occupancy_percent smallint not null default 0 check (current_occupancy_percent between 0 and 100),
    max_capacity integer,
    created_at timestamp without time zone default now()
);
create index if not exists idx_venues_city_district on public.venues (city, district);
create index if not exists idx_venues_location on public.venues using gist (ll_to_earth(latitude, longitude));

-- venue_menu_sections
create table if not exists public.venue_menu_sections (
    id uuid primary key default uuid_generate_v4(),
    venue_id uuid references public.venues(id) on delete cascade,
    title text not null,
    description text,
    sort_order integer default 0
);
create index if not exists idx_menu_sections_venue on public.venue_menu_sections (venue_id);

-- menu_items
create table if not exists public.menu_items (
    id uuid primary key default uuid_generate_v4(),
    section_id uuid references public.venue_menu_sections(id) on delete cascade,
    name text not null,
    description text,
    price numeric(10,2) not null,
    currency text default 'TRY',
    is_vegan boolean default false,
    is_alcoholic boolean default false,
    sort_order integer default 0
);
create index if not exists idx_menu_items_section on public.menu_items (section_id);

-- reservations
create table if not exists public.reservations (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete cascade,
    venue_id uuid references public.venues(id) on delete cascade,
    reservation_date date not null,
    reservation_time time not null,
    people_count smallint not null check (people_count > 0),
    special_request text,
    status text default 'pending',
    created_at timestamp without time zone default now()
);
create index if not exists idx_reservations_user on public.reservations (user_id);
create index if not exists idx_reservations_venue_date on public.reservations (venue_id, reservation_date);

-- favorites
create table if not exists public.favorites (
    user_id uuid references public.users(id) on delete cascade,
    venue_id uuid references public.venues(id) on delete cascade,
    created_at timestamp without time zone default now(),
    primary key (user_id, venue_id)
);
