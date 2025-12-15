/** This file stores all singleton objects */

import 'dotenv/config';
import { PrismaClient } from "../generated/prisma";
import { env } from "prisma/config";
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: env('DATABASE_URL'),
})
/**
 * Prisma Client is a generated database ORM client that's tailored to your database schema.
 * Be sure to run `prisma generate` after any schema change.
 * Documentation: https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/instantiate-prisma-client
 * See also: https://www.prisma.io/docs/orm/reference/prisma-client-reference 
*/
export const prisma = new PrismaClient({
    log: ['info'],
    errorFormat: 'pretty',
    adapter,
 });