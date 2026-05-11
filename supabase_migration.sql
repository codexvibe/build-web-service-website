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

-- Insert initial admin
INSERT INTO admins (name, passcode)
SELECT 'Super Admin', 'codexvibe'
WHERE NOT EXISTS (SELECT 1 FROM admins WHERE name = 'Super Admin');

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
    category TEXT DEFAULT 'Web',
    is_available BOOLEAN DEFAULT true
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous read for services" ON services;
DROP POLICY IF EXISTS "Allow authenticated all for services" ON services;
DROP POLICY IF EXISTS "Allow anonymous all for services" ON services;

CREATE POLICY "Allow anonymous all for services" ON services
FOR ALL USING (true) WITH CHECK (true);

-- Insert initial dummy data for services if empty
INSERT INTO services (name, description, price, delivery_time, is_available)
SELECT 'Sites Vitrines', 'Présentez votre activité avec un design élégant et professionnel. Idéal pour les artisans et PME.', '15 000 DA', '7 jours', true
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Sites Vitrines');

INSERT INTO services (name, description, price, delivery_time, is_available)
SELECT 'Pack Business', 'E-commerce, Immobilier, Plateformes de Gestion, Réservations... Des solutions sur mesure pour booster votre activité.', '45 000 DA', '15 jours', true
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Pack Business');

INSERT INTO services (name, description, price, delivery_time, is_available)
SELECT 'Pack Agence', 'Solution Premium pour Agences : Site haute performance, SEO Local, Intégration CRM et Support VIP dédié.', '85 000 DA', '20 jours', true
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Pack Agence');

INSERT INTO services (name, description, price, delivery_time, is_available)
SELECT 'Applications Web', 'Développement sur mesure d''outils métiers et de plateformes complexes pour votre entreprise.', 'Sur Devis', 'Variable', true
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Applications Web');

INSERT INTO services (name, description, price, delivery_time, is_available)
SELECT 'SEO & Visibilité', 'Optimisez votre positionnement sur Google et attirez plus de clients qualifiés.', '10 000 DA', 'Mensuel', true
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'SEO & Visibilité');

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
DROP POLICY IF EXISTS "Allow anonymous all for agency_settings" ON agency_settings;

CREATE POLICY "Allow anonymous all for agency_settings" ON agency_settings
FOR ALL USING (true) WITH CHECK (true);

-- Insert default settings
DELETE FROM agency_settings WHERE key = 'brand_color';

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
VALUES ('brand_color_light', '#3b82f6')
ON CONFLICT (key) DO NOTHING;

INSERT INTO agency_settings (key, value)
VALUES ('brand_color_dark', '#ffffff')
ON CONFLICT (key) DO NOTHING;

-- HERO SETTINGS
INSERT INTO agency_settings (key, value) VALUES 
('hero_badge', 'AGENCE DIGITALE PREMIUM'),
('hero_title', 'Propulsez votre Business en ligne.'),
('hero_subtitle', 'Nous créons des sites web performants et des expériences digitales uniques pour transformer vos visiteurs en clients fidèles.'),
('hero_cta_primary', 'Dévis Gratuit'),
('hero_cta_secondary', 'Découvrir nos services'),
('show_hero_glow', 'true')
ON CONFLICT (key) DO NOTHING;

-- ABOUT & CTA SETTINGS
INSERT INTO agency_settings (key, value) VALUES 
('about_title', 'Expertise et Qualité'),
('about_desc', 'Nous nous engageons à fournir des solutions digitales de haute qualité qui répondent aux besoins spécifiques de nos clients en Algérie.'),
('cta_title', 'Prêt à lancer votre projet ?'),
('contact_whatsapp', '213555555555')
ON CONFLICT (key) DO NOTHING;

-- TOP ANNOUNCEMENT SETTINGS
INSERT INTO agency_settings (key, value) VALUES 
('show_announcement', 'true'),
('announcement_text', '🚀 Promotion Exceptionnelle : -20% sur tous les sites vitrines jusqu''à la fin du mois !'),
('announcement_link', '/services')
ON CONFLICT (key) DO NOTHING;

-- FOOTER & CONTACT SETTINGS
INSERT INTO agency_settings (key, value) VALUES 
('footer_desc', 'Solutions digitales premium basées en Algérie. Nous transformons vos idées en succès numérique avec des technologies de pointe.'),
('contact_phone', '+213 555 55 55 55'),
('contact_email', 'contact@proservices.dz'),
('contact_address', 'Alger, Algérie'),
('social_facebook', 'https://facebook.com'),
('social_instagram', 'https://instagram.com'),
('social_linkedin', 'https://linkedin.com')
ON CONFLICT (key) DO NOTHING;
