import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} cnae`;
  }

  update(id: number, updateCnaeDto: UpdateCnaeDto) {
    return `This action updates a #${id} cnae`;
  }

  remove(id: number) {
    return `This action removes a #${id} cnae`;
  }
}
