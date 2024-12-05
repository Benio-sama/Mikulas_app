import { Material, PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient()
async function main() {

    for (let i = 0; i < 10; i++) {
        let seged: number = Math.floor(Math.random() * 5);
        let seged2: number = Math.floor(Math.random() * 100) + 1;
        await prisma.toy.create({
            data: {
                name: "toy" + i,
                material: faker.helpers.arrayElement(Object.values(Material)),
                weight: seged2
            }
        })
    }

    for (let i = 0; i < 10; i++) {
        await prisma.kid.create({
            data: {
                name: faker.person.firstName

            }
        })
    }
}



main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })