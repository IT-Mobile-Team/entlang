# Architecture

How the parts of Entlang fit together. Keep this short and current. Details belong in the app READMEs.

## Components

| Component | Path | Purpose |
| --- | --- | --- |
| API | `apps/api/` | NestJS REST API, Swagger UI at `/api` |
| Mobile app | `apps/mobile/` | React Native / Expo (planned, ENT-17) |
| Infrastructure | `infrastructure/` | Docker image and Compose setup |

## Data model

See the ER diagram: [`diagrams/database/er-diagram.excalidraw.svg`](diagrams/database/er-diagram.excalidraw.svg)

## Main flows

_To be filled as features land (e.g. authentication with ENT-20)._
