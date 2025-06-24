import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RevenuesService } from './revenues.service';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { UpdateRevenueDto } from './dto/update-revenue.dto';
import { Revenue } from './entities/revenue.entity';

@Controller('revenues')
export class RevenuesController {
  constructor(private readonly revenuesService: RevenuesService) {}

  @Post()
  create(@Body() createRevenueDto: CreateRevenueDto): Promise<Revenue> {
    return this.revenuesService.create(createRevenueDto);
  }

  @Get()
  findAll() {
    return this.revenuesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.revenuesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRevenueDto: UpdateRevenueDto) {
    return this.revenuesService.update(id, updateRevenueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.revenuesService.softDelete(id);
  }
}
