-- ============================================
-- ProServices - Supabase Migration
-- Safe to run multiple times (idempotent)
-- ============================================

-- Create service_requests table if it doesn't exist
CREATE TABLE IF NOT EXISTS service_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    contact_info TEXT NOT NULL,
    service_type TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    preferred_date TEXT,
    preferred_time TEXT,
    urgency TEXT,
    budget TEXT,
    status TEXT DEFAULT 'pending'
);

-- Add columns if they don't already exist (safe updates)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='service_requests' AND column_name='full_name') THEN
        ALTER TABLE service_requests ADD COLUMN full_name TEXT NOT NULL DEFAULT '';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='service_requests' AND column_name='contact_info') THEN
        ALTER TABLE service_requests ADD COLUMN contact_info TEXT NOT NULL DEFAULT '';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='service_requests' AND column_name='service_type') THEN
        ALTER TABLE service_requests ADD COLUMN service_type TEXT NOT NULL DEFAULT '';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='service_requests' AND column_name='location') THEN
        ALTER TABLE service_requests ADD COLUMN location TEXT NOT NULL DEFAULT '';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='service_requests' AND column_name='description') THEN
        ALTER TABLE service_requests ADD COLUMN description TEXT NOT NULL DEFAULT '';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='service_requests' AND column_name='preferred_date') THEN
        ALTER TABLE service_requests ADD COLUMN preferred_date TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='service_requests' AND column_name='preferred_time') THEN
        ALTER TABLE service_requests ADD COLUMN preferred_time TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='service_requests' AND column_name='urgency') THEN
        ALTER TABLE service_requests ADD COLUMN urgency TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='service_requests' AND column_name='budget') THEN
        ALTER TABLE service_requests ADD COLUMN budget TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='service_requests' AND column_name='status') THEN
        ALTER TABLE service_requests ADD COLUMN status TEXT DEFAULT 'pending';
    END IF;
END $$;

-- Enable Row Level Security (RLS)
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies before recreating (safe re-run)
DROP POLICY IF EXISTS "Allow anonymous insert for service_requests" ON service_requests;
DROP POLICY IF EXISTS "Allow authenticated read for service_requests" ON service_requests;

-- Allow anonymous inserts for the order form
CREATE POLICY "Allow anonymous insert for service_requests" ON service_requests
FOR INSERT WITH CHECK (true);

-- Allow authenticated users (admin) to read all orders
CREATE POLICY "Allow authenticated read for service_requests" ON service_requests
FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================
-- Admins Table
-- ============================================

CREATE TABLE IF NOT EXISTS admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    passcode TEXT NOT NULL
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous read for admins" ON admins;
DROP POLICY IF EXISTS "Allow authenticated all for admins" ON admins;

CREATE POLICY "Allow anonymous read for admins" ON admins
FOR SELECT USING (true);

CREATE POLICY "Allow authenticated all for admins" ON admins
FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- Services Table
-- ============================================

CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price TEXT NOT NULL,
    delivery_time TEXT NOT NULL,
    is_available BOOLEAN DEFAULT true
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous read for services" ON services;
DROP POLICY IF EXISTS "Allow authenticated all for services" ON services;

CREATE POLICY "Allow anonymous read for services" ON services
FOR SELECT USING (true);

CREATE POLICY "Allow authenticated all for services" ON services
FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Insert initial dummy data for services if empty
INSERT INTO services (name, description, price, delivery_time, is_available)
SELECT 'Site Vitrine Pro', 'Idéal pour les entreprises et indépendants.', '45,000 DA', '7-10 jours', true
WHERE NOT EXISTS (SELECT 1 FROM services LIMIT 1);

INSERT INTO services (name, description, price, delivery_time, is_available)
SELECT 'E-commerce Complet', 'Boutique en ligne avec gestion de stock.', '85,000 DA', '15-20 jours', true
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'E-commerce Complet');

INSERT INTO services (name, description, price, delivery_time, is_available)
SELECT 'Landing Page High-Conv', 'Optimisé pour vos campagnes publicitaires.', '25,000 DA', '3-5 jours', true
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Landing Page High-Conv');

-- ============================================
-- Agency Settings Table
-- ============================================

CREATE TABLE IF NOT EXISTS agency_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL
);

ALTER TABLE agency_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous read for agency_settings" ON agency_settings;
DROP POLICY IF EXISTS "Allow authenticated all for agency_settings" ON agency_settings;

CREATE POLICY "Allow anonymous read for agency_settings" ON agency_settings
FOR SELECT USING (true);

CREATE POLICY "Allow authenticated all for agency_settings" ON agency_settings
FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Insert default settings
INSERT INTO agency_settings (key, value)
VALUES ('agency_name', 'ProServices Digital')
ON CONFLICT (key) DO NOTHING;

INSERT INTO agency_settings (key, value)
VALUES ('admin_email', 'admin@proservices.dz')
ON CONFLICT (key) DO NOTHING;

INSERT INTO agency_settings (key, value)
VALUES ('agency_bio', 'Solutions digitales premium basées en Algérie.')
ON CONFLICT (key) DO NOTHING;

INSERT INTO agency_settings (key, value)
VALUES ('brand_color', '#D4FF00')
ON CONFLICT (key) DO NOTHING;
