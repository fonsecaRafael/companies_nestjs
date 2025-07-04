import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressesService.create(createAddressDto);
  }

  @Get()
  findAll() {
    return this.addressesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.addressesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressesService.update(id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.addressesService.softDelete(id);
  }
}
