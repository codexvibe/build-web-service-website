-- ============================================
-- WebCraft Agency - Supabase Migration
-- Safe to run multiple times (idempotent)
-- ============================================

-- Create orders table if it doesn't exist
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    contact_info TEXT NOT NULL,
    site_type TEXT NOT NULL,
    project_name TEXT NOT NULL,
    description TEXT NOT NULL,
    features TEXT[],
    design_style TEXT,
    budget TEXT,
    deadline TEXT,
    file_urls TEXT[],
    status TEXT DEFAULT 'pending'
);

-- Add columns if they don't already exist (safe updates)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='full_name') THEN
        ALTER TABLE orders ADD COLUMN full_name TEXT NOT NULL DEFAULT '';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='contact_info') THEN
        ALTER TABLE orders ADD COLUMN contact_info TEXT NOT NULL DEFAULT '';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='site_type') THEN
        ALTER TABLE orders ADD COLUMN site_type TEXT NOT NULL DEFAULT '';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='project_name') THEN
        ALTER TABLE orders ADD COLUMN project_name TEXT NOT NULL DEFAULT '';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='description') THEN
        ALTER TABLE orders ADD COLUMN description TEXT NOT NULL DEFAULT '';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='features') THEN
        ALTER TABLE orders ADD COLUMN features TEXT[];
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='design_style') THEN
        ALTER TABLE orders ADD COLUMN design_style TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='budget') THEN
        ALTER TABLE orders ADD COLUMN budget TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='deadline') THEN
        ALTER TABLE orders ADD COLUMN deadline TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='file_urls') THEN
        ALTER TABLE orders ADD COLUMN file_urls TEXT[];
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='status') THEN
        ALTER TABLE orders ADD COLUMN status TEXT DEFAULT 'pending';
    END IF;
END $$;

-- Enable Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies before recreating (safe re-run)
DROP POLICY IF EXISTS "Allow anonymous insert for orders" ON orders;
DROP POLICY IF EXISTS "Allow authenticated read for orders" ON orders;

-- Allow anonymous inserts for the order form
CREATE POLICY "Allow anonymous insert for orders" ON orders
FOR INSERT WITH CHECK (true);

-- Allow authenticated users (admin) to read all orders
CREATE POLICY "Allow authenticated read for orders" ON orders
FOR SELECT USING (auth.role() = 'authenticated');
