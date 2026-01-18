-- ============================================================
-- ORANIT LOCAL CONNECT V1 MIGRATION
-- ============================================================

-- ============================================================
-- 1. EXTENSIONS
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;

-- ============================================================
-- 2. ENUMS
-- ============================================================

CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
CREATE TYPE public.business_status AS ENUM ('draft', 'pending', 'approved', 'rejected', 'suspended');
CREATE TYPE public.review_status AS ENUM ('pending', 'approved', 'rejected', 'hidden');
CREATE TYPE public.ownership_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.listing_status AS ENUM ('active', 'sold', 'expired', 'removed');
CREATE TYPE public.listing_condition AS ENUM ('new', 'like_new', 'good', 'fair');
CREATE TYPE public.report_status AS ENUM ('pending', 'reviewed', 'resolved', 'dismissed');
CREATE TYPE public.subscription_tier AS ENUM ('free', 'basic', 'premium');
CREATE TYPE public.subscription_status AS ENUM ('active', 'past_due', 'canceled', 'trialing', 'incomplete', 'unpaid');

-- ============================================================
-- 3. DOMAINS & TRANSLATION HELPERS
-- ============================================================

CREATE DOMAIN public.translated_text AS JSONB
CHECK (
  VALUE IS NULL
  OR (
    VALUE ? 'en' AND VALUE ? 'he'
    AND (VALUE->>'en' IS NULL OR length(trim(VALUE->>'en')) > 0)
    AND (VALUE->>'he' IS NULL OR length(trim(VALUE->>'he')) > 0)
  )
);

CREATE OR REPLACE FUNCTION public.make_translation(en_text TEXT, he_text TEXT)
RETURNS public.translated_text
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT jsonb_build_object(
    'en', NULLIF(trim(en_text), ''),
    'he', NULLIF(trim(he_text), '')
  )::public.translated_text
$$;

CREATE OR REPLACE FUNCTION public.t(val public.translated_text, lang TEXT DEFAULT 'en')
RETURNS TEXT
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT COALESCE(
    val->>lang,
    val->>'en',
    val->>'he'
  )
$$;

-- ============================================================
-- 4. TABLES
-- ============================================================

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  name public.translated_text NOT NULL,
  description public.translated_text,
  icon TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
  name public.translated_text NOT NULL,
  description public.translated_text,
  address public.translated_text,
  phone TEXT,
  email TEXT,
  whatsapp TEXT,
  website TEXT,
  logo_url TEXT,
  cover_url TEXT,
  hours JSONB,
  status public.business_status NOT NULL DEFAULT 'draft',
  average_rating NUMERIC(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  show_email BOOLEAN NOT NULL DEFAULT false,
  show_phone BOOLEAN NOT NULL DEFAULT false,
  show_whatsapp BOOLEAN NOT NULL DEFAULT true,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.business_owners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status public.ownership_status NOT NULL DEFAULT 'pending',
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(business_id, user_id)
);

CREATE TABLE public.business_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL UNIQUE REFERENCES public.businesses(id) ON DELETE CASCADE,
  tier public.subscription_tier NOT NULL DEFAULT 'free',
  status public.subscription_status NOT NULL DEFAULT 'active',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.stripe_price_map (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tier public.subscription_tier NOT NULL,
  interval TEXT NOT NULL DEFAULT 'month' CHECK (interval IN ('month', 'year')),
  stripe_price_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tier, interval)
);

CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  body TEXT,
  status public.review_status NOT NULL DEFAULT 'pending',
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(business_id, user_id)
);

CREATE TABLE public.review_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL UNIQUE REFERENCES public.reviews(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.marketplace_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
  title public.translated_text NOT NULL,
  description public.translated_text,
  price NUMERIC(10,2),
  condition public.listing_condition,
  images TEXT[],
  status public.listing_status NOT NULL DEFAULT 'active',
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  title public.translated_text NOT NULL,
  description public.translated_text,
  discount_percent INTEGER CHECK (discount_percent BETWEEN 1 AND 100),
  original_price NUMERIC(10,2),
  deal_price NUMERIC(10,2),
  image_url TEXT,
  starts_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ends_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title public.translated_text NOT NULL,
  description public.translated_text,
  location public.translated_text,
  image_url TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('business', 'review', 'listing', 'event', 'deal')),
  entity_id UUID NOT NULL,
  reason TEXT NOT NULL,
  details TEXT,
  status public.report_status NOT NULL DEFAULT 'pending',
  resolved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 5. SECURITY DEFINER HELPER FUNCTIONS
