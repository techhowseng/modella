// const { PrismaClient } = require('@prisma/client')
// const { categories, products } = require('./data.js')
// const prisma = new PrismaClient()

// const load = async () => {
//   try {
//     await prisma.session.deleteMany();
//     console.log('Deleted all sessions in session table');

//     await prisma.account.deleteMany();
//     console.log('Deleted all account data in account table');

//     await prisma.verificationToken.deleteMany();
//     console.log('Deleted all verification token data in table');

//     await prisma.user.deleteMany();
//     console.log('Deleted all users in users table');

//     await prisma.model.deleteMany();
//     console.log('Deleted all models in model table');

//     await prisma.client.deleteMany();
//     console.log('Deleted all clients in client table');

//     await prisma.clientJobs.deleteMany();
//     console.log('Deleted all jobs in jobs table');

//     await prisma.contractedModel.deleteMany();
//     console.log('Deleted all contracted models in table');

//     await prisma.modelHistory.deleteMany();
//     console.log('Deleted all model history data in table');

//     await prisma.media.deleteMany();
//     console.log('Deleted all media in media table');

//     await prisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`;
//     console.log('reset user auto increment to 1');

//     await prisma.$queryRaw`ALTER TABLE Model AUTO_INCREMENT = 1`;
//     console.log('reset model auto increment to 1');

//     await prisma.$queryRaw`ALTER TABLE Client AUTO_INCREMENT = 1`;
//     console.log('reset client auto increment to 1');

//     await prisma.$queryRaw`ALTER TABLE ModelHistory AUTO_INCREMENT = 1`;
//     console.log('reset model history auto increment to 1');

//     await prisma.$queryRaw`ALTER TABLE ClientJobs AUTO_INCREMENT = 1`;
//     console.log('reset client jobs auto increment to 1');

//     await prisma.$queryRaw`ALTER TABLE VerificationToken AUTO_INCREMENT = 1`;
//     console.log('reset verification token auto increment to 1');

//     // create many
//     await prisma.model.createMany({
//       data: products,
//     });
//     await prisma.model.createMany({
//       data: products,
//     });
//     await prisma.account.createMany({
//       data: products,
//     });
//     const createdUsers = await prisma.user.createMany({
//       data: categories,
//     });
//     console.log('Added users data');

//     await prisma.model.createMany({
//       data: products,
//     });

//     await prisma.client.createMany({
//       data: categories,
//     });
//     console.log('Added client data');

//     await prisma.clientJobs.createMany({
//       data: products,
//     });

//     await prisma.contractedModel.createMany({
//       data: categories,
//     });
//     console.log('Added category data');

//     await prisma.modelHistory.createMany({
//       data: products,
//     });
//     console.log('Added product data');

//     await prisma.product.createMany({
//       data: products,
//     });
//     console.log('Added product data');

//     await prisma.product.createMany({
//       data: products,
//     });
//     console.log('Added product data');

//     await prisma.product.createMany({
//       data: products,
//     });
//     console.log('Added product data');

//     await prisma.product.createMany({
//       data: products,
//     });
//     console.log('Added product data');

//   }  catch (e) {
//     console.error(e)
//     process.exit(1)
//   } finally {
//     await prisma.$disconnect()
//   }
// }
// load()