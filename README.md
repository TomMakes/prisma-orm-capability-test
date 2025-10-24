# Purpose
This repo is a guide for using [Prisma](https://www.prisma.io/).

I want to be sure Prisma supports the various capabilities I want it to have if I use it for a project.
This repo tests those capabilities so I have a point of reference, and a barebones project for future testing.

# Useful links for Prisma
- [A quickstart guide on Prisma](https://www.prisma.io/docs/getting-started/quickstart-sqlite), uses SQLite and Typescript, and it easy to follow.
- [Documentation for Prisma ORM](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma) - Info on [Schema](https://www.prisma.io/docs/orm/prisma-schema/overview) creation and [CRUD](https://www.prisma.io/docs/orm/prisma-client/queries/crud) can be found here
- [A guide on integrating Prisma into a Bun program](https://www.prisma.io/docs/guides/bun)

# To test prisma I'm using: 
A script to make calls to build up and manipulate the data in the desired manner.

# To run the program
TODO: Test the running steps to ensure I'm not missing steps.
1. Install node
1. Open terminal inside repo folder
1. Run command `npm ci` to install packages
1. Copy env.txt and rename file .env
1. Set DATABASE_URL to desired database location 
1. Run command `npm run migrate` to build up SQLite database inside repo.
1. Run command `npm run start` to create the database data.

# Features I want to test are:
## Create: 
- Saving data into one table 
- attempting and failing to save invalid data. 
## Read: 
- Fetching data from one table 
- Attempting to fetch non-existent data 
- Fetching data with related data from another table 
- Update: 
- Updating single property 
- Updating multiple properties 
- Updating property with invalid type 
- Updating foreign key ref in data
## Delete: 
- Deleting data from single table 
- Deleting data in multiple tables in single transaction

My test data will be pool toys in a box on a shelf in the garage of the tester residence.

# TODO 
- Remove bun? I don't think I use it at all.
- Organize code so there is a little more abstraction between the calls to manipulate data, and the prisma code needed to make it happen. This will make it easier to follow and reference the example code later.
- Add a section here on file structure and what files are for what.
