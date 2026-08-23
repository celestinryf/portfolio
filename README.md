# Portfolio, Celestin Ryf

Personal portfolio site. Work history, project case studies, and contact.

Live: https://portfolio-gules-zeta-88.vercel.app

## Stack

- [Next.js 15](https://nextjs.org) (App Router) with Turbopack
- React 19 and TypeScript
- Tailwind CSS 3
- Framer Motion and GSAP for animation
- lucide-react for icons
- Deployed on Vercel

## Getting started

Needs Node 18.18 or newer. The app lives in `client/`, not the repo root.

```bash
cd client
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

Run these from `client/`.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with Turbopack and hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build (run `build` first) |
| `npm run lint` | ESLint |

There is no test suite yet.

## Layout

```
client/src/app/
  layout.tsx              Root layout: topbar, dark mode toggle, footer
  page.tsx                Landing page
  globals.css             Tailwind entry and global styles
  (pages)/                Routes: about, contact, work, and one folder per case study
  components/
    layout/               Topbar, Footer, Layout
    sections/             Hero, About, Experience
    shared/               Reusable pieces (BigName, MagneticButton, ProjectNav, ...)
    LightDark.tsx         Dark mode toggle
  data/projects.ts        Every project, in one place
  hooks/useReveal.ts      Scroll reveal hook
  utils/                  Helpers
client/public/assets/     Images
```

## Adding a project

Project content is centralized, so a new project is two steps:

1. Add an entry to the `PROJECTS` array in `client/src/app/data/projects.ts`. It must match the `Project` interface at the top of that file: `id`, `title`, `category`, `description`, `image`, `tags`, `year`, `slug`.
2. Create a matching route folder at `client/src/app/(pages)/<slug>/` for the case study page. The folder name must equal the `slug`.

Drop images in `client/public/assets/` and reference them from `image` with a leading slash, for example `/assets/mock.png`.

## Deployment

Hosted on Vercel. The Vercel project's root directory is `client/`, since that is where `package.json` lives.

## License

MIT. See [LICENSE](LICENSE).
