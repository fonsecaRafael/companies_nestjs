import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cnae } from './entities/cnae.entity';
import { Repository } from 'typeorm';
import { CreateCnaeDto } from './dto/create-cnae.dto';
import { UpdateCnaeDto } from './dto/update-cnae.dto';

@Injectable()
export class CnaesService {
  constructor(
    @InjectRepository(Cnae)
    private cnaeRepository: Repository<Cnae>,
  ) {}

  async create(createCnaeDto: CreateCnaeDto) {
    const newCnae = this.cnaeRepository.create(createCnaeDto);
    return this.cnaeRepository.save(newCnae);
  }

  async findAll(): Promise<Cnae[]> {
    return this.cnaeRepository.find();
  }

  async findOne(id: number): Promise<Cnae> {
    const cnae = await this.cnaeRepository.findOne({
      where: { id },
    });
    if (!cnae) throw new NotFoundException('CNAE não encontrado');
    return cnae;
  }

  async update(id: number, updateCnaeDto: UpdateCnaeDto): Promise<Cnae> {
    const cnae = await this.cnaeRepository.findOne({
      where: { id },
    });
    if (!cnae) {
      throw new NotFoundException('CNAE não encontrado');
    }
    this.cnaeRepository.merge(cnae, updateCnaeDto);
    return this.cnaeRepository.save(cnae);
  }

  async softDelete(id: number): Promise<void> {
    const result = await this.cnaeRepository.softDelete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Cnae não encontrado.');
    }
  }
}
