/** This file contains functions to assist in CRUD activities */

import type { Container, Room, Shelf } from "../generated/prisma";
import { prisma } from "./singletons";

export interface OrgData<T> {
  name: string,
  data?: T
}

/** Create the 4 walls of a rectangular room */
export async function createWallsOfRecRoom( room: Room ): Promise<OrgData<Container>[]> {
    // Create the individual walls, with 1 shelf for each
    const parents = { room };
    const walls = ['North Wall', 'East Wall', 'South Wall', 'West Wall'];
    
    const wallsToReturn = await Promise.all(
        walls.map(async wallName => {
            const wallData = await createContainer(parents, wallName, 0);
            return { name: wallName, data: wallData };
        })
    );
    
    return wallsToReturn;
}

export async function createContainer(
    parents: { shelf?: Shelf, room: Room },
    name: string, shelfCount: number ): Promise<Container> {
    const shelfNames: { name: string }[] = [];
    for (let i=0; i<=shelfCount; i++) {
        if (i === 0) {
            shelfNames.push({ name: `Floor`});
        } else {
            shelfNames.push({ name: `Shelf ${i}`});
        }
    }
    const container = await prisma.container.create({
        data: {
            name,
            roomId: parents.room.id,
            shelfId: parents?.shelf?.id ?? undefined,
            shelves: {
                create: shelfNames
            }
        }
    });
    return container;
}