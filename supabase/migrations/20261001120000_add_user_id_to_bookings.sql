ALTER TABLE public.bookings ADD COLUMN user_id UUID REFERENCES auth.users(id);

DROP FUNCTION IF EXISTS public.create_guest_booking(UUID, UUID, TEXT, INTEGER);

CREATE OR REPLACE FUNCTION public.create_guest_booking(
  p_venue_id UUID,
  p_slot_id UUID,
  p_player_name TEXT,
  p_team_size INTEGER,
  p_user_id UUID DEFAULT NULL
)
RETURNS TABLE (booking_code TEXT, booking_status TEXT, total_amount NUMERIC)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_slot public.slots%ROWTYPE;
  v_price NUMERIC(10,2);
  v_code TEXT;
BEGIN
  IF length(trim(p_player_name)) < 2 OR p_team_size < 1 OR p_team_size > 22 THEN
    RAISE EXCEPTION 'Invalid booking details';
  END IF;

  SELECT * INTO v_slot FROM public.slots WHERE id = p_slot_id AND venue_id = p_venue_id FOR UPDATE;
  IF NOT FOUND OR v_slot.status = 'booked' OR v_slot.reserved_count >= v_slot.capacity THEN
    RAISE EXCEPTION 'This slot is no longer available';
  END IF;

  SELECT price_per_hour INTO v_price FROM public.venues WHERE id = p_venue_id AND active = true;
  IF v_price IS NULL THEN RAISE EXCEPTION 'Venue unavailable'; END IF;

  v_code := 'TP-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8));
  
  INSERT INTO public.bookings (booking_code, venue_id, slot_id, player_name, team_size, amount, user_id)
  VALUES (v_code, p_venue_id, p_slot_id, trim(p_player_name), p_team_size, v_price * (v_slot.duration_minutes / 60.0), p_user_id);

  UPDATE public.slots
  SET reserved_count = reserved_count + 1,
      status = CASE WHEN reserved_count + 1 >= capacity THEN 'booked' WHEN reserved_count + 1 >= greatest(1, capacity - 1) THEN 'limited' ELSE 'available' END
  WHERE id = p_slot_id;

  RETURN QUERY SELECT v_code, 'confirmed'::TEXT, (v_price * (v_slot.duration_minutes / 60.0))::NUMERIC;
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_guest_booking(UUID, UUID, TEXT, INTEGER, UUID) TO anon, authenticated;