-- ============================================================

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

CREATE OR REPLACE FUNCTION public.owns_business(_user_id UUID, _business_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.business_owners
    WHERE user_id = _user_id
      AND business_id = _business_id
      AND status = 'approved'
  )
$$;

CREATE OR REPLACE FUNCTION public.business_can_respond_to_reviews(_business_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.business_subscriptions
    WHERE business_id = _business_id
      AND status = 'active'
      AND tier IN ('basic', 'premium')
  )
$$;

CREATE OR REPLACE FUNCTION public.get_business_owner_count(_business_id UUID)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*)::INTEGER
  FROM public.business_owners
  WHERE business_id = _business_id
    AND status = 'approved'
$$;

-- ============================================================
-- 6. INDEXES
-- ============================================================

CREATE INDEX idx_businesses_category ON public.businesses(category_id);
CREATE INDEX idx_businesses_status ON public.businesses(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_businesses_featured ON public.businesses(is_featured) WHERE is_featured = true AND deleted_at IS NULL;
CREATE INDEX idx_businesses_name_en_trgm ON public.businesses USING GIN ((name->>'en') gin_trgm_ops);
CREATE INDEX idx_businesses_name_he_trgm ON public.businesses USING GIN ((name->>'he') gin_trgm_ops);

CREATE INDEX idx_business_owners_user ON public.business_owners(user_id);
CREATE INDEX idx_business_owners_business ON public.business_owners(business_id);

CREATE INDEX idx_reviews_business ON public.reviews(business_id);
CREATE INDEX idx_reviews_user ON public.reviews(user_id);
CREATE INDEX idx_reviews_status ON public.reviews(status) WHERE deleted_at IS NULL;

CREATE INDEX idx_listings_user ON public.marketplace_listings(user_id);
CREATE INDEX idx_listings_category ON public.marketplace_listings(category_id);
CREATE INDEX idx_listings_status ON public.marketplace_listings(status) WHERE deleted_at IS NULL;

CREATE INDEX idx_deals_business ON public.deals(business_id);
CREATE INDEX idx_deals_active ON public.deals(is_active, ends_at) WHERE deleted_at IS NULL;

CREATE INDEX idx_events_business ON public.events(business_id);
CREATE INDEX idx_events_user ON public.events(user_id);
CREATE INDEX idx_events_starts ON public.events(starts_at) WHERE deleted_at IS NULL;

CREATE INDEX idx_reports_entity ON public.reports(entity_type, entity_id);
CREATE INDEX idx_reports_status ON public.reports(status);

CREATE UNIQUE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer_unique
ON public.business_subscriptions(stripe_customer_id)
WHERE stripe_customer_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_unique
ON public.business_subscriptions(stripe_subscription_id)
WHERE stripe_subscription_id IS NOT NULL;

-- ============================================================
-- 7. TRIGGER FUNCTIONS
-- ============================================================

CREATE OR REPLACE FUNCTION public.validate_business_category()
RETURNS TRIGGER
LANGUAGE plpgsql
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

CREATE OR REPLACE FUNCTION public.update_business_rating()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_business_id UUID;
BEGIN
  v_business_id := COALESCE(NEW.business_id, OLD.business_id);
  
  UPDATE public.businesses
  SET
    average_rating = COALESCE((
      SELECT ROUND(AVG(rating)::NUMERIC, 1)
      FROM public.reviews
      WHERE business_id = v_business_id
        AND status = 'approved'
        AND deleted_at IS NULL
    ), 0),
    review_count = (
      SELECT COUNT(*)
      FROM public.reviews
      WHERE business_id = v_business_id
        AND status = 'approved'
        AND deleted_at IS NULL
    ),
    updated_at = now()
  WHERE id = v_business_id;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE OR REPLACE FUNCTION public.validate_report_entity()
RETURNS TRIGGER
LANGUAGE plpgsql
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

-- ============================================================
-- 8. TRIGGERS
-- ============================================================

CREATE TRIGGER validate_business_category_trigger
  BEFORE INSERT OR UPDATE OF category_id ON public.businesses
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_business_category();

CREATE TRIGGER update_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_business_rating();

CREATE TRIGGER validate_report_trigger
  BEFORE INSERT ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_report_entity();

-- ============================================================
-- 9. VIEWS
-- ============================================================

CREATE VIEW public.public_profiles
WITH (security_invoker = on) AS
SELECT
  id,
  full_name,
  avatar_url,
  created_at
FROM public.profiles;

CREATE VIEW public.public_businesses
WITH (security_invoker = on) AS
SELECT
  b.id,
  b.slug,
  b.category_id,
  b.name,
  b.description,
  b.address,
  CASE WHEN b.show_phone THEN b.phone ELSE NULL END AS phone,
  CASE WHEN b.show_email THEN b.email ELSE NULL END AS email,
  CASE WHEN b.show_whatsapp THEN b.whatsapp ELSE NULL END AS whatsapp,
  b.website,
  b.logo_url,
  b.cover_url,
  b.hours,
  b.average_rating,
  b.review_count,
  b.is_featured,
  b.created_at
FROM public.businesses b
WHERE b.status = 'approved'
  AND b.deleted_at IS NULL;

CREATE VIEW public.business_entitlements
WITH (security_invoker = on) AS
SELECT
  bs.business_id,
  bs.tier,
  bs.status,
  bs.tier = 'premium' AND bs.status = 'active' AS can_post_deals,
  bs.tier IN ('basic', 'premium') AND bs.status = 'active' AS can_respond_reviews,
  bs.tier = 'premium' AND bs.status = 'active' AS is_featured
FROM public.business_subscriptions bs;

-- ============================================================
-- 10. RPC FUNCTIONS
-- ============================================================

CREATE OR REPLACE FUNCTION public.create_business_and_set_owner(
  p_slug TEXT,
  p_category_id UUID,
  p_name_en TEXT,
  p_name_he TEXT,
  p_description_en TEXT DEFAULT NULL,
  p_description_he TEXT DEFAULT NULL,
  p_address_en TEXT DEFAULT NULL,
  p_address_he TEXT DEFAULT NULL,
  p_phone TEXT DEFAULT NULL,
  p_email TEXT DEFAULT NULL,
  p_whatsapp TEXT DEFAULT NULL,
  p_website TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_business_id UUID;
  v_user_id UUID;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  INSERT INTO public.businesses (
    slug,
    category_id,
    name,
    description,
    address,
    phone,
    email,
    whatsapp,
    website,
    status
  ) VALUES (
    p_slug,
    p_category_id,
    public.make_translation(p_name_en, p_name_he),
    public.make_translation(p_description_en, p_description_he),
    public.make_translation(p_address_en, p_address_he),
    p_phone,
    p_email,
    p_whatsapp,
    p_website,
    'draft'
  )
  RETURNING id INTO v_business_id;

  INSERT INTO public.business_owners (business_id, user_id, status, is_primary)
  VALUES (v_business_id, v_user_id, 'approved', true);

  INSERT INTO public.business_subscriptions (business_id, tier, status)
  VALUES (v_business_id, 'free', 'active');

  RETURN v_business_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.soft_delete_business(p_business_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF NOT (public.owns_business(v_user_id, p_business_id) OR public.is_admin()) THEN
    RAISE EXCEPTION 'Permission denied';
  END IF;

  UPDATE public.businesses
  SET deleted_at = now(), updated_at = now()
  WHERE id = p_business_id AND deleted_at IS NULL;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Business not found or already deleted';
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.soft_delete_review(p_review_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_review_user_id UUID;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT user_id INTO v_review_user_id
  FROM public.reviews
  WHERE id = p_review_id AND deleted_at IS NULL;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Review not found';
  END IF;

  IF NOT (v_review_user_id = v_user_id OR public.is_admin()) THEN
    RAISE EXCEPTION 'Permission denied';
  END IF;

  UPDATE public.reviews
  SET deleted_at = now(), updated_at = now()
  WHERE id = p_review_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.soft_delete_listing(p_listing_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_listing_user_id UUID;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT user_id INTO v_listing_user_id
  FROM public.marketplace_listings
  WHERE id = p_listing_id AND deleted_at IS NULL;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Listing not found';
  END IF;

  IF NOT (v_listing_user_id = v_user_id OR public.is_admin()) THEN
    RAISE EXCEPTION 'Permission denied';
  END IF;

  UPDATE public.marketplace_listings
  SET deleted_at = now(), updated_at = now()
  WHERE id = p_listing_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.soft_delete_deal(p_deal_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_business_id UUID;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT business_id INTO v_business_id
  FROM public.deals
  WHERE id = p_deal_id AND deleted_at IS NULL;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Deal not found';
  END IF;

  IF NOT (public.owns_business(v_user_id, v_business_id) OR public.is_admin()) THEN
    RAISE EXCEPTION 'Permission denied';
  END IF;

  UPDATE public.deals
  SET deleted_at = now(), updated_at = now()
  WHERE id = p_deal_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.soft_delete_event(p_event_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_event_user_id UUID;
  v_event_business_id UUID;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT user_id, business_id
  INTO v_event_user_id, v_event_business_id
  FROM public.events
  WHERE id = p_event_id AND deleted_at IS NULL;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Event not found';
  END IF;

  IF NOT (
    v_event_user_id = v_user_id
    OR (v_event_business_id IS NOT NULL AND public.owns_business(v_user_id, v_event_business_id))
    OR public.is_admin()
  ) THEN
    RAISE EXCEPTION 'Permission denied';
  END IF;

  UPDATE public.events
  SET deleted_at = now(), updated_at = now()
  WHERE id = p_event_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.link_stripe_customer(
  p_business_id UUID,
  p_stripe_customer_id TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF NOT public.owns_business(v_user_id, p_business_id) THEN
    RAISE EXCEPTION 'Permission denied';
  END IF;

  UPDATE public.business_subscriptions
  SET stripe_customer_id = p_stripe_customer_id, updated_at = now()
  WHERE business_id = p_business_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Subscription not found for business';
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.sync_stripe_subscription(
  p_stripe_customer_id TEXT,
  p_stripe_subscription_id TEXT,
  p_tier public.subscription_tier,
  p_status public.subscription_status,
  p_current_period_start TIMESTAMPTZ,
  p_current_period_end TIMESTAMPTZ
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_business_id UUID;
BEGIN
  SELECT business_id INTO v_business_id
  FROM public.business_subscriptions
  WHERE stripe_customer_id = p_stripe_customer_id
     OR stripe_subscription_id = p_stripe_subscription_id
  LIMIT 1;

  IF v_business_id IS NULL THEN
    RAISE EXCEPTION 'No business found for Stripe customer or subscription';
  END IF;

  UPDATE public.business_subscriptions
  SET
    stripe_subscription_id = p_stripe_subscription_id,
    tier = p_tier,
    status = p_status,
    current_period_start = p_current_period_start,
    current_period_end = p_current_period_end,
    updated_at = now()
  WHERE business_id = v_business_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.search_businesses(
  p_query TEXT,
  p_lang TEXT DEFAULT 'en',
  p_category_slug TEXT DEFAULT NULL,
  p_limit INTEGER DEFAULT 20
)
RETURNS TABLE (
  id UUID,
  slug TEXT,
  name TEXT,
  description TEXT,
  logo_url TEXT,
  average_rating NUMERIC,
  review_count INTEGER,
  similarity REAL
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    b.id,
    b.slug,
    public.t(b.name, p_lang) AS name,
    public.t(b.description, p_lang) AS description,
    b.logo_url,
    b.average_rating,
    b.review_count,
    GREATEST(
      similarity(unaccent(b.name->>'en'), unaccent(p_query)),
      similarity(unaccent(b.name->>'he'), unaccent(p_query))
    ) AS similarity
  FROM public.businesses b
  LEFT JOIN public.categories c ON c.id = b.category_id
  WHERE b.status = 'approved'
    AND b.deleted_at IS NULL
    AND (p_category_slug IS NULL OR c.slug = p_category_slug)
    AND (
      unaccent(b.name->>'en') ILIKE '%' || unaccent(p_query) || '%'
      OR unaccent(b.name->>'he') ILIKE '%' || unaccent(p_query) || '%'
      OR similarity(unaccent(b.name->>'en'), unaccent(p_query)) > 0.2
      OR similarity(unaccent(b.name->>'he'), unaccent(p_query)) > 0.2
    )
  ORDER BY similarity DESC, b.is_featured DESC, b.average_rating DESC
  LIMIT p_limit;
END;
$$;

-- ============================================================
-- 11. ENABLE ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stripe_price_map ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 12. RLS POLICIES
-- ============================================================

-- profiles
CREATE POLICY "Users read own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY "Admins read all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Users update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

CREATE POLICY "Admins manage all profiles"
ON public.profiles FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- user_roles
CREATE POLICY "Users read own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins manage all roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- categories
CREATE POLICY "Public read categories"
ON public.categories FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins manage categories"
ON public.categories FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- businesses
CREATE POLICY "Public read approved businesses"
ON public.businesses FOR SELECT
TO anon, authenticated
USING (status = 'approved' AND deleted_at IS NULL);

CREATE POLICY "Owners read own businesses"
ON public.businesses FOR SELECT
TO authenticated
USING (public.owns_business(auth.uid(), id));

CREATE POLICY "Owners update own businesses"
ON public.businesses FOR UPDATE
TO authenticated
USING (public.owns_business(auth.uid(), id) AND deleted_at IS NULL)
WITH CHECK (public.owns_business(auth.uid(), id));

CREATE POLICY "Admins manage all businesses"
ON public.businesses FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- business_owners
DROP POLICY IF EXISTS "Primary owners manage ownership" ON public.business_owners;

CREATE POLICY "Owners read own business owners"
ON public.business_owners FOR SELECT
TO authenticated
USING (public.owns_business(auth.uid(), business_id));

CREATE POLICY "Admins read all business owners"
ON public.business_owners FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Primary owners can invite"
ON public.business_owners FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL
  AND status = 'pending'
  AND is_primary = false
  AND EXISTS (
    SELECT 1 FROM public.business_owners bo
    WHERE bo.business_id = business_owners.business_id
      AND bo.user_id = auth.uid()
      AND bo.status = 'approved'
      AND bo.is_primary = true
  )
);

CREATE POLICY "Users accept own invitation"
ON public.business_owners FOR UPDATE
TO authenticated
USING (
  user_id = auth.uid()
  AND status = 'pending'
)
WITH CHECK (
  user_id = auth.uid()
  AND status IN ('approved', 'rejected')
  AND is_primary = false
);

CREATE POLICY "Primary owners can remove non-primary"
ON public.business_owners FOR DELETE
TO authenticated
USING (
  is_primary = false
  AND EXISTS (
    SELECT 1 FROM public.business_owners bo
    WHERE bo.business_id = business_owners.business_id
      AND bo.user_id = auth.uid()
      AND bo.status = 'approved'
      AND bo.is_primary = true
  )
);

CREATE POLICY "Admins manage all business owners"
ON public.business_owners FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- business_subscriptions
CREATE POLICY "Owners read own subscriptions"
ON public.business_subscriptions FOR SELECT
TO authenticated
USING (public.owns_business(auth.uid(), business_id));

CREATE POLICY "Admins manage all subscriptions"
ON public.business_subscriptions FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- stripe_price_map
CREATE POLICY "Public read price map"
ON public.stripe_price_map FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins manage price map"
ON public.stripe_price_map FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- reviews
CREATE POLICY "Public read approved reviews"
ON public.reviews FOR SELECT
TO anon, authenticated
USING (status = 'approved' AND deleted_at IS NULL);

CREATE POLICY "Users read own reviews"
ON public.reviews FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Owners read reviews on their businesses"
ON public.reviews FOR SELECT
TO authenticated
USING (public.owns_business(auth.uid(), business_id));

CREATE POLICY "Users create reviews"
ON public.reviews FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL
  AND user_id = auth.uid()
  AND status = 'pending'
);

CREATE POLICY "Users update own reviews"
ON public.reviews FOR UPDATE
TO authenticated
USING (user_id = auth.uid() AND deleted_at IS NULL)
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins manage all reviews"
ON public.reviews FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- review_responses
CREATE POLICY "Public read responses"
ON public.review_responses FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.reviews r
    WHERE r.id = review_responses.review_id
      AND r.status = 'approved'
      AND r.deleted_at IS NULL
  )
);

CREATE POLICY "Owners create responses"
ON public.review_responses FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL
  AND user_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM public.reviews r
    WHERE r.id = review_responses.review_id
      AND public.owns_business(auth.uid(), r.business_id)
      AND public.business_can_respond_to_reviews(r.business_id)
  )
  AND NOT EXISTS (
    SELECT 1 FROM public.review_responses rr
    WHERE rr.review_id = review_responses.review_id
  )
);

CREATE POLICY "Owners update own responses"
ON public.review_responses FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.reviews r
    WHERE r.id = review_responses.review_id
      AND public.owns_business(auth.uid(), r.business_id)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.reviews r
    WHERE r.id = review_responses.review_id
      AND public.owns_business(auth.uid(), r.business_id)
  )
);

CREATE POLICY "Admins manage all responses"
ON public.review_responses FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- marketplace_listings
CREATE POLICY "Public read active listings"
ON public.marketplace_listings FOR SELECT
TO anon, authenticated
USING (status = 'active' AND deleted_at IS NULL);

CREATE POLICY "Users read own listings"
ON public.marketplace_listings FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users create listings"
ON public.marketplace_listings FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL
  AND user_id = auth.uid()
);

CREATE POLICY "Users update own listings"
ON public.marketplace_listings FOR UPDATE
TO authenticated
USING (user_id = auth.uid() AND deleted_at IS NULL)
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins manage all listings"
ON public.marketplace_listings FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- deals
CREATE POLICY "Public read active deals"
ON public.deals FOR SELECT
TO anon, authenticated
USING (is_active = true AND ends_at > now() AND deleted_at IS NULL);

CREATE POLICY "Owners read own deals"
ON public.deals FOR SELECT
TO authenticated
USING (public.owns_business(auth.uid(), business_id));

CREATE POLICY "Owners create deals"
ON public.deals FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL
  AND public.owns_business(auth.uid(), business_id)
  AND EXISTS (
    SELECT 1 FROM public.business_subscriptions bs
    WHERE bs.business_id = deals.business_id
      AND bs.status = 'active'
      AND bs.tier = 'premium'
  )
);

