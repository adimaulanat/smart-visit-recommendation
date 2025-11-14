-- Create a simple health check table to initialize the database schema
-- This will trigger the types.ts file generation

CREATE TABLE IF NOT EXISTS public.app_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert a version record
INSERT INTO public.app_metadata (key, value) 
VALUES ('schema_version', '1.0.0')
ON CONFLICT (key) DO NOTHING;

-- Enable RLS (required for all tables)
ALTER TABLE public.app_metadata ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read app metadata
CREATE POLICY "Anyone can read app metadata"
  ON public.app_metadata
  FOR SELECT
  TO public
  USING (true);