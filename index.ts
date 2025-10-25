import { type Building, type Container } from './generated/prisma';
import { createWallsOfRecRoom, type OrgData } from './utils/dal';
import { prisma } from './utils/singletons';

async function main() {
  // Create tester residence which has a ground floor
  const testerHouse: OrgData<Building> = {
    name: 'Tester Residence'
  } ;
  testerHouse.data = await prisma.building.create({
    data: {
      name: 'Tester Residence',
      floors: {
        create: [
          {
            name: 'Ground floor',
          },
        ],
      },
    },
  });
  const groundFloor = (
    await prisma.building.findUnique({
      where: { id: testerHouse.data.id },
      include: {
        floors: true,
      },
    })
  )?.floors[0];
  if (!groundFloor) {
    throwError('locate', 'Ground floor');
    return;
  }
  console.log(groundFloor);
  // Create garage, with 4 walls, located on ground floor
  const garage = await prisma.room.create({
    data: {
      name: 'Garage',
      floorId: groundFloor.id,
      containers: {
      },
    },
  });
  console.log(garage);
  // Create walls (containers), with one shelf each
  const garageWalls = await createWallsOfRecRoom(garage);
  const northWall = garageWalls.find((wall) => wall.name == "North Wall")
  console.log(northWall);
  // Next up: We need to create the shelves along with the container.
  // I propose we write a new function to do that.
  if (!northWall?.data) {
    throwError('locate', "North Wall");
    return;
  }
  console.log(garageWalls);
  // create a box (container, with one shelf)
  // const box: OrgData<Container> = {
  //   name: "Pool toy box"
  // };
  // box.data = prisma.container.create({
  //   data: {
  //     name: box.name,

  //   }
  // });
  // resting on a 2 tier shelf (container with 2 shelves),
  // against the north wall (container, with one shelf)

  // the contents of the box are:
  //  - air pump
  //  - fun noodle
  //  - basketball
  // if (!groundFloor) {
  //     throwError('create', 'Ground floor');
  //     return;
  // }
  // const
}
function throwError(operation: string, object: string) {
  console.log(`${operation} for model ${object} failed, exiting..`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
