-- Fix 1: Deny anonymous access to profiles table
CREATE POLICY "Deny anonymous access to profiles"
ON public.profiles FOR SELECT
TO anon
USING (false);

-- Fix 2: Deny anonymous access to business_contacts table  
CREATE POLICY "Deny anonymous access to business_contacts"
ON public.business_contacts FOR SELECT
TO anon
USING (false);

-- Fix 3: Replace get_business_contact function to use internal auth check instead of trusting caller parameter
-- First revoke any existing grants
REVOKE ALL ON FUNCTION public.get_business_contact(UUID, BOOLEAN) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_business_contact(UUID, BOOLEAN) FROM anon;
REVOKE ALL ON FUNCTION public.get_business_contact(UUID, BOOLEAN) FROM authenticated;

-- Drop the old function
DROP FUNCTION IF EXISTS public.get_business_contact(UUID, BOOLEAN);

-- Create new function without the trusting boolean parameter
CREATE OR REPLACE FUNCTION public.get_business_contact(p_business_id UUID)
RETURNS TABLE(whatsapp TEXT, email TEXT, phone TEXT, can_view BOOLEAN)
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
  v_is_authenticated BOOLEAN;
BEGIN
  -- Internal authentication check - do not trust caller
  v_is_authenticated := auth.uid() IS NOT NULL;

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
  ELSIF v_visibility = 'members_only' AND v_is_authenticated THEN
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

-- Grant execute to both anon and authenticated - function handles auth internally
GRANT EXECUTE ON FUNCTION public.get_business_contact(UUID) TO anon, authenticated;

-- Revoke from PUBLIC to ensure only explicit grants apply
REVOKE ALL ON FUNCTION public.get_business_contact(UUID) FROM PUBLIC;