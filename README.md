# Pranab Saini — Portfolio

Personal portfolio for **Pranab Saini**, a student tech founder building projects across AI, robotics, and IoT.

The site presents selected projects, project details, achievements, and ways to get in touch. It is built with Next.js and deployed to Cloudflare Workers using the OpenNext Cloudflare adapter.

**Live site:** [www.pranab.space](https://www.pranab.space)

## Features

- Responsive portfolio with project and achievement pages
- Animated interface, smooth scrolling, and interactive visual elements
- Project and achievement content stored in JSON files under `src/data`
- Cloudflare Workers deployment using OpenNext

## Tech stack

- [Next.js](https://nextjs.org/) 16 and React 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://motion.dev/) and [Three.js](https://threejs.org/)
- [OpenNext for Cloudflare](https://opennext.js.org/cloudflare/) and [Wrangler](https://developers.cloudflare.com/workers/wrangler/)

## Run locally

Use Node.js 20.9 or newer.

```bash
git clone https://github.com/Pranabsssssss/PortFolio.git
cd PortFolio
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Edit files in `src/app` and `src/components`; the development server reloads changes automatically.

## Build and preview

Create the production Next.js build:

```bash
npm run build
```

Preview the app using the Cloudflare Workers runtime:

```bash
npm run preview
```

## Deploy to Cloudflare

This app uses the OpenNext adapter for **Cloudflare Workers** to support Next.js server rendering and route handlers. It is not configured as a static Cloudflare Pages export.

For Cloudflare Workers Builds, configure:

| Setting | Command |
| --- | --- |
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx opennextjs-cloudflare deploy` |

To deploy from a local terminal, authenticate Wrangler and run:

```bash
npx wrangler login
npm run deploy
```

The Worker name is `portfolio` (configured in `wrangler.jsonc`). Configure any required secrets in Cloudflare rather than committing them to the repository.

## Project structure

```text
src/
  app/          Next.js routes and layouts
  components/   Shared page and UI components
  data/         Project and achievement content
public/         Static assets
```

## Contact

- Website: [www.pranab.space](https://www.pranab.space)
- Email: [i@pranab.tech](mailto:i@pranab.tech)
- GitHub: [@pranabsssssss](https://github.com/pranabsssssss)
- LinkedIn: [Pranab Saini](https://www.linkedin.com/in/pranab-saini-616386388/)
