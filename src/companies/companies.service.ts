import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = this.companyRepository.create(createCompanyDto);
    return this.companyRepository.save(company);
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find({ where: { deletedAt: null } }); // Filtra apenas ativos
  }

  async findOne(cnpj: string): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { cnpj, deletedAt: null },
    });
    if (!company) throw new NotFoundException('Empresa não encontrada');
    return company;
  }

  async softDelete(cnpj: string): Promise<void> {
    const result = await this.companyRepository.softDelete({ cnpj });
    if (result.affected === 0) {
      throw new NotFoundException('Empresa não encontrada');
    }
  }
}
