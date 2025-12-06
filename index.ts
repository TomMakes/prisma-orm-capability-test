import { type Building, type Container } from './generated/prisma';
import { createWallsOfRecRoom, type OrgData } from './utils/dal';
import { prisma } from './utils/singletons';

async function main() {
  const invalidId = -1;
  // Create tester residence which has a ground floor
  // This tests: Saving data into multiple tables
  const testerHouse: OrgData<Building> = {
    name: 'Tester Residence'
  };
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
  // This tests: Fetching data with related data from another table 
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
  console.log(`Created ${groundFloor.name} of ${testerHouse.name}, as well as the residence.`);
  // Create garage, with 4 walls, located on ground floor
  // This tests: Saving data into one table
  const garage = await prisma.room.create({
    data: {
      name: 'Garage',
      floorId: groundFloor.id,
      containers: {
      },
    },
  });
  // Attempt to create a Room with an invalid floor id
  // This tests: Attempting and failing to save invalid data. 
  try {
    await prisma.room.create({
      data: {
        name: 'Garage',
        floorId: invalidId,
        containers: {
        },
      },
    });
  } catch (error) {
    console.log('The fail floor has failed to create.')
    console.log(error);
  }
  console.log(garage);
  // Create walls (containers), with one shelf each
  const garageWalls = await createWallsOfRecRoom(garage);
  const northWall = garageWalls.find((wall) => wall.name == "North Wall")
  console.log(`Created ${garage.name} with ${garageWalls.length} walls, one of them being the ${northWall?.name}.`);
  if (!northWall?.data) {
    throwError('locate', "North Wall");
    return;
  }
  // Next up: create a box (container, with one shelf)
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
