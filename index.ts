console.log('Hello via Bun!');

import { PrismaClient, type Building, type Container } from './generated/prisma';

const prisma = new PrismaClient();

interface OrgData<T> {
  name: string,
  data?: T
}

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
        create: [
          {
            name: 'North Wall',
          },
          {
            name: 'East Wall',
          },
          {
            name: 'South Wall',
          },
          {
            name: 'West Wall',
          },
        ],
      },
    },
  });
  console.log(garage);
  const northWall: { name: string, data: any } = {
    name: 'North Wall',
    data: null
  };
  northWall.data = (
    await prisma.room.findUnique({
      where: { id: garage.id },
      include: {  
        containers: true,
      },
    })
  )?.containers.find((container) => container.name === northWall.name);
  // Next up: We need to create the shelves along with the container.
  // I propose we write a new function to do that.
  if (!northWall.data) {
    throwError('locate', northWall.name);
    return;
  }
  console.log(northWall.data);
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
