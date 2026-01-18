-- Add INSERT policy for profiles table to allow users to create their own profile during registration
-- The WITH CHECK ensures users can only create a profile with their own auth.uid()

CREATE POLICY "Users create own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());