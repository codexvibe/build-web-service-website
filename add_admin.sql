-- Script to insert a new admin with a specific passcode
-- Run this in your Supabase SQL Editor
INSERT INTO admins (name, passcode) 
VALUES ('Main Admin', 'pro2025') 
ON CONFLICT (id) DO NOTHING;
