import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ToysService {
  constructor(private db: PrismaService) { }

  create(createToyDto: CreateToyDto) {
    try {
      return this.db.toy.create({
        data: createToyDto,
      })
    } catch (error) {
      return { "statusCode": 406, "message": "invalid data" }
    }
  }

  findAll() {
    return this.db.toy.findMany({
      include: {
        kid: true
      }
    });
  }

  async findOne(id: number) {
    if (id == undefined || id == null || isNaN(id)) {
      return "invalid id";
    }
    const toy = await this.db.toy.findUnique({
      where: { id },
      include: {
        kid: true
      }
    });
    if (toy) {
      return toy;
    } else {
      return { "statusCode": 404, "message": "cannot find toy" }
    }
  }

  async update(id: number, updateToyDto: UpdateToyDto) {
    if (id == undefined || id == null || isNaN(id)) {
      return "invalid id";
    }
    try {
      const toy = await this.db.toy.findUnique({
        where: { id },
      })
      if (toy) {
        return this.db.toy.update({
          where: { id },
          data: updateToyDto,
        });
      } else {
        return { "statusCode": 404, "message": "cannot find toy" }
      }
    } catch (error) {
      return { "statusCode": 406, "message": "invalid data" }
    }
  }

  async remove(id: number) {
    if (id == undefined || id == null || isNaN(id)) {
      return "invalid id";
    }
    const toy = await this.db.toy.findUnique({
      where: { id },
    });
    if (toy) {
      return this.db.toy.delete({
        where: { id }
      });
    } else {
      return { "statusCode": 404, "message": "cannot find toy" }
    }
  }
}
