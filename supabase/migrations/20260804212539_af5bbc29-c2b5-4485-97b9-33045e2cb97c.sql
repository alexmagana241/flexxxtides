CREATE TABLE public.contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  organization text,
  inquiry_type text NOT NULL DEFAULT 'general',
  message text NOT NULL,
  source text NOT NULL DEFAULT 'contact_form',
  transcript text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.contact_inquiries TO service_role;

ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public access to inquiries"
  ON public.contact_inquiries
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

CREATE INDEX contact_inquiries_created_at_idx ON public.contact_inquiries (created_at DESC);