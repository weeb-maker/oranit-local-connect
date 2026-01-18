-- Add category_type enum and type column to categories

-- Create enum for category types
CREATE TYPE public.category_type AS ENUM ('business', 'community_help', 'public_service', 'mixed');

-- Add type column to categories table
ALTER TABLE public.categories
ADD COLUMN type public.category_type NOT NULL DEFAULT 'business';

-- Add index on type column for filtering
CREATE INDEX idx_categories_type ON public.categories(type);