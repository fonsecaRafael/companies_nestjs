import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { Company } from '../companies/entities/company.entity';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const company = await this.companyRepository.findOne({
      where: { id: createAddressDto.companyId },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const address = this.addressRepository.create({
      ...createAddressDto,
      company,
    });

    return this.addressRepository.save(address);
  }

  findAll() {
    return `This action returns all addresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} #${updateAddressDto.city} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
