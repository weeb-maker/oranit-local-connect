-- Fix 1: Update public_businesses view to respect show_* visibility flags
DROP VIEW IF EXISTS public.public_businesses;

CREATE VIEW public.public_businesses
WITH (security_invoker=on) AS
SELECT
  b.id,
  b.slug,
  b.category_id,
  b.name,
  b.description,
  b.address,
  b.hours,
  b.logo_url,
  b.cover_url,
  b.website,
  -- Only expose contact info if the corresponding flag is true
  CASE WHEN b.show_whatsapp = true THEN b.whatsapp ELSE NULL END AS whatsapp,
  CASE WHEN b.show_email = true THEN b.email ELSE NULL END AS email,
  CASE WHEN b.show_phone = true THEN b.phone ELSE NULL END AS phone,
  b.average_rating,
  b.review_count,
  b.is_featured,
  b.created_at
FROM public.businesses b
WHERE b.status = 'approved' AND b.deleted_at IS NULL;

-- Fix 2: Add RLS policies to business_entitlements view
-- First, we need to understand that business_entitlements is a VIEW, not a table
-- Views don't have RLS - they inherit from underlying tables
-- The view should be recreated with security_invoker=on

DROP VIEW IF EXISTS public.business_entitlements;

CREATE VIEW public.business_entitlements
WITH (security_invoker=on) AS
SELECT
  bs.business_id,
  bs.tier,
  bs.status,
  -- Derive entitlements from subscription tier
  bs.tier IN ('basic', 'premium') AS can_respond_reviews,
  bs.tier = 'premium' AS is_featured,
  bs.tier = 'premium' AS can_post_deals
FROM public.business_subscriptions bs
WHERE bs.status = 'active';

-- Fix 3: Create a private business_contacts table for owner-only contact management
-- This separates public-facing contact visibility from actual contact data management
CREATE TABLE IF NOT EXISTS public.business_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL UNIQUE REFERENCES public.businesses(id) ON DELETE CASCADE,
  -- Contact visibility control
  contact_visibility TEXT NOT NULL DEFAULT 'members_only' 
    CHECK (contact_visibility IN ('hidden', 'members_only', 'public')),
  -- Additional private contact fields (not shown publicly)
  owner_email TEXT,
  owner_phone TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on business_contacts
ALTER TABLE public.business_contacts ENABLE ROW LEVEL SECURITY;

-- Only business owners and admins can see/manage business contacts
CREATE POLICY "Owners read own business contacts"
  ON public.business_contacts FOR SELECT
  USING (public.owns_business(auth.uid(), business_id));

CREATE POLICY "Owners manage own business contacts"
  ON public.business_contacts FOR ALL
  USING (public.owns_business(auth.uid(), business_id))
  WITH CHECK (public.owns_business(auth.uid(), business_id));

CREATE POLICY "Admins manage all business contacts"
  ON public.business_contacts FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Fix 4: Create a function to get business contact info based on visibility rules
CREATE OR REPLACE FUNCTION public.get_business_contact(
  p_business_id UUID,
  p_is_authenticated BOOLEAN DEFAULT false
)
RETURNS TABLE (
  whatsapp TEXT,
  email TEXT,
  phone TEXT,
  can_view BOOLEAN
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_visibility TEXT;
  v_show_whatsapp BOOLEAN;
  v_show_email BOOLEAN;
  v_show_phone BOOLEAN;
BEGIN
  -- Get visibility setting from business_contacts if exists
  SELECT bc.contact_visibility INTO v_visibility
  FROM public.business_contacts bc
  WHERE bc.business_id = p_business_id;
  
  -- Default to 'members_only' if no contact record
  v_visibility := COALESCE(v_visibility, 'members_only');
  
  -- Get the business show flags
  SELECT b.show_whatsapp, b.show_email, b.show_phone
  INTO v_show_whatsapp, v_show_email, v_show_phone
  FROM public.businesses b
  WHERE b.id = p_business_id 
    AND b.status = 'approved' 
    AND b.deleted_at IS NULL;
  
  -- Return based on visibility rules
  IF v_visibility = 'hidden' THEN
    RETURN QUERY SELECT NULL::TEXT, NULL::TEXT, NULL::TEXT, false;
  ELSIF v_visibility = 'public' THEN
    RETURN QUERY 
    SELECT 
      CASE WHEN v_show_whatsapp THEN b.whatsapp ELSE NULL END,
      CASE WHEN v_show_email THEN b.email ELSE NULL END,
      CASE WHEN v_show_phone THEN b.phone ELSE NULL END,
      true
    FROM public.businesses b
    WHERE b.id = p_business_id;
  ELSIF v_visibility = 'members_only' AND p_is_authenticated THEN
    RETURN QUERY 
    SELECT 
      CASE WHEN v_show_whatsapp THEN b.whatsapp ELSE NULL END,
      CASE WHEN v_show_email THEN b.email ELSE NULL END,
      CASE WHEN v_show_phone THEN b.phone ELSE NULL END,
      true
    FROM public.businesses b
    WHERE b.id = p_business_id;
  ELSE
    RETURN QUERY SELECT NULL::TEXT, NULL::TEXT, NULL::TEXT, false;
  END IF;
END;
$$;