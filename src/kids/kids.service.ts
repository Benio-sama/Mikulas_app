import { All, Injectable } from '@nestjs/common';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class KidsService {
  constructor(private db: PrismaService) { }
  create(createKidDto: CreateKidDto) {
    try {
      return this.db.kid.create({
        data: createKidDto,
      });
    } catch (error) {
      return { "statusCode": 406, "message": "invalid data" }
    }
  }

  findAll() {
    return this.db.kid.findMany({
      include: {
        toys: true
      }
    });
  }

  async findOne(id: number) {
    if (id == undefined || id == null || isNaN(id)) {
      return "invalid id";
    }
    const kid = await this.db.kid.findUnique({
      where: { id },
      include: {
        toys: true
      }
    });
    if (kid) {
      return kid;
    } else {
      return { "statusCode": 404, "message": "cannot find kid" }
    }
  }

  async addtoy(kidid: number, toyid: number) {
    if (kidid == undefined || kidid == null || isNaN(kidid) || toyid == undefined || toyid == null || isNaN(toyid)) {
      return "invalid ids";
    }
    try {
      const kid = await this.db.kid.findUnique({
        where: { id: kidid },
      })
      const toy = await this.db.toy.findUnique({
        where: { id: toyid },
      })
      if (!kid) {
        return { "statusCode": 404, "message": "cannot find kid" }
      }
      if (!toy) {
        return { "statusCode": 404, "message": "cannot find toy" }
      }
      if (kid.isgood) {
        return this.db.kid.update({
          where: { id: kidid },
          data: {
            toys: {
              connect: { id: toyid }
            }
          },
          include: {
            toys: true
          }
        })
      } else {
        return { "statusCode": 409, "message": "cant add toy to a bad kid" }
      }
    } catch (error) {
      return { "statusCode": 406, "message": "couldnt add toy" }
    }
  }

  async removetoy(kidid: number, toyid: number) {
    if (kidid == undefined || kidid == null || isNaN(kidid) || toyid == undefined || toyid == null || isNaN(toyid)) {
      return "invalid ids";
    }
    try {
      const kid = await this.db.kid.findUnique({
        where: { id: kidid },
      })
      const toy = await this.db.toy.findUnique({
        where: { id: toyid },
      })
      if (!kid) {
        return { "statusCode": 404, "message": "cannot find kid" }
      }
      if (!toy) {
        return { "statusCode": 404, "message": "cannot find toy" }
      }
      return this.db.kid.update({
        where: { id: kidid },
        data: {
          toys: {
            disconnect: { id: toyid }
          }
        },
        include: {
          toys: true
        }
      })
    } catch (error) {
      return { "statusCode": 406, "message": "couldnt remove toy" }
    }
  }

  async update(id: number, updateKidDto: UpdateKidDto) {
    if (id == undefined || id == null || isNaN(id)) {
      return "invalid id";
    }
    try {
      const kid = await this.db.kid.findUnique({
        where: { id: id },
        include: { toys: true }
      })
      if (!kid) {
        return { "statusCode": 404, "message": "cant find kid" }
      }
      this.db.kid.update({
        where: { id },
        data: updateKidDto,
        include: {
          toys: true
        }
      });
      if (kid.isgood == false) {
        console.log("asd")
        return this.db.kid.update({
          where: { id },
          data: {
            toys: {
              set: []
            }
          },
          include: {
            toys: true
          }
        })
      } else {
        return kid
      }
    } catch (error) {
      return { "statusCode": 406, "message": "invalid data" }
    }
  }

  async remove(id: number) {
    if (id == undefined || id == null || isNaN(id)) {
      return "invalid id";
    }
    const kid = await this.db.kid.findUnique({
      where: { id: id },
    })
    if (kid) {
      return this.db.kid.delete({
        where: { id },
      });
    } else {
      return { "statusCode": 404, "message": "cant find kid" }
    }
  }
}
