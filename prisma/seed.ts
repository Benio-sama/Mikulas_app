import { Material, PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient()
async function main() {

    for (let i = 0; i < 10; i++) {
        let seged2: number = Math.floor(Math.random() * 100);
        await prisma.toy.create({
            data: {
                name: "toy" + i,
                material: faker.helpers.arrayElement(Object.values(Material)),
                weight: seged2
            }
        })
    }

    for (let i = 0; i < 10; i++) {
        let seged: number = Math.round(Math.random());
        await prisma.kid.create({
            data: {
                name: faker.person.firstName(),
                country: faker.commerce.department(),
                address: "address" + i,
                isgood: (seged == 0) ? false : true,
            }
        })
    }

    /*await prisma.kid.update({
        where: {
            id: 4
        },
        data: {
            toys: {
                connect: [
                    { id: 2 },
                    { id: 3 },
                    { id: 4 },
                    { id: 4 },
                    { id: 5 }
                ]
            }
        }
    })*/
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