CREATE POLICY "Owners update own deals"
ON public.deals FOR UPDATE
TO authenticated
USING (public.owns_business(auth.uid(), business_id) AND deleted_at IS NULL)
WITH CHECK (public.owns_business(auth.uid(), business_id));

CREATE POLICY "Admins manage all deals"
ON public.deals FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- events
DROP POLICY IF EXISTS "Owners create events" ON public.events;

CREATE POLICY "Public read events"
ON public.events FOR SELECT
TO anon, authenticated
USING (deleted_at IS NULL);

CREATE POLICY "Users read own events"
ON public.events FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Owners create events"
ON public.events FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL
  AND (
    (business_id IS NULL AND user_id = auth.uid())
    OR (business_id IS NOT NULL AND public.owns_business(auth.uid(), business_id))
  )
);

CREATE POLICY "Users update own events"
ON public.events FOR UPDATE
TO authenticated
USING (
  deleted_at IS NULL
  AND (
    user_id = auth.uid()
    OR (business_id IS NOT NULL AND public.owns_business(auth.uid(), business_id))
  )
)
WITH CHECK (
  user_id = auth.uid()
  OR (business_id IS NOT NULL AND public.owns_business(auth.uid(), business_id))
);

CREATE POLICY "Admins manage all events"
ON public.events FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- reports
CREATE POLICY "Users create reports"
ON public.reports FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL
  AND reporter_id = auth.uid()
  AND status = 'pending'
);

