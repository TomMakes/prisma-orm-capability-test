/** This file stores all singleton objects */

import { PrismaClient } from "../generated/prisma";

// TODO: Ensure this actually builds up the client correctly. I'll know once it's ran the first time.
export const prisma = new PrismaClient();