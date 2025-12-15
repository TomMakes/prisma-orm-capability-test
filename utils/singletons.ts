/** This file stores all singleton objects */

import { PrismaClient } from "../generated/prisma";

/**
 * Prisma Client is a generated database ORM client that's tailored to your database schema.
 * Be sure to run `prisma generate` after any schema change.
 * Documentation: https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/instantiate-prisma-client
 */
export const prisma = new PrismaClient();