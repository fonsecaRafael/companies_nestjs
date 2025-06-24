import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { UpdateRevenueDto } from './dto/update-revenue.dto';
import { Revenue } from './entities/revenue.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RevenuesService {
  constructor(
    @InjectRepository(Revenue)
    private revenueRepository: Repository<Revenue>,
  ) {}

  async create(createRevenueDto: CreateRevenueDto) {
    const newRevenue = this.revenueRepository.create(createRevenueDto);
    return this.revenueRepository.save(newRevenue);
  }

  async findAll(): Promise<Revenue[]> {
    return this.revenueRepository.find();
  }

  async findOne(id: number): Promise<Revenue> {
    const revenue = await this.revenueRepository.findOne({
      where: { id },
    });
    if (!revenue) throw new NotFoundException('Faturamento não encontrado');
    return revenue;
  }

  async update(id: number, updateRevenueDto: UpdateRevenueDto): Promise<Revenue> {
    const revenue = await this.revenueRepository.findOne({
      where: { id },
    });
    if (!revenue) {
      throw new NotFoundException('Faturamento não encontrado');
    }
    this.revenueRepository.merge(revenue, updateRevenueDto);
    return this.revenueRepository.save(revenue);
  }

  async softDelete(id: number): Promise<void> {
    const result = await this.revenueRepository.softDelete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Faturamento não encontrado.');
    }
  }
}
