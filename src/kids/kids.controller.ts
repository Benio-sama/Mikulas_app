import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { KidsService } from './kids.service';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';

@Controller('kids')
export class KidsController {
  constructor(private readonly kidsService: KidsService) { }

  @Post()
  create(@Body() createKidDto: CreateKidDto) {
    return this.kidsService.create(createKidDto);
  }

  @Get()
  findAll() {
    return this.kidsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kidsService.findOne(+id);
  }

  @Patch(':kidid/:toyid')
  modify(@Param('kidid') kidid: string, @Param('toyid') toyid: string, @Query('action') action: 'add' | 'remove') {
    if (action === 'add') {
      return this.kidsService.addtoy(+kidid, +toyid);
    } else if (action === 'remove') {
      return this.kidsService.removetoy(+kidid, +toyid);
    } else {
      return 'invalid action! action must be add or remove';
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKidDto: UpdateKidDto) {
    return this.kidsService.update(+id, updateKidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kidsService.remove(+id);
  }
}
