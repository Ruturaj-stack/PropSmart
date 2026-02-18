
-- Drop the table if it exists to start fresh
DROP TABLE IF EXISTS public.saved_properties;

-- Create the table
CREATE TABLE public.saved_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Use "user_id" as the column name for clarity, but reference profiles(id)
  user_id UUID NOT NULL,
  
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  saved_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, property_id)
);

-- Add the foreign key constraint separately
ALTER TABLE public.saved_properties
ADD CONSTRAINT fk_saved_properties_profiles
FOREIGN KEY (user_id)
REFERENCES public.profiles(id) -- Adjusted to reference 'id'
ON DELETE CASCADE;

-- Enable RLS
ALTER TABLE public.saved_properties ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own saved properties" 
ON public.saved_properties FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can save properties" 
ON public.saved_properties FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave properties" 
ON public.saved_properties FOR DELETE 
USING (auth.uid() = user_id);
