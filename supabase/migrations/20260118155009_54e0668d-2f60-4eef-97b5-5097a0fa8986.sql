-- Cleanup patch: Add search_path to trigger functions to eliminate linter warnings

CREATE OR REPLACE FUNCTION public.validate_business_category()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.categories
    WHERE id = NEW.category_id
      AND parent_id IS NOT NULL
  ) THEN
    RAISE EXCEPTION 'Business must belong to a subcategory, not a parent category';
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.validate_report_entity()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.entity_type = 'business' AND NOT EXISTS (SELECT 1 FROM public.businesses WHERE id = NEW.entity_id) THEN
    RAISE EXCEPTION 'Referenced business does not exist';
  ELSIF NEW.entity_type = 'review' AND NOT EXISTS (SELECT 1 FROM public.reviews WHERE id = NEW.entity_id) THEN
    RAISE EXCEPTION 'Referenced review does not exist';
  ELSIF NEW.entity_type = 'listing' AND NOT EXISTS (SELECT 1 FROM public.marketplace_listings WHERE id = NEW.entity_id) THEN
    RAISE EXCEPTION 'Referenced listing does not exist';
  ELSIF NEW.entity_type = 'event' AND NOT EXISTS (SELECT 1 FROM public.events WHERE id = NEW.entity_id) THEN
    RAISE EXCEPTION 'Referenced event does not exist';
  ELSIF NEW.entity_type = 'deal' AND NOT EXISTS (SELECT 1 FROM public.deals WHERE id = NEW.entity_id) THEN
    RAISE EXCEPTION 'Referenced deal does not exist';
  END IF;
  RETURN NEW;
END;
$$;