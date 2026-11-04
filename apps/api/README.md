# entlang API

NestJS API for entlang.

## Prerequisites

- Node.js 24 or a compatible version supported by the installed dependencies
- npm

## Setup

Install dependencies:

```bash
npm install
```

Start the API in development watch mode:

```bash
npm run start:dev
```

## Production

Build the API:

```bash
npm run build
```

Run the production build:

```bash
npm run start:prod
```

## Code quality

Check lint rules:

```bash
npm run lint
```

Apply automatic lint fixes:

```bash
npm run lint:fix
```

Format source files or check their formatting:

```bash
npm run format
npm run format:check
```

## Unit tests

Run unit tests once:

```bash
npm test
```

Use `npm run test:watch` during development when watch mode is useful.

E2E testing is not currently configured.

## Configuration

- `nest-cli.json` configures Nest CLI builds.
- `tsconfig.json` contains the shared TypeScript compiler settings.
- `tsconfig.build.json` narrows TypeScript settings for production builds.
- `eslint.config.mjs` contains type-aware ESLint checks.
- `.prettierrc` is the source of truth for deterministic formatting.
- `vitest.config.ts` configures unit tests.