CREATE POLICY "Users read own reports"
ON public.reports FOR SELECT
TO authenticated
USING (reporter_id = auth.uid());

CREATE POLICY "Admins manage all reports"
ON public.reports FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ============================================================
-- 13. REVOKE / GRANT STATEMENTS
-- ============================================================

-- Security definer helper functions (internal use only)
REVOKE ALL ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.owns_business(UUID, UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.business_can_respond_to_reviews(UUID) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.owns_business(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.business_can_respond_to_reviews(UUID) TO authenticated;

-- Public RPC functions
REVOKE ALL ON FUNCTION public.get_business_owner_count(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_business_owner_count(UUID) TO anon, authenticated;

REVOKE ALL ON FUNCTION public.search_businesses(TEXT, TEXT, TEXT, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.search_businesses(TEXT, TEXT, TEXT, INTEGER) TO anon, authenticated;

-- User-facing RPC functions
REVOKE ALL ON FUNCTION public.create_business_and_set_owner(TEXT, UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_business_and_set_owner(TEXT, UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO authenticated;

REVOKE ALL ON FUNCTION public.soft_delete_business(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.soft_delete_business(UUID) TO authenticated;

REVOKE ALL ON FUNCTION public.soft_delete_review(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.soft_delete_review(UUID) TO authenticated;

REVOKE ALL ON FUNCTION public.soft_delete_listing(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.soft_delete_listing(UUID) TO authenticated;

REVOKE ALL ON FUNCTION public.soft_delete_deal(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.soft_delete_deal(UUID) TO authenticated;

REVOKE ALL ON FUNCTION public.soft_delete_event(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.soft_delete_event(UUID) TO authenticated;

REVOKE ALL ON FUNCTION public.link_stripe_customer(UUID, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.link_stripe_customer(UUID, TEXT) TO authenticated;

-- Stripe sync (service role only)
REVOKE ALL ON FUNCTION public.sync_stripe_subscription(TEXT, TEXT, public.subscription_tier, public.subscription_status, TIMESTAMPTZ, TIMESTAMPTZ) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.sync_stripe_subscription(TEXT, TEXT, public.subscription_tier, public.subscription_status, TIMESTAMPTZ, TIMESTAMPTZ) TO service_role;