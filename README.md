# Entlang

Planning, tickets and team how-tos: [Linear, project "Entlang"](https://linear.app/it-mobile-team/document/home-e0bbfef4d548).
Rules for AI agents and where docs go: [`AGENTS.md`](AGENTS.md).

## Quick setup

How to set up the repo to start developing (backend only for now).

### Prerequisites

| Tool | Required? | Notes |
| --- | --- | --- |
| Node.js | Yes (for local development) | Version is pinned in `.nvmrc`. With nvm: `nvm install && nvm use` in the repo root. |
| Docker + Docker Compose v2 | Yes (for the database) | Runs PostgreSQL and optionally the backend. Check with `docker compose version`. |
| Postman | Optional | For API requests and flows. See "How to use Postman" in Linear. |

**Windows:** the repo contains symlinks (`.claude/skills`, `.github/skills`). Enable Developer Mode and run
`git config --global core.symlinks true` before cloning, otherwise they are checked out as plain text files.

### Local setup (backend)

Run the API directly with Node.js. This is the fastest way to develop (hot reload).

```bash
cd apps/api
npm ci
cp .env.example .env   # then adjust values
npm run start:dev
```

- Use `npm ci` (not `npm i`) to install exactly the versions from `package-lock.json`.
  Only use `npm i <package>` when you add a new dependency.
- `.env` is gitignored. Never commit it.
- When you add a new environment variable, also add it to `.env.example` with a safe placeholder value
  and to the table below.
- Environment variables are loaded via `@nestjs/config`. Real environment variables (e.g. from Docker Compose)
  take precedence over `.env`.
- `npm ci` also sets up the shared git hooks (`prepare` script sets `core.hooksPath` to `.githooks`).
  Before every commit that touches `apps/api/`, lint and format check run automatically.
  Skip them in an emergency with `git commit --no-verify`.
- All available scripts are in `apps/api/package.json`.

#### Environment variables (`apps/api/.env`)

| Variable | Example | Description |
| --- | --- | --- |
| `PORT` | `3001` | Port the API listens on. Falls back to `3000` if not set. |

### Docker Compose

Runs the database and the backend in containers.

```bash
cd infrastructure
cp .env.example .env   # then adjust values
docker compose up --build -d
```

Services (ports, images and volumes: see `infrastructure/compose.yaml`):

- `db`: PostgreSQL. Data is kept in the `postgres_data` volume.
- `backend`: the NestJS API, built from `infrastructure/Dockerfile` with the repo root as build context.
  Reachable at `http://localhost:<BACKEND_PORT>`.

#### Environment variables (`infrastructure/.env`)

| Variable | Example | Description |
| --- | --- | --- |
| `DB_PASSWORD` | `example` | Password for the `postgres` user. |
| `BACKEND_PORT` | `3001` | Host port for the API. |

`infrastructure/.env` is gitignored, too. `.env` files, `node_modules`, `dist` and `.git` are never copied
into the Docker image (see `infrastructure/Dockerfile.dockerignore`).

#### Useful commands

Run these inside `infrastructure/`:

```bash
docker compose up --build -d   # build and start everything in the background
docker compose logs -f backend # follow the API logs
docker compose ps              # show running containers
docker compose down            # stop and remove containers (data is kept)
docker compose down -v         # stop and DELETE the database volume (fresh DB)
```

To build only the backend image, run this in the repo root:

```bash
docker build -f infrastructure/Dockerfile -t entlang_backend .
```

### Recommended: only the database in Docker

Run only the database in Docker and the API locally with hot reload:

```bash
cd infrastructure
docker compose up -d db

cd ../apps/api
npm run start:dev
```

The API then reaches the database on `localhost:5432`.

### Check that it works

With the API running, `<PORT>` is `PORT` from `apps/api/.env` locally, or `BACKEND_PORT` with Docker Compose:

- API: `http://localhost:<PORT>/`
- Swagger UI: `http://localhost:<PORT>/api`
- OpenAPI spec: `http://localhost:<PORT>/api-json`

### Before you push

Run the CI checks (see "Checks" in [`AGENTS.md`](AGENTS.md)).
