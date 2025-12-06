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
- Fetching data from one table 
- Attempting to fetch non-existent data 
- (Done) Fetching data with related data from another table 
## Update: 
- Updating single property 
- Updating multiple properties 
- Updating property with invalid type 
- Updating foreign key ref in data
## Delete: 
- Deleting data from single table 
- Deleting data in multiple tables in single transaction

# TODO 
- Organize code so there is a little more abstraction between the calls to manipulate data, and the prisma code needed to make it happen. This will make it easier to follow and reference the example code later.
- Add a section here on file structure and what files are for what.
