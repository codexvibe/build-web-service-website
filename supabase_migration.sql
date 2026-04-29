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
