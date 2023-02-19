const { PrismaClient } = require('@prisma/client')
const { user, client, model, contract, job } = require('./data.js')
const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.session.deleteMany();
    console.log('Deleted all sessions in session table');

    await prisma.account.deleteMany();
    console.log('Deleted all account data in account table');

    await prisma.verificationToken.deleteMany();
    console.log('Deleted all verification token data in table');

    await prisma.model.deleteMany();
    console.log('Deleted all models in model table');

    await prisma.client.deleteMany();
    console.log('Deleted all clients in client table');

    await prisma.user.deleteMany();
    console.log('Deleted all users in users table');

    await prisma.job.deleteMany();
    console.log('Deleted all jobs in jobs table');

    await prisma.contract.deleteMany();
    console.log('Deleted all contracted models in table');

    await prisma.history.deleteMany();
    console.log('Deleted all model history data in table');

    await prisma.media.deleteMany();
    console.log('Deleted all media in media table');

    await prisma.job.deleteMany();
    console.log('Deleted all jobs in jobs table');


    // await prisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`;
    // console.log('reset user auto increment to 1');

    // await prisma.$queryRaw`ALTER TABLE Model AUTO_INCREMENT = 1`;
    // console.log('reset model auto increment to 1');

    // await prisma.$queryRaw`ALTER TABLE Client AUTO_INCREMENT = 1`;
    // console.log('reset client auto increment to 1');

    // await prisma.$queryRaw`ALTER TABLE History AUTO_INCREMENT = 1`;
    // console.log('reset model history auto increment to 1');

    // await prisma.$queryRaw`ALTER TABLE Job AUTO_INCREMENT = 1`;
    // console.log('reset jobs auto increment to 1');

    // await prisma.$queryRaw`ALTER TABLE Media AUTO_INCREMENT = 1`;
    // console.log('reset media auto increment to 1');

    // await prisma.$queryRaw`ALTER TABLE Contract AUTO_INCREMENT = 1`;
    // console.log('reset contract auto increment to 1');



    // create many
    const createdUsers = await prisma.user.createMany({
      data: user,
    });
    console.log('Added users data', createdUsers);

    const users = await prisma.user.findMany();

    await prisma.client.createMany({
      data: client(users[0], users[1]),
    });
    console.log('Added client data');

    await prisma.model.createMany({
      data: model(users[2], users[3]),
    });
    console.log('Added model data');

    const createdClient = await prisma.client.findFirst();
    const createdModel = await prisma.model.findFirst();
    await prisma.contract.createMany({
      data: contract(createdClient, createdModel),
    });
    console.log('Added contract data');

    await prisma.job.createMany({
      data: job(createdClient),
    });
    console.log('Added job data');

  }  catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}
load()