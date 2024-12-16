import { Injectable } from '@nestjs/common';
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
      return "invalid data";
    }
  }

  findAll() {
    return this.db.kid.findMany({
      include: {
        toys: true
      }
    });
  }

  findOne(id: number) {
    if (id == undefined || id == null || isNaN(id)) {
      return "invalid id";
    }
    return this.db.kid.findUnique({
      where: { id },
      include: {
        toys: true
      }
    });
  }

  addtoy(kidid: number, toyid: number) {
    if (kidid == undefined || kidid == null || isNaN(kidid) || toyid == undefined || toyid == null || isNaN(toyid)) {
      return "invalid ids";
    }
    try {
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
    } catch (error) {
      return "couldnt add toy"
    }
  }

  removetoy(kidid: number, toyid: number) {
    if (kidid == undefined || kidid == null || isNaN(kidid) || toyid == undefined || toyid == null || isNaN(toyid)) {
      return "invalid ids";
    }
    try {
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
      return "couldnt remove toy"
    }
  }

  update(id: number, updateKidDto: UpdateKidDto) {
    if (id == undefined || id == null || isNaN(id)) {
      return "invalid id";
    }
    try {
      if (updateKidDto.isgood == false) {
        this.db.kid.update({
          where: { id },
          data: {
            toys: {
              disconnect: []
            }
          }
        })
      }
      return this.db.kid.update({
        where: { id },
        data: updateKidDto,
        include: {
          toys: true
        }
      });
    } catch (error) {
      return "invalid data";
    }
  }

  remove(id: number) {
    if (id == undefined || id == null || isNaN(id)) {
      return "invalid id";
    }
    return this.db.kid.delete({
      where: { id },
    });
  }
}
