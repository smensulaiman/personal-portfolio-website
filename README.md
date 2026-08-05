# Personal Portfolio

The personal portfolio site of MD. Sulaiman — a single-page public portfolio backed by a database and an admin panel, so the content is edited through the browser rather than by redeploying.

Built on Laravel 13 with an Inertia + React front end.

## Stack

| Layer    | Choice                                              |
| -------- | --------------------------------------------------- |
| Backend  | PHP 8.3, Laravel 13, Fortify (auth)                 |
| Frontend | Inertia 3, React 19, TypeScript, Tailwind CSS 4     |
| UI       | Radix primitives, Lucide icons, Sonner toasts       |
| Build    | Vite 8, Wayfinder (typed routes)                    |
| Quality  | Pint, PHPStan (Larastan), ESLint, Prettier, PHPUnit |

## Features

**Public site** (`/`) — one page assembled from the database: profile and headline, skills grouped by category, work experience with highlights, projects, education, and certifications.

**Admin panel** (`/admin`, auth required) — full CRUD over every section of the public page:

- Profile details and summary
- Skill categories and the skills inside them
- Experience entries with per-role highlight lists
- Projects, including drag-to-reorder
- Education and certifications
- A contact message inbox with read/unread state

> The inbox and its `contact_messages` table are in place on the admin side, but no public submission endpoint is wired up yet — nothing writes to it from the portfolio page.

The app also carries the teams, settings, and account-security screens from the Laravel React starter kit it was scaffolded from.

## Requirements

- PHP 8.3+ and Composer
- Node — `.nvmrc` pins 23, CI builds on 22
- SQLite by default — MySQL or Postgres work by changing `DB_*` in `.env`

## Getting started

```bash
git clone https://github.com/smensulaiman/personal-portfolio-website.git
cd personal-portfolio-website

composer setup      # install deps, create .env, generate key, migrate, build assets
php artisan db:seed # create the admin user and load the portfolio content
composer dev        # serve + queue worker + vite, all at once
```

The site is then at http://localhost:8000 and the admin panel at http://localhost:8000/admin.

### Admin credentials

The seeder creates one user from `config/portfolio.php`, which reads these env vars:

```dotenv
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=change-me
```

Set both in `.env` **before** running `db:seed`. The defaults are placeholders — change them for anything beyond local development.

### Content

`database/seeders/PortfolioSeeder.php` holds the initial profile, experience, project, education, and certification records. It uses `updateOrCreate` throughout, so re-running it refreshes seeded content in place without duplicating rows — but it will also overwrite edits you made in the admin panel to those same records.

## Development

```bash
composer dev          # dev server, queue listener and vite together
composer test         # pint --test, phpstan, then artisan test
composer lint         # pint --parallel (fixes)
composer ci:check     # everything CI runs: eslint, prettier, tsc, and composer test

npm run dev           # vite only
npm run build         # production assets
npm run build:ssr     # production assets with SSR bundle
npm run types:check   # tsc --noEmit
```

`.github/workflows/tests.yml` runs `composer setup` then `composer ci:check` on pushes to `main` and on every pull request.

## Layout

```
app/Http/Controllers/
  PortfolioController.php   single public page
  Admin/                    one controller per content type
app/Models/                 Profile, Experience, Project, Skill, Education, …
routes/
  web.php                   public + team routes
  admin.php                 /admin (auth + verified)
  settings.php              account settings
resources/js/pages/
  portfolio.tsx             the public page
  admin/                    admin screens
database/seeders/
  PortfolioSeeder.php       portfolio content
  DatabaseSeeder.php        admin user, then the above
```

Note that `admin.php` is required *before* the team routes in `web.php` on purpose — the `{current_team}` wildcard would otherwise swallow `/admin/...` and fail with a 403.
