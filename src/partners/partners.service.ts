import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from './entities/partner.entity';
import { Repository } from 'typeorm';
import { Company } from '../companies/entities/company.entity';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private partnerRepository: Repository<Partner>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createPartnerDto: CreatePartnerDto): Promise<Partner> {
    const company = await this.companyRepository.findOne({
      where: { id: createPartnerDto.companyId },
    });

    if (!company) {
      throw new NotFoundException('Empresa não encontrada.');
    }

    const partner = this.partnerRepository.create({
      ...createPartnerDto,
    });

    return this.partnerRepository.save(partner);
  }

  async findAll(): Promise<Partner[]> {
    return this.partnerRepository.find();
  }

  async findOne(id: number): Promise<Partner> {
    const partner = await this.partnerRepository.findOne({ where: { id } });
    if (!partner) {
      throw new NotFoundException('Sócio não encontrado.');
    }
    return partner;
  }

  async update(id: number, updatePartnerDto: UpdatePartnerDto): Promise<Partner> {
    const partner = await this.partnerRepository.findOne({ where: { id } });
    if (!partner) {
      throw new NotFoundException('Sócio não encontrado');
    }
    this.partnerRepository.merge(partner, updatePartnerDto);
    return this.partnerRepository.save(partner);
  }

  async softDelete(id: number): Promise<void> {
    const result = await this.partnerRepository.softDelete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Sócio não encontrado');
    }
  }
}
