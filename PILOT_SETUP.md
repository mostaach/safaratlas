# SafarAtlas Marrakech Pilot Setup

## What is implemented

- `POST /api/leads` validates and stores traveler inquiries on the server.
- `/admin` is a token-protected internal lead pipeline.
- Admins can progress lead status and record booking value, commission rate, and expected margin.
- Local lead data is stored in `web/.data/pilot-leads.json`, which is intentionally ignored by Git.

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Set `ADMIN_API_TOKEN` to a long, unique random secret.
3. Run `npm run dev` in `web`.
4. Submit a test inquiry from the site.
5. Open `/admin`, enter the token, and confirm that the lead appears.

## Important deployment constraint

This file-backed store is suitable only for a single self-hosted Node pilot with persistent disk. It is not suitable for Vercel/serverless or a public scale launch because the filesystem is not durable across instances and it does not provide role-based access or audit-grade security.

Before public launch, replace `src/lib/leadStore.ts` with a managed database adapter, add real admin/partner authentication, configure email/WhatsApp delivery, and apply rate limiting plus monitoring.
