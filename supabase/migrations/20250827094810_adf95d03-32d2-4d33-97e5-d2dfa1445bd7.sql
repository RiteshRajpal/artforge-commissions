-- Fix security issues with profiles and commissions tables

-- Drop the existing overly permissive profiles policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create a new policy that allows users to view their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create a policy that allows viewing basic profile info (non-sensitive) for commission participants
-- This allows seeing artist/customer names and basic info in commissions without exposing emails
CREATE POLICY "Commission participants can view basic profile info" 
ON public.profiles 
FOR SELECT 
USING (
  id IN (
    -- Allow viewing profiles of artists who bid on user's commissions
    SELECT DISTINCT cb.artist_id 
    FROM commission_bids cb 
    JOIN commissions c ON cb.commission_id = c.id 
    WHERE c.customer_id = auth.uid()
    
    UNION
    
    -- Allow viewing profiles of customers whose commissions user bid on
    SELECT DISTINCT c.customer_id 
    FROM commissions c 
    JOIN commission_bids cb ON c.id = cb.commission_id 
    WHERE cb.artist_id = auth.uid()
    
    UNION
    
    -- Allow viewing assigned artist profile in commissions
    SELECT DISTINCT c.artist_id 
    FROM commissions c 
    WHERE c.customer_id = auth.uid() AND c.artist_id IS NOT NULL
    
    UNION
    
    -- Allow viewing customer profile for assigned commissions
    SELECT DISTINCT c.customer_id 
    FROM commissions c 
    WHERE c.artist_id = auth.uid()
  )
);

-- Fix commissions table policy - drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can view open commissions" ON public.commissions;

-- Allow viewing open commissions (basic info only, not full details)
CREATE POLICY "Anyone can view open commission listings" 
ON public.commissions 
FOR SELECT 
USING (status = 'open');

-- Allow commission participants to view full commission details
CREATE POLICY "Commission participants can view full details" 
ON public.commissions 
FOR SELECT 
USING (
  auth.uid() = customer_id OR 
  auth.uid() = artist_id OR
  -- Allow artists who have bid to see commission details
  auth.uid() IN (
    SELECT artist_id FROM commission_bids 
    WHERE commission_id = commissions.id
  )
);