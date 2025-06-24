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

  async findAll(): Promise<Address[]> {
    return this.addressRepository.find();
  }

  async findOne(id: number): Promise<Address> {
    const address = await this.addressRepository.findOne({ where: { id } });
    if (!address) {
      throw new NotFoundException('Endereço não encontrado.');
    }
    return address;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto): Promise<Address> {
    const address = await this.addressRepository.findOne({ where: { id } });
    if (!address) {
      throw new NotFoundException('Endereço não encontrado');
    }
    this.addressRepository.merge(address, updateAddressDto);
    return this.addressRepository.save(address);
  }

  async softDelete(id: number): Promise<void> {
    const result = await this.addressRepository.softDelete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Endereço não encontrado');
    }
  }
}
