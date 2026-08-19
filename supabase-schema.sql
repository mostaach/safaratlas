-- ============================================================
-- SAFARATLAS — SUPABASE DATABASE SCHEMA
-- Run this in: https://supabase.com/dashboard/project/lhmbwvkqqxhfqmzmxkrz/sql/new
-- ============================================================

-- --------------------------------------------------
-- TABLE: leads (Journey Requests from travelers)
-- --------------------------------------------------
CREATE TABLE IF NOT EXISTS public.leads (
  id                      TEXT          PRIMARY KEY,
  status                  TEXT          NOT NULL DEFAULT 'new',
  source                  TEXT          NOT NULL DEFAULT 'website',
  partner_id              TEXT,
  partner_name            TEXT          NOT NULL DEFAULT '',
  listing_name            TEXT          NOT NULL DEFAULT '',
  traveler_name           TEXT          NOT NULL DEFAULT '',
  email                   TEXT          NOT NULL DEFAULT '',
  whatsapp                TEXT          NOT NULL DEFAULT '',
  travel_dates            TEXT          NOT NULL DEFAULT '',
  group_size              TEXT          NOT NULL DEFAULT '',
  message                 TEXT          NOT NULL DEFAULT '',
  booking_value           NUMERIC,
  commission_rate         NUMERIC,
  expected_margin         NUMERIC,
  reconciliation_status   TEXT          NOT NULL DEFAULT 'not_applicable',
  created_at              TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- RLS is enabled, meaning all public access is blocked.
-- The Next.js API uses the SUPABASE_SERVICE_ROLE_KEY, which securely bypasses RLS.

-- Indexes for fast querying in admin dashboard
CREATE INDEX IF NOT EXISTS leads_status_idx     ON public.leads (status);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_email_idx      ON public.leads (email);


-- --------------------------------------------------
-- TABLE: partner_applications (Partner onboarding)
-- --------------------------------------------------
CREATE TABLE IF NOT EXISTS public.partner_applications (
  id                  TEXT          PRIMARY KEY,
  status              TEXT          NOT NULL DEFAULT 'pending',
  business_name       TEXT          NOT NULL DEFAULT '',
  category            TEXT          NOT NULL DEFAULT 'other',
  website             TEXT          NOT NULL DEFAULT '',
  description         TEXT          NOT NULL DEFAULT '',
  location            TEXT          NOT NULL DEFAULT '',
  contact_name        TEXT          NOT NULL DEFAULT '',
  email               TEXT          NOT NULL DEFAULT '',
  whatsapp            TEXT          NOT NULL DEFAULT '',
  years_in_business   TEXT          NOT NULL DEFAULT '',
  languages           TEXT          NOT NULL DEFAULT '',
  price_range         TEXT          NOT NULL DEFAULT '',
  admin_notes         TEXT          NOT NULL DEFAULT '',
  created_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

ALTER TABLE public.partner_applications ENABLE ROW LEVEL SECURITY;

-- RLS is enabled, meaning all public access is blocked.
-- The Next.js API uses the SUPABASE_SERVICE_ROLE_KEY, which securely bypasses RLS.

CREATE INDEX IF NOT EXISTS partner_apps_status_idx     ON public.partner_applications (status);
CREATE INDEX IF NOT EXISTS partner_apps_created_at_idx ON public.partner_applications (created_at DESC);
