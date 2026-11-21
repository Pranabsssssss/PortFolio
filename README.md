# Pranab Saini Portfolio

Next.js portfolio deployed to Cloudflare Workers with the OpenNext Cloudflare adapter.

## Development

```bash
npm install
npm run dev
```

## Preview the Cloudflare build

```bash
npm run preview
```

## Deploy

Authenticate Wrangler with `npx wrangler login`, then run:

```bash
npm run deploy
```

The deployment target is Cloudflare Workers. OpenNext's Cloudflare adapter runs the Next.js server and route handlers on Workers; Cloudflare Pages is intended for static Next.js exports.

Set any required runtime secrets in the Cloudflare dashboard or with Wrangler. Do not commit credentials or local `.env` files.
