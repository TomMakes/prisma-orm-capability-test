# Purpose
This repo is a guide for using [Prisma](https://www.prisma.io/).

I want to be sure Prisma supports the various capabilities I want it to have if I use it for a project.
This repo tests those capabilities so I have a point of reference, and a bare bones project for future testing.

# Useful links for Prisma
- [A quickstart guide on Prisma](https://www.prisma.io/docs/getting-started/quickstart-sqlite), uses SQLite and Typescript, and it easy to follow.
- [Documentation for Prisma ORM](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma) - Info on [Schema](https://www.prisma.io/docs/orm/prisma-schema/overview) creation and [CRUD](https://www.prisma.io/docs/orm/prisma-client/queries/crud) can be found here
- [A guide on integrating Prisma into a Bun program](https://www.prisma.io/docs/guides/bun)

# To test prisma: 
I'm running/building index.ts to make calls to build up and manipulate the data in the desired manner.

My test data will be pool toys in a box on a shelf in the garage of the tester residence.

# To run the program
1. Install node (This project was tested on version 24.6.0)
1. Open terminal inside repo folder
1. Run command `npm ci` to install packages
1. Copy env.txt and rename file .env
1. Set DATABASE_URL to desired database location 
1. Run command `npm run migrate` to build up SQLite database inside repo.
1. Run command `npm run start` to create the database data.

# Features I want to test are:
## Create:
- (Done) Saving data into one table 
- (Done) Saving data into multiple tables
- (Done) Attempting and failing to save invalid data. 
## Read: 
- (Done) Fetching data from one table 
- (Done) Attempting to fetch non-existent data 
- (Done) Fetching data with related data from another table 
## Update: 
- (Done) Updating single property 
- (Done) Updating multiple properties 
- (Done) Updating foreign key ref in data
## Delete: 
- (Done) Deleting data from single table 
- (Done) Fail to delete item with foreign key dependencies
- (Done) Deleting data in multiple tables in single transaction

# Project File Structure

## Root Files
- **`index.ts`** - Main entry point that demonstrates all Prisma CRUD operations with test data (pool toys in a box)
- **`package.json`** - Node.js project configuration with scripts for migration, running, and debugging
- **`tsconfig.json`** - TypeScript compiler configuration
- **`prisma.config.ts`** - Prisma configuration file that defines schema path, migrations path, and datasource
- **`env.txt`** - Template for environment variables (copy to `.env` and configure `DATABASE_URL`)
- **`README.md`** - This file, project documentation

## Directories

### `prisma/`
Prisma-related files and database migrations
- **`schema.prisma`** - Database schema definition with models (Building, Floor, Room, Container, Shelf, Item)
- **`migrations/`** - Database migration history
  - **`migration_lock.toml`** - Migration lock file
  - **`20251022165354_init/migration.sql`** - Initial migration SQL

### `utils/`
Utility functions and singleton instances
- **`dal.ts`** - Data Access Layer with helper functions for CRUD operations (e.g., `createContainer`, `createItem`, `createWallsOfRecRoom`)
- **`singletons.ts`** - Singleton objects, primarily the Prisma Client instance with SQLite adapter configuration

### `db/`
SQLite database files (created after running migrations)

### `generated/` _(ignored)_
Auto-generated Prisma Client code (regenerated when schema changes)

# TODO 
- None at this time
