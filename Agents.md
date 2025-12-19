# Agent Notes

Audience: AI maintainers (not end users). Goal: fast recall + next steps.

## Project Snapshot
- Purpose: Prisma capability playground (CRUD coverage) using pool-toy domain.
- Entry point: `index.ts` (or `npm run start`). Uses helpers in `utils/dal.ts` and `utils/singletons.ts`.
- ORM: Prisma Client generated to `generated/prisma` (do not edit; regen after schema changes).
- Schema: `prisma/schema.prisma` (models: Building > Floor > Room > Container > Shelf > Item). Migrations live in `prisma/migrations/`.
- Config: `prisma.config.ts` wires schema + migrations + datasource `DATABASE_URL` (SQLite by default). `env.txt` template -> copy to `.env`.
- Scripts: `npm run migrate` (dev migrate), `npm run start` (run index), `npm run debug:watch` (tsx watch), `npm run format`.

## Mental Model of Data Flow
1) `singletons.ts` instantiates Prisma Client with BetterSQLite3 adapter; picks up `DATABASE_URL`.
2) `dal.ts` wraps CRUD helpers (createContainer/createItem/createWallsOfRecRoom/etc.). Returns typed shapes via `OrgData<T>`.
3) `index.ts` orchestrates: builds building/floor/room/walls/shelves/items; exercises read/update/delete paths; expects negative IDs to fail.

## Quick How-Tos
- Run fresh: delete `db/dev.db` if needed; `npm run migrate`; `npm run start`.
- Regenerate client after schema edits: `npx prisma generate` (not scripted—run manually).
- Add schema model: edit `prisma/schema.prisma` -> migrate -> generate.
- Toggle logging: adjust `log` array in `singletons.ts`.

## Pitfalls / Observations
- `generated/` is checked in; avoid manual edits. Node_modules ignored.
- Tests are implicit via running `index.ts`; no dedicated test suite.
- SQLite path is relative; moving repo may need DB cleanup.

## Possible Next Tasks (if asked)
- Add real test harness (vitest/uvu) around DAL functions.
- Add seed script into `prisma/seed.ts` matching domain.
- Parameterize adapters for Postgres (already dep present) via env switch.
- Document schema graphically in README.

## Reminders for Future AI
- Stay ASCII unless file already uses non-ASCII.
- Prefer `apply_patch` for edits; avoid touching generated/ or node_modules.
- If migrations drift, ask before running reset commands.
- Use repo scripts; avoid destructive git commands.
