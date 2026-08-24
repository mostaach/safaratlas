# SafarAtlas deployment checklist

## Required before deploying

1. Run `supabase-schema.sql` in the intended Supabase project.
2. Set these production environment variables in the hosting provider—not in Git:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `EMAIL_FROM` (a Resend-verified sender)
   - `ADMIN_EMAIL`
   - `ADMIN_API_TOKEN` (a unique random value of at least 32 bytes)
   - `NEXT_PUBLIC_SITE_URL` (the canonical HTTPS URL, with no trailing slash)
3. Run `npm run test:supabase`, then `npm run lint` and `npm run build`.
4. Deploy and submit one real test inquiry and one partner application. Confirm each is stored in Supabase and the lead email reaches `ADMIN_EMAIL`.
5. Configure platform-level rate limiting/WAF for `/api/leads` and `/api/partner-applications`.

## Operational behavior

- Customer leads and partner applications require Supabase. The app responds with `503` rather than accepting data that cannot be stored.
- There is no waitlist or first-party analytics endpoint.
- The admin dashboard is protected by `ADMIN_API_TOKEN`; use HTTPS and do not share this token.
