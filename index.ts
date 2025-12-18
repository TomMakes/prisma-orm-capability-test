import { type Building, type Container } from './generated/prisma';
import { createContainer, createItem, createWallsOfRecRoom, deleteContainer, getShelfOfContainer, type OrgData } from './utils/dal';
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
  } catch (error: any) {
    console.log('The fail floor has failed to create.')
    console.log(error?.message ?? error);
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
  // This tests: Fetching data from one table 
  const northWallFloor = await getShelfOfContainer(northWall.data, 'Floor');
  if (!northWallFloor) {
    throwError('locate', "North Wall Floor");
    return;
  }
  // This tests: Attempting to fetch non-existent data
  const falseWallShelf = await getShelfOfContainer(northWall.data, 'Shelf Invalid');
  if (!falseWallShelf) {
    console.log("locate for model False wall shelf failed")
  }
  // create a 2 tier shelf (container with 2 shelves)
  // against the north wall (container, with one shelf)
  const twoTierShelf: OrgData<Container> = { name: "Two Tier Shelf" };
  twoTierShelf.data = await createContainer(
    { shelf: northWallFloor, room: garage },
    twoTierShelf.name,
    2
  );
  // console.log(twoTierShelf.data);
  // get second shelf of 2 tier shelf
  const secondShelf = await getShelfOfContainer(twoTierShelf.data, 'Shelf 2');

  // Create a box (container, with one shelf)
  const poolToyBox: OrgData<Container> = {
    name: "Pool toy box"
  };
  poolToyBox.data = await createContainer(
    { shelf: secondShelf, room: garage },
    poolToyBox.name,
    1
  );
  console.log(poolToyBox.data)
  const poolToyInside = await getShelfOfContainer( poolToyBox.data, 'Shelf 1');

  // the contents of the box are:
  //  - air pump
  //  - fun noodle
  //  - basketball
  const airPumpItem = await createItem(
    { shelf: poolToyInside },
    'Air Pump'
  );
  const funNoodleItem = await createItem(
    { shelf: poolToyInside },
    'Fun Noodle'
  );
  const basketballItem = await createItem(
    { shelf: poolToyInside },
    'Basketball'
  );
  console.log('Created pool toy box contents!');
  // Move air pump to North wall floor
  // This tests: Updating single property
  // This tests: Updating foreign key ref in data
  const movedBasketball = await prisma.item.update({
    where: {
      id: basketballItem.id
    },
    data: {
      shelfId: northWallFloor.id
    }
  });
  // Loan out air pump
  // This tests: Updating multiple properties 
  const loanedAirPump = await prisma.item.update({
    where: {
      id: airPumpItem.id
    },
    data: {
      shelfId: null,
      isLoaned: true
    }
  });
  // Delete the fun noodle
  // This tests: Deleting data from single table
  const deletedFunNoodle = await prisma.item.delete({
    where: {
      id: funNoodleItem.id
    }
  });
  // Fail to delete 2 tier shelf
  // This tests: Fail to delete item with foreign key dependencies
  try {
    const deleted2TierShelf = await prisma.container.delete({
      where: {
        id: twoTierShelf.data.id
      }
    });
  } catch (error: any) {
    console.log('The 2 tier shelf has failed to delete')
    console.log(error?.message ?? error);
  }
  // Delete 2 tier shelf (container) + shelves
  // *Note: In production, any container with items inside should not be able to be deleted
  // This tests: Deleting data in multiple tables in single transaction
  const deleted2TierShelf = await deleteContainer(twoTierShelf.data);
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
