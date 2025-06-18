import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CnaesService } from './cnaes.service';
import { CreateCnaeDto } from './dto/create-cnae.dto';
import { UpdateCnaeDto } from './dto/update-cnae.dto';
import { Cnae } from './entities/cnae.entity';

@Controller('cnaes')
export class CnaesController {
  constructor(private readonly cnaesService: CnaesService) {}

  @Post()
  create(@Body() createCnaeDto: CreateCnaeDto): Promise<Cnae> {
    return this.cnaesService.create(createCnaeDto);
  }

  @Get()
  findAll() {
    return this.cnaesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cnaesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCnaeDto: UpdateCnaeDto) {
    return this.cnaesService.update(id, updateCnaeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cnaesService.softDelete(id);
  }
}
