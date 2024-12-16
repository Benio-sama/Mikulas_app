import { Injectable } from '@nestjs/common';
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
      return "invalid data";
    }
  }

  findAll() {
    return this.db.toy.findMany({
      include: {
        kid: true
      }
    });
  }

  findOne(id: number) {
    if (id == undefined || id == null || isNaN(id)) {
      return "invalid id";
    }
    try {
      return this.db.toy.findUnique({
        where: { id },
        include: {
          kid: true
        }
      });
    } catch (error) {
      return "cannot find toy"
    }
  }

  update(id: number, updateToyDto: UpdateToyDto) {
    if (id == undefined || id == null || isNaN(id)) {
      return "invalid id";
    }
    try {
      return this.db.toy.update({
        where: { id },
        data: updateToyDto,
      });
    } catch (error) {
      return "invalid data";
    }
  }

  remove(id: number) {
    if (id == undefined || id == null || isNaN(id)) {
      return "invalid id";
    }
    return this.db.toy.delete({
      where: { id }
    });
  }
}
